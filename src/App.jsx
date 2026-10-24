import React from 'react';
import { useApp } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FitBotCoach from './components/FitBotCoach';
import ExerciseModal from './components/ExerciseModal';
import FoodModal from './components/FoodModal';
import GlobalSearchModal from './components/GlobalSearchModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import ToastContainer from './components/ToastContainer';
import AuthModal from './components/AuthModal';
import QrLoginModal from './components/QrLoginModal';
import ScrollProgressBar from './components/ScrollProgressBar';
import MouseGlow from './components/MouseGlow';
import FloatingDock from './components/FloatingDock';
import MagneticCursor from './components/MagneticCursor';
import IndianWorkoutPlaylistsModal from './components/IndianWorkoutPlaylistsModal';

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
import KidsFitnessTab from './pages/KidsFitnessTab';

export default function App() {
  const { activeTab, activeModal, closeModal } = useApp();

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
      case 'kids':
        return <KidsFitnessTab />;
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
    <div className="min-h-screen flex flex-col transition-colors selection:bg-emerald-500 selection:text-slate-950 relative">
      {/* Dynamic Top Scroll Progress Line */}
      <ScrollProgressBar />

      {/* Dynamic Cursor Spotlight Glowing Background */}
      <MouseGlow />

      {/* Luxury Spring Magnetic Cursor */}
      <MagneticCursor />

      {/* Floating Apple-Style Glassmorphism Quick Dock */}
      <FloatingDock />

      {/* Top Persistent Medical Disclaimer */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-center text-[11px] text-amber-300 font-medium">
        <span>⚠️ Educational fitness & nutrition platform. Always consult a qualified physician or certified trainer before beginning any new training or dietary regimen.</span>
      </div>

      {/* Main Navbar */}
      <div className="relative z-20">
        <Navbar />
      </div>

      {/* Dynamic Tab Page */}
      <main className="flex-1 relative z-10">
        {renderActiveTab()}
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>

      {/* Modals & Overlays */}
      <ExerciseModal />
      <FoodModal />
      <GlobalSearchModal />
      <FavoritesDrawer />
      <FitBotCoach />
      <AuthModal />
      <QrLoginModal />
      <IndianWorkoutPlaylistsModal 
        isOpen={activeModal === 'indian_music' || activeModal?.type === 'indian_music'} 
        onClose={closeModal} 
      />
      <ToastContainer />
    </div>
  );
}
