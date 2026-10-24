import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  RotateCcw,
  Flame, 
  Zap,
  Headphones,
  Music2,
  WifiOff,
  Disc3,
  Tv,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { INDIAN_WORKOUT_PLAYLISTS } from '../data/indianWorkoutPlaylists';

export default function IndianWorkoutPlaylistsModal({ isOpen, onClose }) {
  const [selectedLang, setSelectedLang] = useState('telugu');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [playerMode, setPlayerMode] = useState('audio'); // 'audio' or 'video'

  const audioRef = useRef(null);

  const currentPlaylist = INDIAN_WORKOUT_PLAYLISTS.find(p => p.id === selectedLang) || INDIAN_WORKOUT_PLAYLISTS[0];
  const tracks = currentPlaylist.topTracks || [];
  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Helper to resolve asset path reliably with Vite's base path
  const resolveAudioUrl = (filePath) => {
    if (!filePath) return '';
    const clean = filePath.replace(/^\/+/, '');
    const base = (import.meta.env.BASE_URL || './').replace(/\/+$/, '') + '/';
    return `${base}${clean}`;
  };

  // Sync player mode when selected track changes
  useEffect(() => {
    if (currentTrack?.audioFile) {
      setPlayerMode('audio');
    } else {
      setPlayerMode('video');
    }
    setCurrentTime(0);
  }, [selectedLang, currentTrackIndex]);

  // Handle audio play/pause when audio source loads or changes
  useEffect(() => {
    if (isOpen && playerMode === 'audio' && currentTrack?.audioFile && audioRef.current) {
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn("Autoplay notice:", err.message);
            setIsPlaying(false);
          });
      }
    }
  }, [currentTrack?.title, playerMode, isOpen]);

  // Clean pause when modal is closed
  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    onClose();
  };

  // Stop playback when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  if (!isOpen) return null;

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Playback error:", err);
          setIsPlaying(false);
        });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      audioRef.current.muted = (val === 0);
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioRef.current.muted = newMuted;
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const handleTrackEnded = () => {
    if (isLooping) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      handleNextTrack();
    }
  };

  const handlePrevTrack = () => {
    const newIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(newIdx);
  };

  const handleNextTrack = () => {
    const newIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(newIdx);
  };

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleLangChange = (id) => {
    setSelectedLang(id);
    setCurrentTrackIndex(0);
  };

  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentVideoId = currentTrack?.videoId || currentPlaylist.featuredVideoId;
  const embedUrl = `https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=0&playsinline=1&rel=0&modestbranding=1&loop=1&playlist=${currentVideoId}`;

  // Count offline MP3s across this playlist
  const offlineTrackCount = tracks.filter(t => t.audioFile).length;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div 
        className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[94vh] overflow-hidden flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hidden HTML5 Native Audio Element */}
        {currentTrack?.audioFile && (
          <audio
            ref={audioRef}
            src={resolveAudioUrl(currentTrack.audioFile)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleTrackEnded}
            loop={isLooping}
            preload="metadata"
          />
        )}

        {/* Header with Title & Language Tabs */}
        <div className={`p-5 sm:p-6 bg-gradient-to-r ${currentPlaylist.color} relative overflow-hidden text-white shrink-0 shadow-lg`}>
          <div className="absolute top-0 right-0 p-8 opacity-15 pointer-events-none text-8xl font-black">
            {currentPlaylist.flag}
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner border border-white/25">
                <Headphones size={26} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                    Desi Workout Beats
                  </h2>
                  <span className="text-[11px] bg-emerald-500/30 text-emerald-100 backdrop-blur px-2.5 py-0.5 rounded-full border border-emerald-400/40 font-bold tracking-wide flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-emerald-300" />
                    Offline MP3s Bundled in Project
                  </span>
                </div>
                <p className="text-xs text-white/90 font-medium mt-0.5">
                  High-energy local workout songs saved permanently — plays offline on any laptop!
                </p>
              </div>
            </div>

            <button
              onClick={handleClose}
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
              const hasOffline = p.topTracks?.some(t => t.audioFile);
              return (
                <button
                  key={p.id}
                  onClick={() => handleLangChange(p.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-white text-slate-950 border-white shadow-lg scale-105'
                      : 'bg-black/30 text-white/90 border-white/10 hover:bg-black/50'
                  }`}
                >
                  <span>{p.flag}</span>
                  <span>{p.language}</span>
                  {hasOffline && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-extrabold ${isSelected ? 'bg-emerald-600 text-white' : 'bg-emerald-400 text-slate-950'}`}>
                      MP3
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Player Mode & Status Bar */}
        <div className="px-5 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono font-bold flex items-center gap-1 text-xs">
              <Zap size={11} />
              <span>{currentTrack?.bpm || 145} BPM</span>
            </span>
            <span className="text-xs text-slate-300 font-medium truncate max-w-[260px] sm:max-w-md">
              Now Playing: <strong className="text-white">{currentTrack?.title}</strong> <span className="text-slate-400">({currentTrack?.artist})</span>
            </span>
          </div>

          {/* Player Source Selector (Offline MP3 vs YouTube) */}
          <div className="flex items-center gap-1.5">
            {currentTrack?.audioFile ? (
              <div className="flex items-center bg-slate-900 border border-slate-700/80 rounded-lg p-0.5 text-[11px]">
                <button
                  onClick={() => setPlayerMode('audio')}
                  className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    playerMode === 'audio'
                      ? 'bg-emerald-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Music2 size={12} />
                  <span>Offline MP3</span>
                </button>
                <button
                  onClick={() => {
                    if (audioRef.current) audioRef.current.pause();
                    setIsPlaying(false);
                    setPlayerMode('video');
                  }}
                  className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                    playerMode === 'video'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Tv size={12} />
                  <span>YouTube Stream</span>
                </button>
              </div>
            ) : (
              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20 flex items-center gap-1.5">
                <Tv size={12} />
                <span>YouTube In-App Stream</span>
              </span>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-slate-900/60 scrollbar-thin">
          
          {/* Active Audio Player or YouTube Embed */}
          {playerMode === 'audio' && currentTrack?.audioFile ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-slate-950 to-slate-900 p-5 sm:p-6 shadow-xl relative overflow-hidden">
              {/* Subtle Background Glow */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative z-10">
                {/* Spinning Vinyl Record Badge */}
                <div className="relative group shrink-0">
                  <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-slate-950 via-slate-800 to-slate-950 p-1 border-2 border-slate-700 shadow-2xl flex items-center justify-center ${
                    isPlaying ? 'animate-spin [animation-duration:5s]' : ''
                  }`}>
                    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-inner">
                      <Disc3 size={32} className="text-slate-950" />
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    Local MP3
                  </div>
                </div>

                {/* Track Information & Waveform Display */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                      Saved in Project
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-md">
                      {currentTrack.movie || 'Gym Motivation'}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                    {currentTrack.artist}
                  </p>

                  {/* Dynamic Equalizer Visualizer Bars */}
                  <div className="flex items-end justify-center sm:justify-start gap-1 h-10 mt-3 pt-2">
                    {[35, 65, 90, 45, 80, 100, 75, 95, 60, 85, 40, 70, 95, 55, 80, 60, 90, 45, 75, 40].map((h, i) => (
                      <span
                        key={i}
                        style={{
                          height: isPlaying 
                            ? `${Math.max(15, Math.min(100, (h * (0.55 + 0.45 * Math.sin(currentTime * 5 + i * 0.8)))))}%` 
                            : '20%',
                          transition: 'height 0.15s ease'
                        }}
                        className={`w-1 rounded-full ${
                          isPlaying 
                            ? 'bg-gradient-to-t from-emerald-500 to-teal-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]' 
                            : 'bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="mt-5 relative z-10">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 hover:accent-emerald-300 transition-all"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback Controls & Volume */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 pt-2 border-t border-slate-800/80">
                {/* Loop toggle */}
                <div className="flex items-center gap-2 order-2 sm:order-1">
                  <button
                    onClick={toggleLoop}
                    className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isLooping 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm' 
                        : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
                    }`}
                    title={isLooping ? 'Looping enabled' : 'Looping off'}
                  >
                    <RotateCcw size={14} className={isLooping ? 'animate-spin [animation-duration:12s]' : ''} />
                    <span>Repeat</span>
                  </button>
                </div>

                {/* Main Transport Controls */}
                <div className="flex items-center gap-3 order-1 sm:order-2">
                  <button
                    onClick={handlePrevTrack}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="Previous Track"
                  >
                    <SkipBack size={18} />
                  </button>

                  <button
                    onClick={togglePlayPause}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 flex items-center justify-center transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer active:scale-95 hover:scale-105"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-0.5" />}
                  </button>

                  <button
                    onClick={handleNextTrack}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-all cursor-pointer active:scale-90"
                    title="Next Track"
                  >
                    <SkipForward size={18} />
                  </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 order-3">
                  <button
                    onClick={toggleMute}
                    className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* YouTube Video Stream View */
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
          )}

          {/* Tracklist for this category */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Flame size={15} className="text-orange-400" />
                  <span>Featured {currentPlaylist.language} Workout Anthems</span>
                </h3>
                {offlineTrackCount > 0 && (
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    {offlineTrackCount} Offline MP3s
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">Tap any song to play instantly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tracks.map((track, i) => {
                const isSelected = currentTrackIndex === i;
                const hasLocalMp3 = Boolean(track.audioFile);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectTrack(i)}
                    className={`w-full text-left p-3.5 rounded-xl border flex items-center justify-between group transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 shadow-lg ring-1 ring-emerald-400/50'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-emerald-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-xs font-mono border transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 group-hover:bg-emerald-500/20'
                      }`}>
                        {isSelected && isPlaying ? (
                          <div className="flex items-end gap-0.5 h-3">
                            <span className="w-0.5 h-full bg-slate-950 animate-bounce" />
                            <span className="w-0.5 h-2/3 bg-slate-950 animate-bounce [animation-delay:0.15s]" />
                            <span className="w-0.5 h-4/5 bg-slate-950 animate-bounce [animation-delay:0.3s]" />
                          </div>
                        ) : (
                          isSelected ? '▶' : `0${i + 1}`
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className={`text-xs font-bold truncate transition-colors ${
                            isSelected ? 'text-emerald-300 font-extrabold' : 'text-white group-hover:text-emerald-400'
                          }`}>
                            {track.title}
                          </h4>
                          {hasLocalMp3 && (
                            <span className="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.2 rounded font-extrabold whitespace-nowrap">
                              ⚡ Offline MP3
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {track.artist} • <span className="text-slate-500">{track.movie}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border flex items-center gap-1 transition-colors ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'bg-slate-800/90 text-slate-300 border-slate-700'
                      }`}>
                        <span>{track.bpm} BPM</span>
                        <Play size={9} fill="currentColor" className={isSelected ? 'text-slate-950' : 'text-emerald-400'} />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Offline Notice & Streaming Links */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-center sm:text-left">
              <span className="text-emerald-400 font-black">💡 Saved in Project:</span>
              <span>All 10 MP3 files are committed in <code className="text-emerald-300 bg-slate-900 px-1 py-0.5 rounded">public/audio/</code>. They will play even offline and when opened on any other laptop!</span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a 
                href={currentPlaylist.youtubeMusicUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold flex items-center gap-1 transition-colors"
              >
                <span>YouTube Music</span>
                <ExternalLink size={10} />
              </a>
              <a 
                href={currentPlaylist.spotifyWebUrl} 
                target="_blank" 
                rel="noreferrer"
                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1 transition-colors"
              >
                <span>Spotify</span>
                <ExternalLink size={10} />
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
