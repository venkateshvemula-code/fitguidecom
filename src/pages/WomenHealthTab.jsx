import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Heart, 
  ShieldAlert, 
  Sparkles, 
  Activity, 
  Video, 
  Play, 
  Info,
  Clock,
  Apple,
  Utensils
} from 'lucide-react';
import { womenHealth } from '../data/fitData';
import { getExercisePhoto } from '../data/exercisePhotos';

export default function WomenHealthTab() {
  const { openModal } = useApp();
  const [activeSubtab, setActiveSubtab] = useState('cycle'); // 'cycle', 'boysGuide', or 'pregnancy'
  const [selectedBoyVideo, setSelectedBoyVideo] = useState('binocs');

  if (!womenHealth) return null;

  const { menstrualCycle, pregnancyCare } = womenHealth;

  const boyVideos = {
    binocs: { 
      id: 'PeL_XtBrOxw', 
      title: 'Why Do Girls Get Periods? | The Dr Binocs Show (For Boys & Beginners)' 
    },
    ted: { 
      id: 'ayzN5f3qN8g', 
      title: 'How Menstruation Works | Emma Bryce (TED-Ed Biological Lesson)' 
    }
  };

  const phasePhotos = [
    "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80", // Menstrual
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", // Follicular
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80", // Ovulatory
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80"  // Luteal
  ];

  const dangerPhotos = [
    "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80", // Supine
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", // Burpees
    "https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=600&auto=format&fit=crop&q=80", // Heavy lifting
    "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80", // Hot yoga
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80"  // Contact sports
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-bold mb-4 shadow-sm">
          <span>🌸</span> Dedicated Female Wellness & Maternal Care Hub
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Women's Health, <span className="text-gradient-pink">Cycle & Maternity</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Comprehensive, science-backed guidance on healthy menstrual cycle duration (21-35 days), 
          4 hormonal phases, iron-rich nutrition focus, men's educational awareness videos, and safe maternal fitness.
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setActiveSubtab('cycle')}
          className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeSubtab === 'cycle'
              ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>🩸</span> Menstrual Cycle & Nutrition Focus
        </button>
        <button
          type="button"
          onClick={() => setActiveSubtab('boysGuide')}
          className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeSubtab === 'boysGuide'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>👦</span> Menstrual Guide for Boys & Men (Videos & Care)
        </button>
        <button
          type="button"
          onClick={() => setActiveSubtab('pregnancy')}
          className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
            activeSubtab === 'pregnancy'
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/20 scale-102'
              : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700'
          }`}
        >
          <span>🤰</span> Pregnancy Fitness & Maternal Care
        </button>
      </div>

      {/* ========================================================
          SUB-TAB 1: MENSTRUAL CYCLE & NUTRITION FOCUS
          ======================================================== */}
      {activeSubtab === 'cycle' && (
        <div className="space-y-12 animate-in fade-in duration-150">
          
          {/* Healthy Duration & Cycle Norms Card */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-pink-950/60 via-slate-900 to-purple-950/60 border border-pink-500/40 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl shrink-0">
                ⏱️
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                  Clinical Standard
                </span>
                <h2 className="text-2xl font-black text-white mt-1">How Many Days Occur in a Healthy Cycle?</h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  A standard healthy menstrual cycle ranges between <strong>21 to 35 days</strong> (average: <strong>28 days</strong>). 
                  The active bleeding phase naturally lasts <strong>3 to 7 days</strong>, with a healthy total blood loss of <strong>30 to 80 mL</strong> per cycle.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-pink-500/20 text-center">
                <span className="text-xs text-slate-400 block mb-1">Healthy Cycle Duration</span>
                <span className="text-2xl font-black text-pink-400">21 - 35 Days</span>
                <span className="text-[11px] text-slate-400 block mt-1">Calculated from Day 1 of period to Day 1 of next period</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-pink-500/20 text-center">
                <span className="text-xs text-slate-400 block mb-1">Active Bleeding Phase</span>
                <span className="text-2xl font-black text-purple-400">3 - 7 Days</span>
                <span className="text-[11px] text-slate-400 block mt-1">Normal shedding of functional endometrium</span>
              </div>
              <div className="bg-slate-950/60 p-4 rounded-xl border border-pink-500/20 text-center">
                <span className="text-xs text-slate-400 block mb-1">Standard Blood Volume</span>
                <span className="text-2xl font-black text-rose-400">30 - 80 mL</span>
                <span className="text-[11px] text-slate-400 block mt-1">Over 80mL indicates menorrhagia; consult gynecologist</span>
              </div>
            </div>
          </div>

          {/* 4 Hormonal Cycle Phases with Nutrition Focus & Photo Previews */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Endocrine Rhythm</span>
              <h2 className="text-2xl font-black text-white mt-1">The 4 Biological Phases of the Mature Cycle</h2>
              <p className="text-xs text-slate-400 mt-1">Adapt your training intensity and micronutrient intake to cyclical hormonal fluctuations.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {menstrualCycle.phases.map((p, idx) => (
                <div
                  key={idx}
                  className="fit-card rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-pink-500/50 transition-all group"
                >
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
                      <img
                        src={phasePhotos[idx] || phasePhotos[0]}
                        alt={p.phase}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                      <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-500 text-white shadow">
                        Phase {idx + 1}
                      </span>
                      <span className="absolute bottom-2 left-3 right-3 text-sm font-extrabold text-white drop-shadow">
                        {p.phase}
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="text-xs text-slate-300 font-medium bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                        <strong className="text-slate-200">Hormones:</strong> {p.hormones}
                      </div>
                      <div className="text-xs text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Energy & Mood:</strong> {p.energyLevel}
                      </div>
                      <div className="text-xs text-slate-300 leading-relaxed p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                        <strong className="text-emerald-400 block mb-0.5">Exercise Guidance:</strong> {p.exerciseAdvice}
                      </div>

                      {/* Clear, Highly-Visible Nutrition Focus Block */}
                      <div className="text-xs text-slate-300 leading-relaxed p-3 rounded-xl bg-gradient-to-br from-pink-950/30 to-purple-950/30 border border-pink-500/30 shadow-inner space-y-1">
                        <div className="flex items-center gap-1.5 text-pink-400 font-bold">
                          <Apple size={13} className="shrink-0" />
                          <span>Nutrition Focus & Key Nutrients:</span>
                        </div>
                        <p className="text-slate-200 font-medium">
                          {p.nutritionFocus || p.keyNutrients}
                        </p>
                        {p.keyNutrients && p.nutritionFocus && (
                          <div className="text-[11px] text-pink-300/90 pt-1 border-t border-pink-500/20">
                            <strong>Key Elements:</strong> {p.keyNutrients}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dedicated Phase Nutrition & Micronutrient Guide */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/30 border border-emerald-500/30 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xl">
                🥗
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Clinical Micronutrient Protocol</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Targeted Nutrition for Menstrual Balance</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">1. Iron & Hemoglobin</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Replenish erythrocytes lost during active bleeding. Combine bioavailable non-heme iron (spinach, beetroot, jaggery chana) with Vitamin C (citrus, amla) for 300% higher absorption.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">2. Magnesium & Potassium</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Natural muscle relaxant that suppresses uterine smooth muscle spasms. Found in 70%+ dark chocolate, pumpkin seeds, bananas, and tender coconut water.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">3. Anti-Spasmodic Herbs</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Warm ginger tea (gingerol) and chamomile tea (bisabolol) act as gentle COX-2 inhibitors to inhibit pain-causing prostaglandins and ease dysmenorrhea naturally.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">4. Warm Hydration (2.5L+)</span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Warm water flushes extracellular sodium, preventing fluid stagnation, breast tenderness, and abdominal puffiness while supporting optimal circulation.
                </p>
              </div>
            </div>
          </div>

          {/* Menstrual Precautions */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Clinical Hygiene & Care</span>
              <h2 className="text-2xl font-black text-white mt-1">Crucial Menstrual Cycle Precautions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menstrualCycle.precautions.map((pr, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                  <span className="text-amber-400 text-lg font-bold">✓</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 mb-1">{pr.rule}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{pr.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Food Advantages vs Food Disadvantages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Superfoods Advantages */}
            <div className="fit-card p-6 rounded-2xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <div>
                  <h3 className="text-lg font-extrabold text-emerald-400">Healing Superfoods (Advantages)</h3>
                  <p className="text-xs text-slate-300">Replenishes iron stores, reduces prostaglandins, and eases cramping.</p>
                </div>
              </div>
              <div className="space-y-3">
                {menstrualCycle.foodAdvantages.map((fa, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                    <span className="text-emerald-400 font-bold text-base">✓</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="text-xs font-extrabold text-white">{fa.food}</h5>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {fa.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{fa.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harmful Foods Disadvantages */}
            <div className="fit-card p-6 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚫</span>
                <div>
                  <h3 className="text-lg font-extrabold text-rose-400">Foods to Strictly Avoid (Disadvantages)</h3>
                  <p className="text-xs text-slate-300">Worsens uterine contractions, water retention, and severe mood swings.</p>
                </div>
              </div>
              <div className="space-y-3">
                {menstrualCycle.foodDisadvantages.map((fd, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-base">⚠️</span>
                    <div>
                      <h5 className="text-xs font-extrabold text-white mb-1">{fd.food}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed mb-1">{fd.disadvantage}</p>
                      <span className="text-[10px] text-rose-300 block font-semibold">Danger: {fd.whyAvoid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          SUB-TAB 2: MENSTRUAL CYCLE & HEALTH GUIDE FOR BOYS / MEN
          ======================================================== */}
      {activeSubtab === 'boysGuide' && (
        <div className="space-y-12 animate-in fade-in duration-150">
          
          {/* Header Banner */}
          <div className="fit-card p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/40 shadow-2xl space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                👦
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30">
                  Break The Stigma • Empathy & Medical Education
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  How Menstruation Works: A Clear Guide for Boys & Men
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
                  Many boys, teenagers, and men were never properly taught how menstruation works, leading to confusion, awkwardness, or stigma. Periods are a natural, healthy biological process of reproductive health. Here is everything you need to know about the science, physical pain, hygiene precautions, and how to be an empathetic supporter.
                </p>
              </div>
            </div>

            {/* Quick Fact Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-purple-500/20 text-center">
                <span className="text-[11px] text-slate-400 block">It's Not a Disease or Wound</span>
                <span className="text-sm font-black text-purple-300">Natural Biological Renewal</span>
              </div>
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-purple-500/20 text-center">
                <span className="text-[11px] text-slate-400 block">Cramp Severity</span>
                <span className="text-sm font-black text-rose-300">Intense Smooth Muscle Spasms</span>
              </div>
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-purple-500/20 text-center">
                <span className="text-[11px] text-slate-400 block">Your Role as a Guy</span>
                <span className="text-sm font-black text-emerald-300">Zero Shame, Total Support</span>
              </div>
            </div>
          </div>

          {/* Interactive Educational Video Player Section */}
          <div className="fit-card p-6 sm:p-8 rounded-3xl bg-slate-900 border border-purple-500/30 space-y-6 shadow-xl">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                  <Video size={14} />
                  <span>Educational Video Hub for Boys & Partners</span>
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Watch & Learn: Clear Animated Explanations
                </h3>
              </div>

              {/* Video Selector Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedBoyVideo('binocs')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedBoyVideo === 'binocs'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  👦 Beginner Animation (Dr. Binocs)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedBoyVideo('ted')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    selectedBoyVideo === 'ted'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                  }`}
                >
                  🔬 Biological Mechanism (TED-Ed)
                </button>
              </div>
            </div>

            {/* Video Player Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black shadow-2xl aspect-video w-full max-w-4xl mx-auto">
              <iframe
                key={selectedBoyVideo}
                src={`https://www.youtube.com/embed/${boyVideos[selectedBoyVideo].id}?autoplay=1&mute=0&rel=0&modestbranding=1`}
                title={boyVideos[selectedBoyVideo].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
              <span className="font-semibold text-white">
                📺 Now Playing: <em>{boyVideos[selectedBoyVideo].title}</em>
              </span>
              <span className="text-[10px] text-purple-400 font-mono">
                Verified Medical Educational Video
              </span>
            </div>
          </div>

          {/* 3 Key Biological Realities Every Boy Needs to Know */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">The Biological Reality</span>
              <h3 className="text-2xl font-black text-white mt-1">What Actually Happens During a Period?</h3>
              <p className="text-xs text-slate-400 mt-1">Understanding the body mechanics helps remove myths, embarrassment, and awkwardness.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-2xl">🔬</span>
                <h4 className="text-sm font-bold text-white">1. It is Uterine Lining Shedding</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every month, the uterus grows a cushiony lining of tissue and blood vessels (endometrium) in case of pregnancy. When an egg isn't fertilized, hormones trigger this lining to gently break away and leave the body through the vagina. It's clean, healthy biological self-cleaning.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-2xl">⚡</span>
                <h4 className="text-sm font-bold text-white">2. Period Cramps Are Real Pain</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The body produces chemicals called <strong>prostaglandins</strong> that force the uterine smooth muscles to contract strongly to shed the lining. This cuts off oxygen supply temporarily, causing intense spasms. Medical studies compare severe period cramps to heart attack chest pains.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="text-2xl">🧠</span>
                <h4 className="text-sm font-bold text-white">3. Mood Changes Are Neurochemical</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Right before menstruation, estrogen and progesterone plunge dramatically. This sudden drop directly depresses <strong>serotonin</strong> (the brain's happiness chemical), causing involuntary fatigue, crying spells, or irritability. It is pure neurochemistry, not "drama."
                </p>
              </div>
            </div>
          </div>

          {/* Critical Menstrual Precautions & Hygiene Rules Boys Must Know */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Hygiene & Safety Rules</span>
              <h3 className="text-2xl font-black text-white mt-1">Crucial Menstrual Precautions You Should Understand</h3>
              <p className="text-xs text-slate-400 mt-1">Why proper hygiene and care are matter-of-fact necessities, not secrets.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start gap-3">
                <span className="text-amber-400 text-lg font-bold">⏱️</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">4 to 6 Hour Product Changing Rule</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sanitary pads and tampons must be changed every 4–6 hours (menstrual cups within 8–10 hours). Stagnant blood can foster rapid bacterial growth, causing severe pelvic infections and dangerous Toxic Shock Syndrome (TSS).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start gap-3">
                <span className="text-amber-400 text-lg font-bold">🔥</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Heat Therapy Relaxes Myometrial Spasms</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    A warm water bag or electric heating pad applied to the lower abdomen (40°C / 104°F) increases blood flow and relaxes smooth uterine muscle contractions better than oral pain relievers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start gap-3">
                <span className="text-amber-400 text-lg font-bold">🗑️</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Strict Sanitary Disposal Rules</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pads or tampons must NEVER be flushed down the toilet because they swell and choke entire drainage pipelines. They should always be wrapped in newspaper or paper bags and deposited into dry waste bins.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20 flex items-start gap-3">
                <span className="text-amber-400 text-lg font-bold">💧</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Hydration & Electrolyte Replenishment</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Blood loss lowers blood volume, causing dizziness and low blood pressure. Warm fluids, tender coconut water, and iron-dense foods replenish hemoglobin and flush water-retaining cellular sodium.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Checklist for Boys & Men (How to be a Great Ally) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/40 space-y-6 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Practical Allyship</span>
              <h3 className="text-2xl font-black text-white mt-1">Action Checklist: How You Can Support as a Guy</h3>
              <p className="text-xs text-slate-300 mt-1">Small, respectful gestures that make a massive difference for your sisters, partner, friends, or family members.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">🛒</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Buy Sanitary Pads Without Hesitation</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Never feel shy or ask for a black plastic bag at the chemist. Buying pads, tampons, or hot water bags is as normal as buying soap or toothpaste. Be proud of being a dependable man.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">☕</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Prepare Warm Comfort Essentials</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Fill up a hot water bag, prepare a cup of warm ginger or chamomile tea, or bring magnesium-rich dark chocolate. These relax uterine muscles and trigger natural serotonin release.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">🚫</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Never Make Period Jokes or Shame Accidental Stains</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Never use "Are you on your period?" as an insult during disagreements. If you spot an accidental stain, quietly alert her with empathy and offer your jacket—never laugh or point it out publicly.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-base">🤝</span>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">Share the Daily Load</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    If she is feeling exhausted or experiencing dysmenorrhea, step in to take care of chores, heavy lifting, or errands so she can rest peacefully.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================
          SUB-TAB 3: PREGNANCY FITNESS & MATERNAL CARE
          ======================================================== */}
      {activeSubtab === 'pregnancy' && (
        <div className="space-y-12 animate-in fade-in duration-150">
          
          {/* Pregnancy Trimesters Breakdown */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-slate-900 border border-teal-500/40 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Gestational Roadmap</span>
              <h2 className="text-2xl font-black text-white mt-1">Pregnancy Trimesters & Fitness Milestones</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pregnancyCare.trimesters.map((t, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-teal-500/20 space-y-2">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">{t.trimester}</span>
                  <p className="text-xs text-slate-200 font-semibold">{t.focus}</p>
                  <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800">
                    <strong className="text-emerald-400">Exercise:</strong> {t.exerciseTips}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <strong className="text-pink-400">Nutrition:</strong> {t.nutritionFocus}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safe Pregnancy Exercises */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Labor Conditioning</span>
              <h2 className="text-2xl font-black text-white mt-1">Safe Pregnancy Exercises (Advantages & Form)</h2>
              <p className="text-xs text-slate-400 mt-1">Strengthens pelvic floor, prevents gestational diabetes, and shortens labor delivery duration.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pregnancyCare.safeExercises.map(ex => (
                <div key={ex.id} className="fit-card rounded-2xl overflow-hidden border border-teal-500/30 flex flex-col justify-between">
                  <div>
                    <div className="relative h-48 w-full bg-slate-950 overflow-hidden">
                      <img
                        src={getExercisePhoto(ex.id, 'women') || ex.photoUrl}
                        alt={ex.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
                      <span className="absolute top-3 left-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500 text-slate-950 font-sans shadow">
                        {ex.trimesterSafe}
                      </span>
                      <span className="absolute bottom-2 left-3 font-extrabold text-white text-base">{ex.name}</span>
                    </div>

                    <div className="p-5 space-y-4">
                      <p className="text-xs text-slate-300 leading-relaxed">{ex.instructions}</p>

                      <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                        <span className="text-[11px] font-bold text-emerald-400 block mb-1">✨ Proven Advantages for Labor:</span>
                        <ul className="space-y-1 text-[11px] text-slate-300">
                          {ex.advantages.map((a, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-400">•</span>
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
                        <span className="text-[11px] font-bold text-rose-400 block mb-1">⚠️ Cautions & Risks:</span>
                        <ul className="space-y-1 text-[11px] text-slate-300">
                          {ex.disadvantagesAndRisks.map((r, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-rose-400">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      type="button"
                      onClick={() => openModal('exercise', ex.id)}
                      className="w-full py-2.5 rounded-xl bg-teal-600/80 hover:bg-teal-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Form Guide & Modifications</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dangerous Exercises to Avoid with Warning Photo Previews */}
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Strict Safety Rules</span>
              <h2 className="text-2xl font-black text-white mt-1">Dangerous Exercises to Avoid During Pregnancy</h2>
              <p className="text-xs text-slate-300 mt-1">These high-risk movements can restrict placental perfusion or trigger uterine contractions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pregnancyCare.dangerousExercisesToAvoid.map((de, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/40 flex flex-col sm:flex-row gap-4 items-start overflow-hidden">
                  <div className="relative w-full sm:w-32 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-rose-500/30">
                    <img
                      src={dangerPhotos[idx] || dangerPhotos[0]}
                      alt={de.name}
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="absolute inset-0 bg-rose-950/40 mix-blend-multiply"></div>
                    <span className="absolute top-1 left-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-rose-600 text-white shadow">
                      ⛔ AVOID
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-extrabold text-rose-400 mb-1 flex items-center gap-1.5">
                      <span>⚠️</span> <span>{de.name}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{de.danger}</p>
                    <span className="text-[11px] text-teal-300 font-semibold p-1.5 rounded-lg bg-teal-950/30 border border-teal-500/20 block">
                      ✓ Safe Alternative: {de.alternatives}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maternal Nutrition Superfoods vs Foods to Avoid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="fit-card p-6 rounded-2xl bg-teal-950/20 border-2 border-teal-500/40 space-y-4">
              <h3 className="text-lg font-extrabold text-teal-400">Essential Maternal Nutrients (Advantages)</h3>
              <div className="space-y-3">
                {pregnancyCare.maternalNutritionAdvantages.map((ma, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-teal-500/30">
                    <h5 className="text-xs font-extrabold text-white mb-1">{ma.nutrient}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed mb-1">{ma.benefit}</p>
                    <span className="text-[10px] text-teal-300 block">Top Sources: {ma.sources}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="fit-card p-6 rounded-2xl bg-rose-950/20 border-2 border-rose-500/40 space-y-4">
              <h3 className="text-lg font-extrabold text-rose-400">Hazardous Pregnancy Foods (Disadvantages)</h3>
              <div className="space-y-3">
                {pregnancyCare.maternalNutritionDisadvantages.map((md, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-rose-500/30">
                    <h5 className="text-xs font-extrabold text-rose-400 mb-1">{md.food}</h5>
                    <p className="text-xs text-slate-300 leading-relaxed mb-1">{md.harm}</p>
                    <span className="text-[10px] text-slate-400 block font-medium">Rule: {md.precaution}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
