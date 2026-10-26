/**
 * Rabat Banquet Hall — Royal Banquet Menus & Culinary Catalog
 * Curated by Time & Taste Catering (30+ Years Heritage in Lahore)
 * Contains:
 *   1. PACKAGES (M1 to M7)
 *   2. ADD_ONS
 *   3. DESSERTS
 *   4. SALADS
 *   5. CHARCOAL (Live BBQ & Grills)
 *   6. SEA_FOODS
 *   7. CONTINENTAL
 *   8. CUSTOM_SELECTION
 */

export const MENU_CATEGORIES = [
  { id: 'packages', label: 'Set Packages (M1-M7)', icon: '👑', short: 'Packages' },
  { id: 'addons', label: 'Add-Ons & Live Stations', icon: '✨', short: 'Add-Ons' },
  { id: 'desserts', label: 'Royal Desserts', icon: '🍨', short: 'Desserts' },
  { id: 'salads', label: 'Gourmet Salads', icon: '🥗', short: 'Salads' },
  { id: 'charcoal', label: 'Charcoal BBQ & Grills', icon: '🔥', short: 'Charcoal BBQ' },
  { id: 'seafoods', label: 'Fresh Sea Foods', icon: '🦐', short: 'Sea Foods' },
  { id: 'continental', label: 'Continental Specialties', icon: '🍝', short: 'Continental' },
  { id: 'custom', label: 'Custom Menu Selection', icon: '✍️', short: 'Custom Build' },
];

export const MENU_PACKAGES = [
  {
    id: 'm1',
    code: 'M1',
    name: 'Imperial Royal Feast',
    tag: 'Signature Barat Banquet',
    highlight: 'Our most prestigious royal menu featuring authentic Dum Pukht copper degs and live barbecue.',
    welcomeDrinks: ['Fresh Mint Margarita', 'Kashmiri Chai with Crushed Pistachio & Almonds'],
    starters: ['Mutton Seekh Kebab (Live Charcoal)', 'Crispy Finger Fish with Tartar Sauce'],
    mains: [
      'Imperial Mutton Dum Pukht Qorma (Badami Gravy)',
      'Chicken Kasturi Boti with Grilled Tomatoes',
      'Special Saffron Chicken Dum Biryani with Burrani Raita',
      'Fresh Seasonal Vegetable Jalfrezi',
    ],
    breads: ['Sesame Roghni Naan', 'Tandoori Roti', 'Shahi Taftan'],
    salads: ['Russian Salad', 'Fresh Kachumber Salad', 'Mint Chutney & Achaar'],
    desserts: ['Traditional Zafrani Kheer in Clay Pots', 'Hot Gulab Jamun in Saffron Syrup'],
    suitableFor: 'Barat, Grand Receptions & VIP VIP Dinners',
  },
  {
    id: 'm2',
    code: 'M2',
    name: 'Shahi Dawat Feast',
    tag: 'Walima & Grand Reception',
    highlight: 'A sublime balance of delicate gravies, tender meats, and decadent royal dessert artistry.',
    welcomeDrinks: ['Pina Colada Mocktail', 'Fresh Lime Soda with Mint'],
    starters: ['Chicken Reshmi Kebab', 'Hot & Sour Chicken Corn Soup with Crispy Wontons'],
    mains: [
      'Lahori Mutton Kunna Gosht (Slow Cooked Clay Pot)',
      'Chicken Achari Handi with Ginger Juliennes',
      'Zafrani Mutton Yakhni Pulao with Zeera Raita',
      'Daal Makhni Sultani',
    ],
    breads: ['Garlic Butter Naan', 'Kalongi Roghni Naan', 'Tandoori Roti'],
    salads: ['Apple Cabbage Slaw', 'Fresh Garden Green Salad', 'Special Dahi Boondi Raita'],
    desserts: ['Special Badami Kheer', 'Desi Ghee Gajar Ka Halwa with Khoya'],
    suitableFor: 'Walima, Receptions & Family Celebrations',
  },
  {
    id: 'm3',
    code: 'M3',
    name: 'Mughal-e-Azam Banquet',
    tag: 'Palatial Classic Selection',
    highlight: 'Centuries-old Mughlai recipes perfected by master chefs with 24K edible silver and saffron.',
    welcomeDrinks: ['Rooh Afza Rose Lemonade', 'Traditional Doodh Patti Chai'],
    starters: ['Chicken Malai Boti', 'Vegetable Cocktail Samosas & Spring Rolls'],
    mains: [
      'Mutton Palak Gosht with Desi Butter',
      'Chicken White Shahi Qorma with Cashew Gravy',
      'Sindhi Beef Dum Biryani with Plum & Golden Fried Onions',
    ],
    breads: ['Kandhari Naan', 'Taftan', 'Tandoori Roti'],
    salads: ['Cucumber & Tomato Kachumber', 'Beetroot & Corn Salad', 'Mint Raita'],
    desserts: ['Hot Saffron Jalebi with Creamy Rabri', 'Shahi Kulfa with Laccha Falooda'],
    suitableFor: 'Traditional Weddings, Mayon & Nikkah Dinners',
  },
  {
    id: 'm4',
    code: 'M4',
    name: 'Darbar-e-Rabat Feast',
    tag: 'Mehndi & Sangeet Carnival',
    highlight: 'High-energy live food stations with street delicacies, sizzling charcoal grills, and sweet counters.',
    welcomeDrinks: ['Fresh Strawberry Slush', 'Iced Lemon Peach Tea'],
    starters: ['Live Gol Gappay Station (3 Flavored Waters)', 'Papri Chaat & Dahi Bhallay Bar'],
    mains: [
      'Live Charcoal Chicken Tikka Boti',
      'Tender Beef Bihari Boti with Onion Rings & Paratha',
      'Hyderabadi Dum Chicken Biryani with Mint Raita',
      'Shahi Mutton Haleem with Golden Onions, Ginger & Lemons',
    ],
    breads: ['Crispy Tandoori Paratha', 'Roghni Naan', 'Puri Paratha'],
    salads: ['Tangy Chickpea Salad', 'Fresh Kachumber with Chaat Masala'],
    desserts: ['Live Jalebi Station', 'Matka Kulfi with Pistachio Dust'],
    suitableFor: 'Mehndi, Sangeet & High-Spirited Festive Nights',
  },
  {
    id: 'm5',
    code: 'M5',
    name: 'Noor-e-Jahan Luxury Spread',
    tag: 'Modern Royal Fusion',
    highlight: 'Contemporary luxury culinary curation blending traditional heritage with modern presentation.',
    welcomeDrinks: ['Peach Iced Tea', 'Fresh Blue Lagoon Mocktail'],
    starters: ['Crispy Finger Fish with Garlic Mayo', 'Honey Glazed Chicken Wings'],
    mains: [
      'Mutton Nihari with Nalli, Ginger, Coriander & Green Chilies',
      'Chicken Makhni Boneless Handi',
      'Dum Pukht Chicken Pulao with Fried Onions & Nuts',
      'Creamy Paneer Butter Masala',
    ],
    breads: ['Cheese Garlic Naan', 'Roghni Kulcha', 'Tandoori Roti'],
    salads: ['Greek Salad with Feta & Black Olives', 'Russian Salad with Pineapple'],
    desserts: ['Delicate Badami Ras Malai', 'Belgian Chocolate Mousse Cups'],
    suitableFor: 'VIP Engagements, Executive Dinners & Nikkah',
  },
  {
    id: 'm6',
    code: 'M6',
    name: 'Executive Continental & Global Gala',
    tag: 'Corporate & Modern High-End',
    highlight: 'International multi-cuisine luxury spread featuring steaks, seafood, pastas, and carve stations.',
    welcomeDrinks: ['Assorted Fresh Seasonal Juices', 'Sparkling Berry Punch'],
    starters: ['Dynamite Prawns in Cocktail Glasses', 'Chicken Satay Skewers with Peanut Glaze'],
    mains: [
      'Char-Grilled Chicken Steak with Creamy Wild Mushroom Sauce',
      'Slow-Roasted Mutton Leg Carving Station with Pan Gravy',
      'Thai Green Curry with Fragrant Jasmine Rice',
      'Fettuccine Alfredo in Creamy Parmesan & Herbs',
    ],
    breads: ['Assorted Garlic Dinner Rolls', 'French Baguette Slices with Herb Butter'],
    salads: ['Classic Caesar Salad with Croutons', 'Mediterranean Couscous Salad'],
    desserts: ['New York Baked Cheesecake with Strawberry Coulis', 'Italian Tiramisu Pots'],
    suitableFor: 'Corporate Banquets, Gala Dinners & Elite Receptions',
  },
  {
    id: 'm7',
    code: 'M7',
    name: 'The Royal Moroccan Sultanate',
    tag: 'Exclusive Rabat Signature Feast',
    highlight: 'Authentic Moroccan palace dining in Lahore Cantt, served in traditional glazed terracotta tagines.',
    welcomeDrinks: ['Authentic Moroccan Sweet Mint Tea (Atay)', 'Pomegranate Blossom Sparkler'],
    starters: ['Andalusian Mezze Platter (Hummus, Moutabal, Baba Ganoush & Warm Pita)', 'Traditional Harira Soup'],
    mains: [
      'Royal Lamb Mrouzia Tagine with Sweet Prunes & Toasted Almonds',
      'Chicken Tagine with Preserved Lemons & Green Olives',
      'Saffron Couscous Royale with Steamed Garden Vegetables',
      'Moroccan Spiced Meatballs (Kefta) in Rich Tomato Sauce',
    ],
    breads: ['Khobz (Moroccan Flatbread)', 'Pita Bread', 'Sesame Lavash'],
    salads: ['Zaalouk (Roasted Eggplant & Tomato Salad)', 'Orange & Cinnamon Carrot Salad'],
    desserts: ['Crispy Turkish Baklava with Pistachio Cream', 'Warm Kunafa with Melted Sweet Cheese'],
    suitableFor: 'Moroccan-Themed Receptions, Royal Banquets & Elite Dinners',
  },
];

export const MENU_ADD_ONS = [
  {
    title: 'Live Tandoor & Barbecue Station',
    desc: 'Master grillers serving sizzling seekh kebabs, tikka boti, and fresh naan directly from glowing wood coals.',
    icon: '🔥',
    popular: true,
  },
  {
    title: 'Live Mutton Karahi & Tawa Counter',
    desc: 'Live high-flame wok cooking customized with fresh ginger, chilies, and pure butter to order.',
    icon: '🥘',
    popular: true,
  },
  {
    title: 'Whole Roasted Stuffed Dumba / Lamb',
    desc: 'Grand royal centerpiece: whole slow-roasted spiced lamb stuffed with aromatic saffron rice, dry fruits, and boiled eggs.',
    icon: '👑',
    popular: false,
  },
  {
    title: 'Live Jalebi & Halwa Station',
    desc: 'Crispy piping hot saffron jalebis swirled live into desi ghee and served with chilled thick rabri.',
    icon: '🍯',
    popular: true,
  },
  {
    title: 'Artisan Kashmiri Chai & Coffee Bar',
    desc: 'Pink Kashmiri noon chai served from antique samovars with crushed pistachios, plus freshly brewed espresso.',
    icon: '☕',
    popular: false,
  },
  {
    title: 'Belgian Chocolate Fondue Fountain',
    desc: 'Flowing multi-tier warm Belgian chocolate fountain with fresh strawberries, marshmallows, and waffle bites.',
    icon: '🍫',
    popular: true,
  },
  {
    title: 'Live Gol Gappay & Street Chaat Counter',
    desc: 'Crisp gol gappay with khatta meetha water, papri chaat, and dahi bhallay for vibrant pre-dinner socializing.',
    icon: '🥣',
    popular: false,
  },
  {
    title: 'Fresh Seafood / Prawns Fry Bar',
    desc: 'Live tempura batter and crumb-fried jumbo prawns and pomfret fillets served smoking hot with specialty dips.',
    icon: '🍤',
    popular: false,
  },
];

export const MENU_DESSERTS = [
  { name: 'Zafrani Shahi Kheer', desc: 'Slow simmered milk, rice, and crushed almonds with pure saffron essence.', tag: 'Traditional' },
  { name: 'Warm Gulab Jamun in Saffron Syrup', desc: 'Melt-in-mouth soft khoya dumplings in cardamom-infused sugar syrup.', tag: 'Hot' },
  { name: 'Badami Ras Malai', desc: 'Spongy cottage cheese patties soaked in thick clotted milk with pistachios.', tag: 'Chilled' },
  { name: 'Desi Ghee Gajar Ka Halwa', desc: 'Slow cooked winter carrots with pure butter, khoya, and golden dry fruits.', tag: 'Traditional' },
  { name: 'Shahi Matka Kulfa & Falooda', desc: 'Dense royal ice cream set in earthen clay pots with vermicelli noodles.', tag: 'Chilled' },
  { name: 'Crispy Kunafa with Sweet Cheese', desc: 'Golden shredded phyllo pastry baked with sweet mozzarella and rose syrup.', tag: 'Moroccan' },
  { name: 'Turkish Baklava with Pistachio', desc: 'Multi-layer flaky filo sheets soaked in honey syrup with Turkish pistachios.', tag: 'Mediterranean' },
  { name: 'Molten Chocolate Lava Cake', desc: 'Rich Belgian dark chocolate cake with flowing warm center and vanilla gelato.', tag: 'Continental' },
  { name: 'New York Baked Cheesecake', desc: 'Velvety cream cheese cake on graham crust with wild berry compote.', tag: 'Continental' },
  { name: 'Mango Delight & Trifle Bowls', desc: 'Layered sponge cake with fresh mango mousse, custard, and cream.', tag: 'Seasonal' },
];

export const MENU_SALADS = [
  { name: 'Classic Russian Salad', desc: 'Diced potatoes, carrots, peas, apples, and pineapple in creamy sweet mayonnaise.', type: 'Creamy' },
  { name: 'Greek Feta & Olive Salad', desc: 'Crisp romaine lettuce, cucumber, cherry tomatoes, Kalamata olives, and Greek feta cheese.', type: 'Mediterranean' },
  { name: 'Traditional Lahori Kachumber', desc: 'Finely diced cucumber, onion, and tomato with fresh coriander, lemon juice, and chaat masala.', type: 'Traditional' },
  { name: 'Mediterranean Chickpea & Mint Salad', desc: 'Boiled kabuli chickpeas, pomegranate pearls, mint leaves, and light olive oil vinaigrette.', type: 'Healthy' },
  { name: 'Fresh Garden Greens with Vinaigrette', desc: 'Seasonal greens, carrots, radishes, and bell peppers with herb dressing.', type: 'Light' },
  { name: 'Sweet Apple & Cabbage Slaw', desc: 'Crunchy red and green cabbage with crisp red apples and light honey dressing.', type: 'Crunchy' },
  { name: 'Creamy Beetroot & Sweet Corn Salad', desc: 'Roasted beet cubes with golden corn, walnut bits, and lemon mayonnaise.', type: 'Gourmet' },
];

export const MENU_CHARCOAL = [
  { name: 'Mutton Seekh Kebab (Sultanate Recipe)', desc: 'Minced mutton blended with bone marrow, papaya, and 14 secret spices on skewers.', type: 'Mutton' },
  { name: 'Velvety Chicken Malai Boti', desc: 'Boneless chicken cubes marinated in heavy cream, yogurt, white pepper, and green cardamom.', type: 'Chicken' },
  { name: 'Char-Grilled Spicy Chicken Tikka', desc: 'Quarter chicken quarters marinated in spicy tandoori masala and seared over wood coals.', type: 'Chicken' },
  { name: 'Tender Beef Bihari Boti', desc: 'Thin strips of beef tenderloin marinated in raw papaya and mustard oil, melt-in-mouth texture.', type: 'Beef' },
  { name: 'Saffron Reshmi Kebab', desc: 'Finely ground chicken breast with saffron butter, slow grilled to delicate golden perfection.', type: 'Chicken' },
  { name: 'Charcoal Fish Tikka', desc: 'Boneless fish fillets coated with carom seeds (ajwain), lemon, and red chili, grilled in tandoor.', type: 'Seafood' },
  { name: 'Wood-Fired Roghni & Garlic Naan', desc: 'Fresh tandoor breads brushed with pure desi ghee, toasted sesame seeds, and garlic butter.', type: 'Breads' },
];

export const MENU_SEAFOODS = [
  { name: 'Golden Crumb Fried Fish', desc: 'Crispy panko-breaded white fish fillets served with homemade caper tartar sauce.', type: 'Deep Fried' },
  { name: 'Crispy Jumbo Dynamite Prawns', desc: 'Tempura-fried giant tiger prawns tossed in spicy sweet sriracha dynamite glaze.', type: 'Appetizer' },
  { name: 'Lahori Fried Rahu / Sole Fish', desc: 'Traditional spiced gram flour batter with ajwain, coriander seeds, and tangy amchoor.', type: 'Traditional' },
  { name: 'Tandoori Whole Grilled Pomfret', desc: 'Fresh whole pomfret scored and marinated in red yogurt masala, flame-grilled on skewers.', type: 'Tandoori' },
  { name: 'Pan-Seared Fish in Lemon Butter Sauce', desc: 'Delicate white fish fillet seared with capers, garlic, fresh parsley, and lemon butter.', type: 'Continental' },
  { name: 'Spicy Garlic Chili Prawns', desc: 'Wok-tossed king prawns with red chilies, scallions, roasted garlic, and soy glaze.', type: 'Oriental' },
];

export const MENU_CONTINENTAL = [
  { name: 'Grilled Chicken Steak (Wild Mushroom)', desc: 'Tenderized grilled chicken breast served with rich mushroom cream sauce and sautéed greens.', type: 'Steaks' },
  { name: 'Black Pepper Beef Steak', desc: 'Prime beef tenderloin medallion seared to perfection with peppercorn reduction and mashed potatoes.', type: 'Steaks' },
  { name: 'Fettuccine Alfredo with Grilled Chicken', desc: 'Ribbon pasta in rich garlic parmesan cream sauce topped with herb grilled chicken.', type: 'Pasta' },
  { name: 'Crispy Chicken Parmesan', desc: 'Golden breaded chicken breast topped with marinara sauce, melted mozzarella, and fresh basil.', type: 'Mains' },
  { name: 'Penne Arrabbiata with Basil', desc: 'Al dente penne pasta tossed in spicy crushed tomato, garlic, and extra virgin olive oil.', type: 'Pasta' },
  { name: 'Crispy Golden Chicken Cordon Bleu', desc: 'Rolled chicken breast stuffed with savory cheese and herbs, deep fried until golden molten.', type: 'Mains' },
  { name: 'Creamy Tuscan Garlic Chicken', desc: 'Pan-seared chicken with sun-dried tomatoes, baby spinach, and garlic cream with herb rice.', type: 'Mains' },
];
