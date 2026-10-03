/**
 * FitGuide Food Photos Map
 * High-resolution matching food photos for all 22 nutritional staples in FitGuide.
 */
export const FOOD_PHOTOS = {
  // Paneer (Cottage Cheese)
  'paneer': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80',
  // Soya Chunks / Meal Maker
  'soya-chunks': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&auto=format&fit=crop&q=80',
  // Yellow Moong Dal (Cooked)
  'dal-yellow-moong': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&auto=format&fit=crop&q=80',
  // Chickpeas / Kabuli Chana
  'chickpeas-chana': 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=700&auto=format&fit=crop&q=80',
  // Rajma (Red Kidney Beans)
  'rajma': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=700&auto=format&fit=crop&q=80',
  // Eggs (2 Whole Boiled)
  'eggs-whole': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=700&auto=format&fit=crop&q=80',
  // Egg Whites (Cooked)
  'egg-whites': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=700&auto=format&fit=crop&q=80',
  // Chicken Breast (Boneless Grilled)
  'chicken-breast': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=700&auto=format&fit=crop&q=80',
  // Fish (Rohu / Salmon)
  'fish-salmon-rohu': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=700&auto=format&fit=crop&q=80',
  // Curd / Dahi
  'curd-dahi': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&auto=format&fit=crop&q=80',
  // Cow Milk (Toned)
  'milk-cow': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=700&auto=format&fit=crop&q=80',
  // Spinach / Palak
  'spinach-palak': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=700&auto=format&fit=crop&q=80',
  // Ragi (Finger Millet)
  'ragi-finger-millet': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=700&auto=format&fit=crop&q=80',
  // Roasted Peanuts (Moongphali)
  'peanuts': 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=700&auto=format&fit=crop&q=80',
  // Almonds (Badaam)
  'almonds': 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=700&auto=format&fit=crop&q=80',
  // Sesame Seeds (Til)
  'sesame-seeds-til': 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?w=700&auto=format&fit=crop&q=80',
  // Banana
  'banana': 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&auto=format&fit=crop&q=80',
  // Rolled Oats
  'rolled-oats': 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=700&auto=format&fit=crop&q=80',
  // Sweet Potato (Boiled/Baked)
  'sweet-potato': 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=700&auto=format&fit=crop&q=80',
  // Sprouted Moong Salad
  'sprouted-moong': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&auto=format&fit=crop&q=80',
  // Amla (Indian Gooseberry)
  'amla-gooseberry': 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=700&auto=format&fit=crop&q=80',
  // Organic Firm Tofu
  'tofu-firm': 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=700&auto=format&fit=crop&q=80'
};

export function getFoodPhoto(foodId, category = '') {
  if (foodId && FOOD_PHOTOS[foodId]) {
    return FOOD_PHOTOS[foodId];
  }
  return "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=700&auto=format&fit=crop&q=80";
}
