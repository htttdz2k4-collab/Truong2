export const PRODUCTS = [
  {
    id: 'p1',
    name: 'Aetheris Pro Wireless ANC Headphones',
    category: 'Audio',
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.9,
    reviewsCount: 342,
    badge: 'AI Top Pick',
    aiScore: 98,
    aiReason: 'Matched based on high acoustic rating, adaptive active noise cancellation, and 45h battery life preference.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 14,
    description: 'Experience studio-grade spatial audio with AI-powered environment awareness. Dynamic drivers adjust EQ real-time based on your acoustic surroundings.',
    specs: {
      'Battery Life': '45 Hours',
      'Connectivity': 'Bluetooth 5.3 / Low-latency 2.4Ghz',
      'Noise Cancelling': 'Adaptive Hybrid ANC (48dB)',
      'Weight': '260g'
    },
    tags: ['wireless', 'headphones', 'audio', 'noise cancelling', 'gaming', 'music']
  },
  {
    id: 'p2',
    name: 'NovaGlow Cybernetic Smartwatch Gen 4',
    category: 'Wearables',
    price: 189.50,
    originalPrice: 220.00,
    rating: 4.8,
    reviewsCount: 218,
    badge: 'Popular',
    aiScore: 95,
    aiReason: 'Ideal for biometric tracking, sleep optimization, and futuristic neon ambient watch faces.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 8,
    description: 'Ultra-durable titanium case with dynamic AMOLED curved display. Features real-time AI vitality insights, SPO2 tracking, and 7-day battery.',
    specs: {
      'Display': '1.9" Crystal AMOLED 120Hz',
      'Material': 'Grade 5 Titanium & Sapphire Glass',
      'Water Resistance': '5 ATM / 50M',
      'Sensors': 'ECG, SpO2, Heart Rate, AI Stress Meter'
    },
    tags: ['smartwatch', 'wearables', 'fitness', 'health', 'gadgets']
  },
  {
    id: 'p3',
    name: 'OmniDesk RGB Mechanical Ergonomic Keyboard',
    category: 'Electronics',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.9,
    reviewsCount: 512,
    badge: 'Best Value',
    aiScore: 96,
    aiReason: 'Highly rated for tactile typing feel, hot-swappable switches, and ambient backlighting customizable via AI scenes.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 25,
    description: 'Precision CNC aluminum chassis with custom lubrication, gateron switches, and customizable lighting that syncs with music and screen content.',
    specs: {
      'Switch Type': 'Hot-Swappable Custom Linear',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Battery': '4000mAh Wireless',
      'Weight': '1.2 kg'
    },
    tags: ['keyboard', 'gaming', 'desk setup', 'electronics', 'productivity']
  },
  {
    id: 'p4',
    name: 'LuminaSphere Ambient AI Desk Lamp',
    category: 'Smart Home',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewsCount: 145,
    badge: 'Trending',
    aiScore: 92,
    aiReason: 'Adaptive lighting automatically adjusts color temperature throughout the day to boost focus and circadian rhythm.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 30,
    description: 'Floating glass sphere light with integrated Qi 15W fast wireless charging base and ambient voice dynamic modes.',
    specs: {
      'Lumens': '800 Lumens (Dimming 1-100%)',
      'Color Range': '2700K Warm - 6500K Cool + RGB',
      'Wireless Charging': '15W Fast Charge Base',
      'Smart Voice': 'Alexa, Siri, Google Assistant, ShopAI Sync'
    },
    tags: ['smart home', 'lighting', 'desk setup', 'gadgets', 'lamp']
  },
  {
    id: 'p5',
    name: 'Vortex Precision Wireless Gaming Mouse',
    category: 'Electronics',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviewsCount: 290,
    badge: 'Editor Choice',
    aiScore: 94,
    aiReason: 'Sub-60g lightweight design paired with 30K optical sensor for flawless precision during fast movements.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 19,
    description: 'Ultra-lightweight ergonomic shape with 80-hour battery life and optical microswitches tested for 90M clicks.',
    specs: {
      'Weight': '55g Ultra Lightweight',
      'DPI': '30,000 Optical Sensor',
      'Polling Rate': '4000Hz Wireless',
      'Battery': '80 Hours'
    },
    tags: ['mouse', 'gaming', 'electronics', 'productivity']
  },
  {
    id: 'p6',
    name: 'CyberShield Waterproof Solar Tech Backpack',
    category: 'Fashion',
    price: 119.00,
    originalPrice: 149.00,
    rating: 4.9,
    reviewsCount: 187,
    badge: 'Innovator',
    aiScore: 97,
    aiReason: 'Integrated thin-film solar charging panel keeps your laptop and phone powered on the move with anti-theft zipper locks.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 12,
    description: 'Weatherproof ballistic nylon backpack with dedicated 16" padded laptop vault, built-in USB power port, and hidden passport pocket.',
    specs: {
      'Capacity': '28 Liters',
      'Laptop Compartment': 'Fits up to 16.5" Laptops',
      'Solar Panel Output': '10W USB-C Fast Charge',
      'Waterproof Rating': 'IPX6 Rated'
    },
    tags: ['backpack', 'fashion', 'travel', 'solar', 'gadgets']
  },
  {
    id: 'p7',
    name: 'PulseFlow Smart Stainless Hydration Flask',
    category: 'Smart Home',
    price: 49.99,
    originalPrice: 65.00,
    rating: 4.6,
    reviewsCount: 98,
    badge: 'Hot Item',
    aiScore: 91,
    aiReason: 'UV-C self-cleaning cap purifies water in 60 seconds while track hydration goals on the OLED lid display.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 40,
    description: 'Double-wall vacuum insulated water bottle keeping drinks cold for 24 hours or hot for 12 hours with intelligent hydration reminder rings.',
    specs: {
      'Volume': '750 ml (25 oz)',
      'Insulation': '24 hrs Cold / 12 hrs Hot',
      'Purification': 'UV-C LED sterilization (99.99%)',
      'Battery': '30-day rechargeable USB-C'
    },
    tags: ['water bottle', 'smart home', 'health', 'fitness']
  },
  {
    id: 'p8',
    name: 'VisionX AR Glass Headset Edition',
    category: 'Wearables',
    price: 499.00,
    originalPrice: 599.00,
    rating: 4.9,
    reviewsCount: 164,
    badge: 'Next-Gen',
    aiScore: 99,
    aiReason: 'Virtual 201-inch spatial display in ultra-sleek sunglasses format for movies, work multitasking, and cloud gaming.',
    image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 5,
    description: 'Plug-and-play augmented reality glasses with Micro-OLED dual 1080p screens, directional speakers, and electrochromic dimming lenses.',
    specs: {
      'Display': 'Dual Micro-OLED 120Hz (201" Virtual Screen)',
      'Audio': 'Custom Directional Stereo Speakers',
      'Weight': '76g',
      'Compatibility': 'iPhone, Android, Steam Deck, Mac, PC'
    },
    tags: ['ar', 'wearables', 'glasses', 'gadgets', 'electronics']
  }
];

export const CATEGORIES = ['All', 'Audio', 'Wearables', 'Electronics', 'Smart Home', 'Fashion'];
