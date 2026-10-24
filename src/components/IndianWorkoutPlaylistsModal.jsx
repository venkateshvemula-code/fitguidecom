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
  const [playerType, setPlayerType] = useState('youtube'); // Default to instant YouTube without Spotify login delay

  if (!isOpen) return null;

  const currentPlaylist = INDIAN_WORKOUT_PLAYLISTS.find(p => p.id === selectedLang) || INDIAN_WORKOUT_PLAYLISTS[0];

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
                    Instant Play
                  </span>
                </div>
                <p className="text-xs text-white/90 font-medium mt-0.5">
                  High-BPM adrenaline, mass beats & motivation in your native tongue
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
                  onClick={() => setSelectedLang(p.id)}
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
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Player Source:</span>
            <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => setPlayerType('youtube')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  playerType === 'youtube'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Play size={11} fill="currentColor" />
                <span>YouTube (Direct Video / Audio)</span>
              </button>
              <button
                onClick={() => setPlayerType('spotify')}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  playerType === 'spotify'
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Music2 size={11} />
                <span>Spotify</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold flex items-center gap-1">
              <Zap size={11} />
              <span>{currentPlaylist.avgBpm}</span>
            </span>
            <a
              href={currentPlaylist.youtubeMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600 hover:text-white transition-colors flex items-center gap-1 font-bold"
              title="Open in YouTube Music app"
            >
              <span>YouTube Music</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-900/60">
          
          {/* Active Audio / Video Embed Stream */}
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-xl">
            {playerType === 'youtube' ? (
              <div className="h-64 sm:h-80 w-full relative">
                <iframe
                  src={`${currentPlaylist.youtubeEmbedUrl}&autoplay=1`}
                  title={`${currentPlaylist.language} YouTube Workout Playlist`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <iframe
                src={currentPlaylist.spotifyEmbedUrl || "https://open.spotify.com/embed/playlist/37i9dQZF1DX5cO8504Kxox?utm_source=generator&theme=0"}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`${currentPlaylist.language} Spotify Workout`}
                className="w-full"
              />
            )}
          </div>

          {/* Quick Direct Play Search on YouTube Button */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center gap-2.5">
              <Radio size={16} className="text-red-400 animate-pulse" />
              <span className="text-xs text-slate-300">
                Want ad-free high fidelity streaming in your background music app?
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={currentPlaylist.youtubeMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                <span>Play in YT Music</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={currentPlaylist.youtubeWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all border border-slate-700"
              >
                <span>Open YouTube Mix</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Top Handpicked Anthems for this Language */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Flame size={15} className="text-orange-400" />
                <span>Featured {currentPlaylist.language} Workout Bangers</span>
              </h3>
              <span className="text-[11px] text-slate-400">Curated for Heavy Sets & Cardio</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentPlaylist.topTracks.map((track, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 flex items-center justify-between group transition-all"
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

                  <a
                    href={`https://music.youtube.com/search?q=${encodeURIComponent(track.title + ' ' + track.movie + ' ' + track.artist)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-slate-800/90 hover:bg-red-600 hover:text-white text-slate-300 text-[10px] font-mono font-bold border border-slate-700 transition-colors flex items-center gap-1"
                    title="Play track in YouTube Music"
                  >
                    <span>{track.bpm} BPM</span>
                    <Play size={9} fill="currentColor" />
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
