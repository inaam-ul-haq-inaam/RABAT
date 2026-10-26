/**
 * Rabat Banquet Hall — Royal Banquet Menus & Culinary Catalog
 * Curated by Time & Taste Catering (30+ Years Heritage in Lahore Cantt)
 *
 * Official Data Transcribed Directly From Printed Banquet Brochure:
 *   1. ONE DISH MENU (Menu 1 to Menu 7)
 *   2. DESSERTS (10 Official Items)
 *   3. CUSTOM SELECTION (10 Signature Royal Items)
 *   4. ADD ON'S (10 Items: Soups, Breads, Teas, Stations, Drinks)
 *   5. SALADS (7 Official Salads)
 *   6. CHARCOAL (9 Live Wood-Coal BBQ & Roast Specialties)
 *   7. SEA FOOD (5 Fresh Fish & Prawn Specialties)
 *   8. CONTINENTAL (7 Steaks, Asian Woks & Rice Specialties)
 */

export const MENU_CATEGORIES = [
  { id: 'packages', num: '01', label: 'One Dish Menus (M1-M7)', icon: '👑', short: 'One Dish M1-M7', count: '7 Packages', tag: 'Hall 16 Banquet Standard' },
  { id: 'desserts', num: '02', label: 'Royal Desserts', icon: '🍨', short: 'Desserts', count: '10 Items', tag: 'Included with M1-M7' },
  { id: 'custom-selection', num: '03', label: 'Custom Selection', icon: '💎', short: 'Custom Dishes', count: '10 Dishes', tag: 'Chef Royal Specialties' },
  { id: 'addons', num: '04', label: "Add-On's & Stations", icon: '✨', short: "Add-On's", count: '10 Items', tag: 'Live Counters & Drinks' },
  { id: 'salads', num: '05', label: 'Gourmet Salads', icon: '🥗', short: 'Salads', count: '7 Varieties', tag: 'Salad Bar Selection' },
  { id: 'charcoal', num: '06', label: 'Charcoal BBQ & Roasts', icon: '🔥', short: 'Charcoal BBQ', count: '9 Specialties', tag: 'Wood-Coal Flame Grills' },
  { id: 'seafoods', num: '07', label: 'Fresh Sea Food', icon: '🦐', short: 'Sea Food', count: '5 Specialties', tag: 'Lahori Fish & Prawns' },
  { id: 'continental', num: '08', label: 'Continental & Chinese', icon: '🍝', short: 'Continental', count: '7 Dishes', tag: 'Steaks & Wok Rice' },
  { id: 'custom', num: '09', label: 'Build Custom Menu', icon: '✍️', short: 'Custom Build', count: 'Multi-Select', tag: 'Interactive Menu Builder' },
];

/* ── 1. ONE DISH MENUS (M1 to M7) ── */
export const MENU_PACKAGES = [
  {
    id: 'm1',
    code: 'Menu 1',
    name: 'Menu 1',
    category: 'ONE DISH MENU',
    tag: 'Chicken Afghani Pulao OR Chicken Sindhi Biryani & Mutton Qorma',
    highlight: 'Classic royal wedding combination pairing choice of aromatic Chicken Afghani Pulao or spicy Chicken Sindhi Biryani with slow-simmered rich Mutton Qorma.',
    suitableFor: 'Barat, Grand Receptions & VIP Dinners',
    courses: [
      {
        label: 'Rice Specialty',
        icon: '🍚',
        hasChoice: true,
        options: ['Chicken Afghani Pulao', 'Chicken Sindhi Biryani'],
      },
      {
        label: 'Meat Course',
        icon: '🥘',
        hasChoice: false,
        options: ['Mutton Qorma'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
  {
    id: 'm2',
    code: 'Menu 2',
    name: 'Menu 2',
    category: 'ONE DISH MENU',
    tag: 'Chicken Zafrani Biryani OR Chicken Amartsari Pulao & Mutton Kunna',
    highlight: 'Authentic clay-pot cooked Mutton Kunna slow-simmered to tender perfection, served with choice of Chicken Zafrani Biryani or Chicken Amartsari Pulao.',
    suitableFor: 'Walima, Receptions & Family Celebrations',
    courses: [
      {
        label: 'Rice Specialty',
        icon: '🍚',
        hasChoice: true,
        options: ['Chicken Zafrani Biryani', 'Chicken Amartsari Pulao'],
      },
      {
        label: 'Meat Course',
        icon: '🥘',
        hasChoice: false,
        options: ['Mutton Kunna'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
  {
    id: 'm3',
    code: 'Menu 3',
    name: 'Menu 3',
    category: 'ONE DISH MENU',
    tag: 'Mutton Biryani OR Mutton Pulao & Chicken Qorma OR Chicken Karahi',
    highlight: 'Dual-choice banquet favorite featuring tender Mutton Biryani or Mutton Pulao alongside Chicken Qorma or high-flame Chicken Karahi.',
    suitableFor: 'Traditional Weddings, Walima & Nikkah Dinners',
    courses: [
      {
        label: 'Rice Specialty',
        icon: '🍚',
        hasChoice: true,
        options: ['Mutton Biryani', 'Mutton Pulao'],
      },
      {
        label: 'Chicken Course',
        icon: '🍗',
        hasChoice: true,
        options: ['Chicken Qorma', 'Chicken Karahi'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
  {
    id: 'm4',
    code: 'Menu 4',
    name: 'Menu 4',
    category: 'ONE DISH MENU',
    tag: 'Chicken Biryani OR Chicken Pulao & Chicken Qorma OR Chicken Karahi (Achari)',
    highlight: 'Evergreen Lahori wedding banquet with choice of fragrant Chicken Biryani or Chicken Pulao, paired with Chicken Qorma or tangy Chicken Achari Karahi.',
    suitableFor: 'Mehndi, Sangeet & High-Spirited Festive Nights',
    courses: [
      {
        label: 'Rice Specialty',
        icon: '🍚',
        hasChoice: true,
        options: ['Chicken Biryani', 'Chicken Pulao'],
      },
      {
        label: 'Chicken Course',
        icon: '🍗',
        hasChoice: true,
        options: ['Chicken Qorma', 'Chicken Karahi (Achari)'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
  {
    id: 'm5',
    code: 'Menu 5',
    name: 'Menu 5',
    category: 'ONE DISH MENU',
    tag: 'Mutton Biryani OR Mutton Amartsari Pulao & Mutton Qorma',
    highlight: 'Supreme all-mutton grand spread: prime Mutton Biryani or Mutton Amartsari Pulao accompanied by Time & Taste signature Mutton Qorma in rich badami gravy.',
    suitableFor: 'Barat, VIP State Banquets & Elite Receptions',
    courses: [
      {
        label: 'Rice Specialty',
        icon: '🍚',
        hasChoice: true,
        options: ['Mutton Biryani', 'Mutton Amartsari Pulao'],
      },
      {
        label: 'Meat Course',
        icon: '🥘',
        hasChoice: false,
        options: ['Mutton Qorma'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
  {
    id: 'm6',
    code: 'Menu 6',
    name: 'Menu 6',
    category: 'ONE DISH MENU',
    tag: 'Halwa Puri, Channa Aloo Bhaji & Mutton Qeema Chops Taka Tak',
    highlight: 'Celebrated traditional brunch and evening festive banquet with piping hot Halwa Puri, Channa Aloo Bhaji, and live griddle-cooked Mutton Qeema Chops Taka Tak.',
    suitableFor: 'Qawwali Nights, Mehndi, Festive Brunches & Celebrations',
    courses: [
      {
        label: 'Special Delicacy',
        icon: '🥘',
        hasChoice: false,
        options: ['Halwa Puri, Channa Aloo Bhaji'],
      },
      {
        label: 'Live Taka Tak Course',
        icon: '🔥',
        hasChoice: false,
        options: ['Mutton Qeema Chops Taka Tak'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
  {
    id: 'm7',
    code: 'Menu 7',
    name: 'Menu 7',
    category: 'ONE DISH MENU',
    tag: 'Pathora, Channa Achar & Chicken Achari OR Chicken Peshawari Karahi',
    highlight: 'Fluffy golden Pathoras served with spicy Channa Achar, accompanied by high-flame wok Chicken Achari or Chicken Peshawari Karahi.',
    suitableFor: 'Mehndi, Dholki & Festive Family Celebrations',
    courses: [
      {
        label: 'Special Delicacy',
        icon: '🫓',
        hasChoice: false,
        options: ['Pathora, Channa Achar'],
      },
      {
        label: 'Chicken Karahi Course',
        icon: '🥘',
        hasChoice: true,
        options: ['Chicken Achari', 'Chicken Peshawari Karahi'],
      },
      {
        label: 'Tandoor Breads',
        icon: '🫓',
        hasChoice: false,
        options: ['Variety of Tandoori Naan'],
      },
      {
        label: 'Fresh Salad',
        icon: '🥗',
        hasChoice: false,
        options: ['One Salad'],
        note: 'Choice from 7 official gourmet salads',
      },
      {
        label: 'Sauces & Raita',
        icon: '🥣',
        hasChoice: false,
        options: ['Mint Sauce / Zeera Raita'],
      },
      {
        label: 'Royal Dessert',
        icon: '🍨',
        hasChoice: false,
        options: ['One Dessert'],
        note: 'Choice of 10 official royal desserts',
      },
      {
        label: 'Beverages',
        icon: '🥤',
        hasChoice: false,
        options: ['Soft Drink & Mineral Water'],
      },
    ],
  },
];

/* ── 2. DESSERTS (10 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_DESSERTS = [
  {
    id: 1,
    name: 'Seasonal Halwa',
    desc: 'Prepared in pure desi ghee with rich khoya and dry fruits according to season (Gajar Ka Halwa, Sooji Halwa, or Moong Dal Halwa).',
    tag: 'Seasonal Special',
    icon: '🍯',
  },
  {
    id: 2,
    name: 'Gurr Walay Chawal (Khoya)',
    desc: 'Traditional Punjabi golden jaggery rice enriched with pure desi ghee, fennel seeds, and fresh dairy khoya crumble.',
    tag: 'Traditional Khoya',
    icon: '🍚',
  },
  {
    id: 3,
    name: 'Zarda (Khoya)',
    desc: 'Royal aromatic saffron sweet rice garnished with silver vark, roasted almonds, pistachios, candied cherries, and rich khoya.',
    tag: 'Royal Classic',
    icon: '✨',
  },
  {
    id: 4,
    name: 'Hot Gulab Jaman',
    desc: 'Melt-in-mouth soft golden khoya dumplings served piping hot in fragrant cardamom and saffron-infused sugar syrup.',
    tag: 'Warm Delight',
    icon: '🟤',
  },
  {
    id: 5,
    name: 'Fruit Trifle',
    desc: 'Artfully layered banquet dessert featuring delicate sponge cake, fresh seasonal fruits, rich vanilla custard, and whipped cream.',
    tag: 'Chilled Gourmet',
    icon: '🍓',
  },
  {
    id: 6,
    name: 'Qulfa Benazir',
    desc: 'Signature dense royal ice cream prepared from slow-condensed whole milk, pure saffron, and crushed green pistachios.',
    tag: 'House Signature',
    icon: '🍨',
  },
  {
    id: 7,
    name: 'Qulfi Lachay',
    desc: 'Traditional Badami Rabri Kulfi served with silky homemade sweet falooda cornstarch noodles and rose rooh afza drizzle.',
    tag: 'Classic Falooda',
    icon: '🍧',
  },
  {
    id: 8,
    name: 'Ice Cream',
    desc: 'Choice of premium creamy scoops: Rich Vanilla, Belgian Chocolate, Mango Delight, or Strawberry Swirl.',
    tag: 'All-Time Favorite',
    icon: '🍦',
  },
  {
    id: 9,
    name: 'Kheer Badami (Shahi)',
    desc: 'Slow-simmered rich milk and crushed basmati rice kheer crowned with roasted slivered almonds and 24K edible silver leaf.',
    tag: 'Shahi Heritage',
    icon: '🥣',
  },
  {
    id: 10,
    name: 'Firni Zafrani',
    desc: 'Delicate chilled ground rice pudding infused with pure Kashmiri saffron and green cardamom, set in traditional earthen clay pots.',
    tag: 'Clay Pot Special',
    icon: '🏺',
  },
];

/* ── 3. CUSTOM SELECTION (10 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_CUSTOM_SELECTION = [
  {
    name: 'Mutton Kandhari',
    tag: 'Royal Mutton',
    desc: 'Tender baby mutton simmered in rich pomegranate and dry-fruit infused Kandhari gravy with aromatic whole spices.',
    icon: '🍖',
  },
  {
    name: 'Chicken Kandhari',
    tag: 'Signature Chicken',
    desc: 'Chicken cooked with fragrant crushed spices, roasted dry fruits, and traditional Kandhari red masala sauce.',
    icon: '🍗',
  },
  {
    name: 'Shahi Mutton Stew',
    tag: 'Mughlai Specialty',
    desc: 'Traditional royal whole-spice mutton stew slow-cooked with whole red chilies, onions, garlic, and fresh ginger juliennes.',
    icon: '🥘',
  },
  {
    name: 'Rajisthani Qorma',
    tag: 'Spicy Royal Gravy',
    desc: 'Rich aromatic royal qorma prepared with roasted spices, thick yogurt, golden brown fried onions, and pure desi ghee.',
    icon: '🍲',
  },
  {
    name: 'Chicken Kabab Biryani',
    tag: 'Biryani Specialty',
    desc: 'Long-grain aged basmati dum biryani layered with succulent charcoal grilled chicken seekh kababs and fresh mint.',
    icon: '🍚',
  },
  {
    name: 'Chicken Sultani Pulao (Boneless)',
    tag: 'Boneless Pulao',
    desc: 'Delicate yakhni-simmered fragrant pulao prepared with tender boneless chicken cuts, fried onions, and golden almonds.',
    icon: '🍚',
  },
  {
    name: 'Chicken Sultani Biryani ((Boneless)',
    tag: 'Boneless Biryani',
    desc: 'Aromatic layered dum biryani cooked exclusively with tender boneless chicken pieces, rich saffron, and plum essence.',
    icon: '🍛',
  },
  {
    name: 'Shahi Chicken Roast Biryani',
    tag: 'Roast & Rice',
    desc: 'Fragrant saffron rice served alongside succulent, whole-spiced oven-roasted shahi chicken portions.',
    icon: '🍗',
  },
  {
    name: 'Mutton Mandi Biryani',
    tag: 'Arabian Heritage',
    desc: 'Fragrant Arabian-spiced smoked rice paired with fall-apart tender slow-roasted mutton cuts and roasted nuts.',
    icon: '👑',
  },
  {
    name: 'Fruit & Cream (Sweet)',
    tag: 'Cold Sweet Selection',
    desc: 'Chilled rich dairy cream delicately folded with fresh seasonal cocktail fruits, cherries, honey, and dry nuts.',
    icon: '🍨',
  },
];

/* ── 4. ADD ON'S (10 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_ADD_ONS = [
  {
    name: 'Hot & Sour Soup',
    tag: 'Warm Starter',
    desc: 'Classic thick Chinese soup with shredded chicken, egg drops, mushrooms, and tangy chili vinegar.',
    icon: '🥣',
  },
  {
    name: '19 B Soup',
    tag: 'Gourmet Specialty',
    desc: 'Chef specialty dark rich broth with diced prawns, chicken, Chinese greens, and subtle oriental spices.',
    icon: '🍲',
  },
  {
    name: 'Chicken Corn Soup',
    tag: 'Banquet Classic',
    desc: 'Smooth comforting chicken broth with sweet corn kernels and delicate silky egg ribbons.',
    icon: '🌽',
  },
  {
    name: 'Qeema Naan / Cheese Naan',
    tag: 'Live Tandoor',
    desc: 'Freshly baked tandoori naan stuffed with spiced minced meat or gooey melted cheddar cheese.',
    icon: '🫓',
  },
  {
    name: 'Tea / Qehwa',
    tag: 'Hot Beverage',
    desc: 'Freshly brewed traditional Doodh Patti chai or fragrant green tea qehwa with green cardamom & lemon.',
    icon: '☕',
  },
  {
    name: 'Kashmiri Tea',
    tag: 'Pink Royal Tea',
    desc: 'Authentic slow-brewed pink noon chai served steaming hot with crushed pistachios, almonds, and malai.',
    icon: '🫖',
  },
  {
    name: 'Coffee Station',
    tag: 'Live Counter',
    desc: 'Live barista station serving freshly brewed espresso, rich cappuccino, and hot cafe mocha to guests.',
    icon: '☕',
  },
  {
    name: 'Tin Pack (Soft Drink)',
    tag: 'Chilled Drinks',
    desc: 'Individual chilled aluminum cans of premium carbonated sodas (Coke, Sprite, Fanta, Diet Coke).',
    icon: '🥤',
  },
  {
    name: 'Pinna Cloda / Mint Margrita',
    tag: 'Welcome Mocktail',
    desc: 'Refreshing ice-blended mocktails: Creamy Pineapple Pina Colada or sparkling Zesty Mint Margarita.',
    icon: '🍹',
  },
  {
    name: 'Plum Sauce (Aloo Bukhara Chutney)',
    tag: 'Royal Chutney',
    desc: 'Sweet & tangy royal whole dried plum sauce simmered with melon seeds (charonji), vinegar, and spices.',
    icon: '🍯',
  },
];

/* ── 5. SALADS (7 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_SALADS = [
  {
    name: 'Russian',
    tag: 'Creamy Classic',
    desc: 'Diced potatoes, sweet garden peas, tender carrots, apples, and pineapple chunks in rich creamy sweet mayonnaise.',
    icon: '🥗',
  },
  {
    name: 'Apple Cabbage',
    tag: 'Crunchy Slaw',
    desc: 'Crisp shredded red and green cabbage with tart green apples tossed in a light sweet and tangy honey glaze.',
    icon: '🍏',
  },
  {
    name: 'Caesar',
    tag: 'Continental',
    desc: 'Crisp romaine lettuce leaves, golden butter croutons, and grated parmesan tossed in creamy Caesar dressing.',
    icon: '🥬',
  },
  {
    name: 'Fresh Cube Salad',
    tag: 'Garden Fresh',
    desc: 'Crisp bite-sized cubes of cucumber, ripe tomatoes, red radishes, and bell peppers with fresh lemon vinaigrette.',
    icon: '🥒',
  },
  {
    name: 'Italian',
    tag: 'Mediterranean',
    desc: 'Assorted garden greens, cherry tomatoes, black Kalamata olives, bell peppers, and herbs in zesty Italian dressing.',
    icon: '🫒',
  },
  {
    name: 'Pasta Salad',
    tag: 'Cold Pasta',
    desc: 'Al dente spiral fusilli pasta tossed with diced vegetables, sweet corn, Italian herbs, and tangy dressing.',
    icon: '🍝',
  },
  {
    name: 'Multi Beens Salad',
    tag: 'Protein Healthy',
    desc: 'Nutritious mix of red kidney beans, white chickpeas, black beans, diced onions, and fresh lemon-herb dressing.',
    icon: '🥣',
  },
];

/* ── 6. CHARCOAL (9 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_CHARCOAL = [
  {
    name: 'Chicken Malai Boti',
    tag: 'Creamy BBQ',
    desc: 'Boneless chicken cubes marinated in fresh dairy cream, yogurt, green cardamom, and mild white pepper, grilled over wood embers.',
    icon: '🍢',
  },
  {
    name: 'Chicken Sultani Boti',
    tag: 'Royal BBQ',
    desc: 'Tender chicken cubes in chef special royal yellow spice marinade, grilled to smoky golden perfection.',
    icon: '🍗',
  },
  {
    name: 'Mutton Chops',
    tag: 'Tender Chops',
    desc: 'Prime mutton rib chops marinated in raw papaya, ginger garlic paste, and crushed ground spices, char-grilled on skewers.',
    icon: '🥩',
  },
  {
    name: 'Mutton Kabab',
    tag: 'Mutton Specialty',
    desc: 'Finely minced mutton blended with suet, fried onions, roasted gram, and aromatic spices seared over hot coals.',
    icon: '🍢',
  },
  {
    name: 'Chicken Seekh Kabab',
    tag: 'Tandoor Grill',
    desc: 'Spiced minced chicken breast blended with fresh coriander, mint, green chilies, and grilled to succulent tenderness.',
    icon: '🍢',
  },
  {
    name: 'Chicken Steam Roast',
    tag: 'Lahori Roast',
    desc: 'Whole chicken portions marinated in traditional Lahori spices, gently steamed and flash-seared for a golden exterior.',
    icon: '🍗',
  },
  {
    name: 'Mutton Tikka',
    tag: 'Charcoal Skewers',
    desc: 'Boneless bite-sized mutton cubes skewered and slow-roasted over wood coals with lemon and chaat masala.',
    icon: '🥩',
  },
  {
    name: 'Mutton Roast',
    tag: 'Grand Feast',
    desc: 'Whole spiced mutton leg roasted slowly till the meat falls off the bone with rich aromatic pan juices.',
    icon: '🍖',
  },
  {
    name: 'Mutton Dampukht',
    tag: 'Pashtun Heritage',
    desc: 'Authentic slow-cooked mutton prepared in sealed degs with whole potatoes, garlic bulbs, bone marrow, and minimal spices.',
    icon: '🥘',
  },
];

/* ── 7. SEA FOOD (5 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_SEAFOODS = [
  {
    name: 'Fried Fish Lahori Masala',
    tag: 'Lahori Classic',
    desc: 'Fresh river sole / rahu fish fillets coated in seasoned gram flour batter with ajwain (carom), coriander, and deep-fried till crispy.',
    icon: '🐟',
  },
  {
    name: 'Fried Fish With Crumbs',
    tag: 'Crispy Breaded',
    desc: 'Delicate boneless fish fillets coated in golden Japanese panko crumbs, served hot with tartar sauce and lemon wedges.',
    icon: '🍤',
  },
  {
    name: 'Fish Tikka BBQ',
    tag: 'Charcoal Tandoori',
    desc: 'Fresh boneless fish cubes marinated in tandoori red yogurt spice blend, skewered and char-grilled over glowing coals.',
    icon: '🍢',
  },
  {
    name: 'Tempura Fried Prawns',
    tag: 'Crispy Jumbo',
    desc: 'Giant tiger prawns dipped in light, airy Japanese tempura batter and fried to golden crisp perfection, served with sweet chili dip.',
    icon: '🦐',
  },
  {
    name: 'Grilled Prawns BBQ',
    tag: 'Live Charcoal',
    desc: 'Jumbo prawns marinated in garlic herb butter and crushed chili flakes, grilled fresh on open fire grates.',
    icon: '🔥',
  },
];

/* ── 8. CONTINENTAL (7 OFFICIAL BROCHURE ITEMS) ── */
export const MENU_CONTINENTAL = [
  {
    name: 'Egg Fried Rice',
    tag: 'Oriental Classic',
    desc: 'Fragrant wok-fried long grain rice with fluffy scrambled egg, scallions, finely diced carrots, and light soy sauce.',
    icon: '🍚',
  },
  {
    name: 'Garlic Rice',
    tag: 'Aromatic Rice',
    desc: 'Steamed basmati rice tossed in golden roasted garlic butter, green onions, and fresh garden parsley.',
    icon: '🧄',
  },
  {
    name: 'Chicken Cashew Nuts',
    tag: 'Chinese Gourmet',
    desc: 'Tender chicken slices stir-fried with crunchy roasted cashew nuts, bell peppers, and scallions in savory brown sauce.',
    icon: '🥘',
  },
  {
    name: 'Sweet & Sour Chicken',
    tag: 'Crispy Oriental',
    desc: 'Crispy battered chicken bites tossed with pineapple chunks, bell peppers, and onions in vibrant sweet & sour glaze.',
    icon: '🍗',
  },
  {
    name: 'Chicken with Chilli Vegetable',
    tag: 'Spicy Wok',
    desc: 'Sliced tender chicken breast sautéed with seasonal crisp vegetables, red & green chilies, and oriental garlic sauce.',
    icon: '🌶️',
  },
  {
    name: 'Chicken Black Paper Steaks',
    tag: 'Sizzling Steaks',
    desc: 'Succulent char-grilled chicken breast steaks served with rich cracked black peppercorn reduction sauce and sautéed vegetables.',
    icon: '🥩',
  },
  {
    name: 'Fish with Lemon Butter Sauce',
    tag: 'Continental Classic',
    desc: 'Pan-seared tender white fish fillets drizzled with a velvety emulsified fresh lemon, caper, and garlic butter reduction.',
    icon: '🐟',
  },
];

/* ══════════════════════════════════════════════════════════════════════
   9. CUSTOM MENU BUILDER CATALOG (All Brochure Dishes For Multi-Select)
   ══════════════════════════════════════════════════════════════════════ */
export const CUSTOM_BUILDER_SECTIONS = [
  {
    id: 'mains',
    category: 'Mutton & Chicken Curries',
    icon: '👑',
    items: [
      { id: 'b_mq', name: 'Mutton Qorma', tag: 'Royal Badami Gravy', icon: '🥘' },
      { id: 'b_mk', name: 'Mutton Kunna', tag: 'Clay Pot Slow Cooked', icon: '🍲' },
      { id: 'b_mkandhari', name: 'Mutton Kandhari', tag: 'Signature Gravy', icon: '🍖' },
      { id: 'b_mwhite', name: 'Mutton White Qorma', tag: 'Mild & Creamy', icon: '🥣' },
      { id: 'b_mhandi', name: 'Mutton Handi', tag: 'Boneless Gravy', icon: '🥘' },
      { id: 'b_mmadrasi', name: 'Mutton Madrasi', tag: 'Rich Spicy Curry', icon: '🌶️' },
      { id: 'b_mpalak', name: 'Palak Gosht (Mutton)', tag: 'Desi Traditional', icon: '🥬' },
      { id: 'b_mtakatak', name: 'Mutton Qeema Chops Taka Tak', tag: 'Live Griddle Tawa', icon: '🔥' },
      { id: 'b_cqorma', name: 'Chicken Qorma', tag: 'Shahi Gravy', icon: '🍗' },
      { id: 'b_ckarahi', name: 'Chicken Karahi', tag: 'High-Flame Wok', icon: '🥘' },
      { id: 'b_ckarahi_achari', name: 'Chicken Karahi (Achari)', tag: 'Pickled Spice Flavor', icon: '🌶️' },
      { id: 'b_cpeshawari', name: 'Chicken Peshawari Karahi', tag: 'Black Pepper Tomato', icon: '🍲' },
      { id: 'b_ckandhari', name: 'Chicken Kandhari', tag: 'Chef Signature', icon: '🍗' },
      { id: 'b_chandi', name: 'Chicken Handi', tag: 'Creamy Boneless', icon: '🥘' },
      { id: 'b_cginger', name: 'Chicken Ginger', tag: 'Julienne Ginger', icon: '🧄' },
      { id: 'b_cjalfrezi', name: 'Chicken Jalfrezi', tag: 'Wok Bell Peppers', icon: '🫑' },
      { id: 'b_cpalak', name: 'Palak Gosht (Chicken)', tag: 'Traditional', icon: '🥬' },
    ],
  },
  {
    id: 'rice',
    category: 'Royal Rice Specialties',
    icon: '🍚',
    items: [
      { id: 'b_mbiryani', name: 'Mutton Biryani', tag: 'Aromatic Dum Biryani', icon: '🍚' },
      { id: 'b_mpulao', name: 'Mutton Pulao', tag: 'Yakhni Basmati', icon: '🍚' },
      { id: 'b_mamartsari', name: 'Mutton Amartsari Pulao', tag: 'Traditional Punjabi', icon: '🍚' },
      { id: 'b_cbiryani', name: 'Chicken Biryani', tag: 'Lahori Masaledar', icon: '🍚' },
      { id: 'b_csindhi', name: 'Chicken Sindhi Biryani', tag: 'Spicy Sindhi Flavor', icon: '🌶️' },
      { id: 'b_czafrani', name: 'Chicken Zafrani Biryani', tag: 'Pure Kashmiri Saffron', icon: '✨' },
      { id: 'b_cafghani', name: 'Chicken Afghani Pulao', tag: 'Carrot & Raisin Garnish', icon: '🥕' },
      { id: 'b_cpulao', name: 'Chicken Pulao', tag: 'Yakhni Basmati', icon: '🍚' },
      { id: 'b_camartsari', name: 'Chicken Amartsari Pulao', tag: 'Heritage Spiced Rice', icon: '🍚' },
    ],
  },
  {
    id: 'bbq',
    category: 'Live Charcoal BBQ & Roasts',
    icon: '🔥',
    items: [
      { id: 'b_mchops', name: 'Mutton Chops', tag: 'Tender Chops Grill', icon: '🥩' },
      { id: 'b_mseekh', name: 'Mutton Kabab', tag: 'Flame Charcoal Skewer', icon: '🍢' },
      { id: 'b_mtikka', name: 'Mutton Tikka', tag: 'Charcoal Skewers', icon: '🥩' },
      { id: 'b_mroast', name: 'Mutton Roast', tag: 'Grand Spiced Leg', icon: '🍖' },
      { id: 'b_mdampukht', name: 'Mutton Dampukht', tag: 'Pashtun Heritage', icon: '🥘' },
      { id: 'b_cmalai', name: 'Chicken Malai Boti', tag: 'Melt-in-Mouth Creamy', icon: '🍢' },
      { id: 'b_csultani', name: 'Chicken Sultani Boti', tag: 'Royal Yellow Marinade', icon: '🍗' },
      { id: 'b_cseekh', name: 'Chicken Seekh Kabab', tag: 'Succulent Tandoor', icon: '🍢' },
      { id: 'b_csteam', name: 'Chicken Steam Roast', tag: 'Lahori Shahi Roast', icon: '🍗' },
    ],
  },
  {
    id: 'seafood',
    category: 'Fresh Sea Food Specialties',
    icon: '🦐',
    items: [
      { id: 'b_fried_fish', name: 'Fried Fish Lahori Masala', tag: 'Crispy Ajwain Batter', icon: '🐟' },
      { id: 'b_crumb_fish', name: 'Fried Fish With Crumbs', tag: 'Golden Breaded Sole', icon: '🍤' },
      { id: 'b_fish_tikka', name: 'Fish Tikka BBQ', tag: 'Tandoori Charcoal Skewers', icon: '🍢' },
      { id: 'b_tempura_prawns', name: 'Tempura Fried Prawns', tag: 'Crispy Jumbo Tiger', icon: '🦐' },
      { id: 'b_grilled_prawns', name: 'Grilled Prawns BBQ', tag: 'Garlic Herb Charcoal', icon: '🔥' },
    ],
  },
  {
    id: 'continental',
    category: 'Continental & Chinese',
    icon: '🍝',
    items: [
      { id: 'b_egg_rice', name: 'Egg Fried Rice', tag: 'Oriental Wok Classic', icon: '🍚' },
      { id: 'b_garlic_rice', name: 'Garlic Rice', tag: 'Golden Roasted Butter', icon: '🧄' },
      { id: 'b_cashew_chicken', name: 'Chicken Cashew Nuts', tag: 'Chinese Gourmet Wok', icon: '🥘' },
      { id: 'b_sweet_sour', name: 'Sweet & Sour Chicken', tag: 'Crispy Pineapple Glaze', icon: '🍗' },
      { id: 'b_chilli_veg', name: 'Chicken with Chilli Vegetable', tag: 'Spicy Wok Garlic', icon: '🌶️' },
      { id: 'b_black_pepper', name: 'Chicken Black Paper Steaks', tag: 'Sizzling Peppercorn', icon: '🥩' },
      { id: 'b_lemon_butter', name: 'Fish with Lemon Butter Sauce', tag: 'Continental Reduction', icon: '🐟' },
    ],
  },
  {
    id: 'salads',
    category: 'Gourmet Salads & Raita',
    icon: '🥗',
    items: [
      { id: 'b_russian', name: 'Russian Salad', tag: 'Creamy Pineapple Apple', icon: '🥗' },
      { id: 'b_apple_cabbage', name: 'Apple Cabbage Salad', tag: 'Crisp Tangy Slaw', icon: '🍏' },
      { id: 'b_green_salad', name: 'Fresh Green Salad', tag: 'Farm Crisp Greens', icon: '🥬' },
      { id: 'b_kachumber', name: 'Kachumber Salad', tag: 'Diced Onion Tomato Lemon', icon: '🧅' },
      { id: 'b_bean_corn', name: 'Red Bean & Corn Salad', tag: 'Zesty Lime Vinaigrette', icon: '🌽' },
      { id: 'b_macaroni', name: 'Macaroni Salad', tag: 'Herb Mayo Dressing', icon: '🍝' },
      { id: 'b_raita', name: 'Mint Sauce & Zeera Raita', tag: 'Chilled Spiced Yogurt', icon: '🥣' },
    ],
  },
  {
    id: 'desserts',
    category: 'Royal Desserts',
    icon: '🍨',
    items: [
      { id: 'b_kheer', name: 'Kheer Badami (Shahi)', tag: 'Shahi Almond Silver Leaf', icon: '🥣' },
      { id: 'b_qulfa', name: 'Qulfa Benazir', tag: 'Condensed Saffron Pistachio', icon: '🍨' },
      { id: 'b_falooda', name: 'Qulfi Lachay', tag: 'Silky Rose Rabri Falooda', icon: '🍧' },
      { id: 'b_gulab', name: 'Hot Gulab Jaman', tag: 'Piping Hot Desi Khoya', icon: '🟤' },
      { id: 'b_zarda', name: 'Zarda (Khoya)', tag: 'Aromatic Sweet Rice', icon: '✨' },
      { id: 'b_gur', name: 'Gurr Walay Chawal (Khoya)', tag: 'Punjabi Jaggery Desi Ghee', icon: '🍚' },
      { id: 'b_halwa', name: 'Seasonal Halwa', tag: 'Pure Desi Ghee Khoya', icon: '🍯' },
      { id: 'b_firni', name: 'Firni Zafrani', tag: 'Clay Pot Saffron Pudding', icon: '🏺' },
      { id: 'b_trifle', name: 'Fruit Trifle', tag: 'Custard & Whipped Cream', icon: '🍓' },
      { id: 'b_icecream', name: 'Ice Cream', tag: 'Creamy Scoop Selection', icon: '🍦' },
    ],
  },
  {
    id: 'addons',
    category: "Breads, Live Stations & Add-On's",
    icon: '✨',
    items: [
      { id: 'b_naan', name: 'Roghni Naan & Kalwanji Naan', tag: 'Fresh Clay Oven Tandoor', icon: '🫓' },
      { id: 'b_kashmiri_chai', name: 'Kashmiri Chai (Pink Tea)', tag: 'Crushed Almonds & Pistachio', icon: '☕' },
      { id: 'b_doodh_patti', name: 'Doodh Patti Chai', tag: 'Cardamom Strong Brew', icon: '🫖' },
      { id: 'b_soup_corner', name: 'Soup Corner (190°F)', tag: 'Hot Chicken Corn / Hot & Sour', icon: '🥣' },
      { id: 'b_live_jalebi', name: 'Live Jalebi Counter', tag: 'Piping Hot Crispy Desi Ghee', icon: '🥨' },
      { id: 'b_live_golgappa', name: 'Live Gol Gappa Station', tag: 'Chilled Khatta Meetha Pani', icon: '🫧' },
      { id: 'b_fresh_juice', name: 'Seasonal Fresh Juice Bar', tag: 'Cold Pressed Orange / Peach', icon: '🍹' },
      { id: 'b_halwa_puri', name: 'Halwa Puri, Channa Aloo Bhaji', tag: 'Traditional Delicacy', icon: '🥘' },
      { id: 'b_pathora', name: 'Pathora, Channa Achar', tag: 'Golden Fluffy Delicacy', icon: '🫓' },
      { id: 'b_green_tea', name: 'Green Tea / Peshawari Kahwa', tag: 'Cardamom Lemon Scent', icon: '🍵' },
      { id: 'b_drinks', name: 'Mineral Water & Soft Drinks', tag: 'Chilled Cans & Bottles', icon: '🥤' },
      { id: 'b_fruit_display', name: 'Exotic Fresh Fruit Display', tag: 'Carved Seasonal Tower', icon: '🍉' },
    ],
  },
];
