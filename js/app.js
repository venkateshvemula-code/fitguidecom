/**
 * FitGuide - Main Application Logic
 * Interactive UI Engine, State Management, Local Storage, & Calculators
 */

// Application State
const AppState = {
  theme: (function() {
    const saved = localStorage.getItem('fitguide_theme');
    if (saved === 'light') {
      try { localStorage.setItem('fitguide_theme', 'dark'); } catch (e) {}
      return 'dark';
    }
    return saved || 'dark';
  })(),
  currentTab: 'home',
  selectedBodyPart: null,
  bodyPartView: 'anterior', // 'anterior' or 'posterior'
  favorites: JSON.parse(localStorage.getItem('fitguide_favorites') || '{"exercises":[], "foods":[]}'),
  workoutList: JSON.parse(localStorage.getItem('fitguide_workout_list') || '[]'),
  workoutHistory: JSON.parse(localStorage.getItem('fitguide_history') || '[]'),
  dailyTracker: JSON.parse(localStorage.getItem('fitguide_daily_tracker') || JSON.stringify({
    date: new Date().toISOString().split('T')[0],
    targetCalories: 2200,
    targetProtein: 140,
    loggedCalories: 0,
    loggedProtein: 0,
    waterGlasses: 0, // 250ml each
    loggedItems: []
  })),
  userProfile: JSON.parse(localStorage.getItem('fitguide_profile') || JSON.stringify({
    name: "Athlete",
    goal: "muscle-gain",
    diet: "vegetarian"
  })),
  auth: JSON.parse(localStorage.getItem('fitguide_auth') || JSON.stringify({
    name: "Venkatesh Vemula",
    phone: "+91 9014430474",
    email: "venkateshvemula8897@gmail.com",
    role: "owner"
  })),
  qrMode: 'site' // 'site', 'vcard', 'whatsapp'
};

// Check if new day for tracker reset
(function checkTrackerDate() {
  const today = new Date().toISOString().split('T')[0];
  if (AppState.dailyTracker.date !== today) {
    AppState.dailyTracker.date = today;
    AppState.dailyTracker.loggedCalories = 0;
    AppState.dailyTracker.loggedProtein = 0;
    AppState.dailyTracker.waterGlasses = 0;
    AppState.dailyTracker.loggedItems = [];
    saveDailyTracker();
  }
})();

function saveDailyTracker() {
  localStorage.setItem('fitguide_daily_tracker', JSON.stringify(AppState.dailyTracker));
  renderDailyTrackerUI();
}

function saveFavorites() {
  localStorage.setItem('fitguide_favorites', JSON.stringify(AppState.favorites));
  updateFavoriteBadges();
}

function saveWorkoutList() {
  localStorage.setItem('fitguide_workout_list', JSON.stringify(AppState.workoutList));
  renderWorkoutListUI();
}

// Toast Notification
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  const icon = type === 'success' ? '✓' : 'ℹ';
  toast.innerHTML = `<span style="color:var(--accent-green);font-weight:bold;font-size:1.1rem;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRouting();
  initBodyMap();
  initExercisesPage();
  initFoodsPage();
  initNutritionPage();
  initExplorerPage();
  initMealTool();
  initCalculator();
  initTrackerAndWorkoutUI();
  initGlobalSearch();
  initQuickCategoryPills();
  initGymsPage();
  initHeightPage();
  initWomenHealthPage();
  initDiseasesPage();
  initHealthyDietPage();
  initModals();
  initAuthAndSharing();
  initFitBot();
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-theme', AppState.theme);
  updateThemeIcon();
  
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      AppState.theme = AppState.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', AppState.theme);
      localStorage.setItem('fitguide_theme', AppState.theme);
      updateThemeIcon();
      showToast(`Switched to ${AppState.theme} theme`, 'info');
    });
  }
}

function updateThemeIcon() {
  const themeIcon = document.getElementById('theme-icon');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeIcon) {
    themeIcon.textContent = AppState.theme === 'light' ? '🌙' : '☀️';
  }
  if (themeToggleBtn) {
    themeToggleBtn.title = AppState.theme === 'light' ? 'Switch to Dark Theme' : 'Switch to White Reactive Theme';
  }
}

/* ==========================================================================
   Tab Navigation & Routing
   ========================================================================== */
function initRouting() {
  // Handle URL hash routing
  window.addEventListener('hashchange', handleHashRoute);
  
  // Set initial route based on hash or default to home
  const initialHash = window.location.hash.replace('#', '') || 'home';
  navigateToTab(initialHash, false);

  // Delegated click handler for any nav target or hash link across the entire document
  document.addEventListener('click', (e) => {
    // 1. Elements with data-nav-target
    const navLink = e.target.closest('[data-nav-target]');
    if (navLink) {
      const target = navLink.getAttribute('data-nav-target');
      if (target) {
        e.preventDefault();
        navigateToTab(target);
        // Close mobile nav if open
        const mobileNavMenu = document.getElementById('mobile-nav-menu');
        if (mobileNavMenu) mobileNavMenu.classList.add('hidden');
        return;
      }
    }

    // 2. Standard anchor tags with hash href (e.g. href="#exercises")
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
      const hash = anchor.getAttribute('href').replace('#', '');
      const validTabs = ['home', 'exercises', 'bodyparts', 'nutrition', 'foods', 'meal-planner', 'calculator', 'explorer', 'tracker', 'gyms', 'height', 'women', 'diseases', 'diet'];
      if (validTabs.includes(hash)) {
        e.preventDefault();
        navigateToTab(hash);
        // Close mobile nav if open
        const mobileNavMenu = document.getElementById('mobile-nav-menu');
        if (mobileNavMenu) mobileNavMenu.classList.add('hidden');
      }
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileNavMenu.classList.toggle('hidden');
    });
  }
}

function handleHashRoute() {
  const hash = window.location.hash.replace('#', '') || 'home';
  navigateToTab(hash, false);
}

function navigateToTab(tabName, updateHash = true) {
  const validTabs = ['home', 'exercises', 'bodyparts', 'nutrition', 'foods', 'meal-planner', 'calculator', 'explorer', 'tracker', 'gyms', 'height', 'women', 'diseases', 'diet'];
  if (!validTabs.includes(tabName)) tabName = 'home';

  AppState.currentTab = tabName;
  if (updateHash) {
    window.location.hash = tabName;
  }

  // Update navbar links only (desktop & mobile)
  document.querySelectorAll('nav [data-nav-target], #mobile-nav-menu [data-nav-target]').forEach(btn => {
    if (btn.getAttribute('data-nav-target') === tabName) {
      btn.classList.add('text-emerald-500', 'font-bold', 'border-b-2', 'border-emerald-500');
      btn.classList.remove('text-slate-400', 'text-slate-300', 'text-slate-600');
    } else {
      btn.classList.remove('text-emerald-500', 'font-bold', 'border-b-2', 'border-emerald-500');
      btn.classList.add('text-slate-400');
    }
  });

  // Toggle active section
  document.querySelectorAll('.app-section').forEach(sec => {
    sec.classList.remove('active');
  });

  const activeSec = document.getElementById(`section-${tabName}`);
  if (activeSec) {
    activeSec.classList.add('active');
  }

  // Reactive render trigger for target section to guarantee fresh content
  try {
    if (tabName === 'women') {
      initWomenHealthPage();
    } else if (tabName === 'diseases') {
      initDiseasesPage();
    } else if (tabName === 'diet') {
      initHealthyDietPage();
    } else if (tabName === 'height') {
      initHeightPage();
    } else if (tabName === 'gyms') {
      initGymsPage();
    } else if (tabName === 'exercises') {
      if (typeof filterExercises === 'function') filterExercises();
    } else if (tabName === 'foods') {
      if (typeof filterFoods === 'function') filterFoods();
    } else if (tabName === 'tracker') {
      if (typeof renderTrackerAndWorkoutUI === 'function') renderTrackerAndWorkoutUI();
    }
  } catch (err) {
    console.warn(`Render error on navigating to ${tabName}:`, err);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ==========================================================================
   Home Page Category Pills & Featured Sections
   ========================================================================== */
function initQuickCategoryPills() {
  const pillsContainer = document.getElementById('home-category-pills');
  if (!pillsContainer) return;

  const categories = [
    { name: "Chest", type: "exercise", target: "chest" },
    { name: "Back", type: "exercise", target: "back" },
    { name: "Shoulders", type: "exercise", target: "shoulders" },
    { name: "Arms", type: "exercise", target: "biceps" },
    { name: "Legs", type: "exercise", target: "quadriceps" },
    { name: "Core", type: "exercise", target: "abs" },
    { name: "Height & Spine 📏", type: "height", target: "height" },
    { name: "Full Body", type: "exercise", target: "all" },
    { name: "Protein", type: "nutrient", target: "protein" },
    { name: "Vitamins", type: "nutrient", target: "vitamin" },
    { name: "Iron", type: "nutrient", target: "iron" }
  ];

  pillsContainer.innerHTML = categories.map(cat => `
    <button class="px-4 py-2 rounded-full text-sm font-medium border border-slate-700 bg-slate-800/80 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-400 transition-all cursor-pointer whitespace-nowrap"
      data-cat-type="${cat.type}" data-cat-target="${cat.target}">
      ${cat.name}
    </button>
  `).join('');

  pillsContainer.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-cat-type');
      const target = btn.getAttribute('data-cat-target');
      if (type === 'exercise') {
        navigateToTab('exercises');
        const filterSelect = document.getElementById('exercise-bodypart-filter');
        if (filterSelect) {
          filterSelect.value = target === 'all' ? 'all' : target;
          filterExercises();
        }
      } else if (type === 'height') {
        navigateToTab('height');
      } else if (type === 'nutrient') {
        if (target === 'iron') {
          navigateToTab('explorer');
          switchExplorerTab('iron');
        } else if (target === 'protein') {
          navigateToTab('explorer');
          switchExplorerTab('protein');
        } else if (target === 'vitamin') {
          navigateToTab('explorer');
          switchExplorerTab('vitamins');
        }
      }
    });
  });

  // Render Featured Exercises on Home
  renderFeaturedExercises();
  renderFeaturedFoods();
}

function renderFeaturedExercises() {
  const container = document.getElementById('home-featured-exercises');
  if (!container) return;

  const featured = FIT_DATA.exercises.slice(0, 4);
  container.innerHTML = featured.map(ex => createExerciseCardHTML(ex)).join('');
  attachExerciseCardEvents(container);
}

function renderFeaturedFoods() {
  const container = document.getElementById('home-featured-foods');
  if (!container) return;

  // Select 4 popular & Indian high-nutrient foods
  const featured = FIT_DATA.foods.filter(f => ['paneer', 'soya-chunks', 'spinach-palak', 'eggs-whole'].includes(f.id));
  container.innerHTML = featured.map(food => createFoodCardHTML(food)).join('');
  attachFoodCardEvents(container);
}

/* ==========================================================================
   Interactive Body Parts & Anatomy Section
   ========================================================================== */
function initBodyMap() {
  const bodyToggleBtn = document.getElementById('body-view-toggle');
  if (bodyToggleBtn) {
    bodyToggleBtn.addEventListener('click', () => {
      AppState.bodyPartView = AppState.bodyPartView === 'anterior' ? 'posterior' : 'anterior';
      bodyToggleBtn.textContent = AppState.bodyPartView === 'anterior' ? 'View Back Muscles (Posterior)' : 'View Front Muscles (Anterior)';
      renderBodyMapSVGs();
    });
  }

  // Render Muscle Button Selector Grid
  const buttonsContainer = document.getElementById('body-part-buttons-grid');
  if (buttonsContainer) {
    buttonsContainer.innerHTML = FIT_DATA.bodyParts.map(bp => `
      <button class="body-part-btn text-left p-3 rounded-lg border border-slate-700 bg-slate-800/70 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all flex items-center justify-between"
        data-bp-id="${bp.id}">
        <div>
          <span class="font-semibold text-slate-100 block text-sm">${bp.name}</span>
          <span class="text-xs text-slate-400">${bp.region}</span>
        </div>
        <span class="text-emerald-400 font-bold text-xs bg-emerald-500/20 px-2 py-0.5 rounded-full">
          ${FIT_DATA.exercises.filter(e => e.bodyPart === bp.id).length} drills
        </span>
      </button>
    `).join('');

    buttonsContainer.querySelectorAll('.body-part-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const bpId = btn.getAttribute('data-bp-id');
        selectBodyPart(bpId);
      });
    });
  }

  renderBodyMapSVGs();
  // Select Chest as default
  selectBodyPart('chest');
}

function renderBodyMapSVGs() {
  const mapSvgContainer = document.getElementById('body-interactive-svg-container');
  if (!mapSvgContainer) return;

  const isAnterior = AppState.bodyPartView === 'anterior';

  // Front & Back Interactive Anatomical SVG
  mapSvgContainer.innerHTML = isAnterior ? `
    <div class="text-center mb-3">
      <span class="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
        Anterior (Front View)
      </span>
    </div>
    <svg viewBox="0 0 300 500" class="w-full h-auto max-h-[460px] mx-auto filter drop-shadow">
      <!-- Head and neck silhouette -->
      <circle cx="150" cy="45" r="28" class="body-silhouette" />
      <rect x="141" y="70" width="18" height="22" rx="4" class="body-silhouette" />
      
      <!-- Torso Base -->
      <path d="M110,95 L190,95 L180,240 L120,240 Z" class="body-silhouette" />

      <!-- Shoulders (Anterior Deltoids) -->
      <path id="svg-part-shoulders-left" data-bp="shoulders" class="muscle-path" d="M85,95 Q105,92 115,105 Q105,135 85,120 Z" />
      <path id="svg-part-shoulders-right" data-bp="shoulders" class="muscle-path" d="M215,95 Q195,92 185,105 Q195,135 215,120 Z" />
      
      <!-- Chest (Pectoralis Major) -->
      <path id="svg-part-chest" data-bp="chest" class="muscle-path" d="M118,105 Q150,112 182,105 Q185,145 150,150 Q115,145 118,105 Z" />

      <!-- Biceps (Upper Arm) -->
      <path id="svg-part-biceps-left" data-bp="biceps" class="muscle-path" d="M85,125 Q96,140 88,175 Q72,165 78,135 Z" />
      <path id="svg-part-biceps-right" data-bp="biceps" class="muscle-path" d="M215,125 Q204,140 212,175 Q228,165 222,135 Z" />

      <!-- Forearms -->
      <path id="svg-part-forearms-left" data-bp="forearms" class="muscle-path" d="M78,180 Q88,215 75,250 Q62,235 68,190 Z" />
      <path id="svg-part-forearms-right" data-bp="forearms" class="muscle-path" d="M222,180 Q212,215 225,250 Q238,235 232,190 Z" />

      <!-- Abs & Core (Rectus Abdominis & Obliques) -->
      <path id="svg-part-abs" data-bp="abs" class="muscle-path" d="M125,155 Q150,154 175,155 L170,230 Q150,235 130,230 Z" />

      <!-- Quadriceps (Front Thighs) -->
      <path id="svg-part-quads-left" data-bp="quadriceps" class="muscle-path" d="M118,245 Q145,248 145,340 Q110,345 105,270 Z" />
      <path id="svg-part-quads-right" data-bp="quadriceps" class="muscle-path" d="M182,245 Q155,248 155,340 Q190,345 195,270 Z" />

      <!-- Knees -->
      <ellipse cx="127" cy="355" rx="12" ry="10" class="body-silhouette" />
      <ellipse cx="173" cy="355" rx="12" ry="10" class="body-silhouette" />

      <!-- Calves / Shins -->
      <path id="svg-part-calves-left" data-bp="calves" class="muscle-path" d="M117,370 Q138,390 133,450 Q118,460 114,410 Z" />
      <path id="svg-part-calves-right" data-bp="calves" class="muscle-path" d="M183,370 Q162,390 167,450 Q182,460 186,410 Z" />

      <!-- Feet -->
      <ellipse cx="118" cy="475" rx="14" ry="7" class="body-silhouette" />
      <ellipse cx="182" cy="475" rx="14" ry="7" class="body-silhouette" />
    </svg>
  ` : `
    <div class="text-center mb-3">
      <span class="text-xs uppercase tracking-wider font-semibold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30">
        Posterior (Back View)
      </span>
    </div>
    <svg viewBox="0 0 300 500" class="w-full h-auto max-h-[460px] mx-auto filter drop-shadow">
      <!-- Head & Neck -->
      <circle cx="150" cy="45" r="28" class="body-silhouette" />
      <rect x="141" y="70" width="18" height="22" rx="4" class="body-silhouette" />

      <!-- Shoulders (Rear Delts) -->
      <path id="svg-part-shoulders-left-back" data-bp="shoulders" class="muscle-path" d="M85,95 Q105,92 115,105 Q105,135 85,120 Z" />
      <path id="svg-part-shoulders-right-back" data-bp="shoulders" class="muscle-path" d="M215,95 Q195,92 185,105 Q195,135 215,120 Z" />

      <!-- Back (Lats & Trapezius) -->
      <path id="svg-part-back" data-bp="back" class="muscle-path" d="M115,95 L185,95 L172,215 Q150,225 128,215 Z" />

      <!-- Triceps (Back Arm) -->
      <path id="svg-part-triceps-left" data-bp="triceps" class="muscle-path" d="M85,125 Q96,140 88,175 Q72,165 78,135 Z" />
      <path id="svg-part-triceps-right" data-bp="triceps" class="muscle-path" d="M215,125 Q204,140 212,175 Q228,165 222,135 Z" />

      <!-- Forearms -->
      <path id="svg-part-forearms-left-back" data-bp="forearms" class="muscle-path" d="M78,180 Q88,215 75,250 Q62,235 68,190 Z" />
      <path id="svg-part-forearms-right-back" data-bp="forearms" class="muscle-path" d="M222,180 Q212,215 225,250 Q238,235 232,190 Z" />

      <!-- Glutes -->
      <path id="svg-part-glutes-left" data-bp="glutes" class="muscle-path" d="M118,225 Q148,225 148,275 Q115,275 118,225 Z" />
      <path id="svg-part-glutes-right" data-bp="glutes" class="muscle-path" d="M182,225 Q152,225 152,275 Q185,275 182,225 Z" />

      <!-- Hamstrings -->
      <path id="svg-part-hamstrings-left" data-bp="hamstrings" class="muscle-path" d="M116,280 Q145,280 142,350 Q112,350 110,295 Z" />
      <path id="svg-part-hamstrings-right" data-bp="hamstrings" class="muscle-path" d="M184,280 Q155,280 158,350 Q188,350 190,295 Z" />

      <!-- Calves (Gastrocnemius & Soleus) -->
      <path id="svg-part-calves-left-back" data-bp="calves" class="muscle-path" d="M115,365 Q140,380 134,450 Q112,450 110,400 Z" />
      <path id="svg-part-calves-right-back" data-bp="calves" class="muscle-path" d="M185,365 Q160,380 166,450 Q188,450 190,400 Z" />

      <!-- Feet -->
      <ellipse cx="118" cy="475" rx="14" ry="7" class="body-silhouette" />
      <ellipse cx="182" cy="475" rx="14" ry="7" class="body-silhouette" />
    </svg>
  `;

  // Attach SVG click handlers
  mapSvgContainer.querySelectorAll('.muscle-path').forEach(el => {
    el.addEventListener('click', () => {
      const bp = el.getAttribute('data-bp');
      if (bp) selectBodyPart(bp);
    });
  });

  // Re-highlight currently selected muscle
  if (AppState.selectedBodyPart) {
    highlightMuscleInSVG(AppState.selectedBodyPart);
  }
}

function selectBodyPart(bpId) {
  AppState.selectedBodyPart = bpId;
  const bodyPart = FIT_DATA.bodyParts.find(b => b.id === bpId);
  if (!bodyPart) return;

  // Highlight button in list
  document.querySelectorAll('.body-part-btn').forEach(btn => {
    if (btn.getAttribute('data-bp-id') === bpId) {
      btn.classList.add('border-emerald-500', 'bg-emerald-500/20');
    } else {
      btn.classList.remove('border-emerald-500', 'bg-emerald-500/20');
    }
  });

  highlightMuscleInSVG(bpId);

  // Render muscle detail header
  const titleEl = document.getElementById('selected-bodypart-title');
  const descEl = document.getElementById('selected-bodypart-desc');
  const musclesEl = document.getElementById('selected-bodypart-muscles');
  if (titleEl) titleEl.textContent = bodyPart.name;
  if (descEl) descEl.textContent = bodyPart.description;
  if (musclesEl) musclesEl.textContent = bodyPart.muscles;

  // Render target exercises
  const exContainer = document.getElementById('bodypart-exercises-list');
  if (exContainer) {
    const matchingExercises = FIT_DATA.exercises.filter(e => e.bodyPart === bpId);
    if (matchingExercises.length === 0) {
      exContainer.innerHTML = `<div class="p-6 text-center text-slate-400">No primary exercises found for this muscle in our database yet.</div>`;
    } else {
      exContainer.innerHTML = matchingExercises.map(ex => createExerciseCardHTML(ex)).join('');
      attachExerciseCardEvents(exContainer);
    }
  }
}

function highlightMuscleInSVG(bpId) {
  document.querySelectorAll('.muscle-path').forEach(p => p.classList.remove('active'));
  document.querySelectorAll(`.muscle-path[data-bp="${bpId}"]`).forEach(p => p.classList.add('active'));
}

/* ==========================================================================
   Exercise Database & Filtering
   ========================================================================== */
function initExercisesPage() {
  const searchInput = document.getElementById('exercise-search-input');
  const bpFilter = document.getElementById('exercise-bodypart-filter');
  const diffFilter = document.getElementById('exercise-difficulty-filter');
  const equipFilter = document.getElementById('exercise-equipment-filter');

  // Populate body part filter dropdown
  if (bpFilter) {
    bpFilter.innerHTML = '<option value="all">All Muscle Groups</option>' + 
      FIT_DATA.bodyParts.map(bp => `<option value="${bp.id}">${bp.name}</option>`).join('');
  }

  // Event listeners
  if (searchInput) searchInput.addEventListener('input', filterExercises);
  if (bpFilter) bpFilter.addEventListener('change', filterExercises);
  if (diffFilter) diffFilter.addEventListener('change', filterExercises);
  if (equipFilter) equipFilter.addEventListener('change', filterExercises);

  filterExercises();
}

function filterExercises() {
  const container = document.getElementById('exercises-grid');
  if (!container) return;

  const searchVal = (document.getElementById('exercise-search-input')?.value || '').toLowerCase().trim();
  const bpVal = document.getElementById('exercise-bodypart-filter')?.value || 'all';
  const diffVal = document.getElementById('exercise-difficulty-filter')?.value || 'all';
  const equipVal = document.getElementById('exercise-equipment-filter')?.value || 'all';

  const filtered = FIT_DATA.exercises.filter(ex => {
    const matchesSearch = !searchVal || 
      ex.name.toLowerCase().includes(searchVal) ||
      ex.bodyPartName.toLowerCase().includes(searchVal) ||
      ex.secondaryMuscles.some(m => m.toLowerCase().includes(searchVal)) ||
      ex.equipment.toLowerCase().includes(searchVal);

    const matchesBp = bpVal === 'all' || ex.bodyPart === bpVal;
    const matchesDiff = diffVal === 'all' || ex.difficulty.toLowerCase() === diffVal.toLowerCase();
    const matchesEquip = equipVal === 'all' || ex.equipment.toLowerCase().includes(equipVal.toLowerCase());

    return matchesSearch && matchesBp && matchesDiff && matchesEquip;
  });

  const countEl = document.getElementById('exercises-result-count');
  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${FIT_DATA.exercises.length} exercises`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8">
        <span class="text-4xl mb-3 block">🔍</span>
        <h4 class="text-lg font-bold text-slate-200">No exercises found</h4>
        <p class="text-slate-400 text-sm mt-1">Try adjusting your search terms or clearing some filters.</p>
        <button onclick="resetExerciseFilters()" class="mt-4 px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-sm hover:bg-emerald-500/30">
          Reset Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(ex => createExerciseCardHTML(ex)).join('');
  attachExerciseCardEvents(container);
}

function resetExerciseFilters() {
  const searchInput = document.getElementById('exercise-search-input');
  const bpFilter = document.getElementById('exercise-bodypart-filter');
  const diffFilter = document.getElementById('exercise-difficulty-filter');
  const equipFilter = document.getElementById('exercise-equipment-filter');
  if (searchInput) searchInput.value = '';
  if (bpFilter) bpFilter.value = 'all';
  if (diffFilter) diffFilter.value = 'all';
  if (equipFilter) equipFilter.value = 'all';
  filterExercises();
}


/* ==========================================================================
   Exercise Visual Photo Previews Mapping
   ========================================================================== */
const EXERCISE_PHOTO_MAP = {
  // Chest
  "push-ups": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80",
  "bench-press": "https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=700&auto=format&fit=crop&q=80",
  "incline-db-press": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700&auto=format&fit=crop&q=80",
  "cable-fly": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80",

  // Back
  "pull-ups": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80",
  "deadlift": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80",
  "lat-pulldown": "https://images.unsplash.com/photo-1584863231364-2edc166de576?w=700&auto=format&fit=crop&q=80",
  "cable-row": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",

  // Shoulders
  "overhead-press": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80",
  "lateral-raise": "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=700&auto=format&fit=crop&q=80",

  // Arms
  "barbell-bicep-curl": "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=700&auto=format&fit=crop&q=80",
  "preacher-curl": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&auto=format&fit=crop&q=80",
  "tricep-dips": "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=700&auto=format&fit=crop&q=80",
  "tricep-pushdown": "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=700&auto=format&fit=crop&q=80",
  "wrist-curls": "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=700&auto=format&fit=crop&q=80",

  // Core & Abs
  "plank": "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=700&auto=format&fit=crop&q=80",
  "hanging-leg-raise": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80",

  // Legs & Glutes
  "barbell-squat": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
  "leg-press": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&auto=format&fit=crop&q=80",
  "leg-curl": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=700&auto=format&fit=crop&q=80",
  "bulgarian-split-squat": "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=700&auto=format&fit=crop&q=80",
  "romanian-deadlift": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80",
  "standing-calf-raise": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
  "glute-bridge": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",

  // Height & Spine Posture
  "dead-hang": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80",
  "cobra-stretch": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
  "pelvic-bridge": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
  "skipping-rope": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
  "cat-cow-stretch": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
  "tadasana": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
  "pilates-roll-over": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
  "dryland-swimming": "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=700&auto=format&fit=crop&q=80",
  "forward-spine-stretch": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
  "inversion-traction": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80",
  "hanging-knee-tucks": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80",
  "wheel-pose": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",

  // Pregnancy Safe Workouts
  "pelvic-floor-kegel": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
  "prenatal-walking": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80",
  "prenatal-cat-cow": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
  "prenatal-wall-squats": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
  "side-lying-leg-lift": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
  "prenatal-butterfly-stretch": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80"
};

function getExercisePhoto(ex) {
  if (ex.photoUrl) return ex.photoUrl;
  if (EXERCISE_PHOTO_MAP[ex.id]) return EXERCISE_PHOTO_MAP[ex.id];
  const fallbacks = {
    chest: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&auto=format&fit=crop&q=80",
    back: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=700&auto=format&fit=crop&q=80",
    shoulders: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=700&auto=format&fit=crop&q=80",
    biceps: "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=700&auto=format&fit=crop&q=80",
    triceps: "https://images.unsplash.com/photo-1530822847156-5df684ec5ee1?w=700&auto=format&fit=crop&q=80",
    abs: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=700&auto=format&fit=crop&q=80",
    legs: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
    glutes: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
    calves: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
    height: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
    women: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80"
  };
  return fallbacks[ex.bodyPart] || "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80";
}

function createExerciseCardHTML(ex) {
  const isFav = AppState.favorites.exercises.includes(ex.id);
  const diffClass = ex.difficulty === 'Beginner' ? 'badge-beginner' : (ex.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced');
  const photo = getExercisePhoto(ex);
  
  return `
    <div class="fit-card flex flex-col justify-between overflow-hidden relative group cursor-pointer hover:border-emerald-500/60 hover:shadow-glow transition-all rounded-2xl" data-exercise-id="${ex.id}">
      
      <!-- Exercise Photo Preview -->
      <div class="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-700/60">
        <img src="${photo}" alt="${ex.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80';" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        
        <div class="absolute top-3 left-3">
          <span class="badge-tag ${diffClass}">${ex.difficulty}</span>
        </div>
        
        <div class="absolute top-3 right-3">
          <button class="fav-exercise-btn p-1.5 rounded-full bg-slate-900/80 backdrop-blur text-sm hover:scale-110 transition-transform shadow" data-id="${ex.id}" title="${isFav ? 'Remove from favorites' : 'Save to favorites'}">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        
        <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px]">
          <span class="bg-slate-900/85 px-2 py-0.5 rounded-md font-semibold text-emerald-400 border border-emerald-500/30 backdrop-blur">${ex.bodyPartName}</span>
          <span class="bg-slate-900/85 px-2 py-0.5 rounded-md font-medium text-slate-300 border border-slate-700/50 backdrop-blur">${ex.equipment}</span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors mb-1.5 line-clamp-1">
            ${ex.name}
          </h3>
          
          <p class="text-xs text-slate-300 line-clamp-2 mb-3 leading-relaxed">
            ${ex.instructions[0]}
          </p>
        </div>

        <div>
          <div class="text-xs text-slate-400 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/50 mb-3">
            <div class="flex justify-between mb-1">
              <span class="text-slate-400">Target Area:</span>
              <span class="font-medium text-slate-200">${ex.bodyPartName}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-400">Reps & Sets:</span>
              <span class="font-medium text-emerald-400">${ex.setsReps}</span>
            </div>
          </div>

          <button class="open-exercise-modal-btn w-full btn-primary text-xs justify-center py-2 rounded-xl" data-id="${ex.id}">
            View Full Form Guide ➔
          </button>
        </div>
      </div>
    </div>
  `;
}

function attachExerciseCardEvents(container) {
  // Clicking anywhere on the card opens the exercise guide
  container.querySelectorAll('[data-exercise-id]').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.fav-exercise-btn')) return;
      const id = card.getAttribute('data-exercise-id');
      if (id) openExerciseModal(id);
    });
  });

  container.querySelectorAll('.fav-exercise-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleFavoriteExercise(id);
    });
  });
}

function toggleFavoriteExercise(id) {
  const index = AppState.favorites.exercises.indexOf(id);
  const ex = FIT_DATA.exercises.find(e => e.id === id);
  if (index === -1) {
    AppState.favorites.exercises.push(id);
    showToast(`Added "${ex.name}" to Favorites! ❤️`);
  } else {
    AppState.favorites.exercises.splice(index, 1);
    showToast(`Removed "${ex.name}" from Favorites.`);
  }
  saveFavorites();
  filterExercises();
  renderFavoritesDrawer();
}

function openExerciseModal(id) {
  let ex = (FIT_DATA.exercises || []).find(e => e.id === id);
  if (!ex && FIT_DATA.womenHealth?.pregnancyCare?.safeExercises) {
    const pregEx = FIT_DATA.womenHealth.pregnancyCare.safeExercises.find(e => e.id === id);
    if (pregEx) {
      ex = {
        id: pregEx.id,
        name: pregEx.name,
        difficulty: "Beginner",
        bodyPart: "women",
        bodyPartName: "Pregnancy & Pelvic Health",
        equipment: "Bodyweight / Mat",
        photoUrl: pregEx.photoUrl,
        setsReps: "2 - 3 sets x 10 - 15 reps",
        restTime: "60 - 90s (Hydrate)",
        secondaryMuscles: ["Pelvic Floor", "Transverse Abdominis", "Gluteus Medius"],
        instructions: Array.isArray(pregEx.instructions) ? pregEx.instructions : [pregEx.instructions],
        benefits: pregEx.advantages || ["Supports pelvic floor and prevents gestational complications"],
        risks: pregEx.disadvantagesAndRisks || ["Discontinue immediately if experiencing dizziness, uterine contractions, or spotting"],
        mistakes: [
          "Holding breath (Valsalva maneuver) instead of steady continuous breathing",
          "Working past comfortable fatigue threshold"
        ],
        tips: "Keep water nearby, exercise in a cool room, and perform gentle movements smoothly."
      };
    }
  }
  if (!ex) return;

  const modal = document.getElementById('exercise-detail-modal');
  const content = document.getElementById('exercise-modal-content');
  if (!modal || !content) return;

  const isFav = AppState.favorites.exercises.includes(ex.id);
  const diffClass = ex.difficulty === 'Beginner' ? 'badge-beginner' : (ex.difficulty === 'Intermediate' ? 'badge-intermediate' : 'badge-advanced');

  const photo = getExercisePhoto(ex);
  content.innerHTML = `
    <!-- Modal Header with Photo Preview Banner -->
    <div class="relative h-56 sm:h-64 w-full overflow-hidden rounded-t-2xl bg-slate-950 border-b border-slate-700">
      <img src="${photo}" alt="${ex.name}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30"></div>
      
      <div class="absolute top-4 right-4 flex items-center gap-2 z-10">
        <button onclick="toggleFavoriteExercise('${ex.id}')" class="p-2 bg-slate-900/80 backdrop-blur hover:bg-slate-800 rounded-xl border border-slate-700 text-base transition-all cursor-pointer" title="Toggle Favorite">
          ${isFav ? '❤️' : '🤍'}
        </button>
        <button onclick="closeModal('exercise-detail-modal')" class="p-2 bg-slate-900/80 backdrop-blur hover:bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer">
          ✕
        </button>
      </div>

      <div class="absolute bottom-4 left-6 right-6">
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="badge-tag ${diffClass}">${ex.difficulty}</span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700 backdrop-blur">
            ${ex.equipment}
          </span>
          <span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur">
            ${ex.bodyPartName}
          </span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">${ex.name}</h2>
        <p class="text-xs text-slate-300 mt-1">
          Target & Synergist Muscles: <strong class="text-emerald-300">${ex.secondaryMuscles.join(', ')}</strong>
        </p>
      </div>
    </div>

    <!-- Modal Body -->
    <div class="p-6 space-y-6 text-sm">
      <!-- Quick Specs -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700">
        <div>
          <span class="text-xs text-slate-400 block">Sets & Reps</span>
          <span class="font-bold text-emerald-400">${ex.setsReps}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Rest Period</span>
          <span class="font-bold text-slate-200">${ex.restTime}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Primary Target</span>
          <span class="font-bold text-slate-200">${ex.bodyPartName}</span>
        </div>
        <div>
          <span class="text-xs text-slate-400 block">Equipment</span>
          <span class="font-bold text-slate-200">${ex.equipment}</span>
        </div>
      </div>

      <!-- Action Plan Quick Buttons -->
      <div class="flex flex-wrap gap-2">
        <button onclick="addExerciseToWorkoutPlan('${ex.id}')" class="btn-primary text-xs py-2">
          + Add to My Workout Routine
        </button>
        <button onclick="logExerciseAsCompleted('${ex.id}')" class="btn-orange text-xs py-2">
          ✓ Mark Completed Today
        </button>
      </div>

      <!-- Step by Step Instructions -->
      <div>
        <h3 class="text-base font-bold text-slate-100 flex items-center gap-2 mb-3">
          <span class="text-emerald-400">📋</span> Step-by-Step Execution
        </h3>
        <ol class="space-y-2 pl-4 list-decimal text-slate-300">
          ${ex.instructions.map(inst => `<li class="pl-1 leading-relaxed">${inst}</li>`).join('')}
        </ol>
      </div>

      <!-- Benefits & Risks Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Benefits -->
        <div class="bg-emerald-950/20 border border-emerald-800/40 p-4 rounded-xl">
          <h4 class="font-bold text-emerald-400 flex items-center gap-1.5 mb-2">
            <span>✨</span> Proven Benefits
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${ex.benefits.map(b => `<li class="flex items-start gap-2"><span>•</span><span>${b}</span></li>`).join('')}
          </ul>
        </div>

        <!-- Disadvantages / Risks -->
        <div class="bg-red-950/20 border border-red-800/40 p-4 rounded-xl">
          <h4 class="font-bold text-red-400 flex items-center gap-1.5 mb-2">
            <span>⚠️</span> Disadvantages & Potential Risks
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${ex.risks.map(r => `<li class="flex items-start gap-2"><span>•</span><span>${r}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Mistakes & Safety -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Common Mistakes -->
        <div class="bg-amber-950/20 border border-amber-800/40 p-4 rounded-xl">
          <h4 class="font-bold text-amber-400 flex items-center gap-1.5 mb-2">
            <span>❌</span> Common Form Mistakes
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${ex.commonMistakes.map(m => `<li class="flex items-start gap-2"><span>•</span><span>${m}</span></li>`).join('')}
          </ul>
        </div>

        <!-- Safety Precautions -->
        <div class="bg-blue-950/20 border border-blue-800/40 p-4 rounded-xl">
          <h4 class="font-bold text-blue-400 flex items-center gap-1.5 mb-2">
            <span>🛡️</span> Safety Precautions
          </h4>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${ex.safetyTips.map(s => `<li class="flex items-start gap-2"><span>•</span><span>${s}</span></li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Suitable Alternatives -->
      <div>
        <h4 class="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">Suitable Alternatives / Progressions:</h4>
        <div class="flex flex-wrap gap-2">
          ${ex.alternatives.map(alt => `
            <span class="px-3 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300">
              ${alt}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Recommended Recovery Foods -->
      <div class="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
        <h4 class="font-bold text-emerald-400 text-sm mb-2 flex items-center gap-2">
          <span>🥑</span> Recommended Foods for Post-Exercise Recovery:
        </h4>
        <p class="text-xs text-slate-400 mb-2">
          These foods support glycogen restoration, reduce muscle soreness, and stimulate muscle protein synthesis:
        </p>
        <div class="flex flex-wrap gap-2">
          ${ex.recoveryFoods.map(rf => `
            <span class="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-semibold">
              ${rf}
            </span>
          `).join('')}
        </div>
      </div>

      <!-- Medical Disclaimer Note -->
      <div class="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800 italic">
        <strong>Health Disclaimer:</strong> FitGuide exercise guides are purely educational. If you have any pre-existing joint, spinal, or cardiovascular issues, consult a physical therapist or certified coach before undertaking high-intensity resistance training.
      </div>
    </div>
  `;

  openModal('exercise-detail-modal');
}

function addExerciseToWorkoutPlan(id) {
  const ex = FIT_DATA.exercises.find(e => e.id === id);
  if (!ex) return;

  const exists = AppState.workoutList.some(item => item.id === id);
  if (exists) {
    showToast(`"${ex.name}" is already in your workout routine!`, 'info');
    return;
  }

  AppState.workoutList.push({
    id: ex.id,
    name: ex.name,
    setsReps: ex.setsReps,
    bodyPart: ex.bodyPartName,
    completed: false
  });

  saveWorkoutList();
  showToast(`Added "${ex.name}" to today's workout plan! 💪`);
}

function logExerciseAsCompleted(id) {
  const ex = FIT_DATA.exercises.find(e => e.id === id);
  if (!ex) return;

  const today = new Date().toISOString().split('T')[0];
  AppState.workoutHistory.unshift({
    id: 'hist_' + Date.now(),
    date: today,
    exerciseId: ex.id,
    exerciseName: ex.name,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  // Keep last 30 history items
  if (AppState.workoutHistory.length > 30) AppState.workoutHistory.pop();
  localStorage.setItem('fitguide_history', JSON.stringify(AppState.workoutHistory));
  
  showToast(`Great job! Completed "${ex.name}" logged to history! 🏆`);
  renderWorkoutHistoryUI();
}

/* ==========================================================================
   Food Database & Filtering
   ========================================================================== */
function initFoodsPage() {
  const searchInput = document.getElementById('food-search-input');
  const catFilter = document.getElementById('food-category-filter');
  const dietFilter = document.getElementById('food-dietary-filter');
  const useFilter = document.getElementById('food-bestuse-filter');

  // Populate categories
  if (catFilter) {
    const categories = [
      "High-protein foods", "Iron-rich foods", "Pulses/legumes", "Dairy", "Eggs", "Meat", "Fish", "Vegetables", "Fruits", "Nuts and seeds", "Whole grains"
    ];
    catFilter.innerHTML = '<option value="all">All Categories</option>' +
      categories.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  if (searchInput) searchInput.addEventListener('input', filterFoods);
  if (catFilter) catFilter.addEventListener('change', filterFoods);
  if (dietFilter) dietFilter.addEventListener('change', filterFoods);
  if (useFilter) useFilter.addEventListener('change', filterFoods);

  filterFoods();
}

function filterFoods() {
  const container = document.getElementById('foods-grid');
  if (!container) return;

  const searchVal = (document.getElementById('food-search-input')?.value || '').toLowerCase().trim();
  const catVal = document.getElementById('food-category-filter')?.value || 'all';
  const dietVal = document.getElementById('food-dietary-filter')?.value || 'all';
  const useVal = document.getElementById('food-bestuse-filter')?.value || 'all';

  const filtered = FIT_DATA.foods.filter(food => {
    const matchesSearch = !searchVal ||
      food.name.toLowerCase().includes(searchVal) ||
      (food.hindiName && food.hindiName.includes(searchVal)) ||
      food.category.toLowerCase().includes(searchVal) ||
      food.vitamins.some(v => v.toLowerCase().includes(searchVal));

    const matchesCat = catVal === 'all' || 
      food.category.toLowerCase() === catVal.toLowerCase() ||
      (catVal === 'High-protein foods' && food.protein >= 12) ||
      (catVal === 'Iron-rich foods' && food.iron >= 2.5);

    const matchesDiet = dietVal === 'all' || food.dietaryType.toLowerCase() === dietVal.toLowerCase();
    const matchesUse = useVal === 'all' || food.bestUse === useVal;

    return matchesSearch && matchesCat && matchesDiet && matchesUse;
  });

  const countEl = document.getElementById('foods-result-count');
  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${FIT_DATA.foods.length} nutritious foods`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/60 p-8">
        <span class="text-4xl mb-3 block">🥗</span>
        <h4 class="text-lg font-bold text-slate-200">No foods found</h4>
        <p class="text-slate-400 text-sm mt-1">Try adjusting your food search or selecting different dietary filters.</p>
        <button onclick="resetFoodFilters()" class="mt-4 px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-lg text-sm hover:bg-emerald-500/30">
          Reset Food Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(food => createFoodCardHTML(food)).join('');
  attachFoodCardEvents(container);
}

function resetFoodFilters() {
  const searchInput = document.getElementById('food-search-input');
  const catFilter = document.getElementById('food-category-filter');
  const dietFilter = document.getElementById('food-dietary-filter');
  const useFilter = document.getElementById('food-bestuse-filter');
  if (searchInput) searchInput.value = '';
  if (catFilter) catFilter.value = 'all';
  if (dietFilter) dietFilter.value = 'all';
  if (useFilter) useFilter.value = 'all';
  filterFoods();
}

function createFoodCardHTML(food) {
  const isFav = AppState.favorites.foods.includes(food.id);
  const dietBadge = food.dietaryType === 'Vegetarian' ? 'badge-veg' : (food.dietaryType === 'Vegan' ? 'badge-vegan' : 'badge-non-veg');

  return `
    <div class="fit-card flex flex-col justify-between overflow-hidden relative group p-5" data-food-id="${food.id}">
      <div>
        <!-- Badges Header -->
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex flex-wrap gap-1.5">
            <span class="badge-tag ${dietBadge}">${food.dietaryType}</span>
            <span class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              ${food.category}
            </span>
          </div>
          <button class="fav-food-btn text-lg p-1 text-slate-400 hover:text-red-500 transition-colors" data-id="${food.id}" title="${isFav ? 'Remove from favorites' : 'Save to favorites'}">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>

        <!-- Name & Indian Name -->
        <div class="mb-2">
          <h3 class="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-tight">
            ${food.name}
          </h3>
          ${food.hindiName ? `<span class="text-xs text-orange-400 font-medium">${food.hindiName}</span>` : ''}
        </div>

        <p class="text-xs text-slate-400 mb-3 leading-relaxed">
          ${food.description}
        </p>

        <!-- Nutrition Macro Bar Grid -->
        <div class="grid grid-cols-4 gap-2 text-center bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 mb-3">
          <div>
            <span class="text-[10px] text-slate-400 uppercase block">Calories</span>
            <span class="font-extrabold text-sm text-slate-100">${food.calories}</span>
            <span class="text-[9px] text-slate-400 block">kcal</span>
          </div>
          <div>
            <span class="text-[10px] text-emerald-400 uppercase font-semibold block">Protein</span>
            <span class="font-extrabold text-sm text-emerald-400">${food.protein}</span>
            <span class="text-[9px] text-slate-400 block">g</span>
          </div>
          <div>
            <span class="text-[10px] text-blue-400 uppercase font-semibold block">Carbs</span>
            <span class="font-extrabold text-sm text-blue-400">${food.carbs}</span>
            <span class="text-[9px] text-slate-400 block">g</span>
          </div>
          <div>
            <span class="text-[10px] text-amber-400 uppercase font-semibold block">Fat</span>
            <span class="font-extrabold text-sm text-amber-400">${food.fat}</span>
            <span class="text-[9px] text-slate-400 block">g</span>
          </div>
        </div>

        <!-- Iron & Vitamins Info -->
        <div class="text-xs text-slate-300 space-y-1.5 mb-4">
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">Serving Size:</span>
            <span class="font-semibold text-slate-200">${food.servingSize}</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-slate-400">Iron Content:</span>
            <span class="font-bold text-orange-400">${food.iron} mg</span>
          </div>
          <div class="pt-1">
            <span class="text-[11px] text-slate-400 block mb-1">Key Micronutrients:</span>
            <div class="flex flex-wrap gap-1">
              ${food.vitamins.map(v => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${v}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
        <span class="text-[11px] text-slate-400 truncate font-medium">
          🎯 ${food.bestUseLabel}
        </span>
        <button class="add-to-tracker-btn btn-primary text-xs py-1.5 px-2.5 whitespace-nowrap" data-id="${food.id}">
          + Log Serving
        </button>
      </div>
    </div>
  `;
}

function attachFoodCardEvents(container) {
  container.querySelectorAll('.fav-food-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      toggleFavoriteFood(id);
    });
  });

  container.querySelectorAll('.add-to-tracker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      addFoodToTracker(id);
    });
  });
}

function toggleFavoriteFood(id) {
  const index = AppState.favorites.foods.indexOf(id);
  const food = FIT_DATA.foods.find(f => f.id === id);
  if (index === -1) {
    AppState.favorites.foods.push(id);
    showToast(`Saved "${food.name}" to Favorites! ❤️`);
  } else {
    AppState.favorites.foods.splice(index, 1);
    showToast(`Removed "${food.name}" from Favorites.`);
  }
  saveFavorites();
  filterFoods();
  renderFavoritesDrawer();
}

function addFoodToTracker(id) {
  const food = FIT_DATA.foods.find(f => f.id === id);
  if (!food) return;

  AppState.dailyTracker.loggedCalories += Math.round(food.calories);
  AppState.dailyTracker.loggedProtein += parseFloat(food.protein);
  AppState.dailyTracker.loggedItems.unshift({
    id: 'item_' + Date.now(),
    name: food.name,
    serving: food.servingSize,
    calories: food.calories,
    protein: food.protein,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  saveDailyTracker();
  showToast(`Logged 1 serving of "${food.name}" (+${food.protein}g protein)! 🥗`);
}

/* ==========================================================================
   Nutrition Dashboard: Macronutrients & Micronutrients
   ========================================================================== */
function initNutritionPage() {
  renderMacronutrients();
  renderMicronutrients();
}

function renderMacronutrients() {
  const container = document.getElementById('macronutrients-grid');
  if (!container) return;

  container.innerHTML = FIT_DATA.macronutrients.map(macro => `
    <div class="fit-card p-6 flex flex-col justify-between">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xl font-bold text-slate-100">${macro.name}</h3>
          ${macro.caloriesPerGram ? `<span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">${macro.caloriesPerGram} kcal/g</span>` : ''}
        </div>
        <p class="text-xs font-semibold text-emerald-400 mb-2">${macro.role}</p>
        <p class="text-sm text-slate-300 leading-relaxed mb-4">${macro.whyImportant}</p>
        
        <div class="bg-slate-800/70 p-3.5 rounded-xl border border-slate-700/60 mb-4">
          <span class="text-xs font-bold text-slate-200 block mb-1">Recommended Requirement:</span>
          <span class="text-xs text-slate-300 leading-normal block">${macro.approximateNeed}</span>
        </div>
      </div>

      <div>
        <span class="text-xs font-semibold text-slate-400 block mb-1.5">Top Nutrient-Dense Sources:</span>
        <div class="flex flex-wrap gap-1.5">
          ${macro.richSources.map(s => `<span class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">${s}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

function renderMicronutrients() {
  const container = document.getElementById('micronutrients-grid');
  if (!container) return;

  container.innerHTML = FIT_DATA.micronutrients.map(micro => `
    <div class="fit-card p-6 flex flex-col justify-between" id="micro-${micro.id}">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs uppercase tracking-wider font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/30">
            ${micro.type}
          </span>
          <span class="text-xs text-slate-400">Essential Micronutrient</span>
        </div>

        <h3 class="text-xl font-bold text-slate-100 mb-2">${micro.name}</h3>
        <p class="text-sm text-slate-300 mb-3 leading-relaxed">${micro.whatItDoes}</p>
        
        <div class="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/70 space-y-2 mb-4 text-xs">
          <div>
            <span class="text-slate-400 block font-semibold">Why Important for Fitness & Health:</span>
            <span class="text-slate-200">${micro.whyImportant}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-semibold">Approx. Daily Requirement:</span>
            <span class="text-emerald-400 font-bold">${micro.approxRequirement}</span>
          </div>
          <div>
            <span class="text-red-400 block font-semibold">Inadequate Intake / Deficiency Consequences:</span>
            <span class="text-slate-300">${micro.deficiencyConsequences}</span>
          </div>
        </div>

        <div class="bg-amber-950/20 border border-amber-800/40 p-3 rounded-lg text-xs text-amber-200/90 mb-4">
          <strong>Individual Variations:</strong> ${micro.variationsNote}
        </div>
      </div>

      <div>
        <span class="text-xs font-semibold text-slate-400 block mb-1.5">Top Food Sources:</span>
        <div class="flex flex-wrap gap-1.5">
          ${micro.foodSources.map(src => `<span class="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">${src}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Protein / Vitamin / Iron Explorer
   ========================================================================== */
function initExplorerPage() {
  document.querySelectorAll('.explorer-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-explorer-tab');
      switchExplorerTab(tab);
    });
  });

  renderProteinRanking();
  renderIronExplorer();
  renderVitaminSelector();
}

function switchExplorerTab(tab) {
  document.querySelectorAll('.explorer-tab-btn').forEach(b => {
    if (b.getAttribute('data-explorer-tab') === tab) {
      b.classList.add('bg-emerald-500', 'text-slate-950', 'font-bold');
      b.classList.remove('bg-slate-800', 'text-slate-300');
    } else {
      b.classList.remove('bg-emerald-500', 'text-slate-950', 'font-bold');
      b.classList.add('bg-slate-800', 'text-slate-300');
    }
  });

  document.querySelectorAll('.explorer-view').forEach(v => v.classList.add('hidden'));
  const activeView = document.getElementById(`explorer-view-${tab}`);
  if (activeView) activeView.classList.remove('hidden');
}

function renderProteinRanking() {
  const container = document.getElementById('protein-ranking-list');
  if (!container) return;

  // Sort foods by protein content descending
  const sorted = [...FIT_DATA.foods].sort((a, b) => b.protein - a.protein);
  const maxProtein = sorted[0].protein;

  container.innerHTML = sorted.map((food, idx) => {
    const percent = Math.round((food.protein / maxProtein) * 100);
    return `
      <div class="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 hover:border-emerald-500/50 transition-all">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <span class="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${idx < 3 ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'}">
              ${idx + 1}
            </span>
            <div>
              <span class="font-bold text-slate-100 text-sm">${food.name}</span>
              <span class="text-xs text-slate-400 block">Serving: ${food.servingSize} • ${food.dietaryType}</span>
            </div>
          </div>
          <div class="text-right">
            <span class="font-extrabold text-emerald-400 text-base">${food.protein} g</span>
            <span class="text-xs text-slate-400 block">${food.calories} kcal</span>
          </div>
        </div>
        
        <!-- Progress Bar comparison -->
        <div class="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
          <div class="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500" style="width: ${percent}%;"></div>
        </div>
      </div>
    `;
  }).join('');
}

function renderIronExplorer() {
  const container = document.getElementById('iron-foods-list');
  if (!container) return;

  // Filter high iron foods (> 1.5mg)
  const ironFoods = [...FIT_DATA.foods].filter(f => f.iron >= 1.5).sort((a, b) => b.iron - a.iron);

  container.innerHTML = ironFoods.map(food => `
    <div class="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-between">
      <div>
        <h4 class="font-bold text-slate-100 text-sm">${food.name}</h4>
        <span class="text-xs text-slate-400">${food.servingSize} • ${food.dietaryType}</span>
      </div>
      <div class="text-right">
        <span class="font-extrabold text-orange-400 text-base">${food.iron} mg</span>
        <span class="text-[10px] text-slate-400 block">Iron</span>
      </div>
    </div>
  `).join('');
}

function renderVitaminSelector() {
  const selectorContainer = document.getElementById('vitamin-buttons-bar');
  const detailsContainer = document.getElementById('selected-vitamin-display');
  if (!selectorContainer || !detailsContainer) return;

  const vitaminsList = FIT_DATA.micronutrients.filter(m => m.type.includes('Vitamin'));

  selectorContainer.innerHTML = vitaminsList.map((v, i) => `
    <button class="vit-select-btn px-4 py-2 rounded-lg text-xs font-bold border border-slate-700 ${i === 0 ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'} transition-all cursor-pointer"
      data-vit-id="${v.id}">
      ${v.name.split(' ')[0]} ${v.name.split(' ')[1] || ''}
    </button>
  `).join('');

  selectorContainer.querySelectorAll('.vit-select-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectorContainer.querySelectorAll('.vit-select-btn').forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-slate-950');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('bg-emerald-500', 'text-slate-950');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const vitId = btn.getAttribute('data-vit-id');
      displayVitaminDetails(vitId);
    });
  });

  if (vitaminsList.length > 0) {
    displayVitaminDetails(vitaminsList[0].id);
  }
}

function displayVitaminDetails(vitId) {
  const v = FIT_DATA.micronutrients.find(m => m.id === vitId);
  const container = document.getElementById('selected-vitamin-display');
  if (!v || !container) return;

  container.innerHTML = `
    <div class="fit-card p-6">
      <div class="flex items-center justify-between mb-3">
        <span class="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          ${v.type}
        </span>
        <span class="text-xs text-slate-400">Daily Rec: <strong class="text-slate-200">${v.approxRequirement}</strong></span>
      </div>

      <h3 class="text-2xl font-extrabold text-white mb-2">${v.name}</h3>
      <p class="text-sm text-slate-300 leading-relaxed mb-4">${v.whatItDoes}</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
          <h4 class="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">💪 Athletic Importance:</h4>
          <p class="text-xs text-slate-300">${v.whyImportant}</p>
        </div>

        <div class="bg-red-950/20 p-4 rounded-xl border border-red-800/40">
          <h4 class="font-bold text-red-400 text-xs uppercase tracking-wider mb-2">⚠️ Deficiency Symptoms:</h4>
          <p class="text-xs text-slate-300">${v.deficiencyConsequences}</p>
        </div>
      </div>

      <div class="bg-slate-800/70 p-4 rounded-xl border border-slate-700 mb-4">
        <h4 class="font-bold text-slate-200 text-xs uppercase tracking-wider mb-2">🥗 Best Food Sources:</h4>
        <div class="flex flex-wrap gap-2">
          ${v.foodSources.map(s => `<span class="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-200 border border-slate-700">${s}</span>`).join('')}
        </div>
      </div>

      <div class="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-xs text-amber-300/90">
        <strong>Important Considerations:</strong> ${v.variationsNote}
      </div>
    </div>
  `;
}

/* ==========================================================================
   "What Should I Eat?" Tool
   ========================================================================== */
function initMealTool() {
  const generateBtn = document.getElementById('generate-meal-plan-btn');
  if (generateBtn) {
    generateBtn.addEventListener('click', generateMealRecommendations);
  }

  // Pre-generate with defaults
  generateMealRecommendations();
}

function generateMealRecommendations() {
  const goalSelect = document.getElementById('meal-goal-select');
  const dietSelect = document.getElementById('meal-diet-select');
  const outputContainer = document.getElementById('meal-plan-output');
  if (!goalSelect || !dietSelect || !outputContainer) return;

  const goal = goalSelect.value;
  const diet = dietSelect.value;

  const goalData = FIT_DATA.mealRecommendations[goal];
  if (!goalData) return;

  const plan = goalData.plans[diet];
  if (!plan) return;

  outputContainer.innerHTML = `
    <div class="fit-card p-6 md:p-8 space-y-6">
      <div class="border-b border-slate-700 pb-5">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h3 class="text-2xl font-extrabold text-white">${goalData.title}</h3>
          <span class="badge-tag bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            ${diet.toUpperCase()}
          </span>
        </div>
        <p class="text-sm text-slate-300 mb-3">${goalData.focus}</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-800/60 p-3 rounded-xl border border-slate-700">
          <div>
            <span class="text-slate-400 block font-semibold">Target Caloric Delta:</span>
            <span class="font-bold text-emerald-400">${goalData.caloricSurplus}</span>
          </div>
          <div>
            <span class="text-slate-400 block font-semibold">Recommended Daily Protein:</span>
            <span class="font-bold text-slate-200">${goalData.proteinTarget}</span>
          </div>
        </div>
      </div>

      <!-- Meal Schedule Grid -->
      <div class="space-y-4">
        <h4 class="font-bold text-slate-100 text-base flex items-center gap-2">
          <span>🍽️</span> Full-Day Sample Eating Blueprint
        </h4>

        <!-- Breakfast -->
        <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div class="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-1">
            <span>🌅</span> Breakfast:
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${plan.breakfast}</p>
        </div>

        <!-- Pre Workout -->
        <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div class="flex items-center gap-2 font-bold text-orange-400 text-sm mb-1">
            <span>⚡</span> Pre-Workout Fuel (60-90 min before):
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${plan.preWorkout}</p>
        </div>

        <!-- Post Workout -->
        <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div class="flex items-center gap-2 font-bold text-blue-400 text-sm mb-1">
            <span>🥤</span> Post-Workout Recovery Window:
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${plan.postWorkout}</p>
        </div>

        <!-- Lunch -->
        <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div class="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-1">
            <span>☀️</span> Wholesome Lunch:
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${plan.lunch}</p>
        </div>

        <!-- Snack -->
        <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div class="flex items-center gap-2 font-bold text-amber-400 text-sm mb-1">
            <span>🥜</span> Afternoon Snack & Hydration:
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${plan.snack}</p>
        </div>

        <!-- Dinner -->
        <div class="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
          <div class="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-1">
            <span>🌙</span> Restorative Dinner:
          </div>
          <p class="text-xs text-slate-200 leading-relaxed">${plan.dinner}</p>
        </div>
      </div>

      <!-- Safe Nutrition Guarantee Alert -->
      <div class="p-4 bg-emerald-950/20 border border-emerald-800/40 rounded-xl text-xs text-slate-300">
        <strong class="text-emerald-400">FitGuide Healthy Eating Principle:</strong> We do not provide extreme crash diets, 500-calorie cleanses, or dangerous dehydrating fasts. Sustainable progress is built on balanced whole foods, adequate protein, unrefined carbohydrates, and nourishing fats.
      </div>
    </div>
  `;
}

/* ==========================================================================
   Daily Nutrition & TDEE Calculator
   ========================================================================== */
function initCalculator() {
  const calcBtn = document.getElementById('calculate-nutrition-btn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculateDailyNutrition);
  }

  // Pre-calculate with sample values
  calculateDailyNutrition();
}

function calculateDailyNutrition() {
  const age = parseInt(document.getElementById('calc-age')?.value) || 25;
  const sex = document.getElementById('calc-sex')?.value || 'male';
  const height = parseFloat(document.getElementById('calc-height')?.value) || 175;
  const weight = parseFloat(document.getElementById('calc-weight')?.value) || 70;
  const activity = parseFloat(document.getElementById('calc-activity')?.value) || 1.55;
  const goal = document.getElementById('calc-goal')?.value || 'muscle-gain';

  // Mifflin-St Jeor Formula for BMR
  let bmr = 0;
  if (sex === 'male') {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  // TDEE = BMR * Activity multiplier
  const tdee = Math.round(bmr * activity);

  // Target Calories based on Goal
  let targetCalories = tdee;
  let proteinPerKg = 1.6;

  if (goal === 'fat-loss') {
    targetCalories = Math.max(1200, Math.round(tdee - 450)); // Moderate sustainable deficit
    proteinPerKg = 2.2; // Higher protein to preserve lean muscle in deficit
  } else if (goal === 'muscle-gain') {
    targetCalories = Math.round(tdee + 350); // Lean caloric surplus
    proteinPerKg = 2.0;
  } else if (goal === 'strength') {
    targetCalories = Math.round(tdee + 200);
    proteinPerKg = 1.9;
  } else if (goal === 'endurance') {
    targetCalories = Math.round(tdee + 250);
    proteinPerKg = 1.5;
  } else {
    // maintenance
    targetCalories = tdee;
    proteinPerKg = 1.6;
  }

  // Macronutrient calculation
  const targetProteinGrams = Math.round(weight * proteinPerKg);
  const proteinCalories = targetProteinGrams * 4;

  // Fat: 25% of target calories
  const fatCalories = Math.round(targetCalories * 0.25);
  const targetFatGrams = Math.round(fatCalories / 9);

  // Carbs: Remaining calories
  const carbCalories = Math.max(0, targetCalories - (proteinCalories + fatCalories));
  const targetCarbGrams = Math.round(carbCalories / 4);

  // Water Requirement estimate (ml)
  const waterLiters = ((weight * 35) / 1000).toFixed(1);

  // Render Output UI
  const outputContainer = document.getElementById('calculator-results-container');
  if (outputContainer) {
    outputContainer.innerHTML = `
      <div class="fit-card p-6 md:p-8 space-y-6">
        <div class="border-b border-slate-700 pb-5">
          <span class="text-xs uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Personalized Scientific Estimate
          </span>
          <h3 class="text-2xl font-extrabold text-white mt-2">Your Daily Nutrition Target</h3>
          <p class="text-xs text-slate-400 mt-1">
            Calculated via Mifflin-St Jeor BMR & ISSN Sports Nutrition guidelines.
          </p>
        </div>

        <!-- Big Numbers Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span class="text-xs text-slate-400 block mb-1">Estimated BMR</span>
            <span class="text-2xl font-extrabold text-slate-100">${Math.round(bmr)}</span>
            <span class="text-xs text-slate-400 block">kcal/day</span>
          </div>

          <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span class="text-xs text-slate-400 block mb-1">Maintenance TDEE</span>
            <span class="text-2xl font-extrabold text-slate-100">${tdee}</span>
            <span class="text-xs text-slate-400 block">kcal/day</span>
          </div>

          <div class="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40">
            <span class="text-xs text-emerald-400 font-bold block mb-1">Target Calories</span>
            <span class="text-3xl font-extrabold text-emerald-400">${targetCalories}</span>
            <span class="text-xs text-emerald-300 block">kcal/day</span>
          </div>

          <div class="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
            <span class="text-xs text-blue-400 font-bold block mb-1">Water Hydration</span>
            <span class="text-2xl font-extrabold text-blue-400">${waterLiters}</span>
            <span class="text-xs text-slate-400 block">Liters/day</span>
          </div>
        </div>

        <!-- Macronutrient Target Split -->
        <div>
          <h4 class="font-bold text-slate-200 text-sm mb-3">Target Macronutrient Distribution:</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <!-- Protein -->
            <div class="p-4 rounded-xl bg-slate-800/70 border border-emerald-500/40">
              <span class="text-xs font-semibold text-emerald-400 uppercase block">Protein (${proteinPerKg}g/kg)</span>
              <span class="text-2xl font-extrabold text-emerald-400 my-1 block">${targetProteinGrams} g</span>
              <span class="text-xs text-slate-400">${proteinCalories} kcal (${Math.round((proteinCalories / targetCalories) * 100)}%)</span>
            </div>

            <!-- Carbohydrates -->
            <div class="p-4 rounded-xl bg-slate-800/70 border border-blue-500/40">
              <span class="text-xs font-semibold text-blue-400 uppercase block">Carbohydrates Range</span>
              <span class="text-2xl font-extrabold text-blue-400 my-1 block">${targetCarbGrams} g</span>
              <span class="text-xs text-slate-400">${carbCalories} kcal (${Math.round((carbCalories / targetCalories) * 100)}%)</span>
            </div>

            <!-- Healthy Fats -->
            <div class="p-4 rounded-xl bg-slate-800/70 border border-amber-500/40">
              <span class="text-xs font-semibold text-amber-400 uppercase block">Healthy Fats Range</span>
              <span class="text-2xl font-extrabold text-amber-400 my-1 block">${targetFatGrams} g</span>
              <span class="text-xs text-slate-400">${fatCalories} kcal (${Math.round((fatCalories / targetCalories) * 100)}%)</span>
            </div>
          </div>
        </div>

        <!-- General Recommended Micronutrient Guidelines for Reference -->
        <div class="bg-slate-800/60 p-4 rounded-xl border border-slate-700 text-xs space-y-2">
          <span class="font-bold text-slate-200 block text-sm">General Recognized Micronutrient Reference Ranges:</span>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300">
            <div>• Iron: <strong class="text-orange-400">${sex === 'female' ? '18 mg' : '8-11 mg'}</strong></div>
            <div>• Vitamin D3: <strong class="text-amber-400">600-1000 IU</strong></div>
            <div>• Vitamin B12: <strong class="text-emerald-400">2.4 mcg</strong></div>
            <div>• Vitamin C: <strong class="text-emerald-400">75-90 mg</strong></div>
            <div>• Calcium: <strong class="text-slate-200">1000 mg</strong></div>
            <div>• Magnesium: <strong class="text-slate-200">${sex === 'female' ? '310 mg' : '400 mg'}</strong></div>
            <div>• Zinc: <strong class="text-blue-400">${sex === 'female' ? '8 mg' : '11 mg'}</strong></div>
            <div>• Vitamin A: <strong class="text-amber-400">${sex === 'female' ? '700 mcg' : '900 mcg'}</strong></div>
          </div>
          <p class="text-[11px] text-slate-400 italic pt-1">
            *Note: Nutritional requirements vary substantially between individuals based on physiology, climate, and medical history. These values represent general recognized dietary guidelines rather than specific individual medical prescriptions.
          </p>
        </div>

        <!-- Apply to Daily Tracker Button -->
        <div class="flex items-center justify-between pt-2">
          <button onclick="applyCalculatedGoalsToTracker(${targetCalories}, ${targetProteinGrams})" class="btn-primary text-xs py-2.5 px-4">
            🚀 Apply These Targets to My Daily Tracker
          </button>
        </div>
      </div>
    `;
  }
}

function applyCalculatedGoalsToTracker(calories, protein) {
  AppState.dailyTracker.targetCalories = calories;
  AppState.dailyTracker.targetProtein = protein;
  saveDailyTracker();
  showToast(`Updated daily tracker targets: ${calories} kcal & ${protein}g protein! 🎯`);
  navigateToTab('tracker');
}

/* ==========================================================================
   User Features: Daily Nutrition Tracker, Water Tracker & Workout Planner
   ========================================================================== */
function initTrackerAndWorkoutUI() {
  renderDailyTrackerUI();
  renderWorkoutListUI();
  renderWorkoutHistoryUI();
  renderFavoritesDrawer();

  // Water buttons
  const addWaterBtn = document.getElementById('add-water-btn');
  const removeWaterBtn = document.getElementById('remove-water-btn');

  if (addWaterBtn) {
    addWaterBtn.addEventListener('click', () => {
      AppState.dailyTracker.waterGlasses = Math.min(20, AppState.dailyTracker.waterGlasses + 1);
      saveDailyTracker();
      showToast(`Logged +1 glass of water (250 ml)! 💧`);
    });
  }

  if (removeWaterBtn) {
    removeWaterBtn.addEventListener('click', () => {
      AppState.dailyTracker.waterGlasses = Math.max(0, AppState.dailyTracker.waterGlasses - 1);
      saveDailyTracker();
    });
  }

  // Quick manual protein/calorie logger
  const quickLogBtn = document.getElementById('quick-log-entry-btn');
  if (quickLogBtn) {
    quickLogBtn.addEventListener('click', () => {
      const name = document.getElementById('quick-log-name')?.value.trim() || 'Custom Meal';
      const cals = parseInt(document.getElementById('quick-log-cals')?.value) || 0;
      const prot = parseFloat(document.getElementById('quick-log-prot')?.value) || 0;

      if (cals <= 0 && prot <= 0) {
        showToast('Please enter calories or protein to log', 'info');
        return;
      }

      AppState.dailyTracker.loggedCalories += cals;
      AppState.dailyTracker.loggedProtein += prot;
      AppState.dailyTracker.loggedItems.unshift({
        id: 'item_' + Date.now(),
        name: name,
        serving: '1 serving',
        calories: cals,
        protein: prot,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      // Reset inputs
      if (document.getElementById('quick-log-name')) document.getElementById('quick-log-name').value = '';
      if (document.getElementById('quick-log-cals')) document.getElementById('quick-log-cals').value = '';
      if (document.getElementById('quick-log-prot')) document.getElementById('quick-log-prot').value = '';

      saveDailyTracker();
      showToast(`Logged "${name}" (+${prot}g protein, +${cals} kcal)!`);
    });
  }
}

function renderDailyTrackerUI() {
  const { loggedCalories, targetCalories, loggedProtein, targetProtein, waterGlasses, loggedItems } = AppState.dailyTracker;

  // Calorie & Protein progress percentages
  const calPercent = Math.min(100, Math.round((loggedCalories / (targetCalories || 2000)) * 100));
  const protPercent = Math.min(100, Math.round((loggedProtein / (targetProtein || 140)) * 100));

  // Update numbers
  const curCalEl = document.getElementById('tracker-current-calories');
  const tarCalEl = document.getElementById('tracker-target-calories');
  const barCalEl = document.getElementById('tracker-calories-bar');

  if (curCalEl) curCalEl.textContent = loggedCalories;
  if (tarCalEl) tarCalEl.textContent = targetCalories;
  if (barCalEl) barCalEl.style.width = `${calPercent}%`;

  const curProtEl = document.getElementById('tracker-current-protein');
  const tarProtEl = document.getElementById('tracker-target-protein');
  const barProtEl = document.getElementById('tracker-protein-bar');

  if (curProtEl) curProtEl.textContent = loggedProtein.toFixed(1);
  if (tarProtEl) tarProtEl.textContent = targetProtein;
  if (barProtEl) barProtEl.style.width = `${protPercent}%`;

  // Water Glass Visuals (target = 10 glasses = 2.5L)
  const waterFillEl = document.getElementById('water-visual-fill');
  const waterCountEl = document.getElementById('water-count-display');
  const waterLitersEl = document.getElementById('water-liters-display');

  const waterPercent = Math.min(100, Math.round((waterGlasses / 10) * 100));
  if (waterFillEl) waterFillEl.style.height = `${waterPercent}%`;
  if (waterCountEl) waterCountEl.textContent = `${waterGlasses} / 10 glasses`;
  if (waterLitersEl) waterLitersEl.textContent = `${(waterGlasses * 0.25).toFixed(2)} Liters`;

  // Logged items list
  const listContainer = document.getElementById('tracker-logged-items-list');
  if (listContainer) {
    if (loggedItems.length === 0) {
      listContainer.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">No foods logged yet today. Use the Food Database or Quick Log above!</div>`;
    } else {
      listContainer.innerHTML = loggedItems.map(item => `
        <div class="p-3 bg-slate-800/80 rounded-lg border border-slate-700/60 flex items-center justify-between text-xs">
          <div>
            <span class="font-bold text-slate-100 block">${item.name}</span>
            <span class="text-slate-400">${item.serving} • logged at ${item.time}</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="text-right">
              <span class="font-extrabold text-emerald-400 block">${item.protein} g prot</span>
              <span class="text-slate-400">${item.calories} kcal</span>
            </div>
            <button onclick="removeLoggedItem('${item.id}')" class="text-slate-500 hover:text-red-400 p-1 text-sm" title="Remove Item">
              ✕
            </button>
          </div>
        </div>
      `).join('');
    }
  }
}

function removeLoggedItem(itemId) {
  const itemIndex = AppState.dailyTracker.loggedItems.findIndex(i => i.id === itemId);
  if (itemIndex > -1) {
    const item = AppState.dailyTracker.loggedItems[itemIndex];
    AppState.dailyTracker.loggedCalories = Math.max(0, AppState.dailyTracker.loggedCalories - Math.round(item.calories));
    AppState.dailyTracker.loggedProtein = Math.max(0, AppState.dailyTracker.loggedProtein - item.protein);
    AppState.dailyTracker.loggedItems.splice(itemIndex, 1);
    saveDailyTracker();
    showToast(`Removed "${item.name}" from daily log`);
  }
}

function renderWorkoutListUI() {
  const container = document.getElementById('user-workout-routine-list');
  if (!container) return;

  if (AppState.workoutList.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center text-slate-400 bg-slate-800/40 rounded-xl border border-slate-700/50">
        <span class="text-3xl mb-2 block">🏋️</span>
        <h4 class="font-bold text-slate-300">Your routine is empty</h4>
        <p class="text-xs text-slate-400 mt-1">Browse the Exercise database and click "+ Add to My Workout Routine" to assemble your workout session.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = AppState.workoutList.map((item, idx) => `
    <div class="p-4 bg-slate-800/80 rounded-xl border ${item.completed ? 'border-emerald-500/50 bg-emerald-950/10' : 'border-slate-700/60'} flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleWorkoutItemCompleted(${idx})" class="w-5 h-5 accent-emerald-500 rounded cursor-pointer" />
        <div>
          <h4 class="font-bold text-sm ${item.completed ? 'line-through text-slate-400' : 'text-slate-100'}">${item.name}</h4>
          <span class="text-xs text-slate-400">${item.bodyPart} • ${item.setsReps}</span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="logExerciseAsCompleted('${item.id}')" class="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/30">
          Finish Drill
        </button>
        <button onclick="removeExerciseFromWorkout(${idx})" class="text-slate-500 hover:text-red-400 p-1" title="Remove from routine">
          ✕
        </button>
      </div>
    </div>
  `).join('');
}

function toggleWorkoutItemCompleted(index) {
  if (AppState.workoutList[index]) {
    AppState.workoutList[index].completed = !AppState.workoutList[index].completed;
    saveWorkoutList();
  }
}

function removeExerciseFromWorkout(index) {
  AppState.workoutList.splice(index, 1);
  saveWorkoutList();
  showToast('Removed exercise from routine');
}

function renderWorkoutHistoryUI() {
  const container = document.getElementById('workout-history-list');
  if (!container) return;

  if (AppState.workoutHistory.length === 0) {
    container.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">No workout sessions completed yet. Mark exercises complete to build your history!</div>`;
    return;
  }

  container.innerHTML = AppState.workoutHistory.slice(0, 10).map(hist => `
    <div class="p-3 bg-slate-800/60 rounded-lg border border-slate-700/50 flex items-center justify-between text-xs">
      <div class="flex items-center gap-2">
        <span class="text-emerald-400 font-bold">✓</span>
        <span class="font-semibold text-slate-200">${hist.exerciseName}</span>
      </div>
      <span class="text-slate-400">${hist.date} at ${hist.timestamp}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   Favorites Drawer
   ========================================================================== */
function renderFavoritesDrawer() {
  const exList = document.getElementById('favorites-exercises-list');
  const foodList = document.getElementById('favorites-foods-list');

  if (exList) {
    const favExercises = FIT_DATA.exercises.filter(e => AppState.favorites.exercises.includes(e.id));
    if (favExercises.length === 0) {
      exList.innerHTML = `<div class="text-xs text-slate-400 p-3">No favorite exercises saved yet. Click the heart icon on any exercise card!</div>`;
    } else {
      exList.innerHTML = favExercises.map(ex => `
        <div class="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
          <div>
            <h5 class="font-bold text-xs text-slate-100">${ex.name}</h5>
            <span class="text-[11px] text-slate-400">${ex.bodyPartName} • ${ex.difficulty}</span>
          </div>
          <button onclick="openExerciseModal('${ex.id}'); closeModal('favorites-modal');" class="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
            View
          </button>
        </div>
      `).join('');
    }
  }

  if (foodList) {
    const favFoods = FIT_DATA.foods.filter(f => AppState.favorites.foods.includes(f.id));
    if (favFoods.length === 0) {
      foodList.innerHTML = `<div class="text-xs text-slate-400 p-3">No favorite foods saved yet. Click the heart icon on any food card!</div>`;
    } else {
      foodList.innerHTML = favFoods.map(f => `
        <div class="p-3 rounded-lg bg-slate-800/80 border border-slate-700 flex items-center justify-between">
          <div>
            <h5 class="font-bold text-xs text-slate-100">${f.name}</h5>
            <span class="text-[11px] text-slate-400">${f.protein}g protein • ${f.calories} kcal</span>
          </div>
          <button onclick="addFoodToTracker('${f.id}')" class="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">
            + Log
          </button>
        </div>
      `).join('');
    }
  }

  updateFavoriteBadges();
}

function updateFavoriteBadges() {
  const total = AppState.favorites.exercises.length + AppState.favorites.foods.length;
  const badge = document.getElementById('fav-count-badge');
  if (badge) {
    badge.textContent = total;
    badge.style.display = total > 0 ? 'inline-flex' : 'none';
  }
}

/* ==========================================================================
   Global Search
   ========================================================================== */
function initGlobalSearch() {
  const homeInput = document.getElementById('home-search-input');
  const homeResults = document.getElementById('home-search-results');

  const globalSearchModal = document.getElementById('global-search-modal');
  const modalInput = document.getElementById('modal-search-input');
  const modalResults = document.getElementById('modal-search-results');

  // Keyboard shortcut Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openModal('global-search-modal');
      setTimeout(() => modalInput?.focus(), 100);
    }
  });

  if (homeInput && homeResults) {
    homeInput.addEventListener('input', () => {
      const q = homeInput.value.trim().toLowerCase();
      renderSearchResults(q, homeResults, true);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!homeInput.contains(e.target) && !homeResults.contains(e.target)) {
        homeResults.classList.add('hidden');
      }
    });
  }

  if (modalInput && modalResults) {
    modalInput.addEventListener('input', () => {
      const q = modalInput.value.trim().toLowerCase();
      renderSearchResults(q, modalResults, false);
    });
  }
}

function renderSearchResults(query, container, isHome = false) {
  if (!query || query.length < 2) {
    container.classList.add('hidden');
    container.innerHTML = '';
    return;
  }

  // Search across exercises, foods, body parts, nutrients, and gyms
  const matchingExercises = FIT_DATA.exercises.filter(e => 
    e.name.toLowerCase().includes(query) || 
    e.bodyPartName.toLowerCase().includes(query) ||
    e.secondaryMuscles.some(m => m.toLowerCase().includes(query))
  ).slice(0, 4);

  const matchingFoods = FIT_DATA.foods.filter(f => 
    f.name.toLowerCase().includes(query) || 
    (f.hindiName && f.hindiName.includes(query)) ||
    f.category.toLowerCase().includes(query)
  ).slice(0, 4);

  const matchingNutrients = FIT_DATA.micronutrients.filter(n =>
    n.name.toLowerCase().includes(query)
  ).slice(0, 2);

  // Search gyms (e.g. U Fit, Sheelanagar, Cult, Steel Plant)
  const normQuery = query.toLowerCase().replace(/[^a-z0-9]/g, '');
  const matchingGyms = (FIT_DATA.gyms || []).filter(g => {
    const normName = g.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normArea = g.area.toLowerCase().replace(/[^a-z0-9]/g, '');
    const normCity = g.city.toLowerCase().replace(/[^a-z0-9]/g, '');
    return normName.includes(normQuery) || 
           normArea.includes(normQuery) || 
           normCity.includes(normQuery) ||
           (g.altNames && g.altNames.some(alt => alt.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normQuery)));
  }).slice(0, 3);

  const isHeightQuery = ['height', 'grow', 'taller', 'posture', 'spine', 'growth', 'hang', 'cobra', 'decompress'].some(k => query.toLowerCase().includes(k));

  const totalResults = matchingExercises.length + matchingFoods.length + matchingNutrients.length + matchingGyms.length + (isHeightQuery ? 1 : 0);

  if (totalResults === 0) {
    container.innerHTML = `<div class="p-4 text-center text-xs text-slate-400">No matches found for "${query}". Try searching for Height, U Fit, Sheelanagar, push-ups, paneer, or iron.</div>`;
    container.classList.remove('hidden');
    return;
  }

  let html = '<div class="p-2 space-y-2">';

  // Height Guide Recommendation
  if (isHeightQuery) {
    html += `
      <div class="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors border border-teal-500/40 bg-teal-950/30 mb-2"
        onclick="closeModal('global-search-modal'); if(document.getElementById('home-search-results')) document.getElementById('home-search-results').classList.add('hidden'); navigateToTab('height');">
        <div>
          <span class="font-bold text-white text-sm block flex items-center gap-1.5">
            <span>📏</span> Height Growth, Posture & Spinal Decompression Guide
          </span>
          <span class="text-xs text-teal-300">Protein (1.5-2.0g/kg), Vitamins D3/K2, Iron, Calcium & 12 Height Exercises</span>
        </div>
        <span class="text-xs text-teal-400 font-bold flex items-center gap-1">Open Guide ➔</span>
      </div>
    `;
  }

  // Gyms Section
  if (matchingGyms.length > 0) {
    html += `<div class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider px-3 pt-2">🏋️ Fitness Centers & Gyms</div>`;
    matchingGyms.forEach(gym => {
      html += `
        <div class="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors border border-emerald-500/20 bg-emerald-950/10 mb-1"
          onclick="handleSearchResultClick('gym', '${gym.id}')">
          <div>
            <span class="font-bold text-slate-100 text-sm block flex items-center gap-1.5">
              <span>⭐</span> ${gym.name}
            </span>
            <span class="text-xs text-slate-400">📍 ${gym.area} • ${gym.rating} ★ (${gym.reviewCount} reviews)</span>
          </div>
          <span class="text-xs text-emerald-400 font-semibold flex items-center gap-1">Locate on Map ➔</span>
        </div>
      `;
    });
  }

  if (matchingExercises.length > 0) {
    html += `<div class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider px-3 pt-2 ${matchingGyms.length > 0 ? 'border-t border-slate-700/50' : ''}">Exercises</div>`;
    matchingExercises.forEach(ex => {
      html += `
        <div class="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors"
          onclick="handleSearchResultClick('exercise', '${ex.id}')">
          <div>
            <span class="font-bold text-slate-100 text-sm block">${ex.name}</span>
            <span class="text-xs text-slate-400">${ex.bodyPartName} • ${ex.difficulty}</span>
          </div>
          <span class="text-xs text-emerald-400 font-semibold">View Drill ➔</span>
        </div>
      `;
    });
  }

  if (matchingFoods.length > 0) {
    html += `<div class="text-[11px] font-bold text-orange-400 uppercase tracking-wider px-3 pt-2 border-t border-slate-700/50">Foods & Nutrition</div>`;
    matchingFoods.forEach(food => {
      html += `
        <div class="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors"
          onclick="handleSearchResultClick('food', '${food.id}')">
          <div>
            <span class="font-bold text-slate-100 text-sm block">${food.name} ${food.hindiName ? `(${food.hindiName})` : ''}</span>
            <span class="text-xs text-slate-400">${food.protein}g protein • ${food.calories} kcal • ${food.category}</span>
          </div>
          <span class="text-xs text-orange-400 font-semibold">View Food ➔</span>
        </div>
      `;
    });
  }

  if (matchingNutrients.length > 0) {
    html += `<div class="text-[11px] font-bold text-blue-400 uppercase tracking-wider px-3 pt-2 border-t border-slate-700/50">Nutrients</div>`;
    matchingNutrients.forEach(n => {
      html += `
        <div class="p-2.5 rounded-lg hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition-colors"
          onclick="handleSearchResultClick('nutrient', '${n.id}')">
          <div>
            <span class="font-bold text-slate-100 text-sm block">${n.name}</span>
            <span class="text-xs text-slate-400">${n.type} • Daily: ${n.approxRequirement}</span>
          </div>
          <span class="text-xs text-blue-400 font-semibold">Explore ➔</span>
        </div>
      `;
    });
  }

  html += '</div>';
  container.innerHTML = html;
  container.classList.remove('hidden');
}

function handleSearchResultClick(type, id) {
  closeModal('global-search-modal');
  const homeResults = document.getElementById('home-search-results');
  if (homeResults) homeResults.classList.add('hidden');

  if (type === 'exercise') {
    navigateToTab('exercises');
    openExerciseModal(id);
  } else if (type === 'food') {
    navigateToTab('foods');
    const foodSearch = document.getElementById('food-search-input');
    const food = FIT_DATA.foods.find(f => f.id === id);
    if (foodSearch && food) {
      foodSearch.value = food.name;
      filterFoods();
    }
  } else if (type === 'nutrient') {
    navigateToTab('nutrition');
    const el = document.getElementById(`micro-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (type === 'gym') {
    navigateToTab('gyms');
    const gym = FIT_DATA.gyms.find(g => g.id === id);
    if (gym) {
      const gymInput = document.getElementById('gym-search-input');
      const cityInput = document.getElementById('gym-city-input');
      if (gymInput) gymInput.value = gym.name.split(' ')[0] + ' ' + (gym.name.split(' ')[1] || '');
      if (cityInput) cityInput.value = '';
      updateGymSearchAndMap();
      focusGymOnMap(gym.id);
      setTimeout(() => {
        const gymSection = document.getElementById('section-gyms');
        if (gymSection) gymSection.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }
}

/* ==========================================================================
   Modal Dialog Management
   ========================================================================== */
function initModals() {
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
      }
    });
  });

  // Open Favorites button
  const favBtn = document.getElementById('open-favorites-btn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      renderFavoritesDrawer();
      openModal('favorites-modal');
    });
  }
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   Gyms & Google Maps Locator (Pure GPS, Separate City Search & U Fit Sheelanagar)
   ========================================================================== */
function initGymsPage() {
  const cityInput = document.getElementById('gym-city-input');
  const gymSearchInput = document.getElementById('gym-search-input');
  const gpsBtn = document.getElementById('gym-gps-detect-btn');
  const cityPillBtns = document.querySelectorAll('.gym-city-btn');

  // 1. Separate City Search input
  if (cityInput) {
    cityInput.addEventListener('input', () => {
      const city = cityInput.value.trim();
      AppState.currentGymCity = city;
      updateGymSearchAndMap();
    });
  }

  // 2. Separate Gym Name / Locality search input
  if (gymSearchInput) {
    gymSearchInput.addEventListener('input', () => {
      updateGymSearchAndMap();
    });
  }

  // 3. Pure Live GPS Detection (No City Preset)
  if (gpsBtn) {
    gpsBtn.addEventListener('click', detectUserLocationAndFindGyms);
  }

  // 4. City quick pill buttons
  cityPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cityPillBtns.forEach(b => {
        b.classList.remove('bg-emerald-500', 'text-slate-950', 'font-bold');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.add('bg-emerald-500', 'text-slate-950', 'font-bold');
      btn.classList.remove('bg-slate-800', 'text-slate-300');

      const selectedCity = btn.getAttribute('data-gym-city');
      if (cityInput) {
        cityInput.value = selectedCity === 'all' ? '' : selectedCity;
      }
      AppState.currentGymCity = selectedCity === 'all' ? '' : selectedCity;
      updateGymSearchAndMap();
    });
  });

  // Initial load
  updateGymSearchAndMap();
}

function setCitySearch(city) {
  const cityInput = document.getElementById('gym-city-input');
  if (cityInput) cityInput.value = city;
  AppState.currentGymCity = city;
  
  document.querySelectorAll('.gym-city-btn').forEach(btn => {
    const btnCity = btn.getAttribute('data-gym-city');
    if ((!city && btnCity === 'all') || (btnCity && btnCity.toLowerCase() === city.toLowerCase())) {
      btn.classList.add('bg-emerald-500', 'text-slate-950', 'font-bold');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
    } else {
      btn.classList.remove('bg-emerald-500', 'text-slate-950', 'font-bold');
      btn.classList.add('bg-slate-800', 'text-slate-300');
    }
  });

  updateGymSearchAndMap();
}

function selectQuickGym(gymName) {
  const gymInput = document.getElementById('gym-search-input');
  const cityInput = document.getElementById('gym-city-input');

  if (gymInput) gymInput.value = gymName;
  
  // If selecting U Fit or Pulse in Sheelanagar, clear any conflicting city (e.g. Gajuwaka)
  if (gymName && (gymName.toLowerCase().includes('u fit') || gymName.toLowerCase().includes('pulse'))) {
    if (cityInput && cityInput.value && !['sheelanagar', 'sheela nagar', 'visakhapatnam'].includes(cityInput.value.toLowerCase())) {
      cityInput.value = '';
      AppState.currentGymCity = '';
    }
  }

  updateGymSearchAndMap();

  if (gymName) {
    showToast(`Showing "${gymName}" in Sheelanagar / Vizag! 📍`);
  }
}

function focusGymOnMap(gymId) {
  const gym = (FIT_DATA.gyms || []).find(g => g.id === gymId);
  if (!gym) return;
  const targetQuery = gym.mapQuery || `${gym.name} ${gym.area} ${gym.city}`;
  updateGoogleMap(targetQuery);
  showToast(`Centered map on ${gym.name}! 📍`);
}

function updateGymSearchAndMap() {
  const city = (document.getElementById('gym-city-input')?.value || '').trim();
  const gymQuery = (document.getElementById('gym-search-input')?.value || '').trim();

  // Filter curated database
  filterGyms(gymQuery, city);

  // Check if gymQuery matches a gym in our database (e.g. "u fit")
  const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const normGymQuery = normalize(gymQuery);

  const matchedGym = normGymQuery ? (FIT_DATA.gyms || []).find(g =>
    normalize(g.name).includes(normGymQuery) ||
    normGymQuery.includes(normalize(g.name)) ||
    (g.altNames && g.altNames.some(alt => normalize(alt).includes(normGymQuery) || normGymQuery.includes(normalize(alt))))
  ) : null;

  let mapSearchQuery = '';
  if (matchedGym) {
    // If it's a specific gym from our database, use its exact pinpoint mapQuery!
    mapSearchQuery = matchedGym.mapQuery || `${matchedGym.name} ${matchedGym.area} ${matchedGym.city}`;
  } else if (gymQuery && city) {
    mapSearchQuery = `${gymQuery} gym in ${city}`;
  } else if (gymQuery) {
    mapSearchQuery = `${gymQuery} gym`;
  } else if (city) {
    mapSearchQuery = `fitness gyms in ${city}`;
  } else {
    // Default to gyms near me
    mapSearchQuery = 'fitness gyms near me';
  }

  updateGoogleMap(mapSearchQuery);
}

function filterGyms(searchTerm = '', cityFilter = '') {
  let gyms = FIT_DATA.gyms || [];

  // Helper to normalize strings (removes hyphens, spaces for robust matches like "u fit" == "ufit")
  const normalize = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const normSearch = normalize(searchTerm);
  const normCity = normalize(cityFilter);

  const matchesGym = (g, query) => {
    if (!query) return true;
    if (normalize(g.name).includes(query)) return true;
    if (query.includes(normalize(g.name))) return true;
    if (g.altNames && g.altNames.some(alt => normalize(alt).includes(query) || query.includes(normalize(alt)))) return true;
    if (normalize(g.area).includes(query)) return true;
    if (normalize(g.address).includes(query)) return true;
    if (normalize(g.city).includes(query)) return true;
    if (g.amenities && g.amenities.some(a => normalize(a).includes(query))) return true;
    return false;
  };

  const matchesCity = (g, city) => {
    if (!city || city === 'all') return true;
    if (normalize(g.city).includes(city)) return true;
    if (normalize(g.area).includes(city)) return true;
    if (normalize(g.address).includes(city)) return true;
    if (city.includes('sheela') || city.includes('nagar')) {
      if (normalize(g.area).includes('sheela') || normalize(g.address).includes('sheela')) return true;
    }
    return false;
  };

  let filtered = gyms;

  if (normCity && normCity !== 'all') {
    const inCityGyms = gyms.filter(g => matchesCity(g, normCity));
    if (normSearch) {
      const bothMatch = inCityGyms.filter(g => matchesGym(g, normSearch));
      if (bothMatch.length > 0) {
        filtered = bothMatch;
      } else {
        // If gym is found in database (e.g. U Fit in Sheelanagar), don't hide it due to city filter mismatch!
        const allMatches = gyms.filter(g => matchesGym(g, normSearch));
        if (allMatches.length > 0) {
          filtered = allMatches;
        } else {
          filtered = [];
        }
      }
    } else {
      filtered = inCityGyms;
    }
  } else if (normSearch) {
    filtered = gyms.filter(g => matchesGym(g, normSearch));
  }

  renderGyms(filtered, searchTerm, cityFilter);
}

function renderGyms(gyms, searchTerm = '', cityFilter = '') {
  const container = document.getElementById('gyms-cards-grid');
  const countEl = document.getElementById('gyms-count-display');
  if (!container) return;

  if (countEl) {
    countEl.textContent = `Showing ${gyms.length} verified fitness gyms`;
  }

  // If gym was not in curated database, provide dynamic Google Maps directory result instead of an empty dead-end!
  if (gyms.length === 0) {
    const displayQuery = searchTerm || cityFilter || 'your search';
    const gmapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchTerm + (cityFilter ? ' ' + cityFilter : ''))}`;

    container.innerHTML = `
      <div class="col-span-full fit-card p-6 border border-emerald-500/50 bg-gradient-to-r from-emerald-950/30 to-slate-900 rounded-2xl">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1.5">
              <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Live Google Maps Result
              </span>
              <span class="text-xs text-slate-400">Real-time local satellite search</span>
            </div>
            <h4 class="text-lg font-bold text-white">Searching for "${displayQuery}"</h4>
            <p class="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              We've synced the interactive map above to locate <strong>"${displayQuery}"</strong>. You can also view all real-time Google reviews, open hours, and get turn-by-turn driving directions below.
            </p>
          </div>
          <div class="flex flex-wrap items-center gap-2">
            <a href="${gmapsSearchUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-2.5 px-4 whitespace-nowrap">
              <span>🗺️</span> Open in Google Maps App ➔
            </a>
            <a href="https://wa.me/919014430474?text=Hi%20FitGuide%2C%20is%20${encodeURIComponent(displayQuery)}%20available%20near%20me%3F" target="_blank" class="btn-secondary text-xs py-2.5 px-3.5 whitespace-nowrap">
              <span>💬</span> Ask on WhatsApp
            </a>
            <button onclick="setCitySearch(''); if(document.getElementById('gym-search-input')) document.getElementById('gym-search-input').value=''; updateGymSearchAndMap();" class="text-xs px-3 py-2 text-slate-400 hover:text-white">
              Reset Filters
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = gyms.map(gym => {
    const fullStars = '★'.repeat(Math.floor(gym.rating));
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(gym.name + ' ' + gym.address)}`;

    return `
      <div class="fit-card p-5 flex flex-col justify-between hover:border-emerald-500/60 transition-all">
        <div>
          <!-- Header: Name, City & Rating -->
          <div class="flex items-start justify-between gap-2 mb-2">
            <div>
              <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                ${gym.city}
              </span>
              <h3 class="text-base font-bold text-white mt-1.5 leading-snug">${gym.name}</h3>
            </div>
            
            <div class="text-right whitespace-nowrap">
              <div class="flex items-center gap-1 justify-end">
                <span class="star-rating text-amber-400 font-bold">${fullStars}</span>
                <span class="font-extrabold text-sm text-white">${gym.rating}</span>
              </div>
              <span class="text-[10px] text-slate-400">(${gym.reviewCount} reviews)</span>
            </div>
          </div>

          <!-- Area & Address -->
          <div class="text-xs text-slate-300 mb-3 space-y-1">
            <div class="flex items-center gap-1 text-emerald-400 font-semibold">
              <span>📍</span> <span>${gym.area}</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-relaxed">${gym.address}</p>
          </div>

          <!-- Highlight note -->
          <p class="text-xs text-slate-300 italic bg-slate-800/70 p-2.5 rounded-lg border border-slate-700/50 mb-3">
            "${gym.highlight}"
          </p>

          <!-- Timings & Phone -->
          <div class="grid grid-cols-2 gap-2 text-[11px] text-slate-300 mb-3">
            <div>
              <span class="text-slate-400 block text-[10px]">Hours:</span>
              <span class="font-semibold text-slate-200">${gym.timing}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Direct WhatsApp:</span>
              <a href="https://wa.me/919014430474?text=Hi%2C%20I%20am%20inquiring%20about%20fitness%20at%20${encodeURIComponent(gym.name)}" target="_blank" class="font-semibold text-emerald-400 hover:underline">
                Chat on WhatsApp ➔
              </a>
            </div>
          </div>

          <!-- Amenities badges -->
          <div class="mb-4">
            <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Equipment & Facilities:</span>
            <div class="flex flex-wrap gap-1">
              ${gym.amenities.map(a => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">${a}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
          <button onclick="focusGymOnMap('${gym.id}')" class="text-xs px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors cursor-pointer">
            <span>🗺️</span> View on Map
          </button>
          
          <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary text-xs py-1.5 px-3 whitespace-nowrap">
            Get Directions ➔
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function updateGoogleMap(rawQuery) {
  const mapFrame = document.getElementById('google-gym-map-frame');
  const mapTitle = document.getElementById('google-map-active-query');
  const externalLink = document.getElementById('open-external-google-maps');
  const directGmapsLink = document.getElementById('gym-direct-gmaps-link');

  // Normalize query to plain clean text without double encoding
  let plainQuery = rawQuery || 'fitness gyms near me';
  try {
    plainQuery = decodeURIComponent(plainQuery);
  } catch (e) {}
  plainQuery = plainQuery.replace(/\+/g, ' ').trim();

  const encodedForUrl = encodeURIComponent(plainQuery);

  if (mapFrame) {
    mapFrame.src = `https://maps.google.com/maps?q=${encodedForUrl}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  }
  if (mapTitle) {
    mapTitle.textContent = plainQuery;
  }
  if (externalLink) {
    externalLink.href = `https://www.google.com/maps/search/?api=1&query=${encodedForUrl}`;
  }
  if (directGmapsLink) {
    directGmapsLink.href = `https://www.google.com/maps/search/?api=1&query=${encodedForUrl}`;
  }
}

// Pure Live GPS Detection (Zero City Pre-set)
function detectUserLocationAndFindGyms() {
  const gpsBtn = document.getElementById('gym-gps-detect-btn');
  const statusEl = document.getElementById('gym-gps-status');
  const cityInput = document.getElementById('gym-city-input');
  const gymSearchInput = document.getElementById('gym-search-input');
  const originalText = gpsBtn ? gpsBtn.innerHTML : '';

  // Clear any city preset so GPS is 100% pure coordinates with zero city string
  if (cityInput) cityInput.value = '';
  if (gymSearchInput) gymSearchInput.value = '';
  AppState.currentGymCity = '';

  // Reset city pill buttons to all
  document.querySelectorAll('.gym-city-btn').forEach(btn => {
    if (btn.getAttribute('data-gym-city') === 'all') {
      btn.classList.add('bg-emerald-500', 'text-slate-950', 'font-bold');
      btn.classList.remove('bg-slate-800', 'text-slate-300');
    } else {
      btn.classList.remove('bg-emerald-500', 'text-slate-950', 'font-bold');
      btn.classList.add('bg-slate-800', 'text-slate-300');
    }
  });

  // Re-render all gyms so verified gyms (U Fit etc.) remain accessible
  filterGyms('', '');

  if (!navigator.geolocation) {
    showToast('Geolocation is not supported by your browser.', 'info');
    if (statusEl) {
      statusEl.innerHTML = `
        <div class="flex flex-wrap items-center justify-between gap-2 w-full text-amber-300">
          <span>⚠️ Geolocation is not supported in this browser.</span>
          <a href="https://www.google.com/maps/search/?api=1&query=fitness+gyms+near+me" target="_blank" rel="noopener noreferrer" class="text-emerald-400 font-bold underline">
            Open 'Gyms Near Me' on Google Maps ➔
          </a>
        </div>
      `;
    }
    updateGoogleMap('fitness gyms near me');
    return;
  }

  if (gpsBtn) {
    gpsBtn.innerHTML = `<span>⏳ Detecting Live GPS...</span>`;
    gpsBtn.disabled = true;
  }

  // Geolocation options: standard accuracy so desktops & mobile without GPS hardware don't timeout
  const geoOptions = {
    enableHighAccuracy: false,
    timeout: 8000,
    maximumAge: 60000
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // Pure coordinates query without forcing any city name!
      const pureGpsQuery = `fitness gyms near ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      updateGoogleMap(pureGpsQuery);

      if (statusEl) {
        statusEl.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 w-full">
            <span class="text-emerald-400 font-bold">✓ Live GPS Satellite Coordinates: [${latitude.toFixed(4)}, ${longitude.toFixed(4)}] (Zero city preset)</span>
            <a href="https://www.google.com/maps/search/?api=1&query=${latitude.toFixed(6)},${longitude.toFixed(6)}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline font-semibold">
              Open Exact GPS in Google Maps App ➔
            </a>
          </div>
        `;
      }

      showToast(`Found nearest gyms using your pure live GPS coordinates (${latitude.toFixed(3)}, ${longitude.toFixed(3)})! 📍`);
      if (gpsBtn) {
        gpsBtn.innerHTML = originalText;
        gpsBtn.disabled = false;
      }
    },
    (error) => {
      console.warn('Geolocation notice:', error.code, error.message);
      
      let errMsg = 'Location permission is denied or unavailable in this browser.';
      if (error.code === 1) {
        errMsg = 'Location permission was denied. Tap below to open Google Maps with your device GPS:';
      } else if (error.code === 3) {
        errMsg = 'GPS request timed out. You can open Google Maps directly or search by city:';
      }

      if (statusEl) {
        statusEl.innerHTML = `
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full text-xs">
            <div class="text-amber-300">
              <span class="font-bold">⚠️ ${errMsg}</span>
            </div>
            <div class="flex flex-wrap items-center gap-2">
              <a href="https://www.google.com/maps/search/?api=1&query=fitness+gyms+near+me" target="_blank" rel="noopener noreferrer" class="px-3 py-1 bg-emerald-500 text-slate-950 rounded font-bold hover:bg-emerald-400 transition-colors">
                🗺️ Open in Google Maps ➔
              </a>
              <button onclick="setCitySearch('Sheela Nagar')" class="px-2.5 py-1 bg-slate-800 text-slate-200 rounded hover:bg-slate-700">
                Sheelanagar (U Fit)
              </button>
              <button onclick="setCitySearch('Gajuwaka')" class="px-2.5 py-1 bg-slate-800 text-slate-200 rounded hover:bg-slate-700">
                Gajuwaka
              </button>
            </div>
          </div>
        `;
      }
      showToast('Location permission unavailable. Use City search or tap the Google Maps link!', 'info');
      updateGoogleMap('fitness gyms near me');
      if (gpsBtn) {
        gpsBtn.innerHTML = originalText;
        gpsBtn.disabled = false;
      }
    },
    geoOptions
  );
}

/* ==========================================================================
   Height Growth & Spinal Decompression Engine
   ========================================================================== */
function initHeightPage() {
  renderHeightExercises();
  calculateHeightNutrition();
}

function calculateHeightNutrition() {
  const age = parseInt(document.getElementById('height-calc-age')?.value) || 18;
  const weight = parseFloat(document.getElementById('height-calc-weight')?.value) || 55;
  const container = document.getElementById('height-calc-results');
  if (!container) return;

  // 1. Protein Target (1.6 - 2.0g/kg for adolescents under 21, 1.3 - 1.6g/kg for 21+)
  const proteinMultiplier = age <= 21 ? { min: 1.6, max: 2.0 } : { min: 1.3, max: 1.6 };
  const minProtein = Math.round(weight * proteinMultiplier.min);
  const maxProtein = Math.round(weight * proteinMultiplier.max);

  // 2. Vitamin D3
  const vitD3 = age <= 18 ? "600 - 1,000 IU" : "800 - 1,500 IU";

  // 3. Vitamin K2
  const vitK2 = age <= 18 ? "45 - 75 mcg" : "75 - 120 mcg";

  // 4. Vitamin C
  const vitC = age <= 18 ? "65 - 80 mg" : "75 - 90 mg";

  // 5. Iron
  const iron = age <= 20 ? "15 - 18 mg" : "12 - 16 mg";

  // 6. Calcium
  const calcium = age <= 19 ? "1,300 mg" : "1,000 mg";

  // 7. Zinc
  const zinc = "11 - 15 mg";

  // 8. Sleep
  const sleep = age <= 18 ? "9 - 10 hours" : "8 - 9 hours";

  container.innerHTML = `
    <!-- Target 1: Protein -->
    <div class="p-3.5 bg-slate-800/80 rounded-xl border border-emerald-500/40 text-center">
      <span class="text-[10px] uppercase font-bold text-slate-400 block">Daily Protein</span>
      <span class="text-lg font-black text-emerald-400 block my-0.5">${minProtein} - ${maxProtein} g</span>
      <span class="text-[10px] text-slate-400">1.6-2.0g/kg for bone matrix</span>
    </div>

    <!-- Target 2: Vitamin D3 -->
    <div class="p-3.5 bg-slate-800/80 rounded-xl border border-teal-500/40 text-center">
      <span class="text-[10px] uppercase font-bold text-slate-400 block">Vitamin D3</span>
      <span class="text-lg font-black text-teal-400 block my-0.5">${vitD3}</span>
      <span class="text-[10px] text-slate-400">+ 15m morning sun</span>
    </div>

    <!-- Target 3: Vitamin K2 -->
    <div class="p-3.5 bg-slate-800/80 rounded-xl border border-teal-500/40 text-center">
      <span class="text-[10px] uppercase font-bold text-slate-400 block">Vitamin K2</span>
      <span class="text-lg font-black text-teal-400 block my-0.5">${vitK2}</span>
      <span class="text-[10px] text-slate-400">Binds Ca to bone</span>
    </div>

    <!-- Target 4: Iron -->
    <div class="p-3.5 bg-slate-800/80 rounded-xl border border-orange-500/40 text-center">
      <span class="text-[10px] uppercase font-bold text-slate-400 block">Daily Iron</span>
      <span class="text-lg font-black text-orange-400 block my-0.5">${iron}</span>
      <span class="text-[10px] text-slate-400">Growth plate oxygen</span>
    </div>

    <!-- Target 5: Calcium -->
    <div class="p-3.5 bg-slate-800/80 rounded-xl border border-blue-500/40 text-center">
      <span class="text-[10px] uppercase font-bold text-slate-400 block">Daily Calcium</span>
      <span class="text-lg font-black text-blue-400 block my-0.5">${calcium}</span>
      <span class="text-[10px] text-slate-400">Bone mineral crystal</span>
    </div>

    <!-- Target 6: Deep Sleep -->
    <div class="p-3.5 bg-slate-800/80 rounded-xl border border-purple-500/40 text-center">
      <span class="text-[10px] uppercase font-bold text-slate-400 block">Deep Sleep (HGH)</span>
      <span class="text-lg font-black text-purple-400 block my-0.5">${sleep}</span>
      <span class="text-[10px] text-slate-400">75% HGH released</span>
    </div>
  `;
}

function renderHeightExercises() {
  const container = document.getElementById('height-exercises-grid');
  if (!container) return;

  const heightExercises = (FIT_DATA.exercises || []).filter(e => e.bodyPart === 'height');

  container.innerHTML = heightExercises.map(ex => {
    const photo = getExercisePhoto(ex);
    return `
    <div class="fit-card flex flex-col justify-between hover:border-teal-500/60 hover:shadow-glow transition-all border border-slate-700/80 rounded-2xl overflow-hidden group">
      <!-- Photo Preview -->
      <div class="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-700/60">
        <img src="${photo}" alt="${ex.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80';" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
        <div class="absolute top-3 left-3">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/90 text-slate-950 font-sans shadow">
            ${ex.difficulty} • Height & Spine
          </span>
        </div>
        <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs font-mono font-bold text-white drop-shadow">
          <span class="bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700/60 backdrop-blur">${ex.setsReps}</span>
          <span class="bg-teal-950/80 px-2 py-0.5 rounded text-[10px] text-teal-300 border border-teal-500/40 backdrop-blur">Spinal Traction</span>
        </div>
      </div>

      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 class="text-base font-bold text-white mb-1.5 group-hover:text-teal-400 transition-colors">${ex.name}</h4>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">
            ${ex.benefits[0]}
          </p>

          <div class="mb-3 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300">
            <strong class="text-teal-400 block mb-0.5">Key Form Cue:</strong>
            ${ex.instructions[0]}
          </div>

          <div class="mb-3">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Areas:</span>
            <div class="flex flex-wrap gap-1">
              ${ex.secondaryMuscles.map(m => `<span class="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">${m}</span>`).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-700/60 flex items-center justify-between gap-2">
          <button onclick="openExerciseModal('${ex.id}')" class="text-xs px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer font-semibold transition-all">
            Detailed Guide ➔
          </button>
          <button onclick="addExerciseToWorkoutPlan('${ex.id}')" class="btn-primary text-xs py-2 px-3 whitespace-nowrap cursor-pointer">
            + Add to Routine
          </button>
        </div>
      </div>
    </div>
    `;
  }).join('');
}

// Global exposure for inline events
window.openModal = openModal;
window.closeModal = closeModal;
window.navigateToTab = navigateToTab;
window.selectBodyPart = selectBodyPart;
window.resetExerciseFilters = resetExerciseFilters;
window.resetFoodFilters = resetFoodFilters;
window.openExerciseModal = openExerciseModal;
window.toggleFavoriteExercise = toggleFavoriteExercise;
window.toggleFavoriteFood = toggleFavoriteFood;
window.addExerciseToWorkoutPlan = addExerciseToWorkoutPlan;
window.logExerciseAsCompleted = logExerciseAsCompleted;
window.addFoodToTracker = addFoodToTracker;
window.switchExplorerTab = switchExplorerTab;
window.displayVitaminDetails = displayVitaminDetails;
window.calculateDailyNutrition = calculateDailyNutrition;
window.applyCalculatedGoalsToTracker = applyCalculatedGoalsToTracker;
window.toggleWorkoutItemCompleted = toggleWorkoutItemCompleted;
window.removeExerciseFromWorkout = removeExerciseFromWorkout;
window.removeLoggedItem = removeLoggedItem;
window.handleSearchResultClick = handleSearchResultClick;
window.updateGoogleMap = updateGoogleMap;
window.detectUserLocationAndFindGyms = detectUserLocationAndFindGyms;
window.renderGyms = renderGyms;
window.setCitySearch = setCitySearch;
window.updateGymSearchAndMap = updateGymSearchAndMap;
window.selectQuickGym = selectQuickGym;
window.focusGymOnMap = focusGymOnMap;
window.initHeightPage = initHeightPage;
window.calculateHeightNutrition = calculateHeightNutrition;
window.renderHeightExercises = renderHeightExercises;

/* ==========================================================================
   QR Code, Authentication & Family / Relatives Sharing Hub
   ========================================================================== */

const LOCAL_NETWORK_IP = "192.168.0.6";
const LOCAL_NETWORK_PORT = "3000";

function getLocalBaseUrl() {
  return "https://fitguidecom.netlify.app";
}

function getRelativeShareUrl(includeLogin = false) {
  const base = getLocalBaseUrl();
  if (includeLogin) {
    return `${base}/?login=true&user=venkateshvemula8897%40gmail.com&phone=9014430474&name=Venkatesh+Vemula`;
  }
  return `${base}/?ref=relative&host=Venkatesh+Vemula`;
}

function initAuthAndSharing() {
  // Check URL parameters for QR auto-login or relative invite
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('login') === 'true' || params.get('user')) {
      const email = params.get('user') || params.get('email') || "venkateshvemula8897@gmail.com";
      const name = params.get('name') || "Venkatesh Vemula";
      const phone = params.get('phone') || "+91 9014430474";
      AppState.auth = {
        name: name,
        phone: phone,
        email: email,
        role: (email && email.toLowerCase().includes('venkatesh')) ? 'owner' : 'relative'
      };
      localStorage.setItem('fitguide_auth', JSON.stringify(AppState.auth));
      showToast(`🎉 Logged into FitGuide via QR! Welcome, ${name}.`, 'success');
    } else if (params.get('ref') === 'relative') {
      const host = params.get('host') || "Venkatesh Vemula";
      showToast(`👋 Welcome! ${host} shared FitGuide with you. Enjoy free workouts & nutrition!`, 'info');
    }
  } catch (e) {
    console.warn("URL auth parsing error:", e);
  }

  updateAuthUI();
}

function updateAuthUI() {
  const auth = AppState.auth || {
    name: "Venkatesh Vemula",
    phone: "+91 9014430474",
    email: "venkateshvemula8897@gmail.com",
    role: "owner"
  };

  // Header status button
  const headerStatus = document.getElementById('header-user-status');
  if (headerStatus) {
    if (auth.role === 'owner') {
      headerStatus.innerHTML = `👑 Venkatesh`;
    } else if (auth.role === 'relative') {
      headerStatus.innerHTML = `👤 ${auth.name}`;
    } else {
      headerStatus.innerHTML = `QR Login & Share`;
    }
  }

  // Modal session card elements
  const modalName = document.getElementById('modal-user-name');
  const modalBadge = document.getElementById('modal-user-role-badge');
  if (modalName) modalName.textContent = auth.name || "Guest";
  if (modalBadge) {
    if (auth.role === 'owner') {
      modalBadge.textContent = "Owner / Admin";
      modalBadge.className = "px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    } else if (auth.role === 'relative') {
      modalBadge.textContent = "Family Guest";
      modalBadge.className = "px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/20 text-teal-400 border border-teal-500/30";
    } else {
      modalBadge.textContent = "Guest Access";
      modalBadge.className = "px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-700 text-slate-300";
    }
  }

  // Update shareable link input value
  const shareInput = document.getElementById('shareable-link-input');
  if (shareInput) {
    shareInput.value = getLocalBaseUrl();
  }
}

function openQrModal() {
  openModal('qr-share-modal');
  updateAuthUI();
  renderQrCode();
}

function switchQrMode(mode) {
  AppState.qrMode = mode;

  // Update tabs visual state
  const tabs = {
    site: document.getElementById('qr-tab-site'),
    vcard: document.getElementById('qr-tab-vcard'),
    whatsapp: document.getElementById('qr-tab-wa')
  };

  Object.keys(tabs).forEach(key => {
    const btn = tabs[key];
    if (!btn) return;
    if (key === mode) {
      btn.className = "py-1.5 px-2 rounded-lg bg-emerald-500 text-slate-950 font-bold transition-all cursor-pointer shadow";
    } else {
      btn.className = "py-1.5 px-2 rounded-lg text-slate-300 hover:text-white transition-all cursor-pointer";
    }
  });

  const indicator = document.getElementById('qr-mode-indicator');
  const caption = document.getElementById('qr-caption-text');

  if (mode === 'site') {
    if (indicator) indicator.textContent = "Web & Auto-Login";
    if (caption) caption.textContent = "Scan with any smartphone camera or Google Lens to immediately open FitGuide with Venkatesh's profile!";
  } else if (mode === 'vcard') {
    if (indicator) indicator.textContent = "Digital Contact Card";
    if (caption) caption.textContent = "Scan to directly save Venkatesh Vemula (+91 9014430474 / venkateshvemula8897@gmail.com) into phone contacts!";
  } else if (mode === 'whatsapp') {
    if (indicator) indicator.textContent = "WhatsApp Direct Connect";
    if (caption) caption.textContent = "Scan to instantly open WhatsApp chat with Venkatesh (+91 9014430474)!";
  }

  renderQrCode();
}

function renderQrCode() {
  const container = document.getElementById('qrcode-display-target');
  if (!container) return;

  container.innerHTML = "";

  const mode = AppState.qrMode || 'site';
  let qrData = "";

  if (mode === 'site') {
    qrData = getRelativeShareUrl(true);
  } else if (mode === 'vcard') {
    qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:Venkatesh Vemula\nORG:FitGuide Fitness & Nutrition\nTEL:+919014430474\nEMAIL:venkateshvemula8897@gmail.com\nURL:${getLocalBaseUrl()}\nNOTE:FitGuide Owner - Height & Gym Workouts\nEND:VCARD`;
  } else if (mode === 'whatsapp') {
    qrData = `https://wa.me/919014430474?text=${encodeURIComponent("Hi Venkatesh, I scanned your FitGuide QR code!")}`;
  }

  try {
    if (typeof QRCode !== 'undefined') {
      new QRCode(container, {
        text: qrData,
        width: 200,
        height: 200,
        colorDark: "#090e1a",
        colorLight: "#ffffff",
        correctLevel: (typeof QRCode.CorrectLevel !== 'undefined') ? QRCode.CorrectLevel.M : 0
      });
    } else {
      throw new Error("QRCode library not yet loaded");
    }
  } catch (err) {
    // API Fallback
    const imgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}&margin=4`;
    container.innerHTML = `<img src="${imgUrl}" alt="FitGuide QR Code" class="w-[200px] h-[200px] rounded-lg shadow-sm" crossorigin="anonymous" />`;
  }
}

function copyShareLink() {
  const shareInput = document.getElementById('shareable-link-input');
  const urlToCopy = shareInput ? shareInput.value : getLocalBaseUrl();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(urlToCopy).then(() => {
      showToast("📋 Link copied to clipboard! You can paste and send to relatives.", "success");
    }).catch(() => {
      fallbackCopy(urlToCopy);
    });
  } else {
    fallbackCopy(urlToCopy);
  }
}

function fallbackCopy(text) {
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  showToast("📋 Link copied to clipboard! Send to relatives.", "success");
}

function shareOnWhatsAppWithRelatives() {
  const shareUrl = getLocalBaseUrl();
  const invitationMessage = 
`🌟 *FitGuide - Train Smart, Grow Taller & Eat Better!* 🌟

Hey! Venkatesh Vemula invites you to check out FitGuide:
👉 *Height Growth & Posture System* (Spinal decompression, Cobra stretch, Hanging)
👉 *Diet & Bone Nutrition* (Protein 1.5-2.0g/kg, Vitamin D3, Iron & Calcium)
👉 *38+ Gym Workouts & Library* (Chest, Back, Arms, Legs, Core)
👉 *Food & Nutrition Database* (Dal, Paneer, Chana, Ragi, Eggs, Chicken)
👉 *Gyms Locator* (Sheelanagar, Gajuwaka & Vizag on Google Maps)

🔗 *Click to Open FitGuide:*
${shareUrl}

👤 *Coach & Creator:* Venkatesh Vemula
📱 *WhatsApp:* +91 9014430474
✉️ *Email:* venkateshvemula8897@gmail.com`;

  const waUrl = `https://wa.me/?text=${encodeURIComponent(invitationMessage)}`;
  window.open(waUrl, '_blank');
}

function downloadQrCodeImage() {
  const container = document.getElementById('qrcode-display-target');
  if (!container) return;

  const canvas = container.querySelector('canvas');
  const img = container.querySelector('img');

  let dataUrl = "";
  if (canvas) {
    dataUrl = canvas.toDataURL("image/png");
  } else if (img && img.src) {
    dataUrl = img.src;
  }

  if (dataUrl) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `fitguide_qr_${AppState.qrMode || 'venkatesh'}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("💾 QR Code downloaded successfully!", "success");
  } else {
    showToast("Could not extract QR image. Right click QR to save.", "warning");
  }
}

function loginAsOwner() {
  AppState.auth = {
    name: "Venkatesh Vemula",
    phone: "+91 9014430474",
    email: "venkateshvemula8897@gmail.com",
    role: "owner"
  };
  localStorage.setItem('fitguide_auth', JSON.stringify(AppState.auth));
  updateAuthUI();
  renderQrCode();
  showToast("👑 Logged in as Venkatesh Vemula (Admin / Owner)", "success");
}

function loginAsRelative(event) {
  if (event) event.preventDefault();
  const nameInput = document.getElementById('relative-name-input');
  const phoneInput = document.getElementById('relative-phone-input');

  const name = nameInput ? nameInput.value.trim() : "Family Member";
  const phone = phoneInput ? phoneInput.value.trim() : "";

  if (!name) {
    showToast("Please enter your name.", "warning");
    return;
  }

  AppState.auth = {
    name: name,
    phone: phone,
    email: "",
    role: "relative"
  };
  localStorage.setItem('fitguide_auth', JSON.stringify(AppState.auth));
  updateAuthUI();
  renderQrCode();
  showToast(`👋 Welcome ${name}! Relative profile saved.`, "success");
}

function logoutUser() {
  AppState.auth = {
    name: "Guest User",
    phone: "",
    email: "",
    role: "guest"
  };
  localStorage.setItem('fitguide_auth', JSON.stringify(AppState.auth));
  updateAuthUI();
  renderQrCode();
  showToast("Logged out. You can login or switch accounts anytime.", "info");
}

function toggleHostingGuide() {
  const guide = document.getElementById('hosting-guide-box');
  if (guide) {
    guide.classList.toggle('hidden');
  }
}

// Global exposure for QR and Auth events
window.openQrModal = openQrModal;
window.switchQrMode = switchQrMode;
window.copyShareLink = copyShareLink;
window.shareOnWhatsAppWithRelatives = shareOnWhatsAppWithRelatives;
window.downloadQrCodeImage = downloadQrCodeImage;
window.renderQrCode = renderQrCode;
window.loginAsOwner = loginAsOwner;
window.loginAsRelative = loginAsRelative;
window.logoutUser = logoutUser;
window.toggleHostingGuide = toggleHostingGuide;




/* ==========================================================================
   WOMEN'S HEALTH ENGINE (MENSTRUAL CYCLE & PREGNANCY CARE)
   ========================================================================== */
function initWomenHealthPage() {
  renderMenstrualPhases();
  renderMenstrualPrecautions();
  renderCycleFoodAdvantages();
  renderCycleFoodDisadvantages();
  renderPregnancyTrimesters();
  renderPregnancyExercises();
  renderPregnancyDangerousExercises();
  renderPregnancyFoodAdvantages();
  renderPregnancyFoodDisadvantages();
}

function switchWomenTab(tab) {
  const btnCycle = document.getElementById('btn-women-tab-cycle');
  const btnPregnancy = document.getElementById('btn-women-tab-pregnancy');
  const subCycle = document.getElementById('women-subtab-cycle');
  const subPregnancy = document.getElementById('women-subtab-pregnancy');

  if (tab === 'cycle') {
    if (btnCycle) btnCycle.className = "px-5 py-3 rounded-xl bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer";
    if (btnPregnancy) btnPregnancy.className = "px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer";
    if (subCycle) subCycle.classList.remove('hidden');
    if (subPregnancy) subPregnancy.classList.add('hidden');
  } else {
    if (btnCycle) btnCycle.className = "px-5 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer";
    if (btnPregnancy) btnPregnancy.className = "px-5 py-3 rounded-xl bg-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer";
    if (subCycle) subCycle.classList.add('hidden');
    if (subPregnancy) subPregnancy.classList.remove('hidden');
  }
}

const MENSTRUAL_PHASE_PHOTOS = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80", // Phase 1: Menstrual
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", // Phase 2: Follicular
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80", // Phase 3: Ovulatory
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80"  // Phase 4: Luteal
];

function renderMenstrualPhases() {
  const container = document.getElementById('menstrual-phases-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.menstrualCycle.phases.map((p, idx) => {
    const photo = MENSTRUAL_PHASE_PHOTOS[idx] || MENSTRUAL_PHASE_PHOTOS[0];
    return `
    <div class="fit-card rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-pink-500/50 transition-all group">
      <div>
        <div class="relative h-40 w-full overflow-hidden bg-slate-950 border-b border-slate-800">
          <img src="${photo}" alt="${p.phase}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80';" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          <span class="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500 text-white shadow">Phase ${idx + 1}</span>
          <span class="absolute bottom-2 left-3 right-3 text-sm font-extrabold text-white drop-shadow">${p.phase}</span>
        </div>

        <div class="p-4 space-y-3">
          <div class="text-xs text-slate-300 font-medium bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
            <strong class="text-slate-200">Hormonal Profile:</strong> ${p.hormones}
          </div>
          <div class="text-xs text-slate-400 leading-relaxed">
            <strong class="text-slate-300">Energy & Mood:</strong> ${p.energyLevel}
          </div>
          <div class="text-xs text-slate-300 leading-relaxed p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
            <strong class="text-emerald-400 block mb-0.5">Exercise Guidance:</strong> ${p.exerciseAdvice}
          </div>
        </div>
      </div>
      <div class="p-4 pt-0">
        <div class="pt-3 border-t border-slate-800 text-xs text-pink-300 font-semibold">
          Key Nutrients: ${p.keyNutrients}
        </div>
      </div>
    </div>
    `;
  }).join('');
}

function renderMenstrualPrecautions() {
  const container = document.getElementById('menstrual-precautions-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.menstrualCycle.precautions.map(pr => `
    <div class="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
      <span class="text-amber-400 text-lg font-bold">✓</span>
      <div>
        <h4 class="text-xs font-bold text-slate-200 mb-1">${pr.rule}</h4>
        <p class="text-xs text-slate-400 leading-relaxed">${pr.detail}</p>
      </div>
    </div>
  `).join('');
}

function renderCycleFoodAdvantages() {
  const container = document.getElementById('cycle-food-advantages-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.menstrualCycle.foodAdvantages.map(fa => `
    <div class="p-3.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 flex items-start gap-3">
      <span class="text-emerald-400 font-bold text-base">🌿</span>
      <div>
        <div class="flex items-center gap-2 mb-1">
          <h5 class="text-xs font-extrabold text-white">${fa.food}</h5>
          <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">${fa.category}</span>
        </div>
        <p class="text-xs text-slate-300 leading-relaxed">${fa.benefit}</p>
      </div>
    </div>
  `).join('');
}

function renderCycleFoodDisadvantages() {
  const container = document.getElementById('cycle-food-disadvantages-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.menstrualCycle.foodDisadvantages.map(fd => `
    <div class="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30 flex items-start gap-3">
      <span class="text-rose-400 font-bold text-base">🚫</span>
      <div>
        <h5 class="text-xs font-extrabold text-white mb-1">${fd.food}</h5>
        <p class="text-xs text-slate-300 leading-relaxed mb-1">${fd.disadvantage}</p>
        <span class="text-[10px] text-rose-300 block font-semibold">Danger: ${fd.whyAvoid}</span>
      </div>
    </div>
  `).join('');
}

function renderPregnancyTrimesters() {
  const container = document.getElementById('pregnancy-trimesters-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.pregnancyCare.trimesters.map(t => `
    <div class="p-4 rounded-xl bg-slate-950/60 border border-teal-500/20">
      <span class="text-xs font-bold text-teal-400 uppercase tracking-wider block mb-1">${t.trimester}</span>
      <p class="text-xs text-slate-200 font-medium mb-2">${t.focus}</p>
      <div class="text-[11px] text-slate-300 mb-1.5">
        <strong class="text-emerald-400">Exercise:</strong> ${t.exerciseTips}
      </div>
      <div class="text-[11px] text-slate-400">
        <strong class="text-pink-400">Diet Focus:</strong> ${t.nutritionFocus}
      </div>
    </div>
  `).join('');
}

function renderPregnancyExercises() {
  const container = document.getElementById('pregnancy-exercises-grid');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.pregnancyCare.safeExercises.map(ex => `
    <div class="fit-card rounded-2xl overflow-hidden border border-teal-500/30 flex flex-col justify-between">
      <div>
        <div class="relative h-44 w-full overflow-hidden bg-slate-950">
          <img src="${ex.photoUrl}" alt="${ex.name}" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
          <span class="absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/90 text-slate-950 font-sans">${ex.trimesterSafe}</span>
          <span class="absolute bottom-2 left-3 text-sm font-extrabold text-white">${ex.name}</span>
        </div>

        <div class="p-4 space-y-3">
          <p class="text-xs text-slate-300 leading-relaxed">${ex.instructions}</p>

          <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
            <span class="text-[11px] font-bold text-emerald-400 block mb-1">✨ Proven Advantages for Labor:</span>
            <ul class="space-y-1 text-[11px] text-slate-300">
              ${ex.advantages.map(a => `<li class="flex items-start gap-1.5"><span>•</span><span>${a}</span></li>`).join('')}
            </ul>
          </div>

          <div class="p-3 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <span class="text-[11px] font-bold text-rose-400 block mb-1">⚠️ Execution Cautions & Risks:</span>
            <ul class="space-y-1 text-[11px] text-slate-300">
              ${ex.disadvantagesAndRisks.map(r => `<li class="flex items-start gap-1.5"><span>•</span><span>${r}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
      
      <div class="p-4 pt-0">
        <button onclick="openExerciseModal('${ex.id}')" class="w-full py-2 rounded-xl bg-teal-600/80 hover:bg-teal-500 text-white font-bold text-xs transition-colors">
          View Detailed Form Guide ➔
        </button>
      </div>
    </div>
  `).join('');
}

const PREGNANCY_DANGER_PHOTOS = [
  "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80", // Supine
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80", // Jumping & burpees
  "https://images.unsplash.com/photo-1534368959876-26bf04f2c947?w=600&auto=format&fit=crop&q=80", // Heavy lifting
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80", // Hot yoga
  "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&auto=format&fit=crop&q=80"  // Contact sports
];

function renderPregnancyDangerousExercises() {
  const container = document.getElementById('pregnancy-avoid-exercises-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.pregnancyCare.dangerousExercisesToAvoid.map((de, idx) => {
    const photo = PREGNANCY_DANGER_PHOTOS[idx] || PREGNANCY_DANGER_PHOTOS[0];
    return `
    <div class="p-4 rounded-2xl bg-slate-950/70 border border-rose-500/40 flex flex-col sm:flex-row gap-4 items-start overflow-hidden">
      <div class="relative w-full sm:w-32 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-rose-500/30">
        <img src="${photo}" alt="${de.name}" class="w-full h-full object-cover grayscale contrast-125" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600&auto=format&fit=crop&q=80';" />
        <div class="absolute inset-0 bg-rose-950/40 mix-blend-multiply"></div>
        <span class="absolute top-1 left-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-600 text-white shadow">
          ⛔ AVOID
        </span>
      </div>
      <div class="flex-1">
        <h4 class="text-sm font-extrabold text-rose-400 mb-1 flex items-center gap-1.5">
          <span>⚠️</span> <span>${de.name}</span>
        </h4>
        <p class="text-xs text-slate-300 leading-relaxed mb-2">${de.danger}</p>
        <span class="text-[11px] text-teal-300 font-semibold p-1.5 rounded-lg bg-teal-950/30 border border-teal-500/20 block">
          ✓ Safe Alternative: ${de.alternatives}
        </span>
      </div>
    </div>
    `;
  }).join('');
}

function renderPregnancyFoodAdvantages() {
  const container = document.getElementById('pregnancy-food-advantages-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.pregnancyCare.maternalNutritionAdvantages.map(ma => `
    <div class="p-3.5 rounded-xl bg-slate-900/90 border border-teal-500/30">
      <div class="flex items-center justify-between mb-1">
        <h5 class="text-xs font-extrabold text-white">${ma.nutrient}</h5>
      </div>
      <p class="text-xs text-slate-300 leading-relaxed mb-1.5">${ma.benefit}</p>
      <span class="text-[10px] text-teal-300 block">Top Sources: ${ma.sources}</span>
    </div>
  `).join('');
}

function renderPregnancyFoodDisadvantages() {
  const container = document.getElementById('pregnancy-food-disadvantages-container');
  if (!container || !FIT_DATA.womenHealth) return;

  container.innerHTML = FIT_DATA.womenHealth.pregnancyCare.maternalNutritionDisadvantages.map(md => `
    <div class="p-3.5 rounded-xl bg-slate-900/90 border border-rose-500/30">
      <h5 class="text-xs font-extrabold text-rose-400 mb-1">${md.food}</h5>
      <p class="text-xs text-slate-300 leading-relaxed mb-1">${md.harm}</p>
      <span class="text-[10px] text-slate-400 block font-medium">Medical Rule: ${md.precaution}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   DISEASE MANAGEMENT & DIETARY CURES ENGINE
   ========================================================================== */
let activeDiseaseId = "diabetes";

function initDiseasesPage() {
  renderDiseaseTabs();
  renderDiseaseDetail(activeDiseaseId);
}

function renderDiseaseTabs() {
  const container = document.getElementById('disease-tab-buttons');
  if (!container || !FIT_DATA.diseases) return;

  container.innerHTML = FIT_DATA.diseases.map(d => {
    const isActive = d.id === activeDiseaseId;
    const btnClass = isActive 
      ? 'bg-amber-500 text-slate-950 font-bold shadow-lg scale-105' 
      : 'bg-slate-800 text-slate-300 hover:text-white border border-slate-700';
    return `
      <button onclick="selectDisease('${d.id}')" class="px-4 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${btnClass} cursor-pointer">
        <span>${d.icon || '🩺'}</span>
        <span>${d.name.split('(')[0].trim()}</span>
      </button>
    `;
  }).join('');
}

function selectDisease(id) {
  activeDiseaseId = id;
  renderDiseaseTabs();
  renderDiseaseDetail(id);
}

const DISEASE_LIFESTYLE_PHOTOS = {
  "diabetes": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80",
  "hypertension": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
  "cholesterol": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&auto=format&fit=crop&q=80",
  "thyroid": "https://images.unsplash.com/photo-1583454155184-870a1f63aebc?w=700&auto=format&fit=crop&q=80",
  "fatty-liver": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
  "anemia": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80"
};

const DIET_GENDER_PHOTOS = {
  "men": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80",
  "women": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80"
};

function renderDiseaseDetail(id) {
  const container = document.getElementById('disease-detail-display');
  if (!container || !FIT_DATA.diseases) return;

  const d = FIT_DATA.diseases.find(item => item.id === id) || FIT_DATA.diseases[0];
  if (!d) return;

  container.innerHTML = `
    <div class="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 shadow-2xl space-y-8">
      
      <!-- Disease Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span class="text-2xl">${d.icon || '🩺'}</span>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              ${d.category} Health
            </span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">${d.name}</h2>
          <p class="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">${d.overview}</p>
        </div>
      </div>

      <!-- Gender Differences: Males vs. Females -->
      <div>
        <h3 class="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
          <span>⚖️</span> Biological Gender Differences & Manifestations
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 rounded-xl bg-slate-950/70 border border-teal-500/30">
            <span class="text-xs font-bold text-teal-400 block mb-1">👨 In Males:</span>
            <p class="text-xs text-slate-300 leading-relaxed">${d.genderAspects.males}</p>
          </div>
          <div class="p-4 rounded-xl bg-slate-950/70 border border-pink-500/30">
            <span class="text-xs font-bold text-pink-400 block mb-1">👩 In Females:</span>
            <p class="text-xs text-slate-300 leading-relaxed">${d.genderAspects.females}</p>
          </div>
        </div>
      </div>

      <!-- Healing Foods (Advantages) vs. Harmful Foods (Disadvantages) -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Healing Foods -->
        <div class="p-5 rounded-xl bg-emerald-950/20 border-2 border-emerald-500/40 space-y-3">
          <h4 class="text-sm font-extrabold text-emerald-400 flex items-center gap-2">
            <span>✨</span> Healing Dietary Superfoods (Advantages)
          </h4>
          <div class="space-y-2.5">
            ${d.healingFoodsAdvantages.map(hf => `
              <div class="p-3 rounded-lg bg-slate-900 border border-emerald-500/20">
                <span class="text-xs font-bold text-white block mb-0.5">${hf.name}</span>
                <p class="text-xs text-slate-300 leading-relaxed">${hf.mechanism}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Harmful Foods -->
        <div class="p-5 rounded-xl bg-rose-950/20 border-2 border-rose-500/40 space-y-3">
          <h4 class="text-sm font-extrabold text-rose-400 flex items-center gap-2">
            <span>⚠️</span> Harmful Foods to Strictly Avoid (Disadvantages)
          </h4>
          <div class="space-y-2.5">
            ${d.harmfulFoodsDisadvantages.map(hfd => `
              <div class="p-3 rounded-lg bg-slate-900 border border-rose-500/20">
                <span class="text-xs font-bold text-white block mb-0.5">${hfd.name}</span>
                <p class="text-xs text-slate-300 leading-relaxed">${hfd.reason}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Clinical Medicines Overview -->
      <div class="p-5 rounded-xl bg-slate-950/80 border border-slate-700/80 space-y-3">
        <div class="flex items-center justify-between pb-2 border-b border-slate-800">
          <h4 class="text-sm font-extrabold text-amber-400 flex items-center gap-2">
            <span>💊</span> Standard Clinical Medicines & Pharmacology Overview
          </h4>
          <span class="text-[10px] text-slate-400">Educational reference • Consult physician</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${d.clinicalMedicinesOverview.map(med => `
            <div class="p-3 rounded-lg bg-slate-900 border border-slate-800">
              <span class="text-xs font-bold text-white block mb-1">${med.medicine}</span>
              <p class="text-xs text-slate-400 leading-relaxed">${med.function}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Lifestyle & Exercise Cure with Visual Photo Preview -->
      <div class="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center gap-5">
        <div class="relative w-full sm:w-44 h-32 shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-emerald-500/30">
          <img src="${DISEASE_LIFESTYLE_PHOTOS[d.id] || DISEASE_LIFESTYLE_PHOTOS['diabetes']}" alt="${d.name} Lifestyle Cure" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <span class="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950 shadow">
            🏃 Exercise Therapy
          </span>
        </div>
        <div>
          <h5 class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <span>✨</span> <span>Non-Pharmaceutical Lifestyle & Exercise Cure</span>
          </h5>
          <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">${d.lifestyleCure}</p>
        </div>
      </div>

    </div>
  `;
}

/* ==========================================================================
   HEALTHY BALANCED DIETS ENGINE (FOR BOTH MEN & WOMEN)
   ========================================================================== */
let activeDietGender = "men";

function initHealthyDietPage() {
  renderGenderMatrixTable();
  renderDietPlan(activeDietGender);
}

function renderGenderMatrixTable() {
  const tbody = document.getElementById('gender-matrix-table-body');
  if (!tbody || !FIT_DATA.healthyDiets) return;

  tbody.innerHTML = FIT_DATA.healthyDiets.genderMatrix.map(row => `
    <tr class="hover:bg-slate-850/60 transition-colors">
      <td class="py-3 px-4 font-bold text-white">${row.nutrient}</td>
      <td class="py-3 px-4 text-teal-300">${row.men}</td>
      <td class="py-3 px-4 text-pink-300">${row.women}</td>
    </tr>
  `).join('');
}

function switchDietPlan(gender) {
  activeDietGender = gender;
  const btnMen = document.getElementById('btn-diet-men');
  const btnWomen = document.getElementById('btn-diet-women');

  if (gender === 'men') {
    if (btnMen) btnMen.className = "px-6 py-3 rounded-xl bg-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer";
    if (btnWomen) btnWomen.className = "px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer";
  } else {
    if (btnMen) btnMen.className = "px-6 py-3 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all flex items-center gap-2 cursor-pointer";
    if (btnWomen) btnWomen.className = "px-6 py-3 rounded-xl bg-pink-600 text-white font-bold text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer";
  }

  renderDietPlan(gender);
}

function renderDietPlan(gender) {
  const container = document.getElementById('diet-plan-display');
  if (!container || !FIT_DATA.healthyDiets) return;

  const plan = FIT_DATA.healthyDiets.plans[gender];
  if (!plan) return;

  const colorBorder = gender === 'men' ? 'border-teal-500/40' : 'border-pink-500/40';
  const colorBadge = gender === 'men' ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-pink-500/20 text-pink-300 border-pink-500/30';
  const dietPhoto = DIET_GENDER_PHOTOS[gender] || DIET_GENDER_PHOTOS['men'];

  container.innerHTML = `
    <div class="fit-card p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border ${colorBorder} shadow-2xl space-y-8">
      
      <!-- Plan Banner with Photo Preview -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-700 bg-slate-950 shadow-md">
            <img src="${dietPhoto}" alt="${plan.title}" class="w-full h-full object-cover" loading="lazy" />
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${colorBadge} border mb-1.5 inline-block">
              Full 24-Hour Schedule
            </span>
            <h2 class="text-2xl sm:text-3xl font-black text-white font-heading">${plan.title}</h2>
            <p class="text-xs text-slate-300 mt-0.5">${plan.goal}</p>
          </div>
        </div>
        <div class="text-right sm:text-right text-xs font-mono font-bold text-emerald-400 bg-slate-950 p-3 rounded-xl border border-slate-800 self-stretch md:self-auto flex items-center justify-center">
          ${plan.caloricRange}
        </div>
      </div>

      <!-- 7 Meals Timeline Grid -->
      <div class="space-y-4">
        ${plan.meals.map((meal, idx) => `
          <div class="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div class="shrink-0 w-full md:w-56">
              <span class="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold block w-fit mb-1">
                ${meal.time}
              </span>
              <h3 class="text-sm font-extrabold text-white">Meal ${idx + 1}: ${meal.name}</h3>
            </div>

            <div class="flex-1 space-y-2">
              ${meal.menuVeg ? `
                <div class="p-3 rounded-xl bg-slate-900 border border-emerald-500/20 text-xs">
                  <span class="text-emerald-400 font-bold block mb-1">🌱 Vegetarian Option:</span>
                  <p class="text-slate-300 leading-relaxed">${meal.menuVeg}</p>
                </div>
              ` : ''}

              ${meal.menuNonVeg ? `
                <div class="p-3 rounded-xl bg-slate-900 border border-teal-500/20 text-xs">
                  <span class="text-teal-400 font-bold block mb-1">🍗 Non-Vegetarian Option:</span>
                  <p class="text-slate-300 leading-relaxed">${meal.menuNonVeg}</p>
                </div>
              ` : ''}

              ${meal.menu ? `
                <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                  <span class="text-amber-400 font-bold block mb-1">⚡ Nutrient Power:</span>
                  <p class="text-slate-300 leading-relaxed">${meal.menu}</p>
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

    </div>
  `;
}


// Global exposure for Women Health, Diseases, and Diet
window.switchWomenTab = switchWomenTab;
window.selectDisease = selectDisease;
window.switchDietPlan = switchDietPlan;
window.initWomenHealthPage = initWomenHealthPage;
window.initDiseasesPage = initDiseasesPage;
window.initHealthyDietPage = initHealthyDietPage;

/* ==========================================================================
   FitBot AI Coach - 24/7 Intelligent Fitness & Health Chatbot Engine
   ========================================================================== */

const FITBOT_DEFAULT_WELCOME = {
  sender: 'bot',
  text: `### 👋 Hi! I'm FitBot AI Coach
Your 24/7 intelligent health, fitness, and nutrition assistant on **FitGuide**.

I provide verified scientific answers across all our fitness and wellness topics:

• 🌸 **Women's Health**: Healthy cycle length (21–35 days), 4 hormonal phases, PMS relief foods & precautions.
• 🤰 **Pregnancy Care**: 6 safe exercises (Kegels, walking, wall squats), labor benefits, and hazardous foods to avoid (unripe papaya, pineapple).
• 📏 **Height Growth**: Spinal decompression exercises (dead hangs, cobra stretch), growth plate science, and macro/micronutrients.
• 🩺 **Disease Management**: Healing foods and clinical medicines for Diabetes, High BP, Thyroid, Fatty Liver & Anemia.
• 🥗 **Balanced Daily Diets**: Complete 24-hr schedules for Men (2,200–2,500 kcal) and Women (1,800–2,000 kcal).
• 💪 **Muscle Workouts**: Proper form, sets, reps & common mistakes for chest, back, biceps, legs & core.
• 📍 **Local Gyms**: Find gyms in Sheelanagar, Gajuwaka, and Vizag with live map links.

*Click any quick chip below or ask me any question!*`,
  actions: [
    { label: "🌸 Women's Hub", tab: "women" },
    { label: "📏 Height Guide", tab: "height" },
    { label: "🩺 Disease Cures", tab: "diseases" },
    { label: "🥗 Daily Diets", tab: "diet" },
    { label: "📍 Local Gyms", tab: "gyms" }
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

const FitBotState = {
  isOpen: false,
  isRecording: false,
  recognition: null,
  apiKey: localStorage.getItem('fitguide_gemini_key') || '',
  chatHistory: JSON.parse(localStorage.getItem('fitguide_chat_history') || 'null') || [FITBOT_DEFAULT_WELCOME]
};

function initFitBot() {
  renderFitBotMessages();
  updateFitBotEngineBadge();

  // Initialize Speech Recognition if supported
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    try {
      FitBotState.recognition = new SpeechRecognition();
      FitBotState.recognition.continuous = false;
      FitBotState.recognition.interimResults = false;
      FitBotState.recognition.lang = 'en-US';

      FitBotState.recognition.onstart = () => {
        FitBotState.isRecording = true;
        const micBtn = document.getElementById('fitbot-mic-btn');
        if (micBtn) micBtn.classList.add('recording');
        showToast('FitBot is listening... Speak now 🎙️', 'info');
      };

      FitBotState.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const inputField = document.getElementById('fitbot-input-field');
        if (inputField) {
          inputField.value = transcript;
          handleFitBotSend(transcript);
        }
      };

      FitBotState.recognition.onerror = () => {
        FitBotState.isRecording = false;
        const micBtn = document.getElementById('fitbot-mic-btn');
        if (micBtn) micBtn.classList.remove('recording');
      };

      FitBotState.recognition.onend = () => {
        FitBotState.isRecording = false;
        const micBtn = document.getElementById('fitbot-mic-btn');
        if (micBtn) micBtn.classList.remove('recording');
      };
    } catch (e) {
      console.warn('Speech recognition initialization error:', e);
    }
  }

  // Pre-fill API key input if already set
  const apiKeyInput = document.getElementById('fitbot-api-key-input');
  if (apiKeyInput && FitBotState.apiKey) {
    apiKeyInput.value = FitBotState.apiKey;
  }
}

function toggleFitBot() {
  if (FitBotState.isOpen) {
    closeFitBot();
  } else {
    openFitBot();
  }
}

function openFitBot() {
  const windowEl = document.getElementById('fitbot-chat-window');
  if (!windowEl) return;
  windowEl.classList.remove('hidden');
  FitBotState.isOpen = true;
  scrollFitBotToBottom();

  setTimeout(() => {
    const inputField = document.getElementById('fitbot-input-field');
    if (inputField) inputField.focus();
  }, 150);
}

function closeFitBot() {
  const windowEl = document.getElementById('fitbot-chat-window');
  if (!windowEl) return;
  windowEl.classList.add('hidden');
  FitBotState.isOpen = false;
}

function toggleFitBotSettings() {
  const panel = document.getElementById('fitbot-settings-panel');
  if (panel) {
    panel.classList.toggle('hidden');
  }
}

function saveFitBotApiKey() {
  const apiKeyInput = document.getElementById('fitbot-api-key-input');
  const key = (apiKeyInput?.value || '').trim();
  FitBotState.apiKey = key;
  if (key) {
    localStorage.setItem('fitguide_gemini_key', key);
    showToast('Custom Gemini API Key saved! ⚡', 'success');
  } else {
    localStorage.removeItem('fitguide_gemini_key');
    showToast('Cleared custom API key. Using built-in engine.', 'info');
  }
  updateFitBotEngineBadge();
  toggleFitBotSettings();
}

function removeFitBotApiKey() {
  FitBotState.apiKey = '';
  localStorage.removeItem('fitguide_gemini_key');
  const apiKeyInput = document.getElementById('fitbot-api-key-input');
  if (apiKeyInput) apiKeyInput.value = '';
  updateFitBotEngineBadge();
  showToast('Switched to built-in FitGuide knowledge engine.', 'info');
}

function updateFitBotEngineBadge() {
  const badge = document.getElementById('fitbot-engine-mode-badge');
  const statusText = document.getElementById('fitbot-status-text');
  if (FitBotState.apiKey) {
    if (badge) {
      badge.textContent = 'Gemini 1.5 Flash Connected';
      badge.className = 'text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30';
    }
    if (statusText) {
      statusText.textContent = 'Online • Gemini AI & FitGuide Intelligence';
    }
  } else {
    if (badge) {
      badge.textContent = 'Built-in Knowledge Engine';
      badge.className = 'text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30';
    }
    if (statusText) {
      statusText.textContent = 'Online • Scientific Health & Workout AI';
    }
  }
}

function clearFitBotHistory() {
  FitBotState.chatHistory = [FITBOT_DEFAULT_WELCOME];
  localStorage.setItem('fitguide_chat_history', JSON.stringify(FitBotState.chatHistory));
  renderFitBotMessages();
  showToast('Chat history cleared. ↺', 'info');
}

function askFitBotPrompt(promptText) {
  openFitBot();
  const inputField = document.getElementById('fitbot-input-field');
  if (inputField) {
    inputField.value = promptText;
  }
  handleFitBotSend(promptText);
}

function handleFitBotSubmit(event) {
  if (event) event.preventDefault();
  const inputField = document.getElementById('fitbot-input-field');
  const query = (inputField?.value || '').trim();
  if (!query) return;
  inputField.value = '';
  handleFitBotSend(query);
}

function toggleFitBotVoiceInput() {
  if (!FitBotState.recognition) {
    showToast('Voice dictation is not supported by your browser.', 'info');
    return;
  }
  if (FitBotState.isRecording) {
    FitBotState.recognition.stop();
  } else {
    try {
      FitBotState.recognition.start();
    } catch (e) {
      console.warn('Speech recognition start failed:', e);
    }
  }
}

function scrollFitBotToBottom() {
  const container = document.getElementById('fitbot-messages-container');
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}

function renderFitBotMessages() {
  const container = document.getElementById('fitbot-messages-container');
  if (!container) return;

  container.innerHTML = FitBotState.chatHistory.map((msg, idx) => {
    const isUser = msg.sender === 'user';
    const formattedBody = isUser ? escapeHtml(msg.text) : formatFitBotMarkdown(msg.text);

    let actionsHtml = '';
    if (!isUser && msg.actions && msg.actions.length > 0) {
      actionsHtml = `
        <div class="fitbot-actions-row">
          ${msg.actions.map(act => {
            if (act.tab) {
              return `<button onclick="closeFitBot(); navigateToTab('${act.tab}');" class="fitbot-btn-action">${act.label} ➔</button>`;
            } else if (act.url) {
              return `<a href="${act.url}" target="_blank" rel="noopener noreferrer" class="fitbot-btn-action">${act.label} ➔</a>`;
            } else if (act.onclick) {
              return `<button onclick="${act.onclick}" class="fitbot-btn-action">${act.label}</button>`;
            }
            return '';
          }).join('')}
        </div>
      `;
    }

    return `
      <div class="fitbot-msg ${isUser ? 'fitbot-msg-user' : 'fitbot-msg-bot'}">
        <div class="fitbot-bubble">
          ${formattedBody}
          ${actionsHtml}
        </div>
        <span class="fitbot-time">${msg.timestamp || ''}</span>
      </div>
    `;
  }).join('');

  scrollFitBotToBottom();
}

function formatFitBotMarkdown(text) {
  if (!text) return '';
  let html = text;

  // Escape basic HTML tags to avoid XSS while allowing formatting
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers (### Header)
  html = html.replace(/^### (.*$)/gim, '<h4 class="font-extrabold text-sm text-purple-400 mb-1">$1</h4>');
  html = html.replace(/^## (.*$)/gim, '<h4 class="font-extrabold text-sm text-purple-300 mb-1">$1</h4>');

  // Bold (**bold**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');

  // Italics (*italic*)
  html = html.replace(/\*(.*?)\*/g, '<em class="text-slate-300">$1</em>');

  // Unordered list items (• or -)
  html = html.replace(/^[\s]*[•\-]\s+(.*$)/gim, '<li class="my-0.5">$1</li>');

  // Wrap loose <li> in <ul>
  html = html.replace(/(<li class="my-0.5">.*<\/li>)/gms, '<ul class="space-y-1 my-1.5">$1</ul>');

  // Line breaks to <br>
  html = html.replace(/\n/g, '<br>');

  // Clean up excess <br> around <ul> and <h4>
  html = html.replace(/<br><ul/g, '<ul').replace(/<\/ul><br>/g, '</ul>');
  html = html.replace(/<br><h4/g, '<h4').replace(/<\/h4><br>/g, '</h4>');

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function handleFitBotSend(queryText) {
  const trimmed = queryText.trim();
  if (!trimmed) return;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Add user message
  const userMsg = {
    sender: 'user',
    text: trimmed,
    timestamp: nowTime
  };
  FitBotState.chatHistory.push(userMsg);
  renderFitBotMessages();

  // 2. Render typing indicator
  const container = document.getElementById('fitbot-messages-container');
  const typingId = 'fitbot-typing-' + Date.now();
  if (container) {
    const typingEl = document.createElement('div');
    typingEl.id = typingId;
    typingEl.className = 'fitbot-msg fitbot-msg-bot';
    typingEl.innerHTML = `
      <div class="fitbot-typing-indicator">
        <span class="fitbot-typing-dot"></span>
        <span class="fitbot-typing-dot"></span>
        <span class="fitbot-typing-dot"></span>
      </div>
    `;
    container.appendChild(typingEl);
    scrollFitBotToBottom();
  }

  // 3. Generate response
  let botReply = null;

  // If Gemini API Key is configured, try live LLM query first
  if (FitBotState.apiKey) {
    try {
      botReply = await generateFitBotGeminiResponse(trimmed, FitBotState.apiKey);
    } catch (err) {
      console.warn('Gemini API call failed, falling back to built-in knowledge engine:', err);
      botReply = generateFitBotBuiltInResponse(trimmed);
      botReply.text = `*(Switched to FitGuide Built-in Knowledge Engine)*\n\n` + botReply.text;
    }
  }

  // If no API key or Gemini wasn't used, run built-in knowledge engine
  if (!botReply) {
    // Add realistic 450ms human-like thinking delay
    await new Promise(r => setTimeout(r, 450));
    botReply = generateFitBotBuiltInResponse(trimmed);
  }

  // 4. Remove typing indicator
  const typingEl = document.getElementById(typingId);
  if (typingEl) typingEl.remove();

  // 5. Append bot message
  botReply.sender = 'bot';
  botReply.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  FitBotState.chatHistory.push(botReply);

  // 6. Save history to localStorage
  localStorage.setItem('fitguide_chat_history', JSON.stringify(FitBotState.chatHistory));

  // 7. Render UI
  renderFitBotMessages();
}

async function generateFitBotGeminiResponse(prompt, apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const systemInstruction = `You are FitBot AI, the friendly, evidence-based fitness, anatomy, and nutrition coach for the FitGuide platform (lead trainer: Venkatesh Vemula, +91 9014430474, venkateshvemula8897@gmail.com, live link: https://fitguidecom.netlify.app/). 
You provide scientific, practical, and compassionate fitness, workout, menstrual cycle, pregnancy nutrition, and disease dietary guidance. Always note general educational disclaimers where appropriate. Format answers with clear bold headers, emojis, and bullet points.`;

  const requestBody = {
    contents: [
      {
        parts: [
          { text: systemInstruction + "\n\nUser Question: " + prompt }
        ]
      }
    ],
    generationConfig: {
      maxOutputTokens: 600,
      temperature: 0.7
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) throw new Error('Empty Gemini response');

  return {
    text: textOutput,
    actions: [
      { label: "🌸 Women's Hub", tab: "women" },
      { label: "🩺 Disease Cures", tab: "diseases" },
      { label: "🥗 Daily Diets", tab: "diet" },
      { label: "📏 Height Guide", tab: "height" }
    ]
  };
}

/* ==========================================================================
   FitBot AI Built-in Knowledge & Intent Matching Engine
   ========================================================================== */
function generateFitBotBuiltInResponse(rawQuery) {
  const query = rawQuery.toLowerCase().trim();
  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanQ = normalize(query);

  // Helper matching functions
  const has = (...words) => words.some(w => query.includes(w) || cleanQ.includes(normalize(w)));

  // -------------------------------------------------------------------------
  // 1. GREETINGS & INTRODUCTIONS
  // -------------------------------------------------------------------------
  if (has('hello', 'hi', 'hey', 'namaste', 'morning', 'evening', 'who are you', 'what can you do', 'help')) {
    return {
      text: `### ⚡ Hello Athlete! I'm FitBot AI Coach
I'm your 24/7 intelligent health and workout companion on **FitGuide**.

**Here are key areas I specialize in:**
• 🌸 **Women's Health**: Healthy menstrual cycle duration (21–35 days), 4 phases, PMS relief foods & precautions.
• 🤰 **Pregnancy Care**: 6 safe exercises (Kegels, walking, wall squats), labor benefits, and hazardous foods to avoid.
• 📏 **Height Growth**: Spinal decompression workouts (dead hangs, cobra stretch), growth plate science & essential nutrients.
• 🩺 **Disease Cures & Medicines**: Healing diets and clinical drugs for Diabetes, High BP, Thyroid, Fatty Liver & Anemia.
• 🥗 **Balanced Daily Diets**: 7-meal 24-hr schedules for Men (2,200–2,500 kcal) and Women (1,800–2,000 kcal).
• 💪 **Muscle Workouts**: Sets, reps, and form instructions for chest, back, biceps, legs & core.
• 📍 **Local Gyms**: Find gyms in Sheelanagar, Gajuwaka, and Vizag with live map directions.

What would you like to achieve today?`,
      actions: [
        { label: "🌸 Women's Health", tab: "women" },
        { label: "📏 Height Growth", tab: "height" },
        { label: "🩺 Disease Cures", tab: "diseases" },
        { label: "🥗 Daily Diets", tab: "diet" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 2. WOMEN'S HEALTH: MENSTRUAL / MATURE CYCLE, PHASES, PRECAUTIONS, FOODS
  // -------------------------------------------------------------------------
  if (has('cycle', 'period', 'mature cycle', 'menstrua', 'menses', 'cramp', 'pms', 'bleeding', 'pad', 'follicular', 'luteal', 'ovulat')) {
    return {
      text: `### 🌸 Mature Menstrual Cycle & Hormone Health Guide

**1. Healthy Duration & Characteristics:**
• **Normal Cycle Length**: **21 to 35 days** (average 28 days from Day 1 to the next period).
• **Menstrual Bleeding**: Typically **3 to 7 days**.
• **Normal Fluid Loss**: **30 to 80 mL** throughout the period.

**2. The 4 Hormonal Cycle Phases:**
• **Menstrual Phase (Days 1–5)**: Estrogen & progesterone drop; uterine shedding occurs. Rest, warm hydration, and gentle walks are ideal.
• **Follicular Phase (Days 1–13)**: FSH stimulates follicle maturation; estrogen rises, boosting energy. Optimal time for strength training!
• **Ovulatory Phase (Day 14)**: LH surge triggers egg release; peak strength, energy, and metabolism.
• **Luteal Phase (Days 15–28)**: Progesterone peaks. Focus on magnesium and complex carbs to avoid PMS cramps, bloating, and fatigue.

**3. Food Advantages (Foods to Boost):**
• **Iron & Folate**: Spinach, lentils, drumstick leaves, beetroot (replenishes red blood cells).
• **Magnesium**: Pumpkin seeds, dark chocolate, almonds (relaxes uterine smooth muscle cramps).
• **Omega-3 Fatty Acids**: Walnuts, chia seeds, flaxseeds (suppresses inflammatory prostaglandins).
• **Fresh Ginger & Chamomile Tea**: Clinically proven to reduce menstrual pain intensity as effectively as mild ibuprofen.

**4. Food Disadvantages (Foods to Avoid):**
• **High-Sodium Foods**: Salty snacks and chips aggravate fluid retention, breast tenderness, and bloating.
• **Refined Sugars & Maida**: Triggers insulin spikes followed by sharp energy crashes and mood swings.
• **Excess Caffeine (>2 cups/day)**: Constricts pelvic blood vessels and increases cortisol.

**5. Critical Precautions:**
• Change sanitary pads every 4–6 hours to prevent toxic bacterial proliferation.
• Use a warm water bottle or heating pad on the lower abdomen to ease cramps.
• Consult a gynecologist if cycles are under 21 days, over 35 days, or pain stops daily function.`,
      actions: [
        { label: "🌸 Open Women's Hub", tab: "women" },
        { label: "🥗 Women's Daily Diet", tab: "diet" },
        { label: "💬 Ask on WhatsApp", url: "https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20question%20about%20menstrual%20cycle%20health" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 3. PREGNANCY: SAFE EXERCISES, ADVANTAGES, DISADVANTAGES & FOODS
  // -------------------------------------------------------------------------
  if (has('pregnant', 'pregnancy', 'expecting', 'kegel', 'papaya', 'pineapple', 'baby', 'labor', 'delivery', 'prenatal', 'trimester')) {
    return {
      text: `### 🤰 Complete Pregnancy Fitness & Maternal Nutrition Guide

**1. 6 Recommended Safe Exercises:**
• **Kegel Pelvic Contractions**: 3 sets of 10 contractions daily. Strengthens pelvic floor, accelerates postpartum recovery, and prevents urinary incontinence.
• **Brisk Walking (20–30 min/day)**: Maintains cardiovascular endurance, stabilizes gestational blood sugar, and assists fetal positioning.
• **Cat-Cow Gentle Spinal Stretch**: Relieves lower back compression, opens the pelvic girdle, and relaxes spinal extensors.
• **Wall Support Squats**: Builds quadriceps and hip strength essential for active labor endurance.
• **Seated Butterfly Stretch**: Mobilizes pelvic adductors and relieves inner groin tension.
• **Side-Lying Leg Lifts**: Strengthens gluteus medius without putting pressure on the abdominal vena cava.

**2. Dangerous Exercises to Strictly Avoid:**
• **Supine Exercises (Lying flat on back after 16 weeks)**: Compresses the inferior vena cava, decreasing cardiac return and oxygen flow to the baby.
• **High-Impact Jumping, Burpees & Heavy Maximal Lifts**: Valsalva breath-holding increases intra-abdominal pressure.
• **Hot Yoga / Extreme Heat**: High maternal body temperature risks fetal neural tube complications.

**3. Maternal Nutrition Advantages (Foods to Eat):**
• **Folate / Folic Acid (400–600 mcg/day)**: Spinach, lentils, fortified grains (prevents neural tube defects).
• **Elemental Iron (27 mg/day)**: Expands maternal blood volume and prevents gestational anemia.
• **Calcium (1,000–1,200 mg/day)**: Milk, paneer, ragi, sesame seeds (builds fetal bones and teeth).
• **Omega-3 DHA & Choline**: Walnuts, eggs, flaxseed (fetal brain and eye development).

**4. Foods to Strictly Avoid (Hazardous Disadvantages):**
• **Unripe or Semi-Ripe Green Papaya**: Contains concentrated latex and papain enzymes that trigger uterine contractions and potential miscarriage. *(Fully ripe yellow papaya in tiny amounts is usually safe, but unripe is strictly forbidden).*
• **Excess Raw Pineapple**: Contains bromelain enzyme which softens the cervix; avoid in large quantities in early trimesters.
• **Unpasteurized Milk & Soft Cheeses**: High risk of Listeria bacterial infection.
• **Raw or Undercooked Eggs / Poultry / Fish**: Salmonella and toxoplasmosis hazards.`,
      actions: [
        { label: "🌸 Open Pregnancy Hub", tab: "women" },
        { label: "🥗 Women's Diet Plan", tab: "diet" },
        { label: "💬 Chat on WhatsApp", url: "https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20pregnancy%20fitness%20question" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 4. HEIGHT GROWTH, SPINAL DECOMPRESSION & NUTRITION
  // -------------------------------------------------------------------------
  if (has('height', 'taller', 'grow tall', 'growth', 'decompression', 'dead hang', 'growth plate', 'posture', 'cobra stretch', 'pelvic bridge')) {
    return {
      text: `### 📏 Scientific Height Growth & Spinal Decompression Guide

**1. The Science of Height Potential:**
• **Growth Plates (Epiphyses)**: Prior to growth plate fusion (ages 14–21), deep REM sleep triggers Human Growth Hormone (HGH) release, while bone minerals build new longitudinal bone matrix.
• **Adult Postural Decompression**: After growth plates fuse, spinal discs compress due to gravity and slouching. Decompressing the spine and correcting anterior pelvic tilt can safely unlock **1 to 3 inches of natural upright height**!

**2. Top 5 Spinal Decompression Exercises:**
• **Dead Hangs (Pull-up Bar)**: 3 sets of 30–60 seconds daily. Gravity creates negative disc pressure, restoring intervertebral hydration.
• **Cobra Stretch (Bhujangasana)**: 3 sets of 30 seconds. Reverses thoracic slouching, elongating the anterior abdominal wall.
• **Pelvic Bridges**: 3 sets of 15 reps. Strengthens gluteus maximus and corrects forward pelvic tilt.
• **Wall Alignment Stretch**: 3 minutes daily with head, shoulder blades, glutes, and heels touching a flat wall.
• **Swimming / Inversion**: Eliminates axial compressive load along the vertebral column.

**3. Nutritional Formula for Height:**
• **Protein (1.6–2.0g/kg bodyweight)**: Essential amino acids for bone remodeling (eggs, paneer, chicken, whey, lentils).
• **Vitamin D3 (1,000–2,000 IU/day)**: Essential for intestinal calcium absorption.
• **Vitamin K2 (MK-7, 75–100 mcg)**: Directs absorbed calcium into bones instead of arterial walls.
• **Calcium (1,000–1,200 mg/day)** & **Zinc/Iron**: Essential cofactors for cellular division and bone density.
• **Deep Sleep (8–9 hours)**: Over 70% of human growth hormone (HGH) is synthesized during deep slow-wave sleep.`,
      actions: [
        { label: "📏 Open Height Hub", tab: "height" },
        { label: "🍳 High Protein Foods", tab: "foods" },
        { label: "📊 Calculate Daily Macros", tab: "calculator" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 5. DISEASES: DIABETES, HYPERTENSION, THYROID, FATTY LIVER, ANEMIA, CHOLESTEROL
  // -------------------------------------------------------------------------
  if (has('disease', 'diabetes', 'sugar', 'metformin', 'bp', 'blood pressure', 'hypertension', 'cholesterol', 'statin', 'thyroid', 'levothyroxine', 'fatty liver', 'anemia', 'iron deficiency', 'medicine', 'cure')) {
    // Specific disease sub-checks
    if (has('diabetes', 'sugar', 'metformin', 'glucose', 'insulin')) {
      return {
        text: `### 🩺 Type 2 Diabetes Management & Dietary Therapy

**1. Healing Foods (Advantages):**
• **Bitter Gourd (Karela)**: Contains polypeptide-p and charantin which mimic insulin action.
• **Fenugreek (Methi) Seeds**: Soaked in water overnight; slows carbohydrate digestion and glucose spikes.
• **Ceylon Cinnamon (Dalchini)**: Enhances cellular insulin receptor sensitivity.
• **Complex Millets & Leafy Greens**: High soluble fiber blunts post-prandial glycemic spikes.

**2. Harmful Foods to Avoid (Disadvantages):**
• Refined white sugar, syrups, sweets, sodas, and packed fruit juices.
• Refined flours (maida), white bread, instant noodles, and deep-fried snacks.

**3. Clinical Medicines Overview (Always consult doctor):**
• **Metformin (500–1000 mg)**: First-line biguanide; reduces liver glucose output and improves insulin sensitivity.
• **Sulfonylureas (Glimepiride/Glipizide)**: Stimulates pancreatic beta-cells to secrete insulin.
• **DPP-4 Inhibitors (Sitagliptin/Vildagliptin)** & **SGLT2 Inhibitors (Dapagliflozin)**: Lowers blood glucose via renal excretion.

**4. Lifestyle Cures:**
• 30 minutes of daily brisk walking + 3 days/week resistance training (muscle contractions draw in glucose without needing excess insulin).`,
        actions: [
          { label: "🩺 Open Disease Hub", tab: "diseases" },
          { label: "🥗 Healthy Daily Diets", tab: "diet" }
        ]
      };
    }

    if (has('bp', 'blood pressure', 'hypertension', 'telmisartan', 'amlodipine')) {
      return {
        text: `### 🩺 Hypertension (High Blood Pressure) Guide

**1. Healing Foods (Advantages):**
• **Potassium-Rich Foods**: Bananas, tender coconut water, pomegranate (potassium balances intracellular sodium).
• **Raw Garlic**: Contains allicin, which promotes nitric oxide release to dilate blood vessels.
• **Beetroot Juice**: Dietary nitrates convert to nitric oxide, reducing arterial stiffness.
• **Flaxseeds**: Rich in ALA omega-3s, lowering systemic vascular resistance.

**2. Harmful Foods to Avoid (Disadvantages):**
• Excess sodium (>1,500 mg/day limit) from table salt, commercial pickles, papads, and canned soups.
• Processed meats, salty chips, bakery items with trans fats, and excess alcohol.

**3. Clinical Medicines Overview (Consult physician):**
• **Telmisartan / Losartan (20–40 mg)**: Angiotensin II Receptor Blockers (ARBs) that relax blood vessels.
• **Amlodipine (2.5–5 mg)**: Calcium Channel Blocker that relaxes arterial smooth muscles.
• **Enalapril / Ramipril**: ACE inhibitors that prevent angiotensin vasoconstriction.

**4. Lifestyle Cures:**
• DASH diet (Dietary Approaches to Stop Hypertension), 10 minutes of daily deep diaphragm breathing, and daily aerobic exercise.`,
        actions: [
          { label: "🩺 Open Disease Hub", tab: "diseases" },
          { label: "🥗 View Daily Diets", tab: "diet" }
        ]
      };
    }

    if (has('thyroid', 'hypothyroid', 'hyperthyroid', 'levothyroxine', 'thyronorm')) {
      return {
        text: `### 🩺 Thyroid Health & Dietary Guide

**1. Healing Foods (Advantages):**
• **Selenium Sources**: Brazil nuts (1–2/day), sunflower seeds (selenium converts T4 to active T3).
• **Zinc & Iodine**: Pumpkin seeds, eggs, iodized sea salt (essential for thyroid hormone synthesis).
• **Ashwagandha**: Adaptogenic herb proven to balance cortisol and support thyroid function.

**2. Harmful Foods to Avoid (Disadvantages):**
• **Raw Cruciferous Vegetables in Excess**: Cabbage, cauliflower, broccoli contain goitrogens that block iodine uptake. *(Safe when steamed or thoroughly cooked!)*
• **Soy Products within 4 Hours of Medication**: Soy isoflavones can interfere with thyroid hormone absorption.

**3. Clinical Medicines Overview (Physician prescribed):**
• **Levothyroxine Sodium (Thyronorm / Eltroxin, 25–100 mcg)**: Synthetic T4 hormone.
• **Crucial Instruction**: Must be taken strictly on an empty stomach with plain water at least 30–60 minutes before morning tea, coffee, or breakfast!`,
        actions: [
          { label: "🩺 Open Disease Hub", tab: "diseases" },
          { label: "🥗 Daily Diet Plans", tab: "diet" }
        ]
      };
    }

    if (has('anemia', 'iron deficiency', 'hemoglobin', 'hb')) {
      return {
        text: `### 🩺 Anemia & Low Hemoglobin Recovery Guide

**1. Healing Foods (Advantages):**
• **Moringa (Drumstick Leaves) & Spinach**: Exceptional bioavailable non-heme iron and chlorophyll.
• **Beetroot & Pomegranate**: Stimulates red blood cell synthesis.
• **Black Raisins & Medjool Dates**: Soaked overnight; natural iron and copper.
• **Vitamin C Synergy**: Always squeeze fresh lemon on iron-rich meals (Vitamin C increases non-heme iron absorption by up to 300%!).

**2. Critical Saboteurs to Avoid:**
• **Drinking Tea, Coffee, or Milk with Meals**: Tannins, polyphenols, and calcium bind elemental iron in the digestive tract, blocking up to 60% of absorption. Keep a 90-minute gap between meals and tea/coffee.

**3. Clinical Medicines Overview:**
• **Ferrous Ascorbate / Ferrous Fumarate + Folic Acid**: Highly bioavailable oral iron supplements taken with water or citrus juice (avoid taking with milk or antacids).`,
        actions: [
          { label: "🩺 Open Disease Hub", tab: "diseases" },
          { label: "🥑 Iron Rich Foods", tab: "foods" }
        ]
      };
    }

    // General disease overview if no single condition was pinpointed
    return {
      text: `### 🩺 FitGuide Clinical Disease Management Hub

We provide scientific evidence-based dietary therapies, healing foods, and clinical drug overviews for:

• **Type 2 Diabetes**: Low GI millets, bitter gourd, fenugreek, Metformin therapy.
• **Hypertension (High BP)**: Low sodium (<1500mg), potassium-rich coconut water & garlic, Telmisartan & Amlodipine.
• **Thyroid (Hypo/Hyper)**: Selenium, zinc, iodized salt, cooked cruciferous, empty-stomach Levothyroxine.
• **Fatty Liver (NAFLD)**: Black coffee polyphenols, milk thistle, eliminate high-fructose corn syrup, 7–10% weight loss.
• **Anemia / Low Hb**: Moringa, spinach, beetroot + Vitamin C, Ferrous Ascorbate, avoid tea/coffee near meals.
• **High Cholesterol**: Soluble oats fiber, omega-3s, statin therapies, eliminate trans fats.`,
      actions: [
        { label: "🩺 Open Disease Cures", tab: "diseases" },
        { label: "🥗 View Healthy Diets", tab: "diet" },
        { label: "💬 Consult on WhatsApp", url: "https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20health%20and%20diet%20query" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 6. HEALTHY BALANCED DAILY DIETS (MEN & WOMEN 24-HR PLANS)
  // -------------------------------------------------------------------------
  if (has('diet', 'balanced diet', 'meal plan', 'eating plan', 'food plan', 'breakfast', 'lunch', 'dinner', 'schedule', 'calories plan')) {
    return {
      text: `### 🥗 Complete 24-Hour Balanced Daily Diet Schedules

**Men's Balanced Daily Schedule (2,200–2,500 kcal | 130–150g Protein):**
• **7:00 AM (Wake-up)**: Warm lemon water + 6 soaked almonds & 2 walnuts.
• **8:30 AM (Breakfast)**: 3 whole eggs / 100g paneer bhurji + 2 multigrain rotis + green tea.
• **11:30 AM (Mid-Morning)**: Sattu drink (40g) or whey protein shake + 1 fresh apple/banana.
• **1:30 PM (Lunch)**: 150g grilled chicken breast or 1.5 cups thick dal tadka + 1 cup brown rice + cucumber tomato salad.
• **4:30 PM (Evening Snack)**: Roasted chana (50g) + black coffee or buttermilk.
• **7:30 PM (Dinner)**: Paneer tikka or grilled fish + vegetable stir-fry + 1 roti.
• **9:45 PM (Bedtime)**: Warm golden turmeric milk with a pinch of black pepper.

**Women's Balanced Daily Schedule (1,800–2,000 kcal | 90–110g Protein):**
• **7:00 AM (Wake-up)**: Warm jeera (cumin) water + soaked figs and black raisins.
• **8:30 AM (Breakfast)**: Oats vegetable porridge with chia & pumpkin seeds, or sprouted moong chilla.
• **11:30 AM (Mid-Morning)**: Fresh coconut water or buttermilk + fresh pomegranate/papaya.
• **1:30 PM (Lunch)**: 1 cup thick yellow dal or paneer curry + 2 ragi/multigrain rotis + beetroot salad.
• **4:30 PM (Evening Snack)**: Roasted makhana (foxnuts) in olive oil + green tea.
• **7:30 PM (Dinner)**: Steamed broccoli, carrots, tofu or baked fish with quinoa.
• **9:45 PM (Bedtime)**: Warm golden almond milk (calcium & magnesium for restorative sleep).`,
      actions: [
        { label: "🥗 Open Daily Diet Plans", tab: "diet" },
        { label: "📊 Macro Calculator", tab: "calculator" },
        { label: "🥑 Explore Foods", tab: "foods" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 7. SPECIFIC EXERCISES & WORKOUTS
  // -------------------------------------------------------------------------
  if (has('exercise', 'workout', 'routine', 'chest', 'bench press', 'pushup', 'push up', 'squat', 'deadlift', 'bicep', 'tricep', 'back', 'pullup', 'pull up', 'abs', 'plank', 'shoulder', 'leg', 'quad', 'hamstring', 'glute')) {
    // Check if matching specific exercise in FIT_DATA.exercises
    const exercises = FIT_DATA.exercises || [];
    const matchedEx = exercises.find(ex =>
      query.includes(ex.name.toLowerCase()) ||
      ex.name.toLowerCase().includes(query) ||
      ex.targetMuscle.toLowerCase().includes(query) ||
      ex.category.toLowerCase().includes(query)
    );

    if (matchedEx) {
      return {
        text: `### 🏋️ ${matchedEx.name} (${matchedEx.category})

• **Primary Muscle**: **${matchedEx.targetMuscle}**
• **Secondary Muscles**: ${matchedEx.secondaryMuscles.join(', ')}
• **Difficulty & Equipment**: ${matchedEx.difficulty} • ${matchedEx.equipment}
• **Recommended Volume**: **${matchedEx.setsReps || '3-4 sets x 8-12 reps'}**

**Execution Steps:**
${matchedEx.steps.map((st, i) => `${i + 1}. ${st}`).join('\n')}

**Common Mistakes to Avoid:**
${matchedEx.mistakes.map(m => `• ${m}`).join('\n')}

**Pro Trainer Tip:** ${matchedEx.tips || 'Maintain steady controlled tempo and squeeze target muscles at peak contraction.'}`,
        actions: [
          { label: "🏋️ View in Exercise Library", tab: "exercises" },
          { label: "🗺️ View on Body Map", tab: "bodyparts" },
          { label: "📊 Daily Tracker", tab: "tracker" }
        ]
      };
    }

    // General muscle training advice
    return {
      text: `### 💪 Structured Muscle Building & Hypertrophy Blueprint

• **Push Day (Chest, Shoulders, Triceps)**: Flat Barbell Bench Press (4x8), Incline Dumbbell Press (3x10), Overhead Dumbbell Shoulder Press (3x10), Cable Lateral Raises (4x15), Tricep Rope Pushdowns (3x12).
• **Pull Day (Back, Biceps, Rear Delts)**: Barbell Deadlift or Lat Pulldowns (4x8), Bent-Over Barbell Rows (3x10), Seated Cable Rows (3x12), Incline Dumbbell Bicep Curls (3x12), Face Pulls (4x15).
• **Legs & Core Day**: Barbell Back Squats (4x8), Romanian Deadlifts (3x10), Leg Press (3x12), Standing Calf Raises (4x15), Hanging Leg Raises & Planks (3x60s).

**Golden Hypertrophy Rules:**
• Train each muscle group 2 times per week.
• Apply progressive overload (gradually increase weight or reps each week).
• Consume 1.6–2.0g of protein per kg bodyweight.`,
      actions: [
        { label: "🏋️ Open Exercise Directory", tab: "exercises" },
        { label: "🗺️ Interactive 3D Body Map", tab: "bodyparts" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 8. NUTRITION, PROTEIN, CALORIES & FOODS
  // -------------------------------------------------------------------------
  if (has('protein', 'carbs', 'fat', 'macro', 'calorie', 'nutrition', 'soya', 'paneer', 'chicken', 'egg', 'vitamin', 'iron')) {
    return {
      text: `### 🥑 Macronutrient & Daily Protein Intelligence

**1. Daily Protein Requirement Standards:**
• **Sedentary Adults**: 0.8g per kg body weight (e.g., 56g for a 70kg person).
• **Active Fitness & Endurance**: 1.2–1.6g per kg body weight (84–112g for 70kg).
• **Muscle Building & Strength Athletes**: 1.6–2.2g per kg body weight (112–154g for 70kg).

**2. Top Vegetarian Protein Sources:**
• **Soya Chunks**: **52g protein** / 100g (Highest plant protein on earth!).
• **Paneer / Cottage Cheese**: **18g protein** / 100g.
• **Greek Yogurt / Curd**: **10g protein** / 100g.
• **Lentils / Cooked Dal**: **9g protein** / 100g.
• **Pumpkin & Hemp Seeds**: **30g protein** / 100g.

**3. Top Non-Vegetarian Protein Sources:**
• **Chicken Breast (Skinless)**: **31g protein** / 100g.
• **Whole Eggs**: **6g protein** per large egg.
• **Fish (Tuna, Salmon, Rohu)**: **22–26g protein** / 100g.

**4. Healthy Micronutrients:**
• **Iron**: Moringa, spinach, beetroot, chicken liver.
• **Vitamin D3**: Morning sunlight, fortified milk, egg yolks, or 60K IU supplements.`,
      actions: [
        { label: "🥑 Food Database", tab: "foods" },
        { label: "📊 Macro Calculator", tab: "calculator" },
        { label: "🥗 Daily Diets", tab: "diet" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 9. GYMS & LOCAL GPS LOCATIONS
  // -------------------------------------------------------------------------
  if (has('gym', 'gyms', 'sheelanagar', 'gajuwaka', 'visakhapatnam', 'vizag', 'near me', 'location', 'ufit', 'u fit', 'cult', 'talwalkars')) {
    return {
      text: `### 📍 Verified Fitness Gyms Near You (Vizag & Gajuwaka)

Here are the top-rated gyms in our curated database:

• **U-Fit Fitness Hub (Sheelanagar)**: 
  ⭐ **4.8 / 5.0** • Crossfit zone, powerlifting rigs, AC cardio deck, certified personal trainers. Located on Sheelanagar Main Road.
• **Cult.fit Gym (Gajuwaka)**: 
  ⭐ **4.8 / 5.0** • HRX training, strength machines, group fitness classes, steam bath.
• **Talwalkars Gym (Gajuwaka Main Road)**: 
  ⭐ **4.7 / 5.0** • Premium strength floor, cardio cinema, nutrition counseling.
• **Gold's Gym (Siripuram / Vizag)**: 
  ⭐ **4.9 / 5.0** • World-class biomechanical equipment, certified coaches, sauna.

*You can explore the interactive live Google satellite map, get driving directions, and filter by area in our Gyms tab!*`,
      actions: [
        { label: "📍 Open Interactive Gyms Map", tab: "gyms" },
        { label: "💬 Inquire on WhatsApp", url: "https://wa.me/919014430474?text=Hi%20FitGuide%2C%20which%20gym%20is%20best%20near%20my%20location%3F" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 10. CONTACT, TRAINER, WHATSAPP & QR CODE SHARING
  // -------------------------------------------------------------------------
  if (has('contact', 'venkatesh', 'vemula', 'phone', 'number', 'whatsapp', 'email', 'creator', 'owner', 'trainer', 'share', 'relatives', 'qr', 'login')) {
    return {
      text: `### 📱 Direct Trainer Contact & FitGuide Sharing

• **Lead Coach & Platform Creator**: **Venkatesh Vemula**
• **WhatsApp Direct**: **+91 9014430474**
• **Official Email**: **venkateshvemula8897@gmail.com**
• **Live Website Link**: **https://fitguidecom.netlify.app/**

**Share with Family & Relatives:**
You can scan our scannable QR code anytime to instantly open the platform on mobile devices, or tap the button below to forward the link!`,
      actions: [
        { label: "💬 Chat on WhatsApp", url: "https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20fitness%20and%20nutrition%20question!" },
        { label: "📱 Open QR Code Modal", onclick: "openQrModal()" }
      ]
    };
  }

  // -------------------------------------------------------------------------
  // 11. GENERAL FALLBACK COACHING RESPONSE
  // -------------------------------------------------------------------------
  return {
    text: `### 🤖 FitBot AI Fitness & Health Coaching

I'm ready to help you with that! To give you the most accurate scientific guidance, you can ask me specifically about:

• 🌸 **Women's Health**: Mature cycle length (21–35 days), 4 phases, PMS relief foods & precautions.
• 🤰 **Pregnancy Care**: Safe exercises (Kegels, walking, wall squats), labor benefits, and foods to strictly avoid (unripe papaya, pineapple).
• 📏 **Height Growth**: Spinal decompression exercises (dead hangs, cobra stretch), growth plate science & essential nutrients.
• 🩺 **Disease Cures & Medicines**: Healing diets and clinical drugs for Diabetes, High BP, Thyroid, Fatty Liver & Anemia.
• 🥗 **Balanced Daily Diets**: 7-meal 24-hr schedules for Men (2,200–2,500 kcal) and Women (1,800–2,000 kcal).
• 💪 **Muscle Workouts**: Sets, reps, and form instructions for chest, back, biceps, legs & core.
• 📍 **Local Gyms**: Find gyms in Sheelanagar, Gajuwaka, and Vizag with live map directions.

*Tip: You can also tap the ⚙️ icon in the header to enter a custom Google Gemini API Key for unrestricted conversational reasoning!*`,
    actions: [
      { label: "🌸 Women's Hub", tab: "women" },
      { label: "📏 Height Guide", tab: "height" },
      { label: "🩺 Disease Cures", tab: "diseases" },
      { label: "🥗 Daily Diets", tab: "diet" },
      { label: "📍 Local Gyms", tab: "gyms" }
    ]
  };
}

// Global exposure for FitBot
window.toggleFitBot = toggleFitBot;
window.openFitBot = openFitBot;
window.closeFitBot = closeFitBot;
window.toggleFitBotSettings = toggleFitBotSettings;
window.saveFitBotApiKey = saveFitBotApiKey;
window.removeFitBotApiKey = removeFitBotApiKey;
window.clearFitBotHistory = clearFitBotHistory;
window.askFitBotPrompt = askFitBotPrompt;
window.handleFitBotSubmit = handleFitBotSubmit;
window.toggleFitBotVoiceInput = toggleFitBotVoiceInput;
window.initFitBot = initFitBot;

