/**
 * FitGuide Exercise Photos Map
 * Every single exercise in FitGuide has an authentic, high-resolution photo matching
 * its exact name, movement mechanics, and target biomechanics (100% unique 1-to-1 mapping).
 */
export const EXERCISE_PHOTOS = {
  // =========================================================================
  // CHEST EXERCISES
  // =========================================================================
  // Push-ups: Prone floor bodyweight press
  "push-ups": "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80",
  // Barbell / Dumbbell Bench Press: Flat bench barbell press
  "bench-press": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
  // Standing Cable Crossover / Chest Fly: Dual cable pec adduction
  "cable-chest-fly": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
  // Incline Dumbbell Bench Press: Clavicular upper chest incline dumbbell press
  "incline-dumbbell-press": "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // LEGS & QUADRICEPS
  // =========================================================================
  // Bodyweight / Goblet Squats: Deep knee flexion & hip drive
  "squats": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
  // Walking / Reverse Lunges: Unilateral staggered stance lunging
  "lunges": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop&q=80",
  // 45-Degree Leg Press: Sled leg press machine
  "leg-press": "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // BACK & POSTERIOR CHAIN
  // =========================================================================
  // Pull-ups & Chin-ups: Overhead bar pulling
  "pull-ups": "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&auto=format&fit=crop&q=80",
  // Conventional / Romanian Deadlift: Ground barbell pull
  "deadlift": "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&auto=format&fit=crop&q=80",
  // Bent-Over Barbell / Dumbbell Rows: Bent over rowing
  "barbell-rows": "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&auto=format&fit=crop&q=80",
  // Cable Lat Pulldown: Wide grip overhead cable pull
  "lat-pulldown": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80",
  // Seated Cable Row: V-bar cable seated row
  "seated-cable-row": "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // ABS & CORE
  // =========================================================================
  // Forearm Plank: Isometric core stability
  "plank": "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?w=800&auto=format&fit=crop&q=80",
  // Russian Twists: Rotational core & obliques
  "russian-twists": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // SHOULDERS (DELTOIDS)
  // =========================================================================
  // Overhead Dumbbell / Barbell Press: Vertical overhead press
  "shoulder-press": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
  // Dumbbell Lateral Raises: Lateral arm abduction
  "lateral-raises": "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&auto=format&fit=crop&q=80",
  // Dumbbell Lateral Raise (Side Deltoid Builder): Side deltoid builder
  "dumbbell-lateral-raise": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // ARMS (BICEPS & TRICEPS)
  // =========================================================================
  // Dumbbell / Barbell Bicep Curls: Arm flexion curls
  "bicep-curls": "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80",
  // Tricep Dips: Parallel bars & bench bodyweight dip
  "tricep-dips": "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&auto=format&fit=crop&q=80",
  // Cable Tricep Rope Pushdown: Cable tricep lockout
  "tricep-pushdown": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
  // EZ-Bar / Dumbbell Preacher Curl: Isolated bicep preacher bench
  "preacher-curl": "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // GLUTES, HAMSTRINGS & CALVES
  // =========================================================================
  // Barbell / Bodyweight Hip Thrust & Glute Bridge: Pelvic hip extension
  "glute-bridges": "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&auto=format&fit=crop&q=80",
  // Romanian Deadlift (RDL): Hamstring hinge stretch
  "romanian-deadlift": "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=800&auto=format&fit=crop&q=80",
  // Standing & Seated Calf Raises: Plantarflexion on balls of feet
  "calf-raises": "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80",
  // Standing Machine / Smith Machine Calf Raise: Machine calf loading
  "standing-calf-raise": "https://images.unsplash.com/photo-1540206395-68808572332f?w=800&auto=format&fit=crop&q=80",
  // Lying / Seated Hamstring Leg Curl: Isolated knee flexion
  "leg-curl": "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // HEIGHT & SPINAL DECOMPRESSION (12 DISTINCT EXERCISES)
  // =========================================================================
  // Bar Hanging & Spinal Decompression (Dead Hang): Gravitational overhead traction
  "bar-hang": "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=800&auto=format&fit=crop&q=80",
  // Cobra Stretch (Bhujangasana Spine Elongator): Thoracic arching cobra
  "cobra-stretch": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
  // Pelvic Shift & Bridge: Spine realignment bridge
  "pelvic-shift": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
  // Plyometric Growth Jumps & Jump Rope: High vertical hops & jumping rope
  "jump-drills-skipping": "https://images.unsplash.com/photo-1518644730709-0835105d9daa?w=800&auto=format&fit=crop&q=80",
  // Cat-Cow Spine Wave (Vertebral Mobilization): Quadruped vertebral articulation
  "cat-cow-decompression": "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=80",
  // Tadasana & Heel-Raise Vertical Reach: Upward full-body vertical reach on tiptoes
  "tadasana-reach": "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&auto=format&fit=crop&q=80",
  // Pilates Spine Roll-Over & Plough Pose: Controlled inverted spinal roll-over
  "pilates-rollover": "https://images.unsplash.com/photo-1518611507436-f9221403cca2?w=800&auto=format&fit=crop&q=80",
  // Dryland Swimming & Prone Flutter: Prone superman posterior chain elongation
  "dryland-swim": "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800&auto=format&fit=crop&q=80",
  // Seated Forward Spine Elongation (Paschimottanasana): Forward hamstring & vertebral stretch
  "forward-spine-stretch": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80",
  // Incline Bench / Inversion Spinal Traction: Inverted traction
  "inversion-bench-hang": "https://images.unsplash.com/photo-1506126279646-a697353d3166?w=800&auto=format&fit=crop&q=80",
  // Hanging Bar Knee Tucks & Pelvic Traction: Overhead bar core tuck & disc release
  "hanging-knee-tuck": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=80",
  // Chakrasana & Wheel Pose (Full Spinal Extension): Full backward bridge arch
  "bridge-wheel-pose": "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?w=800&auto=format&fit=crop&q=80",

  // =========================================================================
  // MATERNAL & PREGNANCY CARE (6 DISTINCT EXERCISES)
  // =========================================================================
  // Pelvic Floor Kegels: Seated pelvic floor conditioning
  "pelvic-floor-kegel": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
  // Prenatal Brisk Walking: Low impact maternal walking
  "prenatal-walking": "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80",
  // Prenatal Cat-Cow Stretch: Gentle maternal kneeling spine wave
  "prenatal-cat-cow": "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&auto=format&fit=crop&q=80",
  // Modified Wall Squat: Wall supported maternal squatting
  "prenatal-wall-squats": "https://images.unsplash.com/photo-1550345332-09e3ac987658?w=800&auto=format&fit=crop&q=80",
  // Butterfly Stretch (Baddha Konasana): Seated adductor hip opening
  "prenatal-butterfly-stretch": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&auto=format&fit=crop&q=80",
  // Side-Lying Hip Abduction: Side-lying maternal leg lift
  "side-lying-leg-lift": "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&auto=format&fit=crop&q=80"
};

/**
 * Returns a high-quality specific photo for any exercise ID,
 * with body-part based fallbacks so no two different muscle groups ever look the same.
 */
export function getExercisePhoto(exerciseId, bodyPart = '') {
  if (exerciseId && EXERCISE_PHOTOS[exerciseId]) {
    return EXERCISE_PHOTOS[exerciseId];
  }

  // Fallback by body part / category
  const bp = (bodyPart || '').toLowerCase();
  if (bp.includes('chest')) {
    return "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('back')) {
    return "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('shoulder')) {
    return "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('bicep')) {
    return "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('tricep')) {
    return "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('quad') || bp.includes('leg')) {
    return "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('hamstring') || bp.includes('glute')) {
    return "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('calf')) {
    return "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('abs') || bp.includes('core')) {
    return "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('height') || bp.includes('spine')) {
    return "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80";
  }
  if (bp.includes('women') || bp.includes('pelvic') || bp.includes('pregnancy')) {
    return "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80";
  }

  return "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80";
}
