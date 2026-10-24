import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Flame, 
  Zap,
  Headphones,
  Radio,
  Music2
} from 'lucide-react';
import { INDIAN_WORKOUT_PLAYLISTS } from '../data/indianWorkoutPlaylists';

export default function IndianWorkoutPlaylistsModal({ isOpen, onClose }) {
  const [selectedLang, setSelectedLang] = useState('telugu');
  const [activeVideoId, setActiveVideoId] = useState(null);

  if (!isOpen) return null;

  const currentPlaylist = INDIAN_WORKOUT_PLAYLISTS.find(p => p.id === selectedLang) || INDIAN_WORKOUT_PLAYLISTS[0];
  const currentVideoId = activeVideoId || currentPlaylist.featuredVideoId;

  // Direct video embed URL with autoplay, audio enabled, and infinite loop
  const embedUrl = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${currentVideoId}`;

  const handleLangChange = (id) => {
    setSelectedLang(id);
    setActiveVideoId(null); // Reset to new language featured video
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Language Badges */}
        <div className={`p-6 bg-gradient-to-r ${currentPlaylist.color} relative overflow-hidden text-white shrink-0`}>
          <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none text-8xl font-black">
            {currentPlaylist.flag}
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/25">
                <Headphones size={26} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                    Desi Workout Beats
                  </h2>
                  <span className="text-xs bg-black/40 backdrop-blur px-2.5 py-0.5 rounded-full border border-white/20 font-bold uppercase tracking-wider">
                    In-App Audio Player
                  </span>
                </div>
                <p className="text-xs text-white/90 font-medium mt-0.5">
                  Plays directly inside the app with zero redirect or delay
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center border border-white/20 transition-transform active:scale-90 cursor-pointer"
              title="Close Player"
            >
              ✕
            </button>
          </div>

          {/* Language Selector Tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-none relative z-10">
            {INDIAN_WORKOUT_PLAYLISTS.map((p) => {
              const isSelected = p.id === selectedLang;
              return (
                <button
                  key={p.id}
                  onClick={() => handleLangChange(p.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-slate-950 border-white shadow-lg scale-105'
                      : 'bg-black/25 text-white/90 border-white/10 hover:bg-black/40'
                  }`}
                >
                  <span>{p.flag}</span>
                  <span>{p.language}</span>
                  <span className="text-[10px] opacity-75 font-normal">({p.nativeName.split(' ')[0]})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="px-6 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold flex items-center gap-1 text-xs">
              <Zap size={11} />
              <span>{currentPlaylist.avgBpm}</span>
            </span>
            <span className="text-xs text-slate-300 font-medium truncate max-w-[280px] sm:max-w-none">
              Now Playing: <strong className="text-white">{currentPlaylist.featuredTitle}</strong>
            </span>
          </div>

          <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
            ✓ Playing In-App (No External Redirects)
          </span>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-900/60">
          
          {/* Active Audio / Video Embed Stream */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-xl">
            <div className="h-64 sm:h-80 w-full relative">
              <iframe
                key={currentVideoId}
                src={embedUrl}
                title={`${currentPlaylist.language} Workout Track`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </div>

          {/* Top Handpicked Anthems for this Language */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame size={15} className="text-orange-400" />
                <span>Featured {currentPlaylist.language} Workout Anthems</span>
              </h3>
              <span className="text-[11px] text-slate-400">Tap any song to play immediately inside this window</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentPlaylist.topTracks.map((track, i) => (
                <div
                  key={i}
                  onClick={() => {
                    if (track.videoId) {
                      setActiveVideoId(track.videoId);
                    }
                  }}
                  className={`p-3.5 rounded-xl border flex items-center justify-between group transition-all cursor-pointer ${
                    activeVideoId === track.videoId
                      ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-black text-xs font-mono border border-emerald-500/20">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {track.title}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {track.artist} • <span className="text-slate-500">{track.movie}</span>
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 text-[10px] font-mono font-bold border border-slate-700 flex items-center gap-1">
                    <span>{track.bpm} BPM</span>
                    <Play size={9} fill="currentColor" className="text-emerald-400" />
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
