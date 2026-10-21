import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Clock, Dumbbell, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight, Video, Image as ImageIcon } from 'lucide-react';
import { exercises, womenHealth } from '../data/fitData';
import { getExercisePhoto } from '../data/exercisePhotos';
import ExerciseVideoPlayer from './ExerciseVideoPlayer';

export default function ExerciseModal() {
  const { activeModal, closeModal, toggleFavorite, isFavorite, setActiveTab } = useApp();
  const [viewMode, setViewMode] = useState('video'); // 'video' | 'photo'

  if (!activeModal || activeModal.type !== 'exercise') return null;

  const exerciseId = activeModal.data;
  
  // Find exercise in main database or in womenHealth pregnancy safe exercises
  let ex = (exercises || []).find(e => e.id === exerciseId);
  let isPregnancyExercise = false;

  if (!ex && womenHealth?.pregnancyCare?.safeExercises) {
    const pregEx = womenHealth.pregnancyCare.safeExercises.find(e => e.id === exerciseId);
    if (pregEx) {
      isPregnancyExercise = true;
      ex = {
        id: pregEx.id,
        name: pregEx.name,
        difficulty: pregEx.trimesterSafe,
        bodyPart: 'pregnancy',
        equipment: 'bodyweight',
        instructions: pregEx.instructions,
        benefits: pregEx.advantages,
        risks: pregEx.disadvantagesAndRisks,
        safetyTips: ["Stay hydrated", "Avoid overheating", "Listen to your body"],
        photoUrl: pregEx.photoUrl
      };
    }
  }

  if (!ex) return null;

  const isFav = isFavorite('exercises', ex.id);

  const getDifficultyBadge = (diff) => {
    switch (diff?.toLowerCase()) {
      case 'beginner': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'intermediate': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'advanced': return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      default: return 'bg-teal-500/20 text-teal-400 border-teal-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with YouTube Form Video & Photo Switcher */}
        <div className="relative h-72 sm:h-80 w-full bg-slate-950 shrink-0 overflow-hidden">
          {viewMode === 'video' ? (
            <ExerciseVideoPlayer
              exerciseId={ex.id}
              poster={getExercisePhoto(ex.id, ex.bodyPart)}
              title={ex.name}
              className="w-full h-full rounded-none border-none"
            />
          ) : (
            <img 
              src={getExercisePhoto(ex.id, ex.bodyPart)} 
              alt={ex.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80";
              }}
            />
          )}

          {/* Close & Action Controls */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 z-30">
            <div className="flex items-center bg-slate-950/85 backdrop-blur-md rounded-full p-1 border border-slate-700 shadow-lg">
              <button
                onClick={() => setViewMode('video')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Watch HD YouTube Video"
              >
                <Video size={13} />
                <span>Video Tutorial</span>
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'photo'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="View Photo"
              >
                <ImageIcon size={13} />
                <span>Photo</span>
              </button>
            </div>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-30">
            <button
              onClick={() => toggleFavorite('exercises', ex.id)}
              className={`p-2 rounded-full backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
                isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-900/80 text-white hover:bg-slate-800'
              }`}
              title="Save to favorites"
            >
              <Heart size={16} fill={isFav ? "currentColor" : "none"} />
            </button>
            <button
              onClick={closeModal}
              className="p-2 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-colors cursor-pointer"
              title="Close dialog"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Header Title & Badges */}
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(ex.difficulty)}`}>
                {ex.difficulty}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {ex.equipment || 'Bodyweight'}
              </span>
              {ex.bodyPart && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {ex.bodyPart}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading">{ex.name}</h2>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Clock size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Rest Period</span>
                <span className="font-bold text-white">{ex.restTimeSec ? `${ex.restTimeSec} seconds` : '45 - 60 sec'}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Dumbbell size={18} className="text-teal-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Standard Sets & Reps</span>
                <span className="font-bold text-white">{ex.setsReps || '3 Sets × 10-12 Reps'}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
              <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Primary Focus</span>
                <span className="font-bold text-white capitalize">{ex.bodyPart || 'Full Body'}</span>
              </div>
            </div>
          </div>

          {/* Form Instructions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Step-by-Step Form & Execution</h4>
            <p className="text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800 whitespace-pre-line">
              {ex.instructions}
            </p>
          </div>

          {/* Benefits & Advantages */}
          {ex.benefits && ex.benefits.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                {isPregnancyExercise ? '✨ Proven Labor & Maternal Advantages' : 'Key Anatomical Benefits'}
              </h4>
              <ul className="space-y-1.5">
                {ex.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risks / Disadvantages / Common Mistakes */}
          {ex.risks && ex.risks.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle size={15} />
                <span>{isPregnancyExercise ? '⚠️ Medical Risks & Contraindications' : 'Injury Risks & Mistakes to Avoid'}</span>
              </h4>
              <ul className="space-y-1.5">
                {ex.risks.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <span className="text-rose-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety Tips */}
          {ex.safetyTips && ex.safetyTips.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Pro Safety Tips</h4>
              <ul className="space-y-1 text-slate-300 text-xs">
                {ex.safetyTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-400">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              closeModal();
              setActiveTab('tracker');
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Log in Workout Tracker</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
