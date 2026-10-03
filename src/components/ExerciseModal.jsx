import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Heart, Clock, Dumbbell, ShieldAlert, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { exercises, womenHealth } from '../data/fitData';
import { getExercisePhoto } from '../data/exercisePhotos';

export default function ExerciseModal() {
  const { activeModal, closeModal, toggleFavorite, isFavorite, setActiveTab } = useApp();

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
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with Photo Preview */}
        <div class="relative h-56 sm:h-64 w-full bg-slate-950 shrink-0 overflow-hidden">
          <img 
            src={getExercisePhoto(ex.id, ex.bodyPart)} 
            alt={ex.name} 
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          
          {/* Close & Favorite buttons */}
          <div class="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => toggleFavorite('exercises', ex.id)}
              class={`p-2.5 rounded-full backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
                isFav ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-900/80 text-white hover:bg-slate-800'
              }`}
              title="Save to favorites"
            >
              <Heart size={18} fill={isFav ? "currentColor" : "none"} />
            </button>
            <button
              onClick={closeModal}
              class="p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 backdrop-blur-md transition-colors cursor-pointer"
              title="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          <div class="absolute bottom-4 left-6 right-6">
            <div class="flex items-center gap-2 mb-1.5 flex-wrap">
              <span class={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(ex.difficulty)}`}>
                {ex.difficulty}
              </span>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                {ex.equipment || 'Bodyweight'}
              </span>
              {ex.bodyPart && (
                <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {ex.bodyPart}
                </span>
              )}
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">{ex.name}</h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div class="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Quick Metrics Bar */}
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Clock size={18} class="text-emerald-400 shrink-0" />
              <div>
                <span class="text-[10px] text-slate-400 block">Rest Period</span>
                <span class="font-bold text-white">{ex.restTimeSec ? `${ex.restTimeSec} seconds` : '45 - 60 sec'}</span>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
              <Dumbbell size={18} class="text-teal-400 shrink-0" />
              <div>
                <span class="text-[10px] text-slate-400 block">Standard Sets & Reps</span>
                <span class="font-bold text-white">{ex.setsReps || '3 Sets × 10-12 Reps'}</span>
              </div>
            </div>
            <div class="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 col-span-2 sm:col-span-1">
              <CheckCircle2 size={18} class="text-emerald-400 shrink-0" />
              <div>
                <span class="text-[10px] text-slate-400 block">Primary Focus</span>
                <span class="font-bold text-white capitalize">{ex.bodyPart || 'Full Body'}</span>
              </div>
            </div>
          </div>

          {/* Form Instructions */}
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">Step-by-Step Form & Execution</h4>
            <p class="text-slate-200 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800 whitespace-pre-line">
              {ex.instructions}
            </p>
          </div>

          {/* Benefits & Advantages */}
          {ex.benefits && ex.benefits.length > 0 && (
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                {isPregnancyExercise ? '✨ Proven Labor & Maternal Advantages' : 'Key Anatomical Benefits'}
              </h4>
              <ul class="space-y-1.5">
                {ex.benefits.map((b, i) => (
                  <li key={i} class="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 size={15} class="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Risks / Disadvantages / Common Mistakes */}
          {ex.risks && ex.risks.length > 0 && (
            <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
              <h4 class="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                <AlertTriangle size={15} />
                <span>{isPregnancyExercise ? '⚠️ Medical Risks & Contraindications' : 'Injury Risks & Mistakes to Avoid'}</span>
              </h4>
              <ul class="space-y-1.5">
                {ex.risks.map((r, i) => (
                  <li key={i} class="flex items-start gap-2 text-slate-300">
                    <span class="text-rose-400 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Safety Tips */}
          {ex.safetyTips && ex.safetyTips.length > 0 && (
            <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 class="text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">Pro Safety Tips</h4>
              <ul class="space-y-1 text-slate-300 text-xs">
                {ex.safetyTips.map((tip, i) => (
                  <li key={i} class="flex items-start gap-2">
                    <span class="text-teal-400">✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div class="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              closeModal();
              setActiveTab('tracker');
            }}
            class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Log in Workout Tracker</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={closeModal}
            class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
