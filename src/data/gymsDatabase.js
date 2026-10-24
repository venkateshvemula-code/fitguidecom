/**
 * Comprehensive Indian & Global Gym Database by Pincode, District, City & Area
 * Supports instant search by:
 * - 6-Digit PIN Code (e.g. 530012, 530016, 530026, 500081, 560034, 400050, 110001)
 * - District Name (e.g. Visakhapatnam, Hyderabad, Bangalore, Guntur, Vijayawada, Pune)
 * - Local Area (e.g. Sheelanagar, Gajuwaka, Dwarakanagar, MVP Colony, Jubilee Hills, Koramangala)
 */

export const EXTENDED_GYMS_DATABASE = [
  // =========================================================================
  // VISAKHAPATNAM DISTRICT (AP)
  // =========================================================================
  {
    id: "gym-u-fit-sheelanagar",
    name: "U Fit Fitness Studio & Gym",
    pincode: "530012",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "Sheelanagar / NH16 Junction",
    address: "Beside NH16 Highway, Near Sheela Nagar Junction, Sheelanagar, Visakhapatnam, AP 530012",
    rating: 4.9,
    timing: "5:00 AM - 10:30 PM",
    phone: "+91 90144 30474",
    amenities: ["Heavy Dumbbells up to 50kg", "Power Racks", "Olympic Barbell Bench", "Cardio Zone", "CrossFit Rig", "Personal Training", "AC"],
    highlight: "Premier modern fitness hub in Sheela Nagar featuring elite strength equipment and transformation coaching."
  },
  {
    id: "gym-pulse-sheelanagar",
    name: "Pulse Fitness & CrossFit Hub",
    pincode: "530012",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "Sheelanagar / BHPV Road",
    address: "BHPV Main Road, Near Sheela Nagar, Visakhapatnam, AP 530012",
    rating: 4.8,
    timing: "5:30 AM - 10:00 PM",
    phone: "+91 90144 30474",
    amenities: ["Strength Training", "Treadmills & Spin Bikes", "Certified Trainers", "Weight Management", "AC"],
    highlight: "Equipped with professional biomechanical resistance units and dedicated fat-loss coaching."
  },
  {
    id: "gym-steel-plant",
    name: "Steel Plant Fitness Center & Gym",
    pincode: "530032",
    district: "Visakhapatnam",
    city: "Gajuwaka",
    area: "Ukkunagaram (Steel Plant Township)",
    address: "Sector 6 Club House, Ukkunagaram, Visakhapatnam Steel Plant, AP 530032",
    rating: 4.9,
    timing: "5:00 AM - 10:00 PM",
    phone: "+91 891 251 8200",
    amenities: ["Olympic Sized Gym Floor", "Powerlifting Platforms", "Cardio Deck", "Locker Rooms", "Sports Complex"],
    highlight: "Sprawling multi-acre fitness facility catering to athletes and strength lifters."
  },
  {
    id: "gym-cult-gajuwaka",
    name: "Cult.fit Strength Center",
    pincode: "530026",
    district: "Visakhapatnam",
    city: "Gajuwaka",
    area: "Main Road, Gajuwaka",
    address: "Opp. CMR Shopping Mall, Main Road, Gajuwaka, Visakhapatnam, AP 530026",
    rating: 4.8,
    timing: "5:30 AM - 10:30 PM",
    phone: "+91 80 4718 2000",
    amenities: ["Functional Training", "HRX Conditioning", "Group Workouts", "Shower & Lockers", "Air Conditioned"],
    highlight: "Structured daily workouts, athlete coaching, and vibrant community-driven fitness."
  },
  {
    id: "gym-iron-paradise",
    name: "Iron Paradise Hardcore Fitness",
    pincode: "530026",
    district: "Visakhapatnam",
    city: "Gajuwaka",
    area: "Old Gajuwaka Junction",
    address: "Beside High School Road, Old Gajuwaka, Visakhapatnam, AP 530026",
    rating: 4.9,
    timing: "5:00 AM - 11:00 PM",
    phone: "+91 98481 23456",
    amenities: ["Heavy Iron Dumbbells up to 60kg", "Squat Racks", "Deadlift Platforms", "Preacher Benches", "Bodybuilding Posing Room"],
    highlight: "Hardcore bodybuilding and powerlifting temple with dedicated state medalists as trainers."
  },
  {
    id: "gym-talwalkars-kurmannapalem",
    name: "Talwalkars Premium Fitness Club",
    pincode: "530046",
    district: "Visakhapatnam",
    city: "Gajuwaka",
    area: "Kurmannapalem Junction",
    address: "Near Kurmannapalem Arch, NH16, Visakhapatnam, AP 530046",
    rating: 4.7,
    timing: "5:30 AM - 10:00 PM",
    phone: "+91 891 270 5544",
    amenities: ["Imported Strength Machines", "Aerobics & Zumba", "Steam Bath", "Dietician Counseling"],
    highlight: "Reputed pan-India chain offering personalized health diagnostics and luxury workout zones."
  },
  {
    id: "gym-golds-siripuram",
    name: "Gold's Gym Siripuram",
    pincode: "530003",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "Siripuram / VIP Road",
    address: "Dutt Island Complex, Siripuram Main Road, Visakhapatnam, AP 530003",
    rating: 4.8,
    timing: "5:30 AM - 10:30 PM",
    phone: "+91 891 275 1122",
    amenities: ["International Technogym Equipment", "Spinning Studio", "Kettlebell Zone", "Physiotherapy Support"],
    highlight: "Flagship luxury fitness club in the heart of Vizag with world-class facilities."
  },
  {
    id: "gym-fitrepublic-mvp",
    name: "FitRepublic Gym & Wellness Hub",
    pincode: "530017",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "MVP Colony Sector 3",
    address: "Sector 3, Beside AS Raja Grounds, MVP Colony, Visakhapatnam, AP 530017",
    rating: 4.9,
    timing: "5:00 AM - 10:30 PM",
    phone: "+91 891 254 9988",
    amenities: ["Calisthenics Rig", "CrossFit Arena", "HIIT Turf", "Sauna & Ice Bath", "Nutritional Cafe"],
    highlight: "Top-tier functional and athletic training arena popular among fitness enthusiasts."
  },
  {
    id: "gym-powerhouse-autonagar",
    name: "Powerhouse Gym & Fitness",
    pincode: "530012",
    district: "Visakhapatnam",
    city: "Gajuwaka",
    area: "Auto Nagar / Gajuwaka",
    address: "Industrial Estate Road, Auto Nagar, Gajuwaka, Visakhapatnam, AP 530012",
    rating: 4.8,
    timing: "5:00 AM - 10:00 PM",
    phone: "+91 97033 11223",
    amenities: ["Cardio Floor", "Free Weights", "Core Conditioning", "Weight Loss Programs"],
    highlight: "Spacious multi-floor gym with tailored muscle building and endurance training."
  },
  {
    id: "gym-fitnessone-dwaraka",
    name: "Fitness One & Propel Fitness",
    pincode: "530016",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "Dwaraka Nagar 2nd Lane",
    address: "Near Diamond Park, 2nd Lane Dwaraka Nagar, Visakhapatnam, AP 530016",
    rating: 4.7,
    timing: "5:30 AM - 10:00 PM",
    phone: "+91 891 271 3344",
    amenities: ["Biomechanical Selectorized Units", "Aerobic Flooring", "Body Composition Analyzer", "Steam"],
    highlight: "Centrally located wellness and resistance training club in Dwaraka Nagar."
  },
  {
    id: "gym-ollf-madhavadhara",
    name: "OLLF Fitness & CrossGym",
    pincode: "530007",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "Madhavadhara / VUDA Layout",
    address: "VUDA Layout Main Road, Madhavadhara, Visakhapatnam, AP 530007",
    rating: 4.8,
    timing: "5:00 AM - 10:00 PM",
    phone: "+91 891 255 4433",
    amenities: ["Heavy Barbells", "CrossFit Cages", "Sprint Tracks", "AC Studio"],
    highlight: "Neighborhood favorite for strength conditioning and weight transformation."
  },
  {
    id: "gym-fit-madhurawada",
    name: "Fit & Gym Strength Arena",
    pincode: "530041",
    district: "Visakhapatnam",
    city: "Visakhapatnam",
    area: "Madhurawada / PM Palem",
    address: "Pothinamallayya Palem Road, Swatantra Nagar, Madhurawada, Visakhapatnam, AP 530041",
    rating: 4.8,
    timing: "5:00 AM - 10:30 PM",
    phone: "+91 98490 55667",
    amenities: ["Free Weight Station", "CrossFit", "Cardio Zone", "Personal Trainer"],
    highlight: "Modern high-energy gym serving IT SEZ and Madhurawada residents."
  },

  // =========================================================================
  // HYDERABAD DISTRICT (TELANGANA)
  // =========================================================================
  {
    id: "gym-cult-jubilee",
    name: "Cult.fit Elite Fitness Studio",
    pincode: "500033",
    district: "Hyderabad",
    city: "Hyderabad",
    area: "Road No 36, Jubilee Hills",
    address: "Plot 240, Road No 36, Jubilee Hills, Hyderabad, Telangana 500033",
    rating: 4.9,
    timing: "5:00 AM - 11:00 PM",
    phone: "+91 80 4718 2000",
    amenities: ["Boxing Arena", "Olympic Barbell Stations", "CrossFit Rigs", "Yoga Studio", "Nutrition Cafe"],
    highlight: "Hyderabad's premier athlete training facility with expert strength and conditioning coaches."
  },
  {
    id: "gym-nitrro-madhapur",
    name: "Nitrro Wellness & Hardcore Gym",
    pincode: "500081",
    district: "Hyderabad",
    city: "Hyderabad",
    area: "Madhapur (Near Cyber Towers)",
    address: "Hitech City Main Road, Cyberabad, Madhapur, Hyderabad, Telangana 500081",
    rating: 4.9,
    timing: "5:30 AM - 11:30 PM",
    phone: "+91 91000 88888",
    amenities: ["Eleiko Competition Plates", "Cryotherapy", "Cardio Cinema", "Dumbbells up to 70kg", "Spa"],
    highlight: "Ultra-luxury international standard bodybuilding and fitness sanctuary."
  },
  {
    id: "gym-anytime-gachibowli",
    name: "Anytime Fitness 24/7 Gachibowli",
    pincode: "500032",
    district: "Hyderabad",
    city: "Hyderabad",
    area: "Gachibowli / Financial District",
    address: "Opp. DLF Cyber City, Gachibowli, Hyderabad, Telangana 500032",
    rating: 4.8,
    timing: "Open 24 Hours (24/7)",
    phone: "+91 40 4011 2233",
    amenities: ["24/7 Keycard Access", "Precor Cardio", "Free Weights Zone", "Functional Turf"],
    highlight: "Round-the-clock modern fitness club catering to IT professionals and late-night lifters."
  },
  {
    id: "gym-iron-man-banjara",
    name: "Iron Man Strength & Conditioning",
    pincode: "500034",
    district: "Hyderabad",
    city: "Hyderabad",
    area: "Banjara Hills Road No 12",
    address: "Road No 12, Banjara Hills, Hyderabad, Telangana 500034",
    rating: 4.8,
    timing: "5:00 AM - 10:30 PM",
    phone: "+91 98490 11223",
    amenities: ["Power Racks", "Deadlift Jack & Platforms", "Heavy Dumbbells", "Sports Nutrition"],
    highlight: "Focused strength and body transformation gym with custom powerlifting setups."
  },

  // =========================================================================
  // BANGALORE DISTRICT (KARNATAKA)
  // =========================================================================
  {
    id: "gym-volt-indiranagar",
    name: "Volt Energy Club & Fitness",
    pincode: "560038",
    district: "Bangalore",
    city: "Bangalore",
    area: "100ft Road, Indiranagar",
    address: "100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    rating: 4.9,
    timing: "5:30 AM - 11:00 PM",
    phone: "+91 80 4123 4567",
    amenities: ["Eleiko Power Platforms", "HIIT Turf Track", "Technogym Pure Strength", "Smoothie Bar"],
    highlight: "Bangalore's flagship athletic gym known for biomechanical perfection and energy."
  },
  {
    id: "gym-cult-koramangala",
    name: "Cult.fit Flagship Koramangala",
    pincode: "560034",
    district: "Bangalore",
    city: "Bangalore",
    area: "Koramangala 4th Block",
    address: "80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    rating: 4.8,
    timing: "5:00 AM - 10:30 PM",
    phone: "+91 80 4718 2000",
    amenities: ["HRX Workout", "CrossFit Cage", "Prowler Sleds", "Certified Strength Coaches"],
    highlight: "Vibrant high-cadence functional training hub in central Koramangala."
  },
  {
    id: "gym-chisel-whitefield",
    name: "Chisel Fitness (Virat Kohli's Brand)",
    pincode: "560066",
    district: "Bangalore",
    city: "Bangalore",
    area: "ITPL Main Road, Whitefield",
    address: "Near Hope Farm Junction, Whitefield, Bengaluru, Karnataka 560066",
    rating: 4.7,
    timing: "5:30 AM - 10:00 PM",
    phone: "+91 80 4955 6677",
    amenities: ["Functional Training Arena", "CrossFit", "Heavy Barbells", "Steam Room"],
    highlight: "Athlete-designed training regimen focusing on agility, core strength, and stamina."
  },

  // =========================================================================
  // MUMBAI & DELHI DISTRICTS
  // =========================================================================
  {
    id: "gym-golds-bandra",
    name: "Gold's Gym Bandra West",
    pincode: "400050",
    district: "Mumbai",
    city: "Mumbai",
    area: "Bandra West / Linking Road",
    address: "Near National College, Linking Road, Bandra West, Mumbai, MH 400050",
    rating: 4.9,
    timing: "6:00 AM - 11:30 PM",
    phone: "+91 22 6699 9999",
    amenities: ["Celebrity Trainers", "Hammer Strength Plate Loaded", "Dumbbells up to 60kg", "Sauna"],
    highlight: "Iconic hub of Bollywood and competitive bodybuilding in Mumbai."
  },
  {
    id: "gym-anytime-delhi-cp",
    name: "Anytime Fitness Connaught Place",
    pincode: "110001",
    district: "Central Delhi",
    city: "New Delhi",
    area: "Connaught Place / Barakhamba",
    address: "Statesman House, Barakhamba Road, Connaught Place, New Delhi 110001",
    rating: 4.8,
    timing: "Open 24 Hours (24/7)",
    phone: "+91 11 4100 5555",
    amenities: ["24/7 Global Access", "Olympic Lifting", "Matrix Cardio", "Personal Lockers"],
    highlight: "State of the art 24/7 facility in central Delhi."
  },

  // =========================================================================
  // GLOBAL CITIES (WORLDWIDE MECCAS)
  // =========================================================================
  {
    id: "gym-golds-venice",
    name: "Gold's Gym Venice (The Mecca of Bodybuilding)",
    pincode: "90291",
    district: "Los Angeles County",
    city: "Los Angeles",
    area: "Venice Beach, California, USA",
    address: "360 Hampton Dr, Venice, CA 90291, United States",
    rating: 4.9,
    timing: "5:00 AM - 11:00 PM",
    phone: "+1 310-392-6004",
    amenities: ["Iconic Outdoor Pit", "Dumbbells up to 200lbs", "Posing Stage", "Arnold's Historic Training Spot"],
    highlight: "The world's most famous gym and birthplace of modern bodybuilding culture."
  },
  {
    id: "gym-puregym-london",
    name: "PureGym Piccadilly Central",
    pincode: "W1D 7DH",
    district: "Westminster",
    city: "London",
    area: "Piccadilly Circus, London, UK",
    address: "Shaftesbury Ave, Piccadilly, London W1D 7DH, United Kingdom",
    rating: 4.8,
    timing: "Open 24 Hours (24/7)",
    phone: "+44 345 013 3499",
    amenities: ["220+ Gym Stations", "Olympic Lifting Platforms", "Sprint Tracks", "Air Conditioned"],
    highlight: "Central London's premier 24/7 strength and functional fitness warehouse."
  },
  {
    id: "gym-fitnessfirst-dubai",
    name: "Fitness First Platinum Downtown",
    pincode: "00000",
    district: "Dubai",
    city: "Dubai",
    area: "Downtown Dubai / Burj Khalifa View",
    address: "Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, UAE",
    rating: 4.9,
    timing: "5:30 AM - 11:00 PM",
    phone: "+971 4 330 0000",
    amenities: ["Technogym BioStrength", "Infinity Lap Pool", "Skyline Deck", "Hydrotherapy"],
    highlight: "Ultra-luxury high performance fitness club overlooking the iconic Burj Khalifa."
  }
];
