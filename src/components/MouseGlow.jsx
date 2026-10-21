import React, { useEffect, useState } from 'react';

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -1000, y: -1000 });
  const [visible, setVisible] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check initial theme & observe theme changes
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 
                    document.body.getAttribute('data-theme');
      setIsLight(theme === 'light');
    };

    checkTheme();

    const observer = new MutationObserver(() => {
      checkTheme();
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        if (!visible) setVisible(true);
      });
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-700 overflow-hidden"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {/* Outer ambient soft color wash - completely behind content */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-[100px] transition-transform duration-100 will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '600px',
          height: '600px',
          background: isLight 
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, rgba(56, 189, 248, 0.03) 45%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, rgba(56, 189, 248, 0.06) 45%, transparent 70%)',
        }}
      />
      {/* Subtle core spotlight glow - gentle so text remains razor sharp */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 blur-[50px] transition-transform duration-100 will-change-transform"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: '280px',
          height: '280px',
          background: isLight
            ? 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(52, 211, 153, 0.03) 50%, transparent 75%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, rgba(52, 211, 153, 0.08) 50%, transparent 75%)',
        }}
      />
    </div>
  );
}
