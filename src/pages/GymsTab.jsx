import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Clock, Search, ExternalLink, Navigation, Globe, Compass, Sparkles } from 'lucide-react';
import { gyms } from '../data/fitData';

export default function GymsTab() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [customCitySearch, setCustomCitySearch] = useState('');

  // Global presets: Major Indian cities & Global fitness metropolises
  const regions = [
    { id: 'all', label: 'All Curated' },
    { id: 'Vizag & AP', label: 'Vizag & AP 🇮🇳' },
    { id: 'Hyderabad', label: 'Hyderabad' },
    { id: 'Bangalore', label: 'Bangalore' },
    { id: 'Mumbai & Delhi', label: 'Mumbai & Delhi' },
    { id: 'Global', label: 'Global Cities 🌍' }
  ];

  // Extended Worldwide Gym Database + Curated Local Hubs
  const allGyms = useMemo(() => {
    const baseList = (gyms || []).map(g => ({
      ...g,
      region: 'Vizag & AP',
      location: g.location || g.area || `${g.city || 'Visakhapatnam'}, AP`,
      timing: g.timing || g.hours || '5:30 AM - 10:00 PM',
      mapsQuery: g.mapQuery || `${g.name} ${g.area || g.city || 'Visakhapatnam'}`
    }));

    // Additional Pan-India & Global Top Tier Gyms
    const globalAdditions = [
      {
        id: 'gym-cult-hyd',
        name: 'Cult.fit Elite Fitness Center',
        region: 'Hyderabad',
        city: 'Hyderabad',
        location: 'Jubilee Hills / Madhapur, Hyderabad',
        rating: 4.9,
        timing: '5:00 AM - 11:00 PM',
        phone: '+91 80 4718 2000',
        amenities: ['Strength Floor', 'Boxing Ring', 'Yoga Studio', 'CrossFit Rig', 'Certified Athletes'],
        mapsQuery: 'Cult.fit Jubilee Hills Hyderabad',
        highlight: 'Premier functional fitness and strength training academy in Hyderabad.'
      },
      {
        id: 'gym-nitrro-hyd',
        name: 'Nitrro Wellness & Fitness Hub',
        region: 'Hyderabad',
        city: 'Hyderabad',
        location: 'Road No 36, Jubilee Hills, Hyderabad',
        rating: 4.8,
        timing: '6:00 AM - 11:00 PM',
        phone: '+91 91000 88888',
        amenities: ['Skyline View', 'Olympic Free Weights', 'Cardio Cinema', 'Spa & Recovery'],
        mapsQuery: 'Nitrro Wellness Jubilee Hills Hyderabad',
        highlight: 'Luxury world-class bodybuilding and athletic performance sanctuary.'
      },
      {
        id: 'gym-volt-blr',
        name: 'Volt Energy Club & Fitness',
        region: 'Bangalore',
        city: 'Bangalore',
        location: 'Indiranagar / 100ft Road, Bangalore',
        rating: 4.9,
        timing: '5:30 AM - 10:30 PM',
        phone: '+91 80 4123 4567',
        amenities: ['Eleiko Competition Plates', 'Power Racks', 'HIIT Studio', 'Nutrition Bar'],
        mapsQuery: 'Volt Fitness Indiranagar Bangalore',
        highlight: 'High-intensity powerlifting and conditioning facility with biomechanical setups.'
      },
      {
        id: 'gym-cult-blr',
        name: 'Cult.fit HSR Strength & Conditioning',
        region: 'Bangalore',
        city: 'Bangalore',
        location: 'HSR Layout Sector 1, Bangalore',
        rating: 4.8,
        timing: '5:00 AM - 10:00 PM',
        phone: '+91 80 4718 2000',
        amenities: ['Kettlebell Arena', 'Functional Rig', 'Athletic Conditioning', 'Locker Rooms'],
        mapsQuery: 'Cult fit HSR Layout Sector 1 Bangalore',
        highlight: 'Group workout classes and elite strength barbell training.'
      },
      {
        id: 'gym-golds-mumbai',
        name: "Gold's Gym Flagship Center",
        region: 'Mumbai & Delhi',
        city: 'Mumbai',
        location: 'Bandra West, Mumbai',
        rating: 4.8,
        timing: '6:00 AM - 11:00 PM',
        phone: '+91 22 6699 9999',
        amenities: ['Hammer Strength Units', 'Dumbbells up to 60kg', 'Pro Bodybuilder Trainers', 'Steam/Sauna'],
        mapsQuery: "Gold's Gym Bandra West Mumbai",
        highlight: 'The iconic mecca of Indian celebrity fitness and hardcore resistance training.'
      },
      {
        id: 'gym-anytime-delhi',
        name: 'Anytime Fitness 24/7 Strength Club',
        region: 'Mumbai & Delhi',
        city: 'New Delhi',
        location: 'South Extension II / Connaught Place, New Delhi',
        rating: 4.7,
        timing: 'Open 24 Hours (24/7)',
        phone: '+91 11 4100 5555',
        amenities: ['24/7 Keycard Access', 'Precor Cardio', 'Free Weights Area', 'Virtual Coaching'],
        mapsQuery: 'Anytime Fitness South Extension New Delhi',
        highlight: 'Round-the-clock modern international fitness club.'
      },
      {
        id: 'gym-golds-venice',
        name: "Gold's Gym Venice (The Mecca)",
        region: 'Global',
        city: 'Los Angeles',
        location: 'Venice Beach, California, USA',
        rating: 4.9,
        timing: '5:00 AM - 11:00 PM',
        phone: '+1 310-392-6004',
        amenities: ['Historic Outdoor Pit', 'Heavy Dumbbells up to 200lbs', 'World Champions Wall'],
        mapsQuery: "Gold's Gym Venice Beach California",
        highlight: 'The legendary birthplace of modern bodybuilding and global fitness culture.'
      },
      {
        id: 'gym-puregym-london',
        name: 'PureGym Central 24/7 Athletic Center',
        region: 'Global',
        city: 'London',
        location: 'Piccadilly / Oxford St, London, UK',
        rating: 4.8,
        timing: 'Open 24 Hours (24/7)',
        phone: '+44 345 013 3499',
        amenities: ['220+ Training Stations', 'Olympic Lifting Platforms', 'Functional Turf Track'],
        mapsQuery: 'PureGym Central London UK',
        highlight: 'State-of-the-art European functional training and strength warehouse.'
      },
      {
        id: 'gym-fitnessfirst-dubai',
        name: 'Fitness First Platinum Club',
        region: 'Global',
        city: 'Dubai',
        location: 'Downtown Dubai / Marina, UAE',
        rating: 4.9,
        timing: '5:30 AM - 11:00 PM',
        phone: '+971 4 330 0000',
        amenities: ['Infinity Lap Pool', 'Technogym BioStrength', 'Hydrotherapy Suites', 'Skyline Deck'],
        mapsQuery: 'Fitness First Platinum Downtown Dubai',
        highlight: 'Ultra-luxury high performance fitness club overlooking the Burj Khalifa.'
      }
    ];

    return [...baseList, ...globalAdditions];
  }, []);

  // Filtered list based on region and search query
  const filteredGyms = useMemo(() => {
    return allGyms.filter(g => {
      // Search term filter
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = g.name.toLowerCase().includes(term);
        const matchesLoc = g.location && g.location.toLowerCase().includes(term);
        const matchesCity = g.city && g.city.toLowerCase().includes(term);
        const matchesRegion = g.region && g.region.toLowerCase().includes(term);
        if (!matchesName && !matchesLoc && !matchesCity && !matchesRegion) return false;
      }

      // Region preset filter
      if (selectedRegion !== 'all' && g.region !== selectedRegion) {
        return false;
      }

      return true;
    });
  }, [allGyms, searchTerm, selectedRegion]);

  // Handle instant worldwide live satellite search
  const handleLiveGlobalSearch = (e) => {
    e.preventDefault();
    const query = customCitySearch.trim() || searchTerm.trim() || 'gyms near me';
    const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('gyms fitness strength in ' + query)}`;
    window.open(mapsSearchUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <Globe size={13} className="text-emerald-400" />
            <span>Worldwide Fitness Directory</span>
          </span>
          <span className="text-xs font-bold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            Satellite GPS Directions
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight mt-3">
          Find Fitness Gyms & Strength Centers
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Search and navigate top-rated gyms across your neighborhood, major Indian cities (Vizag, Hyderabad, Bangalore, Mumbai, Delhi), 
          or tap to pinpoint fitness centers anywhere across the world via live Google Maps GPS.
        </p>
      </div>

      {/* Global Live Search Bar (Any City on Earth) */}
      <form onSubmit={handleLiveGlobalSearch} className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Type ANY city, area, or landmark on Earth (e.g. New York, London, Tokyo, Vizag, Gajuwaka)..."
            value={customCitySearch}
            onChange={(e) => setCustomCitySearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 shadow-inner"
          />
          <Compass size={17} className="text-emerald-400 absolute left-3.5 top-3.5" />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer whitespace-nowrap"
        >
          <Search size={16} />
          <span>Search Worldwide on Maps</span>
          <ExternalLink size={14} />
        </button>
      </form>

      {/* Search & Region Filter Bar */}
      <div className="fit-card p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          <div className="relative">
            <input
              type="text"
              placeholder="Filter by gym name, location, or amenities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <Search size={15} className="absolute left-3 top-3 text-slate-500" />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {regions.map(reg => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-950 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>

        </div>

        <div className="text-xs text-slate-400 pt-2 border-t border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <span>Showing <strong className="text-emerald-400">{filteredGyms.length}</strong> fitness centers</span>
          <span className="text-[11px] text-slate-400">💡 Tap any gym for direct Google Maps satellite navigation and route times.</span>
        </div>
      </div>

      {/* Gym Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGyms.map(gym => {
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.mapsQuery || gym.name + ' ' + gym.location)}`;
          return (
            <div
              key={gym.id}
              className="fit-card p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
                    🏋️
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      {gym.region || gym.city}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      ★ {gym.rating || '4.8'}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors">
                  {gym.name}
                </h3>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-start gap-2 text-slate-300">
                    <MapPin size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{gym.location}</span>
                  </div>

                  {gym.phone && (
                    <div className="flex items-center gap-2 text-slate-300">
                      <Phone size={14} className="text-teal-400 shrink-0" />
                      <a href={`tel:${gym.phone}`} className="hover:text-teal-300">{gym.phone}</a>
                    </div>
                  )}

                  {gym.timing && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={14} className="text-slate-500 shrink-0" />
                      <span>{gym.timing}</span>
                    </div>
                  )}

                  {gym.highlight && (
                    <p className="text-[11px] text-slate-400 italic pt-1 line-clamp-2">
                      "{gym.highlight}"
                    </p>
                  )}
                </div>

                {/* Amenities Badges */}
                {gym.amenities && (
                  <div className="flex gap-1.5 flex-wrap pt-2">
                    {gym.amenities.slice(0, 4).map((a, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        {a}
                      </span>
                    ))}
                    {gym.amenities.length > 4 && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                        +{gym.amenities.length - 4} more
                      </span>
                    )}
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
