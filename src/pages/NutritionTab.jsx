import React from 'react';
import { useApp } from '../context/AppContext';
import { nutrients } from '../data/fitData';

export default function NutritionTab() {
  const { setActiveTab } = useApp();

  const macros = nutrients?.macronutrients || [];
  const micros = nutrients?.micronutrients || [];

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Nutrition Science
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Macronutrient & Micronutrient Educational Guide
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Understand energy metabolism, muscle protein synthesis, metabolic enzymes, and dietary requirements to fuel your body and prevent nutritional deficiencies.
        </p>
      </div>

      {/* Macronutrients Section */}
      <div class="space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-orange-400">Energy Substrates</span>
          <h2 class="text-2xl font-black text-white mt-1">Primary Macronutrients</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {macros.map((macro, idx) => (
            <div key={idx} class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-black text-white">{macro.name}</h3>
                  <span class="text-[10px] font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                    {macro.daily_requirement}
                  </span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed mb-3">{macro.function_desc}</p>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div><strong class="text-emerald-400">Importance:</strong> {macro.importance}</div>
                  <div><strong class="text-rose-400">Deficiency Risk:</strong> {macro.deficiency_risks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Micronutrients Section */}
      <div class="space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-teal-400">Cellular Vitality</span>
          <h2 class="text-2xl font-black text-white mt-1">Essential Vitamins & Minerals (Micronutrients)</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {micros.map((micro, idx) => (
            <div key={idx} class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-1">
                  <h3 class="text-base font-bold text-white">{micro.name}</h3>
                  <span class="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                    {micro.daily_requirement}
                  </span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed mb-2">{micro.function_desc}</p>
                <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <div><strong class="text-emerald-400">Function:</strong> {micro.importance}</div>
                  <div><strong class="text-rose-400">Deficiency:</strong> {micro.deficiency_risks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
