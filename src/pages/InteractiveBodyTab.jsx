import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Dumbbell, Sparkles } from 'lucide-react';
import { bodyParts, exercises } from '../data/fitData';

export default function InteractiveBodyTab() {
  const { openModal } = useApp();
  const [selectedMuscle, setSelectedMuscle] = useState('chest');
  const [view, setView] = useState('anterior'); // 'anterior' or 'posterior'

  const currentPart = bodyParts.find(b => b.id === selectedMuscle) || bodyParts[0];
  const targetedExercises = (exercises || []).filter(e => e.bodyPart === selectedMuscle);

  const musclesList = [
    { id: 'chest', name: 'Chest (Pectorals)', view: 'anterior' },
    { id: 'shoulders', name: 'Shoulders (Deltoids)', view: 'anterior' },
    { id: 'arms', name: 'Arms (Biceps & Triceps)', view: 'anterior' },
    { id: 'core', name: 'Core & Abdominals', view: 'anterior' },
    { id: 'legs', name: 'Quadriceps (Front Thighs)', view: 'anterior' },
    { id: 'back', name: 'Back (Lats & Traps)', view: 'posterior' },
    { id: 'glutes', name: 'Glutes (Hips & Buttocks)', view: 'posterior' },
    { id: 'height', name: 'Spine & Vertebral Column', view: 'posterior' }
  ];

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Functional Anatomy Map
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Interactive Human Musculoskeletal Body
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Select any anatomical muscle group below to inspect functional kinesiology, primary actions, and targeted biomechanical exercises.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Selector & Visual Silhouette */}
        <div class="lg:col-span-5 fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          
          <div class="flex items-center justify-between pb-3 border-b border-slate-800">
            <span class="text-xs font-bold text-slate-300 uppercase tracking-wider">Select Anatomy Group</span>
            <div class="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setView('anterior')}
                class={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  view === 'anterior' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Front View
              </button>
              <button
                onClick={() => setView('posterior')}
                class={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  view === 'posterior' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                Back View
              </button>
            </div>
          </div>

          {/* Interactive Muscle Group Buttons */}
          <div class="grid grid-cols-2 gap-2">
            {musclesList
              .filter(m => m.view === view || m.id === 'height')
              .map(m => {
                const isSelected = selectedMuscle === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMuscle(m.id)}
                    class={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold shadow-lg scale-102'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <span class="text-xs block font-bold">{m.name}</span>
                    <span class="text-[10px] text-slate-400 block mt-0.5">
                      {(exercises || []).filter(e => e.bodyPart === m.id).length} Workouts
                    </span>
                  </button>
                );
              })}
          </div>

          {/* Visual Silhouette Diagram */}
          <div class="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col items-center justify-center text-center">
            <div class="w-32 h-44 rounded-2xl bg-gradient-to-t from-emerald-500/20 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-center text-4xl shadow-inner mb-3">
              {view === 'anterior' ? '🧍‍♂️' : '🚶‍♂️'}
            </div>
            <span class="text-xs font-bold text-emerald-400 capitalize">
              Active Focus: {currentPart.name}
            </span>
            <span class="text-[11px] text-slate-500 mt-0.5">
              Region: {currentPart.region}
            </span>
          </div>

        </div>

        {/* Right Column: Detailed Anatomy & Exercise List */}
        <div class="lg:col-span-7 space-y-6">
          
          {/* Muscle Detail Card */}
          <div class="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {currentPart.region}
                </span>
                <h2 class="text-2xl sm:text-3xl font-black text-white font-heading mt-2">
                  {currentPart.name} Anatomy
                </h2>
              </div>
              <span class="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                {targetedExercises.length} Target Routines
              </span>
            </div>

            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Involved Muscles</h4>
              <p class="text-sm font-semibold text-emerald-300">{currentPart.muscles}</p>
            </div>

            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Functional Biomechanics & Role</h4>
              <p class="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {currentPart.description}
              </p>
            </div>
          </div>

          {/* Target Workouts for this Muscle */}
          <div class="space-y-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Dumbbell size={16} class="text-emerald-400" />
              <span>Targeted Workouts for {currentPart.name} ({targetedExercises.length})</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {targetedExercises.map(ex => (
                <div
                  key={ex.id}
                  class="fit-card rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between"
                >
                  <div class="relative h-36 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={ex.photoUrl || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"}
                      alt={ex.name}
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                    <span class="absolute top-2 left-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      {ex.difficulty}
                    </span>
                    <span class="absolute bottom-2 left-3 font-extrabold text-white text-xs drop-shadow">
                      {ex.name}
                    </span>
                  </div>

                  <div class="p-3.5 space-y-2">
                    <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {ex.instructions}
                    </p>
                    <button
                      onClick={() => openModal('exercise', ex.id)}
                      class="w-full py-2 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Detailed Form Guide</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
