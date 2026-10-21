import React, { useState, useRef } from 'react';

export default function TiltCard({ children, className = '', glowColor = 'rgba(16, 185, 129, 0.3)' }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8; // max -8 to 8 deg
    const rotateY = ((x - centerX) / centerX) * 8; // max -8 to 8 deg

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`);
    setGlowPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlowPos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.18s ease-out'
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect (Behind card text and images) */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: glowPos.opacity,
          background: `radial-gradient(circle 240px at ${glowPos.x}% ${glowPos.y}%, ${glowColor}, transparent 70%)`
        }}
      />
      <div className="relative z-[1] h-full w-full">
        {children}
      </div>
    </div>
  );
}
