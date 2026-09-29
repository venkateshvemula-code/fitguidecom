import React from 'react';
import { useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FitBotCoach from './components/FitBotCoach';
import QrLoginModal from './components/QrLoginModal';
import ExerciseModal from './components/ExerciseModal';
import FoodModal from './components/FoodModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import ToastContainer from './components/ToastContainer';

// Pages
import HomeTab from './pages/HomeTab';
import ExercisesTab from './pages/ExercisesTab';
import InteractiveBodyTab from './pages/InteractiveBodyTab';
import HeightTab from './pages/HeightTab';
import WomenHealthTab from './pages/WomenHealthTab';
import DiseasesTab from './pages/DiseasesTab';
import HealthyDietTab from './pages/HealthyDietTab';
import NutritionTab from './pages/NutritionTab';
import FoodsTab from './pages/FoodsTab';
import CalculatorTab from './pages/CalculatorTab';
import DailyTrackerTab from './pages/DailyTrackerTab';
import GymsTab from './pages/GymsTab';

export default function App() {
  const { activeTab } = useApp();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'exercises':
        return <ExercisesTab />;
      case 'bodyparts':
        return <InteractiveBodyTab />;
      case 'height':
        return <HeightTab />;
      case 'women':
        return <WomenHealthTab />;
      case 'diseases':
        return <DiseasesTab />;
      case 'diet':
        return <HealthyDietTab />;
      case 'nutrition':
        return <NutritionTab />;
      case 'foods':
        return <FoodsTab />;
      case 'calculator':
        return <CalculatorTab />;
      case 'tracker':
        return <DailyTrackerTab />;
      case 'gyms':
        return <GymsTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <div class="min-h-screen flex flex-col transition-colors selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Persistent Medical Disclaimer */}
      <div class="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-center text-[11px] text-amber-300 font-medium">
        <span>⚠️ Educational fitness & nutrition platform. Always consult a qualified physician or certified trainer before beginning any new training or dietary regimen.</span>
      </div>

      {/* Main Navbar */}
      <Navbar />

      {/* Dynamic Tab Page */}
      <main class="flex-1">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ExerciseModal />
      <FoodModal />
      <QrLoginModal />
      <GlobalSearchModal />
      <FavoritesDrawer />
      <FitBotCoach />
      <ToastContainer />
    </div>
  );
}
