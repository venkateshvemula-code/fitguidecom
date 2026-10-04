import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Zap, ShieldAlert, Heart, Apple, CheckCircle2 } from 'lucide-react';
import { macronutrients, micronutrients } from '../data/fitData';

export default function NutritionTab() {
  const { setActiveTab } = useApp();

  const macros = macronutrients || [];
  const micros = micronutrients || [];

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Metabolic Biochemistry
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Macronutrient & Micronutrient Educational Guide
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Comprehensive scientific reference on metabolic substrates, muscle protein synthesis, 
          essential vitamins, trace minerals, daily biological requirements, and deficiency warnings.
        </p>
      </div>

      {/* Macronutrients Section */}
      <div class="space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-orange-400">Energy Substrates</span>
          <h2 class="text-2xl font-black text-white mt-1">Primary Macronutrients & Energy Balance ({macros.length})</h2>
          <p class="text-xs text-slate-400 mt-0.5">Proteins, carbohydrates, and healthy lipids that supply caloric energy and structure.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          {macros.map((macro, idx) => (
            <div key={idx} class="fit-card p-6 sm:p-7 rounded-2xl bg-slate-900 border border-slate-800 space-y-5 flex flex-col justify-between">
              <div class="space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div class="flex items-center gap-2">
                    <span class="text-xl">
                      {macro.id === 'protein' ? '🥩' : macro.id === 'carbohydrates' ? '🌾' : macro.id === 'fats' ? '🥑' : '🔥'}
                    </span>
                    <h3 class="text-xl font-black text-white">{macro.name}</h3>
                  </div>
                  {macro.caloriesPerGram ? (
                    <span class="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20">
                      {macro.caloriesPerGram} kcal / gram
                    </span>
                  ) : (
                    <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                      Thermodynamic Energy
                    </span>
                  )}
                </div>

                <div>
                  <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Biological Function & Role</span>
                  <p class="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                    {macro.role}
                  </p>
                </div>

                <div>
                  <span class="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1">Why It Matters for Athletes & Health</span>
                  <p class="text-xs text-slate-300 leading-relaxed">
                    {macro.whyImportant}
                  </p>
                </div>

                <div class="p-3 rounded-xl bg-teal-950/20 border border-teal-500/20 text-xs">
                  <span class="text-teal-400 font-bold block mb-1">Daily Biological Requirement:</span>
                  <span class="text-slate-200 font-medium">{macro.approximateNeed}</span>
                </div>

                {macro.richSources && macro.richSources.length > 0 && (
                  <div>
                    <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">Nutrient-Dense Food Sources</span>
                    <div class="flex flex-wrap gap-1.5">
                      {macro.richSources.map((source, sIdx) => (
                        <span key={sIdx} class="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-medium">
                          {source}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Micronutrients Section */}
      <div class="space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-teal-400">Cellular Vitality & Bio-regulators</span>
          <h2 class="text-2xl font-black text-white mt-1">Essential Vitamins & Minerals (Micronutrients) ({micros.length})</h2>
          <p class="text-xs text-slate-400 mt-0.5">Trace elements that power oxygen delivery, muscle contraction, enzyme activation, and immune defense.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {micros.map((micro, idx) => (
            <div key={idx} class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div class="space-y-3">
                <div class="flex items-center justify-between pb-2.5 border-b border-slate-800">
                  <h3 class="text-base font-extrabold text-white">{micro.name}</h3>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
                    {micro.type}
                  </span>
                </div>

                <p class="text-xs text-slate-300 leading-relaxed">
                  {micro.whatItDoes}
                </p>

                <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5 text-xs">
                  <div>
                    <strong class="text-emerald-400 block mb-0.5">Daily Intake:</strong>
                    <span class="text-slate-300 text-[11px] font-mono">{micro.approxRequirement}</span>
                  </div>
                  <div>
                    <strong class="text-rose-400 block mb-0.5">Deficiency Risks:</strong>
                    <span class="text-slate-400 text-[11px] leading-relaxed block">{micro.deficiencyConsequences}</span>
                  </div>
                </div>

                {micro.foodSources && (
                  <div>
                    <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Top Food Sources</span>
                    <div class="flex flex-wrap gap-1">
                      {micro.foodSources.slice(0, 5).map((food, fIdx) => (
                        <span key={fIdx} class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {micro.variationsNote && (
                <div class="pt-3 border-t border-slate-800 text-[11px] text-amber-300/90 leading-relaxed bg-amber-500/5 p-2.5 rounded-xl border border-amber-500/20">
                  <span class="font-bold text-amber-400">💡 Clinical Note: </span>
                  {micro.variationsNote}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
