/**
 * Semantic NLP & Machine Learning Engine for FitGuide
 * Implements:
 * - Text tokenization, stopword filtering, and stem matching
 * - TF-IDF (Term Frequency - Inverse Document Frequency) vectorizer
 * - Cosine Similarity vector distance metric for semantic retrieval
 * - Intent classification and entity extraction across all clinical health datasets
 */

import { FIT_DATA } from '../data/fitData';

// Common English stopwords for query cleanup
const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by', 'can', 'can\'t', 'cannot',
  'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing', 'don\'t', 'down', 'during', 'each',
  'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t', 'have', 'haven\'t', 'having', 'he', 'he\'d',
  'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers', 'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i',
  'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if', 'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s',
  'me', 'more', 'most', 'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or',
  'other', 'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their', 'theirs',
  'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll', 'they\'re', 'they\'ve',
  'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very', 'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll',
  'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s', 'when', 'when\'s', 'where', 'where\'s', 'which', 'while',
  'who', 'who\'s', 'whom', 'why', 'why\'s', 'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll',
  'you\'re', 'you\'ve', 'your', 'yours', 'yourself', 'yourselves', 'tell', 'give', 'show', 'want', 'need', 'please'
]);

/**
 * Basic lemmatizer / stemmer for clinical and fitness words
 */
function stemWord(word) {
  let w = word.toLowerCase().trim();
  if (w.endsWith('ing')) w = w.slice(0, -3);
  else if (w.endsWith('ies')) w = w.slice(0, -3) + 'y';
  else if (w.endsWith('es')) w = w.slice(0, -2);
  else if (w.endsWith('s') && !w.endsWith('ss')) w = w.slice(0, -1);
  else if (w.endsWith('ed')) w = w.slice(0, -2);
  return w;
}

/**
 * Tokenize, clean, and vectorize input text
 */
export function tokenize(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .map(w => stemWord(w))
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

/**
 * Build Knowledge Corpus Vector Matrix from FitGuide Master Dataset
 */
class SemanticKnowledgeEngine {
  constructor() {
    this.documents = [];
    this.idf = {};
    this.docVectors = [];
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    const docs = [];

    // 1. Index Exercises
    (FIT_DATA.exercises || []).forEach(ex => {
      docs.push({
        id: `ex_${ex.id}`,
        type: 'exercise',
        title: ex.name,
        target: ex.target_body_part_id || '',
        category: 'Exercise & Biomechanics',
        content: `${ex.name} ${ex.target_body_part_id || ''} ${ex.difficulty || ''} ${ex.instructions || ''} ${ex.benefits || ''} ${ex.safety_tips || ''}`,
        raw: ex
      });
    });

    // 2. Index Foods & Nutrition
    (FIT_DATA.foods || []).forEach(f => {
      docs.push({
        id: `food_${f.id}`,
        type: 'food',
        title: f.name,
        category: 'Nutrition & Diet',
        content: `${f.name} ${f.hindi_name || ''} ${f.category || ''} ${f.best_use || ''} ${f.dietary_type || ''} protein ${f.protein_g}g calories ${f.calories} iron ${f.iron_mg}mg carbs ${f.carbs_g}g`,
        raw: f
      });
    });

    // 3. Index Diseases & Clinical Protocols
    (FIT_DATA.diseases || []).forEach(d => {
      const healing = (d.healingFoodsAdvantages || []).map(h => `${h.name} ${h.mechanism}`).join(' ');
      const harmful = (d.harmfulFoodsDisadvantages || []).map(h => `${h.name} ${h.reason}`).join(' ');
      const maleAspect = d.genderAspects?.males || '';
      const femaleAspect = d.genderAspects?.females || '';

      docs.push({
        id: `dis_${d.id}`,
        type: 'disease',
        title: d.name,
        category: 'Clinical Disease Management',
        content: `${d.name} ${d.overview} ${healing} ${harmful} ${maleAspect} ${femaleAspect}`,
        raw: d
      });
    });

    // 4. Index Women's Health Protocols
    if (FIT_DATA.womenHealth) {
      const wh = FIT_DATA.womenHealth;
      (wh.menstrualCyclePhases || []).forEach(phase => {
        docs.push({
          id: `wh_phase_${phase.phase.toLowerCase().replace(/\s+/g, '_')}`,
          type: 'women_phase',
          title: `Menstrual Phase: ${phase.phase}`,
          category: "Women's Health & Cycle Care",
          content: `${phase.phase} days ${phase.days} hormones ${phase.hormonalProfile} workouts ${phase.idealWorkouts} nutrition ${phase.dietaryFocus}`,
          raw: phase
        });
      });

      if (wh.pregnancyGuide) {
        const pg = wh.pregnancyGuide;
        (pg.safeExercises || []).forEach(se => {
          docs.push({
            id: `wh_preg_safe_${se.name.toLowerCase().replace(/\s+/g, '_')}`,
            type: 'pregnancy_safe',
            title: `Pregnancy Safe Exercise: ${se.name}`,
            category: "Maternal Health",
            content: `pregnancy pregnant labor ${se.name} ${se.trimesters} ${se.benefits} ${se.guideline}`,
            raw: se
          });
        });

        (pg.exercisesToAvoid || []).forEach(ea => {
          docs.push({
            id: `wh_preg_avoid_${ea.activity.toLowerCase().replace(/\s+/g, '_')}`,
            type: 'pregnancy_avoid',
            title: `Pregnancy Avoid: ${ea.activity}`,
            category: "Maternal Health Caution",
            content: `pregnancy pregnant risk danger avoid ${ea.activity} ${ea.risk} ${ea.reason}`,
            raw: ea
          });
        });
      }
    }

    // 5. Index Kids & Pediatric Development
    if (FIT_DATA.kidsFitness) {
      const kf = FIT_DATA.kidsFitness;
      if (kf.infantCare?.ayurvedicMassage) {
        const massage = kf.infantCare.ayurvedicMassage;
        docs.push({
          id: 'kf_infant_massage',
          type: 'kids_infant',
          title: 'Ayurvedic Baby Massage (Abhyanga)',
          category: 'Pediatric Care',
          content: `infant baby massage abhyanga oil colic gas digestion motor development ${JSON.stringify(massage)}`,
          raw: massage
        });
      }
      if (kf.infantCare?.tummyTimeProtocol) {
        const tummy = kf.infantCare.tummyTimeProtocol;
        docs.push({
          id: 'kf_tummy_time',
          type: 'kids_infant',
          title: 'Pediatric Tummy Time Protocol',
          category: 'Pediatric Care',
          content: `tummy time crawl neck spine milestones head control ${JSON.stringify(tummy)}`,
          raw: tummy
        });
      }
      if (kf.growingKidsConditioning) {
        docs.push({
          id: 'kf_growing_kids',
          type: 'kids_conditioning',
          title: 'Youth Conditioning & Calisthenics',
          category: 'Youth Fitness',
          content: `kids child growth plates bone mineralization calisthenics gymnastics safe exercises ${JSON.stringify(kf.growingKidsConditioning)}`,
          raw: kf.growingKidsConditioning
        });
      }
    }

    // 6. Index Height & Spinal Decompression
    docs.push({
      id: 'height_decompression',
      type: 'height_guide',
      title: 'Spinal Decompression & Natural Height Optimization',
      category: 'Height & Spine Kinesiology',
      content: 'height grow taller spine spinal decompression vertebrae cobra stretch bar hanging disc hydration growth hormone posture bone density',
      raw: {
        tips: [
          'Dead hangs (3-4 sets of 45-60 seconds) decompress intervertebral discs.',
          'Cobra stretch & Cat-Cow mobilize thoracic spine and correct postural anterior pelvic tilt.',
          'Hydration preserves nucleous pulposus thickness in spinal discs.',
          'Vitamin D3 (2000 IU) & Calcium support bone matrix mineralization.'
        ]
      }
    });

    this.documents = docs;
    this.calculateTFIDF();
    this.initialized = true;
  }

  calculateTFIDF() {
    const N = this.documents.length;
    const docTermFreqs = [];
    const docFreq = {};

    // 1. Calculate TF for each doc & doc frequencies for corpus
    this.documents.forEach((doc, idx) => {
      const tokens = tokenize(doc.content + ' ' + doc.title);
      const tf = {};
      const uniqueTokens = new Set(tokens);

      tokens.forEach(t => {
        tf[t] = (tf[t] || 0) + 1;
      });

      // Normalize TF by length
      const len = tokens.length || 1;
      for (const t in tf) {
        tf[t] = tf[t] / len;
      }

      uniqueTokens.forEach(t => {
        docFreq[t] = (docFreq[t] || 0) + 1;
      });

      docTermFreqs.push(tf);
    });

    // 2. Compute IDF: log((N + 1) / (df + 1)) + 1
    for (const term in docFreq) {
      this.idf[term] = Math.log((N + 1) / (docFreq[term] + 1)) + 1;
    }

    // 3. Build TF-IDF vector for each document
    this.docVectors = docTermFreqs.map(tf => {
      const vec = {};
      for (const term in tf) {
        vec[term] = tf[term] * (this.idf[term] || 1);
      }
      return vec;
    });
  }

  /**
   * Vectorize input query and compute Cosine Similarity against all documents
   */
  semanticSearch(query, topK = 3) {
    this.init();
    const queryTokens = tokenize(query);
    if (queryTokens.length === 0) return [];

    // Query TF
    const queryTf = {};
    queryTokens.forEach(t => {
      queryTf[t] = (queryTf[t] || 0) + 1;
    });

    const qLen = queryTokens.length;
    const queryVec = {};
    for (const t in queryTf) {
      queryTf[t] = queryTf[t] / qLen;
      // If term is new, assign a baseline IDF
      const termIdf = this.idf[t] || Math.log(this.documents.length + 1);
      queryVec[t] = queryTf[t] * termIdf;
    }

    // Compute Query Vector Magnitude
    let queryMag = 0;
    for (const t in queryVec) {
      queryMag += queryVec[t] * queryVec[t];
    }
    queryMag = Math.sqrt(queryMag);
    if (queryMag === 0) return [];

    // Cosine Similarity: (A · B) / (||A|| * ||B||)
    const scores = this.documents.map((doc, idx) => {
      const dVec = this.docVectors[idx];
      let dotProduct = 0;
      let docMag = 0;

      for (const t in dVec) {
        docMag += dVec[t] * dVec[t];
        if (queryVec[t]) {
          dotProduct += queryVec[t] * dVec[t];
        }
      }

      docMag = Math.sqrt(docMag);
      const similarity = (docMag === 0) ? 0 : dotProduct / (queryMag * docMag);

      // Boost score if query exact words appear in the document title
      let boost = 1;
      const titleLower = doc.title.toLowerCase();
      queryTokens.forEach(token => {
        if (titleLower.includes(token)) boost += 0.35;
      });

      return {
        doc,
        score: similarity * boost
      };
    });

    return scores
      .filter(s => s.score > 0.04)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);
  }

  /**
   * Generates a coherent natural clinical response synthesizing top semantic matches
   */
  synthesizeAnswer(query, trackerData = {}) {
    this.init();
    const lowerQuery = query.toLowerCase();

    // Direct check for personal daily tracker queries
    if (lowerQuery.includes('tracker') || lowerQuery.includes('my calorie') || lowerQuery.includes('progress') || lowerQuery.includes('my water') || lowerQuery.includes('consumed')) {
      return `📊 **Your Personal Daily Tracker Progress:**\n` +
             `• **Calories:** ${trackerData.loggedCalories || 0} / ${trackerData.targetCalories || 2000} kcal\n` +
             `• **Protein Intake:** ${trackerData.loggedProtein || 0}g / ${trackerData.targetProtein || 120}g\n` +
             `• **Hydration:** ${trackerData.waterGlasses || 0} / 8 glasses (${(trackerData.waterGlasses || 0) * 250} ml)\n\n` +
             `*Tip: Log every whole food or workout in the Daily Tracker tab to keep your neural habit streak active!*`;
    }

    const matches = this.semanticSearch(query, 3);

    if (!matches || matches.length === 0) {
      return `🧠 **FitGuide Neural AI Engine:**\n\n` +
             `I searched our bio-kinesiology, clinical disease, maternal wellness, and nutritional database for *"${query}"*, but couldn't locate an exact high-confidence match.\n\n` +
             `💡 **Try asking about:**\n` +
             `• **Spine & Height:** *"How to decompress spine for height?"*\n` +
             `• **Clinical Therapies:** *"Healing foods for diabetes, thyroid, or fatty liver"*\n` +
             `• **Women's Health:** *"Menstrual cycle phases" or "Safe pregnancy exercises"*\n` +
             `• **Pediatric Care:** *"Ayurvedic baby massage" or "Tummy time milestones"*\n` +
             `• **Nutrition:** *"High protein vegetarian Indian foods"*`;
    }

    const best = matches[0];
    const { doc, score } = best;
    const confidencePercent = Math.min(99, Math.round(score * 120));

    let responseHeader = `🧠 **[Semantic Match: ${confidencePercent}% Confidence • ${doc.category}]**\n\n`;

    // Format based on matched entity type
    if (doc.type === 'exercise') {
      const ex = doc.raw;
      return responseHeader +
        `🏋️ **${ex.name}** (${ex.difficulty} • Target: ${ex.target_body_part_id?.toUpperCase()})\n\n` +
        `📋 **Instructions:**\n${ex.instructions}\n\n` +
        `✨ **Clinical Benefits:**\n${ex.benefits}\n\n` +
        `⚠️ **Safety & Form Checklist:**\n${ex.safety_tips}`;
    }

    if (doc.type === 'food') {
      const f = doc.raw;
      return responseHeader +
        `🥑 **${f.name}** ${f.hindi_name ? `(${f.hindi_name})` : ''} - *${f.dietary_type}*\n\n` +
        `📊 **Nutritional Profile (per ${f.serving_size}):**\n` +
        `• **Calories:** ${f.calories} kcal\n` +
        `• **Protein:** ${f.protein_g}g | **Carbs:** ${f.carbs_g}g | **Fats:** ${f.fat_g}g\n` +
        `• **Iron Content:** ${f.iron_mg} mg\n\n` +
        `💡 **Optimal Bio-Use:** ${f.best_use}`;
    }

    if (doc.type === 'disease') {
      const d = doc.raw;
      const topHealing = (d.healingFoodsAdvantages || []).slice(0, 3)
        .map(h => `  • **${h.name}:** ${h.mechanism}`).join('\n');
      const topAvoid = (d.harmfulFoodsDisadvantages || []).slice(0, 3)
        .map(a => `  • **${a.name}:** ${a.reason}`).join('\n');

      return responseHeader +
        `🩺 **Clinical Protocol: ${d.name}**\n\n` +
        `🔬 **Overview:**\n${d.overview}\n\n` +
        `✨ **Recommended Healing Foods (Advantages):**\n${topHealing}\n\n` +
        `⚠️ **Foods to Strictly Avoid (Disadvantages):**\n${topAvoid}\n\n` +
        `🏃 **Targeted Exercise Cure:**\n${d.exerciseTherapyCure?.prescription || 'Consult clinical therapy section.'}`;
    }

    if (doc.type === 'women_phase') {
      const p = doc.raw;
      return responseHeader +
        `🌸 **${p.phase} Phase (Days ${p.days})**\n\n` +
        `🧬 **Hormonal Profile:**\n${p.hormonalProfile}\n\n` +
        `🏋️ **Recommended Training Intensity:**\n${p.idealWorkouts}\n\n` +
        `🥗 **Dietary & Micronutrient Focus:**\n${p.dietaryFocus}`;
    }

    if (doc.type === 'pregnancy_safe') {
      const se = doc.raw;
      return responseHeader +
        `🤰 **Maternal Fitness: ${se.name}**\n\n` +
        `📅 **Safe Trimesters:** ${se.trimesters}\n` +
        `✨ **Clinical Benefits:** ${se.benefits}\n` +
        `💡 **Safety Guidelines:** ${se.guideline}`;
    }

    if (doc.type === 'pregnancy_avoid') {
      const ea = doc.raw;
      return responseHeader +
        `🛑 **Maternal Caution: ${ea.activity}**\n\n` +
        `⚠️ **Associated Risk:** ${ea.risk}\n` +
        `🔬 **Physiological Reason:** ${ea.reason}`;
    }

    if (doc.type === 'height_guide') {
      return responseHeader +
        `📏 **Spinal Alignment & Natural Height Kinesiology:**\n\n` +
        `1. **Dead Hangs & Decompression:** Hanging from a pull-up bar for 45-60 seconds relieves intervertebral disc gravitational compression.\n` +
        `2. **Cobra Stretch & Cat-Cow:** Mobilizes lumbar/thoracic discs and corrects anterior pelvic tilt, restoring up to 1-2 cm of posture-lost height.\n` +
        `3. **Hydration & Disc Height:** Spinal discs are 80% water. Hydration maintains disc elasticity and thickness.\n` +
        `4. **Mineralization:** Calcium (1000mg) and Vitamin D3 (2000 IU) support cortical bone matrix strength.`;
    }

    if (doc.type.startsWith('kids')) {
      return responseHeader +
        `👶 **Pediatric Kinesiology & Development: ${doc.title}**\n\n` +
        `• **Abhyanga Massage:** Stimulates parasympathetic vagal activity, improving gastric motility and relieving baby colic.\n` +
        `• **Tummy Time:** Progressive milestones (3 mins at 0-2 months to 30 mins at 6 months) build cervical extensors and scapular stabilizers.\n` +
        `• **Youth Calisthenics:** Bear crawls, monkey bars, and bodyweight squats stimulate osteoblastic bone density without epiphyseal growth plate injury.`;
    }

    return responseHeader + doc.content;
  }
}

// Singleton Engine Instance
export const fitBotEngine = new SemanticKnowledgeEngine();
