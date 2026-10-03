import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Utensils, CheckCircle2, Flame, Activity, PlusCircle, Check } from 'lucide-react';
import { healthyDiets } from '../data/fitData';

export default function HealthyDietTab() {
  const { logFoodItem, showToast, setActiveTab } = useApp();
  const [activeGender, setActiveGender] = useState('men');
  const [dietaryPreference, setDietaryPreference] = useState('all'); // 'all', 'veg', 'nonVeg'
  const [loggedMealIndices, setLoggedMealIndices] = useState({});

  if (!healthyDiets) return null;

  const { genderMatrix, plans } = healthyDiets;
  const currentPlan = plans[activeGender];

  const genderPhotos = {
    "men": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80",
    "women": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80"
  };

  // Helper to estimate calories and protein from meal text
  const parseMealNutrients = (meal, isVeg = true) => {
    const text = isVeg ? (meal.menuVeg || meal.menu || '') : (meal.menuNonVeg || meal.menu || '');
    let protein = 12;
    let calories = 300;

    const pMatch = text.match(/(\d+)\s*g\s*Protein/i);
    if (pMatch) {
      protein = parseInt(pMatch[1], 10);
    }

    const lower = text.toLowerCase();
    if (lower.includes('warm water') || lower.includes('lemon') || lower.includes('chia')) {
      calories = 110;
      protein = 4;
    } else if (lower.includes('snack') || lower.includes('apple') || lower.includes('guava') || lower.includes('coconut water')) {
      calories = 160;
      protein = 5;
    } else if (lower.includes('turmeric milk') || lower.includes('cinnamon milk')) {
      calories = 150;
      protein = 8;
    } else if (lower.includes('lunch')) {
      calories = isVeg ? 620 : 680;
    } else if (lower.includes('dinner')) {
      calories = isVeg ? 480 : 540;
    } else if (lower.includes('breakfast')) {
      calories = isVeg ? 440 : 490;
    } else if (lower.includes('pre-workout') || lower.includes('energy fuel')) {
      calories = 240;
      protein = 8;
    }

    return { calories, protein, text };
  };

  const handleLogMeal = (meal, idx, isVeg = true) => {
    const { calories, protein, text } = parseMealNutrients(meal, isVeg);
    const mealName = `Meal ${idx + 1}: ${meal.name} (${isVeg ? 'Veg' : 'Non-Veg'})`;
    
    logFoodItem({
      name: mealName,
      calories,
      protein
    });

    setLoggedMealIndices(prev => ({
      ...prev,
      [`${activeGender}-${idx}-${isVeg ? 'veg' : 'nonVeg'}`]: true
    }));
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

      {/* Interactive Controls: Gender Tabs + Diet Filter */}
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl fit-card bg-slate-900 border border-slate-800">
        <div class="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setActiveGender('men')}
            class={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeGender === 'men'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/25 scale-102'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>👨</span> Men's Schedule (2,200 - 2,500 kcal)
          </button>
          <button
            onClick={() => setActiveGender('women')}
            class={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeGender === 'women'
                ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/25 scale-102'
                : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
            }`}
          >
            <span>👩</span> Women's Schedule (1,800 - 2,000 kcal)
          </button>
        </div>

        {/* Dietary Filter */}
        <div class="flex items-center gap-2 text-xs">
          <span class="text-slate-400 font-semibold hidden md:inline">Dietary Filter:</span>
          <div class="inline-flex rounded-xl p-1 bg-slate-950 border border-slate-800">
            <button
              onClick={() => setDietaryPreference('all')}
              class={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                dietaryPreference === 'all' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Options
            </button>
            <button
              onClick={() => setDietaryPreference('veg')}
              class={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                dietaryPreference === 'veg' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🌿 Veg Only
            </button>
            <button
              onClick={() => setDietaryPreference('nonVeg')}
              class={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                dietaryPreference === 'nonVeg' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🍗 Non-Veg Only
            </button>
          </div>
        </div>
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
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80";
                  }}
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

            <div class="flex flex-col items-end gap-2">
              <div class="text-xs font-mono font-bold text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                {currentPlan.caloricRange}
              </div>
              <button
                onClick={() => setActiveTab('tracker')}
                class="text-xs text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View in Daily Tracker</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* 7 Meals Timeline Grid */}
          <div class="space-y-4">
            {currentPlan.meals.map((meal, idx) => {
              const hasSplitOptions = Boolean(meal.menuVeg && meal.menuNonVeg);
              const vegKey = `${activeGender}-${idx}-veg`;
              const nonVegKey = `${activeGender}-${idx}-nonVeg`;
              const isVegLogged = loggedMealIndices[vegKey];
              const isNonVegLogged = loggedMealIndices[nonVegKey];

              return (
                <div
                  key={idx}
                  class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                >
                  <div class="shrink-0 w-full lg:w-60">
                    <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold inline-block mb-1.5">
                      {meal.time}
                    </span>
                    <h3 class="text-sm font-extrabold text-white">Meal {idx + 1}: {meal.name}</h3>
                    <span class="text-[11px] text-slate-400 font-mono mt-1 block">
                      {meal.macros || 'Balanced Bio-Available Plate'}
                    </span>
                  </div>

                  {/* Single Unified Meal (Morning / Snack / Bedtime) */}
                  {!hasSplitOptions && (
                    <div class="flex-1 p-4 rounded-xl bg-slate-900 border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span class="text-[10px] font-bold text-emerald-400 block mb-1">✨ Recommended Whole-Food Plate:</span>
                        <p class="text-xs text-slate-200 leading-relaxed">{meal.menu}</p>
                      </div>
                      <button
                        onClick={() => handleLogMeal(meal, idx, true)}
                        class={`shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          isVegLogged
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                            : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        }`}
                      >
                        {isVegLogged ? <Check size={14} /> : <PlusCircle size={14} />}
                        <span>{isVegLogged ? 'Logged' : 'Log to Tracker'}</span>
                      </button>
                    </div>
                  )}

                  {/* Dual Veg & Non-Veg Split Options (Breakfast, Lunch, Dinner) */}
                  {hasSplitOptions && (
                    <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Vegetarian Option */}
                      {(dietaryPreference === 'all' || dietaryPreference === 'veg') && (
                        <div class="p-4 rounded-xl bg-slate-900 border border-emerald-500/20 flex flex-col justify-between gap-3">
                          <div>
                            <span class="text-[10px] font-bold text-emerald-400 flex items-center gap-1 mb-1">
                              <span>🌿</span> Vegetarian Option:
                            </span>
                            <p class="text-slate-200 leading-relaxed">{meal.menuVeg}</p>
                          </div>
                          <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <span class="text-[11px] text-emerald-400/90 font-mono font-bold">Plant Powered</span>
                            <button
                              onClick={() => handleLogMeal(meal, idx, true)}
                              class={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                isVegLogged
                                  ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                                  : 'bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white border border-slate-700'
                              }`}
                            >
                              {isVegLogged ? <Check size={13} /> : <PlusCircle size={13} />}
                              <span>{isVegLogged ? 'Logged' : 'Log Veg'}</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Non-Vegetarian Option */}
                      {(dietaryPreference === 'all' || dietaryPreference === 'nonVeg') && (
                        <div class="p-4 rounded-xl bg-slate-900 border border-rose-500/20 flex flex-col justify-between gap-3">
                          <div>
                            <span class="text-[10px] font-bold text-rose-400 flex items-center gap-1 mb-1">
                              <span>🍗</span> Non-Vegetarian Option:
                            </span>
                            <p class="text-slate-200 leading-relaxed">{meal.menuNonVeg}</p>
                          </div>
                          <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
                            <span class="text-[11px] text-rose-400/90 font-mono font-bold">High Animal Protein</span>
                            <button
                              onClick={() => handleLogMeal(meal, idx, false)}
                              class={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                                isNonVegLogged
                                  ? 'bg-rose-500/20 border border-rose-500 text-rose-400'
                                  : 'bg-slate-800 hover:bg-rose-600 text-slate-200 hover:text-white border border-slate-700'
                              }`}
                            >
                              {isNonVegLogged ? <Check size={13} /> : <PlusCircle size={13} />}
                              <span>{isNonVegLogged ? 'Logged' : 'Log Non-Veg'}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
