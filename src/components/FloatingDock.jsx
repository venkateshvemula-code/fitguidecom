import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import gsap from 'gsap';
import {
  Home,
  Dumbbell,
  Activity,
  Ruler,
  Salad,
  HeartPulse,
  Flame,
  Search,
  Bot,
  Sparkles,
  Headphones
} from 'lucide-react';

export default function FloatingDock() {
  const { activeTab, setActiveTab, openModal, toggleFitBot } = useApp();
  const dockRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef(null);

  // Play subtle haptic pop sound
  const playPop = (freq = 600, duration = 0.05) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  };

  const dockItems = [
    { id: 'home', label: 'Home', icon: Home, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'exercises', label: 'Exercises', icon: Dumbbell, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'bodyparts', label: 'Body Map', icon: Activity, gradient: 'from-purple-500 to-indigo-500' },
    { id: 'height', label: 'Spine & Height', icon: Ruler, gradient: 'from-amber-500 to-orange-500' },
    { id: 'diet', label: 'Diet Plans', icon: Salad, gradient: 'from-green-500 to-emerald-500' },
    { id: 'diseases', label: 'Care Protocols', icon: HeartPulse, gradient: 'from-rose-500 to-pink-500' },
    { id: 'tracker', label: 'Tracker', icon: Flame, gradient: 'from-orange-500 to-red-500' },
    { id: 'music', label: 'Workout Beats', icon: Headphones, special: 'music', gradient: 'from-fuchsia-500 to-rose-600' },
    { id: 'search', label: 'Search', icon: Search, special: 'search', gradient: 'from-sky-500 to-blue-600' },
    { id: 'bot', label: 'FitBot AI', icon: Bot, special: 'bot', gradient: 'from-emerald-400 to-teal-400' }
  ];

  // Parabolic Gaussian Magnification Constants
  const BASE_SIZE = 44; // base icon size in px
  const MAX_SCALE = 1.45; // peak magnification scale
  const RANGE = 130; // influence range in px
  const itemRefs = useRef([]);

  const handleMouseMove = (e) => {
    if (!dockRef.current) return;
    const mouseX = e.clientX;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemCenter);

      if (dist < RANGE) {
        // Parabolic cosine curve
        const normDist = dist / RANGE;
        const scale = 1 + (MAX_SCALE - 1) * Math.cos(normDist * Math.PI * 0.5);
        el.style.transform = `scale(${scale.toFixed(3)}) translateY(-${((scale - 1) * 16).toFixed(1)}px)`;
      } else {
        el.style.transform = 'scale(1) translateY(0px)';
      }
    });
  };

  const handleMouseLeave = () => {
    itemRefs.current.forEach((el) => {
      if (el) {
        el.style.transform = 'scale(1) translateY(0px)';
      }
    });
    setHoveredIdx(null);
  };

  const handleItemClick = (item, index, e) => {
    const el = itemRefs.current[index];
    if (el) {
      playPop(520 + index * 60, 0.08);
      gsap.timeline()
        .to(el, { y: -18, duration: 0.16, ease: 'power2.out' })
        .to(el, { y: 0, duration: 0.45, ease: 'bounce.out' });
    }

    if (item.special === 'search') {
      openModal('search');
    } else if (item.special === 'bot') {
      toggleFitBot();
    } else if (item.special === 'music') {
      openModal('indian_music');
    } else {
      setActiveTab(item.id);
    }
  };

  return (
    <div
      className="hidden md:flex fixed bottom-5 left-1/2 -translate-x-1/2 z-40 items-end justify-center pointer-events-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={dockRef}
    >
      <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/80 dark:bg-slate-950/80 backdrop-blur-2xl border border-white/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20">
        {dockItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[idx] = el)}
              className="relative group transition-[transform] duration-75 ease-out will-change-transform flex flex-col items-center cursor-pointer"
              onMouseEnter={() => {
                setHoveredIdx(idx);
                playPop(480 + idx * 40, 0.03);
              }}
              onClick={(e) => handleItemClick(item, idx, e)}
            >
              {/* Tooltip */}
              <div
                className={`absolute -top-9 px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide pointer-events-none transition-all duration-200 whitespace-nowrap shadow-lg ${
                  hoveredIdx === idx
                    ? 'opacity-100 -translate-y-1'
                    : 'opacity-0 translate-y-1'
                } bg-slate-900/90 text-slate-100 border border-white/15 backdrop-blur-md`}
              >
                {item.label}
              </div>

              {/* Icon Capsule */}
              <div
                style={{ width: `${BASE_SIZE}px`, height: `${BASE_SIZE}px` }}
                className={`rounded-xl flex items-center justify-center transition-all duration-200 shadow-md ${
                  isActive
                    ? 'bg-gradient-to-tr ' + item.gradient + ' text-slate-950 ring-2 ring-emerald-400/80 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                <Icon size={21} className={isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'} />
              </div>

              {/* Active Indicator Dot */}
              <div
                className={`w-1 h-1 rounded-full mt-1 transition-all duration-200 ${
                  isActive ? 'bg-emerald-400 scale-100 shadow-[0_0_6px_#34d399]' : 'opacity-0 scale-0'
                }`}
              />
            </div>
          );
        })}

        {/* Vertical Divider */}
        <div className="w-[1px] h-7 bg-white/10 mx-1" />

        {/* Audio Toggle Feedback Icon */}
        <button
          onClick={() => {
            const next = !soundEnabled;
            setSoundEnabled(next);
            if (next) playPop(750, 0.08);
          }}
          title={soundEnabled ? 'Haptic Sound Effects: Enabled' : 'Haptic Sound Effects: Muted'}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-white/5 transition-all text-xs"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>
    </div>
  );
}
