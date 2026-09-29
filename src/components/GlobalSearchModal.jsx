import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Search, Dumbbell, Apple, Activity, ArrowRight } from 'lucide-react';
import { exercises, foods, diseases } from '../data/fitData';

export default function GlobalSearchModal() {
  const { activeModal, closeModal, openModal, setActiveTab } = useApp();
  const [query, setQuery] = useState('');

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openModal('search');
      }
      if (e.key === 'Escape' && activeModal?.type === 'search') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  if (!activeModal || activeModal.type !== 'search') return null;

  const trimmed = query.trim().toLowerCase();

  const matchingExercises = trimmed
    ? (exercises || []).filter(e => 
        e.name.toLowerCase().includes(trimmed) || 
        e.bodyPart.toLowerCase().includes(trimmed) ||
        (e.equipment && e.equipment.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const matchingFoods = trimmed
    ? (foods || []).filter(f => 
        f.name.toLowerCase().includes(trimmed) || 
        (f.hindi_name && f.hindi_name.toLowerCase().includes(trimmed)) ||
        (f.category && f.category.toLowerCase().includes(trimmed))
      ).slice(0, 6)
    : [];

  const matchingDiseases = trimmed
    ? (diseases || []).filter(d => 
        d.name.toLowerCase().includes(trimmed) || 
        d.overview.toLowerCase().includes(trimmed)
      ).slice(0, 4)
    : [];

  return (
    <div class="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div class="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-3">
          <Search size={20} class="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search exercises, foods, disease cures, height workouts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            class="w-full bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={closeModal}
            class="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Area */}
        <div class="p-4 overflow-y-auto space-y-4 text-xs">
          {!trimmed && (
            <div class="text-center py-8 text-slate-500">
              <p>Type to search exercises, nutrient foods, and clinical cures...</p>
              <div class="flex items-center justify-center gap-2 mt-3 flex-wrap">
                <button onClick={() => setQuery('protein')} class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">protein</button>
                <button onClick={() => setQuery('chest')} class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">chest</button>
                <button onClick={() => setQuery('diabetes')} class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">diabetes</button>
                <button onClick={() => setQuery('height')} class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300">height</button>
              </div>
            </div>
          )}

          {/* Exercises Matches */}
          {matchingExercises.length > 0 && (
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                Exercises ({matchingExercises.length})
              </span>
              <div class="space-y-1">
                {matchingExercises.map(ex => (
                  <button
                    key={ex.id}
                    onClick={() => {
                      closeModal();
                      openModal('exercise', ex.id);
                    }}
                    class="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div class="flex items-center gap-2.5">
                      <Dumbbell size={16} class="text-emerald-400" />
                      <div>
                        <span class="font-bold text-white block">{ex.name}</span>
                        <span class="text-[10px] text-slate-400 capitalize">{ex.bodyPart} • {ex.difficulty}</span>
                      </div>
                    </div>
                    <ArrowRight size={14} class="text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Foods Matches */}
          {matchingFoods.length > 0 && (
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-2">
                Nutritious Foods ({matchingFoods.length})
              </span>
              <div class="space-y-1">
                {matchingFoods.map(food => (
                  <button
                    key={food.id}
                    onClick={() => {
                      closeModal();
                      openModal('food', food.id);
                    }}
                    class="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div class="flex items-center gap-2.5">
                      <Apple size={16} class="text-orange-400" />
                      <div>
                        <span class="font-bold text-white block">{food.name} {food.hindi_name ? `(${food.hindi_name})` : ''}</span>
                        <span class="text-[10px] text-slate-400">{food.calories} kcal • {food.protein_g}g Protein</span>
                      </div>
                    </div>
                    <ArrowRight size={14} class="text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Diseases Matches */}
          {matchingDiseases.length > 0 && (
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-2">
                Disease Treatments & Cures ({matchingDiseases.length})
              </span>
              <div class="space-y-1">
                {matchingDiseases.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      closeModal();
                      setActiveTab('diseases');
                    }}
                    class="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <div class="flex items-center gap-2.5">
                      <span class="text-lg">{d.icon || '🩺'}</span>
                      <div>
                        <span class="font-bold text-white block">{d.name}</span>
                        <span class="text-[10px] text-slate-400 line-clamp-1">{d.overview}</span>
                      </div>
                    </div>
                    <ArrowRight size={14} class="text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && matchingExercises.length === 0 && matchingFoods.length === 0 && matchingDiseases.length === 0 && (
            <div class="text-center py-6 text-slate-400">
              No results found for "{query}". Try a different keyword.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
