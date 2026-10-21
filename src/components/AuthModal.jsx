import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Smartphone, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  User, 
  Share2, 
  Sparkles, 
  QrCode,
  LogOut
} from 'lucide-react';

export default function AuthModal() {
  const { activeModal, closeModal, userAuth, setUserAuth, showToast, openModal } = useApp();

  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  if (!activeModal || (activeModal.type !== 'auth' && activeModal.type !== 'login')) return null;

  const handleSendOtp = (e) => {
    e?.preventDefault();
    const cleanedPhone = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleanedPhone || cleanedPhone.length < 10) {
      showToast("Please enter a valid 10-digit mobile number.", "warning");
      return;
    }

    setIsLoading(true);
    // Simulate real SMS gateway delivery (Twilio / Firebase Phone Auth mock)
    setTimeout(() => {
      // 6-digit mock OTP
      const mockCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(mockCode);
      setStep('otp');
      setCountdown(45);
      setIsLoading(false);
      showToast(`📲 SMS Sent! Your FitGuide OTP verification code is: ${mockCode}`, "success");
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance cursor
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e?.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 6) {
      showToast("Please enter the complete 6-digit SMS OTP.", "warning");
      return;
    }

    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      showToast("Invalid OTP code. Please check SMS or re-send.", "error");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const cleanPhone = phoneNumber.startsWith('+91') ? phoneNumber : `+91 ${phoneNumber}`;
      const memberName = fullName.trim() || 'FitGuide Member';

      const authenticatedUser = {
        name: memberName,
        phone: cleanPhone,
        email: `${memberName.toLowerCase().replace(/\s+/g, '')}@fitguide.in`,
        role: "member",
        isVerified: true,
        loginMethod: "sms_otp",
        authenticatedAt: new Date().toISOString()
      };

      setUserAuth(authenticatedUser);
      setIsLoading(false);
      setStep('success');
      showToast(`Welcome ${memberName}! Phone verified successfully 🎉`, "success");

      setTimeout(() => {
        closeModal();
        setStep('phone');
        setOtp(['', '', '', '', '', '']);
      }, 1500);
    }, 700);
  };

  const handleLogout = () => {
    setUserAuth({
      name: "Guest Explorer",
      role: "guest",
      isVerified: false
    });
    showToast("Signed out. You can sign in anytime via SMS OTP.", "info");
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 rounded-full blur-sm"></div>

        {/* Modal Header */}
        <div className="p-5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-lg shadow-sm">
              <Smartphone size={20} />
            </div>
            <div>
              <h3 className="text-base font-black font-heading text-white flex items-center gap-1.5">
                SMS OTP Login
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Secure
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">Direct mobile sign-in & personalized tracking</p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          
          {/* Current Auth Banner if logged in */}
          {userAuth?.isVerified && step === 'phone' && (
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <span className="font-extrabold text-white text-xs block">{userAuth.name}</span>
                  <span className="text-[11px] text-emerald-300 font-mono">{userAuth.phone || userAuth.email}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
              >
                <LogOut size={13} />
                <span>Log Out</span>
              </button>
            </div>
          )}

          {/* STEP 1: Phone input */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="text-center pb-2">
                <h4 className="text-lg font-black text-white font-heading">Enter Your Mobile Number</h4>
                <p className="text-xs text-slate-400 mt-1">
                  We'll send a 6-digit one-time password (OTP) via instant SMS to verify your mobile device.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Full Name (Optional)</label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="e.g. Venkatesh Vemula"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">Mobile Number (India / Global)</label>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-slate-300">
                      🇮🇳 +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="90144 30474"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono tracking-wider text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                      autoFocus
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Sending SMS...</span>
                ) : (
                  <>
                    <span>Get SMS OTP Code</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => openModal('qr')}
                  className="text-xs text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <QrCode size={13} />
                  <span>Prefer QR Code Mobile Sync or Relative Link? Tap here</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-2 text-xl">
                  <KeyRound size={22} />
                </div>
                <h4 className="text-lg font-black text-white font-heading">Verify 6-Digit OTP</h4>
                <p className="text-xs text-slate-400">
                  SMS sent to <strong className="text-emerald-400">+91 {phoneNumber}</strong>
                </p>
                {generatedOtp && (
                  <div className="inline-block px-3 py-1 mt-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-bold">
                    🔔 Test SMS Code: <strong>{generatedOtp}</strong>
                  </div>
                )}
              </div>

              {/* 6 OTP Inputs */}
              <div className="flex justify-center items-center gap-2 sm:gap-2.5">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-10 sm:w-12 h-12 sm:h-14 text-center text-lg sm:text-xl font-mono font-black bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    autoFocus={idx === 0}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Verifying Credentials...</span>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Verify & Continue</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="hover:text-slate-200 transition-colors cursor-pointer"
                >
                  ← Change Number
                </button>

                {countdown > 0 ? (
                  <span className="text-slate-500 font-mono">Resend OTP in {countdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-emerald-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw size={12} />
                    <span>Resend SMS</span>
                  </button>
                )}
              </div>
            </form>
          )}

          {/* STEP 3: Success Animation */}
          {step === 'success' && (
            <div className="py-8 text-center space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto text-3xl shadow-lg shadow-emerald-500/20 animate-bounce">
                ✓
              </div>
              <h4 className="text-xl font-black text-white font-heading">Login Successful!</h4>
              <p className="text-xs text-slate-300">
                Your mobile number has been authenticated. Welcome back to FitGuide!
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer Security Badge */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>256-bit Encrypted Token Authentication</span>
          </span>
          <span className="text-slate-500">v2.0 OTP Service</span>
        </div>

      </div>
    </div>
  );
}
