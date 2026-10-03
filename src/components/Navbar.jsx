import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Search, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown,
  Dumbbell,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    theme, 
    toggleTheme, 
    favorites, 
    openModal, 
    toggleFitBot 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const favCount = (favorites.exercises?.length || 0) + (favorites.foods?.length || 0);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const healthLinks = [
    { id: 'women', label: "Women's Health", icon: "🌸", desc: "Cycle phases, pregnancy & care" },
    { id: 'diseases', label: 'Disease Cures & Therapies', icon: "🩺", desc: "Targeted clinical protocols" },
    { id: 'height', label: 'Height & Spine Guide', icon: "📏", desc: "Spinal decompression & nutrition" },
    { id: 'diet', label: 'Balanced Daily Diets', icon: "🥗", desc: "Male & female 7-meal meal plans" }
  ];

  const exploreLinks = [
    { id: 'bodyparts', label: 'Interactive Body Map', icon: "🧬", desc: "Target muscles visually" },
    { id: 'nutrition', label: 'Macro & Micronutrients', icon: "🔬", desc: "Vitamins, minerals & carbs" },
    { id: 'foods', label: 'Food Database (25+)', icon: "🥑", desc: "Search foods & macro profiles" },
    { id: 'gyms', label: 'Find Nearby Gyms', icon: "📍", desc: "Vizag & local gym locator" }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const isHealthActive = healthLinks.some(l => l.id === activeTab);
  const isExploreActive = exploreLinks.some(l => l.id === activeTab);

  return (
    <header class="sticky top-0 z-50 glass-nav transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 gap-3">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            class="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none shrink-0"
          >
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-md group-hover:scale-105 transition-transform">
              ⚡
            </div>
            <div>
              <span class="text-xl font-black font-heading tracking-tight flex items-center">
                Fit<span class="text-emerald-400">Guide</span>
              </span>
              <span class="text-[10px] text-slate-400 -mt-1 block uppercase tracking-widest font-semibold">
                Learn & Train
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav ref={dropdownRef} class="hidden xl:flex items-center space-x-1.5 text-xs font-semibold">
            
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              class={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>

            {/* Exercises Directory */}
            <button
              onClick={() => handleNavClick('exercises')}
              class={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'exercises'
                  ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              💪 Exercises
            </button>

            {/* Health & Wellness Dropdown */}
            <div class="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'health' ? null : 'health')}
                class={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isHealthActive
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>🩺 Health & Therapies</span>
                <ChevronDown size={14} class={`transition-transform duration-200 ${openDropdown === 'health' ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {openDropdown === 'health' && (
                <div class="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {healthLinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      class={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                        activeTab === item.id 
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-white' 
                          : 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span class="text-lg">{item.icon}</span>
                      <div>
                        <div class="text-xs font-bold text-slate-100">{item.label}</div>
                        <div class="text-[11px] text-slate-400 font-normal">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Explore & Nutrition Dropdown */}
            <div class="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'explore' ? null : 'explore')}
                class={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  isExploreActive
                    ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <span>🥗 Explore</span>
                <ChevronDown size={14} class={`transition-transform duration-200 ${openDropdown === 'explore' ? 'rotate-180 text-emerald-400' : ''}`} />
              </button>

              {openDropdown === 'explore' && (
                <div class="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {exploreLinks.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      class={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-2.5 cursor-pointer ${
                        activeTab === item.id 
                          ? 'bg-emerald-500/15 border border-emerald-500/30 text-white' 
                          : 'hover:bg-slate-800/70 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span class="text-lg">{item.icon}</span>
                      <div>
                        <div class="text-xs font-bold text-slate-100">{item.label}</div>
                        <div class="text-[11px] text-slate-400 font-normal">{item.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Calculator */}
            <button
              onClick={() => handleNavClick('calculator')}
              class={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              🧮 Calculator
            </button>

            {/* Tracker */}
            <button
              onClick={() => handleNavClick('tracker')}
              class={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'tracker'
                  ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              💧 Daily Tracker
            </button>

          </nav>

          {/* Right Header Actions: Distinct, Prominent & Non-Congested */}
          <div class="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* FitBot AI Button */}
            <button 
              onClick={toggleFitBot}
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-purple-500/50 bg-gradient-to-r from-purple-500/25 to-indigo-500/25 text-purple-200 hover:text-white text-xs font-bold hover:scale-105 transition-all cursor-pointer shadow-md shadow-purple-500/10"
              title="Chat with FitBot AI Coach"
            >
              <span class="animate-pulse">🤖</span>
              <span class="font-heading">FitBot AI</span>
            </button>

            {/* Global Search Button */}
            <button 
              onClick={() => openModal('search')}
              class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-700 bg-slate-800/90 text-xs text-slate-200 hover:border-emerald-500 hover:text-white transition-all cursor-pointer shadow-sm"
              title="Search Exercises, Foods, Diseases"
            >
              <Search size={14} class="text-emerald-400" />
              <span class="hidden md:inline font-medium">Search</span>
              <kbd class="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-700 rounded text-slate-400">Ctrl+K</kbd>
            </button>

            {/* Favorites Drawer Button */}
            <button 
              onClick={() => openModal('favorites')}
              class="relative p-2 rounded-xl border border-slate-700 bg-slate-800/90 text-slate-200 hover:text-rose-400 hover:border-rose-500/50 transition-all cursor-pointer shadow-sm"
              title="Saved Favorites"
            >
              <Heart size={16} class={favCount > 0 ? "text-rose-400 fill-rose-400" : ""} />
              {favCount > 0 && (
                <span class="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow">
                  {favCount}
                </span>
              )}
            </button>

            {/* Dark/Light Theme Toggle */}
            <button 
              onClick={toggleTheme}
              class="p-2 rounded-xl border border-slate-700 bg-slate-800/90 text-slate-200 hover:text-amber-400 hover:border-amber-500/50 transition-all cursor-pointer shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile / Tablet Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class="xl:hidden p-2 rounded-xl border border-slate-700 bg-slate-800/90 text-slate-200 hover:text-white transition-all cursor-pointer"
              title="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile / Compact Navigation Drawer Menu */}
      {mobileMenuOpen && (
        <div class="xl:hidden border-b border-slate-800 bg-slate-900/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 text-sm font-medium shadow-2xl animate-in slide-in-from-top duration-200 max-h-[85vh] overflow-y-auto">
          
          <button 
            onClick={() => { toggleFitBot(); setMobileMenuOpen(false); }}
            class="w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-500/25 cursor-pointer"
          >
            <span class="flex items-center gap-2"><span>🤖</span> <span>FitBot AI 24/7 Health Coach</span></span>
            <span class="px-2 py-0.5 rounded-full bg-purple-500/30 text-[10px] text-purple-200 font-bold">Active</span>
          </button>

          <button 
            onClick={() => { openModal('search'); setMobileMenuOpen(false); }}
            class="w-full text-left flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 text-xs font-semibold hover:text-white cursor-pointer"
          >
            <span class="flex items-center gap-2"><Search size={14} class="text-emerald-400" /> <span>Search All Content</span></span>
            <span class="text-xs text-slate-400">Ctrl+K</span>
          </button>

          <div class="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Main Navigation</div>
          <div class="grid grid-cols-2 gap-1.5">
            {[
              { id: 'home', label: '🏠 Home' },
              { id: 'exercises', label: '💪 Exercises' },
              { id: 'calculator', label: '🧮 Calculator' },
              { id: 'tracker', label: '💧 Tracker' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                class={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === link.id 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-200 hover:bg-slate-800/70 border border-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div class="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Health, Diets & Therapies</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {healthLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                class={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === link.id 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-200 hover:bg-slate-800/70 border border-slate-800'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div class="pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">Anatomy, Food & Gyms</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {exploreLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                class={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === link.id 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-slate-200 hover:bg-slate-800/70 border border-slate-800'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div class="pt-4 border-t border-slate-800 flex justify-center text-xs text-slate-500">
            FitGuide • Train Smart & Eat Science
          </div>
        </div>
      )}
    </header>
  );
}
