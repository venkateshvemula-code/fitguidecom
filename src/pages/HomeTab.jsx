import React, { useEffect, useRef } from 'react';
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
  CheckCircle2,
  Droplets,
  Zap,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { exercises, foods } from '../data/fitData';
import { getExercisePhoto } from '../data/exercisePhotos';
import { getFoodPhoto } from '../data/foodPhotos';
import gsap from 'gsap';

export default function HomeTab() {
  const { setActiveTab, openModal, toggleFavorite, isFavorite } = useApp();

  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth hero headline stagger entrance
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out"
      });

      // 3D cards smooth float-in
      gsap.from(".hero-card-3d", {
        scale: 0.9,
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: "back.out(1.4)"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

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
    <div ref={heroRef} class="space-y-16 pb-16 animate-in fade-in duration-200">
      
      {/* 3D Kinetic Hero Banner */}
      <section class="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        
        {/* Subtle 3D Ambient Glowing Spheres */}
        <div class="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div class="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div class="text-center max-w-4xl mx-auto">
            <div class="hero-anim inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-6 shadow-lg shadow-emerald-500/5">
              <Sparkles size={14} class="animate-spin text-emerald-300" style={{ animationDuration: '6s' }} />
              <span>Interactive Fitness, Anatomy & Nutrition 3D Platform</span>
            </div>

            <h1 class="hero-anim text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight mb-6 text-white leading-tight">
              Train Smart. Eat Science. <br />
              <span class="text-gradient-emerald drop-shadow-md">Master Your Body in 3D.</span>
            </h1>

            <p class="hero-anim text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Evidence-based exercise biomechanics, interactive muscle anatomy, axial height decompression routines, 
              female cycle wellness, and targeted clinical therapies.
            </p>

            <div class="hero-anim flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
              <button
                onClick={() => setActiveTab('exercises')}
                class="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Explore Workouts (25+)</span>
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => setActiveTab('women')}
                class="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-pink-500/40 text-pink-300 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer hover:border-pink-500 hover:scale-105 shadow-lg shadow-pink-500/10"
              >
                <span>🌸 Women's Wellness</span>
              </button>
              <button
                onClick={() => setActiveTab('diseases')}
                class="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800/90 border border-amber-500/40 text-amber-300 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer hover:border-amber-500 hover:scale-105 shadow-lg shadow-amber-500/10"
              >
                <span>🩺 Clinical Therapies</span>
              </button>
            </div>

            {/* Quick Muscle Pills Strip */}
            <div class="hero-anim flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto mb-14">
              {musclePills.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(pill.tab)}
                  class="px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-xs font-semibold transition-all cursor-pointer hover:border-emerald-500/50"
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Floating Interactive Metrics & Feature Display */}
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto pt-4">
            
            {/* 3D Item 1: Real-time Biomechanics */}
            <div class="hero-card-3d fit-card glass-card-3d p-6 rounded-3xl border border-emerald-500/30 text-left relative overflow-hidden group hover:border-emerald-400">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                ⚡
              </div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
                Biomechanics
              </span>
              <h3 class="text-base font-extrabold text-white mt-2 mb-1">
                Precision Movement Mechanics
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Step-by-step kinetic joint alignment, breathing cues, and verified injury avoidance protocols for every lift.
              </p>
              <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
                <span>View Exercise Library</span>
                <span>➔</span>
              </div>
            </div>

            {/* 3D Item 2: Clinical Nutrition & Therapies */}
            <div class="hero-card-3d fit-card glass-card-3d p-6 rounded-3xl border border-purple-500/30 text-left relative overflow-hidden group hover:border-purple-400">
              <div class="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                🧘
              </div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20 font-bold">
                Clinical Health
              </span>
              <h3 class="text-base font-extrabold text-white mt-2 mb-1">
                Targeted Clinical Therapies
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Non-drug protocols for Diabetes, Hypertension, Thyroid, NAFLD, PCOS, and Arthritis rehabilitation.
              </p>
              <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-400">
                <span>Explore Therapies</span>
                <span>➔</span>
              </div>
            </div>

            {/* 3D Item 3: Real-Time Tracker & Macro Math */}
            <div class="hero-card-3d fit-card glass-card-3d p-6 rounded-3xl border border-teal-500/30 text-left relative overflow-hidden group hover:border-teal-400">
              <div class="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                💧
              </div>
              <span class="text-[10px] font-mono uppercase tracking-wider text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20 font-bold">
                Hydration & Energy
              </span>
              <h3 class="text-base font-extrabold text-white mt-2 mb-1">
                Daily Tracker & Macro Target
              </h3>
              <p class="text-xs text-slate-300 leading-relaxed">
                Continuous water logging, live calorie tracking, and customized protein requirements calibrated to your body weight.
              </p>
              <div class="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-teal-400">
                <span>Open Tracker</span>
                <span>➔</span>
              </div>
            </div>

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
                      src={getExercisePhoto(ex.id, ex.bodyPart)} 
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
              class="fit-card rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500/50 flex flex-col justify-between group"
            >
              <div>
                {/* Food Image Banner */}
                <div class="relative h-36 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={getFoodPhoto(food.id, food.category)}
                    alt={food.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  <span class={`absolute top-2.5 left-2.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border shadow ${
                    food.dietary_type === 'veg' 
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-sans' 
                      : 'bg-rose-500 text-white border-rose-400 font-sans'
                  }`}>
                    {food.dietary_type === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}
                  </span>
                  <span class="absolute bottom-2 right-2.5 text-xs font-mono font-bold text-orange-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur">
                    {food.calories} kcal
                  </span>
                </div>

                <div class="p-4 pb-0">
                  <h3 class="text-base font-extrabold text-white mb-0.5 group-hover:text-orange-300 transition-colors">
                    {food.name}
                  </h3>
                  {food.hindi_name && (
                    <span class="text-[11px] text-emerald-400 block mb-2 font-medium">({food.hindi_name})</span>
                  )}
                </div>

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
