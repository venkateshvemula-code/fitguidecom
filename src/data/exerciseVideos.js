/**
 * FitGuide Exercise Video Animations Engine
 * Maps every exercise to smooth looping animated video demonstrations (MP4/WebM)
 * and interactive 2D anatomical kinetic SVG animations that demonstrate the primary
 * contraction and eccentric return phases.
 */

export const EXERCISE_VIDEOS = {
  // Chest
  "push-ups": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-push-ups-in-a-gym-41559-large.mp4",
    poster: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=800&auto=format&fit=crop&q=80",
    animType: "push_up",
    primaryAction: "Horizontal adduction & elbow extension"
  },
  "bench-press": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-bench-presses-with-dumbbells-41570-large.mp4",
    poster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    animType: "bench_press",
    primaryAction: "Pectoral compression & tricep lockout"
  },
  "cable-chest-fly": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-training-arms-and-chest-with-pulleys-41566-large.mp4",
    poster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    animType: "cable_fly",
    primaryAction: "Sternal pectoralis major adduction"
  },
  "incline-dumbbell-press": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-bench-presses-with-dumbbells-41570-large.mp4",
    poster: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=800&auto=format&fit=crop&q=80",
    animType: "incline_press",
    primaryAction: "Clavicular upper chest press"
  },

  // Legs & Quadriceps
  "squats": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-41551-large.mp4",
    poster: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
    animType: "squat",
    primaryAction: "Hip hinge & bilateral knee flexion"
  },
  "lunges": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fitness-woman-doing-lunges-at-the-gym-41553-large.mp4",
    poster: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop&q=80",
    animType: "lunge",
    primaryAction: "Unilateral knee drive & pelvic stabilization"
  },
  "leg-press": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-41551-large.mp4",
    poster: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&auto=format&fit=crop&q=80",
    animType: "leg_press",
    primaryAction: "Quad extension without spinal load"
  },
  "leg-curl": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-41551-large.mp4",
    poster: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=800&auto=format&fit=crop&q=80",
    animType: "hamstring_curl",
    primaryAction: "Isolated knee flexion & hamstring peak"
  },

  // Back & Lats
  "pull-ups": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-pull-ups-at-a-gym-41560-large.mp4",
    poster: "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&auto=format&fit=crop&q=80",
    animType: "pull_up",
    primaryAction: "Overhead vertical pulling & lat retraction"
  },
  "deadlift": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-crossfit-exercises-with-weights-41564-large.mp4",
    poster: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&auto=format&fit=crop&q=80",
    animType: "deadlift",
    primaryAction: "Posterior chain hip hinge & drive"
  },
  "barbell-rows": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-crossfit-exercises-with-weights-41564-large.mp4",
    poster: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=800&auto=format&fit=crop&q=80",
    animType: "row",
    primaryAction: "Horizontal scapular retraction"
  },
  "lat-pulldown": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-pull-ups-at-a-gym-41560-large.mp4",
    poster: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80",
    animType: "lat_pulldown",
    primaryAction: "Coronal plane latissimus pull"
  },
  "seated-cable-row": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-training-arms-and-chest-with-pulleys-41566-large.mp4",
    poster: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&auto=format&fit=crop&q=80",
    animType: "seated_row",
    primaryAction: "Rhomboid and mid-trap adduction"
  },

  // Abs & Core
  "plank": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1566241134883-13eb2393a3cc?w=800&auto=format&fit=crop&q=80",
    animType: "plank",
    primaryAction: "Isometric anti-extension core brace"
  },
  "russian-twists": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
    animType: "russian_twist",
    primaryAction: "Transverse plane oblique rotation"
  },

  // Shoulders & Arms
  "shoulder-press": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-41557-large.mp4",
    poster: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
    animType: "overhead_press",
    primaryAction: "Deltoid vertical pressing"
  },
  "bicep-curls": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-41557-large.mp4",
    poster: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
    animType: "bicep_curl",
    primaryAction: "Elbow flexion and forearm supination"
  },
  "preacher-curl": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-41557-large.mp4",
    poster: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800&auto=format&fit=crop&q=80",
    animType: "preacher_curl",
    primaryAction: "Strict bicep peak isolation"
  },
  "tricep-dips": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-push-ups-in-a-gym-41559-large.mp4",
    poster: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    animType: "dip",
    primaryAction: "Triceps lockout & anterior chest dip"
  },
  "tricep-pushdown": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-man-training-arms-and-chest-with-pulleys-41566-large.mp4",
    poster: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&auto=format&fit=crop&q=80",
    animType: "pushdown",
    primaryAction: "Tricep lateral head extension"
  },
  "lateral-raises": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-41557-large.mp4",
    poster: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
    animType: "lateral_raise",
    primaryAction: "Lateral deltoid abduction"
  },
  "dumbbell-lateral-raise": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-dumbbells-in-a-gym-41557-large.mp4",
    poster: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=800&auto=format&fit=crop&q=80",
    animType: "lateral_raise",
    primaryAction: "Scapular plane lateral raise"
  },

  // Glutes, Hamstrings & Calves
  "glute-bridges": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
    animType: "glute_bridge",
    primaryAction: "Posterior pelvic tilt and glute lockout"
  },
  "romanian-deadlift": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-crossfit-exercises-with-weights-41564-large.mp4",
    poster: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&auto=format&fit=crop&q=80",
    animType: "rdl",
    primaryAction: "Hamstring stretch & hip hinge"
  },
  "calf-raises": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fitness-woman-doing-lunges-at-the-gym-41553-large.mp4",
    poster: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80",
    animType: "calf_raise",
    primaryAction: "Plantarflexion & ankle stability"
  },
  "standing-calf-raise": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fitness-woman-doing-lunges-at-the-gym-41553-large.mp4",
    poster: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80",
    animType: "calf_raise",
    primaryAction: "Gastrocnemius diamond stretch & lift"
  },

  // Height & Spine Kinesiology
  "bar-hang": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-pull-ups-at-a-gym-41560-large.mp4",
    poster: "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&auto=format&fit=crop&q=80",
    animType: "spine_hang",
    primaryAction: "Gravitational disc space expansion"
  },
  "cobra-stretch": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    animType: "cobra",
    primaryAction: "Thoracic spine extension & disc hydration"
  },
  "pelvic-shift": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    animType: "pelvic_shift",
    primaryAction: "Anterior pelvic tilt reversal"
  },
  "jump-drills-skipping": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fitness-woman-doing-lunges-at-the-gym-41553-large.mp4",
    poster: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=800&auto=format&fit=crop&q=80",
    animType: "jump_skipping",
    primaryAction: "Impact long bone osteogenesis & HGH release"
  },
  "cat-cow-decompression": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&auto=format&fit=crop&q=80",
    animType: "cat_cow",
    primaryAction: "Segmental vertebral articulation"
  },
  "tadasana-reach": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-41551-large.mp4",
    poster: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    animType: "tadasana",
    primaryAction: "Total kinetic axial reach & stretch"
  },
  "pilates-rollover": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    animType: "rollover",
    primaryAction: "Posterior thoracolumbar decompression"
  },
  "dryland-swim": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    animType: "superman_swim",
    primaryAction: "Multifidus & erector spinae endurance"
  },
  "forward-spine-stretch": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    animType: "forward_fold",
    primaryAction: "Pelvic hip hinge & spinal traction"
  },
  "inversion-bench-hang": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-pull-ups-at-a-gym-41560-large.mp4",
    poster: "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&auto=format&fit=crop&q=80",
    animType: "inversion",
    primaryAction: "Inverted gravity spinal decompression"
  },
  "hanging-knee-tuck": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-training-with-pull-ups-at-a-gym-41560-large.mp4",
    poster: "https://images.unsplash.com/photo-1598266663439-2056e6900339?w=800&auto=format&fit=crop&q=80",
    animType: "knee_tuck",
    primaryAction: "Pelvic curl and lower abdominal contraction"
  },
  "bridge-wheel-pose": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
    animType: "wheel_pose",
    primaryAction: "Full anterior myofascial stretch"
  },

  // Pregnancy & Maternal
  "pelvic-floor-kegel": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    animType: "kegel",
    primaryAction: "Pelvic sling tone & bladder support"
  },
  "prenatal-walking": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fitness-woman-doing-lunges-at-the-gym-41553-large.mp4",
    poster: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80",
    animType: "prenatal_walk",
    primaryAction: "Gentle cardiovascular fetal oxygenation"
  },
  "prenatal-cat-cow": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=800&auto=format&fit=crop&q=80",
    animType: "cat_cow",
    primaryAction: "Maternal spinal & uterine relief"
  },
  "prenatal-wall-squats": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-squats-in-a-gym-41551-large.mp4",
    poster: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80",
    animType: "wall_squat",
    primaryAction: "Pelvic opening & gestational endurance"
  },
  "prenatal-butterfly-stretch": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-woman-doing-a-plank-in-a-gym-41552-large.mp4",
    poster: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80",
    animType: "butterfly",
    primaryAction: "Adductor & pelvic outlet dilation"
  },
  "side-lying-leg-lift": {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-fitness-woman-doing-lunges-at-the-gym-41553-large.mp4",
    poster: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    animType: "side_leg_lift",
    primaryAction: "Gluteus medius pelvic stabilization"
  }
};

/**
 * Returns the exact video object for an exercise ID with dynamic fallback
 */
export function getExerciseVideo(exerciseId) {
  if (exerciseId && EXERCISE_VIDEOS[exerciseId]) {
    return EXERCISE_VIDEOS[exerciseId];
  }
  // Default generic high-intensity bodyweight / gym video
  return {
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-doing-push-ups-in-a-gym-41559-large.mp4",
    poster: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
    animType: "general",
    primaryAction: "Full Kinetic Motion"
  };
}
