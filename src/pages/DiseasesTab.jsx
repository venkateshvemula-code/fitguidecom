import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, AlertTriangle, Pill, Activity, Sparkles, Heart } from 'lucide-react';
import { diseases } from '../data/fitData';

export default function DiseasesTab() {
  const [activeDiseaseId, setActiveDiseaseId] = useState('diabetes');

  const lifestylePhotos = {
    "diabetes": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80",
    "hypertension": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
    "cholesterol": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80",
    "thyroid": "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=700&auto=format&fit=crop&q=80",
    "fatty-liver": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
    "anemia": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
    "pcos-pcod": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
    "arthritis": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&auto=format&fit=crop&q=80",
    "gerd-acid-reflux": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80"
  };

  const diseaseList = diseases || [];
  const activeDisease = diseaseList.find(d => d.id === activeDiseaseId) || diseaseList[0];

  if (!activeDisease) return null;

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-in fade-in duration-200">
      
      {/* Header */}
      <div class="text-center max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold mb-4">
          <span>🩺</span> Evidence-Based Clinical Nutrition & Disease Management
        </div>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mb-4">
          Disease Dietary Cures & <span class="text-gradient-orange">Clinical Treatments</span>
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Comprehensive scientific overview of chronic metabolic disorders in both males and females, 
          healing superfoods, foods to strictly eliminate, and non-pharmaceutical exercise therapy.
        </p>
      </div>

      {/* Disease Selection Tabs */}
      <div class="flex items-center justify-center gap-2 flex-wrap">
        {diseaseList.map(d => {
          const isSelected = d.id === activeDisease.id;
          return (
            <button
              key={d.id}
              onClick={() => setActiveDiseaseId(d.id)}
              class={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-lg scale-105'
                  : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <span>{d.icon || '🩺'}</span>
              <span>{d.name.split('(')[0].trim()}</span>
            </button>
          );
        })}
      </div>

      {/* Active Disease Detail Display */}
      <div class="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl space-y-8 animate-in fade-in duration-150">
        
        {/* Header */}
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-2xl">{activeDisease.icon || '🩺'}</span>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {activeDisease.category} Health
              </span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">{activeDisease.name}</h2>
            <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">{activeDisease.overview}</p>
          </div>
        </div>

        {/* Biological Gender Differences */}
        <div>
          <h3 class="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
            <span>⚖️</span> Biological Gender Differences & Manifestations
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-slate-950/70 border border-teal-500/30">
              <span class="text-xs font-bold text-teal-400 block mb-1">👨 In Males:</span>
              <p class="text-xs text-slate-300 leading-relaxed">{activeDisease.genderAspects.males}</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-950/70 border border-pink-500/30">
              <span class="text-xs font-bold text-pink-400 block mb-1">👩 In Females:</span>
              <p class="text-xs text-slate-300 leading-relaxed">{activeDisease.genderAspects.females}</p>
            </div>
          </div>
        </div>

        {/* Healing Foods vs Harmful Foods */}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Healing Foods */}
          <div class="p-5 rounded-xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-3">
            <h4 class="text-sm font-extrabold text-emerald-400 flex items-center gap-2">
              <span>✨</span> Healing Dietary Superfoods (Advantages)
            </h4>
            <div class="space-y-2.5">
              {activeDisease.healingFoodsAdvantages.map((hf, i) => (
                <div key={i} class="p-3 rounded-lg bg-slate-900 border border-emerald-500/20">
                  <span class="text-xs font-bold text-white block mb-0.5">{hf.name}</span>
                  <p class="text-xs text-slate-300 leading-relaxed">{hf.mechanism}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Harmful Foods */}
          <div class="p-5 rounded-xl bg-rose-950/20 border-2 border-rose-500/40 space-y-3">
            <h4 class="text-sm font-extrabold text-rose-400 flex items-center gap-2">
              <span>⚠️</span> Harmful Foods to Strictly Avoid (Disadvantages)
            </h4>
            <div class="space-y-2.5">
              {activeDisease.harmfulFoodsDisadvantages.map((hfd, i) => (
                <div key={i} class="p-3 rounded-lg bg-slate-900 border border-rose-500/20">
                  <span class="text-xs font-bold text-white block mb-0.5">{hfd.name}</span>
                  <p class="text-xs text-slate-300 leading-relaxed">{hfd.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Clinical Medicines Overview */}
        <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 class="text-sm font-extrabold text-amber-400 flex items-center gap-2">
              <Pill size={16} />
              <span>Standard Clinical Medicines & Pharmacology Overview</span>
            </h4>
            <span class="text-[10px] text-slate-400">Educational reference • Always consult your physician</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeDisease.clinicalMedicinesOverview.map((med, i) => (
              <div key={i} class="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span class="text-xs font-bold text-white block mb-1">{med.medicine}</span>
                <p class="text-xs text-slate-400 leading-relaxed">{med.function}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Clinical Therapies & Rehabilitation Protocols */}
        {activeDisease.therapies && activeDisease.therapies.length > 0 && (
          <div class="p-5 rounded-xl bg-purple-950/20 border-2 border-purple-500/40 space-y-4">
            <div class="flex items-center justify-between pb-2 border-b border-purple-500/20">
              <h4 class="text-sm font-extrabold text-purple-300 flex items-center gap-2">
                <span>🧘</span>
                <span>Targeted Clinical Therapies & Physical Protocols</span>
              </h4>
              <span class="text-[10px] text-purple-400 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Non-Drug Interventions
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeDisease.therapies.map((th, i) => (
                <div key={i} class="p-4 rounded-xl bg-slate-900 border border-purple-500/30 space-y-2">
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {th.type}
                    </span>
                    <span class="text-xs text-purple-400">✨</span>
                  </div>
                  <h5 class="text-xs font-bold text-white">{th.name}</h5>
                  <p class="text-xs text-slate-300 leading-relaxed">{th.protocol}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lifestyle & Exercise Therapy with Photo Banner */}
        <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center gap-5">
          <div class="relative w-full sm:w-48 h-32 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-emerald-500/30">
            <img
              src={lifestylePhotos[activeDisease.id] || lifestylePhotos['diabetes']}
              alt={`${activeDisease.name} Lifestyle Therapy`}
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            <span class="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 shadow">
              🏃 Exercise Therapy
            </span>
          </div>
          <div>
            <h5 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Non-Pharmaceutical Lifestyle & Exercise Cure</span>
            </h5>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">{activeDisease.lifestyleCure}</p>
          </div>
        </div>

      </div>

    </div>
  );
}
