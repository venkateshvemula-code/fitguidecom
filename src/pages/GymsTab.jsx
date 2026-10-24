import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Search, 
  ExternalLink, 
  Navigation, 
  Compass, 
  Sparkles,
  Building2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { EXTENDED_GYMS_DATABASE } from '../data/gymsDatabase';

export default function GymsTab() {
  const [searchInput, setSearchInput] = useState('');
  const [selectedPreset, setSelectedPreset] = useState('all');
  const [postalInfo, setPostalInfo] = useState(null);
  const [isLoadingPostal, setIsLoadingPostal] = useState(false);

  // Quick Area / District Shortcuts
  const presetShortcuts = [
    { label: 'All Locations', value: 'all' },
    { label: 'Sheelanagar (530012)', value: '530012' },
    { label: 'Gajuwaka (530026)', value: '530026' },
    { label: 'Dwarakanagar (530016)', value: '530016' },
    { label: 'MVP Colony (530017)', value: '530017' },
    { label: 'Hyderabad (500081)', value: '500081' },
    { label: 'Bangalore (560034)', value: '560034' },
    { label: 'Mumbai & Delhi', value: 'Mumbai' }
  ];

  // Live query logic: matches Pin Code, District, City, or Name
  const searchResults = useMemo(() => {
    const query = searchInput.trim().toLowerCase();

    return EXTENDED_GYMS_DATABASE.filter(g => {
      // 1. Check preset shortcut first
      if (selectedPreset !== 'all') {
        const matchesPreset = 
          g.pincode === selectedPreset || 
          g.district?.toLowerCase().includes(selectedPreset.toLowerCase()) ||
          g.city?.toLowerCase().includes(selectedPreset.toLowerCase()) ||
          g.area?.toLowerCase().includes(selectedPreset.toLowerCase());
        if (!matchesPreset) return false;
      }

      // 2. If user typed in search bar
      if (query) {
        const matchesPin = g.pincode?.includes(query);
        const matchesDistrict = g.district?.toLowerCase().includes(query);
        const matchesCity = g.city?.toLowerCase().includes(query);
        const matchesArea = g.area?.toLowerCase().includes(query);
        const matchesName = g.name?.toLowerCase().includes(query);
        const matchesAddress = g.address?.toLowerCase().includes(query);
        const matchesAmenity = (g.amenities || []).some(a => a.toLowerCase().includes(query));

        if (!matchesPin && !matchesDistrict && !matchesCity && !matchesArea && !matchesName && !matchesAddress && !matchesAmenity) {
          return false;
        }
      }

      return true;
    });
  }, [searchInput, selectedPreset]);

  // When user inputs a 6-digit Indian PIN code, fetch live district details from Indian Postal API
  const handleSearchChange = async (e) => {
    const val = e.target.value;
    setSearchInput(val);

    const trimmed = val.trim();
    // Check if user entered a 6-digit Indian Postal Code
    if (/^\d{6}$/.test(trimmed)) {
      setIsLoadingPostal(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${trimmed}`);
        const data = await res.json();
        if (data && data[0]?.Status === 'Success') {
          const po = data[0].PostOffice?.[0];
          setPostalInfo({
            district: po.District,
            state: po.State,
            circle: po.Circle,
            names: data[0].PostOffice.map(p => p.Name).slice(0, 5)
          });
        } else {
          setPostalInfo(null);
        }
      } catch (err) {
        setPostalInfo(null);
      } finally {
        setIsLoadingPostal(false);
      }
    } else {
      if (postalInfo) setPostalInfo(null);
    }
  };

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
              <Compass size={13} className="text-emerald-400 animate-pulse" />
              <span>Pincode & District Fitness Locator</span>
            </span>
            <span className="text-xs font-bold text-teal-300 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              India & Worldwide Direct GPS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Find Gyms by PIN Code or District
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter your <strong>6-digit PIN code</strong> (e.g. <span className="text-emerald-400 font-mono font-bold">530012</span>, <span className="text-emerald-400 font-mono font-bold">530016</span>, <span className="text-emerald-400 font-mono font-bold">500081</span>) or <strong>district / area name</strong> (e.g. <em>Visakhapatnam, Sheelanagar, Gajuwaka, Hyderabad, Bangalore</em>) to instantly view local fitness centers, equipment specs, contact numbers, and satellite directions.
          </p>
        </div>
      </div>

      {/* Main Search & Postal Lookup Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter PIN code (e.g. 530012) or district / area name (e.g. Visakhapatnam, Sheelanagar, Hyderabad)..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-950 border border-slate-700 rounded-xl text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner font-medium"
          />
          <Search size={19} className="text-emerald-400 absolute left-4 top-4" />
          {searchInput && (
            <button
              onClick={() => {
                setSearchInput('');
                setPostalInfo(null);
              }}
              className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-0.5 rounded cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Live Postal API Verification Badge */}
        {postalInfo && (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
              <span>
                Verified Postal Region: <strong>{postalInfo.district} District</strong>, {postalInfo.state} ({postalInfo.names.join(', ')})
              </span>
            </div>
            <span className="font-mono text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-300">
              India Post Verified
            </span>
          </div>
        )}

        {/* Preset Shortcuts */}
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
            <Building2 size={13} />
            <span>Popular Hubs:</span>
          </span>
          {presetShortcuts.map((ps) => (
            <button
              key={ps.value}
              onClick={() => {
                setSelectedPreset(ps.value);
                setSearchInput(ps.value === 'all' ? '' : ps.value);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedPreset === ps.value
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {ps.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Meta Info */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 flex-wrap gap-2">
        <div>
          Showing <strong className="text-emerald-400 text-sm font-mono">{searchResults.length}</strong> matching fitness gyms & strength centers
        </div>
        <div className="text-slate-400">
          Showing results for <span className="text-white font-semibold">{searchInput || selectedPreset}</span>
        </div>
      </div>

      {/* Gym Cards Grid */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((gym) => {
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.name + ' ' + gym.address)}`;
            
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
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                        ★ {gym.rating}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                      {gym.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                        PIN: {gym.pincode}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {gym.district}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300 pt-1">
                    <div className="flex items-start gap-2">
                      <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-300 leading-snug">{gym.address}</span>
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
                      {gym.amenities.map((a, i) => (
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
            No gyms found for "{searchInput}" in local directory
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Don't worry! You can search live gyms around PIN code / area <strong>"{searchInput}"</strong> directly on Google Maps Satellite.
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('gyms fitness strength near ' + searchInput)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
          >
            <Navigation size={14} />
            <span>Search Live Gyms for "{searchInput}" on Maps</span>
            <ExternalLink size={13} />
          </a>
        </div>
      )}

    </div>
  );
}
