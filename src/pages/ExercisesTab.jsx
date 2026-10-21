import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, Dumbbell, Heart, ArrowRight, RotateCcw, Video, Play } from 'lucide-react';
import { exercises, bodyParts } from '../data/fitData';
import { getExercisePhoto } from '../data/exercisePhotos';
import { getExerciseAnim } from '../data/exerciseAnimations';
import TiltCard from '../components/TiltCard';

export default function ExercisesTab() {
  const { openModal, toggleFavorite, isFavorite } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [hoveredVideoId, setHoveredVideoId] = useState(null);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Biomechanical Movement Library
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white mt-3 tracking-tight">
          Targeted <span className="text-gradient-emerald">Exercise Library</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Explore evidence-based exercise execution guides with looping animated motion videos, 
          step-by-step biomechanics, proven clinical benefits, and safety form checks.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        {/* Search Input */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search exercises by name, body part, equipment (e.g. chest, barbell, dumbell)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Body Part */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Target Muscle Group
            </label>
            <select
              value={selectedBodyPart}
              onChange={(e) => setSelectedBodyPart(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
            >
              <option value="all">All Muscle Groups</option>
              {(bodyParts || []).map(bp => (
                <option key={bp.id} value={bp.id}>{bp.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Proficiency Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Equipment */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wider">
              Equipment
            </label>
            <select
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
              className="w-full py-2.5 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 capitalize"
            >
              <option value="all">All Equipment Types</option>
              <option value="bodyweight">Bodyweight Only</option>
              <option value="dumbbell">Dumbbell</option>
              <option value="barbell">Barbell</option>
              <option value="pull-up bar">Pull-up Bar</option>
              <option value="machine">Gym Machine</option>
            </select>
          </div>
        </div>

        {/* Results Counter and Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
          <span className="text-slate-400">
            Showing <strong className="text-white">{filteredExercises.length}</strong> verified exercises
          </span>
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer text-xs font-semibold"
          >
            <RotateCcw size={13} />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Exercises Grid with 3D Interactive Tilt, Animated Video Hover, & Glowing Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map(ex => {
          const isFav = isFavorite('exercises', ex.id);
          const animData = getExerciseAnim(ex.id);
          const isHovered = hoveredVideoId === ex.id;

          return (
            <TiltCard key={ex.id} glowColor="rgba(16, 185, 129, 0.28)">
              <div
                className="fit-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800 hover:border-emerald-500/50 h-full"
                onMouseEnter={() => setHoveredVideoId(ex.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
              >
                <div>
                  {/* Media Container with Live Movement Animation */}
                  <div 
                    onClick={() => openModal('exercise', ex.id)}
                    className="relative h-48 w-full bg-slate-950 overflow-hidden cursor-pointer"
                  >
                    <img
                      src={isHovered ? animData.animUrl : getExercisePhoto(ex.id, ex.bodyPart)}
                      alt={ex.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = getExercisePhoto(ex.id, ex.bodyPart);
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none"></div>
                    
                    {/* Animated Movement Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow">
                      <Video size={11} className={isHovered ? "animate-pulse" : ""} />
                      <span>{isHovered ? "Playing Motion" : "Hover For Motion"}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite('exercises', ex.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:text-rose-400 backdrop-blur-md transition-colors cursor-pointer z-10"
                      title="Save to favorites"
                    >
                      <Heart size={15} fill={isFav ? "red" : "none"} color={isFav ? "red" : "white"} />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow pointer-events-none">
                      <span className="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur text-[11px]">
                        {ex.setsReps || '3 × 10'}
                      </span>
                      <span className="capitalize text-emerald-300 text-[11px]">
                        {ex.equipment || 'Bodyweight'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                        {ex.name}
                      </h3>
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700 capitalize">
                        {ex.bodyPart}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {ex.instructions}
                    </p>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Rest: <strong className="text-slate-200">{ex.restTimeSec || 45}s</strong></span>
                      <span className="text-emerald-400 font-semibold">{ex.benefits?.length || 2} proven benefits</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => openModal('exercise', ex.id)}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-200 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow group/btn"
                  >
                    <Play size={13} className="text-emerald-400 group-hover/btn:text-white" fill="currentColor" />
                    <span>Watch Video & Form Guide</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-16 text-slate-400 space-y-3">
          <Dumbbell size={36} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No exercises match your filters</h3>
          <p className="text-xs text-slate-500">Try changing your search keyword or clearing the filters.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

    </div>
  );
}
