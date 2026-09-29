import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  Search, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Bot, 
  QrCode, 
  MessageCircle, 
  Mail,
  Dumbbell,
  Apple,
  Activity,
  User
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    theme, 
    toggleTheme, 
    favorites, 
    openModal, 
    toggleFitBot,
    userAuth
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const favCount = (favorites.exercises?.length || 0) + (favorites.foods?.length || 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'exercises', label: 'Exercises' },
    { id: 'bodyparts', label: 'Interactive Body' },
    { id: 'height', label: '📏 Height', special: 'text-teal-400 font-bold' },
    { id: 'women', label: "🌸 Women's Health", special: 'text-pink-400 font-bold' },
    { id: 'diseases', label: '🩺 Disease Cures', special: 'text-amber-400 font-bold' },
    { id: 'diet', label: '🥗 Healthy Diets', special: 'text-emerald-400 font-bold' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'foods', label: 'Foods' },
    { id: 'calculator', label: 'Calculator' },
    { id: 'tracker', label: 'Tracker' },
    { id: 'gyms', label: '📍 Gyms', special: 'text-emerald-400 font-bold' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header class="sticky top-0 z-50 glass-nav transition-all">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')} 
            class="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
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
          <nav class="hidden lg:flex items-center space-x-1 xl:space-x-1.5 text-xs font-medium">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  class={`px-2.5 py-1.5 rounded-md transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'text-emerald-400 font-bold border-b-2 border-emerald-500 bg-emerald-500/10' 
                      : link.special 
                        ? `${link.special} hover:opacity-80` 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Actions */}
          <div class="flex items-center gap-2 sm:gap-2.5">
            {/* FitBot AI Header Button */}
            <button 
              onClick={toggleFitBot}
              class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-purple-500/50 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-teal-500/20 text-purple-300 hover:text-white text-xs font-bold hover:from-purple-500/30 hover:to-teal-500/30 transition-all cursor-pointer shadow-sm"
              title="Chat with FitBot AI Coach"
            >
              <span class="animate-pulse">🤖</span>
              <span class="hidden sm:inline">FitBot AI</span>
            </button>

            {/* QR Login & Share Button */}
            <button 
              onClick={() => openModal('qr')}
              class="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg border border-teal-500/50 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 hover:text-white text-xs font-bold hover:from-emerald-500/30 hover:to-teal-500/30 transition-all cursor-pointer shadow-sm"
              title="Scan QR Code to Login or Share Link with Relatives"
            >
              <span>📱</span>
              <span class="hidden sm:inline">QR Login & Share</span>
            </button>

            {/* WhatsApp Quick Chat */}
            <a 
              href="https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20fitness%20and%20nutrition%20question!" 
              target="_blank" 
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/15 text-emerald-400 text-xs font-bold hover:bg-emerald-500/25 transition-all"
              title="WhatsApp: +91 9014430474"
            >
              <span>💬</span>
              <span class="hidden md:inline">WhatsApp</span>
            </a>

            {/* Gmail Direct Mail */}
            <a 
              href="mailto:venkateshvemula8897@gmail.com?subject=FitGuide%20Fitness%20%26%20Nutrition%20Inquiry"
              class="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 text-xs font-medium hover:border-slate-500 hover:text-white transition-all"
              title="Email: venkateshvemula8897@gmail.com"
            >
              <span>✉️</span>
              <span class="hidden md:inline">Gmail</span>
            </a>

            {/* Global Search Button */}
            <button 
              onClick={() => openModal('search')}
              class="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 text-xs text-slate-300 hover:border-emerald-500 hover:text-white transition-all cursor-pointer"
              title="Quick Search"
            >
              <span>🔍 Search...</span>
            </button>

            {/* Favorites Drawer Button */}
            <button 
              onClick={() => openModal('favorites')}
              class="relative p-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              title="Saved Favorites"
            >
              <span>❤️</span>
              {favCount > 0 && (
                <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </button>

            {/* Dark/Light Theme Toggle */}
            <button 
              onClick={toggleTheme}
              class="p-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              class="lg:hidden p-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer Menu */}
      {mobileMenuOpen && (
        <div class="lg:hidden border-b border-slate-700 bg-slate-900/98 px-4 pt-2 pb-5 space-y-1.5 text-sm font-medium shadow-2xl animate-in slide-in-from-top duration-200">
          <button 
            onClick={() => { toggleFitBot(); setMobileMenuOpen(false); }}
            class="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-500/25 mb-1 cursor-pointer"
          >
            <span class="flex items-center gap-2"><span>🤖</span> <span>FitBot AI 24/7 Smart Health Coach</span></span>
            <span class="px-1.5 py-0.5 rounded bg-purple-500/30 text-[10px] text-purple-200">Active</span>
          </button>

          <button 
            onClick={() => { openModal('qr'); setMobileMenuOpen(false); }}
            class="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-teal-500/40 text-teal-300 font-bold text-xs hover:bg-teal-500/25 mb-1 cursor-pointer"
          >
            <span class="flex items-center gap-2"><span>📱</span> <span>QR Code Login & Share with Relatives</span></span>
            <span>➔</span>
          </button>

          <button 
            onClick={() => { openModal('search'); setMobileMenuOpen(false); }}
            class="w-full text-left flex items-center justify-between px-3 py-2.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold hover:text-white mb-2 cursor-pointer"
          >
            <span class="flex items-center gap-2"><span>🔍</span> <span>Search Exercises, Foods, Diseases</span></span>
            <span class="text-xs text-slate-400">Ctrl+K</span>
          </button>

          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              class={`w-full text-left block px-3 py-2 rounded-md transition-colors ${
                activeTab === link.id 
                  ? 'bg-emerald-500/20 text-emerald-400 font-bold' 
                  : link.special 
                    ? `${link.special} hover:bg-slate-800` 
                    : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              {link.label}
            </button>
          ))}

          <div class="pt-3 border-t border-slate-800 flex gap-2">
            <a 
              href="https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20fitness%20and%20nutrition%20question!" 
              target="_blank" 
              class="w-1/2 text-center py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold"
            >
              💬 WhatsApp
            </a>
            <a 
              href="mailto:venkateshvemula8897@gmail.com?subject=FitGuide%20Fitness%20Inquiry" 
              class="w-1/2 text-center py-2 bg-slate-800 text-slate-200 rounded-lg text-xs font-bold"
            >
              ✉️ Gmail
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
