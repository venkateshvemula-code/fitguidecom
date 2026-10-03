import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Moon, Utensils, Activity } from 'lucide-react';
import { exercises } from '../data/fitData';
import { getExercisePhoto } from '../data/exercisePhotos';

export default function HeightTab() {
  const { openModal } = useApp();

  const heightExercises = (exercises || []).filter(e => e.bodyPart === 'height');

  const nutritionRules = [
    {
      nutrient: "Calcium & Vitamin D3",
      amount: "1,000 - 1,200 mg Ca + 2,000 IU D3",
      source: "Milk, Fortified Yogurt, Paneer, Sunlight",
      role: "Essential for bone matrix mineralization and epiphyseal chondrocyte proliferation."
    },
    {
      nutrient: "High-Quality Protein & Amino Acids",
      amount: "1.6 - 2.0g per kg bodyweight",
      source: "Eggs, Soya Chunks, Lentils, Greek Yogurt, Fish",
      role: "Supports IGF-1 (Insulin-like Growth Factor 1) synthesis which stimulates skeletal elongation."
    },
    {
      nutrient: "Zinc & Magnesium",
      amount: "11 mg Zinc + 400 mg Magnesium",
      source: "Pumpkin seeds, Almonds, Dark Leafy Greens",
      role: "Crucial enzyme cofactors for DNA synthesis and cellular bone growth."
    },
    {
      nutrient: "Spinal Disc Hydration (Water)",
      amount: "3.0 - 4.0 Liters Daily",
      source: "Pure drinking water & electrolyte fluids",
      role: "Nucleus pulposus intervertebral discs are 80% water; hydration prevents diurnal height loss of 1-2 cm."
    }
  ];

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div class="text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-bold mb-4">
          <span>📏</span> Evidence-Based Height & Postural Optimization
        </div>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Height, Growth & <span class="text-gradient-emerald">Spinal Decompression</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Comprehensive scientific guide on optimizing vertical stature through axial spinal decompression, 
          epiphyseal growth plate biology, deep stage-4 sleep HGH secretion, and bone mineralization nutrition.
        </p>
      </div>

      {/* 3 Scientific Growth Pillars */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-teal-500/30">
          <div class="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center text-xl mb-3">
            🦴
          </div>
          <h3 class="text-base font-bold text-white mb-1.5">1. Epiphyseal Growth Plates</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Long bone elongation occurs at the cartilaginous growth plates (metaphysis) until late adolescence (typically age 16-21). Prior to fusion, IGF-1 and HGH directly stimulate longitudinal bone growth.
          </p>
        </div>

        <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-teal-500/30">
          <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xl mb-3">
            🧘
          </div>
          <h3 class="text-base font-bold text-white mb-1.5">2. Intervertebral Disc Expansion</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            The adult spine contains 23 cartilaginous discs. Throughout the day, gravity compresses these discs by 1 to 2.5 cm. Spinal hanging and cobra traction re-hydrate discs and correct kyphotic curvature.
          </p>
        </div>

        <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-teal-500/30">
          <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center text-xl mb-3">
            💤
          </div>
          <h3 class="text-base font-bold text-white mb-1.5">3. Stage-4 Slow-Wave Sleep & HGH</h3>
          <p class="text-xs text-slate-300 leading-relaxed">
            Over 75% of daily Human Growth Hormone (HGH) is pulsatile-secreted during deep Slow-Wave Sleep (Stage 3 and 4). Achieving 8-9 hours of uninterrupted sleep is non-negotiable for stature optimization.
          </p>
        </div>
      </div>

      {/* Spinal Decompression Workouts Grid */}
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-teal-400">Postural Traction Routines</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Daily Spinal Decompression Exercises</h2>
          </div>
          <span class="text-xs font-mono font-bold text-teal-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
            {heightExercises.length} Target Routines
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heightExercises.map(ex => (
            <div
              key={ex.id}
              class="fit-card rounded-2xl overflow-hidden border border-teal-500/30 hover:border-teal-400 transition-all flex flex-col justify-between group"
            >
              <div>
                <div class="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={getExercisePhoto(ex.id, ex.bodyPart)}
                    alt={ex.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80";
                    }}
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <span class="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-teal-500 text-slate-950">
                    {ex.difficulty} • Height & Spine
                  </span>
                  <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow">
                    <span class="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 backdrop-blur">{ex.setsReps}</span>
                    <span class="text-teal-300">{ex.equipment}</span>
                  </div>
                </div>

                <div class="p-5 space-y-3">
                  <h3 class="text-base font-extrabold text-white group-hover:text-teal-400 transition-colors">
                    {ex.name}
                  </h3>
                  <p class="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {ex.instructions}
                  </p>
                  
                  {ex.benefits && ex.benefits.length > 0 && (
                    <div class="p-2.5 rounded-xl bg-teal-950/20 border border-teal-500/20 text-[11px] text-teal-300">
                      <strong>Traction Effect:</strong> {ex.benefits[0]}
                    </div>
                  )}
                </div>
              </div>

              <div class="p-5 pt-0">
                <button
                  onClick={() => openModal('exercise', ex.id)}
                  class="w-full py-2.5 rounded-xl bg-teal-600/80 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Detailed Spinal Cues</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bone Mineralization Nutrition Table */}
      <div class="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Nutritional Biochemistry</span>
          <h2 class="text-2xl font-black text-white mt-1">Growth & Bone Mineralization Diet Rules</h2>
          <p class="text-xs text-slate-400 mt-1">
            Adequate micronutrients ensure osteoblasts have the raw materials to synthesize hydroxyapatite crystals.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {nutritionRules.map((nr, idx) => (
            <div key={idx} class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-bold text-white">{nr.nutrient}</h4>
                <span class="text-[10px] font-mono font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  {nr.amount}
                </span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">{nr.role}</p>
              <div class="text-[11px] text-slate-400">
                <strong class="text-emerald-400">Top Sources:</strong> {nr.source}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
