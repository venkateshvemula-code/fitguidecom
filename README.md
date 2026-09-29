# FitGuide — Modern Fitness, Anatomy & Nutrition Educational Platform (Vite + React)

> **"Train Smart. Eat Science. Master Your Body."**

FitGuide is a modern, responsive, beginner-friendly fitness and nutrition platform built with **Vite + React 18, Tailwind CSS, and Lucide Icons**. It educates users on exercise biomechanics, functional anatomy, growth and height optimization, female cycle wellness, clinical disease dietary cures, and daily habit tracking.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + CSS Variables
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`AppContext.jsx`) with persistent `localStorage` synchronization
- **Audio & AI**: Web Speech Recognition API + Web SpeechSynthesis TTS + 24/7 AI Health Coach

### Project Directory Structure
```
website/
├── index.html               # Vite SPA Root Template
├── package.json             # NPM dependencies & scripts
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS plugins
├── public/                  # Static assets (images, qr code)
└── src/
    ├── main.jsx             # React entry point
    ├── App.jsx              # Root Application & Tab Router
    ├── index.css            # Tailwind directives & Theme variables
    ├── context/
    │   └── AppContext.jsx   # Global Context (Theme, Tabs, Tracker, Auth, Favorites)
    ├── data/
    │   └── fitData.js       # Master verified fitness & nutrition dataset
    ├── components/
    │   ├── Navbar.jsx       # Responsive Glass Navbar & Mobile Drawer
    │   ├── Footer.jsx       # Brand info, platform links, and contact
    │   ├── FitBotCoach.jsx  # 24/7 AI Health Assistant with Voice & Audio
    │   ├── QrLoginModal.jsx # Live QR code, WhatsApp forwarder, relative login
    │   ├── ExerciseModal.jsx# In-depth form guide & pregnancy cautions
    │   ├── FoodModal.jsx    # Nutrition facts & quick log to tracker
    │   ├── GlobalSearchModal.jsx # Ctrl+K multi-entity instant search
    │   ├── FavoritesDrawer.jsx   # Saved workouts and superfoods
    │   └── ToastContainer.jsx   # Non-blocking notification toasts
    └── pages/
        ├── HomeTab.jsx          # Hero, 3 Core Pillars, Foundation workouts
        ├── ExercisesTab.jsx     # Filterable exercise directory (16+ drills)
        ├── InteractiveBodyTab.jsx # Interactive front & back muscle anatomy
        ├── HeightTab.jsx        # Stature & spinal decompression workouts
        ├── WomenHealthTab.jsx   # Mature cycle (21-35d) & pregnancy care
        ├── DiseasesTab.jsx      # Dietary cures (Diabetes, BP, Thyroid, etc.)
        ├── HealthyDietTab.jsx   # Gender nutrition matrix & 7-meal plans
        ├── NutritionTab.jsx     # Macronutrients & micronutrients science
        ├── FoodsTab.jsx         # Searchable food database with macro bars
        ├── CalculatorTab.jsx    # Mifflin-St Jeor BMR & TDEE calculator
        ├── DailyTrackerTab.jsx  # 8-glass water tracker & workout session log
        └── GymsTab.jsx          # Vizag & Gajuwaka gyms with Google Maps
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Development
```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Open browser
http://localhost:3000/
```

### Production Build
```bash
# Build optimized static assets for production deployment (Netlify, Vercel, GitHub Pages)
npm run build

# Preview production build locally
npm run preview
```

---

## 🌟 Core Modules & Features

### 1. 🌸 Women's Health & Maternal Wellness Hub
- **Mature Menstrual Cycle**: Clinical duration (21 to 35 days), 3 to 7 days bleeding duration, 30 to 80 mL healthy blood loss.
- **4 Biological Phases**: Menstrual, Follicular, Ovulatory, and Luteal phases with dedicated hormonal profiles, energy levels, mood analysis, and workout guidance.
- **Cycle Precautions & Iron Superfoods**: Iron-rich spinach, lentils, beetroot to counter anemia vs foods to eliminate (caffeine, refined sugar, high-sodium).
- **Pregnancy Fitness**: Safe workouts (Pelvic tilts, Kegels, Modified squats, Walking) with proven labor advantages and cautions.
- **Dangerous Exercises to Avoid**: Visual warning badges for supine exercises, hot yoga, high-impact jumping, and contact sports.

### 2. 🩺 Clinical Disease Management & Dietary Cures
- **Conditions Covered**: Type-2 Diabetes, Hypertension (High BP), Hyperlipidemia (Cholesterol), Hypo/Hyperthyroidism, Non-Alcoholic Fatty Liver Disease (NAFLD), and Iron-Deficiency Anemia.
- **Biological Gender Aspects**: Manifestation differences in males vs. females.
- **Healing Superfoods**: Fenugreek seeds, Garlic, Flaxseeds, Oats, Karela juice, Jamun, Citrus fruits.
- **Foods to Avoid**: Refined maida, sodium >1,500mg, saturated trans-fats, processed sugars.
- **Clinical Pharmacology Overview**: Educational overview of standard clinical medications (Metformin, Telmisartan, Statins, Levothyroxine).
- **Non-Pharmaceutical Lifestyle Therapy**: Brisk walking, aerobic swimming, resistance training with photo previews.

### 3. 🥗 Balanced Healthy Diets for Men & Women
- **Gender Nutrition Matrix**: Direct side-by-side comparison table between biological males and females (Calories, Protein, Iron, Calcium, Zinc, Daily Water).
- **7-Meal Daily Timelines**: Complete 24-hour schedules with Indian vegetarian and non-vegetarian choices.

### 4. 📏 Height, Growth & Spinal Decompression Guide
- **Stature Mechanics**: Epiphyseal growth plate chondrocyte proliferation, Stage-4 slow-wave sleep HGH secretion, and intervertebral disc re-hydration.
- **6 Postural Traction Routines**: Dead Hang, Cobra Stretch, Cat-Cow, Pelvic Shift, Child's Pose, Bird Dog with photo previews and traction cues.
- **Bone Mineralization Nutrition**: Calcium (1,000-1,200mg), Vitamin D3 (2,000 IU), Zinc (11mg), and high-quality protein (1.6-2.0g/kg).

### 5. 🤖 FitBot 24/7 AI Health Assistant
- Floating AI health coach with Web Speech Recognition (voice query) and SpeechSynthesis (readout).
- Direct answers on workouts, menstrual cycle norms, pregnancy safety, diseases, and daily calorie tracking.

### 6. 📱 QR Code Login & Relative Forwarding
- Live QR code for smartphone camera / Google Lens scanning.
- 1-click WhatsApp forward link formatted for relatives and family members.
- Guest profile personalization and PNG download.

### 7. 📍 Visakhapatnam & Gajuwaka Fitness Gyms Directory
- Curated gym centers across Sheelanagar, Gajuwaka, Dwarakanagar, and MVP Colony (U Fit, Iron Paradise, Powerhouse, Vizag Gold, Titan, etc.).
- Ratings, opening hours, contact numbers, amenities badges, and direct Google Maps directions.

---

## 📞 Contact & Support

- **Lead / Coach**: **Venkatesh Vemula**
- **Phone / WhatsApp**: [+91 9014430474](https://wa.me/919014430474)
- **Email**: [venkateshvemula8897@gmail.com](mailto:venkateshvemula8897@gmail.com)
- **Location**: Gajuwaka & Visakhapatnam, Andhra Pradesh, India
- **Live Production URL**: [https://fitguidecom.netlify.app/](https://fitguidecom.netlify.app/)

---

## ⚖️ Health & Medical Disclaimer

This website provides general educational information about fitness biomechanics, anatomy, and nutrition. Nutritional and physiological requirements vary significantly between individuals based on genetics, age, and health conditions. This platform is not a substitute for advice from a qualified healthcare professional, registered dietitian, or certified medical specialist. FitGuide does not diagnose diseases or prescribe pharmaceutical treatments.
