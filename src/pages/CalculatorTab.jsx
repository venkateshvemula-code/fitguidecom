import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calculator, Sparkles, Check, ArrowRight, Flame } from 'lucide-react';

export default function CalculatorTab() {
  const { setDailyTracker, showToast, setActiveTab } = useApp();

  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(24);
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  const [activity, setActivity] = useState(1.55); // Moderate
  const [goal, setGoal] = useState('muscle_gain'); // 'fat_loss', 'maintenance', 'muscle_gain'

  // Mifflin-St Jeor Calculation
  const calculateTargets = () => {
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    bmr += (gender === 'male' ? 5 : -161);

    const tdee = Math.round(bmr * activity);

    let targetCalories = tdee;
    if (goal === 'fat_loss') targetCalories = Math.round(tdee - 450);
    if (goal === 'muscle_gain') targetCalories = Math.round(tdee + 350);

    // Protein: 2.0g/kg for muscle gain/fat loss, 1.6 for maintenance
    const proteinMultiplier = goal === 'maintenance' ? 1.6 : 2.0;
    const targetProtein = Math.round(weightKg * proteinMultiplier);
    const proteinCals = targetProtein * 4;

    // Fats: 25% of target calories
    const fatCals = targetCalories * 0.25;
    const targetFat = Math.round(fatCals / 9);

    // Carbs: Remaining calories
    const remainingCals = Math.max(0, targetCalories - (proteinCals + fatCals));
    const targetCarbs = Math.round(remainingCals / 4);

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      targetProtein,
      targetFat,
      targetCarbs,
      waterLiters: (weightKg * 0.04).toFixed(1)
    };
  };

  const results = calculateTargets();

  const handleApplyToTracker = () => {
    setDailyTracker(prev => ({
      ...prev,
      targetCalories: results.targetCalories,
      targetProtein: results.targetProtein
    }));
    showToast(`Targets saved to Daily Tracker: ${results.targetCalories} kcal & ${results.targetProtein}g protein!`, "success");
    setActiveTab('tracker');
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Metabolic Science
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          TDEE, BMR & Macro Nutrition Calculator
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Powered by the clinically validated Mifflin-St Jeor thermodynamic equation. 
          Calculate your exact caloric energy expenditure and personalized macronutrient breakdown.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <div class="lg:col-span-6 fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 class="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Calculator size={18} class="text-emerald-400" />
            <span>Biometric Parameters</span>
          </h3>

          <div class="space-y-4 text-xs">
            {/* Gender */}
            <div>
              <label class="block text-slate-400 font-semibold mb-1.5">Biological Sex</label>
              <div class="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  class={`py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                    gender === 'male' ? 'bg-teal-600 text-white shadow' : 'bg-slate-950 border border-slate-700 text-slate-400'
                  }`}
                >
                  👨 Biological Male
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  class={`py-2.5 rounded-xl font-bold transition-all cursor-pointer ${
                    gender === 'female' ? 'bg-pink-600 text-white shadow' : 'bg-slate-950 border border-slate-700 text-slate-400'
                  }`}
                >
                  👩 Biological Female
                </button>
              </div>
            </div>

            {/* Age, Weight, Height */}
            <div class="grid grid-cols-3 gap-3">
              <div>
                <label class="block text-slate-400 font-semibold mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label class="block text-slate-400 font-semibold mb-1">Weight (kg)</label>
                <input
                  type="number"
                  min="30"
                  max="250"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>

              <div>
                <label class="block text-slate-400 font-semibold mb-1">Height (cm)</label>
                <input
                  type="number"
                  min="100"
                  max="230"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                />
              </div>
            </div>

            {/* Activity Level */}
            <div>
              <label class="block text-slate-400 font-semibold mb-1.5">Weekly Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                class="w-full py-2.5 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-emerald-500"
              >
                <option value={1.2}>Sedentary (Desk job, little to no exercise)</option>
                <option value={1.375}>Lightly Active (1-3 days light workout/week)</option>
                <option value={1.55}>Moderately Active (3-5 days gym/sports)</option>
                <option value={1.725}>Very Active (6-7 days heavy training)</option>
                <option value={1.9}>Extremely Active (Athletic training twice daily)</option>
              </select>
            </div>

            {/* Goal */}
            <div>
              <label class="block text-slate-400 font-semibold mb-1.5">Fitness & Physique Goal</label>
              <div class="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setGoal('fat_loss')}
                  class={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                    goal === 'fat_loss' ? 'bg-orange-600 text-white shadow' : 'bg-slate-950 border border-slate-700 text-slate-400'
                  }`}
                >
                  🔥 Fat Loss (-450 kcal)
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('maintenance')}
                  class={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                    goal === 'maintenance' ? 'bg-teal-600 text-white shadow' : 'bg-slate-950 border border-slate-700 text-slate-400'
                  }`}
                >
                  ⚖️ Maintain Weight
                </button>
                <button
                  type="button"
                  onClick={() => setGoal('muscle_gain')}
                  class={`py-2 px-2 rounded-xl text-center font-bold text-[11px] transition-all cursor-pointer ${
                    goal === 'muscle_gain' ? 'bg-emerald-600 text-white shadow' : 'bg-slate-950 border border-slate-700 text-slate-400'
                  }`}
                >
                  💪 Muscle Gain (+350 kcal)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Computed Results Card */}
        <div class="lg:col-span-6 fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl space-y-6">
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Target Prescription</span>
              <h3 class="text-xl font-black text-white">Daily Caloric & Macro Target</h3>
            </div>
            <span class="text-2xl">⚡</span>
          </div>

          {/* Calorie Card */}
          <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <span class="text-xs text-slate-400 font-semibold block mb-0.5">Target Daily Calories</span>
              <span class="text-3xl sm:text-4xl font-black text-emerald-400 font-heading">
                {results.targetCalories} <span class="text-lg font-bold text-slate-400">kcal/day</span>
              </span>
              <div class="text-[11px] text-slate-400 mt-1">
                BMR: <strong class="text-slate-200">{results.bmr}</strong> kcal • Maintenance TDEE: <strong class="text-slate-200">{results.tdee}</strong> kcal
              </div>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-2xl">
              🎯
            </div>
          </div>

          {/* Macro Breakdown */}
          <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">Macronutrient Distribution</h4>
            
            <div class="grid grid-cols-3 gap-3">
              <div class="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-center">
                <span class="text-[10px] text-slate-400 block mb-1">Target Protein</span>
                <span class="text-xl font-black text-emerald-400">{results.targetProtein}g</span>
                <span class="text-[10px] text-slate-500 block mt-1">{results.targetProtein * 4} kcal</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/80 border border-blue-500/30 text-center">
                <span class="text-[10px] text-slate-400 block mb-1">Carbohydrates</span>
                <span class="text-xl font-black text-blue-400">{results.targetCarbs}g</span>
                <span class="text-[10px] text-slate-500 block mt-1">{results.targetCarbs * 4} kcal</span>
              </div>

              <div class="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 text-center">
                <span class="text-[10px] text-slate-400 block mb-1">Healthy Fats</span>
                <span class="text-xl font-black text-amber-400">{results.targetFat}g</span>
                <span class="text-[10px] text-slate-500 block mt-1">{results.targetFat * 9} kcal</span>
              </div>
            </div>
          </div>

          {/* Daily Water Prescription */}
          <div class="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs">
            <div class="flex items-center gap-2">
              <span class="text-lg">💧</span>
              <span class="text-slate-300">Recommended Daily Hydration:</span>
            </div>
            <strong class="text-teal-400 font-mono text-sm">{results.waterLiters} Liters ({Math.round(results.waterLiters * 4)} glasses)</strong>
          </div>

          {/* Apply Button */}
          <button
            onClick={handleApplyToTracker}
            class="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <span>Apply These Targets to Daily Tracker</span>
            <ArrowRight size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}
