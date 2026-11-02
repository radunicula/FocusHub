/**
 * ============================================================================
 * Dashboard de Productivitate (app.js)
 * Funcționalități complete:
 * 1. Spații de Lucru (Workspaces / Tab-uri) în stânga-sus (creare, redenumire, ștergere)
 * 2. Căutare Rapidă Globală (Ctrl+K sau /) în link-uri, sarcini, notițe, evenimente + Căutare Web
 * 3. Export & Import Backup (.json) complet + Import Bookmark-uri din browser (.html)
 * 4. Anulare ștergere (Undo / Ctrl+Z) pentru panouri, spații, subgrupuri, link-uri și sarcini
 * 5. Scurtături rapide ultra-compacte (unul sub altul) organizate pe subgrupuri colapsabile + Drag & Drop
 * 6. Listă de sarcini cu priorități, termene limită (due date) și Drag & Drop între liste
 * 7. Notițe rapide cu suport Markdown (mod Editare / Previzualizare cu bife interactive)
 * 8. Widget-uri noi: Calendar Lunar (cu nr. săptămânii), Prognoză Vreme 5 Zile, Ceasuri Mondiale, Numărătoare Inversă
 * 9. Stocare IndexedDB pentru imagini de fundal locale + Temă Întunecată/Luminoasă & Culori de Accent
 * ============================================================================
 */

(() => {
  'use strict';

  const STORAGE_KEY_V3 = 'zenith_productivity_dashboard_v3';
  const STORAGE_KEY_V2 = 'zenith_productivity_dashboard_v2';
  const STORAGE_KEY_V1 = 'zenith_productivity_dashboard_v1';

  const IDB_NAME = 'dashboard_custom_assets_db';
  const IDB_STORE = 'backgrounds';
  const IDB_BG_KEY = 'custom_bg_data_url';
  const IDB_MARKER = 'idb://custom-bg';

  // Colecție extinsă de imagini 4K Ultra-HD (3840px, calitate 95%) de pe Unsplash
  const UNSPLASH_BACKGROUNDS = [
    {
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=3840&q=95',
      location: 'Yosemite Valley, California (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=3840&q=95',
      location: 'Lacul Pragser Wildsee, Dolomiți (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=3840&q=95',
      location: 'Crestele Munților Dolomiți (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=3840&q=95',
      location: 'Lacul Alpin la Răsărit (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=3840&q=95',
      location: 'Valea Verde la Apus (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=3840&q=95',
      location: 'Lacul Oglindă în Munți (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=3840&q=95',
      location: 'Vârfuri Montane în Lumina Dimineții (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=3840&q=95',
      location: 'Plajă & Ocean la Crepuscul (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=3840&q=95',
      location: 'Pod în Pădurea Seculară (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=3840&q=95',
      location: 'Cascada din Canionul Verde (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=3840&q=95',
      location: 'Vârfuri Înzăpezite sub Calea Lactee (4K) — Unsplash',
    },
    {
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=3840&q=95',
      location: 'Munții în Zorii Zilei (4K) — Unsplash',
    },
  ];

  // Colecție de gradiente minimaliste
  const MINIMAL_GRADIENTS = [
    {
      css: 'radial-gradient(circle at 20% 20%, #1e293b 0%, #0f172a 45%, #020617 100%)',
      location: 'Gradient Minimalist — Midnight Slate',
    },
    {
      css: 'linear-gradient(135deg, #064e3b 0%, #0f172a 55%, #020617 100%)',
      location: 'Gradient Minimalist — Aurora Boreală',
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

  // Palete de culori de accent (RGB triplets pentru suport Tailwind alpha)
  const ACCENT_PALETTES = {
    emerald: {
      label: 'Smarald',
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
      label: 'Albastru Celest',
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
      label: 'Violet Regal',
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
      label: 'Chihlimbar',
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
      label: 'Roz Coral',
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
      label: 'Turcoaz',
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

  // Motoare de căutare web pentru bara centrală
  const SEARCH_ENGINES = [
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=' },
    { name: 'GitHub', url: 'https://github.com/search?q=' },
  ];

  // Orașe disponibile pentru widget-ul de vreme și prognoză (Sibiu este primul și implicit)
  const WEATHER_CITIES = [
    { name: 'Sibiu', lat: 45.7983, lon: 24.1256, mockTemp: 17, mockDesc: 'Senin', mockWind: 10, mockIcon: '☀️' },
    { name: 'București', lat: 44.4268, lon: 26.1025, mockTemp: 21, mockDesc: 'Senin', mockWind: 11, mockIcon: '☀️' },
    { name: 'Cluj-Napoca', lat: 46.7712, lon: 23.6236, mockTemp: 18, mockDesc: 'Parțial noros', mockWind: 9, mockIcon: '⛅' },
    { name: 'Timișoara', lat: 45.7489, lon: 21.2087, mockTemp: 22, mockDesc: 'Senin', mockWind: 14, mockIcon: '☀️' },
    { name: 'Iași', lat: 47.1585, lon: 27.6014, mockTemp: 19, mockDesc: 'Cer variabil', mockWind: 12, mockIcon: '🌤️' },
    { name: 'Brașov', lat: 45.6427, lon: 25.5887, mockTemp: 16, mockDesc: 'Răcoros', mockWind: 8, mockIcon: '⛅' },
    { name: 'Constanța', lat: 44.1598, lon: 28.6348, mockTemp: 20, mockDesc: 'Briză ușoară', mockWind: 19, mockIcon: '🌤️' },
  ];

  // Fusuri orare predefinite pentru widget-ul Ceasuri Mondiale
  const WORLD_TIMEZONES = [
    { city: 'Sibiu / București', tz: 'Europe/Bucharest', country: 'RO' },
    { city: 'Londra', tz: 'Europe/London', country: 'UK' },
    { city: 'Paris / Berlin', tz: 'Europe/Paris', country: 'EU' },
    { city: 'New York', tz: 'America/New_York', country: 'US' },
    { city: 'Los Angeles', tz: 'America/Los_Angeles', country: 'US' },
    { city: 'Tokyo', tz: 'Asia/Tokyo', country: 'JP' },
    { city: 'Dubai', tz: 'Asia/Dubai', country: 'AE' },
    { city: 'Sydney', tz: 'Australia/Sydney', country: 'AU' },
    { city: 'UTC / GMT', tz: 'UTC', country: '🌐' },
  ];

  // Subgrupuri implicite de scurtături
  const DEFAULT_SUBGROUPS = [
    {
      id: 'sg-dev',
      title: 'Dezvoltare & AI',
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
      title: 'Zilnice & Organizare',
      collapsed: false,
      items: [
        { id: 'lnk-5', title: 'Gmail', url: 'https://mail.google.com' },
        { id: 'lnk-6', title: 'Notion', url: 'https://notion.so' },
        { id: 'lnk-7', title: 'YouTube', url: 'https://youtube.com' },
        { id: 'lnk-8', title: 'Figma', url: 'https://figma.com' },
      ],
    },
  ];

  const DEFAULT_TODOS = [
    { id: 'td-1', text: 'Planifică prioritățile principale ale zilei', completed: true, priority: 'normal', dueDate: '' },
    { id: 'td-2', text: 'Trage link-urile sau sarcinile cu mouse-ul între liste', completed: false, priority: 'high', dueDate: '' },
    { id: 'td-3', text: 'Folosește Ctrl+K pentru căutare instantanee', completed: false, priority: 'normal', dueDate: '' },
  ];

  const QUOTES = [
    '„Simplitatea este sofisticarea supremă.” — Leonardo da Vinci',
    '„Secretul de a avansa este să începi.” — Mark Twain',
    '„Concentrează-te pe a fi productiv, nu doar ocupat.” — Tim Ferriss',
    '„Calitatea nu este un act, ci un obicei.” — Aristotel',
    '„Disciplina este puntea dintre obiective și realizări.” — Jim Rohn',
    '„Nu număra zilele, fă ca zilele să conteze.” — Muhammad Ali',
  ];

  const DEFAULT_VISUAL_SETTINGS = {
    overlayDim: 22,   // % întunecare fundal
    glassOpacity: 56, // % opacitate panouri
    glassBlur: 22,    // px blur panouri
    theme: 'dark',    // 'dark' | 'light'
    accentColor: 'emerald', // 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'cyan'
    sharpBgMigrated: true,
  };

  function createInitialWidgetsForMain() {
    return [
      {
        id: 'w-links-1',
        type: 'links',
        title: 'Scurtături Rapide',
        visible: true,
        position: { x: 24, y: 12, width: 390, height: 440, zIndex: 10 },
        data: {
          viewMode: 'list',
          subgroups: structuredClone(DEFAULT_SUBGROUPS),
        },
      },
      {
        id: 'w-todo-1',
        type: 'todo',
        title: 'Lista de Sarcini',
        visible: true,
        position: { x: 436, y: 12, width: 400, height: 440, zIndex: 11 },
        data: {
          filter: 'all',
          items: structuredClone(DEFAULT_TODOS),
        },
      },
      {
        id: 'w-notes-1',
        type: 'notes',
        title: 'Notițe Rapide',
        visible: true,
        position: { x: 860, y: 12, width: 390, height: 440, zIndex: 12 },
        data: {
          previewMode: false,
          content:
            '# Idei rapide & notițe\n- [x] Comută între **Spații de Lucru** din stânga-sus\n- [ ] Adaugă panouri noi din meniul **+ Adaugă panou** (Calendar, Prognoză 5 zile, Ceasuri, Countdown)\n- [ ] Apasă pe butonul **Markdown** din acest panou pentru previzualizare interactivă!',
          lastSaved: 'Sincronizat local',
        },
      },
    ];
  }

  function createInitialWorkspaces() {
    return [
      {
        id: 'ws-main',
        name: '🏠 Principal',
        initializedLayout: false,
        widgets: createInitialWidgetsForMain(),
      },
      {
        id: 'ws-work',
        name: '💼 Muncă & Dev',
        initializedLayout: false,
        widgets: [
          {
            id: 'w-links-work-1',
            type: 'links',
            title: 'Resurse Proiecte',
            visible: true,
            position: { x: 40, y: 16, width: 410, height: 420, zIndex: 10 },
            data: {
              viewMode: 'list',
              subgroups: [
                {
                  id: 'sg-work-1',
                  title: 'Repos & Cloud',
                  collapsed: false,
                  items: [
                    { id: 'lnk-w1', title: 'GitHub', url: 'https://github.com' },
                    { id: 'lnk-w2', title: 'GitLab', url: 'https://gitlab.com' },
                    { id: 'lnk-w3', title: 'Cloudflare Dashboard', url: 'https://dash.cloudflare.com' },
                  ],
                },
                {
                  id: 'sg-work-2',
                  title: 'Documentație',
                  collapsed: false,
                  items: [
                    { id: 'lnk-w4', title: 'Tailwind CSS Docs', url: 'https://tailwindcss.com/docs' },
                    { id: 'lnk-w5', title: 'MDN JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
                  ],
                },
              ],
            },
          },
          {
            id: 'w-todo-work-1',
            type: 'todo',
            title: 'Sprint & Task-uri',
            visible: true,
            position: { x: 475, y: 16, width: 410, height: 420, zIndex: 11 },
            data: {
              filter: 'all',
              items: [
                { id: 'td-w1', text: 'Verifică pull request-urile deschise', completed: false, priority: 'high', dueDate: '' },
                { id: 'td-w2', text: 'Actualizează documentația tehnică', completed: false, priority: 'normal', dueDate: '' },
              ],
            },
          },
          {
            id: 'w-notes-work-1',
            type: 'notes',
            title: 'Jurnal Tehnic',
            visible: true,
            position: { x: 910, y: 16, width: 380, height: 420, zIndex: 12 },
            data: {
              previewMode: false,
              content: 'Notițe pentru proiectele de la muncă...',
              lastSaved: 'Sincronizat local',
            },
          },
        ],
      },
    ];
  }

  function createDefaultState() {
    return {
      userName: 'Explorator',
      dailyFocus: {
        text: '',
        completed: false,
      },
      searchEngineIndex: 0,
      weatherVisible: true,
      weatherCity: 'Sibiu',
      background: {
        mode: 'unsplash', // 'unsplash' | 'gradient' | 'custom'
        index: 0,
        customUrl: '',
      },
      visual: structuredClone(DEFAULT_VISUAL_SETTINGS),
      quoteIndex: 0,
      maxZIndex: 25,
      activeWorkspaceId: 'ws-main',
      workspaces: createInitialWorkspaces(),
    };
  }

  function ensureLinksSubgroups(widget) {
    if (widget.type !== 'links') return;
    if (!widget.data) widget.data = { viewMode: 'list', subgroups: [] };
    if (!widget.data.viewMode) widget.data.viewMode = 'list';

    if (!Array.isArray(widget.data.subgroups)) {
      const legacyItems = Array.isArray(widget.data.items) ? widget.data.items : [];
      widget.data.subgroups = [
        {
          id: `sg-${Date.now()}-1`,
          title: 'General',
          collapsed: false,
          items: legacyItems,
        },
      ];
      delete widget.data.items;
    }

    if (widget.data.subgroups.length === 0) {
      widget.data.subgroups.push({
        id: `sg-${Date.now()}-default`,
        title: 'General',
        collapsed: false,
        items: [],
      });
    }
  }

  // ==========================================================================
  // 0. INDEXEDDB PENTRU IMAGINEA DE FUNDAL LOCALĂ (FĂRĂ LIMITA DE 5 MB)
  // ==========================================================================

  let cachedIdbBgDataUrl = '';

  function openAssetsDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB indisponibil'));
        return;
      }
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveCustomBgToIDB(dataUrl) {
    cachedIdbBgDataUrl = dataUrl || '';
    try {
      const db = await openAssetsDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).put(dataUrl, IDB_BG_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    } catch (err) {
      console.warn('Nu s-a putut salva imaginea în IndexedDB:', err);
    }
  }

  async function loadCustomBgFromIDB() {
    try {
      const db = await openAssetsDB();
      const val = await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, 'readonly');
        const getReq = tx.objectStore(IDB_STORE).get(IDB_BG_KEY);
        getReq.onsuccess = () => resolve(getReq.result || '');
        getReq.onerror = () => reject(getReq.error);
      });
      db.close();
      cachedIdbBgDataUrl = typeof val === 'string' ? val : '';
      return cachedIdbBgDataUrl;
    } catch {
      return '';
    }
  }

  async function clearCustomBgFromIDB() {
    cachedIdbBgDataUrl = '';
    try {
      const db = await openAssetsDB();
      await new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE, 'readwrite');
        tx.objectStore(IDB_STORE).delete(IDB_BG_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
      db.close();
    } catch {
      // Ignoră
    }
  }

  // Starea globală pentru Drag & Drop-ul unui link sau al unei sarcini
  let draggedLinkPayload = null;
  let draggedTodoPayload = null;

  // Stiva de Undo (Anulare ștergere)
  const undoStack = [];
  let undoToastTimer = null;

  let state = loadState();

  // ==========================================================================
  // 1. PERSISTENȚA DATELOR ÎN LOCALSTORAGE, MIGRARE & UNDO (CTRL+Z)
  // ==========================================================================

  function normalizeLoadedState(parsed) {
    const def = createDefaultState();
    const normalized = {
      ...def,
      ...parsed,
      dailyFocus: { ...def.dailyFocus, ...(parsed.dailyFocus || {}) },
      background: { ...def.background, ...(parsed.background || {}) },
      visual: { ...def.visual, ...(parsed.visual || {}) },
    };

    if (!parsed.visual?.sharpBgMigrated) {
      normalized.visual.overlayDim = 22;
      normalized.visual.sharpBgMigrated = true;
    }
    if (!normalized.visual.theme) normalized.visual.theme = 'dark';
    if (!normalized.visual.accentColor || !ACCENT_PALETTES[normalized.visual.accentColor]) {
      normalized.visual.accentColor = 'emerald';
    }

    if (!Array.isArray(normalized.workspaces) || normalized.workspaces.length === 0) {
      const existingWidgets =
        Array.isArray(parsed.widgets) && parsed.widgets.length > 0
          ? parsed.widgets
          : createInitialWidgetsForMain();
      normalized.workspaces = [
        {
          id: 'ws-main',
          name: '🏠 Principal',
          initializedLayout: Boolean(parsed.widgetsInitializedLayout),
          widgets: existingWidgets,
        },
        createInitialWorkspaces()[1],
      ];
      normalized.activeWorkspaceId = 'ws-main';
    }

    normalized.workspaces.forEach((ws) => {
      if (!Array.isArray(ws.widgets)) ws.widgets = [];
      ws.widgets.forEach((w) => {
        ensureLinksSubgroups(w);
        if (w.type === 'todo' && Array.isArray(w.data?.items)) {
          w.data.items.forEach((t) => {
            if (!t.priority) t.priority = 'normal';
            if (typeof t.dueDate !== 'string') t.dueDate = '';
          });
        }
      });
    });

    if (!normalized.workspaces.some((w) => w.id === normalized.activeWorkspaceId)) {
      normalized.activeWorkspaceId = normalized.workspaces[0].id;
    }

    return normalized;
  }

  function loadState() {
    try {
      const rawV3 = localStorage.getItem(STORAGE_KEY_V3);
      if (rawV3) {
        return normalizeLoadedState(JSON.parse(rawV3));
      }

      const rawV2 = localStorage.getItem(STORAGE_KEY_V2);
      if (rawV2) {
        const parsedV2 = JSON.parse(rawV2);
        parsedV2.weatherCity = 'Sibiu';
        return normalizeLoadedState(parsedV2);
      }

      const rawV1 = localStorage.getItem(STORAGE_KEY_V1);
      if (rawV1) {
        const v1 = JSON.parse(rawV1);
        const migrated = createDefaultState();
        migrated.userName = v1.userName || migrated.userName;
        migrated.dailyFocus = v1.dailyFocus || migrated.dailyFocus;
        return migrated;
      }

      return createDefaultState();
    } catch (err) {
      console.warn('Eroare la citirea localStorage, se folosește starea implicită:', err);
      return createDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state));
    } catch (err) {
      console.error('Eroare la salvarea în localStorage:', err);
      showToast('⚠️ Spațiul localStorage este plin! Folosește imagini din PC sau descarcă un Backup JSON.');
    }
  }

  function pushUndoState(label) {
    try {
      undoStack.push({
        label,
        snapshot: JSON.stringify(state),
      });
      if (undoStack.length > 15) {
        undoStack.shift();
      }
      showUndoToast(label);
    } catch (err) {
      console.warn('Nu s-a putut salva starea pentru Undo:', err);
    }
  }

  function showUndoToast(label) {
    const undoToast = document.getElementById('undo-toast');
    const undoMsg = document.getElementById('undo-toast-msg');
    if (!undoToast || !undoMsg) return;

    undoMsg.textContent = `„${label}” a fost șters`;
    undoToast.classList.remove('hidden');
    undoToast.classList.add('flex');

    clearTimeout(undoToastTimer);
    undoToastTimer = setTimeout(() => {
      hideUndoToast();
    }, 7000);
  }

  function hideUndoToast() {
    const undoToast = document.getElementById('undo-toast');
    if (!undoToast) return;
    undoToast.classList.add('hidden');
    undoToast.classList.remove('flex');
  }

  function performUndo() {
    if (undoStack.length === 0) return;
    const last = undoStack.pop();
    if (!last) return;

    try {
      state = normalizeLoadedState(JSON.parse(last.snapshot));
      saveState();
      hideUndoToast();
      renderWorkspacesBar();
      renderAllWidgets();
      showToast(`↩ Restaurat: ${last.label}`);
    } catch (err) {
      console.error('Eroare la restaurarea Undo:', err);
    }
  }

  function getActiveWorkspace() {
    return (
      state.workspaces.find((ws) => ws.id === state.activeWorkspaceId) ||
      state.workspaces[0]
    );
  }

  function debounce(fn, delay = 260) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'translate-y-2');
    toast.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'translate-y-2');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 2800);
  }

  // ==========================================================================
  // 2. SPAȚII DE LUCRU (WORKSPACES / TAB-URI ÎN COLȚUL STÂNGA-SUS)
  // ==========================================================================

  const workspacesBarEl = document.getElementById('workspaces-bar');

  function renderWorkspacesBar() {
    workspacesBarEl.innerHTML = '';

    state.workspaces.forEach((ws) => {
      const isActive = ws.id === state.activeWorkspaceId;
      const tabWrap = document.createElement('div');
      tabWrap.className = `workspace-tab flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium cursor-pointer select-none ${
        isActive ? 'active' : ''
      }`;

      const nameSpan = document.createElement('span');
      nameSpan.textContent = ws.name;
      nameSpan.className = 'truncate max-w-[130px] rounded px-0.5 focus:outline-none';
      nameSpan.title = isActive
        ? 'Dublu-click pentru a redenumi acest spațiu de lucru'
        : `Comută la spațiul „${ws.name}”`;

      tabWrap.addEventListener('click', (e) => {
        if (e.target.closest('button') || nameSpan.isContentEditable) return;
        if (state.activeWorkspaceId !== ws.id) {
          state.activeWorkspaceId = ws.id;
          saveState();
          renderWorkspacesBar();
          const activeWs = getActiveWorkspace();
          if (!activeWs.initializedLayout) {
            activeWs.initializedLayout = true;
            autoArrangeWidgets(true);
          } else {
            renderAllWidgets();
          }
        }
      });

      // Redenumire spațiu la dublu-click
      nameSpan.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        nameSpan.contentEditable = 'true';
        nameSpan.spellcheck = false;
        nameSpan.classList.add('bg-black/40', 'ring-1', 'ring-accent-400/60', 'px-1');
        nameSpan.focus();
      });

      nameSpan.addEventListener('blur', () => {
        if (!nameSpan.isContentEditable) return;
        nameSpan.contentEditable = 'false';
        nameSpan.classList.remove('bg-black/40', 'ring-1', 'ring-accent-400/60', 'px-1');
        const cleaned = nameSpan.textContent.trim() || 'Spațiu';
        ws.name = cleaned;
        nameSpan.textContent = cleaned;
        saveState();
      });

      nameSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          nameSpan.blur();
        }
      });

      tabWrap.appendChild(nameSpan);

      // Buton ștergere pe tab-ul activ dacă există >1 spațiu
      if (isActive && state.workspaces.length > 1) {
        const delWsBtn = document.createElement('button');
        delWsBtn.type = 'button';
        delWsBtn.className =
          'ml-0.5 p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10 transition-colors';
        delWsBtn.title = 'Șterge acest spațiu de lucru';
        delWsBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        delWsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          pushUndoState(`Spațiul „${ws.name}”`);
          state.workspaces = state.workspaces.filter((item) => item.id !== ws.id);
          state.activeWorkspaceId = state.workspaces[0].id;
          saveState();
          renderWorkspacesBar();
          renderAllWidgets();
        });
        tabWrap.appendChild(delWsBtn);
      }

      workspacesBarEl.appendChild(tabWrap);
    });

    // Buton + Adaugă Spațiu de Lucru nou
    const addWsBtn = document.createElement('button');
    addWsBtn.type = 'button';
    addWsBtn.className =
      'flex items-center justify-center h-7 w-7 rounded-xl text-white/65 hover:text-white hover:bg-white/15 transition-colors';
    addWsBtn.title = 'Adaugă un Spațiu de Lucru nou (Tab nou)';
    addWsBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    `;
    addWsBtn.addEventListener('click', () => {
      const idx = state.workspaces.length + 1;
      const newWs = {
        id: `ws-${Date.now()}`,
        name: `✨ Spațiu #${idx}`,
        initializedLayout: false,
        widgets: [
          {
            id: `w-links-${Date.now()}`,
            type: 'links',
            title: 'Scurtături',
            visible: true,
            position: { x: 40, y: 16, width: 400, height: 420, zIndex: ++state.maxZIndex },
            data: {
              viewMode: 'list',
              subgroups: [
                {
                  id: `sg-${Date.now()}`,
                  title: 'General',
                  collapsed: false,
                  items: [
                    { id: `lnk-${Date.now()}`, title: 'Google', url: 'https://google.com' },
                  ],
                },
              ],
            },
          },
          {
            id: `w-notes-${Date.now() + 1}`,
            type: 'notes',
            title: 'Notițe',
            visible: true,
            position: { x: 465, y: 16, width: 400, height: 420, zIndex: ++state.maxZIndex },
            data: {
              previewMode: false,
              content: '',
              lastSaved: 'Nou creat',
            },
          },
        ],
      };

      state.workspaces.push(newWs);
      state.activeWorkspaceId = newWs.id;
      newWs.initializedLayout = true;
      saveState();
      renderWorkspacesBar();
      autoArrangeWidgets(true);
      showToast(`Spațiul „${newWs.name}” a fost creat!`);
    });

    workspacesBarEl.appendChild(addWsBtn);
  }

  // ==========================================================================
  // 3. CEAS DIGITAL (24H), DATĂ, NUMĂRUL SĂPTĂMÂNII (WEEK NUMBER) ȘI SALUT
  // ==========================================================================

  const clockTimeEl = document.getElementById('clock-time');
  const clockSecondsEl = document.getElementById('clock-seconds');
  const clockDateEl = document.getElementById('clock-date');
  const clockWeekEl = document.getElementById('clock-week');
  const greetingTextEl = document.getElementById('greeting-text');
  const userNameEl = document.getElementById('user-name');

  // Calculează numărul săptămânii conform standardului european ISO 8601 (Luni = prima zi)
  function getISOWeekNumber(date) {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    return Math.ceil(((tempDate - yearStart) / 86400000 + 1) / 7);
  }

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockTimeEl.textContent = `${hours}:${minutes}`;
    clockSecondsEl.textContent = seconds;

    const dateFormatter = new Intl.DateTimeFormat('ro-RO', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    clockDateEl.textContent = dateFormatter.format(now);

    if (clockWeekEl) {
      const weekNo = getISOWeekNumber(now);
      clockWeekEl.textContent = `Săptămâna ${weekNo}`;
    }

    const hr = now.getHours();
    if (hr >= 5 && hr < 12) {
      greetingTextEl.textContent = 'Bună dimineața';
    } else if (hr >= 12 && hr < 18) {
      greetingTextEl.textContent = 'Bună ziua';
    } else {
      greetingTextEl.textContent = 'Bună seara';
    }

    updateWorldClocksInDom(now);
  }

  function initGreetingAndFocus() {
    userNameEl.textContent = state.userName || 'Explorator';

    userNameEl.addEventListener('blur', () => {
      const cleaned = userNameEl.textContent.trim() || 'Explorator';
      state.userName = cleaned;
      userNameEl.textContent = cleaned;
      saveState();
    });

    userNameEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        userNameEl.blur();
      }
    });
  }

  // ==========================================================================
  // 4. CĂUTARE RAPIDĂ GLOBALĂ (CTRL+K SAU /) + CĂUTARE WEB
  // ==========================================================================

  const searchEngineBtn = document.getElementById('search-engine-btn');
  const globalSearchInput = document.getElementById('global-search-input');
  const globalSearchResults = document.getElementById('global-search-results');

  function getActiveSearchEngine() {
    return SEARCH_ENGINES[(state.searchEngineIndex || 0) % SEARCH_ENGINES.length];
  }

  function collectSearchMatches(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results = [];

    state.workspaces.forEach((ws) => {
      ws.widgets.forEach((w) => {
        if (w.type === 'links' && Array.isArray(w.data?.subgroups)) {
          w.data.subgroups.forEach((sg) => {
            (sg.items || []).forEach((lnk) => {
              if (
                lnk.title.toLowerCase().includes(q) ||
                lnk.url.toLowerCase().includes(q) ||
                sg.title.toLowerCase().includes(q)
              ) {
                results.push({
                  kind: 'link',
                  title: lnk.title,
                  subtitle: `${ws.name} › ${w.title} › ${sg.title}`,
                  url: lnk.url,
                  workspaceId: ws.id,
                  widgetId: w.id,
                });
              }
            });
          });
        } else if (w.type === 'todo' && Array.isArray(w.data?.items)) {
          w.data.items.forEach((td) => {
            if (td.text.toLowerCase().includes(q)) {
              results.push({
                kind: 'todo',
                title: td.text,
                subtitle: `${ws.name} › ${w.title} (${td.completed ? 'Finalizată' : 'Activă'})`,
                workspaceId: ws.id,
                widgetId: w.id,
              });
            }
          });
        } else if (w.type === 'notes' && typeof w.data?.content === 'string') {
          if (
            w.data.content.toLowerCase().includes(q) ||
            w.title.toLowerCase().includes(q)
          ) {
            const snippet = w.data.content.replace(/[#*`>-]/g, '').trim().slice(0, 70) || 'Notiță';
            results.push({
              kind: 'notes',
              title: `${w.title}: ${snippet}`,
              subtitle: `${ws.name} › Notiță`,
              workspaceId: ws.id,
              widgetId: w.id,
            });
          }
        } else if (w.type === 'countdown' && Array.isArray(w.data?.items)) {
          w.data.items.forEach((ev) => {
            if (ev.title.toLowerCase().includes(q)) {
              results.push({
                kind: 'countdown',
                title: `${ev.title} (${ev.targetDate})`,
                subtitle: `${ws.name} › ${w.title}`,
                workspaceId: ws.id,
                widgetId: w.id,
              });
            }
          });
        }
      });
    });

    return results.slice(0, 12);
  }

  function renderGlobalSearchResults() {
    const query = globalSearchInput.value.trim();
    if (!query) {
      globalSearchResults.classList.add('hidden');
      globalSearchResults.innerHTML = '';
      return;
    }

    const matches = collectSearchMatches(query);
    const engine = getActiveSearchEngine();
    globalSearchResults.innerHTML = '';
    globalSearchResults.classList.remove('hidden');

    if (matches.length > 0) {
      const sectionLabel = document.createElement('div');
      sectionLabel.className =
        'px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/45';
      sectionLabel.textContent = 'Găsite în Dashboard';
      globalSearchResults.appendChild(sectionLabel);

      matches.forEach((m) => {
        const itemBtn = document.createElement('button');
        itemBtn.type = 'button';
        itemBtn.className =
          'w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-left transition-colors';

        const badge =
          m.kind === 'link'
            ? '🔗'
            : m.kind === 'todo'
            ? '✅'
            : m.kind === 'countdown'
            ? '⏳'
            : '📝';

        itemBtn.innerHTML = `
          <div class="min-w-0 flex-1">
            <div class="text-xs font-medium text-white truncate">${badge} ${escapeHtml(m.title)}</div>
            <div class="text-[10px] text-white/45 truncate">${escapeHtml(m.subtitle)}</div>
          </div>
          <span class="text-[10px] text-sky-300 shrink-0">${
            m.kind === 'link' ? 'Deschide ↗' : 'Salt la panou →'
          }</span>
        `;

        itemBtn.addEventListener('click', () => {
          globalSearchResults.classList.add('hidden');
          globalSearchInput.value = '';
          if (m.kind === 'link') {
            window.open(m.url, '_blank', 'noopener,noreferrer');
          } else {
            focusWidgetById(m.workspaceId, m.widgetId);
          }
        });

        globalSearchResults.appendChild(itemBtn);
      });
    }

    // Rând căutare directă pe Web
    const webBtn = document.createElement('button');
    webBtn.type = 'button';
    webBtn.className =
      'w-full mt-1 flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/25 text-left transition-colors';
    webBtn.innerHTML = `
      <span class="text-xs text-sky-200 truncate">🌐 Caută <strong>„${escapeHtml(query)}”</strong> pe ${escapeHtml(engine.name)}</span>
      <span class="text-[10px] font-mono text-sky-300 shrink-0">Enter ↵</span>
    `;
    webBtn.addEventListener('click', () => {
      window.open(`${engine.url}${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
      globalSearchResults.classList.add('hidden');
      globalSearchInput.value = '';
    });

    globalSearchResults.appendChild(webBtn);
  }

  function focusWidgetById(workspaceId, widgetId) {
    if (state.activeWorkspaceId !== workspaceId) {
      state.activeWorkspaceId = workspaceId;
      renderWorkspacesBar();
    }
    const ws = getActiveWorkspace();
    const targetWidget = ws.widgets.find((w) => w.id === widgetId);
    if (!targetWidget) return;

    targetWidget.visible = true;
    targetWidget.position.zIndex = ++state.maxZIndex;
    saveState();
    renderAllWidgets();

    const domCard = document.querySelector(`[data-widget-id="${widgetId}"]`);
    if (domCard) {
      domCard.classList.add('widget-pulse-highlight');
      domCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function initGlobalSearchAndShortcuts() {
    searchEngineBtn.textContent = getActiveSearchEngine().name;

    searchEngineBtn.addEventListener('click', () => {
      state.searchEngineIndex = ((state.searchEngineIndex || 0) + 1) % SEARCH_ENGINES.length;
      searchEngineBtn.textContent = getActiveSearchEngine().name;
      saveState();
      if (globalSearchInput.value.trim()) {
        renderGlobalSearchResults();
      }
    });

    globalSearchInput.addEventListener('input', renderGlobalSearchResults);
    globalSearchInput.addEventListener('focus', () => {
      if (globalSearchInput.value.trim()) renderGlobalSearchResults();
    });

    globalSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        globalSearchResults.classList.add('hidden');
        globalSearchInput.blur();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const query = globalSearchInput.value.trim();
        if (!query) return;
        const matches = collectSearchMatches(query);
        const firstLink = matches.find((m) => m.kind === 'link');
        if (firstLink) {
          window.open(firstLink.url, '_blank', 'noopener,noreferrer');
        } else {
          const engine = getActiveSearchEngine();
          window.open(`${engine.url}${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
        }
        globalSearchResults.classList.add('hidden');
        globalSearchInput.value = '';
      }
    });

    const undoBtn = document.getElementById('undo-toast-btn');
    if (undoBtn) {
      undoBtn.addEventListener('click', performUndo);
    }

    // Scurtături tastatură globale: Ctrl+K, '/' și Ctrl+Z pentru Undo
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        globalSearchInput.focus();
        globalSearchInput.select();
        return;
      }

      const tag = (e.target.tagName || '').toLowerCase();
      const isTyping =
        tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;

      if (!isTyping && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (undoStack.length > 0) {
          e.preventDefault();
          performUndo();
          return;
        }
      }

      if (!isTyping && e.key === '/') {
        e.preventDefault();
        globalSearchInput.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (
        !globalSearchResults.contains(e.target) &&
        e.target !== globalSearchInput &&
        e.target !== searchEngineBtn
      ) {
        globalSearchResults.classList.add('hidden');
      }
    });
  }

  // ==========================================================================
  // 5. EXPORT & IMPORT BACKUP (.JSON) + IMPORT BOOKMARK-URI BROWSER (.HTML)
  // ==========================================================================

  const backupMenuBtn = document.getElementById('backup-menu-btn');
  const backupPopover = document.getElementById('backup-popover');
  const exportJsonBtn = document.getElementById('export-json-btn');
  const importJsonInput = document.getElementById('import-json-input');
  const importBookmarksInput = document.getElementById('import-bookmarks-input');

  function parseNetscapeBookmarksHtml(htmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const subgroups = [];
    const looseLinks = [];

    const folders = doc.querySelectorAll('dt > h3');
    folders.forEach((h3) => {
      const folderTitle = (h3.textContent || '').trim() || 'Folder';
      const parentDt = h3.parentElement;
      const dl = parentDt?.querySelector(':scope > dl') || h3.nextElementSibling;
      if (!dl || dl.tagName.toLowerCase() !== 'dl') return;

      const directAnchors = dl.querySelectorAll(':scope > dt > a, :scope > a');
      const items = [];
      directAnchors.forEach((a) => {
        const href = (a.getAttribute('href') || '').trim();
        if (!href || href.startsWith('place:') || href.startsWith('javascript:')) return;
        const title = (a.textContent || '').trim() || extractDomain(href);
        items.push({
          id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: title.slice(0, 48),
          url: href,
        });
      });

      if (items.length > 0) {
        subgroups.push({
          id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          title: folderTitle.slice(0, 32),
          collapsed: false,
          items,
        });
      }
    });

    // Dacă nu au fost găsite foldere structurate sau există link-uri în afara folderelor
    if (subgroups.length === 0) {
      doc.querySelectorAll('a[href]').forEach((a) => {
        const href = (a.getAttribute('href') || '').trim();
        if (!href || href.startsWith('place:') || href.startsWith('javascript:')) return;
        const title = (a.textContent || '').trim() || extractDomain(href);
        looseLinks.push({
          id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: title.slice(0, 48),
          url: href,
        });
      });
    }

    if (looseLinks.length > 0) {
      subgroups.push({
        id: `sg-${Date.now()}-loose`,
        title: 'Marcaje Importate',
        collapsed: false,
        items: looseLinks,
      });
    }

    return subgroups;
  }

  function initBackupControls() {
    backupMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      widgetsManagerPopover.classList.add('hidden');
      const addWidgetPopover = document.getElementById('add-widget-popover');
      if (addWidgetPopover) addWidgetPopover.classList.add('hidden');
      backupPopover.classList.toggle('hidden');
    });

    exportJsonBtn.addEventListener('click', async () => {
      const exportPayload = structuredClone(state);
      if (exportPayload.background?.customUrl === IDB_MARKER && cachedIdbBgDataUrl) {
        exportPayload.customBgDataUrl = cachedIdbBgDataUrl;
      }

      const dataStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const dateStr = new Date().toISOString().slice(0, 10);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      backupPopover.classList.add('hidden');
      showToast('✓ Backup JSON descărcat cu succes!');
    });

    importJsonInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const parsed = JSON.parse(String(ev.target?.result || '{}'));
          if (parsed.customBgDataUrl && typeof parsed.customBgDataUrl === 'string') {
            await saveCustomBgToIDB(parsed.customBgDataUrl);
            delete parsed.customBgDataUrl;
            if (parsed.background) parsed.background.customUrl = IDB_MARKER;
          } else if (parsed.background?.customUrl?.startsWith('data:')) {
            await saveCustomBgToIDB(parsed.background.customUrl);
            parsed.background.customUrl = IDB_MARKER;
          }

          state = normalizeLoadedState(parsed);
          saveState();

          initGreetingAndFocus();
          applyVisualSettings();
          applyBackground();
          updateWeather();
          renderWorkspacesBar();
          renderAllWidgets();
          renderQuote();

          backupPopover.classList.add('hidden');
          showToast('✓ Backup importat și restaurat cu succes!');
        } catch (err) {
          console.error('Fișier JSON invalid:', err);
          showToast('⚠️ Eroare: Fișierul JSON nu este valid.');
        } finally {
          importJsonInput.value = '';
        }
      };
      reader.readAsText(file);
    });

    if (importBookmarksInput) {
      importBookmarksInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const htmlText = String(ev.target?.result || '');
            const importedSubgroups = parseNetscapeBookmarksHtml(htmlText);

            if (importedSubgroups.length === 0) {
              showToast('⚠️ Nu s-au găsit bookmark-uri valide în fișierul HTML.');
              return;
            }

            const totalLinks = importedSubgroups.reduce((acc, sg) => acc + sg.items.length, 0);
            const activeWs = getActiveWorkspace();
            const position = computeNewWidgetPosition();

            activeWs.widgets.push({
              id: `w-links-bm-${Date.now()}`,
              type: 'links',
              title: 'Marcaje Browser',
              visible: true,
              position: { ...position, width: 410, height: 450 },
              data: {
                viewMode: 'list',
                subgroups: importedSubgroups,
              },
            });

            saveState();
            renderAllWidgets();
            backupPopover.classList.add('hidden');
            showToast(
              `✓ S-au importat ${totalLinks} link-uri în ${importedSubgroups.length} subgrupuri!`
            );
          } catch (err) {
            console.error('Eroare la importul de bookmark-uri:', err);
            showToast('⚠️ Fișierul de bookmark-uri nu a putut fi citit.');
          } finally {
            importBookmarksInput.value = '';
          }
        };
        reader.readAsText(file);
      });
    }

    document.addEventListener('click', (e) => {
      if (!backupPopover.contains(e.target) && !backupMenuBtn.contains(e.target)) {
        backupPopover.classList.add('hidden');
      }
    });
  }

  // ==========================================================================
  // 6. SISTEMUL MULTI-WIDGET CU MUTARE ORIUNDE & DRAG-AND-DROP
  // ==========================================================================

  const canvasEl = document.getElementById('widgets-canvas');
  const widgetsCountBadge = document.getElementById('widgets-count-badge');
  const widgetsManagerBtn = document.getElementById('widgets-manager-btn');
  const widgetsManagerPopover = document.getElementById('widgets-manager-popover');
  const widgetsManagerList = document.getElementById('widgets-manager-list');
  const showAllWidgetsBtn = document.getElementById('show-all-widgets-btn');
  const autoArrangeBtn = document.getElementById('auto-arrange-btn');

  function autoArrangeWidgets(shouldSave = true) {
    const activeWs = getActiveWorkspace();
    const canvasWidth = Math.max(canvasEl.clientWidth || window.innerWidth - 80, 360);
    const visibleWidgets = activeWs.widgets.filter((w) => w.visible);
    if (visibleWidgets.length === 0) return;

    const gap = 22;
    const maxCols = canvasWidth >= 1280 ? 3 : canvasWidth >= 820 ? 2 : 1;
    const cols = Math.min(maxCols, visibleWidgets.length);
    const colWidth = Math.min(440, Math.floor((canvasWidth - gap * (cols - 1)) / cols));
    const totalGridWidth = cols * colWidth + (cols - 1) * gap;
    const startX = Math.max(0, Math.floor((canvasWidth - totalGridWidth) / 2));

    const colHeights = new Array(cols).fill(8);

    visibleWidgets.forEach((widget) => {
      // Alege coloana cea mai scurtă pentru o așezare echilibrată
      let shortestCol = 0;
      for (let i = 1; i < cols; i++) {
        if (colHeights[i] < colHeights[shortestCol]) {
          shortestCol = i;
        }
      }

      const x = startX + shortestCol * (colWidth + gap);
      const y = colHeights[shortestCol];
      const h = widget.position?.height || 420;

      widget.position = {
        x,
        y,
        width: colWidth,
        height: h,
        zIndex: ++state.maxZIndex,
      };

      colHeights[shortestCol] += h + gap;
    });

    updateCanvasMinHeight();
    if (shouldSave) saveState();
    renderAllWidgets();
  }

  function updateCanvasMinHeight() {
    const activeWs = getActiveWorkspace();
    let maxBottom = 520;
    activeWs.widgets.forEach((w) => {
      if (!w.visible) return;
      const bottom = (w.position?.y || 0) + (w.position?.height || 420) + 40;
      if (bottom > maxBottom) maxBottom = bottom;
    });
    canvasEl.style.minHeight = `${maxBottom}px`;
  }

  function bringToFront(widget, domEl) {
    state.maxZIndex = (state.maxZIndex || 25) + 1;
    widget.position.zIndex = state.maxZIndex;
    if (domEl) {
      domEl.style.zIndex = String(widget.position.zIndex);
    }
  }

  function attachDragBehavior(widget, cardEl, handleEl) {
    handleEl.addEventListener('pointerdown', (e) => {
      if (
        e.target.closest('button') ||
        e.target.closest('input') ||
        e.target.closest('select') ||
        e.target.closest('[contenteditable="true"]')
      ) {
        return;
      }

      e.preventDefault();
      bringToFront(widget, cardEl);

      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startX = widget.position.x || 0;
      const startY = widget.position.y || 0;

      cardEl.classList.add('is-dragging');
      handleEl.setPointerCapture(e.pointerId);

      const onPointerMove = (moveEvent) => {
        const dx = moveEvent.clientX - startMouseX;
        const dy = moveEvent.clientY - startMouseY;

        const canvasWidth = canvasEl.clientWidth || window.innerWidth;
        const maxX = Math.max(0, canvasWidth - Math.min(widget.position.width || 320, 180));

        const nextX = Math.max(-20, Math.min(maxX, Math.round(startX + dx)));
        const nextY = Math.max(-210, Math.round(startY + dy));

        widget.position.x = nextX;
        widget.position.y = nextY;

        cardEl.style.left = `${nextX}px`;
        cardEl.style.top = `${nextY}px`;
      };

      const onPointerUp = (upEvent) => {
        cardEl.classList.remove('is-dragging');
        if (handleEl.hasPointerCapture(upEvent.pointerId)) {
          handleEl.releasePointerCapture(upEvent.pointerId);
        }
        handleEl.removeEventListener('pointermove', onPointerMove);
        handleEl.removeEventListener('pointerup', onPointerUp);
        handleEl.removeEventListener('pointercancel', onPointerUp);
        updateCanvasMinHeight();
        saveState();
      };

      handleEl.addEventListener('pointermove', onPointerMove);
      handleEl.addEventListener('pointerup', onPointerUp);
      handleEl.addEventListener('pointercancel', onPointerUp);
    });
  }

  function attachResizeBehavior(widget, cardEl, resizeEl) {
    resizeEl.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      e.stopPropagation();
      bringToFront(widget, cardEl);

      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startW = widget.position.width || 390;
      const startH = widget.position.height || 430;

      cardEl.classList.add('is-dragging');
      resizeEl.setPointerCapture(e.pointerId);

      const onPointerMove = (moveEvent) => {
        const dw = moveEvent.clientX - startMouseX;
        const dh = moveEvent.clientY - startMouseY;

        const nextW = Math.max(280, Math.min(920, Math.round(startW + dw)));
        const nextH = Math.max(220, Math.min(900, Math.round(startH + dh)));

        widget.position.width = nextW;
        widget.position.height = nextH;

        cardEl.style.width = `${nextW}px`;
        cardEl.style.height = `${nextH}px`;
      };

      const onPointerUp = (upEvent) => {
        cardEl.classList.remove('is-dragging');
        if (resizeEl.hasPointerCapture(upEvent.pointerId)) {
          resizeEl.releasePointerCapture(upEvent.pointerId);
        }
        resizeEl.removeEventListener('pointermove', onPointerMove);
        resizeEl.removeEventListener('pointerup', onPointerUp);
        resizeEl.removeEventListener('pointercancel', onPointerUp);
        updateCanvasMinHeight();
        saveState();
      };

      resizeEl.addEventListener('pointermove', onPointerMove);
      resizeEl.addEventListener('pointerup', onPointerUp);
      resizeEl.addEventListener('pointercancel', onPointerUp);
    });
  }

  // Mută un link tras cu mouse-ul (Drag & Drop) în subgrupul/poziția țintă
  function moveLinkViaDragDrop(targetWidgetId, targetSubgroupId, targetLinkId = null) {
    if (!draggedLinkPayload) return;
    const { sourceWidgetId, sourceSubgroupId, linkId } = draggedLinkPayload;
    if (
      sourceWidgetId === targetWidgetId &&
      sourceSubgroupId === targetSubgroupId &&
      linkId === targetLinkId
    ) {
      return;
    }

    const activeWs = getActiveWorkspace();
    const srcWidget = activeWs.widgets.find((w) => w.id === sourceWidgetId);
    const dstWidget = activeWs.widgets.find((w) => w.id === targetWidgetId);
    if (!srcWidget || !dstWidget) return;

    const srcSg = srcWidget.data?.subgroups?.find((s) => s.id === sourceSubgroupId);
    const dstSg = dstWidget.data?.subgroups?.find((s) => s.id === targetSubgroupId);
    if (!srcSg || !dstSg) return;

    const linkIdx = srcSg.items.findIndex((item) => item.id === linkId);
    if (linkIdx === -1) return;

    const [movedLink] = srcSg.items.splice(linkIdx, 1);
    dstSg.collapsed = false;

    if (targetLinkId) {
      const dstIdx = dstSg.items.findIndex((item) => item.id === targetLinkId);
      if (dstIdx !== -1) {
        dstSg.items.splice(dstIdx, 0, movedLink);
      } else {
        dstSg.items.push(movedLink);
      }
    } else {
      dstSg.items.push(movedLink);
    }

    draggedLinkPayload = null;
    saveState();
    renderAllWidgets();
  }

  // Mută o sarcină To-Do trasă cu mouse-ul în aceeași listă sau în alt panou To-Do
  function moveTodoViaDragDrop(targetWidgetId, targetTodoId = null) {
    if (!draggedTodoPayload) return;
    const { sourceWidgetId, todoId } = draggedTodoPayload;
    if (sourceWidgetId === targetWidgetId && todoId === targetTodoId) return;

    const activeWs = getActiveWorkspace();
    const srcWidget = activeWs.widgets.find((w) => w.id === sourceWidgetId);
    const dstWidget = activeWs.widgets.find((w) => w.id === targetWidgetId);
    if (!srcWidget || !dstWidget || srcWidget.type !== 'todo' || dstWidget.type !== 'todo') return;

    const srcItems = srcWidget.data?.items || [];
    const dstItems = dstWidget.data?.items || [];
    const srcIdx = srcItems.findIndex((t) => t.id === todoId);
    if (srcIdx === -1) return;

    const [movedTodo] = srcItems.splice(srcIdx, 1);
    if (targetTodoId) {
      const dstIdx = dstItems.findIndex((t) => t.id === targetTodoId);
      if (dstIdx !== -1) {
        dstItems.splice(dstIdx, 0, movedTodo);
      } else {
        dstItems.push(movedTodo);
      }
    } else {
      dstItems.push(movedTodo);
    }

    draggedTodoPayload = null;
    saveState();
    renderAllWidgets();
  }

  // ==========================================================================
  // 7. RANDAREA TUTUROR CELOR 7 TIPURI DE WIDGET-URI
  // ==========================================================================

  function normalizeUrl(rawUrl) {
    const trimmed = (rawUrl || '').trim();
    if (!trimmed) return 'https://example.com';
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  }

  function extractDomain(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return 'example.com';
    }
  }

  function createWidgetHeader(widget, badgeColorClass, iconSvg, extraActionsFragment) {
    const header = document.createElement('div');
    header.className =
      'widget-drag-handle flex items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/10 select-none';

    const left = document.createElement('div');
    left.className = 'flex items-center gap-2 min-w-0 flex-1';

    const iconBox = document.createElement('div');
    iconBox.className = `flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${badgeColorClass}`;
    iconBox.innerHTML = iconSvg;

    const titleWrap = document.createElement('div');
    titleWrap.className = 'min-w-0 flex-1';

    const titleEl = document.createElement('h2');
    titleEl.contentEditable = 'true';
    titleEl.spellcheck = false;
    titleEl.className =
      'text-xs sm:text-sm font-semibold tracking-wide text-white truncate rounded px-1 -mx-1 hover:bg-white/10 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-accent-400/60 cursor-text transition-colors';
    titleEl.title = 'Click pentru a redenumi acest panou';
    titleEl.textContent = widget.title;

    titleEl.addEventListener('blur', () => {
      const val = titleEl.textContent.trim() || 'Panou';
      widget.title = val;
      titleEl.textContent = val;
      saveState();
      renderWidgetsManagerList();
    });

    titleEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        titleEl.blur();
      }
    });

    titleWrap.appendChild(titleEl);
    left.appendChild(iconBox);
    left.appendChild(titleWrap);

    const right = document.createElement('div');
    right.className = 'flex items-center gap-1 shrink-0';

    if (extraActionsFragment) {
      right.appendChild(extraActionsFragment);
    }

    const hideBtn = document.createElement('button');
    hideBtn.type = 'button';
    hideBtn.className =
      'p-1 rounded-lg text-white/45 hover:text-white hover:bg-white/10 transition-colors';
    hideBtn.title = 'Ascunde panoul (îl poți reafișa din meniul Panouri)';
    hideBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    `;
    hideBtn.addEventListener('click', () => {
      widget.visible = false;
      saveState();
      renderAllWidgets();
    });

    const deleteWidgetBtn = document.createElement('button');
    deleteWidgetBtn.type = 'button';
    deleteWidgetBtn.className =
      'p-1 rounded-lg text-white/45 hover:text-rose-300 hover:bg-rose-500/15 transition-colors';
    deleteWidgetBtn.title = 'Șterge acest panou (poți anula cu Ctrl+Z)';
    deleteWidgetBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    `;
    deleteWidgetBtn.addEventListener('click', () => {
      pushUndoState(`Panoul „${widget.title}”`);
      const activeWs = getActiveWorkspace();
      activeWs.widgets = activeWs.widgets.filter((w) => w.id !== widget.id);
      saveState();
      renderAllWidgets();
    });

    right.appendChild(hideBtn);
    right.appendChild(deleteWidgetBtn);

    header.appendChild(left);
    header.appendChild(right);

    return header;
  }

  // -------------------- A. WIDGET SCURTĂTURI RAPIDE (SUBGRUPURI, EDITARE & DRAG-DROP LINK-URI) --------------------
  function buildLinksWidgetContent(widget, cardEl) {
    ensureLinksSubgroups(widget);
    const subgroups = widget.data.subgroups;
    const viewMode = widget.data.viewMode || 'list';

    const actionsFrag = document.createDocumentFragment();

    const toggleLayoutBtn = document.createElement('button');
    toggleLayoutBtn.type = 'button';
    toggleLayoutBtn.className =
      'p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors';
    toggleLayoutBtn.title =
      viewMode === 'list'
        ? 'Mod curent: Listă compactă unul sub altul (Click pentru Grilă)'
        : 'Mod curent: Grilă (Click pentru Listă compactă unul sub altul)';
    toggleLayoutBtn.innerHTML =
      viewMode === 'list'
        ? `<svg class="w-3.5 h-3.5 text-sky-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
           </svg>`
        : `<svg class="w-3.5 h-3.5 text-sky-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
           </svg>`;

    toggleLayoutBtn.addEventListener('click', () => {
      widget.data.viewMode = viewMode === 'list' ? 'grid' : 'list';
      saveState();
      renderAllWidgets();
    });

    const addSubgroupBtn = document.createElement('button');
    addSubgroupBtn.type = 'button';
    addSubgroupBtn.className =
      'flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 px-2 py-1 text-[11px] font-medium text-white/90 transition-colors';
    addSubgroupBtn.title = 'Adaugă un subgrup nou în interiorul acestui grup';
    addSubgroupBtn.innerHTML = `
      <svg class="w-3 h-3 text-sky-300" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <span>+ Subgrup</span>
    `;

    const addLinkBtn = document.createElement('button');
    addLinkBtn.type = 'button';
    addLinkBtn.className =
      'flex items-center gap-1 rounded-lg bg-sky-400/20 hover:bg-sky-400/30 border border-sky-400/30 px-2 py-1 text-[11px] font-medium text-sky-200 transition-colors';
    addLinkBtn.title = 'Adaugă un link nou';
    addLinkBtn.innerHTML = `
      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <span>Link</span>
    `;

    actionsFrag.appendChild(toggleLayoutBtn);
    actionsFrag.appendChild(addSubgroupBtn);
    actionsFrag.appendChild(addLinkBtn);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-sky-400/15 text-sky-300 border-sky-400/25',
      iconSvg,
      actionsFrag
    );

    // Formular adăugare Subgrup
    const subgroupForm = document.createElement('form');
    subgroupForm.className =
      'hidden mb-2.5 rounded-xl bg-black/40 border border-white/15 p-2.5 flex items-center gap-1.5';
    subgroupForm.innerHTML = `
      <input
        type="text"
        name="sgTitle"
        required
        maxlength="32"
        placeholder="Nume subgrup (ex: Servere, Social, Dev)..."
        class="flex-1 rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:border-sky-400 focus:outline-none select-text"
      />
      <button type="submit" class="rounded-lg bg-sky-500 hover:bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Creează</button>
      <button type="button" data-cancel-sg class="rounded-lg px-2 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10">✕</button>
    `;

    addSubgroupBtn.addEventListener('click', () => {
      linkForm.classList.add('hidden');
      subgroupForm.classList.toggle('hidden');
      if (!subgroupForm.classList.contains('hidden')) {
        subgroupForm.querySelector('input[name="sgTitle"]').focus();
      }
    });

    subgroupForm.querySelector('[data-cancel-sg]').addEventListener('click', () => {
      subgroupForm.reset();
      subgroupForm.classList.add('hidden');
    });

    subgroupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = subgroupForm.querySelector('input[name="sgTitle"]');
      const title = input.value.trim();
      if (!title) return;

      subgroups.push({
        id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        title,
        collapsed: false,
        items: [],
      });
      saveState();
      renderAllWidgets();
    });

    // Formular Adăugare / Editare Link
    let editingLinkContext = null;

    const linkForm = document.createElement('form');
    linkForm.className =
      'hidden mb-2.5 rounded-xl bg-black/40 border border-white/15 p-2.5 space-y-2';

    const sgOptionsHtml = subgroups
      .map(
        (sg) =>
          `<option value="${escapeHtml(sg.id)}" class="bg-slate-900 text-white">${escapeHtml(
            sg.title
          )}</option>`
      )
      .join('');

    linkForm.innerHTML = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        <input
          type="text"
          name="title"
          required
          maxlength="42"
          placeholder="Titlu (ex: GitHub)"
          class="w-full rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:border-sky-400 focus:outline-none select-text"
        />
        <select
          name="subgroupId"
          class="w-full rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs text-white focus:border-sky-400 focus:outline-none"
          title="Alege subgrupul"
        >
          ${sgOptionsHtml}
        </select>
      </div>
      <div class="flex items-center gap-1.5">
        <input
          type="text"
          name="url"
          required
          placeholder="URL (ex: github.com sau https://...)"
          class="flex-1 rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:border-sky-400 focus:outline-none select-text"
        />
        <button type="button" data-cancel-lnk class="rounded-lg px-2 py-1 text-xs text-white/65 hover:text-white hover:bg-white/10">Anulează</button>
        <button type="submit" data-submit-lnk class="rounded-lg bg-sky-500 hover:bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Salvează</button>
      </div>
    `;

    const openLinkFormForSubgroup = (targetSgId, editData = null) => {
      subgroupForm.classList.add('hidden');
      linkForm.classList.remove('hidden');
      const titleInput = linkForm.querySelector('input[name="title"]');
      const urlInput = linkForm.querySelector('input[name="url"]');
      const selectEl = linkForm.querySelector('select[name="subgroupId"]');
      const submitBtn = linkForm.querySelector('[data-submit-lnk]');

      if (editData) {
        editingLinkContext = { linkId: editData.link.id, sourceSgId: targetSgId };
        titleInput.value = editData.link.title;
        urlInput.value = editData.link.url;
        if (selectEl) selectEl.value = targetSgId;
        submitBtn.textContent = 'Actualizează';
      } else {
        editingLinkContext = null;
        linkForm.reset();
        if (targetSgId && selectEl) selectEl.value = targetSgId;
        submitBtn.textContent = 'Salvează';
      }
      titleInput.focus();
    };

    addLinkBtn.addEventListener('click', () => {
      editingLinkContext = null;
      linkForm.querySelector('[data-submit-lnk]').textContent = 'Salvează';
      subgroupForm.classList.add('hidden');
      linkForm.classList.toggle('hidden');
      if (!linkForm.classList.contains('hidden')) {
        linkForm.querySelector('input[name="title"]').focus();
      }
    });

    linkForm.querySelector('[data-cancel-lnk]').addEventListener('click', () => {
      editingLinkContext = null;
      linkForm.reset();
      linkForm.classList.add('hidden');
    });

    linkForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = linkForm.querySelector('input[name="title"]').value.trim();
      const url = normalizeUrl(linkForm.querySelector('input[name="url"]').value);
      const sgId = linkForm.querySelector('select[name="subgroupId"]').value;
      if (!title) return;

      const targetSg = subgroups.find((s) => s.id === sgId) || subgroups[0];
      targetSg.collapsed = false;

      if (editingLinkContext) {
        const oldSg = subgroups.find((s) => s.id === editingLinkContext.sourceSgId);
        const existingIdx = oldSg
          ? oldSg.items.findIndex((i) => i.id === editingLinkContext.linkId)
          : -1;

        if (existingIdx !== -1) {
          const updatedItem = {
            ...oldSg.items[existingIdx],
            title,
            url,
          };
          if (oldSg.id === targetSg.id) {
            oldSg.items[existingIdx] = updatedItem;
          } else {
            oldSg.items.splice(existingIdx, 1);
            targetSg.items.push(updatedItem);
          }
        }
        editingLinkContext = null;
      } else {
        targetSg.items.push({
          id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          title,
          url,
        });
      }

      saveState();
      renderAllWidgets();
    });

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1';

    let totalLinksCount = 0;

    subgroups.forEach((sg, sgIdx) => {
      const items = Array.isArray(sg.items) ? sg.items : [];
      totalLinksCount += items.length;

      const sgBlock = document.createElement('div');
      sgBlock.className = `subgroup-block ${sg.collapsed ? 'is-collapsed' : ''}`;

      sgBlock.addEventListener('dragover', (e) => {
        if (!draggedLinkPayload) return;
        e.preventDefault();
        sgBlock.classList.add('drag-over-subgroup');
      });

      sgBlock.addEventListener('dragleave', (e) => {
        if (!sgBlock.contains(e.relatedTarget)) {
          sgBlock.classList.remove('drag-over-subgroup');
        }
      });

      sgBlock.addEventListener('drop', (e) => {
        if (!draggedLinkPayload) return;
        e.preventDefault();
        e.stopPropagation();
        sgBlock.classList.remove('drag-over-subgroup');
        moveLinkViaDragDrop(widget.id, sg.id, null);
      });

      const sgHeader = document.createElement('div');
      sgHeader.className =
        'subgroup-header group/sg flex items-center justify-between gap-1.5 px-2.5 py-1 select-none';

      const sgLeft = document.createElement('div');
      sgLeft.className = 'flex items-center gap-1.5 min-w-0 flex-1';

      const collapseBtn = document.createElement('button');
      collapseBtn.type = 'button';
      collapseBtn.className =
        'p-0.5 rounded text-white/55 hover:text-white transition-transform';
      collapseBtn.title = sg.collapsed ? 'Extinde subgrupul' : 'Restrânge subgrupul';
      collapseBtn.innerHTML = `
        <svg class="w-3 h-3 transition-transform duration-150 ${
          sg.collapsed ? '-rotate-90' : 'rotate-0'
        }" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      `;
      collapseBtn.addEventListener('click', () => {
        sg.collapsed = !sg.collapsed;
        saveState();
        renderAllWidgets();
      });

      const sgTitle = document.createElement('span');
      sgTitle.contentEditable = 'true';
      sgTitle.spellcheck = false;
      sgTitle.className =
        'text-[11px] font-semibold uppercase tracking-wider text-sky-300/90 truncate rounded px-1 -mx-0.5 hover:bg-white/10 focus:bg-black/40 focus:outline-none cursor-text';
      sgTitle.title = 'Click pentru a redenumi subgrupul';
      sgTitle.textContent = sg.title;

      sgTitle.addEventListener('blur', () => {
        const cleaned = sgTitle.textContent.trim() || 'Subgrup';
        sg.title = cleaned;
        sgTitle.textContent = cleaned;
        saveState();
      });

      sgTitle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          sgTitle.blur();
        }
      });

      const sgCount = document.createElement('span');
      sgCount.className = 'text-[10px] font-mono text-white/40';
      sgCount.textContent = `(${items.length})`;

      sgLeft.appendChild(collapseBtn);
      sgLeft.appendChild(sgTitle);
      sgLeft.appendChild(sgCount);

      const sgRight = document.createElement('div');
      sgRight.className =
        'flex items-center gap-0.5 opacity-70 group-hover/sg:opacity-100 transition-opacity shrink-0';

      const quickAddHereBtn = document.createElement('button');
      quickAddHereBtn.type = 'button';
      quickAddHereBtn.className =
        'p-0.5 rounded text-sky-300/80 hover:text-sky-200 hover:bg-white/10';
      quickAddHereBtn.title = `Adaugă link în „${sg.title}”`;
      quickAddHereBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      `;
      quickAddHereBtn.addEventListener('click', () => openLinkFormForSubgroup(sg.id));
      sgRight.appendChild(quickAddHereBtn);

      if (sgIdx > 0) {
        const sgUpBtn = document.createElement('button');
        sgUpBtn.type = 'button';
        sgUpBtn.className = 'p-0.5 rounded text-white/40 hover:text-white hover:bg-white/10';
        sgUpBtn.title = 'Mută subgrupul mai sus';
        sgUpBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        `;
        sgUpBtn.addEventListener('click', () => {
          const tmp = subgroups[sgIdx - 1];
          subgroups[sgIdx - 1] = subgroups[sgIdx];
          subgroups[sgIdx] = tmp;
          saveState();
          renderAllWidgets();
        });
        sgRight.appendChild(sgUpBtn);
      }

      if (sgIdx < subgroups.length - 1) {
        const sgDownBtn = document.createElement('button');
        sgDownBtn.type = 'button';
        sgDownBtn.className = 'p-0.5 rounded text-white/40 hover:text-white hover:bg-white/10';
        sgDownBtn.title = 'Mută subgrupul mai jos';
        sgDownBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        `;
        sgDownBtn.addEventListener('click', () => {
          const tmp = subgroups[sgIdx + 1];
          subgroups[sgIdx + 1] = subgroups[sgIdx];
          subgroups[sgIdx] = tmp;
          saveState();
          renderAllWidgets();
        });
        sgRight.appendChild(sgDownBtn);
      }

      if (subgroups.length > 1) {
        const sgDelBtn = document.createElement('button');
        sgDelBtn.type = 'button';
        sgDelBtn.className =
          'p-0.5 rounded text-white/40 hover:text-rose-300 hover:bg-white/10';
        sgDelBtn.title = 'Șterge acest subgrup';
        sgDelBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        sgDelBtn.addEventListener('click', () => {
          pushUndoState(`Subgrupul „${sg.title}”`);
          widget.data.subgroups = subgroups.filter((s) => s.id !== sg.id);
          saveState();
          renderAllWidgets();
        });
        sgRight.appendChild(sgDelBtn);
      }

      sgHeader.appendChild(sgLeft);
      sgHeader.appendChild(sgRight);
      sgBlock.appendChild(sgHeader);

      if (!sg.collapsed) {
        const sgBody = document.createElement('div');
        sgBody.className =
          viewMode === 'list'
            ? 'p-1.5 space-y-1'
            : 'p-1.5 grid grid-cols-2 sm:grid-cols-3 gap-1.5';

        if (items.length === 0) {
          const emptyMsg = document.createElement('div');
          emptyMsg.className = 'col-span-full py-2 px-2 text-[11px] text-white/35 italic';
          emptyMsg.textContent = 'Subgrup gol — trage un link aici sau apasă pe „+”.';
          sgBody.appendChild(emptyMsg);
        } else {
          items.forEach((link, idx) => {
            const domain = extractDomain(link.url);
            const cleanDomain = domain.replace(/^www\./, '');
            const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
            const initial = (link.title || '?').trim().charAt(0).toUpperCase();

            const itemEl = document.createElement('div');
            itemEl.draggable = true;
            itemEl.className =
              viewMode === 'list'
                ? 'quick-link-row group flex items-center justify-between gap-2 rounded-lg px-2 py-1 animate-item'
                : 'quick-link-card group rounded-xl p-2 flex items-center justify-between gap-1.5 animate-item';

            itemEl.addEventListener('dragstart', (e) => {
              e.stopPropagation();
              draggedLinkPayload = {
                sourceWidgetId: widget.id,
                sourceSubgroupId: sg.id,
                linkId: link.id,
              };
              itemEl.classList.add('is-link-dragging');
              if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', link.title);
              }
            });

            itemEl.addEventListener('dragend', () => {
              itemEl.classList.remove('is-link-dragging');
              draggedLinkPayload = null;
              document
                .querySelectorAll('.drag-over-target, .drag-over-subgroup')
                .forEach((el) => el.classList.remove('drag-over-target', 'drag-over-subgroup'));
            });

            itemEl.addEventListener('dragover', (e) => {
              if (!draggedLinkPayload || draggedLinkPayload.linkId === link.id) return;
              e.preventDefault();
              e.stopPropagation();
              itemEl.classList.add('drag-over-target');
            });

            itemEl.addEventListener('dragleave', () => {
              itemEl.classList.remove('drag-over-target');
            });

            itemEl.addEventListener('drop', (e) => {
              if (!draggedLinkPayload) return;
              e.preventDefault();
              e.stopPropagation();
              itemEl.classList.remove('drag-over-target');
              sgBlock.classList.remove('drag-over-subgroup');
              moveLinkViaDragDrop(widget.id, sg.id, link.id);
            });

            const anchor = document.createElement('a');
            anchor.href = link.url;
            anchor.target = '_blank';
            anchor.rel = 'noopener noreferrer';
            anchor.className = 'flex items-center gap-2 min-w-0 flex-1 focus:outline-none';

            const iconWrap = document.createElement('div');
            iconWrap.className =
              'h-5 w-5 shrink-0 rounded-md bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden';

            const img = document.createElement('img');
            img.src = faviconUrl;
            img.alt = link.title;
            img.className = 'h-3.5 w-3.5 object-contain';
            img.onerror = () => {
              img.remove();
              const fallback = document.createElement('span');
              fallback.className = 'text-[10px] font-bold text-sky-300 leading-none';
              fallback.textContent = initial;
              iconWrap.appendChild(fallback);
            };
            iconWrap.appendChild(img);

            const titleSpan = document.createElement('span');
            titleSpan.className =
              'text-xs font-medium text-white/90 group-hover:text-sky-200 truncate transition-colors';
            titleSpan.textContent = link.title;

            anchor.appendChild(iconWrap);
            anchor.appendChild(titleSpan);

            if (viewMode === 'list') {
              const domainSpan = document.createElement('span');
              domainSpan.className = 'text-[10px] text-white/35 truncate hidden sm:inline';
              domainSpan.textContent = cleanDomain;
              anchor.appendChild(domainSpan);
            }

            const rowActions = document.createElement('div');
            rowActions.className =
              'flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0';

            const editBtn = document.createElement('button');
            editBtn.type = 'button';
            editBtn.className =
              'p-0.5 rounded text-white/45 hover:text-amber-300 hover:bg-white/10';
            editBtn.title = 'Editează titlul, URL-ul sau subgrupul';
            editBtn.innerHTML = `
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            `;
            editBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              openLinkFormForSubgroup(sg.id, { link });
            });
            rowActions.appendChild(editBtn);

            if (viewMode === 'list' && idx > 0) {
              const upBtn = document.createElement('button');
              upBtn.type = 'button';
              upBtn.className = 'p-0.5 rounded text-white/45 hover:text-white hover:bg-white/10';
              upBtn.title = 'Mută mai sus';
              upBtn.innerHTML = `
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              `;
              upBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tmp = items[idx - 1];
                items[idx - 1] = items[idx];
                items[idx] = tmp;
                saveState();
                renderAllWidgets();
              });
              rowActions.appendChild(upBtn);
            }

            if (viewMode === 'list' && idx < items.length - 1) {
              const downBtn = document.createElement('button');
              downBtn.type = 'button';
              downBtn.className =
                'p-0.5 rounded text-white/45 hover:text-white hover:bg-white/10';
              downBtn.title = 'Mută mai jos';
              downBtn.innerHTML = `
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              `;
              downBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const tmp = items[idx + 1];
                items[idx + 1] = items[idx];
                items[idx] = tmp;
                saveState();
                renderAllWidgets();
              });
              rowActions.appendChild(downBtn);
            }

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className =
              'p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10';
            delBtn.title = 'Șterge link-ul';
            delBtn.innerHTML = `
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            `;
            delBtn.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              pushUndoState(`Link-ul „${link.title}”`);
              sg.items = items.filter((item) => item.id !== link.id);
              saveState();
              renderAllWidgets();
            });
            rowActions.appendChild(delBtn);

            itemEl.appendChild(anchor);
            itemEl.appendChild(rowActions);
            sgBody.appendChild(itemEl);
          });
        }

        sgBlock.appendChild(sgBody);
      }

      scrollContainer.appendChild(sgBlock);
    });

    const footer = document.createElement('div');
    footer.className =
      'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
    footer.innerHTML = `
      <span>${subgroups.length} subgrupuri • ${totalLinksCount} link-uri</span>
    `;

    const allCollapsed = subgroups.every((s) => s.collapsed);
    const toggleAllCollapseBtn = document.createElement('button');
    toggleAllCollapseBtn.type = 'button';
    toggleAllCollapseBtn.className = 'hover:text-sky-300 transition-colors';
    toggleAllCollapseBtn.textContent = allCollapsed
      ? 'Extinde subgrupurile'
      : 'Restrânge toate';
    toggleAllCollapseBtn.addEventListener('click', () => {
      const targetState = !allCollapsed;
      subgroups.forEach((s) => {
        s.collapsed = Boolean(targetState);
      });
      saveState();
      renderAllWidgets();
    });
    footer.appendChild(toggleAllCollapseBtn);

    cardEl.appendChild(header);
    cardEl.appendChild(subgroupForm);
    cardEl.appendChild(linkForm);
    cardEl.appendChild(scrollContainer);
    cardEl.appendChild(footer);

    return header;
  }

  // -------------------- B. WIDGET LISTĂ DE SARCINI (CU PRIORITATE, SCADENȚĂ ȘI DRAG & DROP) --------------------
  function formatDueDateBadge(dueDateStr) {
    if (!dueDateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(`${dueDateStr}T00:00:00`);
    if (Number.isNaN(due.getTime())) return null;

    const diffDays = Math.round((due - today) / 86400000);
    if (diffDays < 0) {
      return {
        label: `Depășit (${Math.abs(diffDays)}z)`,
        cls: 'bg-rose-500/20 text-rose-300 border-rose-400/35',
      };
    }
    if (diffDays === 0) {
      return {
        label: 'Azi',
        cls: 'bg-amber-500/20 text-amber-300 border-amber-400/35',
      };
    }
    if (diffDays === 1) {
      return {
        label: 'Mâine',
        cls: 'bg-sky-500/20 text-sky-300 border-sky-400/35',
      };
    }
    const shortFmt = new Intl.DateTimeFormat('ro-RO', { day: 'numeric', month: 'short' }).format(due);
    return {
      label: shortFmt,
      cls: 'bg-white/10 text-white/65 border-white/15',
    };
  }

  function buildTodoWidgetContent(widget, cardEl) {
    const items = Array.isArray(widget.data.items) ? widget.data.items : [];
    const filter = widget.data.filter || 'all';

    const actionsFrag = document.createDocumentFragment();
    const filterWrap = document.createElement('div');
    filterWrap.className = 'flex items-center rounded-xl bg-black/30 p-0.5 text-[10px]';

    [
      { key: 'all', label: 'Toate' },
      { key: 'active', label: 'Active' },
      { key: 'completed', label: 'Gata' },
    ].forEach((f) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = f.label;
      b.className = `todo-filter-btn px-2 py-0.5 rounded-lg transition-colors ${
        filter === f.key ? 'active' : ''
      }`;
      b.addEventListener('click', () => {
        widget.data.filter = f.key;
        saveState();
        renderAllWidgets();
      });
      filterWrap.appendChild(b);
    });
    actionsFrag.appendChild(filterWrap);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-accent-400/15 text-accent-300 border-accent-400/25',
      iconSvg,
      actionsFrag
    );

    const form = document.createElement('form');
    form.className = 'mb-2.5 space-y-1.5';
    form.innerHTML = `
      <div class="relative flex items-center gap-1.5">
        <input
          type="text"
          name="todoText"
          maxlength="140"
          placeholder="Adaugă o sarcină nouă..."
          class="flex-1 rounded-xl bg-black/25 border border-white/15 px-3 py-1.5 text-xs text-white placeholder-white/45 focus:border-accent-400/70 focus:bg-black/35 focus:outline-none select-text"
        />
        <button
          type="submit"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 transition-colors"
          title="Adaugă sarcina"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div class="flex items-center gap-1.5 text-[11px]">
        <select
          name="priority"
          class="rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Prioritate sarcină"
        >
          <option value="normal" class="bg-slate-900">⚪ Normală</option>
          <option value="high" class="bg-slate-900">🔴 Urgentă</option>
          <option value="low" class="bg-slate-900">🔵 Scăzută</option>
        </select>
        <input
          type="date"
          name="dueDate"
          class="rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Termen limită (opțional)"
        />
      </div>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const textInput = form.querySelector('input[name="todoText"]');
      const prioritySelect = form.querySelector('select[name="priority"]');
      const dueInput = form.querySelector('input[name="dueDate"]');
      const text = textInput.value.trim();
      if (!text) return;

      widget.data.items.unshift({
        id: `td-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text,
        completed: false,
        priority: prioritySelect.value || 'normal',
        dueDate: dueInput.value || '',
      });
      saveState();
      renderAllWidgets();
    });

    const ul = document.createElement('ul');
    ul.className = 'todo-list-dropzone flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1 rounded-xl transition-colors';

    // Suport Drag & Drop pe întreaga listă To-Do
    ul.addEventListener('dragover', (e) => {
      if (!draggedTodoPayload) return;
      e.preventDefault();
      ul.classList.add('drag-over-todo-list');
    });

    ul.addEventListener('dragleave', (e) => {
      if (!ul.contains(e.relatedTarget)) {
        ul.classList.remove('drag-over-todo-list');
      }
    });

    ul.addEventListener('drop', (e) => {
      if (!draggedTodoPayload) return;
      e.preventDefault();
      e.stopPropagation();
      ul.classList.remove('drag-over-todo-list');
      moveTodoViaDragDrop(widget.id, null);
    });

    const filtered = items.filter((t) => {
      if (filter === 'active') return !t.completed;
      if (filter === 'completed') return t.completed;
      return true;
    });

    if (filtered.length === 0) {
      const emptyLi = document.createElement('li');
      emptyLi.className =
        'py-8 text-center text-xs text-white/45 border border-dashed border-white/10 rounded-xl';
      emptyLi.textContent =
        filter === 'completed'
          ? 'Nicio sarcină finalizată în această listă.'
          : 'Nu există sarcini active. Adaugă una mai sus sau trage una din altă listă!';
      ul.appendChild(emptyLi);
    } else {
      filtered.forEach((todo) => {
        const li = document.createElement('li');
        li.draggable = true;
        li.className =
          'todo-item-row group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] hover:bg-white/[0.09] border border-white/10 px-2.5 py-1.5 transition-all animate-item';

        li.addEventListener('dragstart', (e) => {
          e.stopPropagation();
          draggedTodoPayload = {
            sourceWidgetId: widget.id,
            todoId: todo.id,
          };
          li.classList.add('is-todo-dragging');
          if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', todo.text);
          }
        });

        li.addEventListener('dragend', () => {
          li.classList.remove('is-todo-dragging');
          draggedTodoPayload = null;
          document
            .querySelectorAll('.drag-over-target, .drag-over-todo-list')
            .forEach((el) => el.classList.remove('drag-over-target', 'drag-over-todo-list'));
        });

        li.addEventListener('dragover', (e) => {
          if (!draggedTodoPayload || draggedTodoPayload.todoId === todo.id) return;
          e.preventDefault();
          e.stopPropagation();
          li.classList.add('drag-over-target');
        });

        li.addEventListener('dragleave', () => {
          li.classList.remove('drag-over-target');
        });

        li.addEventListener('drop', (e) => {
          if (!draggedTodoPayload) return;
          e.preventDefault();
          e.stopPropagation();
          li.classList.remove('drag-over-target');
          ul.classList.remove('drag-over-todo-list');
          moveTodoViaDragDrop(widget.id, todo.id);
        });

        const leftWrap = document.createElement('div');
        leftWrap.className = 'flex items-center gap-1.5 flex-1 min-w-0';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = Boolean(todo.completed);
        cb.className = 'custom-checkbox';
        cb.addEventListener('change', () => {
          todo.completed = cb.checked;
          saveState();
          renderAllWidgets();
        });

        // Indicator prioritate (click pentru a schimba)
        const prioBtn = document.createElement('button');
        prioBtn.type = 'button';
        const prio = todo.priority || 'normal';
        prioBtn.className = 'text-[10px] leading-none shrink-0 opacity-85 hover:scale-110 transition-transform';
        prioBtn.title = 'Click pentru a schimba prioritatea (Normală / Urgentă / Scăzută)';
        prioBtn.textContent = prio === 'high' ? '🔴' : prio === 'low' ? '🔵' : '⚪';
        prioBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          todo.priority = prio === 'normal' ? 'high' : prio === 'high' ? 'low' : 'normal';
          saveState();
          renderAllWidgets();
        });

        const span = document.createElement('span');
        span.className = `text-xs truncate flex-1 cursor-pointer rounded px-1 -mx-0.5 transition-all ${
          todo.completed ? 'line-through text-white/40' : 'text-white/90'
        }`;
        span.title = 'Click pentru a bifa sau dublu-click pentru a edita textul';
        span.textContent = todo.text;

        const startEditingTodo = () => {
          span.contentEditable = 'true';
          span.spellcheck = false;
          span.classList.remove('truncate', 'line-through', 'text-white/40');
          span.classList.add('bg-black/45', 'ring-1', 'ring-accent-400/60', 'text-white');
          span.focus();
        };

        span.addEventListener('click', () => {
          if (span.isContentEditable) return;
          todo.completed = !todo.completed;
          saveState();
          renderAllWidgets();
        });

        span.addEventListener('dblclick', (e) => {
          e.stopPropagation();
          startEditingTodo();
        });

        span.addEventListener('blur', () => {
          if (!span.isContentEditable) return;
          span.contentEditable = 'false';
          const newText = span.textContent.trim();
          if (newText) {
            todo.text = newText;
          }
          saveState();
          renderAllWidgets();
        });

        span.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            span.blur();
          } else if (e.key === 'Escape') {
            span.textContent = todo.text;
            span.blur();
          }
        });

        leftWrap.appendChild(cb);
        leftWrap.appendChild(prioBtn);
        leftWrap.appendChild(span);

        const rightWrap = document.createElement('div');
        rightWrap.className = 'flex items-center gap-1 shrink-0';

        const dueBadge = formatDueDateBadge(todo.dueDate);
        if (dueBadge && !todo.completed) {
          const badgeEl = document.createElement('span');
          badgeEl.className = `text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${dueBadge.cls}`;
          badgeEl.textContent = dueBadge.label;
          rightWrap.appendChild(badgeEl);
        }

        const actionsWrap = document.createElement('div');
        actionsWrap.className =
          'flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0';

        const editBtn = document.createElement('button');
        editBtn.type = 'button';
        editBtn.className =
          'p-0.5 rounded text-white/45 hover:text-amber-300 hover:bg-white/10 transition-all';
        editBtn.title = 'Editează sarcina';
        editBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        `;
        editBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          startEditingTodo();
        });

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className =
          'p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10 transition-all';
        delBtn.title = 'Șterge sarcina';
        delBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        delBtn.addEventListener('click', () => {
          pushUndoState(`Sarcina „${todo.text.slice(0, 28)}”`);
          widget.data.items = items.filter((t) => t.id !== todo.id);
          saveState();
          renderAllWidgets();
        });

        actionsWrap.appendChild(editBtn);
        actionsWrap.appendChild(delBtn);
        rightWrap.appendChild(actionsWrap);

        li.appendChild(leftWrap);
        li.appendChild(rightWrap);
        ul.appendChild(li);
      });
    }

    const total = items.length;
    const completedCount = items.filter((t) => t.completed).length;
    const activeCount = total - completedCount;
    const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    const footer = document.createElement('div');
    footer.className =
      'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50';
    footer.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div class="h-full bg-accent-400 transition-all duration-300" style="width: ${percent}%"></div>
        </div>
        <span>${activeCount} rămase (${percent}%)</span>
      </div>
    `;

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'hover:text-rose-300 transition-colors';
    clearBtn.textContent = 'Șterge finalizate';
    clearBtn.addEventListener('click', () => {
      if (completedCount === 0) return;
      pushUndoState(`${completedCount} sarcini finalizate`);
      widget.data.items = items.filter((t) => !t.completed);
      saveState();
      renderAllWidgets();
    });
    footer.appendChild(clearBtn);

    cardEl.appendChild(header);
    cardEl.appendChild(form);
    cardEl.appendChild(ul);
    cardEl.appendChild(footer);

    return header;
  }

  // -------------------- C. WIDGET NOTIȚE RAPIDE (CU SUPORT MARKDOWN & CHECKBOX-URI INTERACTIVE) --------------------
  function formatInlineMarkdown(text) {
    let safe = escapeHtml(text);
    // Code inline `cod`
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
    // Bold **text**
    safe = safe.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    safe = safe.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Link-uri [titlu](https://...)
    safe = safe.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    return safe;
  }

  function renderMarkdownToElement(container, rawText, onToggleCheckboxLine) {
    container.innerHTML = '';
    const text = (rawText || '').trim();
    if (!text) {
      const empty = document.createElement('p');
      empty.className = 'text-white/40 italic text-xs';
      empty.textContent = 'Notiță goală — apasă pe „Editează” pentru a scrie.';
      container.appendChild(empty);
      return;
    }

    const lines = rawText.split('\n');
    let currentList = null;

    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        currentList = null;
        return;
      }

      if (trimmed.startsWith('### ')) {
        currentList = null;
        const h3 = document.createElement('h3');
        h3.innerHTML = formatInlineMarkdown(trimmed.slice(4));
        container.appendChild(h3);
        return;
      }
      if (trimmed.startsWith('## ')) {
        currentList = null;
        const h2 = document.createElement('h2');
        h2.innerHTML = formatInlineMarkdown(trimmed.slice(3));
        container.appendChild(h2);
        return;
      }
      if (trimmed.startsWith('# ')) {
        currentList = null;
        const h1 = document.createElement('h1');
        h1.innerHTML = formatInlineMarkdown(trimmed.slice(2));
        container.appendChild(h1);
        return;
      }

      if (trimmed.startsWith('> ')) {
        currentList = null;
        const bq = document.createElement('blockquote');
        bq.innerHTML = formatInlineMarkdown(trimmed.slice(2));
        container.appendChild(bq);
        return;
      }

      // Checkbox Markdown: - [ ] sau - [x]
      const taskMatch = trimmed.match(/^[-*•]\s+\[([ xX])\]\s+(.*)$/);
      if (taskMatch) {
        if (!currentList) {
          currentList = document.createElement('ul');
          container.appendChild(currentList);
        }
        const isChecked = taskMatch[1].toLowerCase() === 'x';
        const itemText = taskMatch[2];

        const li = document.createElement('li');
        li.className = 'md-task-item';

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = isChecked;
        cb.className = 'custom-checkbox';
        cb.addEventListener('change', () => {
          onToggleCheckboxLine(lineIdx, cb.checked);
        });

        const span = document.createElement('span');
        span.className = isChecked ? 'line-through opacity-50' : '';
        span.innerHTML = formatInlineMarkdown(itemText);

        li.appendChild(cb);
        li.appendChild(span);
        currentList.appendChild(li);
        return;
      }

      // Listă neordonată: - , * , •
      const ulMatch = trimmed.match(/^[-*•]\s+(.*)$/);
      if (ulMatch) {
        if (!currentList || currentList.tagName !== 'UL') {
          currentList = document.createElement('ul');
          container.appendChild(currentList);
        }
        const li = document.createElement('li');
        li.innerHTML = formatInlineMarkdown(ulMatch[1]);
        currentList.appendChild(li);
        return;
      }

      // Listă ordonată: 1.
      const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        if (!currentList || currentList.tagName !== 'OL') {
          currentList = document.createElement('ol');
          container.appendChild(currentList);
        }
        const li = document.createElement('li');
        li.innerHTML = formatInlineMarkdown(olMatch[1]);
        currentList.appendChild(li);
        return;
      }

      currentList = null;
      const p = document.createElement('p');
      p.innerHTML = formatInlineMarkdown(trimmed);
      container.appendChild(p);
    });
  }

  function buildNotesWidgetContent(widget, cardEl) {
    const actionsFrag = document.createDocumentFragment();
    const isPreview = Boolean(widget.data.previewMode);

    const toggleMdBtn = document.createElement('button');
    toggleMdBtn.type = 'button';
    toggleMdBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium border transition-colors ${
      isPreview
        ? 'bg-amber-400/25 text-amber-200 border-amber-400/40'
        : 'bg-white/10 text-white/75 border-white/10 hover:text-white'
    }`;
    toggleMdBtn.title = 'Comută între modul Editare și Previzualizare Markdown';
    toggleMdBtn.textContent = isPreview ? '✏️ Editează' : '👁️ Markdown';
    toggleMdBtn.addEventListener('click', () => {
      widget.data.previewMode = !widget.data.previewMode;
      saveState();
      renderAllWidgets();
    });

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className =
      'p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors';
    copyBtn.title = 'Copiază notița în clipboard';
    copyBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    `;

    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className =
      'p-1 rounded-lg text-white/60 hover:text-rose-300 hover:bg-white/10 transition-colors';
    clearBtn.title = 'Golește textul notiței';
    clearBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    `;

    actionsFrag.appendChild(toggleMdBtn);
    actionsFrag.appendChild(copyBtn);
    actionsFrag.appendChild(clearBtn);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-amber-400/15 text-amber-300 border-amber-400/25',
      iconSvg,
      actionsFrag
    );

    const textarea = document.createElement('textarea');
    textarea.className = `${
      isPreview ? 'hidden' : ''
    } w-full flex-1 resize-none rounded-xl bg-black/25 border border-white/10 p-3 text-xs sm:text-sm leading-relaxed text-white/95 placeholder-white/40 focus:border-amber-400/60 focus:bg-black/35 focus:outline-none custom-scrollbar select-text`;
    textarea.placeholder =
      'Scrie notițe sau folosește Markdown (# Titlu, **bold**, - [ ] sarcină)...';
    textarea.value = widget.data.content || '';

    const mdPreview = document.createElement('div');
    mdPreview.className = `${
      isPreview ? '' : 'hidden'
    } markdown-body w-full flex-1 overflow-y-auto rounded-xl bg-black/20 border border-white/10 p-3 text-white/90 custom-scrollbar select-text`;

    const handleToggleCheckbox = (lineIdx, checked) => {
      const lines = (widget.data.content || '').split('\n');
      if (lines[lineIdx] !== undefined) {
        lines[lineIdx] = lines[lineIdx].replace(
          /^(\s*[-*•]\s+\[)[ xX](\])/,
          `$1${checked ? 'x' : ' '}$2`
        );
        widget.data.content = lines.join('\n');
        saveState();
        renderAllWidgets();
      }
    };

    if (isPreview) {
      renderMarkdownToElement(mdPreview, widget.data.content || '', handleToggleCheckbox);
      mdPreview.addEventListener('dblclick', () => {
        widget.data.previewMode = false;
        saveState();
        renderAllWidgets();
      });
    }

    const footer = document.createElement('div');
    footer.className =
      'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';

    const countSpan = document.createElement('span');
    const savedSpan = document.createElement('span');
    savedSpan.textContent = widget.data.lastSaved || 'Sincronizat local';

    const updateMetrics = (txt) => {
      const chars = txt.length;
      const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
      countSpan.textContent = `${chars} caractere • ${words} cuvinte`;
    };
    updateMetrics(textarea.value);

    const debouncedSave = debounce((val) => {
      widget.data.content = val;
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      widget.data.lastSaved = `Salvat la ${hh}:${mm}:${ss}`;
      savedSpan.textContent = widget.data.lastSaved;
      saveState();
    }, 280);

    textarea.addEventListener('input', () => {
      savedSpan.textContent = 'Se salvează...';
      updateMetrics(textarea.value);
      debouncedSave(textarea.value);
    });

    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(widget.data.content || '');
        savedSpan.textContent = '✓ Copiat în clipboard!';
        showToast('✓ Notiță copiată în clipboard!');
        setTimeout(() => {
          savedSpan.textContent = widget.data.lastSaved || 'Sincronizat local';
        }, 1600);
      } catch {
        textarea.select();
      }
    });

    clearBtn.addEventListener('click', () => {
      if (!(widget.data.content || '').trim()) return;
      pushUndoState(`Textul din „${widget.title}”`);
      textarea.value = '';
      widget.data.content = '';
      widget.data.lastSaved = 'Notiță golită';
      updateMetrics('');
      savedSpan.textContent = widget.data.lastSaved;
      saveState();
      renderAllWidgets();
    });

    footer.appendChild(countSpan);
    footer.appendChild(savedSpan);

    cardEl.appendChild(header);
    cardEl.appendChild(textarea);
    cardEl.appendChild(mdPreview);
    cardEl.appendChild(footer);

    return header;
  }

  // -------------------- D. WIDGET CALENDAR LUNAR CU NUMĂRUL SĂPTĂMÂNII (ISO 8601) --------------------
  function buildCalendarWidgetContent(widget, cardEl) {
    const now = new Date();
    if (typeof widget.data?.viewYear !== 'number') widget.data.viewYear = now.getFullYear();
    if (typeof widget.data?.viewMonth !== 'number') widget.data.viewMonth = now.getMonth();

    const year = widget.data.viewYear;
    const month = widget.data.viewMonth;

    const actionsFrag = document.createDocumentFragment();
    const navWrap = document.createElement('div');
    navWrap.className = 'flex items-center gap-1';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'px-1.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs';
    prevBtn.title = 'Luna anterioară';
    prevBtn.textContent = '◀';
    prevBtn.addEventListener('click', () => {
      let m = month - 1;
      let y = year;
      if (m < 0) {
        m = 11;
        y -= 1;
      }
      widget.data.viewMonth = m;
      widget.data.viewYear = y;
      saveState();
      renderAllWidgets();
    });

    const todayBtn = document.createElement('button');
    todayBtn.type = 'button';
    todayBtn.className =
      'px-2 py-0.5 rounded-lg bg-accent-400/20 hover:bg-accent-400/30 text-accent-300 text-[11px] font-medium';
    todayBtn.textContent = 'Azi';
    todayBtn.addEventListener('click', () => {
      const curr = new Date();
      widget.data.viewMonth = curr.getMonth();
      widget.data.viewYear = curr.getFullYear();
      saveState();
      renderAllWidgets();
    });

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'px-1.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs';
    nextBtn.title = 'Luna următoare';
    nextBtn.textContent = '▶';
    nextBtn.addEventListener('click', () => {
      let m = month + 1;
      let y = year;
      if (m > 11) {
        m = 0;
        y += 1;
      }
      widget.data.viewMonth = m;
      widget.data.viewYear = y;
      saveState();
      renderAllWidgets();
    });

    navWrap.appendChild(prevBtn);
    navWrap.appendChild(todayBtn);
    navWrap.appendChild(nextBtn);
    actionsFrag.appendChild(navWrap);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-violet-400/15 text-violet-300 border-violet-400/25',
      iconSvg,
      actionsFrag
    );

    const body = document.createElement('div');
    body.className = 'flex-1 flex flex-col justify-between';

    const monthName = new Intl.DateTimeFormat('ro-RO', {
      month: 'long',
      year: 'numeric',
    }).format(new Date(year, month, 1));

    const monthTitle = document.createElement('div');
    monthTitle.className = 'text-center text-xs sm:text-sm font-semibold capitalize text-white/90 mb-2';
    monthTitle.textContent = monthName;
    body.appendChild(monthTitle);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid flex-1 items-center';

    // Antet: Săpt + Zilele săptămânii (Luni -> Duminică)
    const headers = ['Săpt', 'Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'];
    headers.forEach((h, idx) => {
      const hEl = document.createElement('div');
      hEl.className = `text-[10px] font-semibold uppercase tracking-wider py-1 ${
        idx === 0 ? 'text-accent-300/85' : idx >= 6 ? 'text-rose-300/75' : 'text-white/50'
      }`;
      hEl.textContent = h;
      grid.appendChild(hEl);
    });

    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Luni ... 6 = Duminică
    const startDate = new Date(year, month, 1 - startOffset);

    for (let row = 0; row < 6; row++) {
      const rowMonday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + row * 7);
      const weekNum = getISOWeekNumber(rowMonday);

      const wkBadge = document.createElement('div');
      wkBadge.className = 'calendar-week-badge';
      wkBadge.title = `Săptămâna ${weekNum} din an`;
      wkBadge.textContent = `S${weekNum}`;
      grid.appendChild(wkBadge);

      for (let col = 0; col < 7; col++) {
        const cellDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + row * 7 + col
        );
        const isCurrentMonth = cellDate.getMonth() === month;
        const isToday =
          cellDate.getDate() === now.getDate() &&
          cellDate.getMonth() === now.getMonth() &&
          cellDate.getFullYear() === now.getFullYear();

        const cell = document.createElement('div');
        cell.className = `calendar-cell ${
          isToday
            ? 'is-today'
            : isCurrentMonth
            ? col >= 5
              ? 'text-rose-200/85 hover:bg-white/10'
              : 'text-white/90 hover:bg-white/10'
            : 'text-white/25'
        }`;
        cell.textContent = String(cellDate.getDate());
        grid.appendChild(cell);
      }
    }

    body.appendChild(grid);

    const footer = document.createElement('div');
    footer.className =
      'mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
    footer.innerHTML = `
      <span>Săptămâna curentă: <strong class="text-accent-300">S${getISOWeekNumber(now)}</strong></span>
      <span>ISO 8601</span>
    `;

    cardEl.appendChild(header);
    cardEl.appendChild(body);
    cardEl.appendChild(footer);

    return header;
  }

  // -------------------- E. WIDGET PROGNOZĂ VREME PE 5 ZILE (OPEN-METEO) --------------------
  const forecastCache = {};

  function buildForecastWidgetContent(widget, cardEl) {
    const cityObj =
      WEATHER_CITIES.find((c) => c.name === state.weatherCity) || WEATHER_CITIES[0];

    const actionsFrag = document.createDocumentFragment();
    const cityBadge = document.createElement('span');
    cityBadge.className =
      'px-2 py-0.5 rounded-lg bg-sky-400/15 text-sky-300 text-[11px] font-medium';
    cityBadge.textContent = `📍 ${cityObj.name}`;
    actionsFrag.appendChild(cityBadge);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-sky-400/15 text-sky-300 border-sky-400/25',
      iconSvg,
      actionsFrag
    );

    const listContainer = document.createElement('div');
    listContainer.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1';

    const renderDays = (days) => {
      listContainer.innerHTML = '';
      days.forEach((d, idx) => {
        const row = document.createElement('div');
        row.className =
          'flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2 text-xs';
        row.innerHTML = `
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="text-lg leading-none">${d.icon}</span>
            <div>
              <div class="font-medium text-white capitalize">${idx === 0 ? 'Astăzi' : escapeHtml(d.dayName)}</div>
              <div class="text-[10px] text-white/50">${escapeHtml(d.desc)}</div>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-[10px] text-sky-300/85 font-mono" title="Probabilitate precipitații">💧 ${d.precip}%</span>
            <div class="font-mono text-xs">
              <span class="font-semibold text-white">${d.max}°</span>
              <span class="text-white/45 ml-1">${d.min}°</span>
            </div>
          </div>
        `;
        listContainer.appendChild(row);
      });
    };

    // Date implicite (fallback rapid)
    const fallbackDays = Array.from({ length: 5 }, (_, i) => {
      const dt = new Date();
      dt.setDate(dt.getDate() + i);
      const dayName = new Intl.DateTimeFormat('ro-RO', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }).format(dt);
      const mapped = mapWmoCodeToRo(i % 3 === 0 ? 0 : i % 2 === 0 ? 1 : 80);
      return {
        dayName,
        icon: mapped.icon,
        desc: mapped.desc,
        max: cityObj.mockTemp + (i % 3) - 1,
        min: cityObj.mockTemp - 7 + (i % 2),
        precip: i % 2 === 0 ? 10 : 35,
      };
    });

    if (forecastCache[cityObj.name]) {
      renderDays(forecastCache[cityObj.name]);
    } else {
      renderDays(fallbackDays);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=5`;
      fetch(url)
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!data?.daily?.time) return;
          const liveDays = data.daily.time.slice(0, 5).map((isoDate, idx) => {
            const dt = new Date(`${isoDate}T12:00:00`);
            const dayName = new Intl.DateTimeFormat('ro-RO', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            }).format(dt);
            const mapped = mapWmoCodeToRo(data.daily.weathercode?.[idx] ?? 0);
            return {
              dayName,
              icon: mapped.icon,
              desc: mapped.desc,
              max: Math.round(data.daily.temperature_2m_max?.[idx] ?? cityObj.mockTemp),
              min: Math.round(data.daily.temperature_2m_min?.[idx] ?? cityObj.mockTemp - 6),
              precip: Math.round(data.daily.precipitation_probability_max?.[idx] ?? 0),
            };
          });
          forecastCache[cityObj.name] = liveDays;
          renderDays(liveDays);
        })
        .catch(() => {});
    }

    const footer = document.createElement('div');
    footer.className =
      'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
    footer.innerHTML = `
      <span>Prognoză pe 5 zile (${escapeHtml(cityObj.name)})</span>
      <span>Open-Meteo</span>
    `;

    cardEl.appendChild(header);
    cardEl.appendChild(listContainer);
    cardEl.appendChild(footer);

    return header;
  }

  // -------------------- F. WIDGET CEASURI MONDIALE (FUSURI ORARE LIVE) --------------------
  function updateWorldClocksInDom(now = new Date()) {
    document.querySelectorAll('[data-world-tz]').forEach((el) => {
      const tz = el.getAttribute('data-world-tz') || 'UTC';
      try {
        const timeStr = new Intl.DateTimeFormat('ro-RO', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        const dateStr = new Intl.DateTimeFormat('ro-RO', {
          timeZone: tz,
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }).format(now);

        const timeNode = el.querySelector('[data-tz-time]');
        const dateNode = el.querySelector('[data-tz-date]');
        if (timeNode) timeNode.textContent = timeStr;
        if (dateNode) dateNode.textContent = dateStr;
      } catch {
        // Fus orar necunoscut
      }
    });
  }

  function buildClocksWidgetContent(widget, cardEl) {
    if (!Array.isArray(widget.data?.clocks) || widget.data.clocks.length === 0) {
      widget.data = {
        clocks: [
          { id: 'clk-1', city: 'Sibiu / București', tz: 'Europe/Bucharest' },
          { id: 'clk-2', city: 'Londra', tz: 'Europe/London' },
          { id: 'clk-3', city: 'New York', tz: 'America/New_York' },
          { id: 'clk-4', city: 'Tokyo', tz: 'Asia/Tokyo' },
        ],
      };
    }

    const clocks = widget.data.clocks;
    const actionsFrag = document.createDocumentFragment();

    const selectTz = document.createElement('select');
    selectTz.className =
      'rounded-lg bg-white/10 border border-white/15 px-2 py-0.5 text-[11px] text-white focus:outline-none';
    selectTz.innerHTML =
      `<option value="" class="bg-slate-900">+ Fus orar...</option>` +
      WORLD_TIMEZONES.map(
        (w) =>
          `<option value="${escapeHtml(w.tz)}|${escapeHtml(w.city)}" class="bg-slate-900">${escapeHtml(
            w.city
          )} (${escapeHtml(w.country)})</option>`
      ).join('');

    selectTz.addEventListener('change', () => {
      if (!selectTz.value) return;
      const [tz, city] = selectTz.value.split('|');
      clocks.push({
        id: `clk-${Date.now()}`,
        city,
        tz,
      });
      selectTz.value = '';
      saveState();
      renderAllWidgets();
    });

    actionsFrag.appendChild(selectTz);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-cyan-400/15 text-cyan-300 border-cyan-400/25',
      iconSvg,
      actionsFrag
    );

    const listEl = document.createElement('div');
    listEl.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1';

    clocks.forEach((clk) => {
      const row = document.createElement('div');
      row.setAttribute('data-world-tz', clk.tz);
      row.className =
        'group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2';
      row.innerHTML = `
        <div class="min-w-0">
          <div class="text-xs font-semibold text-white truncate">${escapeHtml(clk.city)}</div>
          <div data-tz-date class="text-[10px] text-white/45 capitalize">--</div>
        </div>
        <div class="flex items-center gap-2">
          <span data-tz-time class="font-mono text-sm sm:text-base font-semibold text-accent-300">00:00:00</span>
          <button type="button" data-del-clk class="opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/40 hover:text-rose-300 transition-opacity" title="Elimină fusul orar">✕</button>
        </div>
      `;

      row.querySelector('[data-del-clk]').addEventListener('click', () => {
        pushUndoState(`Ceasul „${clk.city}”`);
        widget.data.clocks = clocks.filter((c) => c.id !== clk.id);
        saveState();
        renderAllWidgets();
      });

      listEl.appendChild(row);
    });

    const footer = document.createElement('div');
    footer.className =
      'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
    footer.innerHTML = `
      <span>${clocks.length} fusuri orare active</span>
      <span>Sincronizat la secundă</span>
    `;

    cardEl.appendChild(header);
    cardEl.appendChild(listEl);
    cardEl.appendChild(footer);

    updateWorldClocksInDom(new Date());
    return header;
  }

  // -------------------- G. WIDGET NUMĂRĂTOARE INVERSĂ (COUNTDOWN EVENIMENTE) --------------------
  function buildCountdownWidgetContent(widget, cardEl) {
    if (!Array.isArray(widget.data?.items)) {
      const nextMonth = new Date();
      nextMonth.setDate(nextMonth.getDate() + 14);
      widget.data = {
        items: [
          {
            id: 'cd-1',
            title: 'Lansare proiect / Concediu',
            targetDate: nextMonth.toISOString().slice(0, 10),
          },
        ],
      };
    }

    const items = widget.data.items;
    const actionsFrag = document.createDocumentFragment();

    const addBtn = document.createElement('button');
    addBtn.type = 'button';
    addBtn.className =
      'flex items-center gap-1 rounded-lg bg-rose-400/20 hover:bg-rose-400/30 border border-rose-400/30 px-2 py-1 text-[11px] font-medium text-rose-200 transition-colors';
    addBtn.textContent = '+ Eveniment';
    actionsFrag.appendChild(addBtn);

    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `;

    const header = createWidgetHeader(
      widget,
      'bg-rose-400/15 text-rose-300 border-rose-400/25',
      iconSvg,
      actionsFrag
    );

    const form = document.createElement('form');
    form.className =
      'hidden mb-2.5 rounded-xl bg-black/40 border border-white/15 p-2.5 space-y-2';
    form.innerHTML = `
      <input
        type="text"
        name="evTitle"
        required
        maxlength="48"
        placeholder="Nume eveniment (ex: Vacanță, Examen, Release)..."
        class="w-full rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:outline-none select-text"
      />
      <div class="flex items-center gap-1.5">
        <input
          type="date"
          name="evDate"
          required
          class="flex-1 rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white focus:outline-none"
        />
        <button type="submit" class="rounded-lg bg-rose-500 hover:bg-rose-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Adaugă</button>
      </div>
    `;

    addBtn.addEventListener('click', () => {
      form.classList.toggle('hidden');
      if (!form.classList.contains('hidden')) {
        form.querySelector('input[name="evTitle"]').focus();
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = form.querySelector('input[name="evTitle"]').value.trim();
      const targetDate = form.querySelector('input[name="evDate"]').value;
      if (!title || !targetDate) return;

      items.push({
        id: `cd-${Date.now()}`,
        title,
        targetDate,
      });
      items.sort((a, b) => a.targetDate.localeCompare(b.targetDate));
      saveState();
      renderAllWidgets();
    });

    const listEl = document.createElement('div');
    listEl.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1';

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className =
        'py-8 text-center text-xs text-white/45 border border-dashed border-white/10 rounded-xl';
      empty.textContent = 'Niciun eveniment setat. Apasă pe „+ Eveniment”.';
      listEl.appendChild(empty);
    } else {
      items.forEach((ev) => {
        const target = new Date(`${ev.targetDate}T00:00:00`);
        const diffDays = Math.round((target - now) / 86400000);

        let badgeText = '';
        let badgeCls = '';
        if (diffDays > 1) {
          badgeText = `${diffDays} zile`;
          badgeCls = 'bg-accent-500/20 text-accent-300 border-accent-400/30';
        } else if (diffDays === 1) {
          badgeText = 'Mâine!';
          badgeCls = 'bg-amber-500/25 text-amber-200 border-amber-400/40';
        } else if (diffDays === 0) {
          badgeText = 'Astăzi! 🎉';
          badgeCls = 'bg-emerald-500/30 text-emerald-200 border-emerald-400/50';
        } else {
          badgeText = `Acum ${Math.abs(diffDays)}z`;
          badgeCls = 'bg-white/10 text-white/45 border-white/10';
        }

        const row = document.createElement('div');
        row.className =
          'group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2';
        row.innerHTML = `
          <div class="min-w-0 flex-1">
            <div class="text-xs font-semibold text-white truncate">${escapeHtml(ev.title)}</div>
            <div class="text-[10px] text-white/45 font-mono">${escapeHtml(ev.targetDate)}</div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg border ${badgeCls}">${badgeText}</span>
            <button type="button" data-del-cd class="opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/40 hover:text-rose-300 transition-opacity" title="Șterge evenimentul">✕</button>
          </div>
        `;

        row.querySelector('[data-del-cd]').addEventListener('click', () => {
          pushUndoState(`Evenimentul „${ev.title}”`);
          widget.data.items = items.filter((item) => item.id !== ev.id);
          saveState();
          renderAllWidgets();
        });

        listEl.appendChild(row);
      });
    }

    const footer = document.createElement('div');
    footer.className =
      'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
    footer.innerHTML = `
      <span>${items.length} evenimente monitorizate</span>
    `;

    cardEl.appendChild(header);
    cardEl.appendChild(form);
    cardEl.appendChild(listEl);
    cardEl.appendChild(footer);

    return header;
  }

  // -------------------- RANDARE COMPLETĂ CANVAS & MANAGER PANOURI --------------------
  function getWidgetTypeBadge(type) {
    if (type === 'links') return '🔗';
    if (type === 'todo') return '✅';
    if (type === 'notes') return '📝';
    if (type === 'calendar') return '📅';
    if (type === 'forecast') return '🌦️';
    if (type === 'clocks') return '🌍';
    if (type === 'countdown') return '⏳';
    return '📦';
  }

  function renderAllWidgets() {
    canvasEl.innerHTML = '';
    const activeWs = getActiveWorkspace();

    const visibleWidgets = activeWs.widgets.filter((w) => w.visible);
    widgetsCountBadge.textContent = `${visibleWidgets.length}/${activeWs.widgets.length}`;

    activeWs.widgets.forEach((widget) => {
      if (!widget.visible) return;

      const cardEl = document.createElement('article');
      cardEl.dataset.widgetId = widget.id;
      cardEl.className = 'glass-panel draggable-widget p-3.5 sm:p-4';
      cardEl.style.left = `${widget.position?.x ?? 20}px`;
      cardEl.style.top = `${widget.position?.y ?? 20}px`;
      cardEl.style.width = `${widget.position?.width ?? 390}px`;
      cardEl.style.height = `${widget.position?.height ?? 430}px`;
      cardEl.style.zIndex = String(widget.position?.zIndex ?? 10);

      cardEl.addEventListener('pointerdown', () => {
        bringToFront(widget, cardEl);
      });

      let handleEl = null;
      if (widget.type === 'links') {
        handleEl = buildLinksWidgetContent(widget, cardEl);
      } else if (widget.type === 'todo') {
        handleEl = buildTodoWidgetContent(widget, cardEl);
      } else if (widget.type === 'notes') {
        handleEl = buildNotesWidgetContent(widget, cardEl);
      } else if (widget.type === 'calendar') {
        handleEl = buildCalendarWidgetContent(widget, cardEl);
      } else if (widget.type === 'forecast') {
        handleEl = buildForecastWidgetContent(widget, cardEl);
      } else if (widget.type === 'clocks') {
        handleEl = buildClocksWidgetContent(widget, cardEl);
      } else if (widget.type === 'countdown') {
        handleEl = buildCountdownWidgetContent(widget, cardEl);
      }

      if (handleEl) {
        attachDragBehavior(widget, cardEl, handleEl);
      }

      const resizeEl = document.createElement('div');
      resizeEl.className = 'widget-resize-handle';
      resizeEl.title = 'Trage pentru a redimensiona panoul';
      resizeEl.innerHTML = `
        <svg class="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" d="M20 14L14 20M20 8L8 20" />
        </svg>
      `;
      cardEl.appendChild(resizeEl);
      attachResizeBehavior(widget, cardEl, resizeEl);

      canvasEl.appendChild(cardEl);
    });

    updateCanvasMinHeight();
    renderWidgetsManagerList();
  }

  function renderWidgetsManagerList() {
    widgetsManagerList.innerHTML = '';
    const activeWs = getActiveWorkspace();

    const weatherRow = document.createElement('div');
    weatherRow.className =
      'flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2.5 py-1.5 text-xs';
    weatherRow.innerHTML = `
      <span class="truncate text-white/85">☀️ Widget Vreme (Colț)</span>
    `;
    const weatherToggleBtn = document.createElement('button');
    weatherToggleBtn.type = 'button';
    weatherToggleBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium ${
      state.weatherVisible
        ? 'bg-accent-500/20 text-accent-300'
        : 'bg-white/10 text-white/50'
    }`;
    weatherToggleBtn.textContent = state.weatherVisible ? 'Vizibil' : 'Ascuns';
    weatherToggleBtn.addEventListener('click', () => {
      state.weatherVisible = !state.weatherVisible;
      document
        .getElementById('widget-weather')
        .classList.toggle('hidden', !state.weatherVisible);
      saveState();
      renderWidgetsManagerList();
    });
    weatherRow.appendChild(weatherToggleBtn);
    widgetsManagerList.appendChild(weatherRow);

    activeWs.widgets.forEach((w) => {
      const row = document.createElement('div');
      row.className =
        'flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2.5 py-1.5 text-xs';

      const badge = getWidgetTypeBadge(w.type);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'truncate text-white/85 flex-1';
      nameSpan.textContent = `${badge} ${w.title}`;

      const rightBtns = document.createElement('div');
      rightBtns.className = 'flex items-center gap-1 shrink-0';

      const visBtn = document.createElement('button');
      visBtn.type = 'button';
      visBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium ${
        w.visible ? 'bg-accent-500/20 text-accent-300' : 'bg-white/10 text-white/50'
      }`;
      visBtn.textContent = w.visible ? 'Vizibil' : 'Ascuns';
      visBtn.addEventListener('click', () => {
        w.visible = !w.visible;
        saveState();
        renderAllWidgets();
      });

      rightBtns.appendChild(visBtn);
      row.appendChild(nameSpan);
      row.appendChild(rightBtns);
      widgetsManagerList.appendChild(row);
    });
  }

  function computeNewWidgetPosition(defaultHeight = 420) {
    const activeWs = getActiveWorkspace();
    const visibleCount = activeWs.widgets.filter((w) => w.visible).length;
    const offset = (visibleCount % 6) * 34;
    const canvasWidth = canvasEl.clientWidth || window.innerWidth - 80;
    const baseX = Math.max(24, Math.min(canvasWidth - 420, 120 + offset * 2));
    const baseY = 24 + offset;

    state.maxZIndex = (state.maxZIndex || 25) + 1;
    return {
      x: baseX,
      y: baseY,
      width: 390,
      height: defaultHeight,
      zIndex: state.maxZIndex,
    };
  }

  function addNewWidget(type) {
    const activeWs = getActiveWorkspace();
    const countOfType = activeWs.widgets.filter((w) => w.type === type).length + 1;

    let newWidget = null;
    if (type === 'links') {
      newWidget = {
        id: `w-links-${Date.now()}`,
        type: 'links',
        title: `Scurtături #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(430),
        data: {
          viewMode: 'list',
          subgroups: [
            {
              id: `sg-${Date.now()}-1`,
              title: 'Principal',
              collapsed: false,
              items: [
                { id: `lnk-${Date.now()}-1`, title: 'Google', url: 'https://google.com' },
                { id: `lnk-${Date.now()}-2`, title: 'Wikipedia', url: 'https://wikipedia.org' },
              ],
            },
          ],
        },
      };
    } else if (type === 'todo') {
      newWidget = {
        id: `w-todo-${Date.now()}`,
        type: 'todo',
        title: `Listă Sarcini #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(430),
        data: {
          filter: 'all',
          items: [
            {
              id: `td-${Date.now()}-1`,
              text: 'Sarcină nouă în acest grup',
              completed: false,
              priority: 'normal',
              dueDate: '',
            },
          ],
        },
      };
    } else if (type === 'notes') {
      newWidget = {
        id: `w-notes-${Date.now()}`,
        type: 'notes',
        title: `Notițe #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(420),
        data: {
          previewMode: false,
          content: '',
          lastSaved: 'Nou creat',
        },
      };
    } else if (type === 'calendar') {
      const now = new Date();
      newWidget = {
        id: `w-cal-${Date.now()}`,
        type: 'calendar',
        title: 'Calendar Lunar',
        visible: true,
        position: computeNewWidgetPosition(360),
        data: {
          viewYear: now.getFullYear(),
          viewMonth: now.getMonth(),
        },
      };
    } else if (type === 'forecast') {
      newWidget = {
        id: `w-forecast-${Date.now()}`,
        type: 'forecast',
        title: 'Prognoză 5 Zile',
        visible: true,
        position: computeNewWidgetPosition(370),
        data: {},
      };
    } else if (type === 'clocks') {
      newWidget = {
        id: `w-clocks-${Date.now()}`,
        type: 'clocks',
        title: 'Ceasuri Mondiale',
        visible: true,
        position: computeNewWidgetPosition(350),
        data: {
          clocks: [
            { id: `clk-${Date.now()}-1`, city: 'Sibiu / București', tz: 'Europe/Bucharest' },
            { id: `clk-${Date.now()}-2`, city: 'Londra', tz: 'Europe/London' },
            { id: `clk-${Date.now()}-3`, city: 'New York', tz: 'America/New_York' },
          ],
        },
      };
    } else if (type === 'countdown') {
      const target = new Date();
      target.setDate(target.getDate() + 14);
      newWidget = {
        id: `w-cd-${Date.now()}`,
        type: 'countdown',
        title: 'Numărătoare Inversă',
        visible: true,
        position: computeNewWidgetPosition(340),
        data: {
          items: [
            {
              id: `cd-${Date.now()}-1`,
              title: 'Eveniment Important',
              targetDate: target.toISOString().slice(0, 10),
            },
          ],
        },
      };
    }

    if (!newWidget) return;
    activeWs.widgets.push(newWidget);
    saveState();
    renderAllWidgets();
    showToast(`✓ Panoul „${newWidget.title}” a fost adăugat!`);
  }

  function initMultiWidgetControls() {
    const addWidgetBtn = document.getElementById('add-widget-btn');
    const addWidgetPopover = document.getElementById('add-widget-popover');

    if (addWidgetBtn && addWidgetPopover) {
      addWidgetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        widgetsManagerPopover.classList.add('hidden');
        backupPopover.classList.add('hidden');
        addWidgetPopover.classList.toggle('hidden');
      });

      addWidgetPopover.querySelectorAll('[data-add-type]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const type = btn.getAttribute('data-add-type');
          addWidgetPopover.classList.add('hidden');
          if (type) addNewWidget(type);
        });
      });

      document.addEventListener('click', (e) => {
        if (!addWidgetPopover.contains(e.target) && !addWidgetBtn.contains(e.target)) {
          addWidgetPopover.classList.add('hidden');
        }
      });
    }

    autoArrangeBtn.addEventListener('click', () => {
      autoArrangeWidgets(true);
    });

    widgetsManagerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      backupPopover.classList.add('hidden');
      if (addWidgetPopover) addWidgetPopover.classList.add('hidden');
      widgetsManagerPopover.classList.toggle('hidden');
    });

    showAllWidgetsBtn.addEventListener('click', () => {
      const activeWs = getActiveWorkspace();
      state.weatherVisible = true;
      document.getElementById('widget-weather').classList.remove('hidden');
      activeWs.widgets.forEach((w) => {
        w.visible = true;
      });
      saveState();
      renderAllWidgets();
    });

    document.addEventListener('click', (e) => {
      if (
        !widgetsManagerPopover.contains(e.target) &&
        !widgetsManagerBtn.contains(e.target)
      ) {
        widgetsManagerPopover.classList.add('hidden');
      }
    });

    document
      .getElementById('widget-weather')
      .classList.toggle('hidden', !state.weatherVisible);

    const activeWs = getActiveWorkspace();
    if (!activeWs.initializedLayout) {
      activeWs.initializedLayout = true;
      autoArrangeWidgets(true);
    } else {
      renderAllWidgets();
    }
  }

  // ==========================================================================
  // 8. FUNDAL, TEMĂ (DARK/LIGHT), CULOARE DE ACCENT & EFECT DE STICLĂ
  // ==========================================================================

  const bgLayer = document.getElementById('bg-layer');
  const bgModeLabel = document.getElementById('bg-mode-label');
  const bgLocationLabel = document.getElementById('bg-location-label');
  const changeBgBtn = document.getElementById('change-bg-btn');
  const toggleBgModeBtn = document.getElementById('toggle-bg-mode-btn');

  const visualSettingsBtn = document.getElementById('visual-settings-btn');
  const visualSettingsPopover = document.getElementById('visual-settings-popover');
  const resetVisualSettingsBtn = document.getElementById('reset-visual-settings-btn');
  const customBgUrlInput = document.getElementById('custom-bg-url-input');
  const applyCustomBgBtn = document.getElementById('apply-custom-bg-btn');
  const localBgFileInput = document.getElementById('local-bg-file-input');

  const overlayDimSlider = document.getElementById('overlay-dim-slider');
  const overlayDimVal = document.getElementById('overlay-dim-val');
  const glassOpacitySlider = document.getElementById('glass-opacity-slider');
  const glassOpacityVal = document.getElementById('glass-opacity-val');
  const glassBlurSlider = document.getElementById('glass-blur-slider');
  const glassBlurVal = document.getElementById('glass-blur-val');

  function renderAccentSwatches() {
    const container = document.getElementById('accent-swatches');
    if (!container) return;
    container.innerHTML = '';

    const activeKey = state.visual?.accentColor || 'emerald';
    Object.entries(ACCENT_PALETTES).forEach(([key, pal]) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.title = pal.label;
      btn.className = `h-6 w-6 rounded-full border-2 transition-transform ${
        activeKey === key ? 'scale-110 border-white shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
      }`;
      btn.style.backgroundColor = pal.hex;
      btn.addEventListener('click', () => {
        state.visual.accentColor = key;
        applyVisualSettings();
        saveState();
      });
      container.appendChild(btn);
    });
  }

  function applyVisualSettings() {
    const v = state.visual || DEFAULT_VISUAL_SETTINGS;
    document.documentElement.style.setProperty('--overlay-dim', String((v.overlayDim ?? 22) / 100));
    document.documentElement.style.setProperty('--glass-opacity', String((v.glassOpacity ?? 56) / 100));
    document.documentElement.style.setProperty('--glass-blur', `${v.glassBlur ?? 22}px`);

    // Aplică paleta de accent
    const palKey = v.accentColor && ACCENT_PALETTES[v.accentColor] ? v.accentColor : 'emerald';
    const shades = ACCENT_PALETTES[palKey].shades;
    Object.entries(shades).forEach(([shade, rgb]) => {
      document.documentElement.style.setProperty(`--accent-${shade}`, rgb);
    });

    // Aplică tema panourilor (dark / light)
    const theme = v.theme === 'light' ? 'light' : 'dark';
    document.body.classList.toggle('theme-light', theme === 'light');
    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-option') === theme);
    });

    renderAccentSwatches();

    overlayDimSlider.value = String(v.overlayDim ?? 22);
    overlayDimVal.textContent = `${v.overlayDim ?? 22}%`;

    glassOpacitySlider.value = String(v.glassOpacity ?? 56);
    glassOpacityVal.textContent = `${v.glassOpacity ?? 56}%`;

    glassBlurSlider.value = String(v.glassBlur ?? 22);
    glassBlurVal.textContent = `${v.glassBlur ?? 22}px`;

    customBgUrlInput.value =
      state.background.customUrl &&
      !state.background.customUrl.startsWith('data:') &&
      state.background.customUrl !== IDB_MARKER
        ? state.background.customUrl
        : '';
  }

  function applyBackground() {
    const { mode, index, customUrl } = state.background;

    if (mode === 'custom' && customUrl) {
      const effectiveUrl = customUrl === IDB_MARKER ? cachedIdbBgDataUrl : customUrl;
      if (effectiveUrl) {
        bgModeLabel.textContent = 'Imagine Proprie';
        bgLocationLabel.textContent = '🖼️ Imagine personalizată';
        bgLayer.style.backgroundImage = `url('${effectiveUrl}')`;
        return;
      }
    }

    if (mode === 'gradient') {
      const grad = MINIMAL_GRADIENTS[index % MINIMAL_GRADIENTS.length];
      bgLayer.style.backgroundImage = grad.css;
      bgModeLabel.textContent = 'Gradient';
      bgLocationLabel.textContent = `✨ ${grad.location}`;
      return;
    }

    const item = UNSPLASH_BACKGROUNDS[index % UNSPLASH_BACKGROUNDS.length];
    bgModeLabel.textContent = 'Foto 4K Unsplash';
    bgLocationLabel.textContent = `📍 ${item.location}`;

    const img = new Image();
    img.onload = () => {
      bgLayer.style.backgroundImage = `url('${item.url}')`;
    };
    img.onerror = () => {
      bgLayer.style.backgroundImage = MINIMAL_GRADIENTS[0].css;
    };
    img.src = item.url;
  }

  async function initBackgroundAndVisualSettings() {
    // Dacă utilizatorul avea o imagine data:URL în localStorage din versiunea anterioară, o migrăm în IndexedDB
    if (state.background.customUrl && state.background.customUrl.startsWith('data:')) {
      await saveCustomBgToIDB(state.background.customUrl);
      state.background.customUrl = IDB_MARKER;
      saveState();
    } else if (state.background.customUrl === IDB_MARKER) {
      await loadCustomBgFromIDB();
    }

    changeBgBtn.addEventListener('click', () => {
      if (state.background.mode === 'custom') {
        state.background.mode = 'unsplash';
      }
      const list =
        state.background.mode === 'gradient' ? MINIMAL_GRADIENTS : UNSPLASH_BACKGROUNDS;
      let nextIndex = (state.background.index + 1) % list.length;
      if (list.length > 2 && Math.random() > 0.5) {
        const candidates = list
          .map((_, idx) => idx)
          .filter((idx) => idx !== state.background.index);
        nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
      }
      state.background.index = nextIndex;
      saveState();
      applyBackground();
    });

    toggleBgModeBtn.addEventListener('click', () => {
      const hasCustom =
        Boolean(state.background.customUrl) &&
        (state.background.customUrl !== IDB_MARKER || Boolean(cachedIdbBgDataUrl));

      if (state.background.mode === 'unsplash') {
        state.background.mode = 'gradient';
      } else if (state.background.mode === 'gradient' && hasCustom) {
        state.background.mode = 'custom';
      } else {
        state.background.mode = 'unsplash';
      }
      state.background.index = 0;
      saveState();
      applyBackground();
    });

    visualSettingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      visualSettingsPopover.classList.toggle('hidden');
    });

    document.querySelectorAll('[data-theme-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = btn.getAttribute('data-theme-option');
        state.visual.theme = chosen === 'light' ? 'light' : 'dark';
        applyVisualSettings();
        saveState();
      });
    });

    applyCustomBgBtn.addEventListener('click', () => {
      const url = customBgUrlInput.value.trim();
      if (!url) return;
      state.background.customUrl = url;
      state.background.mode = 'custom';
      saveState();
      applyBackground();
      showToast('✓ Fundal URL personalizat aplicat!');
    });

    if (localBgFileInput) {
      localBgFileInput.addEventListener('change', (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const dataUrl = String(ev.target?.result || '');
          if (!dataUrl) return;
          await saveCustomBgToIDB(dataUrl);
          state.background.customUrl = IDB_MARKER;
          state.background.mode = 'custom';
          saveState();
          applyBackground();
          showToast('✓ Imaginea din calculator a fost salvată în IndexedDB și setată ca fundal!');
          localBgFileInput.value = '';
        };
        reader.readAsDataURL(file);
      });
    }

    overlayDimSlider.addEventListener('input', () => {
      state.visual.overlayDim = Number(overlayDimSlider.value);
      applyVisualSettings();
      saveState();
    });

    glassOpacitySlider.addEventListener('input', () => {
      state.visual.glassOpacity = Number(glassOpacitySlider.value);
      applyVisualSettings();
      saveState();
    });

    glassBlurSlider.addEventListener('input', () => {
      state.visual.glassBlur = Number(glassBlurSlider.value);
      applyVisualSettings();
      saveState();
    });

    resetVisualSettingsBtn.addEventListener('click', async () => {
      state.visual = structuredClone(DEFAULT_VISUAL_SETTINGS);
      state.background.customUrl = '';
      await clearCustomBgFromIDB();
      if (state.background.mode === 'custom') {
        state.background.mode = 'unsplash';
      }
      applyVisualSettings();
      applyBackground();
      saveState();
      showToast('Setările de aspect au fost resetate');
    });

    document.addEventListener('click', (e) => {
      if (
        !visualSettingsPopover.contains(e.target) &&
        !visualSettingsBtn.contains(e.target)
      ) {
        visualSettingsPopover.classList.add('hidden');
      }
    });

    applyVisualSettings();
    applyBackground();
  }

  // ==========================================================================
  // 9. WIDGET VREME (SIBIU IMPLICIT, OPEN-METEO API + FALLBACK MOCK-UP)
  // ==========================================================================

  const weatherIconEl = document.getElementById('weather-icon');
  const weatherTempEl = document.getElementById('weather-temp');
  const weatherDescEl = document.getElementById('weather-desc');
  const weatherCityEl = document.getElementById('weather-city');
  const weatherWindEl = document.getElementById('weather-wind');
  const weatherCityBtn = document.getElementById('weather-city-btn');
  const weatherCityPopover = document.getElementById('weather-city-popover');
  const weatherCityList = document.getElementById('weather-city-list');

  function mapWmoCodeToRo(code) {
    if (code === 0) return { desc: 'Senin', icon: '☀️' };
    if (code === 1 || code === 2) return { desc: 'Parțial noros', icon: '⛅' };
    if (code === 3) return { desc: 'Înnorat', icon: '☁️' };
    if (code >= 45 && code <= 48) return { desc: 'Ceață', icon: '🌫️' };
    if (code >= 51 && code <= 67) return { desc: 'Ploaie ușoară', icon: '🌧️' };
    if (code >= 71 && code <= 77) return { desc: 'Ninsoare', icon: '❄️' };
    if (code >= 80 && code <= 82) return { desc: 'Averse', icon: '🌦️' };
    if (code >= 95) return { desc: 'Furtună', icon: '⛈️' };
    return { desc: 'Variabil', icon: '🌤️' };
  }

  async function updateWeather() {
    const cityObj =
      WEATHER_CITIES.find((c) => c.name === state.weatherCity) || WEATHER_CITIES[0];

    weatherCityEl.textContent = cityObj.name;
    weatherTempEl.textContent = `${cityObj.mockTemp}°C`;
    weatherDescEl.textContent = cityObj.mockDesc;
    weatherWindEl.textContent = `${cityObj.mockWind} km/h`;
    weatherIconEl.textContent = cityObj.mockIcon;

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&current_weather=true`;
      const response = await fetch(url);
      if (!response.ok) return;
      const data = await response.json();
      if (data && data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const wind = Math.round(data.current_weather.windspeed);
        const mapped = mapWmoCodeToRo(data.current_weather.weathercode);

        weatherTempEl.textContent = `${temp}°C`;
        weatherWindEl.textContent = `${wind} km/h`;
        weatherDescEl.textContent = mapped.desc;
        weatherIconEl.textContent = mapped.icon;
      }
    } catch {
      // Dacă nu există conexiune la internet, rămân afișate datele mock-up
    }
  }

  function initWeatherWidget() {
    weatherCityList.innerHTML = '';
    WEATHER_CITIES.forEach((city) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = city.name;
      btn.className =
        'px-2.5 py-1.5 rounded-xl text-left text-white/80 hover:text-white hover:bg-white/15 transition-colors';
      btn.addEventListener('click', () => {
        state.weatherCity = city.name;
        saveState();
        weatherCityPopover.classList.add('hidden');
        updateWeather();
        renderAllWidgets();
      });
      weatherCityList.appendChild(btn);
    });

    weatherCityBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      weatherCityPopover.classList.toggle('hidden');
    });

    document.addEventListener('click', (e) => {
      if (!weatherCityPopover.contains(e.target) && e.target !== weatherCityBtn) {
        weatherCityPopover.classList.add('hidden');
      }
    });

    updateWeather();
  }

  // ==========================================================================
  // 10. CITATE MOTIVAȚIONALE ÎN SUBSOL
  // ==========================================================================

  const dailyQuoteEl = document.getElementById('daily-quote');
  const nextQuoteBtn = document.getElementById('next-quote-btn');

  function renderQuote() {
    const q = QUOTES[state.quoteIndex % QUOTES.length];
    dailyQuoteEl.textContent = q;
  }

  function initQuotes() {
    renderQuote();
    nextQuoteBtn.addEventListener('click', () => {
      state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
      saveState();
      renderQuote();
    });
  }

  // ==========================================================================
  // 11. INIȚIALIZARE APLICAȚIE
  // ==========================================================================

  function init() {
    updateClock();
    setInterval(updateClock, 1000);

    renderWorkspacesBar();
    initGreetingAndFocus();
    initGlobalSearchAndShortcuts();
    initBackupControls();
    initBackgroundAndVisualSettings();
    initWeatherWidget();
    initMultiWidgetControls();
    initQuotes();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
