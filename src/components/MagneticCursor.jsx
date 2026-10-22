import React, { useEffect, useState, useRef } from 'react';

/**
 * MagneticCursor Component (Adapted from Showcase 15 & 18)
 * Provides a dual-ring spring physics cursor with subtle aura and magnetic attraction to interactive elements.
 * Fully transparent to clicks (pointer-events: none) and automatically disables on touch devices.
 */
export default function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Check if device supports hover / mouse pointer
    if (window.matchMedia('(pointer: fine)').matches) {
      setEnabled(true);
    } else {
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    // Smooth spring loop for lagging outer ring
    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(animateRing);
    };

    // Detect hover on interactive elements (buttons, links, inputs, cards)
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a, input, select, textarea, [data-magnetic="true"], .dock-item, .interactive-card');
      if (target) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    animFrameId.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden" aria-hidden="true">
      {/* Precision Inner Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full transition-all duration-150 will-change-transform ${
          isHovered
            ? 'w-3 h-3 bg-emerald-400 shadow-[0_0_12px_#34d399]'
            : 'w-2 h-2 bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.8)]'
        }`}
        style={{ transform: 'translate(-100px, -100px) translate(-50%, -50%)' }}
      />

      {/* Dynamic Physics Lag Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out will-change-transform ${
          isHovered
            ? 'w-14 h-14 border border-emerald-400/60 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
            : 'w-8 h-8 border border-emerald-400/30 bg-transparent'
        }`}
        style={{ transform: 'translate(-100px, -100px) translate(-50%, -50%)' }}
      />
    </div>
  );
}
