import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Apple, PlusCircle, Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { foods } from '../data/fitData';
import { getFoodPhoto } from '../data/foodPhotos';

export default function FoodsTab() {
  const { openModal, toggleFavorite, isFavorite, logFoodItem } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [dietaryType, setDietaryType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set();
    (foods || []).forEach(f => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, []);

  const filteredFoods = useMemo(() => {
    return (foods || []).filter(f => {
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = f.name.toLowerCase().includes(term);
        const matchesHindi = f.hindi_name && f.hindi_name.toLowerCase().includes(term);
        const matchesCat = f.category && f.category.toLowerCase().includes(term);
        if (!matchesName && !matchesHindi && !matchesCat) return false;
      }

      if (dietaryType !== 'all' && f.dietary_type !== dietaryType) {
        return false;
      }

      if (selectedCategory !== 'all' && f.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, dietaryType, selectedCategory]);

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
          Nutrition Database
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Searchable Food & Macro Matrix
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Search over 25+ nutrient-dense Indian and global foods with exact caloric values, protein concentration, 
          micronutrients, and 1-click addition to your daily nutrition log.
        </p>
      </div>

      {/* Filter Card */}
      <div class="fit-card p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Search input */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Search Food</label>
            <div class="relative">
              <input
                type="text"
                placeholder="Search food (e.g., Paneer, Dal, Chicken)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                class="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
              />
              <Search size={14} class="absolute left-3 top-3 text-slate-500" />
            </div>
          </div>

          {/* Dietary Type Filter */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Dietary Preference</label>
            <select
              value={dietaryType}
              onChange={(e) => setDietaryType(e.target.value)}
              class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Dietary Types</option>
              <option value="veg">🌿 Vegetarian Only</option>
              <option value="non-veg">🍗 Non-Vegetarian Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label class="text-xs font-semibold text-slate-400 block mb-1.5">Food Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              class="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

        <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <span class="text-slate-400">
            Showing <strong class="text-orange-400">{filteredFoods.length}</strong> of {(foods || []).length} foods
          </span>
          <button
            onClick={() => {
              setSearchTerm('');
              setDietaryType('all');
              setSelectedCategory('all');
            }}
            class="text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Foods Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map(food => {
          const isFav = isFavorite('foods', food.id);
          const proteinPercent = Math.round(((food.protein_g * 4) / food.calories) * 100);

          return (
            <div
              key={food.id}
              class="fit-card rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500/50 flex flex-col justify-between group"
            >
              <div>
                {/* Food Image Banner */}
                <div class="relative h-44 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={getFoodPhoto(food.id, food.category)}
                    alt={food.name}
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  <span class={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border shadow ${
                    food.dietary_type === 'veg'
                      ? 'bg-emerald-500 text-slate-950 font-sans border-emerald-400'
                      : 'bg-rose-500 text-white font-sans border-rose-400'
                  }`}>
                    {food.dietary_type === 'veg' ? '🌿 Veg' : '🍗 Non-Veg'}
                  </span>

                  <button
                    onClick={() => toggleFavorite('foods', food.id)}
                    class="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:text-rose-400 backdrop-blur-md transition-colors cursor-pointer"
                  >
                    <Heart size={15} fill={isFav ? "red" : "none"} color={isFav ? "red" : "white"} />
                  </button>

                  <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow">
                    <span class="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur text-orange-400">
                      {food.calories} kcal
                    </span>
                    <span class="text-slate-300">
                      {food.serving_size}
                    </span>
                  </div>
                </div>

                <div class="p-5 pb-0 space-y-2">
                  <div class="flex items-center justify-between">
                    <h3 class="text-base font-extrabold text-white group-hover:text-orange-300 transition-colors">
                      {food.name}
                    </h3>
                    <span class="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                      {food.category}
                    </span>
                  </div>

                  {food.hindi_name && (
                    <span class="text-xs text-emerald-400 block font-medium">({food.hindi_name})</span>
                  )}
                </div>

                <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center mb-3">
                  <div>
                    <span class="text-[10px] text-slate-400 block">Protein</span>
                    <strong class="text-emerald-400 text-xs">{food.protein_g}g</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 block">Carbs</span>
                    <strong class="text-blue-400 text-xs">{food.carbs_g}g</strong>
                  </div>
                  <div>
                    <span class="text-[10px] text-slate-400 block">Fat</span>
                    <strong class="text-amber-400 text-xs">{food.fat_g}g</strong>
                  </div>
                </div>

                <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {food.best_use || 'Nutrient-rich staple ideal for fitness & recovery.'}
                </p>
              </div>

              <div class="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => openModal('food', food.id)}
                  class="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Facts</span>
                  <ArrowRight size={13} />
                </button>

                <button
                  onClick={() => logFoodItem({
                    name: food.name,
                    calories: food.calories,
                    protein: food.protein_g
                  })}
                  class="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <PlusCircle size={13} />
                  <span>Log (+{food.calories})</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
