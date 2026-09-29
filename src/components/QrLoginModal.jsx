import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Check, MessageSquare, Download, Share2, ShieldCheck, UserCheck } from 'lucide-react';

export default function QrLoginModal() {
  const { activeModal, closeModal, userAuth, setUserAuth, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [relativeName, setRelativeName] = useState('');
  const [relativePhone, setRelativePhone] = useState('');

  if (!activeModal || activeModal.type !== 'qr') return null;

  const shareableUrl = "https://fitguidecom.netlify.app/";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    showToast("Link copied to clipboard! Forward to relatives 📋", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppForward = () => {
    const text = `Hey! Check out FitGuide for science-backed workouts, height guides, women's wellness, and healthy daily diet plans:\n${shareableUrl}\n\nShared with care by ${userAuth.name || 'Venkatesh Vemula'}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleRelativeLogin = (e) => {
    e.preventDefault();
    if (!relativeName.trim()) {
      showToast("Please enter your name.", "warning");
      return;
    }
    setUserAuth({
      name: relativeName.trim(),
      phone: relativePhone.trim() || "+91 9014430474",
      email: "venkateshvemula8897@gmail.com",
      role: "relative"
    });
    showToast(`Welcome ${relativeName.trim()}! Personalized relative profile saved.`, "success");
    closeModal();
  };

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        class="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div class="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center text-lg">
              📱
            </div>
            <div>
              <h3 class="text-base font-bold text-white">QR Code Login & Relative Share</h3>
              <p class="text-[11px] text-slate-400">Instant smartphone login & family forwarding</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            class="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div class="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
          
          {/* Active Session Status */}
          <div class="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                👑
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-white text-sm">{userAuth.name || 'Venkatesh Vemula'}</span>
                  <span class="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {userAuth.role === 'owner' ? 'Owner / Admin' : 'Family Member'}
                  </span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">
                  📱 {userAuth.phone || '+91 9014430474'} • ✉️ {userAuth.email || 'venkateshvemula8897@gmail.com'}
                </p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            {/* Column 1: QR Code Card */}
            <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center text-center">
              <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                Live Official QR Code
              </span>
              
              <div class="p-3 bg-white rounded-2xl shadow-xl border-4 border-slate-700/60 mb-3 flex items-center justify-center w-[190px] h-[190px]">
                <img 
                  src="/images/fitguide_qr.png" 
                  alt="FitGuide Official Live QR Code" 
                  class="w-[170px] h-[170px] object-contain rounded-lg"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://fitguidecom.netlify.app/";
                  }}
                />
              </div>

              <p class="text-[11px] text-slate-400 mb-3 max-w-xs leading-relaxed">
                Scan with any phone camera or Google Lens to immediately open FitGuide on mobile!
              </p>

              <a
                href="/images/fitguide_qr.png"
                download="fitguide_qr.png"
                class="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download size={14} />
                <span>Save QR Code (PNG)</span>
              </a>
            </div>

            {/* Column 2: Forward to Relatives & Guest Form */}
            <div class="space-y-4">
              
              {/* Forward link box */}
              <div class="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                <span class="text-xs font-extrabold uppercase tracking-wider text-teal-400 block mb-1">
                  Forward Link to Relatives
                </span>
                <p class="text-[11px] text-slate-400 mb-2 leading-relaxed">
                  Relatives can tap this link directly to explore all exercises, height tips, and women's health:
                </p>

                <div class="flex items-center gap-1.5 mb-3">
                  <input
                    type="text"
                    readOnly
                    value={shareableUrl}
                    class="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-emerald-300 select-all"
                  />
                  <button
                    onClick={handleCopy}
                    class="py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <button
                  onClick={handleWhatsAppForward}
                  class="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare size={15} />
                  <span>Forward on WhatsApp to Relatives</span>
                </button>
              </div>

              {/* Guest / Relative Profile Form */}
              <form onSubmit={handleRelativeLogin} class="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                <span class="text-xs font-semibold text-slate-300 block">Or Login as Family Member / Guest:</span>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Suresh Vemula)"
                  value={relativeName}
                  onChange={(e) => setRelativeName(e.target.value)}
                  class="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={relativePhone}
                  onChange={(e) => setRelativePhone(e.target.value)}
                  class="w-full py-2 px-3 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  class="w-full py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Save Relative Profile
                </button>
              </form>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
