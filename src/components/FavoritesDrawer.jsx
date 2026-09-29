import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, ArrowRight, Dumbbell, Apple } from 'lucide-react';
import { exercises, foods } from '../data/fitData';

export default function FavoritesDrawer() {
  const { activeModal, closeModal, favorites, toggleFavorite, openModal } = useApp();

  if (!activeModal || activeModal.type !== 'favorites') return null;

  const savedExercises = (exercises || []).filter(e => (favorites.exercises || []).includes(e.id));
  const savedFoods = (foods || []).filter(f => (favorites.foods || []).includes(f.id));

  const totalCount = savedExercises.length + savedFoods.length;

  return (
    <div class="fixed inset-0 z-50 flex items-stretch justify-end bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        class="bg-slate-900 border-l border-slate-700 w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div class="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xl">❤️</span>
            <h3 class="text-base font-bold text-white">Saved Favorites ({totalCount})</h3>
          </div>
          <button
            onClick={closeModal}
            class="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Content */}
        <div class="p-5 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {totalCount === 0 && (
            <div class="text-center py-12 text-slate-500">
              <span class="text-3xl block mb-2">🤍</span>
              <p class="font-medium text-slate-300">No favorites saved yet</p>
              <p class="text-xs text-slate-500 mt-1">Tap the heart icon on any exercise or food to bookmark it here for quick access!</p>
            </div>
          )}

          {/* Saved Exercises */}
          {savedExercises.length > 0 && (
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-2.5">
                Saved Exercises ({savedExercises.length})
              </span>
              <div class="space-y-2">
                {savedExercises.map(ex => (
                  <div
                    key={ex.id}
                    class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div 
                      class="flex items-center gap-2.5 flex-1 cursor-pointer"
                      onClick={() => {
                        closeModal();
                        openModal('exercise', ex.id);
                      }}
                    >
                      <Dumbbell size={16} class="text-emerald-400 shrink-0" />
                      <div>
                        <h4 class="font-bold text-white hover:text-emerald-300 transition-colors">{ex.name}</h4>
                        <span class="text-[10px] text-slate-400 capitalize">{ex.bodyPart} • {ex.difficulty}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite('exercises', ex.id)}
                      class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Foods */}
          {savedFoods.length > 0 && (
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider text-orange-400 block mb-2.5">
                Saved Nutritious Foods ({savedFoods.length})
              </span>
              <div class="space-y-2">
                {savedFoods.map(food => (
                  <div
                    key={food.id}
                    class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div 
                      class="flex items-center gap-2.5 flex-1 cursor-pointer"
                      onClick={() => {
                        closeModal();
                        openModal('food', food.id);
                      }}
                    >
                      <Apple size={16} class="text-orange-400 shrink-0" />
                      <div>
                        <h4 class="font-bold text-white hover:text-orange-300 transition-colors">{food.name}</h4>
                        <span class="text-[10px] text-slate-400">{food.calories} kcal • {food.protein_g}g Protein</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite('foods', food.id)}
                      class="p-1.5 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove from favorites"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
