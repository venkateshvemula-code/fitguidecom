import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, PlusCircle, Check, Flame, Zap, ShieldCheck } from 'lucide-react';
import { foods } from '../data/fitData';
import { getFoodPhoto } from '../data/foodPhotos';

export default function FoodModal() {
  const { activeModal, closeModal, toggleFavorite, isFavorite, logFoodItem } = useApp();

  if (!activeModal || activeModal.type !== 'food') return null;

  const foodId = activeModal.data;
  const food = (foods || []).find(f => f.id === foodId);

  if (!food) return null;

  const isFav = isFavorite('foods', food.id);

  const proteinScore = Math.round(((food.protein_g * 4) / food.calories) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Photo Preview */}
        <div className="relative h-48 sm:h-52 w-full bg-slate-950 shrink-0 overflow-hidden">
          <img 
            src={getFoodPhoto(food.id, food.category)} 
            alt={food.name} 
            className="w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          {/* Quick Action Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite('foods', food.id)}
              className={`p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
                isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60'
              }`}
              title="Save to favorites"
            >
              <Heart size={18} fill={isFav ? "currentColor" : "none"} />
            </button>
            <button
              onClick={closeModal}
              className="p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/60 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="absolute bottom-3 left-6">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border backdrop-blur-md ${
                food.dietary_type === 'veg' 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}>
                {food.dietary_type === 'veg' ? '🌿 Vegetarian' : '🍗 Non-Vegetarian'}
              </span>
              <span className="text-[10px] text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700 backdrop-blur-md">
                {food.category || 'Nutrient Dense'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-black text-white font-heading">{food.name}</h2>
            {food.hindi_name && (
              <p className="text-xs text-emerald-400 font-medium">({food.hindi_name})</p>
            )}
            <p className="text-xs text-slate-400 mt-1">Standard Serving: <strong className="text-slate-200">{food.serving_size}</strong></p>
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
