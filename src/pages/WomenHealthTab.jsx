import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, AlertTriangle, Heart, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { womenHealth } from '../data/fitData';

export default function WomenHealthTab() {
  const { openModal } = useApp();
  const [activeSubtab, setActiveSubtab] = useState('cycle'); // 'cycle' or 'pregnancy'

  if (!womenHealth) return null;

  const { menstrualCycle, pregnancyCare } = womenHealth;

  const phasePhotos = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80", // Menstrual
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", // Follicular
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80", // Ovulatory
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80"  // Luteal
  ];

  const dangerPhotos = [
    "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80", // Supine
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", // Burpees
    "https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=600&auto=format&fit=crop&q=80", // Heavy lifting
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80", // Hot yoga
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80"  // Contact sports
  ];

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div class="text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-bold mb-4">
          <span>🌸</span> Dedicated Female Wellness & Maternal Care Hub
        </div>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Women's Health, <span class="text-gradient-pink">Cycle & Pregnancy</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Comprehensive, science-backed guidance on healthy menstrual cycle duration (21-35 days), 
          4 hormonal phases, precautions, iron-rich nutrition, and safe pregnancy fitness with advantages and disadvantages.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div class="flex items-center justify-center gap-2 sm:gap-4">
        <button
          onClick={() => setActiveSubtab('cycle')}
          class={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeSubtab === 'cycle'
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>🩸</span> Mature Menstrual Cycle & Hormones
        </button>
        <button
          onClick={() => setActiveSubtab('pregnancy')}
          class={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeSubtab === 'pregnancy'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>🤰</span> Pregnancy Fitness & Maternal Care
        </button>
      </div>

      {/* ========================================================
          SUB-TAB 1: MENSTRUAL CYCLE & NUTRITION
          ======================================================== */}
      {activeSubtab === 'cycle' && (
        <div class="space-y-12 animate-in fade-in duration-150">
          
          {/* Healthy Duration & Cycle Norms Card */}
          <div class="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-pink-950/60 via-slate-900 to-purple-950/60 border border-pink-500/40 shadow-xl">
            <div class="flex items-start gap-4 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl shrink-0">
                ⏱️
              </div>
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                  Clinical Standard
                </span>
                <h2 class="text-2xl font-black text-white mt-1">How Many Days Occur in a Healthy Cycle?</h2>
                <p class="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  A standard healthy menstrual cycle ranges between <strong>21 to 35 days</strong> (average: <strong>28 days</strong>). 
                  The active bleeding phase naturally lasts <strong>3 to 7 days</strong>, with a healthy total blood loss of <strong>30 to 80 mL</strong> per cycle.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div class="bg-slate-950/60 p-4 rounded-xl border border-pink-500/20 text-center">
                <span class="text-xs text-slate-400 block mb-1">Healthy Cycle Duration</span>
                <span class="text-2xl font-black text-pink-400">21 - 35 Days</span>
                <span class="text-[11px] text-slate-400 block mt-1">Calculated from Day 1 of period to Day 1 of next period</span>
              </div>
              <div class="bg-slate-950/60 p-4 rounded-xl border border-pink-500/20 text-center">
                <span class="text-xs text-slate-400 block mb-1">Active Bleeding Phase</span>
                <span class="text-2xl font-black text-purple-400">3 - 7 Days</span>
                <span class="text-[11px] text-slate-400 block mt-1">Normal shedding of functional endometrium</span>
              </div>
              <div class="bg-slate-950/60 p-4 rounded-xl border border-pink-500/20 text-center">
                <span class="text-xs text-slate-400 block mb-1">Standard Blood Volume</span>
                <span class="text-2xl font-black text-rose-400">30 - 80 mL</span>
                <span class="text-[11px] text-slate-400 block mt-1">Over 80mL indicates menorrhagia; consult gynecologist</span>
              </div>
            </div>
          </div>

          {/* 4 Hormonal Cycle Phases with Photo Previews */}
          <div class="space-y-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-pink-400">Endocrine Rhythm</span>
              <h2 class="text-2xl font-black text-white mt-1">The 4 Biological Phases of the Mature Cycle</h2>
              <p class="text-xs text-slate-400 mt-1">Adapt your training intensity and micronutrient intake to cyclical hormonal fluctuations.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menstrualCycle.phases.map((p, idx) => (
                <div
                  key={idx}
                  class="fit-card rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-pink-500/50 transition-all group"
                >
                  <div>
                    <div class="relative h-40 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                      <img
                        src={phasePhotos[idx] || phasePhotos[0]}
                        alt={p.phase}
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                      <span class="absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-500 text-white shadow">
                        Phase {idx + 1}
                      </span>
                      <span class="absolute bottom-2 left-3 right-3 text-sm font-extrabold text-white drop-shadow">
                        {p.phase}
                      </span>
                    </div>

                    <div class="p-4 space-y-3">
                      <div class="text-xs text-slate-300 font-medium bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <strong class="text-slate-200">Hormones:</strong> {p.hormones}
                      </div>
                      <div class="text-xs text-slate-400 leading-relaxed">
                        <strong class="text-slate-300">Energy & Mood:</strong> {p.energyLevel}
                      </div>
                      <div class="text-xs text-slate-300 leading-relaxed p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                        <strong class="text-emerald-400 block mb-0.5">Exercise Guidance:</strong> {p.exerciseAdvice}
                      </div>
                      <div class="text-xs text-slate-300 leading-relaxed p-2.5 rounded-xl bg-pink-950/20 border border-pink-500/20">
                        <strong class="text-pink-400 block mb-0.5">Nutrition Focus:</strong> {p.nutritionFocus}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menstrual Precautions */}
          <div class="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Clinical Hygiene & Care</span>
              <h2 class="text-2xl font-black text-white mt-1">Crucial Menstrual Cycle Precautions</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menstrualCycle.precautions.map((pr, idx) => (
                <div key={idx} class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <span class="text-amber-400 text-lg font-bold">✓</span>
                  <div>
                    <h4 class="text-xs font-bold text-slate-200 mb-1">{pr.rule}</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">{pr.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food Advantages vs Food Disadvantages */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Superfoods Advantages */}
            <div class="fit-card p-6 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🌿</span>
                <div>
                  <h3 class="text-lg font-extrabold text-emerald-400">Healing Superfoods (Advantages)</h3>
                  <p class="text-xs text-slate-300">Replenishes iron stores, reduces prostaglandins, and eases cramping.</p>
                </div>
              </div>
              <div class="space-y-3">
                {menstrualCycle.foodAdvantages.map((fa, idx) => (
                  <div key={idx} class="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                    <span class="text-emerald-400 font-bold text-base">✓</span>
                    <div>
                      <div class="flex items-center gap-2 mb-1">
                        <h5 class="text-xs font-extrabold text-white">{fa.food}</h5>
                        <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {fa.category}
                        </span>
                      </div>
                      <p class="text-xs text-slate-300 leading-relaxed">{fa.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harmful Foods Disadvantages */}
            <div class="fit-card p-6 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-2xl">🚫</span>
                <div>
                  <h3 class="text-lg font-extrabold text-rose-400">Foods to Strictly Avoid (Disadvantages)</h3>
                  <p class="text-xs text-slate-300">Worsens uterine contractions, water retention, and severe mood swings.</p>
                </div>
              </div>
              <div class="space-y-3">
                {menstrualCycle.foodDisadvantages.map((fd, idx) => (
                  <div key={idx} class="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 flex items-start gap-3">
                    <span class="text-rose-400 font-bold text-base">⚠️</span>
                    <div>
                      <h5 class="text-xs font-extrabold text-white mb-1">{fd.food}</h5>
                      <p class="text-xs text-slate-300 leading-relaxed mb-1">{fd.disadvantage}</p>
                      <span class="text-[10px] text-rose-300 block font-semibold">Danger: {fd.whyAvoid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: PREGNANCY FITNESS & MATERNAL CARE
          ======================================================== */}
      {activeSubtab === 'pregnancy' && (
        <div class="space-y-12 animate-in fade-in duration-150">
          
          {/* Pregnancy Trimesters Breakdown */}
          <div class="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-teal-400">Gestational Roadmap</span>
              <h2 class="text-2xl font-black text-white mt-1">Pregnancy Trimesters & Fitness Milestones</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pregnancyCare.trimesters.map((t, idx) => (
                <div key={idx} class="p-4 rounded-xl bg-slate-950/60 border border-teal-500/20 space-y-2">
                  <span class="text-xs font-bold text-teal-400 uppercase tracking-wider block">{t.trimester}</span>
                  <p class="text-xs text-slate-200 font-semibold">{t.focus}</p>
                  <div class="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                    <strong class="text-emerald-400">Exercise:</strong> {t.exerciseTips}
                  </div>
                  <div class="text-[11px] text-slate-400">
                    <strong class="text-pink-400">Nutrition:</strong> {t.nutritionFocus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Pregnancy Exercises */}
          <div class="space-y-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Labor Conditioning</span>
              <h2 class="text-2xl font-black text-white mt-1">Safe Pregnancy Exercises (Advantages & Form)</h2>
              <p class="text-xs text-slate-400 mt-1">Strengthens pelvic floor, prevents gestational diabetes, and shortens labor delivery duration.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pregnancyCare.safeExercises.map(ex => (
                <div key={ex.id} class="fit-card rounded-2xl overflow-hidden border border-teal-500/30 flex flex-col justify-between">
                  <div>
                    <div class="relative h-48 w-full bg-slate-950 overflow-hidden">
                      <img src={ex.photoUrl} alt={ex.name} class="w-full h-full object-cover" />
                      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                      <span class="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500 text-slate-950 font-sans shadow">
                        {ex.trimesterSafe}
                      </span>
                      <span class="absolute bottom-2 left-3 font-extrabold text-white text-base">{ex.name}</span>
                    </div>

                    <div class="p-5 space-y-4">
                      <p class="text-xs text-slate-300 leading-relaxed">{ex.instructions}</p>

                      <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                        <span class="text-[11px] font-bold text-emerald-400 block mb-1">✨ Proven Advantages for Labor:</span>
                        <ul class="space-y-1 text-[11px] text-slate-300">
                          {ex.advantages.map((a, i) => (
                            <li key={i} class="flex items-start gap-1.5">
                              <span class="text-emerald-400">•</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div class="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                        <span class="text-[11px] font-bold text-rose-400 block mb-1">⚠️ Cautions & Risks:</span>
                        <ul class="space-y-1 text-[11px] text-slate-300">
                          {ex.disadvantagesAndRisks.map((r, i) => (
                            <li key={i} class="flex items-start gap-1.5">
                              <span class="text-rose-400">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="p-5 pt-0">
                    <button
                      onClick={() => openModal('exercise', ex.id)}
                      class="w-full py-2.5 rounded-xl bg-teal-600/80 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Form Guide & Modifications</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dangerous Exercises to Avoid with Warning Photo Previews */}
          <div class="fit-card p-6 sm:p-8 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 space-y-6">
            <div>
              <span class="text-xs font-bold uppercase tracking-wider text-rose-400">Strict Safety Rules</span>
              <h2 class="text-2xl font-black text-white mt-1">Dangerous Exercises to Avoid During Pregnancy</h2>
              <p class="text-xs text-slate-300 mt-1">These high-risk movements can restrict placental perfusion or trigger uterine contractions.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pregnancyCare.dangerousExercisesToAvoid.map((de, idx) => (
                <div key={idx} class="p-4 rounded-xl bg-slate-950/70 border border-rose-500/40 flex flex-col sm:flex-row gap-4 items-start overflow-hidden">
                  <div class="relative w-full sm:w-32 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-rose-500/30">
                    <img
                      src={dangerPhotos[idx] || dangerPhotos[0]}
                      alt={de.name}
                      class="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div class="absolute inset-0 bg-rose-950/40 mix-blend-multiply"></div>
                    <span class="absolute top-1 left-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-600 text-white shadow">
                      ⛔ AVOID
                    </span>
                  </div>
                  <div class="flex-1">
                    <h4 class="text-sm font-extrabold text-rose-400 mb-1 flex items-center gap-1.5">
                      <span>⚠️</span> <span>{de.name}</span>
                    </h4>
                    <p class="text-xs text-slate-300 leading-relaxed mb-2">{de.danger}</p>
                    <span class="text-[11px] text-teal-300 font-semibold p-1.5 rounded-lg bg-teal-950/30 border border-teal-500/20 block">
                      ✓ Safe Alternative: {de.alternatives}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maternal Nutrition Superfoods vs Foods to Avoid */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="fit-card p-6 rounded-2xl bg-teal-950/20 border-2 border-teal-500/40 space-y-4">
              <h3 class="text-lg font-extrabold text-teal-400">Essential Maternal Nutrients (Advantages)</h3>
              <div class="space-y-3">
                {pregnancyCare.maternalNutritionAdvantages.map((ma, idx) => (
                  <div key={idx} class="p-3.5 rounded-xl bg-slate-900 border border-teal-500/30">
                    <h5 class="text-xs font-extrabold text-white mb-1">{ma.nutrient}</h5>
                    <p class="text-xs text-slate-300 leading-relaxed mb-1">{ma.benefit}</p>
                    <span class="text-[10px] text-teal-300 block">Top Sources: {ma.sources}</span>
                  </div>
                ))}
              </div>
            </div>

            <div class="fit-card p-6 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 space-y-4">
              <h3 class="text-lg font-extrabold text-rose-400">Hazardous Pregnancy Foods (Disadvantages)</h3>
              <div class="space-y-3">
                {pregnancyCare.maternalNutritionDisadvantages.map((md, idx) => (
                  <div key={idx} class="p-3.5 rounded-xl bg-slate-900 border border-rose-500/30">
                    <h5 class="text-xs font-extrabold text-rose-400 mb-1">{md.food}</h5>
                    <p class="text-xs text-slate-300 leading-relaxed mb-1">{md.harm}</p>
                    <span class="text-[10px] text-slate-400 block font-medium">Rule: {md.precaution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
