import React, { useState } from 'react';
import { Play, Pause, Activity, ExternalLink, RefreshCw } from 'lucide-react';
import { getExerciseYouTube } from '../data/exerciseYouTube';

export default function ExerciseVideoPlayer({ 
  exerciseId = 'push-ups',
  poster, 
  title, 
  className = "" 
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const ytData = getExerciseYouTube(exerciseId);
  const videoId = ytData.videoId;

  // Construct YouTube Embed URL with autoplay, mute, loop, and no annoying related controls
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&modestbranding=1&rel=0`;

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-black group select-none border border-slate-800 ${className}`}>
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={title || ytData.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0 absolute inset-0 z-10"
        />
      ) : (
        <div 
          onClick={() => setIsPlaying(true)}
          className="w-full h-full relative cursor-pointer overflow-hidden flex items-center justify-center bg-black"
        >
          <img
            src={poster || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
            <div className="w-14 h-14 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
              <Play size={24} fill="currentColor" className="ml-0.5" />
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Badge */}
      <div className="absolute top-3 left-3 z-20 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow">
        <Activity size={12} className="animate-pulse" />
        <span>HD Video Tutorial</span>
      </div>

      {/* Direct YouTube Link Badge in top right */}
      <a
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/90 hover:bg-red-600 text-white text-[10px] font-bold shadow transition-all cursor-pointer"
        title="Open in YouTube"
      >
        <span>YouTube</span>
        <ExternalLink size={11} />
      </a>
    </div>
  );
}
