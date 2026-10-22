import React, { useState } from 'react';
import { Play, Activity, ExternalLink, RefreshCw, Repeat, Sparkles } from 'lucide-react';
import { getExerciseYouTube } from '../data/exerciseYouTube';
import { getExerciseAnim } from '../data/exerciseAnimations';

export default function ExerciseVideoPlayer({ 
  exerciseId = 'push-ups',
  poster, 
  title, 
  className = "" 
}) {
  const [playerMode, setPlayerMode] = useState('loop'); // 'loop' (instant movement animation) | 'youtube' (detailed tutorial)
  const [embedBlocked, setEmbedBlocked] = useState(false);
  const ytData = getExerciseYouTube(exerciseId);
  const animData = getExerciseAnim(exerciseId);
  const videoId = ytData?.videoId || "IODxDxX7oi4";

  // Use YouTube nocookie with playlist parameter to support native seamless looping & start directly at form
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${videoId}`;

  const fallbackPoster = poster || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black group select-none border border-slate-800 ${className}`}>
      
      {/* 1. Pure Instant Motion Loop Mode (Zero Intro, Zero Lag, Perfect Movement Loop) */}
      {playerMode === 'loop' ? (
        <div className="relative w-full h-full flex items-center justify-center bg-slate-950">
          <img
            src={animData?.animUrl || fallbackPoster}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = fallbackPoster;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

          {/* Action Callout pill at bottom */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs pointer-events-none">
            <span className="bg-slate-950/90 text-emerald-400 font-bold px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
              <Repeat size={12} className="animate-spin text-emerald-400" style={{ animationDuration: '4s' }} />
              <span>{animData?.movement || 'Clean Movement Form Loop'}</span>
            </span>
          </div>
        </div>
      ) : (
        /* 2. Full YouTube Video Guide Mode */
        !embedBlocked ? (
          <div className="relative w-full h-full">
            <iframe
              src={embedUrl}
              title={title || ytData.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0 absolute inset-0 z-10"
            />
          </div>
        ) : (
          <div 
            onClick={() => {
              setEmbedBlocked(false);
            }}
            className="w-full h-full relative cursor-pointer overflow-hidden flex items-center justify-center bg-black"
          >
            <img
              src={fallbackPoster}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80";
              }}
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2 z-10">
              <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                <Play size={24} fill="currentColor" className="ml-0.5" />
              </div>
              <span className="text-xs text-white font-medium bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                Click to Load Video
              </span>
            </div>
          </div>
        )
      )}

      {/* Top Left Mode Switcher Pill */}
      <div className="absolute top-3 left-3 z-30 flex items-center bg-slate-950/90 backdrop-blur-md rounded-full p-0.5 border border-slate-700 shadow-xl">
        <button
          onClick={() => setPlayerMode('loop')}
          className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            playerMode === 'loop'
              ? 'bg-emerald-500 text-slate-950 shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Instant pure exercise loop without intro lag"
        >
          <Repeat size={11} />
          <span>Loop Movement</span>
        </button>

        <button
          onClick={() => setPlayerMode('youtube')}
          className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
            playerMode === 'youtube'
              ? 'bg-red-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
          title="Watch Full Masterclass Tutorial"
        >
          <Play size={10} fill="currentColor" />
          <span>Full Tutorial</span>
        </button>
      </div>

      {/* Top Right: Watch on YouTube External Link */}
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 hover:bg-red-600 text-white text-[10px] font-bold shadow-lg transition-all border border-slate-700 hover:border-red-500 cursor-pointer"
        title="Open in YouTube"
      >
        <span>YouTube</span>
        <ExternalLink size={11} />
      </a>
    </div>
  );
}
