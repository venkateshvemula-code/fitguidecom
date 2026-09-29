import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('fitguide_theme') || 'dark';
  });

  // Active navigation tab
  const [activeTab, setActiveTabState] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['home', 'exercises', 'bodyparts', 'height', 'women', 'diseases', 'diet', 'nutrition', 'foods', 'calculator', 'tracker', 'gyms'];
    return validTabs.includes(hash) ? hash : 'home';
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fitguide_favorites') || '{"exercises":[], "foods":[]}');
    } catch {
      return { exercises: [], foods: [] };
    }
  });

  // Daily Tracker state
  const [dailyTracker, setDailyTracker] = useState(() => {
    const defaultTracker = {
      date: new Date().toISOString().split('T')[0],
      targetCalories: 2200,
      targetProtein: 140,
      loggedCalories: 0,
      loggedProtein: 0,
      waterGlasses: 0,
      loggedItems: []
    };
    try {
      const saved = JSON.parse(localStorage.getItem('fitguide_daily_tracker') || 'null');
      if (saved && saved.date === defaultTracker.date) {
        return saved;
      }
      return defaultTracker;
    } catch {
      return defaultTracker;
    }
  });

  // User session state
  const [userAuth, setUserAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('fitguide_auth') || 'null') || {
        name: "Venkatesh Vemula",
        phone: "+91 9014430474",
        email: "venkateshvemula8897@gmail.com",
        role: "owner"
      };
    } catch {
      return {
        name: "Venkatesh Vemula",
        phone: "+91 9014430474",
        email: "venkateshvemula8897@gmail.com",
        role: "owner"
      };
    }
  });

  // Active Modal: null or { type, data }
  const [activeModal, setActiveModal] = useState(null);

  // FitBot drawer state
  const [isFitBotOpen, setIsFitBotOpen] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fitguide_theme', theme);
  }, [theme]);

  // Sync favorites with localStorage
  useEffect(() => {
    localStorage.setItem('fitguide_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync tracker with localStorage
  useEffect(() => {
    localStorage.setItem('fitguide_daily_tracker', JSON.stringify(dailyTracker));
  }, [dailyTracker]);

  // Sync auth with localStorage
  useEffect(() => {
    localStorage.setItem('fitguide_auth', JSON.stringify(userAuth));
  }, [userAuth]);

  // Hash change listener
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['home', 'exercises', 'bodyparts', 'height', 'women', 'diseases', 'diet', 'nutrition', 'foods', 'calculator', 'tracker', 'gyms'];
      if (validTabs.includes(hash)) {
        setActiveTabState(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Set active tab and update hash & scroll
  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      showToast(`Switched to ${next} theme`, 'info');
      return next;
    });
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const toggleFavorite = (type, id) => {
    setFavorites(prev => {
      const list = prev[type] || [];
      const exists = list.includes(id);
      const updated = exists ? list.filter(item => item !== id) : [...list, id];
      showToast(exists ? `Removed from saved ${type}` : `Saved to ${type} ❤️`, 'success');
      return { ...prev, [type]: updated };
    });
  };

  const isFavorite = (type, id) => {
    return (favorites[type] || []).includes(id);
  };

  const openModal = (type, data = null) => {
    setActiveModal({ type, data });
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const toggleFitBot = () => {
    setIsFitBotOpen(prev => !prev);
  };

  const logWater = () => {
    setDailyTracker(prev => {
      if (prev.waterGlasses >= 8) {
        showToast("💧 Daily hydration target (8 glasses) already reached!", "success");
        return prev;
      }
      const newCount = prev.waterGlasses + 1;
      showToast(`💧 Glass ${newCount} logged (${newCount * 250} ml)`, "success");
      return { ...prev, waterGlasses: newCount };
    });
  };

  const resetWater = () => {
    setDailyTracker(prev => ({ ...prev, waterGlasses: 0 }));
    showToast("Water tracker reset", "info");
  };

  const logFoodItem = (item) => {
    setDailyTracker(prev => {
      const newItems = [...prev.loggedItems, { ...item, logId: Date.now() }];
      const newCals = prev.loggedCalories + (item.calories || 0);
      const newProt = prev.loggedProtein + (item.protein || 0);
      showToast(`Logged ${item.name} (+${item.calories} kcal, +${item.protein}g protein)`, "success");
      return {
        ...prev,
        loggedCalories: newCals,
        loggedProtein: newProt,
        loggedItems: newItems
      };
    });
  };

  const removeLogItem = (logId) => {
    setDailyTracker(prev => {
      const item = prev.loggedItems.find(i => i.logId === logId);
      if (!item) return prev;
      return {
        ...prev,
        loggedCalories: Math.max(0, prev.loggedCalories - (item.calories || 0)),
        loggedProtein: Math.max(0, prev.loggedProtein - (item.protein || 0)),
        loggedItems: prev.loggedItems.filter(i => i.logId !== logId)
      };
    });
    showToast("Item removed from daily log", "info");
  };

  return (
    <AppContext.Provider value={{
      theme,
      toggleTheme,
      activeTab,
      setActiveTab,
      favorites,
      toggleFavorite,
      isFavorite,
      dailyTracker,
      setDailyTracker,
      logWater,
      resetWater,
      logFoodItem,
      removeLogItem,
      userAuth,
      setUserAuth,
      activeModal,
      openModal,
      closeModal,
      isFitBotOpen,
      setIsFitBotOpen,
      toggleFitBot,
      toasts,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
