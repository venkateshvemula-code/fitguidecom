/**
 * FitGuide - Educational Fitness & Nutrition Platform
 * Master Dataset: Exercises, Body Parts, Nutrients, Foods, Meal Plans, & Database Schema
 */

export const FIT_DATA = {
  // Database Schema Reference (for full-stack scalability & PostgreSQL/Prisma migrations)
  schemaInfo: {
    tables: [
      "Users (id, name, email, dietary_pref, fitness_goal, created_at)",
      "BodyParts (id, name, slug, region, description, primary_actions)",
      "Exercises (id, name, slug, target_body_part_id, difficulty, equipment, rest_time_sec, instructions, benefits, risks, common_mistakes, safety_tips, alternatives)",
      "ExerciseMuscles (exercise_id, muscle_name, is_primary)",
      "Foods (id, name, hindi_name, serving_size, calories, protein_g, carbs_g, fat_g, iron_mg, dietary_type, best_use, category)",
      "Nutrients (id, name, type, daily_requirement, function_desc, importance, deficiency_risks, variations_note)",
      "FoodNutrients (food_id, nutrient_id, amount_per_serving)",
      "WorkoutPlans (id, user_id, title, description, exercises_json, created_at)",
      "Favorites (id, user_id, item_type, item_id, created_at)",
      "DailyNutrition (id, user_id, date, calories_consumed, protein_g_consumed, water_ml_consumed, logged_items_json)",
      "ExerciseHistory (id, user_id, exercise_id, date, sets_completed, reps, weight_kg)"
    ]
  },

  // Body Parts & Muscle Groups
  bodyParts: [
    {
      id: "chest",
      name: "Chest",
      muscles: "Pectoralis Major, Pectoralis Minor",
      region: "Upper Body (Anterior)",
      description: "The chest muscles are responsible for horizontal adduction, flexion, and internal rotation of the humerus (upper arm). Crucial for pushing movements.",
      svgTarget: "chest"
    },
    {
      id: "back",
      name: "Back",
      muscles: "Latissimus Dorsi, Rhomboids, Middle & Lower Trapezius, Erector Spinae",
      region: "Upper Body (Posterior)",
      description: "The back muscles support spinal stability, posture, and pulling mechanics (shoulder extension, scapular retraction, and spinal extension).",
      svgTarget: "back"
    },
    {
      id: "shoulders",
      name: "Shoulders",
      muscles: "Anterior, Lateral, and Posterior Deltoids, Rotator Cuff",
      region: "Upper Body (Anterior & Posterior)",
      description: "Deltoids control arm abduction, flexion, and external rotation, allowing 360-degree shoulder mobility.",
      svgTarget: "shoulders"
    },
    {
      id: "biceps",
      name: "Biceps",
      muscles: "Biceps Brachii (Long & Short Head), Brachialis",
      region: "Arms (Anterior)",
      description: "Responsible for elbow flexion and forearm supination (turning the palm upward).",
      svgTarget: "biceps"
    },
    {
      id: "triceps",
      name: "Triceps",
      muscles: "Triceps Brachii (Lateral, Long, and Medial Heads)",
      region: "Arms (Posterior)",
      description: "Comprises roughly 60% of upper arm mass; responsible for elbow extension and pushing movements.",
      svgTarget: "triceps"
    },
    {
      id: "forearms",
      name: "Forearms",
      muscles: "Wrist Flexors, Wrist Extensors, Brachioradialis",
      region: "Arms (Lower)",
      description: "Controls wrist articulation, finger flexion, and grip strength essential for deadlifts, carries, and daily lifting.",
      svgTarget: "forearms"
    },
    {
      id: "abs",
      name: "Abs & Core",
      muscles: "Rectus Abdominis, Transverse Abdominis, Internal & External Obliques",
      region: "Core (Anterior & Lateral)",
      description: "Stabilizes the spine, transfers force between upper and lower extremities, prevents excessive extension/rotation, and protects internal organs.",
      svgTarget: "abs"
    },
    {
      id: "glutes",
      name: "Glutes",
      muscles: "Gluteus Maximus, Gluteus Medius, Gluteus Minimus",
      region: "Lower Body (Posterior)",
      description: "The strongest and largest muscle group in the human body; drives hip extension, hip abduction, pelvic alignment, and sprint power.",
      svgTarget: "glutes"
    },
    {
      id: "quadriceps",
      name: "Quadriceps",
      muscles: "Rectus Femoris, Vastus Lateralis, Vastus Medialis, Vastus Intermedius",
      region: "Lower Body (Anterior)",
      description: "Located on the front of the thigh, quads extend the knee joint and absorb ground impact during running and jumping.",
      svgTarget: "quads"
    },
    {
      id: "hamstrings",
      name: "Hamstrings",
      muscles: "Biceps Femoris, Semitendinosus, Semimembranosus",
      region: "Lower Body (Posterior)",
      description: "Bends the knee and extends the hip; critical for decelerating sprint stride and stabilizing the knee joint.",
      svgTarget: "hamstrings"
    },
    {
      id: "calves",
      name: "Calves",
      muscles: "Gastrocnemius, Soleus, Tibialis Posterior",
      region: "Lower Body (Lower Posterior)",
      description: "Performs ankle plantarflexion (pointing toes downward); essential for walking, running, jumping, and ankle stabilization.",
      svgTarget: "calves"
    },
    {
      id: "height",
      name: "Height & Spine",
      muscles: "Spinal Erectors, Intervertebral Discs, Latissimus, Deep Core, Growth Plates",
      region: "Full Body & Spine",
      description: "Decompresses the spine, corrects postural curvature, aligns vertebrae, and stimulates bone elongation during growth phases.",
      svgTarget: "spine"
    },
    {
      id: "women",
      name: "Pregnancy & Pelvic",
      muscles: "Pelvic Floor, Transverse Abdominis, Gluteal Girdle, Spine",
      region: "Pelvic & Maternal",
      description: "Safe prenatal and postpartum conditioning exercises to support pregnancy, pelvic integrity, and labor delivery.",
      svgTarget: "pelvic"
    }
  ],

  // Comprehensive Exercise Database
  exercises: [
    {
      id: "push-ups",
      name: "Push-ups",
      bodyPart: "chest",
      bodyPartName: "Chest",
      secondaryMuscles: ["Triceps", "Anterior Deltoids", "Core (Abs)"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      setsReps: "3 sets of 10-15 reps",
      restTime: "60 seconds",
      instructions: [
        "Place your hands slightly wider than shoulder-width apart on the floor with fingers pointing slightly outward.",
        "Extend your legs backward so you are balanced on your hands and toes in a rigid plank position.",
        "Engage your glutes and core to keep your body in a straight line from ears to heels.",
        "Lower your chest towards the floor by bending your elbows at a 45-degree angle until your chest is about an inch from the ground.",
        "Pause briefly, then press forcefully through the floor back to the starting locked position while exhaling."
      ],
      benefits: [
        "Builds functional pushing strength without needing any equipment.",
        "Engages the entire core, serratus anterior, and shoulder stabilizers.",
        "Easily scalable with incline, knee, or weighted variations."
      ],
      risks: [
        "Shoulder impingement if elbows flare out wide at 90 degrees.",
        "Lower back strain if core sags into lumbar hyperextension."
      ],
      commonMistakes: [
        "Flaring elbows excessively wide in a 'T' shape.",
        "Sagging hips or piking glutes into the air.",
        "Partial range of motion (bobbing head instead of lowering chest)."
      ],
      safetyTips: [
        "Keep elbows tucked at a 45-degree arrow angle to your torso.",
        "If regular push-ups are too difficult, start with hands elevated on a bench or wall rather than knees for better core alignment."
      ],
      alternatives: ["Incline Push-ups", "Dumbbell Floor Press", "Knee Push-ups"],
      recoveryFoods: ["Paneer", "Eggs", "Chicken Breast", "Soybeans"],
      icon: "chest"
    },
    {
      id: "squats",
      name: "Bodyweight / Goblet Squats",
      bodyPart: "quadriceps",
      bodyPartName: "Quadriceps",
      secondaryMuscles: ["Glutes", "Hamstrings", "Calves", "Core"],
      difficulty: "Beginner",
      equipment: "Bodyweight or Dumbbell",
      setsReps: "3-4 sets of 12-15 reps",
      restTime: "60-90 seconds",
      instructions: [
        "Stand with feet shoulder-width apart, toes turned outward 15 to 30 degrees.",
        "Brace your core, keep your chest high, and look straight ahead.",
        "Hinge at the hips and bend your knees simultaneously, pushing knees out in line with your toes.",
        "Descend until thighs are at least parallel to the floor (or deeper if hip mobility permits).",
        "Drive through your mid-foot and heels to stand back up, squeezing your glutes at the top."
      ],
      benefits: [
        "The quintessential compound movement for lower body hypertrophy and strength.",
        "Improves hip mobility, knee resilience, and functional longevity.",
        "High caloric expenditure due to recruitment of massive muscle mass."
      ],
      risks: [
        "Knee strain if knees cave inward (valgus collapse).",
        "Lumbar rounding (butt wink) at the bottom if mobility is limited."
      ],
      commonMistakes: [
        "Heels lifting off the ground during descent.",
        "Knees caving inward toward each other.",
        "Rounding the upper back or looking down at feet."
      ],
      safetyTips: [
        "Push knees actively outward over your second toe.",
        "Elevate heels slightly on small plates if ankle mobility is restricted."
      ],
      alternatives: ["Leg Press", "Box Squats", "Bulgarian Split Squats"],
      recoveryFoods: ["Milk", "Oats with Curd", "Banana with Whey", "Chickpeas"],
      icon: "legs"
    },
    {
      id: "lunges",
      name: "Walking / Reverse Lunges",
      bodyPart: "quadriceps",
      bodyPartName: "Quadriceps",
      secondaryMuscles: ["Glutes", "Hamstrings", "Calves", "Adductors"],
      difficulty: "Beginner",
      equipment: "Bodyweight or Dumbbells",
      setsReps: "3 sets of 10-12 reps per leg",
      restTime: "60 seconds",
      instructions: [
        "Stand tall with feet hip-width apart and hands on hips or holding dumbbells.",
        "Step backward (or forward) approximately 2-3 feet with one leg.",
        "Lower your hips until both knees are bent at roughly 90-degree angles. Your back knee should hover just above the floor.",
        "Ensure your front knee is stacked directly above your front ankle.",
        "Drive through the front heel to return to the standing starting position."
      ],
      benefits: [
        "Corrects unilateral strength and muscular imbalances between legs.",
        "Enhances dynamic balance, hip flexor flexibility, and pelvic stabilization.",
        "Directly transfers to running, athletic sprinting, and stair climbing."
      ],
      risks: [
        "Knee sheer stress if the front knee drifts far beyond toes without heel contact.",
        "Loss of balance leading to ankle roll."
      ],
      commonMistakes: [
        "Stepping in a tight single line as if walking a tightrope (keep feet hip-width apart like train tracks).",
        "Banging the back knee hard onto the floor.",
        "Leaning torso excessively forward."
      ],
      safetyTips: [
        "Maintain a wide base by stepping on parallel tracks.",
        "Reverse lunges are generally gentler on the knees than forward lunges."
      ],
      alternatives: ["Split Squats", "Step-ups", "Reverse Lunge from Box"],
      recoveryFoods: ["Rajma (Kidney Beans)", "Boiled Eggs", "Curd", "Fish"],
      icon: "legs"
    },
    {
      id: "pull-ups",
      name: "Pull-ups & Chin-ups",
      bodyPart: "back",
      bodyPartName: "Back",
      secondaryMuscles: ["Biceps", "Rear Deltoids", "Brachialis", "Forearms"],
      difficulty: "Advanced",
      equipment: "Pull-up Bar",
      setsReps: "3-4 sets of 5-10 reps (or to failure)",
      restTime: "90-120 seconds",
      instructions: [
        "Grip the overhead bar with hands slightly wider than shoulder-width (overhand for pull-ups, underhand for chin-ups).",
        "Hang with arms fully extended and engage your lats by pulling your shoulder blades down and back.",
        "Drive your elbows down toward your hips and pull your chest up toward the bar.",
        "Continue pulling until your chin clears the bar comfortably without craning your neck.",
        "Lower yourself under control over 2-3 seconds back to a dead hang position."
      ],
      benefits: [
        "The ultimate benchmark test for upper-body relative pulling strength.",
        "Builds the 'V-taper' silhouette by widening the latissimus dorsi.",
        "Develops massive forearm grip endurance."
      ],
      risks: [
        "Elbow tendonitis (golfer's/tennis elbow) from excessive volume or kipping.",
        "Shoulder impingement if hanging passively without scapular engagement."
      ],
      commonMistakes: [
        "Kicking or kipping with legs to gain momentum.",
        "Reaching with the chin rather than pulling the chest to the bar.",
        "Cutting range of motion short at the bottom."
      ],
      safetyTips: [
        "Use resistance bands looped under your foot or an assisted machine if you cannot perform full reps.",
        "Always engage your scapula before bending your elbows."
      ],
      alternatives: ["Lat Pulldowns", "Resistance Band Pull-ups", "Inverted Bodyweight Rows"],
      recoveryFoods: ["Chicken Breast", "Dal with Rice", "Paneer Bhurji", "Peanuts"],
      icon: "back"
    },
    {
      id: "plank",
      name: "Forearm Plank",
      bodyPart: "abs",
      bodyPartName: "Abs & Core",
      secondaryMuscles: ["Glutes", "Shoulders", "Quadriceps", "Lower Back"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      setsReps: "3 sets of 30-60 second holds",
      restTime: "45-60 seconds",
      instructions: [
        "Lie facedown and prop yourself up onto your forearms with elbows directly under your shoulders.",
        "Extend your legs back, resting on the balls of your feet.",
        "Tuck your pelvis slightly (posterior pelvic tilt), squeeze your glutes, and brace your abdomen as if bracing for a punch.",
        "Maintain a neutral cervical spine by looking down at the space between your hands.",
        "Breathe diaphragmatically through your nose while sustaining intense tension."
      ],
      benefits: [
        "Builds isometric core endurance to protect the lumbar spine from disc herniations.",
        "Activates deep transverse abdominis for waistline firmness and stability.",
        "Safer than spinal flexion movements like repeated sit-ups."
      ],
      risks: [
        "Lower back compression if the hips sag toward the floor.",
        "Shoulder discomfort if elbows are placed too far forward."
      ],
      commonMistakes: [
        "Holding your breath during the hold.",
        "Letting hips drop toward the floor or hiking glutes too high in a tent shape.",
        "Craning neck upwards."
      ],
      safetyTips: [
        "Focus on maximum muscular contraction rather than passive duration.",
        "Drop to your knees if your lower back starts aching."
      ],
      alternatives: ["Dead Bug", "Bird Dog", "Ab Wheel Rollout"],
      recoveryFoods: ["Greek Yogurt", "Sprouted Moong Dal", "Sesame Seeds", "Almonds"],
      icon: "core"
    },
    {
      id: "bench-press",
      name: "Barbell / Dumbbell Bench Press",
      bodyPart: "chest",
      bodyPartName: "Chest",
      secondaryMuscles: ["Triceps", "Anterior Deltoids", "Serratus Anterior"],
      difficulty: "Intermediate",
      equipment: "Barbell or Dumbbells, Bench",
      setsReps: "3-4 sets of 8-12 reps",
      restTime: "90-120 seconds",
      instructions: [
        "Lie flat on the bench with eyes positioned directly under the racked barbell.",
        "Plant your feet firmly on the ground, squeeze shoulder blades together, and establish a natural arch in your lower back.",
        "Grip the bar slightly wider than shoulder-width with wrists straight.",
        "Unrack the bar and hold it with arms locked over your mid-chest.",
        "Lower the bar smoothly to your mid-sternum, keeping elbows tucked at 45 to 70 degrees.",
        "Touch chest lightly without bouncing, then drive the bar upward and slightly back toward your eye-line."
      ],
      benefits: [
        "Standard gold standard for progressive overload in chest and pushing development.",
        "Allows heavy loads for maximal neuromuscular stimulation and chest thickness.",
        "Dumbbell variation offers deeper stretch and natural wrist rotation."
      ],
      risks: [
        "Rotator cuff impingement or pectoral tear from excessive flared elbows or bouncing bar off ribs.",
        "Bar entrapment without safety pins or spotter."
      ],
      commonMistakes: [
        "Bouncing the barbell off the sternum.",
        "Lifting glutes off the bench during the press.",
        "Wrists bending backwards under heavy loads."
      ],
      safetyTips: [
        "Always use safety pins or have a reliable spotter when using a barbell.",
        "Keep your shoulder blades retracted and 'pinned' into the bench throughout."
      ],
      alternatives: ["Dumbbell Bench Press", "Push-ups", "Chest Press Machine"],
      recoveryFoods: ["Soya Chunks", "Eggs", "Salmon / Fish", "Milk"],
      icon: "chest"
    },
    {
      id: "shoulder-press",
      name: "Overhead Dumbbell / Barbell Press",
      bodyPart: "shoulders",
      bodyPartName: "Shoulders",
      secondaryMuscles: ["Triceps", "Upper Chest", "Trapezius", "Core"],
      difficulty: "Intermediate",
      equipment: "Dumbbells or Barbell",
      setsReps: "3-4 sets of 8-10 reps",
      restTime: "90 seconds",
      instructions: [
        "Stand tall (or sit upright on a supported bench) holding dumbbells at shoulder height with palms facing forward.",
        "Keep your core tight, ribs locked down, and glutes clenched to prevent spinal hyperextension.",
        "Press the weights vertically overhead until your arms are fully extended without shrugging ears to shoulders.",
        "Pause for a fraction of a second with the weights aligned directly over your mid-foot and crown of head.",
        "Lower under steady control back to ear level over 2 seconds."
      ],
      benefits: [
        "Creates wide, rounded shoulder deltoids (the 3D cannonball look).",
        "Strengthens overhead lockout strength and postural upper back stability.",
        "Demands total body kinetic chain bracing when performed standing."
      ],
      risks: [
        "Subacromial impingement if pressing with poor thoracic extension.",
        "Lower back hyper-lordosis (arching back excessively) to compensate for tight shoulders."
      ],
      commonMistakes: [
        "Hyperextending the lower back to lean back like an incline press.",
        "Locking out elbows aggressively with a sudden snap.",
        "Using legs to bump the weight up on a strict press."
      ],
      safetyTips: [
        "Use dumbbells with a neutral grip (palms facing each other) if you have past shoulder discomfort.",
        "Do not sacrifice spinal neutral posture for heavier weight."
      ],
      alternatives: ["Seated Dumbbell Press", "Pike Push-ups", "Kettlebell Clean & Press"],
      recoveryFoods: ["Chickpeas", "Paneer", "Banana", "Ragi Roti"],
      icon: "shoulders"
    },
    {
      id: "bicep-curls",
      name: "Dumbbell / Barbell Bicep Curls",
      bodyPart: "biceps",
      bodyPartName: "Biceps",
      secondaryMuscles: ["Brachialis", "Brachioradialis", "Forearm Flexors"],
      difficulty: "Beginner",
      equipment: "Dumbbells or Barbell / EZ-Bar",
      setsReps: "3 sets of 10-12 reps",
      restTime: "60 seconds",
      instructions: [
        "Stand tall with feet hip-width apart holding dumbbells by your sides, palms facing inward or forward.",
        "Pin your upper arms and elbows firmly against the sides of your ribcage.",
        "Exhale and curl the weights up toward your shoulders, supinating (rotating) wrists outward so palms face your shoulders at peak contraction.",
        "Squeeze your biceps hard at the top without allowing elbows to swing forward.",
        "Lower the weights slowly over 3 seconds until your elbows are fully extended."
      ],
      benefits: [
        "Direct isolation for bicep peak and arm thickness.",
        "Strengthens the distal bicep tendon against pulling injuries.",
        "Improves forearm grip and arm aesthetic definition."
      ],
      risks: [
        "Wrist strain from heavy straight bar without wrist rotation.",
        "Bicep tendonitis from excessive swinging momentum."
      ],
      commonMistakes: [
        "Swinging the torso back and forth to cheat the weight up.",
        "Elbows flaring or moving far forward in front of ribs.",
        "Dropping the weights rapidly on the eccentric phase."
      ],
      safetyTips: [
        "Use an EZ-curl bar if straight barbells cause wrist torque.",
        "Perform repetitions with back flat against a wall to eliminate cheating."
      ],
      alternatives: ["Hammer Curls", "Incline Dumbbell Curls", "Cable Curls"],
      recoveryFoods: ["Boiled Eggs", "Curd / Greek Yogurt", "Peanuts", "Soybeans"],
      icon: "arms"
    },
    {
      id: "tricep-dips",
      name: "Tricep Dips (Bench / Parallel Bars)",
      bodyPart: "triceps",
      bodyPartName: "Triceps",
      secondaryMuscles: ["Anterior Deltoids", "Lower Chest", "Core"],
      difficulty: "Intermediate",
      equipment: "Parallel Bars or Sturdy Bench / Chair",
      setsReps: "3 sets of 8-12 reps",
      restTime: "60-90 seconds",
      instructions: [
        "Mount the parallel bars with arms locked straight and shoulders depressed down away from ears.",
        "Keep your torso upright (for tricep bias) or leaned slightly forward (for chest bias).",
        "Bend your elbows smoothly to lower your body until elbows reach approximately 90 degrees.",
        "Do not allow shoulders to roll forward or drop below elbow depth.",
        "Press through the heels of your palms to push your body back to the top lockout position."
      ],
      benefits: [
        "Exceptional mass builder for all three heads of the triceps.",
        "Bodyweight mastery exercise that builds real-world pressing power.",
        "Bench dips provide an accessible entry point for beginners."
      ],
      risks: [
        "Severe anterior shoulder capsule strain if dipping too deep with slumped shoulders.",
        "Elbow joint flare-ups if elbows drift outwards."
      ],
      commonMistakes: [
        "Descending too low, causing excessive anterior humeral glide.",
        "Flaring elbows wide outwards.",
        "Shrugging shoulders into ears at the bottom."
      ],
      safetyTips: [
        "Stop descent when upper arms are parallel to the floor.",
        "Keep chest proud and collarbones wide throughout the entire movement."
      ],
      alternatives: ["Tricep Rope Pushdowns", "Diamond Push-ups", "Overhead Dumbbell Tricep Extension"],
      recoveryFoods: ["Paneer", "Milk", "Chicken", "Almonds"],
      icon: "arms"
    },
    {
      id: "deadlift",
      name: "Conventional / Romanian Deadlift",
      bodyPart: "back",
      bodyPartName: "Back & Posterior Chain",
      secondaryMuscles: ["Hamstrings", "Glutes", "Forearms / Grip", "Trapezius", "Core"],
      difficulty: "Advanced",
      equipment: "Barbell or Heavy Dumbbells",
      setsReps: "3-4 sets of 5-8 reps",
      restTime: "120-180 seconds",
      instructions: [
        "Stand with feet hip-width apart with the barbell positioned over your mid-foot (about 1 inch from shins).",
        "Hinge at the hips, bend knees slightly, and grip the bar just outside your shins.",
        "Pull the slack out of the barbell, depress your shoulder blades into your back pockets, and engage your lats.",
        "Take a deep diaphragmatic breath into your belly and brace your abdominal wall.",
        "Drive the floor away with your legs, keeping the bar sliding up in contact with your shins and thighs.",
        "Stand tall and lock hips at the top without hyperextending your lumbar spine.",
        "Hinge back at the hips to return the bar along the same path under control."
      ],
      benefits: [
        "The ultimate whole-body compound lift recruiting almost every muscle from feet to neck.",
        "Builds bulletproof posterior chain resilience, preventing everyday lifting injuries.",
        "Stimulates profound systemic hormonal, bone density, and nervous system adaptations."
      ],
      risks: [
        "Lumbar disc herniation if lifting with a rounded, unbraced spinal position.",
        "Bicep tear if yanking with bent arms during an alternated grip."
      ],
      commonMistakes: [
        "Rounding the lower spine like a fishing rod.",
        "Allowing the bar to drift far away from the body during the ascent.",
        "Jerking the bar off the floor instead of creating progressive wedged tension."
      ],
      safetyTips: [
        "Keep the barbell in direct contact with your body throughout the lift.",
        "Warm up progressively and never sacrifice spinal neutrality for weight."
      ],
      alternatives: ["Trap Bar Deadlift", "Romanian Deadlift (RDL)", "Kettlebell Swings"],
      recoveryFoods: ["Dal Tadka with Roti", "Chicken Breast", "Ragi Porridge", "Spinach with Paneer"],
      icon: "back"
    },
    {
      id: "calf-raises",
      name: "Standing & Seated Calf Raises",
      bodyPart: "calves",
      bodyPartName: "Calves",
      secondaryMuscles: ["Soleus", "Gastrocnemius", "Tibialis Posterior", "Foot Intrinsic Muscles"],
      difficulty: "Beginner",
      equipment: "Bodyweight, Step Ledge, or Machine",
      setsReps: "3-4 sets of 15-20 reps",
      restTime: "45-60 seconds",
      instructions: [
        "Stand on the edge of a sturdy step or block with the balls of your feet on the ledge and heels hanging off.",
        "Lower your heels as far as comfortably possible into a deep calf stretch for 2 full seconds.",
        "Explode upward onto the balls of your big toes, achieving maximal ankle plantarflexion.",
        "Pause and squeeze your calves hard at the peak for 1-2 seconds.",
        "Lower slowly back down over 3 seconds to eliminate the Achilles tendon bounce."
      ],
      benefits: [
        "Builds ankle stability, preventing sprains and plantar fasciitis.",
        "Strengthens the venous muscle pump that helps return blood from legs to heart.",
        "Improves jumping verticality and sprint acceleration."
      ],
      risks: [
        "Achilles tendon irritation from rapid, uncontrolled bouncing.",
        "Cramping if poorly hydrated or low on magnesium/potassium."
      ],
      commonMistakes: [
        "Bouncing rapidly at the bottom utilizing elasticity rather than muscular effort.",
        "Rolling ankle outward onto the pinky toe rather than pressing through the big toe.",
        "Incomplete range of motion."
      ],
      safetyTips: [
        "Hold onto a wall or handrail for balance so calves receive full stimulus.",
        "Incorporate seated raises to specifically target the deeper soleus muscle."
      ],
      alternatives: ["Seated Calf Raise", "Single-leg Calf Raises", "Farmer's Walk on Toes"],
      recoveryFoods: ["Banana", "Sesame Seeds", "Curd", "Peanuts"],
      icon: "legs"
    },
    {
      id: "lateral-raises",
      name: "Dumbbell Lateral Raises",
      bodyPart: "shoulders",
      bodyPartName: "Shoulders",
      secondaryMuscles: ["Upper Trapezius", "Supraspinatus", "Forearms"],
      difficulty: "Beginner",
      equipment: "Dumbbells or Resistance Band",
      setsReps: "3-4 sets of 12-15 reps",
      restTime: "60 seconds",
      instructions: [
        "Stand tall holding dumbbells at your sides, knees soft, with a subtle forward torso lean (5-10 degrees).",
        "Lead with your elbows and raise the weights out to your sides in the scapular plane (roughly 30 degrees in front of direct lateral).",
        "Raise arms until dumbbells reach shoulder height.",
        "Keep pinkies slightly elevated or level with thumbs (like pouring a pitcher of water).",
        "Lower the weights slowly under strict eccentric control back to starting position."
      ],
      benefits: [
        "Directly targets the lateral deltoid head for shoulder width and upper body proportion.",
        "Low spinal fatigue compared to overhead presses.",
        "Can be performed safely with lighter weights."
      ],
      risks: [
        "Shoulder pinching if internally rotating too aggressively.",
        "Neck muscle (trapezius) dominance if shrugging upwards."
      ],
      commonMistakes: [
        "Using heavy momentum and swinging hips to raise dumbbells.",
        "Shrugging shoulders into the neck.",
        "Raising hands way higher than elbows."
      ],
      safetyTips: [
        "Lift with your elbows, not your hands.",
        "Choose light weights where you can control a 1-second pause at the top."
      ],
      alternatives: ["Cable Lateral Raises", "Resistance Band Side Raises", "Machine Lateral Raise"],
      recoveryFoods: ["Sprouted Moong Salad", "Paneer Tikka", "Soy Milk", "Eggs"],
      icon: "shoulders"
    },
    {
      id: "barbell-rows",
      name: "Bent-Over Barbell / Dumbbell Rows",
      bodyPart: "back",
      bodyPartName: "Back",
      secondaryMuscles: ["Biceps", "Rhomboids", "Posterior Deltoids", "Erector Spinae", "Forearms"],
      difficulty: "Intermediate",
      equipment: "Barbell or Pair of Dumbbells",
      setsReps: "3-4 sets of 8-12 reps",
      restTime: "90 seconds",
      instructions: [
        "Stand with feet hip-width apart holding a barbell with an overhand or underhand grip.",
        "Hinge at your hips pushing your glutes back until your torso is roughly 45 degrees to the floor, back completely flat.",
        "Let the bar hang at arm's length below your knees with lats engaged.",
        "Pull the bar smoothly toward your lower ribcage / navel by driving elbows up and back.",
        "Squeeze your shoulder blades together tightly at the peak contraction.",
        "Lower the bar under control back to the starting stretch."
      ],
      benefits: [
        "Builds back thickness, improving posture by pulling hunched shoulders back.",
        "Strengthens the isometric hip hinge necessary for heavy deadlifts.",
        "Develops powerful grip and bicep pulling strength."
      ],
      risks: [
        "Lower back fatigue/sprain if the spine rounds under load.",
        "Jerking the upper body upward to swing the bar."
      ],
      commonMistakes: [
        "Standing almost upright and turning the lift into a shrug.",
        "Rounding the lower back.",
        "Bouncing torso up and down with each rep."
      ],
      safetyTips: [
        "Keep your core braced tightly and neck in neutral alignment with your spine.",
        "Use chest-supported incline rows if lower back endurance is limiting your back work."
      ],
      alternatives: ["Chest-Supported T-Bar Row", "Single-arm Dumbbell Row", "Seated Cable Row"],
      recoveryFoods: ["Fish Curry", "Chicken", "Rajma Chawal", "Sprouted Dal"],
      icon: "back"
    },
    {
      id: "glute-bridges",
      name: "Barbell / Bodyweight Hip Thrust & Glute Bridge",
      bodyPart: "glutes",
      bodyPartName: "Glutes",
      secondaryMuscles: ["Hamstrings", "Quadriceps", "Core / Lower Back"],
      difficulty: "Beginner",
      equipment: "Bodyweight or Barbell & Bench",
      setsReps: "3-4 sets of 12-15 reps",
      restTime: "60-90 seconds",
      instructions: [
        "Lie on your back on the floor with knees bent and feet flat on the ground hip-width apart (or rest upper back against a bench).",
        "Place feet so that shins are vertical when hips are elevated at the top.",
        "Drive through your heels, tilting your pelvis posteriorly to squeeze and lock out glutes.",
        "Lift hips until your thighs and torso form a straight line from knees to shoulders.",
        "Hold the peak contraction for 2 seconds, ensuring you do not hyperextend your lower back.",
        "Lower hips under control back to the floor."
      ],
      benefits: [
        "Highest EMG activation for gluteus maximus without spinal axial loading.",
        "Combats 'glute amnesia' caused by prolonged sitting.",
        "Protects lower back and enhances sprinting and jumping mechanics."
      ],
      risks: [
        "Hyperextending the lumbar spine instead of extending through the hips.",
        "Quad dominance if feet are placed too close to the glutes."
      ],
      commonMistakes: [
        "Arching lower back rather than tucking tailbone at the top.",
        "Pushing off the toes rather than the heels.",
        "Rushing the reps without a pause at peak contraction."
      ],
      safetyTips: [
        "Keep your chin tucked toward your chest at the top of the hip thrust to protect your lumbar spine.",
        "Use a padded barbell collar or foam mat across hips for comfort."
      ],
      alternatives: ["Single-Leg Glute Bridge", "Cable Pull-Throughs", "Bulgarian Split Squats"],
      recoveryFoods: ["Paneer", "Chickpea Salad", "Curd with Berries", "Eggs"],
      icon: "glutes"
    },
    {
      id: "romanian-deadlift",
      name: "Romanian Deadlift (RDL)",
      bodyPart: "hamstrings",
      bodyPartName: "Hamstrings",
      secondaryMuscles: ["Glutes", "Erector Spinae", "Forearms / Grip", "Lats"],
      difficulty: "Intermediate",
      equipment: "Barbell or Dumbbells",
      setsReps: "3-4 sets of 8-12 reps",
      restTime: "90 seconds",
      instructions: [
        "Stand tall holding the barbell or dumbbells with a slight bend in your knees.",
        "Keeping your back rigid and chest proud, push your hips directly backward as if trying to touch the wall behind you with your glutes.",
        "Slide the weights down close to your thighs and shins, feeling a deep stretch along the hamstrings.",
        "Lower until weights reach just below your knees or mid-shin without rounding your spine.",
        "Drive hips forward and contract your glutes and hamstrings to return to the starting position."
      ],
      benefits: [
        "King of hamstring hypertrophy and knee injury prevention.",
        "Teaches pristine hip hinging mechanics essential for athletic power.",
        "Strengthens tendons around the knee and hip joints."
      ],
      risks: [
        "Rounding the lumbar spine when reaching too far toward feet.",
        "Squatting the weight rather than hinging hips backwards."
      ],
      commonMistakes: [
        "Bending the knees excessively, converting the movement into a squat.",
        "Letting the bar drift forward away from the legs.",
        "Hyperextending backward at the top."
      ],
      safetyTips: [
        "Only descend as far as your hamstrings allow while maintaining a flat spine.",
        "Think of moving your hips backward and forward rather than moving the bar up and down."
      ],
      alternatives: ["Dumbbell RDL", "Single-Leg RDL", "Lying Hamstring Machine Curl"],
      recoveryFoods: ["Soybeans", "Dal Makhani (light)", "Milk", "Peanut Butter Toast"],
      icon: "legs"
    },
    {
      id: "russian-twists",
      name: "Russian Twists",
      bodyPart: "abs",
      bodyPartName: "Abs & Core",
      secondaryMuscles: ["Internal & External Obliques", "Hip Flexors", "Transverse Abdominis"],
      difficulty: "Beginner",
      equipment: "Bodyweight or Medicine Ball / Plate",
      setsReps: "3 sets of 15-20 rotations per side",
      restTime: "45-60 seconds",
      instructions: [
        "Sit on the floor with knees bent and feet flat, then lean back slightly so torso is at a 45-degree angle to the floor.",
        "Lift feet a few inches off the floor to balance on your sit bones (or keep heels lightly on floor for beginners).",
        "Clasp hands in front of chest or hold a light weight.",
        "Rotate your torso smoothly from side to side, bringing your hands across your hip towards the floor on each side.",
        "Initiate movement from your ribcage and core rather than just flinging arms."
      ],
      benefits: [
        "Strengthens rotational core strength crucial for sports (tennis, cricket, boxing).",
        "Tones and strengthens lateral waist obliques.",
        "Enhances balance and proprioception."
      ],
      risks: [
        "Lumbar torsion if twisting aggressively with a rounded, slouched spine.",
        "Hip flexor cramping if relying solely on hips rather than abdominal wall."
      ],
      commonMistakes: [
        "Just swinging arms from side to side without rotating the actual torso.",
        "Slumping the lower back into severe spinal flexion.",
        "Moving too fast with poor control."
      ],
      safetyTips: [
        "Keep your chest elevated and back straight throughout the rotation.",
        "Keep heels on the ground if you feel any tension in your lower back."
      ],
      alternatives: ["Paloff Press", "Side Plank", "Bicycle Crunches"],
      recoveryFoods: ["Curd", "Almonds", "Sprouted Moong", "Boiled Egg"],
      icon: "core"
    },
    {
      id: "bar-hang",
      name: "Bar Hanging & Spinal Decompression (Dead Hang)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Lats", "Forearms / Grip", "Shoulders", "Abdominals"],
      difficulty: "Beginner",
      equipment: "Pull-up Bar or Overhead Sturdy Bar",
      setsReps: "3-4 sets of 30-60 second hangs",
      restTime: "60 seconds",
      instructions: [
        "Grip an overhead pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart.",
        "Slowly let your feet leave the floor, allowing gravity to gently pull your body downward in complete spinal traction.",
        "Relax your lower back, hips, and knees. Do not brace or clench your abdominal wall tightly.",
        "Breathe deeply into your diaphragm, allowing the space between each intervertebral disc to expand.",
        "Hold for 30 to 60 seconds, then step gently onto a box or the floor without dropping or jumping."
      ],
      benefits: [
        "Reverses daily gravitational spinal compression, expanding intervertebral disc spaces by 1-2 mm per disc.",
        "Corrects rounded thoracic posture and relieves compressed spinal nerve roots.",
        "Builds incredible grip, forearm strength, and decompresses shoulder impingement."
      ],
      risks: [
        "Jumping down abruptly from the bar which can compress spinal discs.",
        "Overstretching the rotator cuff if hanging passively with pre-existing shoulder impingement."
      ],
      commonMistakes: [
        "Swinging or kicking legs while hanging.",
        "Holding your breath instead of exhaling to relax spinal muscles.",
        "Dropping suddenly onto stiff, straight knees."
      ],
      safetyTips: [
        "Place a stool or box beneath you so you can gently lower your feet.",
        "If you are a beginner, keep your toes lightly touching the ground for 20% weight support."
      ],
      alternatives: ["Active Scapular Hang", "Inversion Table Traction", "Doorframe Supported Hang"],
      recoveryFoods: ["Cow's Milk", "Boiled Eggs", "Ragi Porridge", "Paneer", "Almonds"],
      icon: "spine"
    },
    {
      id: "cobra-stretch",
      name: "Cobra Stretch (Bhujangasana Spine Elongator)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Abs / Core", "Pectorals", "Hip Flexors", "Spinal Erectors"],
      difficulty: "Beginner",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "3 sets of 20-30 second holds",
      restTime: "45 seconds",
      instructions: [
        "Lie face down on a mat with legs extended straight behind you and tops of feet flat on the floor.",
        "Place your palms flat beneath your shoulders with elbows tucked close to your torso.",
        "Inhale and press gently through palms, peeling your chest, ribcage, and upper abdomen upward.",
        "Keep your pelvis and pubic bone firmly anchored to the floor.",
        "Draw your shoulder blades down and back, opening your chest and gazing forward/slightly upward.",
        "Hold for 20-30 seconds with calm diaphragmatic breaths, then slowly lower your chest back to the floor."
      ],
      benefits: [
        "Reverses hunchback (thoracic kyphosis) caused by phones and desk slouching, unlocking 1-2 inches of posture height.",
        "Lengthens tight hip flexors (iliopsoas) that pull the pelvis into an anterior pelvic tilt.",
        "Improves respiratory capacity by expanding chest intercostal muscles."
      ],
      risks: [
        "Compressing the lower back by forcefully jamming the lumbar spine backward.",
        "Shrugging shoulders into ears."
      ],
      commonMistakes: [
        "Lifting hips completely off the ground.",
        "Hyperextending the cervical neck aggressively."
      ],
      safetyTips: [
        "Keep a soft bend in your elbows if you have lower back stiffness.",
        "Think of lengthening your spine forward and up, like reaching through the crown of your head."
      ],
      alternatives: ["Sphinx Pose", "Upward Facing Dog", "Prone Press-ups"],
      recoveryFoods: ["Curd / Dahi", "Soya Chunks", "Spinach with Lemon", "Sesame Seeds"],
      icon: "spine"
    },
    {
      id: "pelvic-shift",
      name: "Pelvic Shift & Bridge (Pelvic Realignment)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Glutes", "Hamstrings", "Transverse Abdominis", "Spinal Erectors"],
      difficulty: "Beginner",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "3 sets of 15 reps (holding 3s at top)",
      restTime: "45 seconds",
      instructions: [
        "Lie flat on your back with knees bent at 90 degrees and feet flat on the floor hip-width apart.",
        "Place arms by your sides with palms pressing lightly into the floor.",
        "Posteriorly tilt your pelvis to flatten your lower back completely against the floor.",
        "Drive through your heels, lifting your hips toward the ceiling until knees, hips, and shoulders form a diagonal line.",
        "Squeeze glutes hard at the top without hyperextending your lumbar spine.",
        "Hold the peak contraction for 3 seconds, then lower down vertebra by vertebra."
      ],
      benefits: [
        "Corrects anterior pelvic tilt (APT), which makes people appear 1-2 inches shorter by tilting hips forward.",
        "Strengthens the posterior chain to hold the pelvis in a neutral, tall, athletic alignment.",
        "Relieves compression on the L4-L5 and L5-S1 lumbar vertebrae."
      ],
      risks: [
        "Arching the ribcage upward instead of driving with gluteal activation."
      ],
      commonMistakes: [
        "Pushing through the toes instead of the heels.",
        "Rushing through the lowering phase without spinal control."
      ],
      safetyTips: [
        "Place a yoga block between your knees to ensure parallel alignment.",
        "Keep your abdominal wall pulled in toward your spine throughout."
      ],
      alternatives: ["Single-Leg Glute Bridge", "Barbell Hip Thrust", "Cat-Camel Pose"],
      recoveryFoods: ["Whole Eggs", "Paneer Bhurji", "Milk with Jaggery", "Dates"],
      icon: "spine"
    },
    {
      id: "jump-drills-skipping",
      name: "Plyometric Growth Jumps & Jump Rope",
      bodyPart: "height",
      bodyPartName: "Height & Growth",
      secondaryMuscles: ["Calves", "Quadriceps", "Core", "Ankle Tendons"],
      difficulty: "Intermediate",
      equipment: "Jump Rope or Flat Ground",
      setsReps: "3-5 rounds of 1-2 minutes or 20 vertical tuck jumps",
      restTime: "60 seconds",
      instructions: [
        "Stand tall on an athletic shock-absorbing surface (turf, mat, or wood floor) with feet shoulder-width apart.",
        "If using a jump rope, turn the rope with wrists only, jumping lightly on the balls of your feet 1-2 inches high.",
        "For vertical explosive jumps: dip into a quarter squat, swing arms upward forcefully, and jump as high as possible.",
        "Reach your fingertips toward the ceiling at maximum peak height as if touching the rim.",
        "Land softly on the forefoot, absorbing the impact through knees and hips."
      ],
      benefits: [
        "Vertical impact forces trigger osteoblast bone mineralization in the long bones (femur and tibia) during active growth years.",
        "High-intensity plyometric jumping stimulates acute pulses of Human Growth Hormone (HGH).",
        "Improves bone mineral density and athletic spring power."
      ],
      risks: [
        "Shin splints or knee stress if jumping on hard concrete barefoot."
      ],
      commonMistakes: [
        "Landing with locked, stiff knees.",
        "Slouching forward during jumping."
      ],
      safetyTips: [
        "Always jump on shock-absorbing surfaces wearing supportive athletic shoes.",
        "Avoid if experiencing active shin or knee pain."
      ],
      alternatives: ["Box Jumps", "Basketball Rebound Drills", "Ankle Hops"],
      recoveryFoods: ["Whey / Milk", "Bananas", "Peanut Butter Toast", "Soy Milk"],
      icon: "legs"
    },
    {
      id: "cat-cow-decompression",
      name: "Cat-Cow Spine Wave (Vertebral Mobilization)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Thoracic Spine", "Cervical Spine", "Abs", "Neck"],
      difficulty: "Beginner",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "3 sets of 12-15 slow wave cycles",
      restTime: "30 seconds",
      instructions: [
        "Start on all fours with hands directly below shoulders and knees directly below hips.",
        "Cow Pose (Inhale): Drop your belly toward the mat, lift your sit bones, and look gently upward, opening the chest.",
        "Cat Pose (Exhale): Press the floor away, round your spine toward the ceiling, tuck your tailbone, and bring your chin to your chest.",
        "Move slowly and rhythmically with your breath, feeling each individual spinal vertebra articulate.",
        "Complete 12 to 15 slow waves."
      ],
      benefits: [
        "Increases the circulation of synovial spinal fluid between the intervertebral discs.",
        "Releases chronic stiffness in the thoracic and lumbar spine that causes hunched stature.",
        "Prepares the spine for daily decompression and upright posture."
      ],
      risks: [
        "Aggressively cranking the neck backward during the Cow phase."
      ],
      commonMistakes: [
        "Moving too fast without synchronizing breath.",
        "Bending the elbows instead of articulating through the spine."
      ],
      safetyTips: [
        "Keep wrists directly under shoulders; use fists or folded mat if wrists are sensitive."
      ],
      alternatives: ["Child's Pose to Cobra Flow", "Thread the Needle", "Thoracic Foam Rolling"],
      recoveryFoods: ["Sprouted Moong", "Curd with Honey", "Almonds", "Sesame Seeds"],
      icon: "spine"
    },
    {
      id: "tadasana-reach",
      name: "Tadasana & Heel-Raise Vertical Reach",
      bodyPart: "height",
      bodyPartName: "Height & Growth",
      secondaryMuscles: ["Calves", "Anterior Deltoids", "Core", "Intercostals"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      setsReps: "3 sets of 10 raises with 5s hold at peak",
      restTime: "30 seconds",
      instructions: [
        "Stand tall with feet together or a few inches apart, weight distributed evenly across both feet.",
        "Inhale deeply while interlacing your fingers, turning palms upward, and extending arms fully toward the sky.",
        "Simultaneously rise up onto the tips of your toes, lifting heels as high as possible.",
        "Focus your gaze on a single point in front of you for balance.",
        "Reach upward through your crown and fingertips as if trying to touch the ceiling, elongating your whole body.",
        "Hold at the peak for 5 seconds while breathing smoothly, then gently lower your heels and arms."
      ],
      benefits: [
        "Elongates the full superficial back and front lines of the body.",
        "Strengthens deep intrinsic foot and calf muscles for taller balance.",
        "Teaches the nervous system optimal neuromuscular vertical alignment."
      ],
      risks: [
        "Losing balance if looking around rapidly."
      ],
      commonMistakes: [
        "Arching the lower back instead of engaging the core to lengthen upward."
      ],
      safetyTips: [
        "Stand near a wall for balance support if heels feel shaky."
      ],
      alternatives: ["Wall Overhead Stretch", "Warrior I Pose", "Doorway High Stretch"],
      recoveryFoods: ["Milk with Turmeric & Black Pepper", "Eggs", "Ragi Roti", "Paneer"],
      icon: "spine"
    },
    {
      id: "pilates-rollover",
      name: "Pilates Spine Roll-Over & Plough Pose",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Deep Core", "Hamstrings", "Cervical & Thoracic Extensors"],
      difficulty: "Intermediate",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "3 sets of 6-8 slow controlled roll-overs",
      restTime: "45 seconds",
      instructions: [
        "Lie on your back with arms pressed firmly by your sides, palms facing down, and legs extended straight at a 45-degree angle.",
        "Inhale and engage your deep lower abdominals, lifting your legs over your torso until they are perpendicular to the floor.",
        "Using your core—not momentum—roll your spine off the mat vertebra by vertebra, reaching your toes toward the floor behind your head.",
        "Keep your weight on your shoulders and upper back, NEVER pressing weight into your delicate cervical neck.",
        "Separate your feet shoulder-width, flex your ankles, and slowly roll your spine back down onto the floor, vertebra by vertebra, maintaining core tension."
      ],
      benefits: [
        "Provides the deepest decompression of the thoracic and lumbar spine, separating compressed vertebrae.",
        "Lengthens the entire superficial posterior chain from plantar fascia up to the occipital base.",
        "Massages abdominal organs and improves vertebral flexibility."
      ],
      risks: [
        "Placing bodyweight directly on the neck or turning head sideways while rolled over.",
        "Dropping legs forcefully without spinal abdominal control."
      ],
      commonMistakes: [
        "Throwing legs with wild momentum instead of rolling with abdominal control.",
        "Holding your breath during the inversion."
      ],
      safetyTips: [
        "Keep gaze strictly looking straight up at your belly; never turn your head to the side while inverted.",
        "Avoid if you have acute cervical herniation, uncontrolled high blood pressure, or glaucoma."
      ],
      alternatives: ["Knees-to-Chest Hug", "Cat-Cow Stretch", "Legs-Up-The-Wall Pose"],
      recoveryFoods: ["Cow's Milk", "Sprouted Moong", "Curd", "Almonds"],
      icon: "spine"
    },
    {
      id: "dryland-swim",
      name: "Dryland Swimming & Prone Flutter (Superman Swims)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Multifidus", "Erector Spinae", "Glutes", "Posterior Deltoids"],
      difficulty: "Beginner",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "3 sets of 30-45 seconds continuous flutter",
      restTime: "45 seconds",
      instructions: [
        "Lie flat on your stomach with arms reached straight overhead and legs extended straight behind you.",
        "Inhale and lift your chest, arms, thighs, and feet a few inches off the floor, engaging your back extensors.",
        "Simultaneously lift your right arm and left leg slightly higher, then alternate by lifting left arm and right leg in a smooth, continuous swimming flutter motion.",
        "Keep your head in neutral alignment with your neck, gazing toward the floor 6 inches ahead of your mat.",
        "Breathe rhythmically while maintaining continuous flutter for 30 to 45 seconds."
      ],
      benefits: [
        "Strengthens the deep multifidus and erector spinae muscles that hold the spine tall against gravity.",
        "Counters anterior pelvic tilt and desk-slouching kyphosis without any spinal compressive loading.",
        "Builds stamina in the posterior kinetic chain required for effortless upright posture."
      ],
      risks: [
        "Cranking the neck upward to look at the ceiling, straining the cervical spine."
      ],
      commonMistakes: [
        "Bending the knees excessively instead of kicking from the hips with straight legs.",
        "Holding breath during the exercise."
      ],
      safetyTips: [
        "Focus on reaching outward for length rather than just arching as high as possible."
      ],
      alternatives: ["Bird-Dog Hold", "Standard Superman Hold", "Back Extension Bench"],
      recoveryFoods: ["Boiled Eggs", "Soya Chunks", "Paneer", "Milk with Jaggery"],
      icon: "spine"
    },
    {
      id: "forward-spine-stretch",
      name: "Seated Forward Spine Elongation (Paschimottanasana)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Hamstrings", "Calves", "Thoracolumbar Fascia", "Spinal Erectors"],
      difficulty: "Beginner",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "3 sets of 30-45 second holds",
      restTime: "30 seconds",
      instructions: [
        "Sit on the floor with legs extended straight in front of you, toes pointing upward toward the ceiling.",
        "Sit tall on your sit bones, elongating the crown of your head upward.",
        "Inhale and raise both arms straight overhead, lengthening your ribcage away from your pelvis.",
        "Exhale and hinge forward from your hips (not your upper back), reaching your hands toward your shins, ankles, or toes.",
        "Hold onto your feet or shins with a flat back, pulling your chest forward toward your toes rather than rounding nose to knees.",
        "Breathe deeply, feeling the stretch along the entire back of your thighs, calves, and lower spine."
      ],
      benefits: [
        "Releases tight hamstrings and calves that pull the pelvis into an exaggerated posterior or anterior tilt.",
        "Lengthens the connective thoracolumbar fascia surrounding the spinal column.",
        "Improves blood circulation through the spinal canal."
      ],
      risks: [
        "Forcibly hunching the upper back to touch toes with hands."
      ],
      commonMistakes: [
        "Rounding through the shoulders instead of hinging from the hips.",
        "Bending knees aggressively without feeling hamstring traction."
      ],
      safetyTips: [
        "Loop a towel or yoga strap around your feet if you cannot comfortably reach your toes.",
        "Keep chest proud and shoulders pulled away from ears."
      ],
      alternatives: ["Standing Forward Fold", "Seated Single-Leg Stretch", "Downward Dog"],
      recoveryFoods: ["Curd / Dahi", "Pumpkin Seeds", "Spinach with Lemon", "Dates"],
      icon: "spine"
    },
    {
      id: "inversion-bench-hang",
      name: "Incline Bench / Inversion Spinal Traction",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Core", "Spinal Erectors", "Quadratus Lumborum"],
      difficulty: "Intermediate",
      equipment: "Decline Bench / Inversion Table or Slant Board",
      setsReps: "2-3 sets of 60-90 seconds inversion",
      restTime: "60 seconds",
      instructions: [
        "Position yourself on an inversion table or secure your feet at the top of a decline abdominal bench.",
        "Allow your body to gently tilt backward into an inverted or semi-inverted downward slant.",
        "Extend arms overhead or relax them on your chest, letting gravity apply continuous upward traction along your vertebrae.",
        "Take slow, calm breaths into your belly, consciously letting all tension in your lower back dissolve.",
        "Remain inverted for 60 to 90 seconds, then slowly return to horizontal and pause for 20 seconds before standing up."
      ],
      benefits: [
        "Reverses 100% of gravitational compression on intervertebral discs.",
        "Encourages disc rehydration by drawing fluid into the nucleus pulposus.",
        "Alleviates nerve root impingement and sciatic pressure."
      ],
      risks: [
        "Standing up rapidly after inversion, which can cause orthostatic dizziness.",
        "Not securing feet firmly on the incline/inversion locks."
      ],
      commonMistakes: [
        "Tensing core or back muscles while inverted instead of completely relaxing.",
        "Staying inverted too long on the first trial."
      ],
      safetyTips: [
        "Start with a gentle 15-20 degree angle before attempting deeper inversion.",
        "Avoid if you have glaucoma, extreme hypertension, or ear infections."
      ],
      alternatives: ["Dead Hang on Pull-up Bar", "Foam Roller Spinal Extension", "Child's Pose"],
      recoveryFoods: ["Cow's Milk", "Ragi Malt", "Paneer", "Almonds"],
      icon: "spine"
    },
    {
      id: "hanging-knee-tuck",
      name: "Hanging Bar Knee Tucks & Pelvic Traction",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Rectus Abdominis", "Hip Flexors", "Forearms / Grip", "Lats"],
      difficulty: "Intermediate",
      equipment: "Pull-up Bar",
      setsReps: "3 sets of 10-12 reps",
      restTime: "60 seconds",
      instructions: [
        "Grip an overhead pull-up bar with an overhand grip, hanging with arms fully extended and body still.",
        "Exhale and engage your lower abdominals, slowly curling your pelvis and drawing your knees toward your chest.",
        "Hold the contracted position at top for 1 second, focusing on posterior pelvic tucking.",
        "Inhale and lower your legs slowly under control back to the dead hang position.",
        "Allow the spine to fully decompress at the bottom between every repetition without swinging."
      ],
      benefits: [
        "Combines the gravitational disc decompression of bar hanging with active abdominal strengthening.",
        "Directly targets the lower abdominal wall to correct forward anterior pelvic tilt.",
        "Develops athletic grip strength and scapular depression stability."
      ],
      risks: [
        "Swinging violently using momentum instead of abdominal flexion.",
        "Hyperextending the lower back at the bottom of the rep."
      ],
      commonMistakes: [
        "Kicking legs forward without tilting the pelvis upward.",
        "Dropping legs rapidly without controlling the eccentric phase."
      ],
      safetyTips: [
        "Imagine tucking your belt buckle toward your ribcage on each repetition."
      ],
      alternatives: ["Lying Reverse Crunches", "Captain's Chair Knee Raises", "Dead Bug"],
      recoveryFoods: ["Eggs", "Chicken Breast", "Dal Tadka with Rice", "Soy Milk"],
      icon: "spine"
    },
    {
      id: "bridge-wheel-pose",
      name: "Chakrasana & Wheel Pose (Full Spinal Extension)",
      bodyPart: "height",
      bodyPartName: "Height & Spine",
      secondaryMuscles: ["Triceps", "Shoulders", "Glutes", "Hamstrings", "Intercostals"],
      difficulty: "Advanced",
      equipment: "Yoga Mat / Bodyweight",
      setsReps: "2-3 holds of 15-25 seconds",
      restTime: "60 seconds",
      instructions: [
        "Lie on your back with knees bent, feet flat on the floor hip-width apart and close to your glutes.",
        "Bend your elbows and place your palms flat on the mat beside your ears, fingers pointing toward your shoulders.",
        "Inhale, press firmly into your feet and palms simultaneously, lifting hips and chest off the floor.",
        "Press the floor away to straighten arms, arching your entire spine into an upward wheel shape.",
        "Roll your thighs slightly inward and press your chest toward the wall behind you to open the thoracic spine.",
        "Hold for 15 to 25 seconds breathing smoothly, then tuck your chin to your chest and slowly lower down."
      ],
      benefits: [
        "The ultimate antidote to chronic sitting and forward hunching, opening up every single anterior joint.",
        "Expands the ribcage and intercostal spaces, enhancing lung capacity and upright posture.",
        "Strengthens the entire posterior muscular chain from heels to wrists."
      ],
      risks: [
        "Wrist strain if pushing up with cold, stiff wrists.",
        "Pinching sensation in lower back if glutes and legs are inactive."
      ],
      commonMistakes: [
        "Flaring knees wide outward instead of keeping them parallel.",
        "Collapsing onto the crown of the head."
      ],
      safetyTips: [
        "Master the standard Pelvic Bridge and Cobra Stretch first before attempting full wheel.",
        "Always tuck your chin toward your chest when lowering down to protect your neck."
      ],
      alternatives: ["Bridge Pose with Block", "Camel Pose (Ustrasana)", "Cobra Stretch"],
      recoveryFoods: ["Milk with Turmeric", "Whole Eggs", "Paneer", "Dates with Almonds"],
      icon: "spine"
    },

    // =========================================================================
    // GYM & RESISTANCE TRAINING EXERCISES
    // =========================================================================
    {
      id: "lat-pulldown",
      name: "Cable Lat Pulldown (Wide & Neutral Grip)",
      bodyPart: "back",
      bodyPartName: "Back",
      secondaryMuscles: ["Biceps", "Rhomboids", "Middle & Lower Traps", "Brachialis"],
      difficulty: "Beginner",
      equipment: "Cable Lat Pulldown Machine",
      setsReps: "3-4 sets of 10-12 reps",
      restTime: "90 seconds",
      instructions: [
        "Sit on the lat pulldown machine and adjust the thigh pad securely so your thighs are locked down snug.",
        "Grip the wide bar with an overhand grip slightly wider than shoulder-width.",
        "Lean back slightly (10-15 degrees), push your chest outward, and retract your shoulder blades.",
        "Pull the bar smoothly down toward your upper chest, driving your elbows downward and slightly backward.",
        "Squeeze your lats hard at the bottom contraction for 1 second without swaying your lower back.",
        "Slowly extend arms upward under control, feeling a deep stretch along your lats at the top."
      ],
      benefits: [
        "The premier gym back exercise to build the classic athletic V-taper physique.",
        "Directly targets the latissimus dorsi without requiring the bodyweight strength of a full pull-up.",
        "Decompresses thoracic spine through controlled eccentric stretch at the top of each rep."
      ],
      risks: [
        "Pulling behind the neck which strains the cervical vertebrae and rotator cuff.",
        "Swinging the torso wildly to jerk heavy weight down."
      ],
      commonMistakes: [
        "Using momentum by swinging torso back and forth like a rowing machine.",
        "Pulling the bar too low down to the abdomen."
      ],
      safetyTips: [
        "Always pull to the upper chest (collarbone), never behind the head.",
        "Focus on pulling with your elbows rather than gripping with your forearms."
      ],
      alternatives: ["Pull-ups", "Seated Cable Row", "Resistance Band Pulldown"],
      recoveryFoods: ["Chicken Breast", "Egg White Omelette", "Paneer Salad", "Soy Chunks"],
      icon: "back"
    },
    {
      id: "leg-press",
      name: "45-Degree Leg Press",
      bodyPart: "quadriceps",
      bodyPartName: "Quadriceps & Legs",
      secondaryMuscles: ["Glutes", "Hamstrings", "Calves"],
      difficulty: "Intermediate",
      equipment: "45-Degree Leg Press Machine",
      setsReps: "3-4 sets of 10-15 reps",
      restTime: "90-120 seconds",
      instructions: [
        "Sit on the 45-degree leg press machine with your back and head resting flat against the padded support.",
        "Place your feet flat on the sled platform hip-width apart in the center of the plate.",
        "Release the safety handles and unlock the weight sled with your legs extended (knees soft, NOT hyperextended).",
        "Inhale and lower the sled slowly under control until your knees are bent at approximately 90 degrees.",
        "Ensure your lower back and glutes remain pressed firmly against the back pad—do not let your hips round off the seat.",
        "Drive through your mid-foot and heels to push the sled back up to the starting position without locking knees."
      ],
      benefits: [
        "Allows heavy overload of quadriceps and glutes with zero axial compression on the spinal column.",
        "Great for building massive leg hypertrophy safely without requiring Olympic barbell balance.",
        "Foot placement can be adjusted (higher for glutes/hamstrings, lower for quad focus)."
      ],
      risks: [
        "Locking knees violently at the top of the press, risking hyperextension joint injury.",
        "Lowering the sled so deep that the pelvis lifts (butt wink), rounding the lumbar spine under heavy load."
      ],
      commonMistakes: [
        "Placing hands on knees to push the weight up.",
        "Allowing knees to cave inward (valgus collapse) during the press."
      ],
      safetyTips: [
        "Always keep safety stops set at a safe height.",
        "Never completely lock or snap your knees straight at the top."
      ],
      alternatives: ["Barbell Back Squat", "Goblet Squat", "Hack Squat"],
      recoveryFoods: ["Protein Shake with Milk", "Chicken with Rice", "Sprouted Moong Salad", "Curd"],
      icon: "legs"
    },
    {
      id: "cable-chest-fly",
      name: "Standing Cable Crossover / Chest Fly",
      bodyPart: "chest",
      bodyPartName: "Chest",
      secondaryMuscles: ["Anterior Deltoids", "Biceps Short Head", "Serratus Anterior"],
      difficulty: "Beginner",
      equipment: "Dual Cable Pulley Machine",
      setsReps: "3-4 sets of 12-15 reps",
      restTime: "60 seconds",
      instructions: [
        "Set the cable pulleys at chest height or slightly above, attaching single D-handles to each side.",
        "Grip both handles and step forward into a staggered stance with a slight forward lean at the torso.",
        "Maintain a slight, fixed bend in your elbows (approx 15 degrees) throughout the entire movement.",
        "Exhale and bring both handles forward in a hugging arc motion until your hands meet in front of your sternum.",
        "Squeeze your inner pectorals hard at the peak contraction for 1 second.",
        "Inhale and allow arms to open wide back to the sides in a slow, controlled 3-second eccentric stretch."
      ],
      benefits: [
        "Provides constant tension across the entire range of motion, unlike dumbbells which lose tension at the top.",
        "Directly isolates horizontal adduction of the pectoralis major for chest thickness and striations.",
        "Safe on shoulder joints with easily customizable pulley angles."
      ],
      risks: [
        "Overstretching the anterior shoulder capsule by letting cables pull arms too far behind the torso."
      ],
      commonMistakes: [
        "Turning the fly into a pressing motion by bending and straightening elbows.",
        "Using excessive body momentum and rocking torso back and forth."
      ],
      safetyTips: [
        "Keep elbows slightly bent and locked in position like hugging a large tree trunk.",
        "Only stretch back until hands are level with your chest."
      ],
      alternatives: ["Dumbbell Flyes", "Pec Deck Machine", "Push-ups"],
      recoveryFoods: ["Paneer Bhurji", "Boiled Eggs", "Soy Milk", "Peanut Butter Sandwich"],
      icon: "chest"
    },
    {
      id: "incline-dumbbell-press",
      name: "Incline Dumbbell Bench Press",
      bodyPart: "chest",
      bodyPartName: "Chest (Upper)",
      secondaryMuscles: ["Anterior Deltoids", "Triceps Brachii", "Upper Pectorals"],
      difficulty: "Intermediate",
      equipment: "Incline Bench (30-45 degrees) & Dumbbells",
      setsReps: "3-4 sets of 8-12 reps",
      restTime: "90 seconds",
      instructions: [
        "Set an adjustable bench to a 30 to 45-degree angle (a 30-degree incline maximizes upper chest while minimizing shoulder strain).",
        "Sit on the bench holding a dumbbell on each thigh, then kick them up to your shoulders as you lie back.",
        "Plant feet firmly on the floor, pull shoulder blades back and down into the bench, and expand your chest.",
        "Press dumbbells upward over upper chest until arms are extended, keeping elbows at a 45-degree angle to your ribs.",
        "Lower dumbbells under control until the weights are level with your upper chest, feeling a deep pec stretch.",
        "Drive through your chest to press dumbbells back upward without clanking them together at the top."
      ],
      benefits: [
        "Targets the clavicular head of the pectoralis major, filling in the upper chest shelf.",
        "Independent dumbbell loading fixes muscular imbalances between left and right sides.",
        "Natural wrist rotation reduces shoulder impingement compared to a fixed barbell."
      ],
      risks: [
        "Setting bench too steep (above 45 degrees), which shifts all load to anterior deltoids.",
        "Flaring elbows wide at 90 degrees which impinges the rotator cuff."
      ],
      commonMistakes: [
        "Bouncing dumbbells off chest.",
        "Lifting glutes off the bench to turn the press into a flat press."
      ],
      safetyTips: [
        "Keep wrists stacked directly over your elbows throughout the movement.",
        "Use your thighs to kick the dumbbells into starting position safely."
      ],
      alternatives: ["Incline Barbell Bench Press", "Decline Push-ups", "Incline Hammer Strength Press"],
      recoveryFoods: ["Chicken Breast", "Egg Curry with Roti", "Greek Yogurt", "Soya Chunks"],
      icon: "chest"
    },
    {
      id: "seated-cable-row",
      name: "Seated Cable Row (Close-Grip V-Bar)",
      bodyPart: "back",
      bodyPartName: "Back",
      secondaryMuscles: ["Rhomboids", "Middle Trapezius", "Latissimus Dorsi", "Biceps"],
      difficulty: "Beginner",
      equipment: "Low Cable Row Machine with V-Handle",
      setsReps: "3-4 sets of 10-12 reps",
      restTime: "75 seconds",
      instructions: [
        "Sit on the low row bench with feet on the footplates, knees slightly bent (never locked).",
        "Reach forward to grip the V-bar handle and sit back with your torso upright and a slight natural arch in your lower back.",
        "Inhale, roll your shoulders back, and expand your chest.",
        "Exhale and pull the V-handle toward your lower ribcage/navel, driving your elbows straight back close to your sides.",
        "Squeeze your shoulder blades together tightly at the peak contraction for 1 full second.",
        "Inhale and return the handle forward under control, letting your lats stretch without rounding your lower back."
      ],
      benefits: [
        "Builds tremendous back thickness, targeting the rhomboids and mid-traps for superior postural support.",
        "Protects the spine by keeping torso upright without heavy axial compressive shear.",
        "Strengthens scapular retraction, reversing slouching rounded shoulders."
      ],
      risks: [
        "Swinging the torso backward and forward excessively, straining lumbar erectors."
      ],
      commonMistakes: [
        "Shrugging shoulders upward during the pull.",
        "Letting lower back round into spinal flexion at the stretch."
      ],
      safetyTips: [
        "Keep your torso stationary with just a slight 5-degree natural hinge.",
        "Lead the movement with your elbows and scapular squeeze."
      ],
      alternatives: ["Bent-Over Barbell Row", "One-Arm Dumbbell Row", "Chest-Supported T-Bar Row"],
      recoveryFoods: ["Dal Makhani (light)", "Paneer Tikka", "Boiled Eggs", "Almonds"],
      icon: "back"
    },
    {
      id: "dumbbell-lateral-raise",
      name: "Dumbbell Lateral Raise (Side Deltoid Builder)",
      bodyPart: "shoulders",
      bodyPartName: "Shoulders",
      secondaryMuscles: ["Lateral Deltoid", "Upper Trapezius", "Supraspinatus"],
      difficulty: "Beginner",
      equipment: "Dumbbells",
      setsReps: "3-4 sets of 12-15 reps",
      restTime: "60 seconds",
      instructions: [
        "Stand tall with feet hip-width apart, holding a light dumbbell in each hand by your sides.",
        "Hinge forward slightly (5-10 degrees) at your hips, keeping core tight and chest elevated.",
        "Maintain a slight, fixed bend in your elbows (approx 10 degrees).",
        "Raise dumbbells outward to the sides in the scapular plane (approx 20 degrees forward of your torso).",
        "Lift until arms are parallel to the floor (shoulder height), leading with your elbows.",
        "Hold the peak contraction for 1 second, then lower the weights under control over 2 full seconds."
      ],
      benefits: [
        "The single most effective exercise for developing wide, round 'cannonball' side shoulders.",
        "Creates the classic broad shoulder-to-waist ratio (V-taper).",
        "Safe on joints when performed with light-to-moderate weights and strict form."
      ],
      risks: [
        "Using excessive weight and swinging torso, which recruits traps and strains the rotator cuff."
      ],
      commonMistakes: [
        "Lifting weights above shoulder height, pinching the acromion process.",
        "Leading with wrists higher than elbows."
      ],
      safetyTips: [
        "Pour the water cue: keep pinky fingers slightly higher than thumbs at the top.",
        "Never use heavy weights with jerking momentum; lateral deltoids respond best to strict time-under-tension."
      ],
      alternatives: ["Cable Lateral Raise", "Machine Lateral Raise", "Resistance Band Side Raise"],
      recoveryFoods: ["Milk", "Eggs", "Peanut Butter Banana Shake", "Sprouted Moong"],
      icon: "shoulders"
    },
    {
      id: "leg-curl",
      name: "Lying / Seated Hamstring Leg Curl",
      bodyPart: "hamstrings",
      bodyPartName: "Hamstrings",
      secondaryMuscles: ["Gastrocnemius", "Gracilis", "Sartorius"],
      difficulty: "Beginner",
      equipment: "Leg Curl Machine",
      setsReps: "3-4 sets of 10-12 reps",
      restTime: "75 seconds",
      instructions: [
        "Lie face down on the leg curl machine, adjusting the padded roller so it rests just below your calves (above Achilles tendon).",
        "Grip the support handles firmly and press your hips and pelvis flat against the bench pad.",
        "Exhale and curl your legs upward toward your glutes, contracting your hamstrings through full knee flexion.",
        "Pause and squeeze your hamstrings hard at peak contraction for 1 second.",
        "Inhale and lower the weight slowly under 3-second control back to starting position without letting weight stack slam."
      ],
      benefits: [
        "Directly isolates knee flexion, the primary biological function of the hamstring complex.",
        "Vital for knee joint stability and ACL injury prevention in athletes and runners.",
        "Zero lower-back strain compared to heavy free-weight hinging."
      ],
      risks: [
        "Lifting hips off the bench pad to cheat the weight up, straining the lumbar spine."
      ],
      commonMistakes: [
        "Allowing weight stack to slam at the bottom.",
        "Curling too fast without feeling the eccentric hamstring burn."
      ],
      safetyTips: [
        "Keep your feet dorsiflexed (toes pulled toward shins) for maximum hamstring engagement."
      ],
      alternatives: ["Romanian Deadlift", "Swiss Ball Hamstring Curl", "Nordic Hamstring Curl"],
      recoveryFoods: ["Soybeans", "Paneer", "Milk with Jaggery", "Dates"],
      icon: "legs"
    },
    {
      id: "tricep-pushdown",
      name: "Cable Tricep Rope Pushdown",
      bodyPart: "triceps",
      bodyPartName: "Triceps",
      secondaryMuscles: ["Triceps Lateral Head", "Triceps Medial Head", "Anconeus"],
      difficulty: "Beginner",
      equipment: "Cable Pulley Machine & Rope Attachment",
      setsReps: "3-4 sets of 12-15 reps",
      restTime: "60 seconds",
      instructions: [
        "Attach a rope attachment to the high pulley of a cable station.",
        "Grip the rope near the knotted ends with a neutral grip (palms facing each other).",
        "Take a half step back, hinge slightly at hips, and pin your elbows securely against your ribcage.",
        "Exhale and push the rope straight downward by extending your elbows.",
        "At the bottom of the movement, spread the rope ends apart outward, locking out triceps completely for 1 second.",
        "Inhale and allow forearms to rise back up to roughly parallel with floor, keeping elbows glued to your sides."
      ],
      benefits: [
        "Isolates the lateral and medial heads of the triceps responsible for the 'horseshoe' upper arm look.",
        "Rope allows natural wrist rotation and maximum peak contraction without wrist pain.",
        "Essential assistance exercise for bench press and overhead pressing power."
      ],
      risks: [
        "Letting elbows flare forward and backward, turning the isolation into a shoulder press."
      ],
      commonMistakes: [
        "Leaning your upper body over the rope and using bodyweight to push down.",
        "Failing to spread rope ends apart at full extension."
      ],
      safetyTips: [
        "Lock your upper arms like a hinge; only your forearms should move."
      ],
      alternatives: ["Skull Crushers", "Close-Grip Bench Press", "Overhead Dumbbell Tricep Extension"],
      recoveryFoods: ["Eggs", "Chicken Breast", "Dal with Rice", "Curd"],
      icon: "triceps"
    },
    {
      id: "preacher-curl",
      name: "EZ-Bar / Dumbbell Preacher Curl",
      bodyPart: "biceps",
      bodyPartName: "Biceps",
      secondaryMuscles: ["Brachialis", "Brachioradialis", "Forearm Flexors"],
      difficulty: "Intermediate",
      equipment: "Preacher Bench & EZ-Curl Bar",
      setsReps: "3 sets of 10-12 reps",
      restTime: "75 seconds",
      instructions: [
        "Adjust the preacher bench seat so the slanted arm pad sits comfortably high in your armpits.",
        "Grip the inner cambered handles of the EZ-bar with an underhand grip, resting back of arms flat on the pad.",
        "Sit tall with your chest pressed against the front of the pad and feet planted firmly.",
        "Exhale and curl the bar upward toward your shoulders, stopping just before forearms reach vertical.",
        "Squeeze your bicep peaks hard at the top contraction for 1 second.",
        "Inhale and lower the bar slowly under strict 3-second control until arms are almost fully extended (keep soft bend to protect bicep tendon)."
      ],
      benefits: [
        "Completely eliminates shoulder swing and body momentum for 100% pure bicep isolation.",
        "Targets the short (inner) head of the biceps for thick fullness.",
        "Ergonomic EZ-bar angles minimize wrist and forearm torque."
      ],
      risks: [
        "Hyper-extending or bouncing the bar at the very bottom, which places dangerous strain on the distal bicep tendon."
      ],
      commonMistakes: [
        "Lifting elbows off the pad during the curl.",
        "Dropping the weight rapidly on the way down."
      ],
      safetyTips: [
        "Never drop the bar rapidly into lockout; stop 5 degrees before full elbow extension to keep continuous tension on muscle."
      ],
      alternatives: ["Incline Dumbbell Curl", "Standing Barbell Curl", "Concentration Curl"],
      recoveryFoods: ["Whey Protein Shake", "Paneer Sandwich", "Milk with Banana", "Eggs"],
      icon: "biceps"
    },
    {
      id: "standing-calf-raise",
      name: "Standing Machine / Smith Machine Calf Raise",
      bodyPart: "calves",
      bodyPartName: "Calves",
      secondaryMuscles: ["Gastrocnemius", "Soleus", "Tibialis Posterior"],
      difficulty: "Beginner",
      equipment: "Standing Calf Machine or Smith Machine with Step Block",
      setsReps: "4 sets of 15-20 reps (2s stretch at bottom, 1s squeeze at top)",
      restTime: "60 seconds",
      instructions: [
        "Position your shoulders comfortably under the padded levers of the standing calf machine (or bar across traps).",
        "Place the balls of your feet on the edge of the block with your heels hanging off into open space.",
        "Extend knees and hips to support the weight, keeping legs straight with a micro-soft bend in knees.",
        "Inhale and lower your heels as far as comfortable below the block level, feeling a deep, intense stretch in your calves for 2 seconds.",
        "Exhale and press forcefully through the balls of your feet and big toes, raising heels as high as possible.",
        "Contract calves at the very top of your toes for 1 full second before descending slowly."
      ],
      benefits: [
        "Maximizes hypertrophy of the gastrocnemius muscle which gives calves diamond-like width.",
        "Deep 2-second stretch strengthens the Achilles tendon and improves ankle dorsiflexion mobility.",
        "Directly enhances sprint speed, vertical jumping height, and foot arch stability."
      ],
      risks: [
        "Bouncing rapidly off the Achilles tendon like a pogo stick, causing tendon micro-tears."
      ],
      commonMistakes: [
        "Bending the knees to push the weight up with quadriceps instead of calves.",
        "Doing partial reps without the full deep stretch at the bottom."
      ],
      safetyTips: [
        "Always pause for a full 2 count in the deep stretch to eliminate elastic tendon recoil.",
        "Push straight through the ball of the big toe to prevent ankle rolling."
      ],
      alternatives: ["Seated Calf Raise", "Leg Press Calf Extension", "Single-Leg Bodyweight Calf Raise"],
      recoveryFoods: ["Curd / Dahi with Jaggery", "Boiled Eggs", "Almonds", "Soy Milk"],
      icon: "calves"
    },

    // Pregnancy & Maternal Exercises
    {
      id: "pelvic-floor-kegel",
      name: "Pelvic Floor Kegels",
      bodyPart: "women",
      bodyPartName: "Pregnancy / Pelvic",
      secondaryMuscles: ["Deep Core", "Transverse Abdominis", "Pubococcygeus"],
      difficulty: "Beginner",
      equipment: "Bodyweight",
      setsReps: "3 sets of 10-15 holds (5s each)",
      restTime: "45 seconds",
      photoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
      instructions: [
        "Sit comfortably on a chair or lie on your side with knees slightly bent.",
        "Identify your pelvic floor muscles by imagining stopping the flow of urine mid-stream.",
        "Contract these muscles inward and upward firmly without holding your breath.",
        "Hold the squeeze steadily for 5 seconds, maintaining smooth nasal breathing.",
        "Release completely and rest for 5 seconds before beginning the next repetition."
      ],
      benefits: [
        "Strengthens the hammock of muscles supporting the growing fetus and uterus.",
        "Prevents and resolves pregnancy-induced stress urinary incontinence.",
        "Improves neuromuscular control during the active pushing stage of labor.",
        "Promotes faster perineal tissue healing following delivery."
      ],
      risks: [
        "Pelvic floor hypertonicity if muscles are constantly clenched without full release.",
        "Over-fatigue if performed while actively urinating."
      ],
      commonMistakes: [
        "Holding your breath or clenching your glutes and thighs instead of the pelvic floor.",
        "Bearing downward instead of drawing muscles upward and inward."
      ],
      safetyTips: [
        "Inhale to relax and expand; exhale as you contract and lift.",
        "Perform 3 sessions daily for maximum pelvic support."
      ],
      alternatives: ["Glute Bridge with Squeeze", "Seated Core Bracing", "Birthing Ball Pelvic Bounces"],
      recoveryFoods: ["Warm Milk", "Almonds", "Curd / Dahi", "Spinach Moong Dal"],
      icon: "pelvic"
    },
    {
      id: "prenatal-walking",
      name: "Prenatal Brisk Walking",
      bodyPart: "women",
      bodyPartName: "Pregnancy / Cardio",
      secondaryMuscles: ["Calves", "Quadriceps", "Glutes", "Cardiovascular"],
      difficulty: "Beginner",
      equipment: "Walking Shoes",
      setsReps: "20-30 minutes continuous",
      restTime: "As needed",
      photoUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80",
      instructions: [
        "Wear comfortable athletic shoes with supportive arch cushioning and breathable attire.",
        "Begin with a 5-minute gentle strolling warm-up to lubricate knee and hip joints.",
        "Gradually increase to a brisk, conversational pace where you can comfortably speak a full sentence.",
        "Maintain upright posture with shoulders relaxed and eyes forward.",
        "Finish with 5 minutes of slow walking and gentle calf stretches."
      ],
      benefits: [
        "Zero-impact cardiovascular conditioning that enhances fetal oxygenation.",
        "Dramatically reduces the risk of gestational diabetes and preeclampsia.",
        "Maintains pelvic mobility and builds physical endurance for labor contractions.",
        "Alleviates pregnancy constipation by stimulating intestinal peristalsis."
      ],
      risks: [
        "Ankle twisting or falls on uneven paths due to Relaxin hormone joint laxity.",
        "Maternal dehydration or heat exhaustion during hot, humid afternoons."
      ],
      commonMistakes: [
        "Walking to the point of breathless exhaustion.",
        "Slouching the upper back or letting the pelvis tilt anteriorly."
      ],
      safetyTips: [
        "Always carry a water bottle and take sips every 10 minutes.",
        "Walk in well-lit, smooth parks or indoor shopping malls during peak summer heat."
      ],
      alternatives: ["Prenatal Stationary Cycling", "Water Aerobics", "Gentle Elliptical"],
      recoveryFoods: ["Tender Coconut Water", "Banana", "Boiled Egg", "Paneer Wrap"],
      icon: "walking"
    },
    {
      id: "prenatal-cat-cow",
      name: "Prenatal Cat-Cow Stretch",
      bodyPart: "women",
      bodyPartName: "Pregnancy / Spine",
      secondaryMuscles: ["Spinal Erectors", "Pelvic Floor", "Deep Abs"],
      difficulty: "Beginner",
      equipment: "Yoga Mat",
      setsReps: "2 sets of 10 slow breath cycles",
      restTime: "60 seconds",
      photoUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
      instructions: [
        "Position yourself on all fours on a padded yoga mat with wrists under shoulders and knees under hips.",
        "Keep your spine in a neutral tabletop position with neck lengthened.",
        "Inhale gently through your nose, letting your belly soften comfortably downward while looking slightly forward (Cow).",
        "Exhale through your mouth, gently rounding your middle and upper back upward toward the ceiling, tucking your chin (Cat).",
        "Flow between both positions slowly, synchronizing with your natural respiratory rhythm."
      ],
      benefits: [
        "Decompresses the lumbar spine and relieves sciatic nerve impingement from the heavy uterus.",
        "Encourages optimal fetal positioning (anterior vertex presentation) for smoother delivery.",
        "Relieves round ligament tension and lower back morning stiffness."
      ],
      risks: [
        "Excessive lumbar arching or hyperextension during the Cow phase.",
        "Wrist strain if weight is dumped into palms without pressing into finger pads."
      ],
      commonMistakes: [
        "Jerking the neck violently upward or drooping the shoulders.",
        "Holding your breath during the spinal flexion."
      ],
      safetyTips: [
        "Place a folded blanket under knees if you experience joint sensitivity.",
        "Keep the movement gentle and comfortable; never force a deep backbend."
      ],
      alternatives: ["Standing Cat-Cow with Hands on Thighs", "Birthing Ball Pelvic Rocks", "Child's Pose (Wide Knees)"],
      recoveryFoods: ["Warm Turmeric Milk", "Dates with Almonds", "Paneer", "Chamomile Tea"],
      icon: "spine"
    },
    {
      id: "prenatal-wall-squats",
      name: "Modified Wall Squat",
      bodyPart: "women",
      bodyPartName: "Pregnancy / Lower Body",
      secondaryMuscles: ["Quadriceps", "Gluteus Maximus", "Pelvic Girdle"],
      difficulty: "Beginner",
      equipment: "Smooth Wall or Chair",
      setsReps: "3 sets of 8-12 reps",
      restTime: "60 seconds",
      photoUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
      instructions: [
        "Stand with your back flat against a wall, feet placed about 18 inches forward, shoulder-width apart, toes turned out 30 degrees.",
        "Slowly slide your back down the wall until your thighs reach a comfortable 45-degree angle (or parallel to a chair height).",
        "Keep your weight centered over your heels and ensure your knees track in line with your second toes.",
        "Hold the bottom position for 2 seconds while breathing smoothly.",
        "Press forcefully through your heels to slide back up to the starting position."
      ],
      benefits: [
        "Strengthens lower extremity muscles needed to bear progressive gestational weight gain.",
        "Widens the pelvic outlet by up to 15%, creating optimal space for fetal engagement.",
        "Preserves knee and hip bone density throughout pregnancy."
      ],
      risks: [
        "Loss of balance if attempted without wall or chair support.",
        "Knee strain if knees cave inward during the descent."
      ],
      commonMistakes: [
        "Squatting too deep past 90 degrees in the third trimester.",
        "Pushing off toes rather than driving through the heels."
      ],
      safetyTips: [
        "Place a sturdy chair in front of you to hold onto for extra stability.",
        "Contraindicated in cases of placenta previa or incompetent cervix."
      ],
      alternatives: ["Chair Sit-to-Stands", "Sumo Squat with Kitchen Counter Support", "Glute Bridges"],
      recoveryFoods: ["Ragi Malt with Milk", "Whole Boiled Eggs", "Soy Milk", "Peanut Butter Toast"],
      icon: "legs"
    },
    {
      id: "prenatal-butterfly-stretch",
      name: "Butterfly Stretch (Baddha Konasana)",
      bodyPart: "women",
      bodyPartName: "Pregnancy / Pelvic Opening",
      secondaryMuscles: ["Inner Thighs (Adductors)", "Hip Flexors", "Groin"],
      difficulty: "Beginner",
      equipment: "Yoga Mat & Pillows",
      setsReps: "2-3 holds of 30-60 seconds",
      restTime: "45 seconds",
      photoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
      instructions: [
        "Sit on the floor with your back firmly supported against a sturdy wall or pillows.",
        "Bend your knees and draw the soles of your feet together in front of you.",
        "Allow your knees to fall outward naturally toward the floor without pressing them down.",
        "Hold your ankles or shins, keep your spine tall, and breathe deeply into your lower abdomen.",
        "Exhale to release muscular tension in your inner thighs and groin."
      ],
      benefits: [
        "Gently opens hip sockets and lengthens the inner thigh adductor musculature.",
        "Improves blood circulation to the pelvic floor, uterus, and perineum.",
        "Teaches deep diaphragmatic calming breath to manage labor discomfort."
      ],
      risks: [
        "Adductor strain if knees are forcibly pushed downward with arms.",
        "Pubic symphysis irritation if feet are drawn too close to the pelvis."
      ],
      commonMistakes: [
        "Slouching or rounding the lower spine.",
        "Bouncing the knees rapidly instead of holding a gentle, steady stretch."
      ],
      safetyTips: [
        "Place supportive yoga blocks or cushions under both knees if hips feel tight.",
        "Keep feet further away from the pelvis in a diamond shape if groin feels tight."
      ],
      alternatives: ["Seated Wide-Leg Straddle", "Pigeon Pose with Bolster", "Reclined Cobbler Pose on Incline"],
      recoveryFoods: ["Fresh Orange Juice", "Curd with Chia Seeds", "Sprouted Moong Salad", "Walnuts"],
      icon: "stretching"
    },
    {
      id: "side-lying-leg-lift",
      name: "Side-Lying Hip Abduction",
      bodyPart: "women",
      bodyPartName: "Pregnancy / Pelvic Stability",
      secondaryMuscles: ["Gluteus Medius", "Gluteus Minimus", "Tensor Fasciae Latae"],
      difficulty: "Beginner",
      equipment: "Yoga Mat & Pillow",
      setsReps: "2 sets of 10-12 reps per side",
      restTime: "45 seconds",
      photoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
      instructions: [
        "Lie on your left side with your head comfortably rested on your bent arm or pillow.",
        "Bend your bottom leg slightly at the knee for stability; keep your top leg straight.",
        "Place your right hand on the floor in front of your chest for balance.",
        "Slowly raise your top leg upward 30-45 degrees, keeping your toes pointing straight forward.",
        "Pause for 1 second at the top, then lower smoothly under control. Repeat and switch sides."
      ],
      benefits: [
        "100% safe alternative to supine exercises (zero pressure on Inferior Vena Cava).",
        "Strengthens Gluteus Medius, which stabilizes the pelvis during gestational walking.",
        "Prevents the pregnancy waddling gait and alleviates sacroiliac (SI) joint pain."
      ],
      risks: [
        "Pelvic twisting if torso rolls backward during leg lift.",
        "Hip cramp if toes are rotated upward toward the ceiling."
      ],
      commonMistakes: [
        "Lifting the leg too high into the air and pinching the hip joint.",
        "Rushing repetitions with momentum instead of muscular control."
      ],
      safetyTips: [
        "Place a small pillow under your pregnant belly if needed for comfort.",
        "Exhale as you lift the leg; inhale as you lower."
      ],
      alternatives: ["Standing Hip Abduction with Chair", "Clamshells (Side-Lying)", "Fire Hydrants"],
      recoveryFoods: ["Greek Yogurt with Berries", "Paneer Bhurji", "Almonds and Dates", "Moong Dal"],
      icon: "legs"
    }
  ],

  // Comprehensive Nutrition: Macronutrients
  macronutrients: [
    {
      id: "protein",
      name: "Protein",
      caloriesPerGram: 4,
      role: "Tissue repair, Muscle Protein Synthesis (MPS), enzyme production, and immune function.",
      whyImportant: "Proteins are constructed of 20 amino acids (9 essential ones the body cannot produce). Training creates microscopic tears in muscle fibers; dietary protein provides the substrate to rebuild them thicker, stronger, and more resilient.",
      approximateNeed: "1.2 - 2.2 g per kg of body weight daily depending on activity level, age, and fitness goals (higher during fat loss and intense resistance training).",
      richSources: ["Paneer", "Soya Chunks", "Eggs", "Chicken Breast", "Dal / Legumes", "Fish", "Curd", "Tofu"]
    },
    {
      id: "carbohydrates",
      name: "Carbohydrates",
      caloriesPerGram: 4,
      role: "Primary fast-acting energy source for muscles, brain, and central nervous system.",
      whyImportant: "Stored in muscle tissue and liver as glycogen. Adequate carb intake fuels high-intensity anaerobic training, spares muscle tissue from breakdown (gluconeogenesis), and aids optimal hormonal balance (thyroid & leptin).",
      approximateNeed: "3 - 7 g per kg of body weight daily (45-65% of total caloric intake), higher for endurance athletes and lower for sedentary individuals.",
      richSources: ["Oats", "Ragi (Finger Millet)", "Brown & White Rice", "Sweet Potatoes", "Bananas", "Whole Wheat Roti", "Fruits"]
    },
    {
      id: "fats",
      name: "Healthy Fats",
      caloriesPerGram: 9,
      role: "Hormone synthesis (testosterone, estrogen), fat-soluble vitamin absorption (A, D, E, K), brain health, and cellular membrane integrity.",
      whyImportant: "Dietary fat provides essential fatty acids (Omega-3 and Omega-6). Dropping fats too low (<15-20% of calories) can crash anabolic hormone levels, impair joint lubrication, and reduce satiety.",
      approximateNeed: "0.7 - 1.2 g per kg of body weight daily (20-35% of total daily calories).",
      richSources: ["Almonds", "Peanuts", "Sesame Seeds", "Olive Oil / Mustard Oil", "Egg Yolks", "Fatty Fish", "Chia / Flax Seeds"]
    },
    {
      id: "calories",
      name: "Calories (Energy Balance)",
      caloriesPerGram: null,
      role: "The fundamental thermodynamic currency of human metabolism and body mass regulation.",
      whyImportant: "Caloric intake versus expenditure dictates whether you lose fat, maintain, or gain weight. Calculated through Basal Metabolic Rate (BMR) + Non-Exercise Activity Thermogenesis (NEAT) + Exercise Activity (EAT) + Thermic Effect of Food (TEF).",
      approximateNeed: "Varies dramatically: ~1600-2400 kcal for sedentary adults; 2500-3500+ kcal for active athletic individuals.",
      richSources: ["Whole nutrient-dense foods provide optimal satiety and micronutrient density per calorie."]
    }
  ],

  // Comprehensive Nutrition: Micronutrients (Vitamins & Minerals)
  micronutrients: [
    {
      id: "iron",
      name: "Iron",
      type: "Mineral",
      whatItDoes: "Essential component of hemoglobin (carries oxygen in red blood cells) and myoglobin (supplies oxygen to muscle tissue during contraction).",
      whyImportant: "Directly determines stamina, aerobic work capacity, brain oxygenation, and energetic vitality. Crucial for active fitness enthusiasts.",
      foodSources: ["Spinach (Palak)", "Ragi", "Sesame seeds (Til)", "Chickpeas", "Rajma", "Lentils", "Chicken Liver", "Fish", "Pumpkin seeds"],
      approxRequirement: "Adult Men: ~8-11 mg/day | Adult Women (19-50): ~18 mg/day | Pregnant Women: ~27 mg/day",
      deficiencyConsequences: "Iron deficiency anemia, chronic fatigue, exercise intolerance, brittle nails, brain fog, and shortness of breath during routine exertion.",
      variationsNote: "Women of reproductive age need significantly more iron due to menstrual blood loss. Vegetarians require roughly 1.8x more plant (non-heme) iron due to lower bioavailability, which can be dramatically enhanced by pairing with Vitamin C.",
      forms: "Heme Iron (animal tissue: 15-35% absorption) vs Non-Heme Iron (plant foods: 2-20% absorption, boosted by Vitamin C)."
    },
    {
      id: "vitamin-a",
      name: "Vitamin A (Retinol & Beta-Carotene)",
      type: "Fat-soluble Vitamin",
      whatItDoes: "Essential for healthy vision, phototransduction in the retina, immune defense, cellular differentiation, and skin health.",
      whyImportant: "Aids muscle growth by promoting protein synthesis and cellular repair, and fortifies mucous membranes protecting against infections.",
      foodSources: ["Carrots", "Sweet Potatoes", "Spinach", "Eggs", "Milk", "Curd", "Papaya", "Mango"],
      approxRequirement: "Adult Men: ~900 mcg RAE/day | Adult Women: ~700 mcg RAE/day",
      deficiencyConsequences: "Night blindness, dry eyes (xerophthalmia), impaired immune response, rough scaly skin.",
      variationsNote: "Requirements increase during lactation (~1200-1300 mcg). Plant-based provitamin A (carotenoids) requires healthy fats for intestinal absorption."
    },
    {
      id: "vitamin-b12",
      name: "Vitamin B12 (Cobalamin)",
      type: "Water-soluble Vitamin",
      whatItDoes: "Crucial for red blood cell formation, neurological function, DNA synthesis, and fatty acid metabolism.",
      whyImportant: "Enables nerve impulses that stimulate muscle contraction; prevents megaloblastic anemia which paralyzes workout endurance.",
      foodSources: ["Milk", "Curd (Dahi)", "Paneer", "Eggs", "Fish", "Chicken", "Fortified Nutritional Yeast & Cereals"],
      approxRequirement: "Adults: ~2.4 mcg/day | Pregnancy: ~2.6 mcg | Lactation: ~2.8 mcg",
      deficiencyConsequences: "Megaloblastic anemia, irreversible peripheral neuropathy, pins and needles in extremities, memory impairment, chronic exhaustion.",
      variationsNote: "B12 is synthesized almost exclusively by microorganisms and found in animal products. Strict vegetarians and vegans MUST consume fortified foods or quality methylcobalamin supplements. Elderly individuals often suffer from reduced intrinsic factor absorption."
    },
    {
      id: "vitamin-c",
      name: "Vitamin C (Ascorbic Acid)",
      type: "Water-soluble Vitamin",
      whatItDoes: "Potent water-soluble antioxidant, essential cofactor for collagen synthesis (tendons, ligaments, skin), and immune enhancer.",
      whyImportant: "Speeds joint and tendon recovery after heavy weightlifting; critically converts insoluble ferric iron into readily absorbable ferrous iron in the gut.",
      foodSources: ["Amla (Indian Gooseberry)", "Guava", "Oranges / Citrus", "Bell Peppers", "Tomatoes", "Lemon", "Broccoli"],
      approxRequirement: "Adult Men: ~90 mg/day | Adult Women: ~75 mg/day (Smokers need +35 mg/day)",
      deficiencyConsequences: "Scurvy, poor wound healing, bleeding gums, joint stiffness, weak connective tissue, reduced iron absorption.",
      variationsNote: "Easily destroyed by prolonged heat and cooking. Consuming fresh raw fruits or freshly squeezed lemon juice with plant-based iron meals (like Dal or Spinach) multiplies iron uptake up to 300%."
    },
    {
      id: "vitamin-d",
      name: "Vitamin D3 (Cholecalciferol)",
      type: "Fat-soluble Secosteroid / Hormone",
      whatItDoes: "Regulates intestinal absorption of calcium and phosphorus, modulates immune response, and supports neuromuscular gene expression.",
      whyImportant: "Directly modulates fast-twitch muscle fiber development, athletic power output, testosterone levels, and bone mineral density.",
      foodSources: ["Sunlight exposure (UVB rays on skin)", "Egg yolks", "Fatty fish (Salmon, Rohu)", "Fortified milk", "Mushrooms exposed to UV"],
      approxRequirement: "Adults (19-70): ~600 - 800 IU (15-20 mcg)/day. Many sports scientists recommend 1000-2000 IU for indoor athletes.",
      deficiencyConsequences: "Osteomalacia (bone softening), rickets, increased stress fracture risk, muscle weakness, depressed mood, lower testosterone.",
      variationsNote: "Widespread global deficiency (up to 70-80% in urban and indoor workers). People with darker skin tones require longer sun exposure due to melanin filtering UVB light. Safe supplementation is widely advised after blood tests."
    },
    {
      id: "vitamin-e",
      name: "Vitamin E (Tocopherols)",
      type: "Fat-soluble Vitamin",
      whatItDoes: "Primary lipid-soluble antioxidant defending cell membranes against oxidative free-radical damage during heavy exercise.",
      whyImportant: "Reduces exercise-induced muscle lipid peroxidation, promotes capillary health, and supports skin and eye vitality.",
      foodSources: ["Almonds", "Sunflower seeds", "Peanuts", "Spinach", "Mustard oil", "Wheat germ oil"],
      approxRequirement: "Adults: ~15 mg (22.4 IU) of alpha-tocopherol daily",
      deficiencyConsequences: "Peripheral neuropathy, ataxia, muscle weakness, hemolytic anemia, impaired immune response.",
      variationsNote: "Easily met through a handful of nuts and seeds daily. High-dose synthetic supplements should not be abused without medical guidance."
    },
    {
      id: "vitamin-k",
      name: "Vitamin K (K1 Phylloquinone & K2 Menaquinone)",
      type: "Fat-soluble Vitamin",
      whatItDoes: "Essential for blood coagulation (clotting factors) and activates osteocalcin, which binds calcium into bone matrix.",
      whyImportant: "Prevents vascular calcification by directing calcium out of arteries and into bones and teeth; supports bone density in lifting athletes.",
      foodSources: ["Spinach", "Kale", "Broccoli", "Cabbage", "Fermented foods (Curd, Natto)", "Egg yolk", "Cheese"],
      approxRequirement: "Adult Men: ~120 mcg/day | Adult Women: ~90 mcg/day",
      deficiencyConsequences: "Prolonged bleeding times, easy bruising, bone fractures, arterial stiffness.",
      variationsNote: "K1 is abundant in green leafy vegetables. K2 is synthesized by gut bacteria and found in fermented foods and animal products."
    },
    {
      id: "calcium",
      name: "Calcium",
      type: "Essential Mineral",
      whatItDoes: "Primary structural mineral in bones and teeth; required for actin-myosin crossbridge cycling in muscle contraction and cardiac rhythm.",
      whyImportant: "Every single muscular contraction requires calcium ions flowing across cell membranes. Prevents stress fractures from high-impact sports.",
      foodSources: ["Milk", "Curd", "Paneer", "Ragi (Finger Millet - extremely rich!)", "Sesame seeds", "Tofu", "Almonds", "Dark leafy greens"],
      approxRequirement: "Adults: ~1000 mg/day | Adolescents & Women over 50: ~1200 mg/day",
      deficiencyConsequences: "Osteopenia, osteoporosis, muscle cramps, tetany, numbness in fingers, cardiac arrhythmias.",
      variationsNote: "Ragi and sesame seeds are phenomenal non-dairy calcium powerhouses (Ragi has ~344 mg calcium per 100g, 3x more than milk!). Requires Vitamin D for gut absorption."
    },
    {
      id: "magnesium",
      name: "Magnesium",
      type: "Essential Mineral",
      whatItDoes: "Cofactor in over 300 enzymatic reactions, including ATP (cellular energy) production, protein synthesis, and muscle relaxation.",
      whyImportant: "Prevents painful muscle cramps, balances calcium for neuromuscular relaxation, improves deep sleep quality (GABA regulation), and aids glucose disposal.",
      foodSources: ["Almonds", "Pumpkin seeds", "Spinach", "Peanuts", "Dark chocolate", "Black beans", "Bananas", "Whole grains"],
      approxRequirement: "Adult Men: ~400-420 mg/day | Adult Women: ~310-320 mg/day (Active athletes need +10-20% due to sweat loss)",
      deficiencyConsequences: "Muscle spasms, nocturnal leg cramps, sleep disruption, elevated resting blood pressure, insulin resistance, irritability.",
      variationsNote: "Lost rapidly in sweat during intense workouts in warm climates. Consuming nuts, seeds, and leafy greens readily replenishes stores."
    },
    {
      id: "zinc",
      name: "Zinc",
      type: "Essential Trace Mineral",
      whatItDoes: "Critical for immune cell development, DNA repair, testosterone production, wound healing, and protein synthesis.",
      whyImportant: "Strenuous athletic training depletes zinc through sweat and urine. Adequate zinc ensures optimal hormonal recovery and tissue repair.",
      foodSources: ["Chickpeas", "Lentils", "Pumpkin seeds", "Eggs", "Chicken", "Fish", "Paneer", "Cashews"],
      approxRequirement: "Adult Men: ~11 mg/day | Adult Women: ~8 mg/day | Pregnancy/Lactation: ~11-12 mg/day",
      deficiencyConsequences: "Depressed immune function, slow recovery from workouts, hypogonadism / lowered testosterone, loss of taste or smell, hair loss.",
      variationsNote: "Plant phytates reduce zinc absorption; soaking and sprouting legumes (chana, dal) significantly increases zinc bioavailability."
    }
  ],

  // Comprehensive Food Database (Global & Rich Indian Foods)
  foods: [
    {
      id: "paneer",
      name: "Paneer (Cottage Cheese)",
      hindiName: "पनीर",
      servingSize: "100 g",
      calories: 265,
      protein: 18.3,
      carbs: 3.5,
      fat: 20.8,
      iron: 0.8,
      vitamins: ["Calcium (480 mg)", "Vitamin B12", "Phosphorus", "Vitamin A"],
      dietaryType: "Vegetarian",
      category: "Dairy",
      bestUse: "post-workout",
      bestUseLabel: "Post-Workout & General Nutrition",
      description: "Rich in slow-digesting casein protein, ideal for sustained overnight muscle protein synthesis.",
      isIndianFood: true
    },
    {
      id: "soya-chunks",
      name: "Soya Chunks / Meal Maker",
      hindiName: "सोया चंक्स",
      servingSize: "50 g (dry weight)",
      calories: 172,
      protein: 26.0,
      carbs: 16.5,
      fat: 0.5,
      iron: 4.8,
      vitamins: ["Iron", "Calcium (175 mg)", "Magnesium", "Folate"],
      dietaryType: "Vegan",
      category: "High-protein foods",
      bestUse: "post-workout",
      bestUseLabel: "High-Protein Muscle Recovery",
      description: "Highest protein density of all plant foods (52g protein per 100g dry). Outstanding complete amino acid profile.",
      isIndianFood: true
    },
    {
      id: "dal-yellow-moong",
      name: "Yellow Moong Dal (Cooked)",
      hindiName: "मूंग दाल",
      servingSize: "1 cup (200 g cooked)",
      calories: 212,
      protein: 14.2,
      carbs: 38.0,
      fat: 0.8,
      iron: 2.8,
      vitamins: ["Folate (B9)", "Magnesium", "Potassium", "Zinc"],
      dietaryType: "Vegan",
      category: "Pulses/legumes",
      bestUse: "general",
      bestUseLabel: "General Nutrition & Recovery",
      description: "Light on digestion, packed with complex carbs and quality plant protein with gut-friendly prebiotic fiber.",
      isIndianFood: true
    },
    {
      id: "chickpeas-chana",
      name: "Chickpeas / Kabuli Chana (Cooked)",
      hindiName: "काबुली चना / छोले",
      servingSize: "1 cup (164 g cooked)",
      calories: 269,
      protein: 14.5,
      carbs: 45.0,
      fat: 4.2,
      iron: 4.7,
      vitamins: ["Iron", "Folate", "Zinc", "Magnesium", "Vitamin B6"],
      dietaryType: "Vegan",
      category: "Pulses/legumes",
      bestUse: "post-workout",
      bestUseLabel: "Post-Workout Glycogen & Protein Refuel",
      description: "Combines sustained energy release carbs with high iron and plant protein. Outstanding for satiety and heart health.",
      isIndianFood: true
    },
    {
      id: "rajma",
      name: "Rajma (Red Kidney Beans - Cooked)",
      hindiName: "राजमा",
      servingSize: "1 cup (177 g cooked)",
      calories: 225,
      protein: 15.3,
      carbs: 40.0,
      fat: 0.9,
      iron: 5.2,
      vitamins: ["Iron (high)", "Folate", "Potassium", "Magnesium"],
      dietaryType: "Vegan",
      category: "Pulses/legumes",
      bestUse: "general",
      bestUseLabel: "General Nutrition & Muscle Fuel",
      description: "A beloved staple providing high non-heme iron and slow-digesting resistant starch for steady blood sugar.",
      isIndianFood: true
    },
    {
      id: "eggs-whole",
      name: "Eggs (2 Whole Boiled)",
      hindiName: "अंडे",
      servingSize: "2 large eggs (100 g)",
      calories: 143,
      protein: 12.6,
      carbs: 0.7,
      fat: 9.5,
      iron: 1.8,
      vitamins: ["Vitamin B12", "Choline", "Vitamin D", "Vitamin A", "Lutein"],
      dietaryType: "Non-vegetarian",
      category: "Eggs",
      bestUse: "post-workout",
      bestUseLabel: "Pre or Post-Workout Anabolic Fuel",
      description: "The gold standard of biological protein value (100). The yolk contains all fat-soluble vitamins, choline, and healthy lipids.",
      isIndianFood: true
    },
    {
      id: "egg-whites",
      name: "Egg Whites (Cooked)",
      hindiName: "अंडे की सफेदी",
      servingSize: "4 large whites (132 g)",
      calories: 68,
      protein: 14.4,
      carbs: 0.9,
      fat: 0.2,
      iron: 0.1,
      vitamins: ["Riboflavin (B2)", "Potassium", "Selenium"],
      dietaryType: "Non-vegetarian",
      category: "Eggs",
      bestUse: "post-workout",
      bestUseLabel: "Pure Lean Protein for Fat Loss",
      description: "Almost 100% pure protein with virtually zero fat and carbohydrates. Outstanding during cutting phases.",
      isIndianFood: true
    },
    {
      id: "chicken-breast",
      name: "Chicken Breast (Boneless Grilled)",
      hindiName: "चिकन ब्रेस्ट",
      servingSize: "100 g cooked",
      calories: 165,
      protein: 31.0,
      carbs: 0.0,
      fat: 3.6,
      iron: 1.0,
      vitamins: ["Niacin (B3)", "Vitamin B6", "Phosphorus", "Selenium"],
      dietaryType: "Non-vegetarian",
      category: "Meat",
      bestUse: "post-workout",
      bestUseLabel: "Prime Post-Workout Lean Mass Builder",
      description: "Extremely lean, rich in branched-chain amino acids (leucine), and rapidly digested for post-training recovery.",
      isIndianFood: true
    },
    {
      id: "fish-salmon-rohu",
      name: "Fish (Rohu / Salmon)",
      hindiName: "मछली (रोहू / सैल्मन)",
      servingSize: "100 g cooked",
      calories: 182,
      protein: 24.5,
      carbs: 0.0,
      fat: 8.5,
      iron: 1.3,
      vitamins: ["Omega-3 Fatty Acids (EPA/DHA)", "Vitamin D", "Vitamin B12", "Selenium"],
      dietaryType: "Non-vegetarian",
      category: "Fish",
      bestUse: "general",
      bestUseLabel: "Joint Recovery & Muscle Repair",
      description: "Combines high-quality protein with anti-inflammatory Omega-3 fatty acids that alleviate delayed onset muscle soreness (DOMS).",
      isIndianFood: true
    },
    {
      id: "curd-dahi",
      name: "Curd / Dahi (Plain Whole Milk)",
      hindiName: "दही",
      servingSize: "1 cup (200 g)",
      calories: 122,
      protein: 7.0,
      carbs: 9.0,
      fat: 6.5,
      iron: 0.2,
      vitamins: ["Calcium (240 mg)", "Vitamin B12", "Probiotics", "Phosphorus"],
      dietaryType: "Vegetarian",
      category: "Dairy",
      bestUse: "general",
      bestUseLabel: "Gut Health & Digestion Support",
      description: "Natural active probiotics restore gut microbiome, boost nutrient assimilation, and supply bioavailable calcium.",
      isIndianFood: true
    },
    {
      id: "milk-cow",
      name: "Cow Milk (Toned)",
      hindiName: "दूध",
      servingSize: "1 glass (250 ml)",
      calories: 145,
      protein: 8.0,
      carbs: 12.5,
      fat: 7.5,
      iron: 0.1,
      vitamins: ["Calcium (300 mg)", "Vitamin D", "Vitamin B12", "Riboflavin"],
      dietaryType: "Vegetarian",
      category: "Dairy",
      bestUse: "post-workout",
      bestUseLabel: "Hydration & Rebuilding Drink",
      description: "Natural 80:20 casein-to-whey ratio provides both fast and prolonged amino acid release alongside electrolytes.",
      isIndianFood: true
    },
    {
      id: "spinach-palak",
      name: "Spinach / Palak (Cooked)",
      hindiName: "पालक",
      servingSize: "1 cup (180 g cooked)",
      calories: 41,
      protein: 5.3,
      carbs: 6.7,
      fat: 0.5,
      iron: 6.4,
      vitamins: ["Iron (very high)", "Vitamin A", "Vitamin C", "Vitamin K (huge)", "Folate"],
      dietaryType: "Vegan",
      category: "Vegetables",
      bestUse: "general",
      bestUseLabel: "Micronutrient & Iron Powerhouse",
      description: "Loaded with non-heme iron and dietary nitrates that dilate blood vessels, improving exercise oxygen delivery. Squeeze lemon for absorption.",
      isIndianFood: true
    },
    {
      id: "ragi-finger-millet",
      name: "Ragi (Finger Millet Flour)",
      hindiName: "रागी",
      servingSize: "50 g (makes 2 rotis)",
      calories: 164,
      protein: 3.7,
      carbs: 36.0,
      fat: 0.7,
      iron: 2.0,
      vitamins: ["Calcium (172 mg - exceptionally high)", "Dietary Fiber", "Thiamine", "Tryptophan"],
      dietaryType: "Vegan",
      category: "Whole grains",
      bestUse: "pre-workout",
      bestUseLabel: "Sustained Energy & Calcium",
      description: "Ancient gluten-free super-grain with 30x more calcium than rice. Outstanding low glycemic index energy fuel.",
      isIndianFood: true
    },
    {
      id: "peanuts",
      name: "Roasted Peanuts (Moongphali)",
      hindiName: "मूंगफली",
      servingSize: "30 g (handful)",
      calories: 170,
      protein: 7.8,
      carbs: 4.8,
      fat: 14.7,
      iron: 1.3,
      vitamins: ["Biotin", "Copper", "Niacin (B3)", "Vitamin E", "Resveratrol"],
      dietaryType: "Vegan",
      category: "Nuts and seeds",
      bestUse: "pre-workout",
      bestUseLabel: "Pre-Workout Energy Snack",
      description: "Affordable energy powerhouse rich in arginine (nitric oxide precursor) and cardio-protective monounsaturated fats.",
      isIndianFood: true
    },
    {
      id: "almonds",
      name: "Almonds (Badaam)",
      hindiName: "बादाम",
      servingSize: "30 g (approx 23 nuts)",
      calories: 174,
      protein: 6.3,
      carbs: 6.0,
      fat: 15.0,
      iron: 1.1,
      vitamins: ["Vitamin E (high)", "Magnesium (80 mg)", "Riboflavin", "Calcium"],
      dietaryType: "Vegan",
      category: "Nuts and seeds",
      bestUse: "general",
      bestUseLabel: "Anti-Oxidant Recovery & Healthy Fats",
      description: "Packed with alpha-tocopherol Vitamin E and magnesium to curb muscle spasms and combat exercise-induced oxidative stress.",
      isIndianFood: true
    },
    {
      id: "sesame-seeds-til",
      name: "Sesame Seeds (Til)",
      hindiName: "तिल",
      servingSize: "2 tablespoons (20 g)",
      calories: 115,
      protein: 3.6,
      carbs: 4.6,
      fat: 9.9,
      iron: 2.9,
      vitamins: ["Iron (very high)", "Calcium (195 mg)", "Zinc", "Copper", "Lignans"],
      dietaryType: "Vegan",
      category: "Nuts and seeds",
      bestUse: "general",
      bestUseLabel: "Iron & Calcium Booster",
      description: "Gram-for-gram one of the densest plant sources of both iron and calcium in the human diet.",
      isIndianFood: true
    },
    {
      id: "banana",
      name: "Banana",
      hindiName: "केला",
      servingSize: "1 medium fruit (118 g)",
      calories: 105,
      protein: 1.3,
      carbs: 27.0,
      fat: 0.3,
      iron: 0.3,
      vitamins: ["Potassium (422 mg)", "Vitamin B6", "Vitamin C", "Magnesium"],
      dietaryType: "Vegan",
      category: "Fruits",
      bestUse: "pre-workout",
      bestUseLabel: "Instant Pre-Workout Fuel & Cramp Relief",
      description: "Easily digestible simple sugars replenish glycogen immediately, while potassium balances cellular electrolyte potentials.",
      isIndianFood: true
    },
    {
      id: "rolled-oats",
      name: "Rolled Oats (Dry)",
      hindiName: "ओट्स",
      servingSize: "50 g",
      calories: 195,
      protein: 6.8,
      carbs: 34.0,
      fat: 3.5,
      iron: 2.3,
      vitamins: ["Beta-Glucan Fiber", "Magnesium", "Zinc", "Thiamine (B1)"],
      dietaryType: "Vegan",
      category: "Whole grains",
      bestUse: "pre-workout",
      bestUseLabel: "Long-Lasting Training Endurance",
      description: "Beta-glucan soluble fiber sustains steady glucose delivery, preventing blood sugar crashes mid-workout.",
      isIndianFood: false
    },
    {
      id: "sweet-potato",
      name: "Sweet Potato (Boiled/Baked)",
      hindiName: "शकरकंद",
      servingSize: "150 g",
      calories: 130,
      protein: 2.3,
      carbs: 30.0,
      fat: 0.2,
      iron: 1.0,
      vitamins: ["Vitamin A / Beta-Carotene (400% DV)", "Vitamin C", "Potassium", "Manganese"],
      dietaryType: "Vegan",
      category: "Vegetables",
      bestUse: "pre-workout",
      bestUseLabel: "Complex Carb Loading & Glycogen",
      description: "A bodybuilding favorite offering clean, unrefined complex carbohydrates and massive doses of carotenoid antioxidants.",
      isIndianFood: true
    },
    {
      id: "sprouted-moong",
      name: "Sprouted Moong Salad",
      hindiName: "अंकुरित मूंग",
      servingSize: "1 cup (100 g)",
      calories: 105,
      protein: 7.0,
      carbs: 19.0,
      fat: 0.4,
      iron: 1.8,
      vitamins: ["Vitamin C (tripled by sprouting)", "Folate", "Fiber", "Active Enzymes"],
      dietaryType: "Vegan",
      category: "Pulses/legumes",
      bestUse: "general",
      bestUseLabel: "Enzymatic Health & Lean Protein",
      description: "Sprouting degrades anti-nutritional phytates, vastly increasing the bioavailability of zinc, iron, and active Vitamin C.",
      isIndianFood: true
    },
    {
      id: "amla-gooseberry",
      name: "Amla (Indian Gooseberry)",
      hindiName: "आंवला",
      servingSize: "1 fruit (50 g)",
      calories: 22,
      protein: 0.5,
      carbs: 5.0,
      fat: 0.2,
      iron: 0.6,
      vitamins: ["Vitamin C (300 mg - 20x orange!)", "Polyphenols", "Tannoids"],
      dietaryType: "Vegan",
      category: "Fruits",
      bestUse: "general",
      bestUseLabel: "Supercharged Iron Absorption & Immunity",
      description: "The supreme natural source of heat-stable Vitamin C. Adding one spoon of amla juice boosts absorption of plant iron exponentially.",
      isIndianFood: true
    },
    {
      id: "tofu-firm",
      name: "Organic Firm Tofu",
      hindiName: "टोफू",
      servingSize: "100 g",
      calories: 144,
      protein: 15.5,
      carbs: 2.8,
      fat: 8.5,
      iron: 2.7,
      vitamins: ["Calcium (350 mg)", "Manganese", "Selenium", "Isoflavones"],
      dietaryType: "Vegan",
      category: "High-protein foods",
      bestUse: "post-workout",
      bestUseLabel: "Complete Vegan Protein Alternative to Paneer",
      description: "Made from precipitated soy curd; low in carbs, cholesterol-free, and delivers all 9 essential amino acids.",
      isIndianFood: false
    }
  ],

  // "What Should I Eat?" Meal Guide Engine
  mealRecommendations: {
    "muscle-gain": {
      title: "Hypertrophy & Muscle Gain Strategy",
      caloricSurplus: "+250 to +400 kcal above maintenance (Lean Surplus)",
      proteinTarget: "1.8 - 2.2 g per kg body weight",
      focus: "Sustained positive nitrogen balance, adequate carbohydrate replenishment for glycogen resynthesis, and healthy fats for anabolic hormone production.",
      plans: {
        "vegetarian": {
          breakfast: "Ragi/Oats porridge with milk or soy milk, topped with almonds, chia seeds, and sliced banana + 2 boiled eggs or 50g roasted paneer cubes.",
          preWorkout: "1-2 bananas with 1 tablespoon peanut butter or 1 sweet potato boiled (60 mins prior).",
          postWorkout: "1 glass cow milk or soy milk with 1 scoop protein powder (or sattu/whey) + sprouted moong chat with lemon.",
          lunch: "2-3 Multigrain or Ragi Rotis + 1.5 cups Rajma or Chole + 100g Paneer bhurji / Tofu + fresh green salad with lime.",
          snack: "Roasted peanuts / makhana + 1 cup fresh curd or spiced buttermilk (chaas).",
          dinner: "1 cup Brown/White Rice with 1.5 cups Yellow Moong/Toor Dal + sautéed Palak Paneer or mixed vegetables."
        },
        "vegan": {
          breakfast: "Oats cooked in warm Soy Milk with peanut butter, flaxseeds, chopped almonds, and berries/banana.",
          preWorkout: "Sweet potato or whole wheat bread with peanut butter and banana slices.",
          postWorkout: "Soy milk shake with pea/soy protein powder or roasted chana powder (sattu) + roasted soya chunks snack.",
          lunch: "Brown rice with thick Chana Masala (Chickpeas) + 50g pan-seared Soya Chunks with capsicum + cucumber tomato salad.",
          snack: "Handful of roasted peanuts, pumpkin seeds, and 1 seasonal fruit.",
          dinner: "2 Ragi rotis + 1.5 cups Sprouted Moong Dal + Tofu and green vegetable stir-fry with sesame seeds."
        },
        "eggetarian": {
          breakfast: "3-4 Egg Omelette (2 whole + 2 whites) with onions, tomatoes, and spinach + 2 slices whole grain toast.",
          preWorkout: "1 banana + black coffee or boiled sweet potato.",
          postWorkout: "2 hard-boiled eggs + 1 glass toned milk or fruit smoothie.",
          lunch: "2 Ragi rotis + 1 cup Dal + 100g Paneer or 2 boiled eggs curry + steamed rice + mixed salad.",
          snack: "Roasted peanuts / chana + 1 glass buttermilk.",
          dinner: "Egg bhurji (3 eggs) or Egg curry with 2 rotis + bowl of vegetable dal + curd."
        },
        "non-vegetarian": {
          breakfast: "3 Whole eggs scrambled with mushrooms and spinach + 2 whole wheat rotis or toast + 1 glass milk.",
          preWorkout: "1 banana + small handful of almonds and dates.",
          postWorkout: "150g Grilled Chicken Breast or Fish + 1 cup boiled white rice or potato.",
          lunch: "2 Rotis + 150g Chicken or Fish curry cooked in mustard oil + 1 cup Dal + fresh vegetable salad.",
          snack: "2 Boiled eggs or roasted peanuts + curd / fruit.",
          dinner: "Grilled Rohu/Salmon or Chicken Breast with steamed broccoli, carrots, and 1 bowl brown rice or sweet potato."
        }
      }
    },
    "fat-loss": {
      title: "Sustainable Fat Loss & Muscle Preservation",
      caloricSurplus: "-300 to -500 kcal below maintenance (Controlled Deficit)",
      proteinTarget: "2.0 - 2.4 g per kg body weight (Higher to shield muscle during deficit)",
      focus: "High-satiety foods, high dietary fiber, lean protein sources with minimal liquid calories, and consistent hydration. Never crash diet!",
      plans: {
        "vegetarian": {
          breakfast: "Paneer & Besan Chilla (gram flour pancake stuffed with low-fat paneer, coriander, and green chilies) + mint chutney.",
          preWorkout: "1 black coffee or green tea + 1 small apple.",
          postWorkout: "1 cup plain low-fat curd / Greek yogurt with 1 scoop protein or roasted sattu powder.",
          lunch: "1 Multigrain Roti + large bowl of Yellow Moong Dal + 100g low-fat Paneer or Soya chunks curry + large cucumber-spinach salad.",
          snack: "Roasted makhana (fox nuts) or cucumber slices with roasted chana.",
          dinner: "Large bowl of mixed vegetable soup with boiled chickpeas or paneer cubes (low carb evening)."
        },
        "vegan": {
          breakfast: "Sprouted Moong & Chana salad seasoned with rock salt, lemon juice, green chilies, and grated carrot.",
          preWorkout: "Small black coffee + 1 date or 1/2 banana.",
          postWorkout: "50g boiled soya chunks tossed with tomatoes and herbs.",
          lunch: "1 bowl Brown rice + thick Rajma or Black Chana curry + generous bowl of steamed greens (Palak / Methi).",
          snack: "Roasted black chana (Bengal gram) + green tea.",
          dinner: "Pan-grilled firm Tofu (150g) with stir-fried bell peppers, broccoli, and mushrooms."
        },
        "eggetarian": {
          breakfast: "3-4 Egg White Omelette with spinach, tomatoes, and mushrooms + 1 slice whole wheat bread.",
          preWorkout: "1 small apple + green tea.",
          postWorkout: "3 Boiled egg whites + 1 whole egg sprinkled with black pepper.",
          lunch: "1 Roti + 1 cup Dal + 2 hard-boiled eggs sliced over large green salad with lemon dressing.",
          snack: "1 glass chilled spiced buttermilk (chaas).",
          dinner: "Egg white curry (4 whites) with sautéed vegetables and 1 small bowl of steamed rice."
        },
        "non-vegetarian": {
          breakfast: "3 Egg whites + 1 whole egg scramble with herbs + 1 cup black coffee.",
          preWorkout: "1 small fruit or espresso.",
          postWorkout: "150g Grilled chicken breast seasoned with herbs, lemon, and black pepper.",
          lunch: "150g Tandoori/grilled chicken breast + large mixed salad (cucumber, lettuce, tomato, lemon) + 1 small roti.",
          snack: "1 boiled egg or 1 glass buttermilk.",
          dinner: "150g Steamed or baked fish with sautéed spinach and garlic."
        }
      }
    },
    "general-fitness": {
      title: "Lifelong Vitality & General Wellness",
      caloricSurplus: "Maintenance calories (Expenditure = Intake)",
      proteinTarget: "1.2 - 1.6 g per kg body weight",
      focus: "Nutrient density, colorful vegetables for diverse polyphenols, balanced macro distribution (45% Carbs, 25% Protein, 30% Healthy Fats).",
      plans: {
        "vegetarian": {
          breakfast: "Vegetable Upma / Poha topped with roasted peanuts and lemon juice + 1 glass cow milk.",
          preWorkout: "1 seasonal fresh fruit (apple, orange, or papaya).",
          postWorkout: "1 glass fresh buttermilk + 1 handful of soaked almonds and walnuts.",
          lunch: "2 Phulkas + 1 cup seasonal Dal + 1 cup mixed Sabzi (Gobi, Carrot, Peas) + 1 bowl curd.",
          snack: "1 cup green tea with roasted murmura (puffed rice) and peanuts.",
          dinner: "Khichdi (Moong dal + Rice) prepared with ghee, cumin, and vegetables + roasted papad and curd."
        },
        "vegan": {
          breakfast: "Ragi Dosa or Oats Idli with coconut-peanut chutney and vegetable sambar.",
          preWorkout: "1 small banana or handful of raisins.",
          postWorkout: "Sprouted moong chat with lemon and chopped tomatoes.",
          lunch: "1.5 cups Brown rice + Vegetable Sambar + stir-fried spinach with garlic and sesame seeds.",
          snack: "Mixed raw nuts (almonds, walnuts) and green tea.",
          dinner: "2 Rotis + Chickpea curry (Chole) + fresh cucumber tomato salad."
        },
        "eggetarian": {
          breakfast: "2 Whole boiled eggs with salt and pepper + 2 whole wheat rotis + fresh orange juice or fruit.",
          preWorkout: "1 cup black coffee or 1 fruit.",
          postWorkout: "1 glass milk with pinch of turmeric and honey.",
          lunch: "2 Rotis + 1 bowl Dal + 1 egg curry + cucumber salad.",
          snack: "Handful of roasted almonds and peanuts.",
          dinner: "Vegetable Pulao with 2 egg omelette or boiled eggs + curd raita."
        },
        "non-vegetarian": {
          breakfast: "2 Boiled eggs + 1 whole grain toast + 1 glass milk + 1 seasonal fruit.",
          preWorkout: "1 small apple or banana.",
          postWorkout: "1 cup curd or fresh coconut water.",
          lunch: "2 Rotis + 100g Fish or Chicken curry + mixed vegetable sabzi + salad.",
          snack: "Handful of dry fruits and seeds.",
          dinner: "Light chicken soup with vegetables + 1-2 rotis with dal."
        }
      }
    },
    "strength": {
      title: "Maximal Strength & Neuromuscular Power",
      caloricSurplus: "+10% above maintenance for central nervous system recovery",
      proteinTarget: "1.8 - 2.2 g per kg body weight",
      focus: "Creatine-supporting nutrition, high sodium & electrolyte balance for intracellular hydration, dense carbohydrates for heavy compound lifting.",
      plans: {
        "vegetarian": {
          breakfast: "Paneer Paratha (made with whole wheat and generous paneer) + 1 cup thick curd with crushed almonds.",
          preWorkout: "1 banana with 1 tbsp peanut butter + pinch of pink salt in water (for pump and hydration).",
          postWorkout: "High-protein milk smoothie with oats, peanut butter, and banana.",
          lunch: "3 Rotis + 1.5 cups Rajma + 100g Paneer cubes lightly sautéed in ghee + green salad.",
          snack: "Roasted peanuts, sesame chikki, and buttermilk.",
          dinner: "Rice with Dal Tadka + Paneer capsicum curry + 1 glass warm milk at bedtime."
        },
        "vegan": {
          breakfast: "Oats with soy milk, chia seeds, pumpkin seeds (zinc rich), and peanut butter.",
          preWorkout: "2 Bananas + pinch of salt in water.",
          postWorkout: "Soy milk shake with roasted sattu powder, jaggery, and crushed almonds.",
          lunch: "Brown rice with Chana Masala + 60g Soya Chunks dry roast + Palak soup.",
          snack: "Roasted black gram (chana) + pumpkin seeds (high zinc for power).",
          dinner: "3 Ragi rotis + thick Sprouted Moong Dal + Tofu and sesame seed stir-fry."
        },
        "eggetarian": {
          breakfast: "4 Eggs (3 whole + 1 white) scrambled in butter + 2 slices thick whole grain bread + milk.",
          preWorkout: "1 Banana + black coffee with honey.",
          postWorkout: "1 glass whole milk + 2 boiled eggs.",
          lunch: "3 Rotis + 1 cup Dal + 3 egg curry + rice + salad.",
          snack: "Peanut butter toast + glass of milk.",
          dinner: "2 Rotis + Paneer bhurji or 3 boiled eggs + bowl of lentils + curd."
        },
        "non-vegetarian": {
          breakfast: "4 Eggs (3 whole) + 2 parathas + 1 glass whole milk.",
          preWorkout: "Banana + espresso + pinch of rock salt.",
          postWorkout: "200g Chicken breast with white rice and pinch of salt.",
          lunch: "3 Rotis + 200g Chicken/Mutton curry + 1 bowl dal + salad.",
          snack: "Boiled eggs and roasted nuts.",
          dinner: "Grilled salmon/fish or chicken + sweet potato mash + steamed greens."
        }
      }
    },
    "endurance": {
      title: "Aerobic Capacity & Stamina Optimization",
      caloricSurplus: "Matches elevated cardiovascular burn (+500-1000 kcal on long endurance days)",
      proteinTarget: "1.4 - 1.8 g per kg body weight",
      focus: "High glycogen density (6-8g carbs/kg), high iron intake for oxygen transport, electrolytes (sodium, potassium, magnesium) to prevent cramping.",
      plans: {
        "vegetarian": {
          breakfast: "Large bowl of Oats porridge with banana, honey, raisins, and milk + 1 boiled potato.",
          preWorkout: "Ragi porridge or 2 bananas with water and electrolytes 45 min before run.",
          postWorkout: "Coconut water with a pinch of salt + Curd with chopped fruits and honey.",
          lunch: "Large serving of steamed rice with Dal + Spinach sabzi (high iron) + glass of fresh lemon water.",
          snack: "Dates, raisins, and roasted peanuts.",
          dinner: "Pasta or Rice with tomato-vegetable sauce and 80g Paneer cubes."
        },
        "vegan": {
          breakfast: "Smoothie bowl with oats, banana, dates, spinach, and soy milk.",
          preWorkout: "Sweet potato boiled with lemon and salt.",
          postWorkout: "Tender coconut water + sprouted moong salad with lemon.",
          lunch: "Brown rice with Rajma (kidney beans) + steamed Palak with squeeze of amla juice for iron.",
          snack: "Sesame seeds (til) laddu / chikki + seasonal fruit.",
          dinner: "2 Rotis + thick Lentil soup + Tofu vegetable stir fry."
        },
        "eggetarian": {
          breakfast: "2 Whole eggs + large bowl of oats with milk, honey, and raisins.",
          preWorkout: "1 Banana + water with lemon and honey.",
          postWorkout: "Coconut water + 2 boiled eggs.",
          lunch: "Steamed rice with Dal + 2 hard-boiled eggs + green leafy vegetables.",
          snack: "Fruit salad with soaked chia seeds and nuts.",
          dinner: "Egg fried rice made with plenty of vegetables + curd raita."
        },
        "non-vegetarian": {
          breakfast: "2 Eggs + bowl of oats with banana and raisins + 1 glass orange juice.",
          preWorkout: "1 Sweet potato or banana.",
          postWorkout: "Coconut water + 150g grilled chicken and white rice.",
          lunch: "Generous bowl of rice with Fish curry (high omega-3) + spinach sabzi.",
          snack: "Handful of dates and almonds.",
          dinner: "Chicken noodle soup or Chicken breast with pasta and steamed green beans."
        }
      }
    }
  },

  // Official Contact Information
  contact: {
    whatsapp: "+91 9014430474",
    whatsappClean: "919014430474",
    whatsappLink: "https://wa.me/919014430474?text=Hi%20FitGuide%2C%20I%20have%20a%20fitness%20and%20nutrition%20question!",
    email: "venkateshvemula8897@gmail.com",
    emailLink: "mailto:venkateshvemula8897@gmail.com?subject=FitGuide%20Fitness%20%26%20Nutrition%20Inquiry",
    defaultCity: "Gajuwaka & Visakhapatnam, Andhra Pradesh",
    ownerName: "Venkatesh Vemula"
  },

  // Fitness Gyms Database (With Ratings, Reviews, Facilities & Real Locations)
  gyms: [
    {
      id: "gym-u-fit-sheelanagar",
      name: "U Fit Fitness Studio & Gym",
      altNames: ["u fit", "ufit", "u-fit", "u fit gym", "ufit fitness", "u fit sheelanagar", "ufit sheelanagar", "u-fit gym", "u-fit fitness", "u fit studio", "ufit studio", "sheelanagar gym", "sheela nagar gym"],
      city: "Visakhapatnam",
      area: "Sheela Nagar (Sheelanagar, Visakhapatnam)",
      rating: 4.9,
      reviewCount: 260,
      timing: "5:00 AM - 10:30 PM",
      amenities: ["Heavy Dumbbells up to 50kg", "Power Racks", "Olympic Barbell Bench", "Cardio Zone", "CrossFit Rig", "Personal Training", "AC", "Changing Rooms"],
      address: "Beside NH16 Highway, Near Sheela Nagar Junction, Sheelanagar, Visakhapatnam, AP 530012",
      mapQuery: "U Fit Fitness Studio Sheelanagar Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Premier modern fitness hub in Sheela Nagar featuring elite strength equipment, personal transformation coaching, and high-intensity functional training."
    },
    {
      id: "gym-pulse-sheelanagar",
      name: "Pulse Fitness & CrossFit Hub",
      altNames: ["pulse fitness", "pulse gym", "pulse fitness sheelanagar", "pulse sheelanagar", "sheelanagar pulse"],
      city: "Visakhapatnam",
      area: "Sheela Nagar / BHPV Road (Visakhapatnam)",
      rating: 4.8,
      reviewCount: 185,
      timing: "5:30 AM - 10:00 PM",
      amenities: ["Strength Training", "Treadmills & Spin Bikes", "Certified Trainers", "Weight Management", "AC"],
      address: "BHPV Main Road, Near Sheela Nagar, Visakhapatnam, AP 530012",
      mapQuery: "Pulse Fitness BHPV Sheelanagar Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Equipped with professional biomechanical resistance units and dedicated fat-loss coaching."
    },
    {
      id: "gym-steel-plant",
      name: "Steel Plant Fitness Center & Gym",
      altNames: ["steel plant gym", "ukkunagaram gym"],
      city: "Gajuwaka",
      area: "Ukkunagaram / Gajuwaka, Visakhapatnam",
      rating: 4.9,
      reviewCount: 420,
      timing: "5:30 AM - 10:00 PM",
      amenities: ["Olympic Weights", "Spacious Turf", "Cardio Zone", "Certified Trainers", "AC"],
      address: "Near Sector 6, Ukkunagaram, Steel Plant Township, Gajuwaka, Visakhapatnam, AP 530032",
      mapQuery: "Steel+Plant+Gym+Ukkunagaram+Gajuwaka+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "State-of-the-art township gym with elite barbell platforms and running tracks."
    },
    {
      id: "gym-cult-gajuwaka",
      name: "Cult.fit Fitness & Strength Center",
      city: "Gajuwaka",
      area: "Main Road, Gajuwaka, Visakhapatnam",
      rating: 4.8,
      reviewCount: 385,
      timing: "6:00 AM - 9:30 PM",
      amenities: ["Strength & Conditioning", "HRX Workouts", "Cardio", "Shower & Lockers", "AC"],
      address: "3rd Floor, Commercial Complex, Main Road, Gajuwaka, Visakhapatnam, AP 530026",
      mapQuery: "Cult+fit+Gajuwaka+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "High-energy group workouts, functional fitness, and personalized body tracking."
    },
    {
      id: "gym-iron-paradise",
      name: "Iron Paradise Hardcore Fitness",
      city: "Gajuwaka",
      area: "Old Gajuwaka Junction, Visakhapatnam",
      rating: 4.9,
      reviewCount: 295,
      timing: "5:00 AM - 10:30 PM",
      amenities: ["Heavy Dumbbells up to 60kg", "Power Racks", "Crossfit Rig", "Pre-workout Bar", "AC"],
      address: "Opposite RTC Depot, Old Gajuwaka, Visakhapatnam, AP 530026",
      mapQuery: "Gyms+near+Old+Gajuwaka+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Dedicated bodybuilding and powerlifting gym with heavy-duty machines and personalized coaching."
    },
    {
      id: "gym-talwalkars-kurmannapalem",
      name: "Talwalkars Premium Fitness Club",
      city: "Gajuwaka",
      area: "Kurmannapalem / Gajuwaka, Visakhapatnam",
      rating: 4.7,
      reviewCount: 312,
      timing: "5:30 AM - 10:00 PM",
      amenities: ["Imported Strength Gear", "Steam Bath", "Aerobics & Zumba", "Dietitian Consultation", "AC"],
      address: "Beside National Highway, Kurmannapalem, Gajuwaka, Visakhapatnam, AP 530046",
      mapQuery: "Talwalkars+Gym+Kurmannapalem+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Comprehensive wellness club with steam, cardio cinema, and body composition analysis."
    },
    {
      id: "gym-golds-siripuram",
      name: "Gold's Gym Visakhapatnam",
      city: "Visakhapatnam",
      area: "Siripuram / VIP Road, Visakhapatnam",
      rating: 4.8,
      reviewCount: 520,
      timing: "5:30 AM - 10:00 PM",
      amenities: ["World-Class Equipment", "Certified Master Trainers", "Spin Studio", "Locker & Sauna", "AC"],
      address: "VIP Road, Near Siripuram Circle, Visakhapatnam, AP 530003",
      mapQuery: "Golds+Gym+Siripuram+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Internationally renowned fitness chain with cutting-edge resistance and functional machinery."
    },
    {
      id: "gym-fitrepublic-mvp",
      name: "FitRepublic Gym & Wellness Hub",
      city: "Visakhapatnam",
      area: "MVP Colony, Visakhapatnam",
      rating: 4.9,
      reviewCount: 340,
      timing: "5:00 AM - 10:00 PM",
      amenities: ["CrossFit Area", "HIIT Training Zone", "Physiotherapy Support", "Protein Shake Bar", "AC"],
      address: "Sector 3, MVP Double Road, MVP Colony, Visakhapatnam, AP 530017",
      mapQuery: "Gyms+in+MVP+Colony+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Modern athletic training facility specializing in fat-loss bootcamps and athletic strength."
    },
    {
      id: "gym-powerhouse-autonagar",
      name: "Powerhouse Gym & Fitness",
      city: "Gajuwaka",
      area: "Auto Nagar, Gajuwaka, Visakhapatnam",
      rating: 4.8,
      reviewCount: 215,
      timing: "5:30 AM - 10:00 PM",
      amenities: ["Cardio Rowers & Treadmills", "Weight Training", "Free Weight Pit", "Changing Rooms", "AC"],
      address: "Block B, Industrial Estate, Auto Nagar, Gajuwaka, Visakhapatnam, AP 530012",
      mapQuery: "Gyms+near+Auto+Nagar+Gajuwaka",
      phone: "+91 9014430474",
      highlight: "Affordable and fully-equipped community gym with motivating atmosphere for beginners."
    },
    {
      id: "gym-fitnessone-dwaraka",
      name: "Fitness One & Propel Fitness",
      city: "Visakhapatnam",
      area: "Dwaraka Nagar, Visakhapatnam",
      rating: 4.7,
      reviewCount: 280,
      timing: "6:00 AM - 9:30 PM",
      amenities: ["Bio-mechanical Strength Units", "Cardio Zone", "Posture Correction", "Yoga Classes", "AC"],
      address: "Beside Diamond Park, 2nd Lane, Dwaraka Nagar, Visakhapatnam, AP 530016",
      mapQuery: "Fitness+One+Dwaraka+Nagar+Visakhapatnam",
      phone: "+91 9014430474",
      highlight: "Science-backed conditioning center focusing on safe joint mechanics and fat loss."
    }
  ],

  // Scientific Height Growth, Spinal Decompression & Bone Health Nutrition
  heightNutrition: {
    title: "Scientific Height Growth & Bone Elongation Nutrition Guide",
    subtitle: "Precise daily dietary targets for Protein, Vitamins (D3, K2, C, A), Iron, and Minerals for maximum bone mineralization and spinal disc decompression.",
    
    // 1. Protein Requirement
    protein: {
      nutrient: "Protein & Amino Acids (Collagen & IGF-1 Stimulators)",
      dailyRequirement: "1.5 - 2.0 grams per kg of body weight daily for adolescents and active youths (1.2 - 1.6 g/kg for adults)",
      examples: [
        { weightKg: 45, dailyTarget: "68 - 90 g protein/day" },
        { weightKg: 55, dailyTarget: "83 - 110 g protein/day" },
        { weightKg: 65, dailyTarget: "98 - 130 g protein/day" },
        { weightKg: 75, dailyTarget: "113 - 150 g protein/day" }
      ],
      whyImportant: "Bones are not just calcium stones—they are 50% protein by volume! Bone elongation at the epiphyseal growth plates requires continuous synthesis of Type I Collagen matrix. Dietary amino acids (especially L-Arginine, L-Lysine, and Leucine) trigger the liver to secrete IGF-1 (Insulin-like Growth Factor 1), the primary biochemical hormone driving chondrocyte cartilage division in the femur, tibia, and vertebrae.",
      topFoods: [
        { name: "Soya Chunks / Mealmaker", amount: "52 g protein / 100g", highlight: "Highest plant protein density on earth for bone collagen matrix", type: "Veg" },
        { name: "Eggs (Whole)", amount: "6.5 g protein per egg", highlight: "Bioavailable gold standard with yolk providing Vitamin D3, B12, and Choline", type: "Non-Veg" },
        { name: "Paneer (Cottage Cheese)", amount: "18 g protein / 100g", highlight: "Dual power: high casein protein + 480 mg bioavailable Calcium", type: "Veg" },
        { name: "Cow's / Buffalo Milk", amount: "8.5 g protein per 250ml glass", highlight: "Fast-absorbing whey & sustained casein + 300 mg Calcium per glass", type: "Veg" },
        { name: "Chicken Breast / Fish", amount: "31 g protein / 100g", highlight: "Rich in zinc, leucine, and phosphorus for cellular growth", type: "Non-Veg" },
        { name: "Curd / Greek Yogurt", amount: "10-15 g protein per bowl", highlight: "Probiotics improve calcium, iron, and mineral gut absorption", type: "Veg" },
        { name: "Sprouted Moong & Dal", amount: "24 g protein / 100g dry", highlight: "Sprouting activates enzymes and increases amino acid bioavailability", type: "Veg" }
      ]
    },

    // 2. Vitamins Requirement
    vitamins: {
      nutrient: "Essential Vitamins for Bone Elongation & Mineralization",
      vitaminD3: {
        name: "Vitamin D3 (Cholecalciferol)",
        dailyRequirement: "600 - 1000 IU (15 - 25 mcg) daily (or 15-20 mins direct morning sunlight)",
        whyImportant: "Vitamin D3 converts into calcitriol, which is mandatory for the gut to absorb calcium and phosphorus. Without adequate D3, up to 90% of dietary calcium is excreted without ever reaching the bones, causing stunted bone growth.",
        topSources: ["15-20 min direct morning sunlight (7:00 AM - 8:30 AM)", "Fortified Milk", "Egg Yolks", "Mushrooms exposed to UV", "Fatty Fish (Salmon, Mackerel)"]
      },
      vitaminK2: {
        name: "Vitamin K2 (Menaquinone-7 / MK-7)",
        dailyRequirement: "45 - 90 mcg daily",
        whyImportant: "The 'calcium traffic controller'. Vitamin K2 activates the protein osteocalcin, which binds calcium directly into the long bones and spinal vertebrae. Without K2, calcium floats in the bloodstream and deposits in arterial walls rather than bones.",
        topSources: ["Fermented Curd (Dahi)", "Egg Yolks", "Hard Cheeses (Cheddar, Gouda)", "Natto / Fermented Soy", "Ghee (Grass-fed)"]
      },
      vitaminC: {
        name: "Vitamin C (Ascorbic Acid)",
        dailyRequirement: "65 - 90 mg daily",
        whyImportant: "Vital co-enzyme for prolyl hydroxylase, synthesizing the triple-helix collagen scaffold of growing cartilage, bone ends, and intervertebral discs.",
        topSources: ["Amla (Indian Gooseberry) — 600 mg/100g!", "Guava — 228 mg/100g!", "Oranges & Lemons", "Bell Peppers", "Strawberries", "Tomatoes"]
      },
      vitaminA: {
        name: "Vitamin A (Retinol & Beta-Carotene)",
        dailyRequirement: "700 - 900 mcg RAE daily",
        whyImportant: "Regulates osteoblasts (bone-forming cells) and chondrocytes in the growth plates during adolescent bone elongation.",
        topSources: ["Carrots", "Sweet Potatoes", "Spinach", "Papaya", "Egg Yolks"]
      }
    },

    // 3. Iron & Minerals Requirement
    ironAndMinerals: {
      nutrient: "Iron, Calcium & Zinc (The Growth Plate Mineral Trio)",
      iron: {
        name: "Iron (Fe)",
        dailyRequirement: "15 - 18 mg daily (adolescents, active youths, and menstruating females); 11 - 15 mg (young males)",
        whyImportant: "Iron synthesizes hemoglobin, which delivers the massive oxygen volume required by rapidly dividing chondrocyte cells at the epiphyseal growth plates. Iron deficiency (anemia) starves growing tissues of oxygen, leading to stunted growth, chronic fatigue, and poor physical stamina.",
        topSources: [
          { name: "Spinach (Palak)", amount: "3.5 mg / 100g", note: "Add lemon juice (Vitamin C) to boost plant iron absorption by 300%" },
          { name: "Jaggery (Gur)", amount: "11 mg / 100g", note: "Traditional unrefined sugarcane iron booster" },
          { name: "Dates (Khajoor)", amount: "4.8 mg / 100g", note: "Natural glycogen and iron power source" },
          { name: "Sprouted Moong Beans", amount: "3.0 mg / 100g", note: "Reduces phytic acid, multiplying mineral uptake" },
          { name: "Pumpkin Seeds", amount: "8.8 mg / 100g", note: "Dual superpower: high Iron + high Zinc" }
        ]
      },
      calcium: {
        name: "Calcium (Ca)",
        dailyRequirement: "1,000 - 1,300 mg daily for ages 9-19; 1,000 mg for adults",
        whyImportant: "The primary structural mineral of human bone tissue. Deposited alongside phosphate as hydroxyapatite crystals to form rigid, strong, long bones.",
        topSources: [
          { name: "Ragi (Finger Millet)", amount: "344 mg / 100g", note: "Contains 3.5x more calcium than milk!" },
          { name: "Sesame Seeds (Til)", amount: "975 mg / 100g", note: "Highest natural plant calcium powerhouse" },
          { name: "Milk & Paneer", amount: "300 mg / glass & 480 mg / 100g", note: "Gold standard bioavailable dairy calcium" },
          { name: "Curd / Dahi", amount: "200 mg / bowl", note: "Lactic acid optimizes calcium absorption" }
        ]
      },
      zinc: {
        name: "Zinc (Zn)",
        dailyRequirement: "10 - 15 mg daily",
        whyImportant: "Direct catalyst for the pituitary gland to secrete Human Growth Hormone (HGH) and stimulates cellular DNA division in osteoblasts.",
        topSources: [
          { name: "Pumpkin Seeds", amount: "7.8 mg / 100g", note: "Just a handful provides 50% daily zinc" },
          { name: "Chickpeas (Chole)", amount: "3.4 mg / cup", note: "Excellent plant zinc + protein source" },
          { name: "Whole Eggs", amount: "1.3 mg / 2 eggs", note: "Easily digestible zinc with healthy fats" },
          { name: "Cashews & Almonds", amount: "5.6 mg / 100g", note: "Rich in zinc and magnesium" }
        ]
      }
    },

    // 4. Deep Sleep & HGH Release
    sleepAndHGH: {
      dailyTarget: "8.5 - 10 hours for adolescents; 7.5 - 9 hours for young adults",
      science: "Over 70% to 80% of daily Human Growth Hormone (HGH) is released in pulsatile spikes during Stage 3 & 4 Deep Slow-Wave Sleep (NREM). Staying awake past 11:00 PM or sleeping under 7 hours directly suppresses the peak HGH pulse!",
      actionRules: [
        "Go to bed between 9:30 PM - 10:30 PM to align with circadian HGH release.",
        "Turn off blue-light smartphone screens 45 minutes before sleep to allow natural melatonin surge.",
        "Avoid high-sugar snacks right before bedtime (high insulin blunts HGH release during sleep)."
      ]
    },

    // 5. Open vs Closed Growth Plates & The 1-3 Inch Postural Decompression
    scienceBreakdown: {
      under21: "Under Age 21: Epiphyseal growth plates (cartilage zones at the ends of long bones like the femur, tibia, and humerus) remain open. Consistent high-protein intake, calcium, vitamin D3, plyometric jumping, and deep sleep maximize your genetic height ceiling.",
      over21: "Over Age 21: While long bone growth plates naturally calcify and fuse by age 18-21, over 80% of adults lose 1 to 3 inches (2.5 to 7.5 cm) due to daily gravitational compression of spinal discs, anterior pelvic tilt, and hunched upper backs. Daily spinal decompression (dead hangs, cobra stretch, pelvic bridges, cat-cow) rehydrates intervertebral discs and corrects postural alignment, unlocking 1 to 3 inches of standing height permanently!"
    },

    // 6. Growth Killers & Things to Avoid
    growthKillers: [
      { name: "Carbonated Colas & Soft Drinks", reason: "High phosphoric acid binds to calcium in the digestive tract and leaches calcium directly out of bones." },
      { name: "Excess Sugar & High-Glycemic Junk", reason: "Causes acute insulin spikes, which directly suppress pituitary Human Growth Hormone (HGH) secretion." },
      { name: "Sleep Deprivation & Late Nights", reason: "Missing the 10:00 PM - 2:00 AM slow-wave deep sleep window cuts daily growth hormone production by up to 70%." },
      { name: "Chronic Slouching & Forward Head Posture", reason: "Carrying head forward compresses cervical and thoracic vertebrae, shaving off up to 2 inches of height over time." },
      { name: "Smoking & Alcohol", reason: "Impairs blood flow to bone capillaries, inhibits osteoblast proliferation, and lowers testosterone and HGH." }
    ]
  },

  // =========================================================================
  // WOMEN'S HEALTH: MENSTRUAL CYCLE & PREGNANCY CARE
  // =========================================================================
  womenHealth: {
    // 1. Mature / Menstrual Cycle Health
    menstrualCycle: {
      title: "Mature / Menstrual Cycle & Hormonal Wellness",
      healthyDuration: {
        cycleLengthDays: "21 to 35 Days (Average: 28 Days)",
        bleedingDurationDays: "3 to 7 Days",
        normalBloodLoss: "30 to 80 mL per cycle",
        summary: "A healthy menstrual cycle typically repeats every 21 to 35 days, with active bleeding lasting 3 to 7 days. Consistency is key: a variation of 2-4 days between cycles is normal, but fluctuations over 7-9 days indicate hormonal or ovulatory irregularities."
      },
      phases: [
        {
          phase: "Menstrual Phase (Days 1 - 5)",
          hormones: "Estrogen & Progesterone are at their lowest; uterine lining (endometrium) sheds.",
          energyLevel: "Lower energy, reflective mindset, natural physical rest required.",
          exerciseAdvice: "Gentle walking, restorative yin yoga, light stretching, pelvic breathing. Avoid strenuous HIIT and heavy core compression.",
          keyNutrients: "Iron, Vitamin C, Magnesium, Warm Broths, Hydrating herbal teas."
        },
        {
          phase: "Follicular Phase (Days 6 - 13)",
          hormones: "FSH stimulates follicle growth; Estrogen rises steadily; uterine lining rebuilds.",
          energyLevel: "Rising energy, high mental focus, improved insulin sensitivity.",
          exerciseAdvice: "Ideal time for progressive strength training, compound barbell lifts, running, and high-intensity resistance.",
          keyNutrients: "Lean proteins, sprouted seeds, fermented foods (curd, kimchi), cruciferous greens (metabolizes excess estrogen)."
        },
        {
          phase: "Ovulatory Phase (Days 14 - 16)",
          hormones: "Luteinizing Hormone (LH) surge triggers egg release; Estrogen & Testosterone peak.",
          energyLevel: "Peak physical stamina, maximum neuromuscular strength, highest social confidence.",
          exerciseAdvice: "High-intensity interval training (HIIT), sprint intervals, heavy resistance personal records (PRs).",
          keyNutrients: "Fiber-rich vegetables, zinc, glutathione-rich berries, light clean proteins."
        },
        {
          phase: "Luteal Phase (Days 17 - 28)",
          hormones: "Progesterone dominates to prepare uterine lining; basal metabolic rate increases by 100-300 kcal/day.",
          energyLevel: "Gradual energy taper; potential PMS symptoms (bloating, breast tenderness, cravings).",
          exerciseAdvice: "Moderate resistance training, pilates, steady-state cardio, brisk incline walking.",
          keyNutrients: "Complex carbs (sweet potatoes, oats), Vitamin B6, Magnesium, healthy fats (avocado, nuts) to calm cravings."
        }
      ],
      precautions: [
        { rule: "Sanitary Hygiene & Infection Prevention", detail: "Change pads or menstrual cups every 4 to 6 hours (8 hours max for cups) to prevent Toxic Shock Syndrome (TSS) and bacterial vaginosis." },
        { rule: "Gentle Heat Therapy for Dysmenorrhea", detail: "Apply a warm water heating pad (40°C / 104°F) across the lower abdomen. Heat induces vasodilation and relaxes myometrial smooth muscle spasms better than mild painkillers." },
        { rule: "Hydration Target (2.5 - 3.0 Liters)", detail: "Drinking plenty of warm water flushes excess cellular sodium, dramatically reducing menstrual fluid retention and abdominal puffiness." },
        { rule: "Cycle Tracking & Red Flags", detail: "Consult a gynecologist if bleeding exceeds 7 days, if soaking more than 1 pad every 1-2 hours, if cycle is shorter than 21 days or longer than 35 days, or if missed for >3 consecutive months." }
      ],
      foodAdvantages: [
        { food: "Spinach (Palak) & Beetroot", benefit: "Replenishes bioavailable iron lost during menses; prevents menstrual fatigue and microcytic anemia.", category: "Iron & Blood Builders" },
        { food: "Jaggery (Gur) with Roasted Chana", benefit: "Traditional Ayurvedic iron booster; boosts hemoglobin and provides sustained unrefined energy.", category: "Iron & Blood Builders" },
        { food: "Dark Chocolate (70%+ Cocoa)", benefit: "Exceptionally rich in Magnesium and polyphenols; relaxes uterine smooth muscles and stimulates serotonin.", category: "Cramp Relief & Mood" },
        { food: "Pumpkin Seeds & Walnuts", benefit: "Packed with Zinc, Magnesium, and anti-inflammatory Omega-3 fatty acids that suppress pain-inducing prostaglandins.", category: "Hormonal Balance" },
        { food: "Ginger & Chamomile Herbal Tea", benefit: "Contains gingerol and bisabolol, acting as natural COX-2 enzyme inhibitors to alleviate pelvic cramping naturally.", category: "Anti-Spasmodic" },
        { food: "Bananas & Tender Coconut Water", benefit: "High potassium content flushes excess extracellular sodium, eliminating premenstrual bloating and water retention.", category: "Anti-Bloat Electrolytes" }
      ],
      foodDisadvantages: [
        { food: "High-Sodium Pickles, Chips & Papad", disadvantage: "Sodium causes extreme fluid retention, breast tenderness, vascular tension, and uncomfortable abdominal distension.", whyAvoid: "Exacerbates menstrual water retention and high blood pressure." },
        { food: "Refined White Sugar & Pastries", disadvantage: "Triggers steep insulin spikes followed by hypoglycemic crashes, worsening PMS irritability, anxiety, and sugar cravings.", whyAvoid: "Destabilizes blood sugar and mood hormones." },
        { food: "Excess Caffeine (>2 Cups Coffee / Energy Drinks)", disadvantage: "Caffeine constricts pelvic blood vessels (vasoconstriction), restricting uterine blood flow and directly amplifying cramp intensity.", whyAvoid: "Intensifies cramps, increases cortisol, and worsens sleep." },
        { food: "Deep-Fried & Trans-Fat Fast Foods", disadvantage: "High levels of saturated and trans fats stimulate production of inflammatory prostaglandins (PGF2-alpha), triggering violent uterine spasms.", whyAvoid: "Directly causes severe menstrual pain." },
        { food: "Carbonated Fizzy Sodas", disadvantage: "Introduces carbon dioxide gas into an already sensitive gastrointestinal tract, causing severe gastric distress and pelvic pressure.", whyAvoid: "Aggravates bloating and leaches bone minerals." }
      ]
    },

    // 2. Pregnancy Fitness & Maternal Nutrition Hub
    pregnancyCare: {
      title: "Pregnancy Fitness & Maternal Nutrition (Maternal Care)",
      overview: "Prenatal exercise and targeted maternal nutrition ensure healthy fetal growth, prevent gestational diabetes and preeclampsia, reduce maternal lower back pain, and prepare the pelvic floor for smooth labor and rapid postpartum recovery.",
      trimesters: [
        {
          trimester: "First Trimester (Weeks 1 - 12)",
          focus: "Embryonic organogenesis; managing morning sickness, nausea, and fatigue.",
          exerciseTips: "Low-impact walking, gentle pelvic tilts, light yoga. Stay hydrated and avoid overheating.",
          nutritionFocus: "Folic Acid (400-600 mcg) for neural tube closure; small frequent meals rich in Vitamin B6 to reduce nausea."
        },
        {
          trimester: "Second Trimester (Weeks 13 - 26)",
          focus: "Rapid fetal skeletal and brain development; maternal energy bounces back.",
          exerciseTips: "Modified squats, prenatal swimming, Kegel contractions, side-lying leg lifts. Stop all supine (lying flat on back) exercises.",
          nutritionFocus: "Calcium (1,200 mg), Iron (27 mg), Vitamin D3 (1,000 IU), clean protein (75-85g/day)."
        },
        {
          trimester: "Third Trimester (Weeks 27 - 40)",
          focus: "Fetal weight gain, pelvic floor preparation, lung maturation, and labor readiness.",
          exerciseTips: "Butterfly stretch, wall squats, gentle walking, birthing ball pelvic circles. Avoid sudden pivots or balance risks.",
          nutritionFocus: "DHA Omega-3 for fetal brain, Magnesium for leg cramps, fiber & water to prevent constipation."
        }
      ],
      safeExercises: [
        {
          id: "pelvic-floor-kegel",
          name: "Kegel & Pelvic Floor Conditioning",
          trimesterSafe: "Trimesters 1, 2, 3",
          photoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
          instructions: "Contract the muscles you would use to stop the flow of urine. Hold the contraction firmly for 5 seconds without holding your breath, then relax for 5 seconds. Repeat for 10-15 repetitions, 3 times daily.",
          advantages: [
            "Strengthens the pubococcygeus muscle to support the heavy gravid uterus.",
            "Prevents pregnancy-induced urinary incontinence.",
            "Enhances neuromuscular control to push effectively during vaginal delivery.",
            "Dramatically accelerates postpartum perineal healing."
          ],
          disadvantagesAndRisks: [
            "Over-tensing without releasing can cause hypertonic pelvic floor dysfunction.",
            "Do not perform while actively urinating as it can disrupt bladder emptying reflexes."
          ]
        },
        {
          id: "prenatal-walking",
          name: "Brisk Prenatal Walking",
          trimesterSafe: "Trimesters 1, 2, 3",
          photoUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=700&auto=format&fit=crop&q=80",
          instructions: "Walk at a steady, conversational pace on flat, supportive surfaces for 20 to 30 minutes daily. Wear supportive athletic shoes with arch cushioning.",
          advantages: [
            "Zero-impact cardiovascular conditioning that regulates maternal blood sugar.",
            "Reduces risk of gestational diabetes mellitus by up to 30%.",
            "Lowers risk of pregnancy-induced hypertension and preeclampsia.",
            "Maintains stamina needed for active labor."
          ],
          disadvantagesAndRisks: [
            "Walking on uneven terrain risks ankle sprains due to Relaxin hormone joint laxity.",
            "Walking in extreme midday heat risks maternal dehydration and overheating."
          ]
        },
        {
          id: "prenatal-cat-cow",
          name: "Prenatal Cat-Cow & Pelvic Tilts",
          trimesterSafe: "Trimesters 1, 2, 3",
          photoUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80",
          instructions: "Start on all fours with hands under shoulders and knees under hips. On an inhale, gently let the belly soften downward while looking slightly upward (Cow). On an exhale, round the spine upward toward the ceiling, tucking the chin (Cat). Move smoothly for 10 slow cycles.",
          advantages: [
            "Decompresses the lumbar spine and relieves sciatic nerve impingement.",
            "Encourages optimal fetal positioning (anterior vertex presentation for delivery).",
            "Relieves abdominal ligament strain caused by expanding belly."
          ],
          disadvantagesAndRisks: [
            "Avoid excessive lumbar sagging or hyperextension in Cow pose.",
            "Use a padded yoga mat to prevent knee discomfort."
          ]
        },
        {
          id: "prenatal-wall-squats",
          name: "Modified Wall Squats / Chair Squats",
          trimesterSafe: "Trimesters 1, 2, 3",
          photoUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80",
          instructions: "Stand with your back supported against a smooth wall, feet wider than shoulder-width apart and turned out 30 degrees. Slowly slide down until thighs are parallel to the floor (or to a comfortable chair height), pause for 2 seconds, then press through heels to stand.",
          advantages: [
            "Strengthens gluteus maximus, quadriceps, and pelvic girdle.",
            "Widens the pelvic outlet by up to 15%, creating more room for baby's descent.",
            "Reduces lower back strain by shifting load to lower extremity musculature."
          ],
          disadvantagesAndRisks: [
            "Avoid squatting without a wall or chair support in Trimester 3 due to altered center of gravity.",
            "Contraindicated if experiencing placenta previa or cervical insufficiency."
          ]
        },
        {
          id: "prenatal-butterfly-stretch",
          name: "Butterfly Stretch (Baddha Konasana)",
          trimesterSafe: "Trimesters 1, 2, 3",
          photoUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&auto=format&fit=crop&q=80",
          instructions: "Sit upright with back supported against a wall or pillow. Bring the soles of your feet together, allowing knees to fall open naturally to the sides. Hold feet with hands and gently breathe into the inner thighs for 30-60 seconds.",
          advantages: [
            "Gently stretches adductor (inner thigh) muscles and hip flexors.",
            "Enhances pelvic circulation and reduces perineal tension.",
            "Promotes deep diaphragmatic breathing and emotional relaxation."
          ],
          disadvantagesAndRisks: [
            "Do not force knees down with hands; allow gravity to do the work to avoid adductor strain.",
            "If pubic symphysis pain (SPD) occurs, keep knees closer together."
          ]
        },
        {
          id: "side-lying-leg-lift",
          name: "Side-Lying Hip & Glute Abduction",
          trimesterSafe: "Trimesters 1, 2, 3",
          photoUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
          instructions: "Lie on your left side with head rested on your arm and bottom knee bent for balance. Slowly lift your top straight leg 45 degrees, pause for 1 second, and lower under control. Complete 12 reps per side.",
          advantages: [
            "100% safe alternative to supine exercises (no vena cava compression).",
            "Strengthens Gluteus Medius, which stabilizes the pelvis during walking.",
            "Prevents waddling gait and reduces sacroiliac (SI) joint pain."
          ],
          disadvantagesAndRisks: [
            "Avoid twisting torso backward during leg elevation.",
            "Use a pillow between knees when resting."
          ]
        }
      ],
      dangerousExercisesToAvoid: [
        {
          name: "Supine Exercises (Lying Flat on Back after 16 Weeks)",
          danger: "The heavy uterus compresses the Inferior Vena Cava and abdominal aorta, drastically reducing cardiac venous return, causing maternal dizziness (supine hypotensive syndrome) and starving the fetus of oxygenated blood!",
          alternatives: "Perform exercises on hands and knees (quadruped), incline bench, or side-lying."
        },
        {
          name: "High-Impact Burpees, Box Jumps & Sprints",
          danger: "Elevated Relaxin hormone softens ligaments and cartilaginous joints throughout the body, dramatically elevating the risk of joint sprains, ligament tears, and pelvic girdle instability.",
          alternatives: "Low-impact brisk walking, stationary cycling, or water aerobics."
        },
        {
          name: "Heavy Valva Maneuver / Maximal Resistance Lifts",
          danger: "Holding breath while straining causes severe intra-abdominal pressure spikes, straining the pelvic floor and transiently cutting blood flow through the placenta.",
          alternatives: "Use moderate weights (12-15 reps) and exhale continuously on effort."
        },
        {
          name: "Hot Yoga, Saunas & Steam Baths",
          danger: "Maternal core temperature exceeding 39°C (102.2°F) during the first trimester causes neural tube defects and congenital abnormalities in the fetus.",
          alternatives: "Exercise in well-ventilated, air-conditioned rooms with continuous cool hydration."
        },
        {
          name: "Contact Sports & Fall-Risk Activities (Skiing, Horseback Riding, Football)",
          danger: "Blunt abdominal trauma or heavy falls carry severe risk of placental abruption (placenta peeling away from uterine wall), preterm labor, and fetal hemorrhage.",
          alternatives: "Controlled prenatal indoor walking and guided yoga."
        }
      ],
      maternalNutritionAdvantages: [
        { nutrient: "Folate / Folic Acid (400 - 600 mcg)", sources: "Spinach, Lentils (Dal), Chickpeas (Chole), Fortified grains, Oranges", benefit: "Critical for embryonic DNA synthesis and closure of the neural tube within the first 28 days of gestation; prevents spina bifida and anencephaly." },
        { nutrient: "Iron (27 mg daily)", sources: "Sprouted Moong, Dates (Khajoor), Beetroot, Jaggery, Dried Figs, Lean poultry", benefit: "Synthesizes hemoglobin to support the 40-50% increase in maternal blood volume; delivers oxygen to the developing fetus and prevents low birth weight." },
        { nutrient: "Calcium (1,000 - 1,200 mg daily)", sources: "Milk, Paneer, Curd (Dahi), Ragi (Finger Millet), Sesame Seeds (Til)", benefit: "Constructs fetal skeletal bones and tooth buds; if maternal intake is inadequate, the fetus leaches calcium directly from maternal skeleton, elevating osteoporosis risk." },
        { nutrient: "DHA Omega-3 Fatty Acids (300 mg daily)", sources: "Walnuts, Chia Seeds, Flaxseed oil, Fortified eggs, Microalgae oil, Safe wild salmon", benefit: "Primary structural component of the human fetal cerebral cortex and retina; directly drives visual acuity and cognitive neurodevelopment." },
        { nutrient: "Choline (450 mg daily)", sources: "Whole eggs (yolk), Soybeans, Broccoli, Cauliflower, Peanuts", benefit: "Synergizes with folate for fetal spinal cord and brain structural integrity; optimizes placental blood flow and nutrient transport." },
        { nutrient: "High-Quality Protein (75 - 90g daily)", sources: "Paneer, Dal, Sattu, Greek yogurt, Eggs, Tofu, Lean chicken", benefit: "Provides essential amino acids for exponential cellular replication, placental tissue growth, and maternal breast/uterine tissue expansion." }
      ],
      maternalNutritionDisadvantages: [
        { food: "Raw / Unripe Papaya (Contains Latex & Papain)", harm: "Concentrated milky latex in green/semi-ripe papaya acts like oxytocin and prostaglandin, triggering intense uterine contractions and premature labor/miscarriage.", precaution: "Strictly avoid unripe or semi-ripe papaya throughout pregnancy." },
        { food: "Excess Pineapple (Contains Bromelain)", harm: "High doses of bromelain enzyme soften cervical connective tissue, potentially inducing early cervical effacement and spotting in early pregnancy.", precaution: "Avoid large bowls or concentrated fresh pineapple juice, particularly in trimester 1." },
        { food: "Raw or Runny Eggs & Raw Meat", harm: "High risk of Salmonella enterica and Toxoplasma gondii parasites, which can cause severe maternal gastrointestinal illness and congenital fetal infections.", precaution: "Cook eggs until yolks and whites are completely firm; cook all meat thoroughly to 75°C (165°F)." },
        { food: "Unpasteurized Raw Milk & Soft Cheeses (Feta, Brie, Blue Cheese)", harm: "Harbors Listeria monocytogenes bacteria. Listeria can cross the placental barrier, leading to miscarriage, stillbirth, or neonatal meningitis.", precaution: "Consume only pasteurized dairy products (boiled milk, pasteurized paneer, packaged curd)." },
        { food: "High-Mercury Predatory Fish (Shark, Swordfish, King Mackerel)", harm: "Methylmercury bioaccumulates in predatory fish and readily crosses the placenta, damaging the delicate fetal brain and nervous system.", precaution: "Choose low-mercury fish like canned light tuna or wild salmon, limited to 2 servings weekly." },
        { food: "Excess Caffeine (>200 mg/day)", harm: "Caffeine crosses the placental barrier unimpeded; the fetal liver lacks cytochrome P450 enzymes to metabolize caffeine, leading to fetal tachycardia and low birth weight.", precaution: "Limit to 1 small cup of coffee daily, or switch to warm milk or herbal caffeine-free teas." },
        { food: "Alcohol & Tobacco Products", harm: "There is NO safe threshold for alcohol in pregnancy. Causes Fetal Alcohol Spectrum Disorder (FASD), microcephaly, irreversible cognitive deficits, and facial dysmorphology.", precaution: "100% complete abstinence from all alcohol and tobacco products." }
      ]
    }
  },

  // =========================================================================
  // DISEASE MANAGEMENT, DIETARY CURES & CLINICAL MEDICINES (FOR BOTH MALES & FEMALES)
  // =========================================================================
  diseases: [
    {
      id: "diabetes",
      name: "Type 2 Diabetes & Insulin Resistance",
      category: "Metabolic",
      icon: "🩸",
      overview: "Impaired cellular insulin receptor signaling causes chronic hyperglycemia. Over time, elevated glucose damages vascular endothelium, nerves, kidneys, and retinas.",
      genderAspects: {
        males: "Men are biologically predisposed to deposit visceral fat around the liver and pancreas, developing diabetes at lower BMIs. Leads to erectile dysfunction and low testosterone.",
        females: "PCOS is a major trigger for insulin resistance in young women. Post-menopause, plummeting estrogen causes rapid abdominal fat gain and doubles cardiovascular risk."
      },
      healingFoodsAdvantages: [
        { name: "Bitter Gourd (Karela)", mechanism: "Contains charantin, vicine, and polypeptide-p (plant insulin) which stimulate glucose uptake into muscle tissue." },
        { name: "Fenugreek Seeds (Methi)", mechanism: "High 4-hydroxyisoleucine and galactomannan fiber slow carbohydrate enzymatic breakdown and enhance insulin secretion." },
        { name: "Cinnamon (Dalchini)", mechanism: "Cinnamaldehyde mimics insulin action, increasing cellular GLUT4 glucose transporter translocation." },
        { name: "Jamun (Indian Blackberry)", mechanism: "Jamboline and jambosine glucoside convert starch into energy, preventing sharp blood sugar spikes." },
        { name: "Sprouted Moong & Chana", mechanism: "Low Glycemic Index (GI < 35) with high resistant starch; delivers sustained energy without glucose surges." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Refined White Sugar & Packed Juices", reason: "Pure sucrose/fructose causes immediate glycemic spikes (>200 mg/dL), forcing beta-cell exhaustion." },
        { name: "White Flour (Maida) & Bakery Items", reason: "Stripped of fiber, converts to glucose in bloodstream within 15 minutes." },
        { name: "Deep-Fried Fast Food & Trans Fats", reason: "Induces lipid-induced insulin receptor resistance in skeletal muscle cells." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Metformin (Biguanide)", function: "First-line clinical therapy; decreases hepatic glucose production and increases peripheral insulin sensitivity without hypoglycemia." },
        { medicine: "SGLT-2 Inhibitors (Dapagliflozin, Empagliflozin)", function: "Blocks renal glucose reabsorption in proximal tubules, expelling excess glucose safely via urine while protecting heart & kidneys." },
        { medicine: "GLP-1 Receptor Agonists (Semaglutide, Liraglutide)", function: "Stimulates glucose-dependent insulin release, delays gastric emptying, and significantly reduces appetite." },
        { medicine: "DPP-4 Inhibitors (Teneligliptin, Sitagliptin)", function: "Prevents degradation of incretin hormones, stabilizing postprandial glucose." }
      ],
      lifestyleCure: "30-minute post-meal brisk walk (utilizes glucose directly via muscle contractions) + 3 days of compound strength training.",
      therapies: [
        { name: "Continuous Glucose Bio-Feedback Therapy", type: "Digital Health Therapy", protocol: "Use real-time CGM data to map personal insulin spikes against specific food combinations and optimize postprandial exercise timing." },
        { name: "Postprandial Soleus Muscle Contraction (SPU)", type: "Physiological Therapy", protocol: "Performing seated soleus pushups for 15-20 minutes activates muscle oxidative metabolism, clearing blood glucose without depleting glycogen." },
        { name: "Cold Exposure & Brown Adipose Activation", type: "Thermal Therapy", protocol: "Mild cold exposure (16-18°C) stimulates brown adipose tissue (BAT) thermogenesis, improving glucose disposal by up to 25%." }
      ]
    },
    {
      id: "hypertension",
      name: "Hypertension (High Blood Pressure)",
      category: "Cardiovascular",
      icon: "❤️",
      overview: "Sustained arterial pressure exceeding 130/80 mmHg forces the left ventricle to pump against high resistance, leading to cardiac hypertrophy, stroke, and kidney failure.",
      genderAspects: {
        males: "Higher prevalence under age 50 due to sympathetic tone, occupational stress, and androgen profile.",
        females: "Protected before age 50 by estrogen's nitric-oxide vascular dilating effect; rates skyrocket past menopause, often accompanied by arterial stiffness."
      },
      healingFoodsAdvantages: [
        { name: "Raw Garlic (Lehsun)", mechanism: "Allicin stimulates endothelial nitric oxide synthase (eNOS), dilating blood vessels and lowering systolic BP by 8-10 mmHg." },
        { name: "Beetroot & Spinach", mechanism: "Extremely rich in dietary nitrates (NO3), which reduce to nitric oxide, relaxing smooth vascular muscle." },
        { name: "Bananas & Tender Coconut Water", mechanism: "Provides 400-600mg potassium per serving, displacing intracellular sodium via the Na+/K+ ATPase pump." },
        { name: "Pomegranate Juice", mechanism: "Natural ACE-inhibiting polyphenols reduce angiotensin II vasoconstriction." },
        { name: "Flaxseeds (Alsi)", mechanism: "Alpha-linolenic acid (ALA) lowers vascular peripheral resistance and reduces arterial stiffness." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Pickles (Achaar) & Papad", reason: "Loaded with table salt (NaCl); 1 tsp provides >2,300mg sodium, expanding blood volume and elevating arterial pressure." },
        { name: "Processed Canned Soups & Instant Noodles", reason: "Monosodium glutamate (MSG) and preserving salts trigger immediate fluid retention." },
        { name: "Alcohol & Excessive Caffeine", reason: "Stimulates the renin-angiotensin-aldosterone axis and sympathetic nerve discharge." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Telmisartan / Losartan (ARBs)", function: "Blocks Angiotensin II type 1 receptors, causing blood vessel dilation and reducing cardiovascular strain." },
        { medicine: "Amlodipine (Calcium Channel Blocker)", function: "Inhibits calcium influx into vascular smooth muscle, promoting robust peripheral vasodilation." },
        { medicine: "Ramipril / Enalapril (ACE Inhibitors)", function: "Prevents conversion of Angiotensin I to Angiotensin II, lowering systemic vascular resistance." },
        { medicine: "Hydrochlorothiazide (Thiazide Diuretic)", function: "Promotes renal sodium and water excretion to lower overall vascular fluid volume." }
      ],
      lifestyleCure: "DASH Diet (<1,500mg sodium/day), daily isometric handgrip holds (lowers resting BP by 5-8 mmHg), and 15 mins diaphragmatic box breathing.",
      therapies: [
        { name: "Isometric Handgrip Training (IHT)", type: "Cardiovascular Rehab", protocol: "Squeeze a dynamometer at 30% maximum voluntary contraction for 2 mins x 4 sets, 3x weekly; shown to lower systolic BP by 8-10 mmHg." },
        { name: "Slow Resonance Frequency Breathing (0.1 Hz)", type: "Vagal Autonomic Therapy", protocol: "Breathe at 6 breaths per minute for 15 minutes twice daily; stimulates aortic baroreceptors and suppresses sympathetic drive." },
        { name: "Far-Infrared Sauna / Thermal Vasodilation", type: "Endothelial Thermal Therapy", protocol: "15 minutes in dry mild heat triggers acute peripheral vasodilation and improves arterial elasticity (Waon therapy model)." }
      ]
    },
    {
      id: "cholesterol",
      name: "High Cholesterol & Cardiovascular Health",
      category: "Cardiovascular",
      icon: "🫀",
      overview: "Elevated apolipoprotein B, LDL-C, and triglycerides oxidize and penetrate the arterial intima, forming atherosclerotic plaques that cause coronary heart disease.",
      genderAspects: {
        males: "Earlier onset of coronary artery disease; higher tendency toward low HDL and high triglycerides.",
        females: "Estrogen maintains protective HDL levels until menopause, after which LDL and triglycerides surge sharply."
      },
      healingFoodsAdvantages: [
        { name: "Rolled Oats (Beta-Glucan)", mechanism: "Soluble beta-glucan forms a viscous gel in the small intestine, binding bile acids and forcing the liver to clear LDL from the bloodstream." },
        { name: "Walnuts & Almonds", mechanism: "Rich in phytosterols and polyunsaturated fats that directly inhibit intestinal cholesterol absorption." },
        { name: "Extra Virgin Olive Oil & Mustard Oil", mechanism: "High in monounsaturated oleic acid, which raises protective HDL while reducing oxidized LDL." },
        { name: "Fenugreek Seeds (Methi)", mechanism: "Saponins bind cholesterol molecules and prevent micellar incorporation in the gut." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Hydrogenated Vanaspati & Bakery Trans Fats", reason: "Simultaneously increases dangerous LDL particles and suppresses cardioprotective HDL." },
        { name: "Reheated / Re-used Cooking Oils", reason: "Generates toxic lipid peroxides and aldehydes that cause acute arterial endothelial inflammation." },
        { name: "Processed Meats & Palm Oil Confectionery", reason: "High saturated palmitic acid downregulates LDL receptors on hepatic cell membranes." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Atorvastatin / Rosuvastatin (Statins)", function: "Inhibits HMG-CoA reductase (rate-limiting enzyme in hepatic cholesterol synthesis), reducing LDL by 30-55%." },
        { medicine: "Ezetimibe", function: "Selectively blocks the NPC1L1 transporter in the brush border of the small intestine, stopping cholesterol absorption." }
      ],
      lifestyleCure: "Zone 2 aerobic cardio (45 mins, 4x weekly) to stimulate lipoprotein lipase + 35g daily soluble fiber.",
      therapies: [
        { name: "Zone 2 Aerobic Lipoprotein Therapy", type: "Metabolic Endurance Therapy", protocol: "Maintain continuous cardiovascular effort at 65-75% maximum heart rate (lactate <2 mmol/L) for 45 mins to maximize fatty acid oxidation." },
        { name: "Plant Sterol / Stanol Emulsion Therapy", type: "Nutraceutical Protocol", protocol: "2 grams of plant stanols taken with meals competitively blocks intestinal cholesterol transporter NPC1L1." },
        { name: "High-Dose Pure EPA Omega-3 Therapy", type: "Lipid Stabilization Protocol", protocol: "Clinical 4g/day icosapent ethyl stabilizes endothelial plaque membranes and lowers serum triglycerides by 25-30%." }
      ]
    },
    {
      id: "thyroid",
      name: "Thyroid Disorders (Hypothyroidism & Hashimoto's)",
      category: "Endocrine",
      icon: "🦋",
      overview: "Insufficient thyroid hormone (T3/T4) production slows whole-body basal metabolic rate, causing extreme lethargy, weight gain, cold intolerance, dry skin, and hair loss.",
      genderAspects: {
        males: "Occurs in men less frequently, but when present, frequently blunts testosterone production and causes severe depression.",
        females: "5 to 8 times more common in women due to autoimmune susceptibility (Hashimoto's thyroiditis), postpartum hormonal shifts, and estrogen receptor interactions."
      },
      healingFoodsAdvantages: [
        { name: "Brazil Nuts (Selenium)", mechanism: "Selenium is an essential cofactor for iodothyronine deiodinase enzymes that convert inactive T4 into active T3." },
        { name: "Pumpkin Seeds & Cashews (Zinc)", mechanism: "Zinc is required for the pituitary gland to synthesize Thyroid Stimulating Hormone (TSH)." },
        { name: "Iodized Himalayan Pink Salt & Seaweed", mechanism: "Provides elemental iodine, the direct molecular building block of thyroid hormones." },
        { name: "Ashwagandha (Withania Somnifera)", mechanism: "Adaptogen that lowers elevated cortisol, indirectly normalizing TSH and supporting thyroid hormone synthesis." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Raw Cruciferous Vegetables (Raw Cabbage, Cauliflower, Broccoli)", reason: "Contains goitrin and isothiocyanates which compete with iodine for thyroid gland uptake. Must be steamed or cooked thoroughly." },
        { name: "Excess Unfermented Soy & Tofu", reason: "Soy isoflavones can inhibit thyroid peroxidase (TPO) enzyme activity." },
        { name: "Gluten (for Autoimmune Hashimoto's Patients)", reason: "Molecular mimicry: gliadin peptide shares structural homology with thyroid tissue, triggering autoimmune antibody attacks." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Levothyroxine Sodium (Thyronorm, Eltroxin)", function: "Synthetic T4 hormone; must be taken strictly on an empty stomach with plain water at least 45 minutes before breakfast for optimal intestinal absorption." }
      ],
      lifestyleCure: "Correct Vitamin D3 and Ferritin levels (both needed for thyroid hormone reception at the cellular nuclear level).",
      therapies: [
        { name: "Photobiomodulation / Near-Infrared Neck Therapy", type: "Low-Level Light Therapy", protocol: "830nm near-infrared light applied over the thyroid bed for 10 mins reduces thyroid peroxidase antibodies (TPOAb) and enhances ATP synthesis." },
        { name: "Circadian Cortisol Reset Protocol", type: "Neuro-Endocrine Therapy", protocol: "View morning sunlight within 30 minutes of waking and maintain complete dark room sleeping to normalize the hypothalamic-pituitary-thyroid axis." },
        { name: "Gut Microbiome & Deiodinase Restoration", type: "Enteric Endocrinology", protocol: "20% of inactive T4 is converted to active T3 in the gut by intestinal sulfatase; taking multi-strain spore probiotics supports this conversion." }
      ]
    },
    {
      id: "fatty-liver",
      name: "Non-Alcoholic Fatty Liver Disease (NAFLD)",
      category: "Hepatic",
      icon: "🫀",
      overview: "Excessive triglyceride accumulation exceeding 5% of total liver weight, driven by high sugar, fructose, and sedentary lifestyle, leading to hepatic inflammation and cirrhosis.",
      genderAspects: {
        males: "Higher incidence in younger men due to visceral adiposity and high alcohol/fast food intake.",
        females: "Incidence escalates drastically after menopause due to loss of protective estrogen signaling in hepatic lipid metabolism."
      },
      healingFoodsAdvantages: [
        { name: "Black Coffee (2-3 cups daily)", mechanism: "Stimulates hepatic autophagy, activates glutathione production, and reduces hepatic fibrosis risk by 40%." },
        { name: "Green Tea (EGCG)", mechanism: "Potent epigallocatechin gallate antioxidant reduces liver lipid accumulation and improves liver enzyme levels (ALT/AST)." },
        { name: "Turmeric (Curcumin) with Black Pepper", mechanism: "Downregulates hepatic NF-kB inflammatory cascade and enhances hepatic detoxification." },
        { name: "Cruciferous Vegetables (Broccoli, Radish)", mechanism: "Contains glucoraphanin which synthesizes sulforaphane, stimulating Phase II liver detoxification pathways." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "High-Fructose Corn Syrup & Soft Drinks", reason: "Fructose is metabolized exclusively in the liver and directly lipogenized into toxic intrahepatic triglycerides." },
        { name: "Alcohol (Even in Moderate Amounts)", reason: "Synergizes with NAFLD to dramatically accelerate progression to non-alcoholic steatohepatitis (NASH)." },
        { name: "Ultra-Processed Bakery Products", reason: "Rich in refined flour and trans fats that trigger hepatic steatosis." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Vitamin E (Alpha-tocopherol 800 IU)", function: "Potent antioxidant shown in PIVENS clinical trials to improve liver histology and reduce inflammation in non-diabetic NASH." },
        { medicine: "Saroglitazar (Dual PPAR Alpha/Gamma Agonist)", function: "Approved in India for treating NAFLD/NASH; effectively reduces liver fat content, triglycerides, and ALT." },
        { medicine: "Ursodeoxycholic Acid (UDCA)", function: "Hydrophilic bile acid that protects hepatocyte membranes against toxic hydrophobic bile acids." }
      ],
      lifestyleCure: "Gradual weight reduction of 7% to 10% of total body weight completely reverses early-stage liver fat!",
      therapies: [
        { name: "Time-Restricted Eating & Hepatic Autophagy (16:8)", type: "Metabolic Chronotherapy", protocol: "A 16-hour fasting window depletes liver glycogen, triggering hepatic lipophagy to break down stored intrahepatic fat droplets." },
        { name: "High-Intensity Interval Training (HIIT)", type: "Exercise Metabolic Therapy", protocol: "3 weekly sessions of 20-minute interval sprints mobilizes peripheral free fatty acids and cuts liver fat by up to 30% even without weight loss." },
        { name: "Choline & Phosphatidylcholine Protocol", type: "Lipotropic Micronutrient Therapy", protocol: "Adequate dietary choline is required to synthesize VLDL particles that transport triglycerides out of hepatocytes into systemic circulation." }
      ]
    },
    {
      id: "anemia",
      name: "Anemia & Hemoglobin Deficiency",
      category: "Hematologic",
      icon: "🩸",
      overview: "Insufficient red blood cell count or low hemoglobin (<13 g/dL for men, <12 g/dL for women) starves organs and muscles of oxygen, resulting in chronic exhaustion, dizziness, and pale skin.",
      genderAspects: {
        males: "Less common in young men; when present, usually signifies gastrointestinal bleeding (ulcers, polyps) or chronic disease.",
        females: "Extremely common in women (>50% of Indian females) due to monthly menstrual blood loss, pregnancy demands, and dietary iron gaps."
      },
      healingFoodsAdvantages: [
        { name: "Moringa / Drumstick Leaves (Munaga Aku)", mechanism: "Superfood containing 28mg of non-heme iron per 100g, paired with natural Vitamin C for explosive absorption." },
        { name: "Beetroot & Pomegranate Juice", mechanism: "Provides iron, folate, and betaine to stimulate bone marrow erythropoiesis." },
        { name: "Jaggery (Gur) & Black Raisins (Munakka)", mechanism: "Easily digestible organic iron and copper needed for hemoglobin synthesis." },
        { name: "Spinach Paired with Fresh Lemon Juice", mechanism: "Vitamin C reduces ferric iron (Fe3+) to highly absorbable ferrous iron (Fe2+), boosting bioavailability by 300%!" }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Tea & Coffee Consumed with Meals", reason: "Tannins, polyphenols, and chlorogenic acid bind iron in the digestive tract, inhibiting iron absorption by up to 60-70%!" },
        { name: "Calcium Supplements Taken Concurrently with Iron", reason: "Calcium competes for the same DMT-1 intestinal mucosal transporter as iron." },
        { name: "Raw Unsoaked Bran & Unsprouted Grains", reason: "High phytic acid binds iron into insoluble complexes. Always soak or sprout grains before eating." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Ferrous Ascorbate / Ferrous Fumarate + Folic Acid", function: "Standard clinical oral iron therapy; restores depleted ferritin reserves and normalizes hemoglobin within 8-12 weeks." },
        { medicine: "Intravenous Iron Sucrose / Ferric Carboxymaltose", function: "Administered in clinical settings when oral iron is poorly tolerated or in severe third-trimester pregnancy anemia." }
      ],
      lifestyleCure: "Cook food in traditional cast-iron utensils (increases iron content of curries by up to 16%) + separate tea/coffee by at least 1 hour from meals.",
      therapies: [
        { name: "Oral Iron Therapy & Vitamin C Pairing", type: "Micronutrient Therapy", protocol: "Take elemental iron with 200mg ascorbic acid or freshly squeezed citrus juice on an empty stomach to triple bioavailability." },
        { name: "Cast-Iron Cooking Therapy", type: "Bio-Availability Therapy", protocol: "Simmering acidic tomato or tamarind-based dishes in pure cast iron naturally fortifies the meal with absorbable elemental iron." },
        { name: "Nutritional Megaloblastic Protocol", type: "Hematological Support", protocol: "Co-administer Methylcobalamin (B12) and active Methylfolate to treat dual-deficiency anemia that limits red blood cell synthesis." }
      ]
    },
    {
      id: "pcos-pcod",
      name: "PCOS / PCOD (Polycystic Ovarian Syndrome)",
      category: "Endocrine & Reproductive",
      icon: "🌸",
      overview: "Hormonal disorder driven by hyperinsulinemia and excess ovarian androgen production, resulting in irregular anovulatory cycles, cystic ovaries, hirsutism, cystic acne, and central weight gain.",
      genderAspects: {
        males: "Not biologically applicable directly; however, male first-degree relatives frequently carry insulin resistance and early-onset metabolic syndrome.",
        females: "Affects 1 in 5 Indian women of reproductive age. Causes irregular periods, high luteinizing hormone (LH), difficulty conceiving, and heightened risk for gestational diabetes."
      },
      healingFoodsAdvantages: [
        { name: "Spearmint Tea (Mentha Spicata)", mechanism: "Clinical trials prove 2 cups daily significantly reduces free testosterone levels and subjective hirsutism in women with PCOS." },
        { name: "Inositol-Rich Foods (Cantaloupe, Beans, Citrus)", mechanism: "Myo-inositol improves insulin receptor sensitivity in ovarian follicles, restoring spontaneous ovulation." },
        { name: "Flaxseeds & Sesame Seeds (Seed Cycling)", mechanism: "Lignans bind excess circulating estrogen and DHT, promoting hormone clearance via the liver." },
        { name: "Cinnamon & Apple Cider Vinegar", mechanism: "Regulates postprandial glycemic excursions and enhances ovarian insulin signaling." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Commercial Dairy Products with Added Hormones", reason: "Contains bovine IGF-1 (Insulin-like Growth Factor 1) which directly stimulates ovarian androgen synthesis." },
        { name: "High Glycemic Refined Sugars & Sodas", reason: "Induces sharp insulin surges that signal the theca cells in ovaries to overproduce testosterone." },
        { name: "Hydrogenated Vegetable Oils", reason: "Elevates systemic low-grade inflammation, aggravating ovulatory dysfunction." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Myo-Inositol & D-Chiro Inositol (40:1 Ratio)", function: "Second-messenger mimetic that restores ovarian insulin sensitivity and significantly enhances egg quality." },
        { medicine: "Metformin (500mg - 1000mg)", function: "Lowers insulin resistance, normalizes testosterone levels, and aids regular menstrual resumption." },
        { medicine: "Combined Oral Contraceptive Pills (COCPs)", function: "Suppresses LH secretion and raises sex hormone-binding globulin (SHBG) to clear free androgens." }
      ],
      lifestyleCure: "Zone 2 aerobic exercise (150 mins/week) + high-intensity resistance training to deplete muscle glycogen and reverse hyperinsulinemia.",
      therapies: [
        { name: "Seed Cycling Hormone Therapy", type: "Nutritional Therapy", protocol: "Days 1-14: 1 tbsp ground flaxseeds + pumpkin seeds (supports estrogen balance). Days 15-28: 1 tbsp sesame seeds + sunflower seeds (supports progesterone synthesis)." },
        { name: "Acupuncture & Pelvic Blood Flow Therapy", type: "Bio-Physical Therapy", protocol: "Targeted electro-acupuncture regulates sympathetic outflow to ovaries, lowering circulating testosterone and promoting follicle rupture." },
        { name: "Spearmint Anti-Androgen Phytotherapy", type: "Herbal Protocol", protocol: "Steep 1 tbsp organic spearmint leaves in hot water twice daily for 30 consecutive days to downregulate 5-alpha reductase enzyme." }
      ]
    },
    {
      id: "arthritis",
      name: "Arthritis & Joint Inflammation (Osteo & Rheumatoid)",
      category: "Musculoskeletal",
      icon: "🦴",
      overview: "Degradation of joint articular cartilage (Osteoarthritis) or autoimmune synovial inflammation (Rheumatoid Arthritis) causing chronic stiffness, joint effusions, and crippling bone-on-bone pain.",
      genderAspects: {
        males: "More common under age 45 due to sports trauma and occupational mechanical loading.",
        females: "Prevalence doubles in women after menopause due to loss of protective estrogen, which normally preserves chondrocyte viability."
      },
      healingFoodsAdvantages: [
        { name: "Fatty Cold-Water Fish / Algal Omega-3", mechanism: "High EPA/DHA suppresses leukotriene B4 and prostaglandin E2, terminating cartilage enzymatic destruction." },
        { name: "Turmeric (Curcumin) with Piperine", mechanism: "Suppresses COX-2 and NF-kB inflammatory cascades as effectively as 400mg Ibuprofen without stomach ulceration." },
        { name: "Bone Broth / Hydrolyzed Collagen Peptides", mechanism: "Provides direct Type II collagen, proline, and glycine to feed chondrocyte repair." },
        { name: "Ginger & Tart Cherries", mechanism: "Anthocyanins neutralize reactive oxygen species and inhibit interleukin-1 beta in synovial fluid." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Excess Added Sugars & High-Fructose Corn Syrup", reason: "Triggers release of pro-inflammatory cytokines (TNF-alpha) that worsen joint swelling." },
        { name: "Ultra-Processed Fried Foods (Omega-6 Overload)", reason: "Excess linoleic acid without Omega-3 balance fuels systemic arachidonic acid inflammatory cascades." },
        { name: "High-Purine Organ Meats & Beer", reason: "Elevates serum uric acid levels, precipitating acute excruciating gouty arthritis attacks." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "DMARDs (Methotrexate, Sulfasalazine)", function: "Suppresses autoimmune synovial proliferation in Rheumatoid Arthritis to prevent permanent joint deformation." },
        { medicine: "Selective COX-2 Inhibitors (Celecoxib, Etoricoxib)", function: "Reduces acute pain and joint swelling while sparing stomach protective prostaglandin synthesis." },
        { medicine: "Intra-Articular Hyaluronic Acid Injections", function: "Restores viscoelastic lubrication inside the knee synovial capsule, acting as a shock absorber." }
      ],
      lifestyleCure: "Low-impact non-weight-bearing swimming, water aerobics, and isometric quadriceps strengthening to stabilize joint mechanics.",
      therapies: [
        { name: "Hydrotherapy / Aquatic Joint Therapy", type: "Physical Therapy", protocol: "Buoyancy in warm (34°C) water relieves 90% of gravitational knee loading, enabling pain-free range-of-motion restoration." },
        { name: "Cold Compression Cryotherapy & Contrast Baths", type: "Cryo-Therapy", protocol: "15-minute iced gel compression post-walk reduces synovial inflammatory edema; alternate with warm compress for morning stiffness." },
        { name: "Isometric Joint Stabilization Protocol", type: "Kinesiology Rehabilitation", protocol: "Straight-leg raises and wall sits activate stabilizing muscles around the patella without grinding arthritic cartilage." }
      ]
    },
    {
      id: "gerd-acid-reflux",
      name: "GERD, Acid Reflux & Peptic Ulcer Disease",
      category: "Gastrointestinal",
      icon: "🔥",
      overview: "Transient relaxations of the lower esophageal sphincter (LES) permit stomach hydrochloric acid and pepsin to backflow into the esophagus, causing heartburn, regurgitation, and Barrett's metaplasia.",
      genderAspects: {
        males: "Higher risk of developing severe erosive esophagitis, Barrett's esophagus, and esophageal adenocarcinoma.",
        females: "Frequently exacerbated during pregnancy due to elevated progesterone relaxing the lower esophageal sphincter and uterine fundal compression."
      },
      healingFoodsAdvantages: [
        { name: "Fresh Aloe Vera Gel & Juice", mechanism: "Contains acemannan polysaccharides that coat and soothe inflamed esophageal mucosal linings." },
        { name: "Oatmeal & Bananas (Low-Acid Alkaline Foods)", mechanism: "Absorbs stomach acid and contains pectin that forms a protective gel barrier." },
        { name: "Deglycyrrhizinated Licorice (DGL)", mechanism: "Stimulates mucous secretion, reinforcing the gastric mucosal barrier against pepsin erosion." },
        { name: "Cold Milk / Almond Milk", mechanism: "Provides temporary buffering of hydrochloric acid, relieving burning sensation in the chest." }
      ],
      harmfulFoodsDisadvantages: [
        { name: "Deep-Fried Oily Foods & Heavy Cream", reason: "Fat delays gastric emptying (gastroparesis), dramatically increasing upward gastric intra-luminal pressure." },
        { name: "Citrus Fruits, Tomatoes & Raw Onions", reason: "High citric/malic acid directly irritates the denuded esophageal squamous epithelium." },
        { name: "Peppermint, Spearmint & Chocolate", reason: "Chemicals like theobromine and menthol directly relax the lower esophageal sphincter muscle tone." }
      ],
      clinicalMedicinesOverview: [
        { medicine: "Proton Pump Inhibitors (Pantoprazole, Rabeprazole, Esomeprazole)", function: "Irreversibly blocks the H+/K+ ATPase pump in gastric parietal cells, halting acid secretion." },
        { medicine: "H2 Receptor Blockers (Famotidine)", function: "Competitively inhibits histamine H2 receptors on parietal cells, suppressing nocturnal acid surges." },
        { medicine: "Sodium Alginate Suspension (Gaviscon)", function: "Reacts with gastric acid to form a physical floating raft that blocks reflux into the esophagus." }
      ],
      lifestyleCure: "Elevate head of bed by 6 inches (gravity reflux block) and finish dinner at least 3 full hours before lying down.",
      therapies: [
        { name: "Postural & Gravitational Anti-Reflux Therapy", type: "Mechanical Therapy", protocol: "Sleep strictly on the left lateral decubitus side with 6-inch mattress wedge elevation (keeps gastric junction above acid pool)." },
        { name: "Diaphragmatic Breathing Rehabilitation", type: "Respiratory Therapy", protocol: "Strengthens the crural diaphragm that surrounds and reinforces the lower esophageal sphincter, reducing transient relaxations." },
        { name: "Deglycyrrhizinated Licorice (DGL) Mucosal Shield", type: "Phytomedicine Protocol", protocol: "Chew two 400mg DGL tablets 20 minutes before lunch and dinner to coat and insulate esophageal mucosa." }
      ]
    }
  ],

  // =========================================================================
  // COMPLETE BALANCED HEALTHY DIET PLANS FOR BOTH MALES & FEMALES
  // =========================================================================
  healthyDiets: {
    genderMatrix: [
      { nutrient: "Daily Calorie Target", men: "2,200 - 2,800 kcal (Higher lean muscle mass)", women: "1,800 - 2,200 kcal (Lower basal metabolic rate)" },
      { nutrient: "Daily Protein Target", men: "1.2 - 2.0 g/kg (75 - 120g typical)", women: "1.0 - 1.6 g/kg (55 - 85g typical)" },
      { nutrient: "Daily Iron Requirement", men: "8 - 10 mg (No menstrual loss)", women: "15 - 18 mg (Crucial due to monthly menses)" },
      { nutrient: "Daily Calcium Requirement", men: "1,000 mg (Bone maintenance)", women: "1,000 - 1,200 mg (Higher risk of osteopenia)" },
      { nutrient: "Daily Zinc Target", men: "11 - 15 mg (Sperm & Testosterone synthesis)", women: "8 - 10 mg (Ovulation & skin repair)" },
      { nutrient: "Daily Folate Target", men: "400 mcg (Cellular repair)", women: "400 - 600 mcg (Pregnancy & hormonal health)" },
      { nutrient: "Daily Water Intake", men: "3.5 - 4.0 Liters", women: "2.5 - 3.2 Liters" }
    ],
    plans: {
      men: {
        title: "Complete Healthy Balanced Daily Diet Plan for Men",
        goal: "Muscle maintenance, optimal testosterone, high stamina, and cardiovascular health.",
        caloricRange: "2,200 - 2,500 kcal | 110-130g Protein | 60-70g Healthy Fats | 280-320g Complex Carbs",
        meals: [
          {
            time: "6:30 AM - 7:00 AM",
            name: "Early Morning Hydration & Testosterone Boost",
            menu: "500ml warm water with 1/2 lemon + 5 soaked almonds + 2 soaked walnuts + 1 tsp pumpkin seeds (Rich in Zinc for morning testosterone spike)."
          },
          {
            time: "8:00 AM - 8:30 AM",
            name: "Power Breakfast",
            menuVeg: "3 Moong Dal Cheelas / 3 Idlis with Sambar + 1 bowl Sprouted Moong + 1 glass Warm Milk / Buttermilk (30g Protein).",
            menuNonVeg: "3 Whole Eggs (Boiled or Scrambled) + 2 slices Multigrain Toast with peanut butter + 1 bowl Sambar or Fruit (32g Protein)."
          },
          {
            time: "11:00 AM - 11:30 AM",
            name: "Mid-Morning Focus Snack",
            menu: "1 Apple / Banana + 1 cup Tender Coconut Water or Roasted Chana (Provides potassium, clean glycogen, and natural electrolytes)."
          },
          {
            time: "1:00 PM - 2:00 PM",
            name: "High-Protein Wholesome Lunch",
            menuVeg: "2 Phulkas (Multigrain/Wheat) + 1 cup Brown/White Rice + 1 bowl Thick Dal or Rajma/Chole + 100g Grilled Paneer/Tofu + 1 large bowl Cucumber & Tomato Salad + 1 bowl Curd (35g Protein).",
            menuNonVeg: "2 Phulkas + 1 cup Rice + 150g Grilled/Curry Chicken or Fish + 1 bowl Dal + Fresh Green Salad + Curd (42g Protein)."
          },
          {
            time: "5:00 PM - 5:30 PM",
            name: "Pre-Workout / Evening Energy Fuel",
            menu: "1 cup Black Coffee / Green Tea + 1 Banana + 1 tbsp Peanut Butter on wholewheat toast OR 1 bowl Roasted Makhana (Foxnuts)."
          },
          {
            time: "7:30 PM - 8:30 PM",
            name: "Light & Muscle-Repairing Dinner",
            menuVeg: "2 Ragi or Wheat Rotis + 1 bowl Mixed Vegetable Curry + 1 bowl Dal or Soy Chunks Curry + Stir-fried Spinach (25g Protein).",
            menuNonVeg: "2 Rotis + 120g Grilled Fish or Chicken Breast + Steamed Green Vegetables + Clear Dal Soup (35g Protein)."
          },
          {
            time: "9:45 PM - 10:00 PM",
            name: "Bedtime Recovery",
            menu: "1 cup Warm Turmeric Milk (Haldi Doodh) with a pinch of black pepper and ashwagandha (Lowers cortisol, supports deep Stage 3-4 HGH release)."
          }
        ]
      },
      women: {
        title: "Complete Healthy Balanced Daily Diet Plan for Women",
        goal: "Hormonal balance, steady energy, iron and bone density support, healthy metabolism.",
        caloricRange: "1,800 - 2,000 kcal | 75-90g Protein | 50-60g Healthy Fats | 220-250g Complex Carbs",
        meals: [
          {
            time: "7:00 AM - 7:30 AM",
            name: "Alkaline Wake-Up & Gut Healing",
            menu: "400ml warm water with 1 tbsp soaked Chia seeds + 4 soaked black raisins (Munakka) + 2 soaked walnuts (Rich in ALA Omega-3 and natural iron)."
          },
          {
            time: "8:30 AM - 9:00 AM",
            name: "Nourishing Balanced Breakfast",
            menuVeg: "1 large bowl Rolled Oats cooked in milk with sliced bananas and flaxseed powder OR 2 Paneer Stuffed Parathas (cooked with minimal ghee) + Curd (22g Protein).",
            menuNonVeg: "2 Whole Boiled / Omelette Eggs with sauteed spinach and mushrooms + 1 slice multigrain toast + 1 glass freshly squeezed orange juice (24g Protein)."
          },
          {
            time: "11:00 AM - 11:30 AM",
            name: "Mid-Morning Micronutrient Energy",
            menu: "1 Fresh Guava / Pomegranate (High Vitamin C and Iron) + 1 small handful Pumpkin & Sunflower seeds (supports follicular and luteal progesterone)."
          },
          {
            time: "1:00 PM - 2:00 PM",
            name: "Phyto-Nutrient & Iron-Rich Lunch",
            menuVeg: "2 Phulkas or 1 bowl Ragi Mudde/Rice + 1 bowl Chole/Rajma/Sprouted Moong Dal + 80g Paneer/Tofu Bhurji + 1 big bowl Beetroot, Carrot & Spinach Salad + 1 bowl Probiotic Curd (28g Protein).",
            menuNonVeg: "2 Phulkas + 1 cup Rice + 120g Fish Curry or Grilled Chicken + 1 bowl Dal + Beetroot Salad + Curd (32g Protein)."
          },
          {
            time: "5:00 PM - 5:30 PM",
            name: "Evening Rejuvenation Snack",
            menu: "1 cup Chamomile / Green Tea / Ginger Tea + 1 small piece Jaggery (Gur) with Roasted Chana (Alleviates evening fatigue and sugar cravings)."
          },
          {
            time: "7:30 PM - 8:30 PM",
            name: "Light, Anti-Bloat Dinner",
            menuVeg: "1-2 Multigrain Phulkas / Quinoa Bowl + 1 bowl Bottle Gourd (Lauki) or Paneer Veggie Stew + 1 bowl Yellow Moong Dal Soup (Easy on digestive tract, prevents nocturnal bloat) (20g Protein).",
            menuNonVeg: "1-2 Rotis + 100g Steamed Fish or Shredded Chicken Soup with vegetables (26g Protein)."
          },
          {
            time: "9:45 PM - 10:00 PM",
            name: "Bedtime Restorative Elixir",
            menu: "1 cup Warm Cardamom Cinnamon Milk (Regulates nocturnal insulin and supports deep slow-wave sleep)."
          }
        ]
      }
    }
  }
};

// Export to window for vanilla browser execution
if (typeof window !== "undefined") {
  window.FIT_DATA = FIT_DATA;
}


export const {
  bodyParts,
  exercises,
  foods,
  nutrients,
  gyms,
  womenHealth,
  diseases,
  healthyDiets,
  schemaInfo
} = FIT_DATA;

export default FIT_DATA;
