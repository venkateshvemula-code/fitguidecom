import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Dumbbell, 
  Apple, 
  Flame, 
  Heart,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { exercises, foods } from '../data/fitData';

export default function HomeTab() {
  const { setActiveTab, openModal, toggleFavorite, isFavorite } = useApp();

  const featuredExercises = (exercises || []).slice(0, 4);
  const featuredFoods = (foods || []).slice(0, 4);

  const musclePills = [
    { label: "Chest", tab: "exercises", filter: "chest" },
    { label: "Back", tab: "exercises", filter: "back" },
    { label: "Shoulders", tab: "exercises", filter: "shoulders" },
    { label: "Arms & Biceps", tab: "exercises", filter: "arms" },
    { label: "Core & Abs", tab: "exercises", filter: "core" },
    { label: "Legs & Quads", tab: "exercises", filter: "legs" },
    { label: "Glutes", tab: "exercises", filter: "glutes" },
    { label: "📏 Height & Spine", tab: "height", filter: "height" }
  ];

  return (
    <div class="space-y-16 pb-16 animate-in fade-in duration-200">
      
      {/* Hero Banner */}
      <section class="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-6">
            <Sparkles size={14} />
            <span>Interactive Fitness, Anatomy & Nutrition Educational Platform</span>
          </div>

          <h1 class="text-4xl sm:text-6xl font-black font-heading tracking-tight mb-6 max-w-4xl mx-auto text-white">
            Train Smart. Eat Science. <br />
            <span class="text-gradient-emerald">Master Your Body.</span>
          </h1>

          <p class="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Beginner-friendly guidance with verified biomechanics, interactive anatomy maps, 
            height & spinal decompression routines, dedicated female cycle care, clinical disease cures, and local gyms.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={() => setActiveTab('exercises')}
              class="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer hover:scale-105"
            >
              <span>Explore Workouts (16+)</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setActiveTab('women')}
              class="px-6 py-3.5 rounded-xl bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-300 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>🌸 Women's Wellness Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('diseases')}
              class="px-6 py-3.5 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>🩺 Disease Dietary Cures</span>
            </button>
          </div>

          {/* Quick Muscle Pills Strip */}
          <div class="flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto">
            {musclePills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(pill.tab)}
                class="px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-medium transition-all cursor-pointer"
              >
                {pill.label}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 3 Core New Pillars Banner: Women's Health, Disease Cures, Balanced Diets */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Pillar 1: Women's Health */}
          <div 
            onClick={() => setActiveTab('women')}
            class="fit-card p-6 rounded-2xl bg-gradient-to-br from-pink-950/50 via-slate-900 to-slate-900 border border-pink-500/40 hover:border-pink-500/80 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🌸
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 mb-2 inline-block">
                Female Health Hub
              </span>
              <h3 class="text-lg font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
                Women's Health & Pregnancy
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                <strong>Mature cycle duration (21-35 days)</strong>, 4 cycle phases, precautions, iron-rich foods, plus safe pregnancy exercises (Kegels, walking, modified squats) with labor advantages and risks to avoid.
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-pink-400">
              <span>Explore Women's Health Hub</span>
              <span class="group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </div>

          {/* Pillar 2: Disease Management */}
          <div 
            onClick={() => setActiveTab('diseases')}
            class="fit-card p-6 rounded-2xl bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/40 hover:border-amber-500/80 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🩺
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 mb-2 inline-block">
                Evidence-Based Cures
              </span>
              <h3 class="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2">
                Disease Management & Cures
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Dietary cures, harmful foods to avoid, and clinical medicines overview (Metformin, Telmisartan, Statins, Levothyroxine) for <strong>Diabetes, BP, Thyroid, Fatty Liver & Anemia</strong> in males & females.
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>Explore Disease Cures</span>
              <span class="group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </div>

          {/* Pillar 3: Balanced Healthy Diets */}
          <div 
            onClick={() => setActiveTab('diet')}
            class="fit-card p-6 rounded-2xl bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-900 border border-emerald-500/40 hover:border-emerald-500/80 transition-all flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🥗
              </div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2 inline-block">
                Gender Nutrition Matrix
              </span>
              <h3 class="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                Healthy Diets (Men & Women)
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed mb-4">
                Scientific gender requirements (Calories, Protein, Iron, Calcium, Zinc) with <strong>7-meal full-day meal schedules</strong> for men and women with Indian vegetarian & non-veg options.
              </p>
            </div>
            <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>View Full Day Diet Plans</span>
              <span class="group-hover:translate-x-1 transition-transform">➔</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Beginner Exercises */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Foundation Workouts</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Featured Beginner Exercises</h2>
          </div>
          <button
            onClick={() => setActiveTab('exercises')}
            class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Exercises (16+)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredExercises.map(ex => {
            const isFav = isFavorite('exercises', ex.id);
            return (
              <div 
                key={ex.id}
                class="fit-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800 hover:border-emerald-500/50"
              >
                <div>
                  <div class="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <img 
                      src={ex.photoUrl || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"} 
                      alt={ex.name} 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <span class="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      {ex.difficulty}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('exercises', ex.id);
                      }}
                      class="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-slate-900/80 text-white hover:text-rose-400 transition-colors"
                    >
                      <Heart size={14} fill={isFav ? "red" : "none"} color={isFav ? "red" : "white"} />
                    </button>
                    <span class="absolute bottom-2 left-3 right-3 text-sm font-extrabold text-white drop-shadow">
                      {ex.name}
                    </span>
                  </div>

                  <div class="p-4 space-y-2">
                    <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ex.instructions}
                    </p>
                    <div class="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
                      <span class="capitalize">Target: <strong class="text-slate-200">{ex.bodyPart}</strong></span>
                      <span>Rest: <strong class="text-slate-200">{ex.restTimeSec || 45}s</strong></span>
                    </div>
                  </div>
                </div>

                <div class="p-4 pt-0">
                  <button
                    onClick={() => openModal('exercise', ex.id)}
                    class="w-full py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>View Form Guide</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Nutritious Foods */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <span class="text-xs font-bold uppercase tracking-wider text-orange-400">Diet & Nutrition</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-white">Featured Nutrient-Dense Foods</h2>
          </div>
          <button
            onClick={() => setActiveTab('foods')}
            class="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Search All Foods (25+)</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredFoods.map(food => (
            <div 
              key={food.id}
              class="fit-card p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 flex flex-col justify-between group"
            >
              <div>
                <div class="flex items-start justify-between mb-2">
                  <span class={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                    food.dietary_type === 'veg' 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {food.dietary_type === 'veg' ? 'Vegetarian' : 'Non-Veg'}
                  </span>
                  <span class="text-xs font-mono font-bold text-orange-400">{food.calories} kcal</span>
                </div>

                <h3 class="text-base font-extrabold text-white mb-0.5 group-hover:text-orange-300 transition-colors">
                  {food.name}
                </h3>
                {food.hindi_name && (
                  <span class="text-[11px] text-emerald-400 block mb-2 font-medium">({food.hindi_name})</span>
                )}

                <div class="grid grid-cols-3 gap-1.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-center my-3">
                  <div>
                    <span class="text-[9px] text-slate-400 block">Protein</span>
                    <strong class="text-emerald-400 text-xs">{food.protein_g}g</strong>
                  </div>
                  <div>
                    <span class="text-[9px] text-slate-400 block">Carbs</span>
                    <strong class="text-blue-400 text-xs">{food.carbs_g}g</strong>
                  </div>
                  <div>
                    <span class="text-[9px] text-slate-400 block">Fat</span>
                    <strong class="text-amber-400 text-xs">{food.fat_g}g</strong>
                  </div>
                </div>

                <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {food.best_use || `Serving: ${food.serving_size}`}
                </p>
              </div>

              <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span class="text-[11px] text-slate-500">Per {food.serving_size}</span>
                <button
                  onClick={() => openModal('food', food.id)}
                  class="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Nutrition Facts</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
