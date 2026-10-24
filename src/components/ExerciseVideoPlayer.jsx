import React, { useState } from 'react';
import { Play, Activity, ExternalLink, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { getExerciseYouTube } from '../data/exerciseYouTube';

export default function ExerciseVideoPlayer({ 
  exerciseId = 'push-ups',
  poster, 
  title, 
  className = "" 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [embedError, setEmbedError] = useState(false);
  const ytData = getExerciseYouTube(exerciseId);
  const videoId = ytData?.videoId || "IODxDxX7oi4";

  // Use standard embed with autoplay & mute & looping
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${videoId}`;

  const fallbackPoster = poster || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black group select-none border border-slate-800 ${className}`}>
      {isPlaying && !embedError ? (
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
            setEmbedError(false);
            setIsPlaying(true);
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
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 z-10">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
              <Play size={24} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="text-xs text-white font-medium bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
              Click to Play Exercise Tutorial
            </span>
          </div>
        </div>
      )}

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow">
        <Activity size={12} className="animate-pulse" />
        <span>HD Video Tutorial</span>
      </div>

      {/* Always-accessible Watch on YouTube Button */}
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 hover:bg-red-500 text-white text-[11px] font-bold shadow-lg transition-all cursor-pointer hover:scale-105"
        title="Watch directly on YouTube"
      >
        <span>Watch on YouTube</span>
        <ExternalLink size={12} />
      </a>

      {/* Fallback Switcher */}
      <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEmbedError(!embedError);
          }}
          className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw size={10} />
          <span>{embedError ? "Reload Player" : "Show Poster"}</span>
        </button>
      </div>
    </div>
  );
}
