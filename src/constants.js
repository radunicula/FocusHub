export const STORAGE_KEY_V3 = 'zenith_productivity_dashboard_v3';
export const STORAGE_KEY_V2 = 'zenith_productivity_dashboard_v2';
export const STORAGE_KEY_V1 = 'zenith_productivity_dashboard_v1';

export const IDB_NAME = 'dashboard_custom_assets_db';
export const IDB_STORE = 'backgrounds';
export const IDB_BG_KEY = 'custom_bg_data_url';
export const IDB_SYNC_HANDLE_KEY = 'autosync_file_handle';
export const IDB_MARKER = 'idb://custom-bg';

// Collection of native 4K Ultra-HD images (3840px, 95% quality) — Automotive, Software Engineering, Radar Sensors & Nature
export const UNSPLASH_BACKGROUNDS = [
  {
    url: 'https://images.unsplash.com/photo-1550242499-b5171f56de56?auto=format&fit=max&w=3840&q=95',
    location: 'Automotive Night Drive (4K) — Unsplash',
    category: 'automotive',
  },
  {
    url: 'https://images.unsplash.com/photo-1785910723999-37ab033d898b?auto=format&fit=max&w=3840&q=95',
    location: 'Automotive Digital Cockpit (4K) — Unsplash',
    category: 'automotive',
  },
  {
    url: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=max&w=3840&q=95',
    location: 'Electric Vehicle & Mobility (4K) — Unsplash',
    category: 'automotive',
  },
  {
    url: 'https://images.unsplash.com/photo-1623346483743-b968a27ed34c?auto=format&fit=max&w=3840&q=95',
    location: 'Performance Automotive Design (4K) — Unsplash',
    category: 'automotive',
  },
  {
    url: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=max&w=3840&q=95',
    location: 'Software Engineering & Source Code (4K) — Unsplash',
    category: 'software',
  },
  {
    url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=max&w=3840&q=95',
    location: 'Code Architecture & Terminal (4K) — Unsplash',
    category: 'software',
  },
  {
    url: 'https://images.unsplash.com/photo-1623281185000-6940e5347d2e?auto=format&fit=max&w=3840&q=95',
    location: 'Developer Workstation Setup (4K) — Unsplash',
    category: 'software',
  },
  {
    url: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=max&w=3840&q=95',
    location: 'Embedded Systems & PCB Engineering (4K) — Unsplash',
    category: 'software',
  },
  {
    url: 'https://images.unsplash.com/photo-1610457642191-05328cdf34ff?auto=format&fit=max&w=3840&q=95',
    location: 'Radar Array & Antenna Systems (4K) — Unsplash',
    category: 'radar',
  },
  {
    url: 'https://images.unsplash.com/photo-1714255288526-cc155b548aac?auto=format&fit=max&w=3840&q=95',
    location: 'High-Frequency Radar Dish (4K) — Unsplash',
    category: 'radar',
  },
  {
    url: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=max&w=3840&q=95',
    location: 'Telemetry & Radar Tracking Array (4K) — Unsplash',
    category: 'radar',
  },
  {
    url: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=max&w=3840&q=95',
    location: 'Microchip & Radar Sensor Electronics (4K) — Unsplash',
    category: 'radar',
  },
  // Calm, neutral landscapes (no vehicles, people or man-made objects). Appended at the end so
  // saved background indexes keep pointing to the same photos.
  {
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=max&w=3840&q=95',
    location: 'Yosemite Valley at Dawn (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=max&w=3840&q=95',
    location: 'Misty Green Cliffs (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=max&w=3840&q=95',
    location: 'Sunlit Forest (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=max&w=3840&q=95',
    location: 'Calm Beach at Sunset (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=max&w=3840&q=95',
    location: 'Starry Night over the Mountains (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=max&w=3840&q=95',
    location: 'Alpine Valley (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=max&w=3840&q=95',
    location: 'Misty Hills (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=max&w=3840&q=95',
    location: 'Ocean Sunset (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=max&w=3840&q=95',
    location: 'Ocean Waves (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=max&w=3840&q=95',
    location: 'Granite Cliffs & Pines (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=max&w=3840&q=95',
    location: 'Aerial Ocean Shore (4K) — Unsplash',
    category: 'nature',
  },
  {
    url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=max&w=3840&q=95',
    location: 'Storm Clouds (4K) — Unsplash',
    category: 'nature',
  },
];

// Collection of minimalist gradients
export const MINIMAL_GRADIENTS = [
  {
    css: 'radial-gradient(circle at 20% 20%, #1e293b 0%, #0f172a 45%, #020617 100%)',
    location: 'Gradient Minimalist — Midnight Slate',
  },
  {
    css: 'linear-gradient(135deg, #064e3b 0%, #0f172a 55%, #020617 100%)',
    location: 'Minimalist Gradient — Northern Lights',
  },
  {
    css: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 55%, #090d16 100%)',
    location: 'Gradient Minimalist — Deep Cosmos',
  },
  {
    css: 'linear-gradient(135deg, #31102f 0%, #111827 55%, #030712 100%)',
    location: 'Gradient Minimalist — Dusk Horizon',
  },
];

export const LIGHT_MINIMAL_GRADIENTS = [
  {
    css: 'radial-gradient(circle at 20% 20%, #ffffff 0%, #e0f2ec 48%, #cbded8 100%)',
    location: 'Light Gradient — Soft Sage',
  },
  {
    css: 'linear-gradient(135deg, #f0fdfa 0%, #dbeafe 55%, #c7d2fe 100%)',
    location: 'Light Gradient — Morning Sky',
  },
  {
    css: 'linear-gradient(135deg, #fff7ed 0%, #fce7d5 52%, #e9d5ff 100%)',
    location: 'Light Gradient — Warm Horizon',
  },
  {
    css: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 55%, #dbeafe 100%)',
    location: 'Light Gradient — Cloud Drift',
  },
];

// Accent color palettes (RGB triplets for Tailwind alpha support)
export const ACCENT_PALETTES = {
  emerald: {
    label: 'Emerald',
    hex: '#10b981',
    shades: {
      100: '209 250 229',
      200: '167 243 208',
      300: '110 231 183',
      400: '52 211 153',
      500: '16 185 129',
      600: '5 150 105',
      700: '4 120 87',
    },
  },
  sky: {
    label: 'Sky Blue',
    hex: '#0ea5e9',
    shades: {
      100: '224 242 254',
      200: '186 230 253',
      300: '125 211 252',
      400: '56 189 248',
      500: '14 165 233',
      600: '2 132 199',
      700: '3 105 161',
    },
  },
  violet: {
    label: 'Royal Violet',
    hex: '#8b5cf6',
    shades: {
      100: '237 233 254',
      200: '221 214 254',
      300: '196 181 253',
      400: '167 139 250',
      500: '139 92 246',
      600: '124 58 237',
      700: '109 40 217',
    },
  },
  amber: {
    label: 'Amber',
    hex: '#f59e0b',
    shades: {
      100: '254 243 199',
      200: '253 230 138',
      300: '252 211 77',
      400: '251 191 36',
      500: '245 158 11',
      600: '217 119 6',
      700: '180 83 9',
    },
  },
  rose: {
    label: 'Coral Pink',
    hex: '#f43f5e',
    shades: {
      100: '255 228 230',
      200: '254 205 211',
      300: '253 164 175',
      400: '251 113 133',
      500: '244 63 94',
      600: '225 29 72',
      700: '190 18 60',
    },
  },
  cyan: {
    label: 'Turquoise',
    hex: '#06b6d4',
    shades: {
      100: '207 250 254',
      200: '165 243 252',
      300: '103 232 249',
      400: '34 211 238',
      500: '6 182 212',
      600: '8 145 178',
      700: '14 116 144',
    },
  },
};

// Web search engines for the central search bar
export const SEARCH_ENGINES = [
  { name: 'Google', url: 'https://www.google.com/search?q=' },
  { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'GitHub', url: 'https://github.com/search?q=' },
];

// Cities available in the weather and forecast widgets (Sibiu is first and the default)
export const WEATHER_CITIES = [
  { name: 'Sibiu', lat: 45.7983, lon: 24.1256, mockTemp: 17, mockDesc: 'Clear', mockWind: 10, mockIcon: '☀️' },
  { name: 'Bucharest', lat: 44.4268, lon: 26.1025, mockTemp: 21, mockDesc: 'Clear', mockWind: 11, mockIcon: '☀️' },
  { name: 'Cluj-Napoca', lat: 46.7712, lon: 23.6236, mockTemp: 18, mockDesc: 'Partly cloudy', mockWind: 9, mockIcon: '⛅' },
  { name: 'Timisoara', lat: 45.7489, lon: 21.2087, mockTemp: 22, mockDesc: 'Clear', mockWind: 14, mockIcon: '☀️' },
  { name: 'Iasi', lat: 47.1585, lon: 27.6014, mockTemp: 19, mockDesc: 'Partly cloudy', mockWind: 12, mockIcon: '🌤️' },
  { name: 'Brasov', lat: 45.6427, lon: 25.5887, mockTemp: 16, mockDesc: 'Cool', mockWind: 8, mockIcon: '⛅' },
  { name: 'Constanta', lat: 44.1598, lon: 28.6348, mockTemp: 20, mockDesc: 'Light breeze', mockWind: 19, mockIcon: '🌤️' },
];

// Preset time zones for the world clocks widget
export const WORLD_TIMEZONES = [
  { city: 'Sibiu / Bucharest', tz: 'Europe/Bucharest', country: 'RO' },
  { city: 'London', tz: 'Europe/London', country: 'UK' },
  { city: 'Paris / Berlin', tz: 'Europe/Paris', country: 'EU' },
  { city: 'New York', tz: 'America/New_York', country: 'US' },
  { city: 'Los Angeles', tz: 'America/Los_Angeles', country: 'US' },
  { city: 'Tokyo', tz: 'Asia/Tokyo', country: 'JP' },
  { city: 'Dubai', tz: 'Asia/Dubai', country: 'AE' },
  { city: 'Sydney', tz: 'Australia/Sydney', country: 'AU' },
  { city: 'UTC / GMT', tz: 'UTC', country: '🌐' },
];

// Default quick-link subgroups
export const DEFAULT_SUBGROUPS = [
  {
    id: 'sg-dev',
    title: 'Development & AI',
    collapsed: false,
    items: [
      { id: 'lnk-1', title: 'GitHub', url: 'https://github.com' },
      { id: 'lnk-2', title: 'ChatGPT', url: 'https://chatgpt.com' },
      { id: 'lnk-3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org' },
      { id: 'lnk-4', title: 'Stack Overflow', url: 'https://stackoverflow.com' },
    ],
  },
  {
    id: 'sg-daily',
    title: 'Daily & Organization',
    collapsed: false,
    items: [
      { id: 'lnk-5', title: 'Gmail', url: 'https://mail.google.com' },
      { id: 'lnk-6', title: 'Notion', url: 'https://notion.so' },
      { id: 'lnk-7', title: 'YouTube', url: 'https://youtube.com' },
      { id: 'lnk-8', title: 'Figma', url: 'https://figma.com' },
    ],
  },
];

export const DEFAULT_TODOS = [
  { id: 'td-1', text: "Plan today's top priorities", completed: true, priority: 'normal', dueDate: '' },
  { id: 'td-2', text: 'Drag links or tasks between lists', completed: false, priority: 'high', dueDate: '' },
  { id: 'td-3', text: 'Use Ctrl+K for instant search', completed: false, priority: 'normal', dueDate: '' },
];

export const QUOTES = [
  '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
  '"The secret of getting ahead is getting started." — Mark Twain',
  '"Focus on being productive instead of busy." — Tim Ferriss',
  '"Quality is not an act, it is a habit." — Aristotle',
  '"Discipline is the bridge between goals and accomplishment." — Jim Rohn',
  '"Don’t count the days, make the days count." — Muhammad Ali',
];

export const DEFAULT_VISUAL_SETTINGS = {
  overlayDim: 22,   // % background dimming
  glassOpacity: 56, // % panel opacity
  glassBlur: 22,    // px panel blur
  theme: 'dark',    // 'dark' | 'light'
  accentColor: 'emerald', // 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'cyan'
  sharpBgMigrated: true,
};
