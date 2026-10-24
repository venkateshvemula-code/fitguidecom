import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  ExternalLink, 
  Navigation, 
  Compass, 
  Sparkles,
  CheckCircle2,
  Loader2,
  Radio,
  Globe2
} from 'lucide-react';
import { EXTENDED_GYMS_DATABASE } from '../data/gymsDatabase';
import { fetchLiveGymsByLocation } from '../services/liveGymService';

export default function GymsTab() {
  const [searchInput, setSearchInput] = useState('');
  
  // Live API States
  const [liveGyms, setLiveGyms] = useState([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);
  const [postalInfo, setPostalInfo] = useState(null);
  const debounceTimerRef = useRef(null);

  // Perform live API search whenever searchInput changes
  useEffect(() => {
    const query = searchInput.trim();

    if (!query) {
      setLiveGyms([]);
      setPostalInfo(null);
      setIsSearchingLive(false);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsSearchingLive(true);

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const { gyms, postalInfo: pInfo } = await fetchLiveGymsByLocation(query);
        setLiveGyms(gyms || []);
        setPostalInfo(pInfo || null);
      } catch (err) {
        console.error('Error in live gym fetch:', err);
      } finally {
        setIsSearchingLive(false);
      }
    }, 450);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [searchInput]);

  // Merge Live API Results with Local Database
  const displayedGyms = useMemo(() => {
    const query = searchInput.trim().toLowerCase();
    if (!query) return [];

    // 1. If we have live API results, prioritize them
    const results = [...liveGyms];

    // 2. Also check local database to enrich
    const localMatches = EXTENDED_GYMS_DATABASE.filter(g => {
      const matchesPin = g.pincode?.includes(query);
      const matchesDistrict = g.district?.toLowerCase().includes(query);
      const matchesCity = g.city?.toLowerCase().includes(query);
      const matchesArea = g.area?.toLowerCase().includes(query);
      const matchesName = g.name?.toLowerCase().includes(query);
      const matchesAddress = g.address?.toLowerCase().includes(query);
      return matchesPin || matchesDistrict || matchesCity || matchesArea || matchesName || matchesAddress;
    });

    // Add local records if not already present
    for (const lg of localMatches) {
      if (!results.some(r => r.name.toLowerCase() === lg.name.toLowerCase())) {
        results.push(lg);
      }
    }

    return results;
  }, [liveGyms, searchInput]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/30 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl font-black">
          🏋️
        </div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
              <Radio size={13} className="text-emerald-400 animate-pulse" />
              <span>Live Online API Gym Finder</span>
            </span>
            <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20 flex items-center gap-1">
              <Globe2 size={12} />
              <span>Pan-India PIN Code & Worldwide Cities</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Live Gym & Fitness Center Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter <strong>ANY 6-digit PIN code in India</strong> (e.g. <span className="text-emerald-400 font-mono font-bold">492001</span>, <span className="text-emerald-400 font-mono font-bold">530012</span>, <span className="text-emerald-400 font-mono font-bold">560034</span>) or <strong>district / city name</strong> (e.g. <em>Raipur, Visakhapatnam, Pune, Kolkata, Hyderabad, Delhi</em>). Our live API fetches real gym names, locations, and details directly from online geolocation servers!
          </p>
        </div>
      </div>

      {/* Main Search & Postal Lookup Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Type ANY PIN Code (e.g. 492001, 530012) or District / City (e.g. Raipur, Pune, Gajuwaka)..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-11 pr-12 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner font-medium"
          />
          <Search size={19} className="text-emerald-400 absolute left-4 top-4" />
          
          <div className="absolute right-3.5 top-3.5 flex items-center gap-2">
            {isSearchingLive && (
              <Loader2 size={18} className="text-emerald-400 animate-spin" />
            )}
            {searchInput && (
              <button
                onClick={() => {
                  setSearchInput('');
                  setLiveGyms([]);
                  setPostalInfo(null);
                }}
                className="text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Live Postal API Verification Badge */}
        {postalInfo && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>
                PIN Code <strong>{postalInfo.pincode}</strong> resolved online: <strong>{postalInfo.district} District</strong>, {postalInfo.state} ({postalInfo.places.join(', ')})
              </span>
            </div>
            <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300 shrink-0">
              ⚡ Live Postal API
            </span>
          </div>
        )}
      </div>

      {/* Results Meta Info */}
      {searchInput.trim() && (
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span>
              Found <strong className="text-emerald-400 text-sm font-mono">{displayedGyms.length}</strong> fitness gyms & strength centers
            </span>
            {isSearchingLive && (
              <span className="text-emerald-400 flex items-center gap-1 animate-pulse">
                <Loader2 size={11} className="animate-spin" />
                <span>Fetching live from online geolocation servers...</span>
              </span>
            )}
          </div>
          <div className="text-slate-400">
            Search Area: <span className="text-white font-semibold">{searchInput}</span>
          </div>
        </div>
      )}

      {/* Content Display: Initial Guide / Searching / Results Grid / Empty State */}
      {!searchInput.trim() ? (
        <div className="p-10 sm:p-14 text-center rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto text-3xl shadow-inner">
            📍
          </div>
          <h3 className="text-xl font-bold text-white">
            Search Any PIN Code or City Online
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
            Type your 6-digit postal PIN code (e.g., <span className="text-emerald-400 font-mono font-bold">492001</span>, <span className="text-emerald-400 font-mono font-bold">530012</span>, <span className="text-emerald-400 font-mono font-bold">560001</span>) or any district / city name above to fetch real fitness centers, addresses, and live routes directly from online servers.
          </p>
        </div>
      ) : isSearchingLive && displayedGyms.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <Loader2 size={36} className="text-emerald-400 animate-spin mx-auto" />
          <h3 className="text-base font-bold text-white">
            Fetching gyms online for "{searchInput}"...
          </h3>
          <p className="text-xs text-slate-400">
            Querying live postal and OpenStreetMap geolocation servers.
          </p>
        </div>
      ) : displayedGyms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedGyms.map((gym) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.name + ' ' + (gym.address || gym.location || ''))}`;
            
            return (
              <div
                key={gym.id}
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between group transition-all shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="space-y-3.5">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xl shadow-inner">
                      🏋️
                    </div>
                    <div className="flex items-center gap-2">
                      {gym.isLiveApi && (
                        <span className="text-[10px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded border border-teal-500/30">
                          Live Online POI
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        ★ {gym.rating || '4.8'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                      {gym.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      {gym.pincode && (
                        <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                          PIN: {gym.pincode}
                        </span>
                      )}
                      {(gym.district || gym.city) && (
                        <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {gym.district || gym.city}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-snug line-clamp-2">
                        {gym.address || gym.location}
                      </span>
                    </div>

                    {gym.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-teal-400 shrink-0" />
                        <a href={`tel:${gym.phone}`} className="hover:text-teal-300 font-mono font-semibold">
                          {gym.phone}
                        </a>
                      </div>
                    )}

                    {gym.timing && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={14} className="text-slate-500 shrink-0" />
                        <span>{gym.timing}</span>
                      </div>
                    )}

                    {gym.highlight && (
                      <p className="text-[11px] text-slate-400 italic pt-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                        "{gym.highlight}"
                      </p>
                    )}
                  </div>

                  {/* Amenities Badges */}
                  {gym.amenities && (
                    <div className="flex gap-1.5 flex-wrap pt-2">
                      {gym.amenities.slice(0, 4).map((a, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <Navigation size={14} />
                    <span>Get Directions & Satellite Route</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="w-14 h-14 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-base font-bold text-white">
            No gyms discovered for "{searchInput}"
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Try checking the spelling or typing your district / town name (e.g. <em>Raipur, Visakhapatnam, Pune, Delhi</em>).
          </p>
        </div>
      )}

    </div>
  );
}
