import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Pill, 
  Activity, 
  Sparkles, 
  Heart, 
  Search,
  Zap,
  Shield,
  Stethoscope,
  Smile,
  Flame,
  Droplets,
  Layers
} from 'lucide-react';
import { diseases } from '../data/fitData';

export default function DiseasesTab() {
  const [activeDiseaseId, setActiveDiseaseId] = useState('diabetes');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('overview'); // 'overview' | 'therapies'
  const [selectedTherapyCategory, setSelectedTherapyCategory] = useState('all');

  const lifestylePhotos = {
    // Diabetes: Brisk aerobic walking / glucose uptake
    "diabetes": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80",
    // Hypertension: Calm breathing & cardiovascular yoga
    "hypertension": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
    // Cholesterol: High-tempo cardiovascular running
    "cholesterol": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&auto=format&fit=crop&q=80",
    // Thyroid: Metabolic balance & functional stretching
    "thyroid": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
    // Fatty Liver: Metabolic conditioning & core activation
    "fatty-liver": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&auto=format&fit=crop&q=80",
    // Anemia: Iron-rich fresh produce & bio-nutrition
    "anemia": "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=700&auto=format&fit=crop&q=80",
    // PCOS/PCOD: Endocrine wellness & gentle pilates
    "pcos-pcod": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
    // Arthritis: Non-weight-bearing aquatic swimming & low impact joint mobility
    "arthritis": "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=700&auto=format&fit=crop&q=80",
    // GERD / Acid Reflux: Alkaline anti-inflammatory nutrition
    "gerd-acid-reflux": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80"
  };

  const diseaseList = diseases || [];

  const filteredDiseases = useMemo(() => {
    if (!searchQuery.trim()) return diseaseList;
    const query = searchQuery.toLowerCase();
    return diseaseList.filter(d => 
      d.name.toLowerCase().includes(query) ||
      d.category.toLowerCase().includes(query) ||
      d.overview.toLowerCase().includes(query) ||
      (d.therapies && d.therapies.some(t => t.name.toLowerCase().includes(query) || t.type.toLowerCase().includes(query)))
    );
  }, [diseaseList, searchQuery]);

  const activeDisease = diseaseList.find(d => d.id === activeDiseaseId) || filteredDiseases[0] || diseaseList[0];

  // All therapies across all conditions for global clinical therapy repository view
  const allTherapies = useMemo(() => {
    const list = [];
    diseaseList.forEach(d => {
      if (d.therapies) {
        d.therapies.forEach(t => {
          list.push({ ...t, diseaseName: d.name, diseaseIcon: d.icon, diseaseId: d.id });
        });
      }
    });
    return list;
  }, [diseaseList]);

  const filteredTherapies = useMemo(() => {
    return allTherapies.filter(th => {
      if (selectedTherapyCategory !== 'all' && !th.type.toLowerCase().includes(selectedTherapyCategory.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return th.name.toLowerCase().includes(q) || th.protocol.toLowerCase().includes(q) || th.diseaseName.toLowerCase().includes(q);
      }
      return true;
    });
  }, [allTherapies, selectedTherapyCategory, searchQuery]);

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

      {/* Control Bar: Search & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search symptoms, therapies, cures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 self-stretch sm:self-auto">
          <button
            onClick={() => setViewMode('overview')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'overview'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Stethoscope size={13} />
            <span>Condition Overview</span>
          </button>
          <button
            onClick={() => setViewMode('therapies')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'therapies'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles size={13} />
            <span>Clinical Therapy Matrix ({allTherapies.length})</span>
          </button>
        </div>

      </div>

      {/* VIEW MODE 1: CONDITION OVERVIEW */}
      {viewMode === 'overview' && (
        <div className="space-y-8">
          {/* Disease Selection Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filteredDiseases.map(d => {
              const isSelected = d.id === activeDisease.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDiseaseId(d.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
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
          <div className="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl space-y-8 animate-in fade-in duration-150">
        
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
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80";
              }}
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
  )}

  {/* VIEW MODE 2: CLINICAL THERAPY MATRIX */}
  {viewMode === 'therapies' && (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Therapies', icon: '✨' },
          { id: 'Digital', label: 'Digital & CGM', icon: '📱' },
          { id: 'Physiological', label: 'Physiological & Muscle', icon: '💪' },
          { id: 'Thermal', label: 'Thermal & Sauna', icon: '🔥' },
          { id: 'Vagal', label: 'Vagal & Breathing', icon: '🫁' },
          { id: 'Nutritional', label: 'Nutraceutical & Herbal', icon: '🌿' },
          { id: 'Physical', label: 'Aquatic & Physical', icon: '🌊' },
          { id: 'Cryo', label: 'Cryotherapy', icon: '❄️' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedTherapyCategory(cat.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              selectedTherapyCategory === cat.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-950/50 scale-105'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <strong className="text-purple-300">{filteredTherapies.length}</strong> clinical non-drug therapy protocols</span>
        <span>Tap any card to view its corresponding disease cure</span>
      </div>

      {/* Therapy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTherapies.map((th, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveDiseaseId(th.diseaseId);
              setViewMode('overview');
            }}
            className="group fit-card p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-purple-500/30 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-950/40 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {th.type}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <span>{th.diseaseIcon}</span>
                  <span className="font-semibold text-[11px]">{th.diseaseName.split('(')[0].trim()}</span>
                </span>
              </div>

              <h4 className="text-sm font-black text-white group-hover:text-purple-300 transition-colors">
                {th.name}
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed">
                {th.protocol}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-purple-400 group-hover:text-purple-300">
              <span>View Full Disease Protocol</span>
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </div>
  )}

</div>
  );
}
