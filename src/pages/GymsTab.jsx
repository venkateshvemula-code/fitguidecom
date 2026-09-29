import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Clock, Search, ExternalLink, Navigation } from 'lucide-react';
import { gyms } from '../data/fitData';

export default function GymsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');

  const areas = ['Sheelanagar', 'Gajuwaka', 'Dwarakanagar', 'MVP Colony'];

  const filteredGyms = useMemo(() => {
    return (gyms || []).filter(g => {
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = g.name.toLowerCase().includes(term);
        const matchesLoc = g.location && g.location.toLowerCase().includes(term);
        if (!matchesName && !matchesLoc) return false;
      }

      if (selectedArea !== 'all') {
        if (!g.location || !g.location.toLowerCase().includes(selectedArea.toLowerCase())) {
          return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedArea]);

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          Local Fitness Directory
        </span>
        <h1 class="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Find Fitness Gyms & Strength Centers
        </h1>
        <p class="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Curated directory of top-rated fitness gyms across Visakhapatnam & Gajuwaka (including Sheelanagar, Dwarakanagar, MVP Colony). 
          Tap for direct Google Maps satellite directions and contact info.
        </p>
      </div>

      {/* Search & Area Filter Bar */}
      <div class="fit-card p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div class="relative">
            <input
              type="text"
              placeholder="Search by gym name (e.g. U Fit, Iron Paradise)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              class="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <Search size={15} class="absolute left-3 top-3 text-slate-500" />
          </div>

          <div class="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedArea('all')}
              class={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedArea === 'all'
                  ? 'bg-emerald-500 text-slate-950 shadow'
                  : 'bg-slate-950 text-slate-400 border border-slate-700 hover:text-white'
              }`}
            >
              All Locations
            </button>
            {areas.map(area => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                class={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedArea === area
                    ? 'bg-emerald-500 text-slate-950 shadow'
                    : 'bg-slate-950 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

        </div>

        <div class="text-xs text-slate-400 pt-2 border-t border-slate-800">
          Showing <strong class="text-emerald-400">{filteredGyms.length}</strong> gyms in Visakhapatnam & Gajuwaka
        </div>
      </div>

      {/* Gym Cards Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGyms.map(gym => {
          const mapsUrl = gym.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.name + ' ' + gym.location)}`;
          return (
            <div
              key={gym.id}
              class="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between group transition-all"
            >
              <div class="space-y-3">
                <div class="flex items-start justify-between">
                  <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
                    🏋️
                  </div>
                  <span class="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    ★ {gym.rating || '4.8'}
                  </span>
                </div>

                <h3 class="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                  {gym.name}
                </h3>

                <div class="space-y-1.5 text-xs text-slate-300">
                  <div class="flex items-start gap-2 text-slate-300">
                    <MapPin size={15} class="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{gym.location}</span>
                  </div>

                  {gym.phone && (
                    <div class="flex items-center gap-2 text-slate-300">
                      <Phone size={14} class="text-teal-400 shrink-0" />
                      <a href={`tel:${gym.phone}`} class="hover:text-teal-300">{gym.phone}</a>
                    </div>
                  )}

                  {gym.hours && (
                    <div class="flex items-center gap-2 text-slate-400">
                      <Clock size={14} class="text-slate-500 shrink-0" />
                      <span>{gym.hours}</span>
                    </div>
                  )}
                </div>

                {/* Amenities Badges */}
                {gym.amenities && (
                  <div class="flex gap-1.5 flex-wrap pt-2">
                    {gym.amenities.map((a, i) => (
                      <span key={i} class="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div class="pt-5 mt-4 border-t border-slate-800">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Navigation size={14} />
                  <span>Get Google Maps Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
