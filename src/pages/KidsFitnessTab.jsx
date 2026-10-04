import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Baby, 
  Sparkles, 
  ShieldCheck, 
  Heart, 
  Activity, 
  Flame, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Sun,
  Dumbbell
} from 'lucide-react';
import { kidsFitness } from '../data/fitData';

export default function KidsFitnessTab() {
  const { setActiveTab } = useApp();
  const [activeGroup, setActiveGroup] = useState('infants'); // 'infants', 'toddlers', 'growingKids'

  if (!kidsFitness) return null;

  const { ageGroups, infantCare, toddlerDevelopment, growingKidsConditioning, nutritionPillars } = kidsFitness;

  // Verified matching photos for pediatric & infant care
  const kidsPhotos = {
    infantMassage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=700&auto=format&fit=crop&q=80",
    tummyTime: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&auto=format&fit=crop&q=80",
    toddlerPlay: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=700&auto=format&fit=crop&q=80",
    kidsActive: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=700&auto=format&fit=crop&q=80",
    sunlight: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=700&auto=format&fit=crop&q=80",
    hanging: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=700&auto=format&fit=crop&q=80"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold mb-4">
          <Baby size={15} />
          <span>Pediatric Kinesiology & Body Development</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Infant Massages & <span className="text-gradient-emerald">Kids Body Conditioning</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          From Ayurvedic baby massage (Abhyanga) and colic relief to toddler vestibular motor skills, 
          growth-plate safe youth calisthenics, and pediatric bone mineralization nutrition.
        </p>
      </div>

      {/* Age Group Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {ageGroups.map(group => {
          const isSelected = activeGroup === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border-emerald-500 text-white font-bold shadow-lg scale-102'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider">{group.label}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
                  {group.badge}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-normal leading-snug">
                {group.subTitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          STAGE 1: INFANTS (0-12 MONTHS) - MASSAGE & TUMMY TIME
          ========================================================================= */}
      {activeGroup === 'infants' && (
        <div className="space-y-10 animate-in fade-in duration-150">
          
          {/* Hero Banner for Infant Massage */}
          <div className="fit-card p-6 sm:p-8 rounded-3xl bg-slate-900 border border-teal-500/40 flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
            <div className="relative w-full lg:w-96 h-56 shrink-0 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <img
                src={kidsPhotos.infantMassage}
                alt="Infant Body Massage"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=700&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-teal-500/40 backdrop-blur">
                👶 Scientific Abhyanga Therapy
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Early Neuromuscular Stimulation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                The Science of Baby Massage (Abhyanga)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {infantCare.overview}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Vagus Nerve</span>
                  <strong className="text-xs text-emerald-400">Better Digestion</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Endocrine</span>
                  <strong className="text-xs text-teal-400">+Melatonin / Sleep</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Bones</span>
                  <strong className="text-xs text-amber-400">Femur Density</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 block">Bonding</span>
                  <strong className="text-xs text-pink-400">Oxytocin Spike</strong>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Step Infant Massage Protocols */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step-by-Step Anatomy</span>
              <h3 className="text-2xl font-black text-white mt-1">4 Essential Infant Massage Techniques</h3>
              <p className="text-xs text-slate-400 mt-0.5">Perform 15-20 minutes daily in a warm draft-free room before bath time.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infantCare.massageProtocols.map(protocol => (
                <div key={protocol.id} className="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h4 className="text-base font-extrabold text-white">{protocol.title}</h4>
                      <span className="text-[10px] uppercase font-bold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                        {protocol.target}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Execution Form & Strokes</span>
                      <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                        {protocol.technique}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs">
                      <strong className="text-emerald-400 block mb-0.5">✨ Developmental Advantage:</strong>
                      <span className="text-slate-300">{protocol.benefits}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs">
                      <strong className="text-rose-400 block mb-0.5">⚠️ Crucial Precaution:</strong>
                      <span className="text-slate-400">{protocol.precautions}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pediatric Oils Guide */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Dermatological Safety</span>
                <h3 className="text-xl font-black text-white mt-1">Recommended Cold-Pressed Massage Oils</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Pure Edible Grade Only</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {infantCare.recommendedOils.map((oil, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-white">{oil.name}</h5>
                    <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                      {oil.season}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{oil.benefits}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tummy Time Roadmap */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-teal-500/30 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Cervical & Spinal Strength</span>
              <h3 className="text-xl font-black text-white mt-1">Pediatric Tummy Time Milestones</h3>
              <p className="text-xs text-slate-400 mt-1">Builds head control, prevents flat head syndrome (plagiocephaly), and prepares core for crawling.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {infantCare.tummyTimeMilestones.map((milestone, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">{milestone.age}</span>
                    <span className="text-[10px] font-mono text-slate-400">{milestone.duration}</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">{milestone.focus}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          STAGE 2: TODDLERS (1-4 YEARS) - GAIT, BALANCE & MOTOR PLAY
          ========================================================================= */}
      {activeGroup === 'toddlers' && (
        <div className="space-y-10 animate-in fade-in duration-150">
          
          <div className="fit-card p-6 sm:p-8 rounded-3xl bg-slate-900 border border-teal-500/40 flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
            <div className="relative w-full lg:w-96 h-56 shrink-0 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <img
                src={kidsPhotos.toddlerPlay}
                alt="Toddler Physical Play"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=700&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-teal-500/40 backdrop-blur">
                🏃 Toddler Gross Motor Development
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Agility & Proprioception
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Building Toddler Motor Skills & Joint Integrity
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {toddlerDevelopment.overview}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toddlerDevelopment.activities.map((act, idx) => (
              <div key={idx} className="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                      {act.category}
                    </span>
                    <span className="text-base">🧸</span>
                  </div>

                  <h4 className="text-base font-extrabold text-white">{act.name}</h4>
                  <p className="text-xs text-slate-200 leading-relaxed">{act.instructions}</p>

                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300">
                    <strong className="text-emerald-400 block mb-0.5">Developmental Goal:</strong>
                    {act.benefits}
                  </div>

                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-slate-400">
                    <strong className="text-amber-400 block mb-0.5">Safety Rule:</strong>
                    {act.safety}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
          STAGE 3: GROWING KIDS & PRE-TEENS (5-12 YEARS) - BODY BUILDING & CALISTHENICS
          ========================================================================= */}
      {activeGroup === 'growingKids' && (
        <div className="space-y-10 animate-in fade-in duration-150">
          
          <div className="fit-card p-6 sm:p-8 rounded-3xl bg-slate-900 border border-emerald-500/40 flex flex-col lg:flex-row items-center gap-8 shadow-2xl">
            <div className="relative w-full lg:w-96 h-56 shrink-0 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
              <img
                src={kidsPhotos.kidsActive}
                alt="Kids Athletic Conditioning"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=700&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-emerald-500/40 backdrop-blur">
                ⚡ Safe Pre-Teen Calisthenics
              </span>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Epiphyseal Plate Safe
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Age-Appropriate Youth Strength & Posture
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {growingKidsConditioning.overview}
              </p>
            </div>
          </div>

          {/* 4 Core Safe Youth Exercises */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Biomechanics & Posture</span>
              <h3 className="text-2xl font-black text-white mt-1">Foundational Youth Calisthenics (4 Exercises)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Builds natural athletic foundation, stimulates bone elongation, and counters slouching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {growingKidsConditioning.coreRoutines.map((routine, idx) => (
                <div key={idx} className="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <h4 className="text-base font-extrabold text-white">{routine.name}</h4>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {routine.target}
                      </span>
                    </div>

                    <p className="text-xs text-slate-200 leading-relaxed">{routine.instructions}</p>

                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                      <strong className="text-teal-400 block mb-0.5">Coaching Cue:</strong>
                      <span className="text-slate-300 font-medium">"{routine.coachingCue}"</span>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300">
                      <strong className="text-emerald-400 block mb-0.5">🦴 Growth Plate & Bone Effect:</strong>
                      {routine.growthPlateImpact}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Golden Safety Rules for Youth Training */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-4">
            <h4 className="text-base font-extrabold text-amber-400 flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>Pediatric Orthopedic Training Safeguards</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {growingKidsConditioning.safetyRules.map((rule, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 font-medium">
                  {rule}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          COMMON SECTION: PEDIATRIC BONE & GROWTH NUTRITION MATRIX
          ========================================================================= */}
      <div className="fit-card p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Nutritional Biochemistry</span>
          <h2 className="text-2xl font-black text-white mt-1">Pediatric Bone Mineralization & Growth Nutrition</h2>
          <p className="text-xs text-slate-400 mt-1">Crucial daily micronutrients required for organ maturation, muscle elongation, and cognitive speed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {nutritionPillars.map((pillar, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 font-bold inline-block mb-1.5">
                  {pillar.dailyTarget}
                </span>
                <h4 className="text-sm font-extrabold text-white">{pillar.nutrient}</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{pillar.role}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                <strong className="text-emerald-400">Sources:</strong> {pillar.sources}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
