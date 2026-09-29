-- ============================================================================
-- FitGuide - Production PostgreSQL Database Schema
-- Scalable Full-Stack Fitness & Nutrition Relational Database Architecture
-- ============================================================================

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    age INT CHECK (age >= 10 AND age <= 120),
    biological_sex VARCHAR(20) CHECK (biological_sex IN ('male', 'female', 'other')),
    height_cm NUMERIC(5,2) CHECK (height_cm > 50 AND height_cm < 300),
    weight_kg NUMERIC(5,2) CHECK (weight_kg > 20 AND weight_kg < 500),
    activity_level NUMERIC(3,2) DEFAULT 1.55,
    fitness_goal VARCHAR(50) DEFAULT 'general-fitness' CHECK (fitness_goal IN ('muscle-gain', 'fat-loss', 'general-fitness', 'strength', 'endurance')),
    dietary_preference VARCHAR(50) DEFAULT 'vegetarian' CHECK (dietary_preference IN ('vegetarian', 'vegan', 'eggetarian', 'non-vegetarian')),
    target_calories INT DEFAULT 2000,
    target_protein_g NUMERIC(5,2) DEFAULT 120.0,
    theme_preference VARCHAR(10) DEFAULT 'dark',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. BodyParts Table
CREATE TABLE IF NOT EXISTS body_parts (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    muscles_anatomical TEXT NOT NULL,
    region VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    svg_target_id VARCHAR(50)
);

-- 3. Exercises Table
CREATE TABLE IF NOT EXISTS exercises (
    id VARCHAR(80) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(150) UNIQUE NOT NULL,
    primary_body_part_id VARCHAR(50) NOT NULL REFERENCES body_parts(id) ON DELETE RESTRICT,
    difficulty VARCHAR(30) NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    equipment VARCHAR(100) NOT NULL,
    sets_and_reps VARCHAR(100) NOT NULL,
    rest_time_sec INT DEFAULT 60,
    instructions JSONB NOT NULL,          -- Array of step-by-step strings
    benefits JSONB NOT NULL,              -- Array of proven benefits
    risks JSONB NOT NULL,                 -- Array of risks/disadvantages
    common_mistakes JSONB NOT NULL,       -- Array of common execution mistakes
    safety_tips JSONB NOT NULL,           -- Array of safety precautions
    alternatives JSONB NOT NULL,          -- Array of alternative exercise names
    recovery_foods JSONB NOT NULL,        -- Array of recommended food strings
    icon_type VARCHAR(50) DEFAULT 'general',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ExerciseMuscles (Junction table for primary & secondary muscle targets)
CREATE TABLE IF NOT EXISTS exercise_muscles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exercise_id VARCHAR(80) NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    muscle_name VARCHAR(100) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    UNIQUE (exercise_id, muscle_name)
);

-- 5. Nutrients Table (Macronutrients & Micronutrients)
CREATE TABLE IF NOT EXISTS nutrients (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    nutrient_type VARCHAR(50) NOT NULL,   -- 'Macronutrient', 'Essential Mineral', 'Water-soluble Vitamin', 'Fat-soluble Vitamin'
    calories_per_gram NUMERIC(3,1),
    what_it_does TEXT NOT NULL,
    why_important TEXT NOT NULL,
    approx_daily_requirement TEXT NOT NULL,
    deficiency_consequences TEXT NOT NULL,
    variations_note TEXT NOT NULL,
    forms_explanation TEXT
);

-- 6. Foods Table
CREATE TABLE IF NOT EXISTS foods (
    id VARCHAR(80) PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    hindi_name VARCHAR(150),
    serving_size VARCHAR(100) NOT NULL,
    calories_kcal NUMERIC(6,1) NOT NULL CHECK (calories_kcal >= 0),
    protein_g NUMERIC(5,2) NOT NULL CHECK (protein_g >= 0),
    carbohydrates_g NUMERIC(5,2) NOT NULL CHECK (carbohydrates_g >= 0),
    fat_g NUMERIC(5,2) NOT NULL CHECK (fat_g >= 0),
    iron_mg NUMERIC(5,2) DEFAULT 0.0 CHECK (iron_mg >= 0),
    dietary_classification VARCHAR(30) NOT NULL CHECK (dietary_classification IN ('Vegetarian', 'Vegan', 'Non-vegetarian')),
    category VARCHAR(60) NOT NULL,
    best_use VARCHAR(40) NOT NULL CHECK (best_use IN ('pre-workout', 'post-workout', 'general')),
    best_use_label VARCHAR(100) NOT NULL,
    description TEXT,
    is_indian_food BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. FoodNutrients (Junction for detailed vitamin & mineral assays per food)
CREATE TABLE IF NOT EXISTS food_nutrients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    food_id VARCHAR(80) NOT NULL REFERENCES foods(id) ON DELETE CASCADE,
    nutrient_id VARCHAR(50) NOT NULL REFERENCES nutrients(id) ON DELETE CASCADE,
    amount_per_serving NUMERIC(8,3) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    UNIQUE (food_id, nutrient_id)
);

-- 8. WorkoutPlans Table
CREATE TABLE IF NOT EXISTS workout_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    routine_name VARCHAR(150) NOT NULL,
    description TEXT,
    exercises JSONB NOT NULL,             -- List of exercise IDs and prescribed sets/reps
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Favorites Table (Polymorphic favorites for exercises and foods)
CREATE TABLE IF NOT EXISTS favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(30) NOT NULL CHECK (item_type IN ('exercise', 'food')),
    item_id VARCHAR(80) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, item_type, item_id)
);

-- 10. DailyNutrition Table (Daily food logs & macro intake)
CREATE TABLE IF NOT EXISTS daily_nutrition (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    total_calories_consumed INT DEFAULT 0,
    total_protein_g_consumed NUMERIC(6,2) DEFAULT 0.0,
    water_glasses_consumed INT DEFAULT 0,  -- 250ml each
    logged_items JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, log_date)
);

-- 11. ExerciseHistory Table (Logged completed workouts)
CREATE TABLE IF NOT EXISTS exercise_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    exercise_id VARCHAR(80) NOT NULL REFERENCES exercises(id) ON DELETE RESTRICT,
    session_date DATE NOT NULL,
    sets_completed INT DEFAULT 3,
    reps_completed INT DEFAULT 10,
    weight_load_kg NUMERIC(6,2) DEFAULT 0.0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- Indexes for High-Performance Queries
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_exercises_bodypart ON exercises(primary_body_part_id);
CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON exercises(difficulty);
CREATE INDEX IF NOT EXISTS idx_foods_category ON foods(category);
CREATE INDEX IF NOT EXISTS idx_foods_dietary ON foods(dietary_classification);
CREATE INDEX IF NOT EXISTS idx_daily_nutrition_user_date ON daily_nutrition(user_id, log_date);
CREATE INDEX IF NOT EXISTS idx_exercise_history_user_date ON exercise_history(user_id, session_date);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
