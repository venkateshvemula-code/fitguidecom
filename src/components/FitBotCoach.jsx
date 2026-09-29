import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Bot, X, Send, Mic, MicOff, Volume2, Sparkles } from 'lucide-react';
import { exercises, foods, womenHealth, diseases, healthyDiets } from '../data/fitData';

export default function FitBotCoach() {
  const { isFitBotOpen, toggleFitBot, dailyTracker, setActiveTab } = useApp();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 Hi! I am FitBot, your 24/7 AI Health & Fitness Coach. Ask me about workouts, mature cycle phases, pregnancy fitness, disease dietary cures, height growth, or daily nutrition!",
      time: "Just now"
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickChips = [
    "Best height exercises?",
    "Healthy menstrual cycle days",
    "Safe pregnancy exercises",
    "Diabetes healing foods",
    "High protein vegetarian foods",
    "My daily calorie progress"
  ];

  // AI Knowledge Answer Engine
  const generateFitBotAnswer = (query) => {
    const q = query.toLowerCase();

    if (q.includes('height') || q.includes('grow tall') || q.includes('spine')) {
      return "📏 To optimize height and spinal decompression: \n1. Perform Cobra Stretches and Hanging Bar Holds daily (15-30 mins).\n2. Maintain spinal disc hydration with adequate water.\n3. Take 1000mg Calcium and 2000 IU Vitamin D3 daily to support bone mineralization.\n\nTap the 'Height' tab in the navbar to see step-by-step spinal routines!";
    }

    if (q.includes('menstrual') || q.includes('period') || q.includes('cycle') || q.includes('mature')) {
      return "🌸 Menstrual Cycle Essentials:\n• Healthy cycle duration lasts 21 to 35 days (average: 28 days).\n• Active bleeding lasts 3 to 7 days with 30-80 mL blood loss.\n• 4 Biological Phases: Menstrual (rest/iron), Follicular (high energy HIIT), Ovulatory (strength peak), Luteal (cravings/magnesium).\n• Eat spinach, beetroot, and lentils to prevent iron deficiency anemia!";
    }

    if (q.includes('pregnant') || q.includes('pregnancy') || q.includes('labor')) {
      return "🤰 Pregnancy Fitness & Maternal Nutrition:\n• Safe Exercises: Pelvic Tilts (strengthens core), Kegels (tones pelvic floor for labor), Modified Squats, and 30-min Walking.\n• Exercises to Avoid: Contact sports, flat supine exercises after 16 weeks, jumping, and hot yoga.\n• Dietary Musts: 600 mcg Folic acid, 27mg Iron, and pasteurized foods only!";
    }

    if (q.includes('diabet') || q.includes('sugar') || q.includes('glucose')) {
      return "🩺 Diabetes Dietary Cures:\n• Superfoods: Fenugreek (Methi) seeds, Bitter Gourd (Karela juice), and Jamun seeds.\n• Exercise Cure: 45 minutes of brisk walking after meals reduces insulin resistance by up to 35%!\n• Avoid: Refined maida, sweetened sodas, and white rice.";
    }

    if (q.includes('bp') || q.includes('hypertension') || q.includes('blood pressure')) {
      return "🩺 Blood Pressure Management:\n• Healing Foods: Garlic (allicin relaxes blood vessels), Flaxseeds, and Potassium-rich bananas.\n• Strict Rule: Limit dietary sodium to under 1,500 mg/day.\n• Lifestyle Cure: 30 minutes of daily aerobic cycling or swimming.";
    }

    if (q.includes('protein') || q.includes('muscle')) {
      return "💪 High-Protein Recommendations:\n• Vegetarian: Soya Chunks (52g/100g), Paneer (18g/100g), Moong Dal (24g/100g), Greek Yogurt.\n• Non-Veg: Chicken Breast (31g/100g), Eggs (6g/egg), Fish.\n• Target: 1.6 to 2.2 grams of protein per kg of bodyweight for muscle growth!";
    }

    if (q.includes('calorie') || q.includes('tracker') || q.includes('progress') || q.includes('water')) {
      return `📊 Your Daily Tracker Snapshot:\n• Consumed: ${dailyTracker.loggedCalories} / ${dailyTracker.targetCalories} kcal\n• Protein: ${dailyTracker.loggedProtein}g / ${dailyTracker.targetProtein}g\n• Water: ${dailyTracker.waterGlasses} / 8 glasses (${dailyTracker.waterGlasses * 250} ml)\n\nKeep logging your meals to hit your daily targets!`;
    }

    return "🤖 FitGuide Tip: Consistency is the #1 rule in health! Explore our interactive tabs for: \n• 📏 Height & Spine routines\n• 🌸 Women's Health & Maternal care\n• 🩺 Clinical Disease treatments\n• 🥗 7-Meal balanced diets for men & women\n\nFeel free to ask any specific question!";
  };

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateFitBotAnswer(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  // Web Speech API Voice Recognition
  const toggleSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Edge.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleSend(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Text-To-Speech Readout
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleFitBot}
        class="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-2xl hover:scale-105 transition-all cursor-pointer border border-purple-400/40"
      >
        <span class="text-xl animate-bounce">🤖</span>
        <span class="hidden sm:inline">FitBot AI Coach</span>
      </button>

      {/* Chat Window Modal */}
      {isFitBotOpen && (
        <div class="fixed bottom-20 right-4 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[560px] bg-slate-900 border border-purple-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div class="p-4 bg-slate-950 border-b border-purple-500/30 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 class="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>FitBot AI Coach</span>
                  <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <span class="text-[10px] text-purple-300">24/7 Smart Health Assistant</span>
              </div>
            </div>
            <button
              onClick={toggleFitBot}
              class="p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages Feed */}
          <div class="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                class={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  class={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line shadow ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-br-none'
                      : 'bg-slate-950 border border-purple-500/20 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <div class="flex items-center gap-2 mt-1 px-1">
                  <span class="text-[10px] text-slate-500">{m.time}</span>
                  {m.sender === 'bot' && (
                    <button
                      onClick={() => speakText(m.text)}
                      class="text-slate-500 hover:text-purple-400 transition-colors cursor-pointer"
                      title="Read aloud"
                    >
                      <Volume2 size={12} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div class="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-950 border border-purple-500/20 w-fit text-slate-400">
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div class="p-2 bg-slate-950/80 border-t border-slate-800 overflow-x-auto whitespace-nowrap flex gap-1.5 shrink-0 scrollbar-none">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                class="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-purple-900/40 text-slate-300 hover:text-purple-300 border border-slate-700 hover:border-purple-500/40 text-[11px] font-medium transition-all cursor-pointer shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            class="p-3 bg-slate-950 border-t border-purple-500/30 flex items-center gap-2 shrink-0"
          >
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              class={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-slate-800 border-purple-500/30 text-purple-300 hover:bg-slate-700'
              }`}
              title={isListening ? "Listening... click to stop" : "Speak with voice"}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>

            <input
              type="text"
              placeholder="Ask anything about health, cycle, diet..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              class="flex-1 py-2 px-3 bg-slate-900 border border-purple-500/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />

            <button
              type="submit"
              class="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all cursor-pointer shadow-md"
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
