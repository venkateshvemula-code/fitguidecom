import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Dumbbell, Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { exercises, bodyParts } from '../data/fitData';

export default function ExercisesTab() {
  const { openModal, toggleFavorite, isFavorite } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');

  const filteredExercises = useMemo(() => {
    return (exercises || []).filter(ex => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = ex.name.toLowerCase().includes(term);
        const matchesBody = ex.bodyPart.toLowerCase().includes(term);
        const matchesEquip = ex.equipment && ex.equipment.toLowerCase().includes(term);
        if (!matchesName && !matchesBody && !matchesEquip) return false;
      }

      // Body part
      if (selectedBodyPart !== 'all' && ex.bodyPart !== selectedBodyPart) {
        return false;
      }

      // Difficulty
      if (selectedDifficulty !== 'all' && ex.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) {
        return false;
      }

      // Equipment
      if (selectedEquipment !== 'all') {
        if (!ex.equipment || !ex.equipment.toLowerCase().includes(selectedEquipment.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedBodyPart, selectedDifficulty, selectedEquipment]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedBodyPart('all');
    setSelectedDifficulty('all');
    setSelectedEquipment('all');
  };

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Exercise Library
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Explore Foundation & Compound Workouts
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Filter by target muscle group, execution difficulty, and available gym equipment. 
          Tap any workout for complete form cues, common mistakes, and injury prevention tips.
        </p>
      </div>

      {/* Filter Card */}
      <div class="fit-card p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Search input */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Search Exercises</label>
            <div class="relative">
              <input
                type="text"
                placeholder="Search by name, muscle, equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                class="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <Search size={14} class="absolute left-3 top-3 text-slate-500" />
            </div>
          </div>

          {/* Body part filter */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Target Body Part</label>
            <select
              value={selectedBodyPart}
              onChange={(e) => setSelectedBodyPart(e.target.value)}
              class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Muscle Groups</option>
              {bodyParts.map(bp => (
                <option key={bp.id} value={bp.id}>{bp.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty filter */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Difficulty Level</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Equipment filter */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Equipment</label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Equipment</option>
              <option value="bodyweight">Bodyweight</option>
              <option value="dumbbell">Dumbbells</option>
              <option value="barbell">Barbell</option>
              <option value="bar">Pull-up / Parallel Bars</option>
            </select>
          </div>

        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <span class="text-slate-400">
            Showing <strong class="text-emerald-400">{filteredExercises.length}</strong> of {(exercises || []).length} exercises
          </span>
          <button
            onClick={resetFilters}
            class="text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Exercises Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(ex => {
          const isFav = isFavorite('exercises', ex.id);
          return (
            <div
              key={ex.id}
              class="fit-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800 hover:border-emerald-500/50"
            >
              <div>
                <div class="relative h-48 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={ex.photoUrl || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80"}
                    alt={ex.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <span class="absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-sans shadow">
                    {ex.difficulty}
                  </span>

                  <button
                    onClick={() => toggleFavorite('exercises', ex.id)}
                    class="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:text-rose-400 backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <Heart size={15} fill={isFav ? "red" : "none"} color={isFav ? "red" : "white"} />
                  </button>

                  <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow">
                    <span class="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur">
                      {ex.setsReps || '3 × 10'}
                    </span>
                    <span class="capitalize text-emerald-300">
                      {ex.equipment || 'Bodyweight'}
                    </span>
                  </div>
                </div>

                <div class="p-5 space-y-3">
                  <div class="flex items-center justify-between">
                    <h3 class="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                      {ex.name}
                    </h3>
                    <span class="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 capitalize">
                      {ex.bodyPart}
                    </span>
                  </div>

                  <p class="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                    {ex.instructions}
                  </p>

                  <div class="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Rest: <strong class="text-slate-200">{ex.restTimeSec || 45}s</strong></span>
                    <span class="text-emerald-400 font-semibold">{ex.benefits?.length || 2} proven benefits</span>
                  </div>
                </div>
              </div>

              <div class="p-5 pt-0">
                <button
                  onClick={() => openModal('exercise', ex.id)}
                  class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Detailed Form Guide</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div class="text-center py-16 text-slate-400 space-y-3">
          <Dumbbell size={36} class="mx-auto text-slate-600" />
          <h3 class="text-base font-bold text-white">No exercises match your filters</h3>
          <p class="text-xs text-slate-500">Try changing your search keyword or clearing the filters.</p>
          <button
            onClick={resetFilters}
            class="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
