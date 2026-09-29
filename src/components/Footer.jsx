import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setActiveTab } = useApp();

  return (
    <footer class="mt-auto border-t border-slate-800 bg-slate-950/80 text-slate-400 text-xs py-12 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm">
                ⚡
              </div>
              <span class="text-lg font-black font-heading text-white">Fit<span class="text-emerald-400">Guide</span></span>
            </div>
            <p class="text-xs leading-relaxed text-slate-400">
              A beginner-friendly fitness and nutrition educational platform helping you train smart, eat better, and understand your body.
            </p>
            <div class="pt-2">
              <span class="inline-block px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold">
                Live on Netlify: fitguidecom.netlify.app
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Platform Navigation</h4>
            <ul class="space-y-2">
              <li>
                <button onClick={() => setActiveTab('women')} class="hover:text-pink-400 font-semibold flex items-center gap-1.5 cursor-pointer">
                  <span>🌸</span> Women's Health Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diseases')} class="hover:text-amber-400 font-semibold flex items-center gap-1.5 cursor-pointer">
                  <span>🩺</span> Disease Cures & Treatments
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diet')} class="hover:text-emerald-400 font-semibold flex items-center gap-1.5 cursor-pointer">
                  <span>🥗</span> Balanced Daily Diets
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('height')} class="hover:text-teal-400 font-semibold flex items-center gap-1.5 cursor-pointer">
                  <span>📏</span> Height & Growth Guide
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('exercises')} class="hover:text-emerald-400 cursor-pointer">
                  Exercise Directory (16+)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('bodyparts')} class="hover:text-emerald-400 cursor-pointer">
                  Interactive Body Map
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('nutrition')} class="hover:text-emerald-400 cursor-pointer">
                  Macro & Micronutrients
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('foods')} class="hover:text-emerald-400 cursor-pointer">
                  Searchable Food Database
                </button>
              </li>
            </ul>
          </div>

          {/* Tools Links */}
          <div>
            <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Interactive Tools</h4>
            <ul class="space-y-2">
              <li>
                <button onClick={() => setActiveTab('calculator')} class="hover:text-emerald-400 cursor-pointer">
                  TDEE & Macro Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tracker')} class="hover:text-emerald-400 cursor-pointer">
                  Daily Water & Calorie Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('gyms')} class="hover:text-emerald-400 cursor-pointer">
                  📍 Find Fitness Gyms (Vizag & Gajuwaka)
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Location Info */}
          <div>
            <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Direct Contact & Support</h4>
            <ul class="space-y-2 text-xs">
              <li>
                <a href="https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20fitness%20and%20nutrition%20question!" target="_blank" rel="noopener noreferrer" class="text-emerald-400 font-semibold hover:underline flex items-center gap-1.5">
                  <span>💬</span> WhatsApp: +91 9014430474
                </a>
              </li>
              <li>
                <a href="mailto:venkateshvemula8897@gmail.com?subject=FitGuide%20Fitness%20%26%20Nutrition%20Inquiry" class="text-slate-300 hover:text-white flex items-center gap-1.5">
                  <span>✉️</span> venkateshvemula8897@gmail.com
                </a>
              </li>
              <li class="text-slate-400 flex items-center gap-1.5 pt-1">
                <span>📍</span> Gajuwaka & Visakhapatnam, AP
              </li>
              <li>
                <button onClick={() => setActiveTab('gyms')} class="text-xs text-emerald-400 hover:underline block pt-1 cursor-pointer">
                  ➔ View Local Fitness Gyms Map
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal / Medical Disclaimer */}
        <div class="border-t border-slate-800/80 pt-6 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong>Important Health Disclaimer:</strong> This website provides general educational information about exercise and nutrition. Nutritional requirements and exercise recommendations vary between individuals. The information provided is not a substitute for advice from a qualified healthcare professional, registered dietitian, or certified fitness professional. Do not disregard professional medical advice or delay seeking it because of information on this website. FitGuide does not diagnose diseases or prescribe medical treatments.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-between text-slate-400 pt-2 gap-2">
            <span>© 2026 FitGuide. Built with ❤️ for athletes and beginners.</span>
            <span>Lead / Coach: <strong class="text-slate-200">Venkatesh Vemula</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
