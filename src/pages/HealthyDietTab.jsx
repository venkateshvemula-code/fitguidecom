import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Utensils, CheckCircle2, Flame, Activity } from 'lucide-react';
import { healthyDiets } from '../data/fitData';

export default function HealthyDietTab() {
  const [activeGender, setActiveGender] = useState('men');

  if (!healthyDiets) return null;

  const { genderMatrix, plans } = healthyDiets;
  const currentPlan = plans[activeGender];

  const genderPhotos = {
    "men": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80",
    "women": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80"
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div class="text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-4">
          <span>🥗</span> Gender-Optimized Daily Nutrition & Schedules
        </div>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Balanced Healthy Diets <span class="text-gradient-emerald">for Men & Women</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Daily biological nutrient requirements comparison between biological males and females, 
          alongside realistic 7-meal daily timelines with Indian vegetarian and non-vegetarian choices.
        </p>
      </div>

      {/* Gender Nutrition Comparison Matrix Table */}
      <div class="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Nutritional Physiology</span>
          <h2 class="text-2xl font-black text-white mt-1">Daily Biological Requirements Matrix</h2>
          <p class="text-xs text-slate-400 mt-1">
            Men and women exhibit distinct endocrine, hematologic, and muscular needs for energy and micronutrients.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr class="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                <th class="py-3 px-4 font-bold">Nutrient / Parameter</th>
                <th class="py-3 px-4 font-bold text-teal-400">👨 Biological Males (Adult)</th>
                <th class="py-3 px-4 font-bold text-pink-400">👩 Biological Females (Adult)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              {genderMatrix.map((row, idx) => (
                <tr key={idx} class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3 px-4 font-bold text-white">{row.nutrient}</td>
                  <td class="py-3 px-4 text-teal-300">{row.men}</td>
                  <td class="py-3 px-4 text-pink-300">{row.women}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gender Selection Tabs for 7-Meal Timeline */}
      <div class="flex items-center justify-center gap-3">
        <button
          onClick={() => setActiveGender('men')}
          class={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeGender === 'men'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>👨</span> Men's Full Day Schedule (2,400 - 2,800 kcal)
        </button>
        <button
          onClick={() => setActiveGender('women')}
          class={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeGender === 'women'
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>👩</span> Women's Full Day Schedule (1,800 - 2,200 kcal)
        </button>
      </div>

      {/* 7-Meal Schedule Display */}
      {currentPlan && (
        <div class={`fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border ${
          activeGender === 'men' ? 'border-teal-500/40' : 'border-pink-500/40'
        } shadow-2xl space-y-8 animate-in fade-in duration-150`}>
          
          {/* Banner with Photo Preview */}
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-700 bg-slate-950 shadow-md">
                <img
                  src={genderPhotos[activeGender]}
                  alt={currentPlan.title}
                  class="w-full h-full object-cover"
                />
              </div>
              <div>
                <span class={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-1.5 inline-block ${
                  activeGender === 'men' ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-pink-500/20 text-pink-300 border-pink-500/30'
                }`}>
                  Full 24-Hour Schedule
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">{currentPlan.title}</h2>
                <p class="text-xs text-slate-300 mt-0.5">{currentPlan.goal}</p>
              </div>
            </div>

            <div class="text-xs font-mono font-bold text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {currentPlan.caloricRange}
            </div>
          </div>

          {/* 7 Meals Timeline Grid */}
          <div class="space-y-4">
            {currentPlan.meals.map((meal, idx) => (
              <div
                key={idx}
                class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div class="shrink-0 w-full md:w-56">
                  <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold block w-fit mb-1">
                    {meal.time}
                  </span>
                  <h3 class="text-sm font-extrabold text-white">Meal {idx + 1}: {meal.name}</h3>
                </div>

                <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/20">
                    <span class="text-[10px] font-bold text-emerald-400 block mb-0.5">🌿 Vegetarian Option:</span>
                    <p class="text-slate-200">{meal.vegOption}</p>
                  </div>
                  <div class="p-3 rounded-xl bg-slate-900 border border-rose-500/20">
                    <span class="text-[10px] font-bold text-rose-400 block mb-0.5">🍗 Non-Vegetarian Option:</span>
                    <p class="text-slate-200">{meal.nonVegOption}</p>
                  </div>
                </div>

                <div class="shrink-0 md:text-right text-[11px] font-mono text-slate-400">
                  <span class="block text-slate-300 font-bold">{meal.macros}</span>
                  <span class="text-[10px] text-teal-400">Balanced Plate</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
