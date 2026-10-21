import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Apple, PlusCircle, Heart, ArrowRight, RotateCcw } from 'lucide-react';
import { foods } from '../data/fitData';
import { getFoodPhoto } from '../data/foodPhotos';
import TiltCard from '../components/TiltCard';

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
        const matchesName = f.name?.toLowerCase().includes(term);
        const hindi = f.hindiName || f.hindi_name;
        const matchesHindi = hindi && hindi.toLowerCase().includes(term);
        const matchesCat = f.category && f.category.toLowerCase().includes(term);
        if (!matchesName && !matchesHindi && !matchesCat) return false;
      }

      const foodDiet = (f.dietaryType || f.dietary_type || '').toLowerCase();
      if (dietaryType === 'veg' && (!foodDiet.includes('veg') || foodDiet.includes('non'))) {
        return false;
      }
      if (dietaryType === 'non-veg' && !foodDiet.includes('non')) {
        return false;
      }

      if (selectedCategory !== 'all' && f.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [searchTerm, dietaryType, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
          Nutrition Database
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Searchable Food & Macro Matrix
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Search over 25+ nutrient-dense Indian and global foods with exact caloric values, protein concentration, 
          micronutrients, and 1-click addition to your daily nutrition log.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg shadow-black/20">
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search foods by English or Hindi name (e.g. Paneer, पनीर, Oats, Dal)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>

        {/* Filter dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Dietary Type Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Dietary Preference</label>
            <select
              value={dietaryType}
              onChange={(e) => setDietaryType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Dietary Types</option>
              <option value="veg">🌿 Vegetarian Only</option>
              <option value="non-veg">🍗 Non-Vegetarian Only</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">Food Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Categories</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
          <span className="text-slate-400">
            Showing <strong className="text-orange-400">{filteredFoods.length}</strong> of {(foods || []).length} foods
          </span>
          <button
            onClick={() => {
              setSearchTerm('');
              setDietaryType('all');
              setSelectedCategory('all');
            }}
            className="text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Foods Grid with 3D Interactive Tilt & Glowing Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFoods.map(food => {
          const isFav = isFavorite('foods', food.id);
          const proteinVal = food.protein ?? food.protein_g ?? 0;
          const carbsVal = food.carbs ?? food.carbs_g ?? 0;
          const fatVal = food.fat ?? food.fat_g ?? 0;
          const servingSize = food.servingSize || food.serving_size || '1 serving';
          const hindiName = food.hindiName || food.hindi_name;
          const foodDiet = (food.dietaryType || food.dietary_type || '').toLowerCase();
          const isVeg = foodDiet.includes('veg') && !foodDiet.includes('non');

          return (
            <TiltCard key={food.id} glowColor="rgba(249, 115, 22, 0.28)">
              <div
                className="fit-card rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-orange-500/50 flex flex-col justify-between group h-full"
              >
                <div>
                  {/* Food Image Banner */}
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <img
                      src={getFoodPhoto(food.id, food.category)}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=700&auto=format&fit=crop&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                    <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border shadow ${
                      isVeg
                        ? 'bg-emerald-500 text-slate-950 font-sans border-emerald-400'
                        : 'bg-rose-500 text-white font-sans border-rose-400'
                    }`}>
                      {isVeg ? '🌿 Veg' : '🍗 Non-Veg'}
                    </span>

                    <button
                      onClick={() => toggleFavorite('foods', food.id)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:text-rose-400 backdrop-blur-md transition-colors cursor-pointer"
                    >
                      <Heart size={15} fill={isFav ? "red" : "none"} color={isFav ? "red" : "white"} />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow">
                      <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur text-orange-400">
                        {food.calories} kcal
                      </span>
                      <span className="text-slate-300">
                        {servingSize}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 pb-0 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-white group-hover:text-orange-300 transition-colors">
                        {food.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                        {food.category}
                      </span>
                    </div>

                    {hindiName && (
                      <span className="text-xs text-emerald-400 block font-medium">({hindiName})</span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center mb-3 mx-5 mt-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Protein</span>
                      <strong className="text-emerald-400 text-xs">{proteinVal}g</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Carbs</span>
                      <strong className="text-blue-400 text-xs">{carbsVal}g</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Fat</span>
                      <strong className="text-amber-400 text-xs">{fatVal}g</strong>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed px-5">
                    {food.bestUseLabel || food.best_use || food.description || 'Nutrient-rich staple ideal for fitness & recovery.'}
                  </p>
                </div>

                <div className="p-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-2 mt-4">
                  <button
                    onClick={() => openModal('food', food.id)}
                    className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Facts</span>
                    <ArrowRight size={13} />
                  </button>

                  <button
                    onClick={() => logFoodItem({
                      name: food.name,
                      calories: food.calories,
                      protein: proteinVal
                    })}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer shadow"
                  >
                    <PlusCircle size={13} />
                    <span>Log (+{food.calories})</span>
                  </button>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

    </div>
  );
}
