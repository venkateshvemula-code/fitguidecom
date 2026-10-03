import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PlusCircle, Trash2, CheckCircle2, RotateCcw, Droplets, Dumbbell, Utensils } from 'lucide-react';
import { exercises } from '../data/fitData';

export default function DailyTrackerTab() {
  const { 
    dailyTracker, 
    logWater, 
    resetWater, 
    logFoodItem, 
    removeLogItem,
    showToast,
    setActiveTab
  } = useApp();

  const [workoutExercise, setWorkoutExercise] = useState('pushup');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(12);
  const [weightKg, setWeightKg] = useState(0);
  const [workoutLogs, setWorkoutLogs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fitguide_workout_logs') || '[]');
    } catch {
      return [];
    }
  });

  const calsPercent = Math.min(100, Math.round((dailyTracker.loggedCalories / dailyTracker.targetCalories) * 100));
  const proteinPercent = Math.min(100, Math.round((dailyTracker.loggedProtein / dailyTracker.targetProtein) * 100));

  const quickFoods = [
    { name: "Paneer (100g)", calories: 265, protein: 18 },
    { name: "Soya Chunks (50g)", calories: 172, protein: 26 },
    { name: "Whole Eggs (2 pcs)", calories: 156, protein: 12 },
    { name: "Chicken Breast (150g)", calories: 247, protein: 46 },
    { name: "Moong Dal (1 Bowl)", calories: 170, protein: 12 },
    { name: "Whey Scoop (30g)", calories: 120, protein: 24 }
  ];

  const handleLogWorkout = (e) => {
    e.preventDefault();
    const exObj = (exercises || []).find(e => e.id === workoutExercise);
    const newEntry = {
      id: Date.now(),
      name: exObj ? exObj.name : workoutExercise,
      sets,
      reps,
      weightKg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newEntry, ...workoutLogs];
    setWorkoutLogs(updated);
    localStorage.setItem('fitguide_workout_logs', JSON.stringify(updated));
    showToast(`Logged workout: ${newEntry.name} (${sets} sets × ${reps} reps)`, "success");
  };

  const handleRemoveWorkout = (id) => {
    const updated = workoutLogs.filter(w => w.id !== id);
    setWorkoutLogs(updated);
    localStorage.setItem('fitguide_workout_logs', JSON.stringify(updated));
    showToast("Workout entry removed", "info");
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-200">
      
      {/* Header */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Daily Progress
          </span>
          <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
            Nutrition & Workout Daily Log
          </h1>
          <p class="text-xs sm:text-sm text-slate-300 mt-1">
            Track daily hydration, calories, protein intake, and completed workout sets in real time.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('calculator')}
          class="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
        >
          ⚙️ Re-Calculate Macro Targets
        </button>
      </div>

      {/* Top 3 Metric Cards: Calories, Protein, Water */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Calories Progress */}
        <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Calories Intake</span>
            <span class="text-xs font-mono font-bold text-orange-400">{calsPercent}%</span>
          </div>
          <div>
            <span class="text-3xl font-black text-white font-heading">{dailyTracker.loggedCalories}</span>
            <span class="text-xs text-slate-400"> / {dailyTracker.targetCalories} kcal</span>
          </div>
          <div class="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              class="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300"
              style={{ width: `${calsPercent}%` }}
            ></div>
          </div>
          <span class="text-[11px] text-slate-400 block">
            {Math.max(0, dailyTracker.targetCalories - dailyTracker.loggedCalories)} kcal remaining today
          </span>
        </div>

        {/* Protein Progress */}
        <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">Daily Protein</span>
            <span class="text-xs font-mono font-bold text-emerald-400">{proteinPercent}%</span>
          </div>
          <div>
            <span class="text-3xl font-black text-white font-heading">{dailyTracker.loggedProtein}g</span>
            <span class="text-xs text-slate-400"> / {dailyTracker.targetProtein}g</span>
          </div>
          <div class="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              class="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${proteinPercent}%` }}
            ></div>
          </div>
          <span class="text-[11px] text-slate-400 block">
            {Math.max(0, dailyTracker.targetProtein - dailyTracker.loggedProtein)}g protein needed to hit target
          </span>
        </div>

        {/* Water Tracker Card */}
        <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-slate-400">
              Hydration {dailyTracker.waterGlasses >= 8 ? '🎯 Target Hit' : '(8 Glasses Goal)'}
            </span>
            <button
              onClick={resetWater}
              class="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>
          </div>
          <div>
            <span class="text-3xl font-black text-teal-400 font-heading">{dailyTracker.waterGlasses}</span>
            <span class="text-xs text-slate-400"> / 8 Glasses ({dailyTracker.waterGlasses * 250} ml)</span>
            {dailyTracker.waterGlasses > 8 && (
              <span class="text-[11px] font-semibold text-emerald-400 block mt-0.5">
                +{(dailyTracker.waterGlasses - 8)} extra glass{dailyTracker.waterGlasses - 8 > 1 ? 'es' : ''} logged!
              </span>
            )}
          </div>

          {/* 8 Glass Visual Indicators */}
          <div class="grid grid-cols-8 gap-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(glassNum => (
              <button
                key={glassNum}
                onClick={logWater}
                class={`h-8 rounded-lg border transition-all flex items-center justify-center text-xs font-bold cursor-pointer ${
                  glassNum <= dailyTracker.waterGlasses
                    ? 'bg-teal-500 border-teal-400 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'bg-slate-950/80 border-slate-800 text-slate-600 hover:border-teal-500/40'
                }`}
                title={`Glass ${glassNum}`}
              >
                💧
              </button>
            ))}
          </div>

          <button
            onClick={logWater}
            class="w-full py-2 rounded-xl bg-teal-600/80 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>+ Drink 1 Glass (250 ml)</span>
          </button>
        </div>

      </div>

      {/* Main Grid: Quick Log & Logged Items List */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Quick Food Logger */}
        <div class="lg:col-span-6 space-y-6">
          <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <Utensils size={18} class="text-orange-400" />
              <span>Quick Log High-Protein Staples</span>
            </h3>

            <div class="grid grid-cols-2 gap-2.5">
              {quickFoods.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => logFoodItem(item)}
                  class="p-3 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/40 text-left transition-all cursor-pointer flex items-center justify-between group"
                >
                  <div>
                    <span class="text-xs font-bold text-white group-hover:text-orange-300 block">{item.name}</span>
                    <span class="text-[10px] text-slate-400">{item.calories} kcal • {item.protein}g P</span>
                  </div>
                  <PlusCircle size={15} class="text-slate-500 group-hover:text-emerald-400" />
                </button>
              ))}
            </div>

            <div class="pt-2 text-center">
              <button
                onClick={() => setActiveTab('foods')}
                class="text-xs font-semibold text-emerald-400 hover:underline cursor-pointer"
              >
                Browse complete food database (25+ items) ➔
              </button>
            </div>
          </div>

          {/* Today's Logged Items */}
          <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-white flex items-center justify-between">
              <span>Today's Logged Meals ({dailyTracker.loggedItems?.length || 0})</span>
              <span class="text-xs font-mono font-bold text-emerald-400">
                {dailyTracker.loggedCalories} kcal total
              </span>
            </h3>

            {(!dailyTracker.loggedItems || dailyTracker.loggedItems.length === 0) ? (
              <div class="text-center py-8 text-slate-500 text-xs">
                No items logged yet today. Use the quick logger above or search the food database!
              </div>
            ) : (
              <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
                {dailyTracker.loggedItems.map(item => (
                  <div
                    key={item.logId}
                    class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span class="font-bold text-white block">{item.name}</span>
                      <span class="text-[10px] text-slate-400">+{item.calories} kcal • +{item.protein}g protein</span>
                    </div>
                    <button
                      onClick={() => removeLogItem(item.logId)}
                      class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Workout Logger */}
        <div class="lg:col-span-6 space-y-6">
          <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <Dumbbell size={18} class="text-emerald-400" />
              <span>Log Completed Workout Session</span>
            </h3>

            <form onSubmit={handleLogWorkout} class="space-y-3 text-xs">
              <div>
                <label class="block text-slate-400 font-semibold mb-1">Select Exercise</label>
                <select
                  value={workoutExercise}
                  onChange={(e) => setWorkoutExercise(e.target.value)}
                  class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-medium"
                >
                  {(exercises || []).map(ex => (
                    <option key={ex.id} value={ex.id}>{ex.name} ({ex.bodyPart})</option>
                  ))}
                </select>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-slate-400 font-semibold mb-1">Sets</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={sets}
                    onChange={(e) => setSets(Number(e.target.value))}
                    class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                  />
                </div>
                <div>
                  <label class="block text-slate-400 font-semibold mb-1">Reps</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={reps}
                    onChange={(e) => setReps(Number(e.target.value))}
                    class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                  />
                </div>
                <div>
                  <label class="block text-slate-400 font-semibold mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    class="w-full py-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer shadow-md"
              >
                + Record Workout Routine
              </button>
            </form>
          </div>

          {/* Workout History */}
          <div class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 class="text-base font-bold text-white flex items-center justify-between">
              <span>Completed Routines ({workoutLogs.length})</span>
            </h3>

            {workoutLogs.length === 0 ? (
              <div class="text-center py-8 text-slate-500 text-xs">
                No exercises recorded yet today. Complete your sets and log them above!
              </div>
            ) : (
              <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
                {workoutLogs.map(w => (
                  <div
                    key={w.id}
                    class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span class="font-bold text-white block">{w.name}</span>
                      <span class="text-[10px] text-emerald-400">
                        {w.sets} Sets × {w.reps} Reps {w.weightKg > 0 ? `@ ${w.weightKg} kg` : '(Bodyweight)'} • {w.time}
                      </span>
                    </div>
                    <button
                      onClick={() => handleRemoveWorkout(w.id)}
                      class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
