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
  { id: 'custom', num: '09', label: 'Build Custom Menu', icon: '✍️', short: 'Custom Build', count: 'Consult', tag: 'Bespoke Event Menu' },
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
