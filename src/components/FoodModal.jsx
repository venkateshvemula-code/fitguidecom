import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, PlusCircle, Check, Flame, Zap, ShieldCheck } from 'lucide-react';
import { foods } from '../data/fitData';

export default function FoodModal() {
  const { activeModal, closeModal, toggleFavorite, isFavorite, logFoodItem } = useApp();

  if (!activeModal || activeModal.type !== 'food') return null;

  const foodId = activeModal.data;
  const food = (foods || []).find(f => f.id === foodId);

  if (!food) return null;

  const isFav = isFavorite('foods', food.id);

  const proteinScore = Math.round(((food.protein_g * 4) / food.calories) * 100);

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div class="p-6 bg-slate-950 border-b border-slate-800 flex items-start justify-between relative">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                food.dietary_type === 'veg' 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}>
                {food.dietary_type === 'veg' ? '🌿 Vegetarian' : '🍗 Non-Vegetarian'}
              </span>
              <span class="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {food.category || 'Nutrient Dense'}
              </span>
            </div>
            <h2 class="text-2xl font-black text-white font-heading">{food.name}</h2>
            {food.hindi_name && (
              <p class="text-xs text-emerald-400 font-medium">({food.hindi_name})</p>
            )}
            <p class="text-xs text-slate-400 mt-1">Standard Serving: <strong class="text-slate-200">{food.serving_size}</strong></p>
          </div>

          <div class="flex items-center gap-2">
            <button
              onClick={() => toggleFavorite('foods', food.id)}
              class={`p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
                isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-800 text-slate-300 hover:text-white'
              }`}
              title="Save to favorites"
            >
              <Heart size={18} fill={isFav ? "currentColor" : "none"} />
            </button>
            <button
              onClick={closeModal}
              class="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Nutritional Breakdown Body */}
        <div class="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Calorie & Protein Hero Card */}
          <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-xl bg-orange-950/20 border border-orange-500/30 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-lg">
                🔥
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-bold">Energy</span>
                <span class="text-xl font-black text-orange-400 block">{food.calories} kcal</span>
                <span class="text-[10px] text-slate-400">per {food.serving_size}</span>
              </div>
            </div>

            <div class="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                💪
              </div>
              <div>
                <span class="text-[10px] text-slate-400 uppercase font-bold">Protein</span>
                <span class="text-xl font-black text-emerald-400 block">{food.protein_g}g</span>
                <span class="text-[10px] text-emerald-400 font-semibold">{proteinScore}% of Calories</span>
              </div>
            </div>
          </div>

          {/* Macronutrients Grid */}
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Macronutrient Profile</h4>
            <div class="grid grid-cols-3 gap-2.5 text-center">
              <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span class="text-[10px] text-slate-400 block mb-1">Carbohydrates</span>
                <span class="text-base font-black text-blue-400">{food.carbs_g}g</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span class="text-[10px] text-slate-400 block mb-1">Healthy Fats</span>
                <span class="text-base font-black text-amber-400">{food.fat_g}g</span>
              </div>
              <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <span class="text-[10px] text-slate-400 block mb-1">Iron Content</span>
                <span class="text-base font-black text-rose-400">{food.iron_mg || 0} mg</span>
              </div>
            </div>
          </div>

          {/* Best Time to Consume */}
          {food.best_use && (
            <div class="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span class="text-[10px] font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Optimal Timing & Fitness Use
              </span>
              <p class="text-slate-200 text-xs leading-relaxed">{food.best_use}</p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div class="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              logFoodItem({
                name: food.name,
                calories: food.calories,
                protein: food.protein_g
              });
              closeModal();
            }}
            class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <PlusCircle size={15} />
            <span>Add to Daily Tracker (+{food.calories} kcal)</span>
          </button>
          <button
            onClick={closeModal}
            class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
