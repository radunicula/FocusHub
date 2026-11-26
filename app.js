// GENERATED FILE — do not edit. Edit the modules in src/ and run `npm run build:js`.
"use strict";
(() => {
  // src/constants.js
  var STORAGE_KEY_V3 = "zenith_productivity_dashboard_v3";
  var STORAGE_KEY_V2 = "zenith_productivity_dashboard_v2";
  var STORAGE_KEY_V1 = "zenith_productivity_dashboard_v1";
  var IDB_NAME = "dashboard_custom_assets_db";
  var IDB_STORE = "backgrounds";
  var IDB_BG_KEY = "custom_bg_data_url";
  var IDB_SYNC_HANDLE_KEY = "autosync_file_handle";
  var IDB_MARKER = "idb://custom-bg";
  var UNSPLASH_BACKGROUNDS = [
    {
      url: "https://images.unsplash.com/photo-1550242499-b5171f56de56?auto=format&fit=max&w=3840&q=95",
      location: "Automotive Night Drive (4K) — Unsplash",
      category: "automotive"
    },
    {
      url: "https://images.unsplash.com/photo-1785910723999-37ab033d898b?auto=format&fit=max&w=3840&q=95",
      location: "Automotive Digital Cockpit (4K) — Unsplash",
      category: "automotive"
    },
    {
      url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=max&w=3840&q=95",
      location: "Electric Vehicle & Mobility (4K) — Unsplash",
      category: "automotive"
    },
    {
      url: "https://images.unsplash.com/photo-1623346483743-b968a27ed34c?auto=format&fit=max&w=3840&q=95",
      location: "Performance Automotive Design (4K) — Unsplash",
      category: "automotive"
    },
    {
      url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=max&w=3840&q=95",
      location: "Software Engineering & Source Code (4K) — Unsplash",
      category: "software"
    },
    {
      url: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=max&w=3840&q=95",
      location: "Code Architecture & Terminal (4K) — Unsplash",
      category: "software"
    },
    {
      url: "https://images.unsplash.com/photo-1623281185000-6940e5347d2e?auto=format&fit=max&w=3840&q=95",
      location: "Developer Workstation Setup (4K) — Unsplash",
      category: "software"
    },
    {
      url: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=max&w=3840&q=95",
      location: "Embedded Systems & PCB Engineering (4K) — Unsplash",
      category: "software"
    },
    {
      url: "https://images.unsplash.com/photo-1610457642191-05328cdf34ff?auto=format&fit=max&w=3840&q=95",
      location: "Radar Array & Antenna Systems (4K) — Unsplash",
      category: "radar"
    },
    {
      url: "https://images.unsplash.com/photo-1714255288526-cc155b548aac?auto=format&fit=max&w=3840&q=95",
      location: "High-Frequency Radar Dish (4K) — Unsplash",
      category: "radar"
    },
    {
      url: "https://images.unsplash.com/photo-1526666923127-b2970f64b422?auto=format&fit=max&w=3840&q=95",
      location: "Telemetry & Radar Tracking Array (4K) — Unsplash",
      category: "radar"
    },
    {
      url: "https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=max&w=3840&q=95",
      location: "Microchip & Radar Sensor Electronics (4K) — Unsplash",
      category: "radar"
    },
    // Calm, neutral landscapes (no vehicles, people or man-made objects). Appended at the end so
    // saved background indexes keep pointing to the same photos.
    {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=max&w=3840&q=95",
      location: "Yosemite Valley at Dawn (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=max&w=3840&q=95",
      location: "Misty Green Cliffs (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=max&w=3840&q=95",
      location: "Sunlit Forest (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=max&w=3840&q=95",
      location: "Calm Beach at Sunset (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=max&w=3840&q=95",
      location: "Starry Night over the Mountains (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=max&w=3840&q=95",
      location: "Alpine Valley (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=max&w=3840&q=95",
      location: "Misty Hills (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?auto=format&fit=max&w=3840&q=95",
      location: "Ocean Sunset (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=max&w=3840&q=95",
      location: "Ocean Waves (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=max&w=3840&q=95",
      location: "Granite Cliffs & Pines (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=max&w=3840&q=95",
      location: "Aerial Ocean Shore (4K) — Unsplash",
      category: "nature"
    },
    {
      url: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=max&w=3840&q=95",
      location: "Storm Clouds (4K) — Unsplash",
      category: "nature"
    }
  ];
  var MINIMAL_GRADIENTS = [
    {
      css: "radial-gradient(circle at 20% 20%, #1e293b 0%, #0f172a 45%, #020617 100%)",
      location: "Gradient Minimalist — Midnight Slate"
    },
    {
      css: "linear-gradient(135deg, #064e3b 0%, #0f172a 55%, #020617 100%)",
      location: "Minimalist Gradient — Northern Lights"
    },
    {
      css: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 55%, #090d16 100%)",
      location: "Gradient Minimalist — Deep Cosmos"
    },
    {
      css: "linear-gradient(135deg, #31102f 0%, #111827 55%, #030712 100%)",
      location: "Gradient Minimalist — Dusk Horizon"
    }
  ];
  var LIGHT_MINIMAL_GRADIENTS = [
    {
      css: "radial-gradient(circle at 20% 20%, #ffffff 0%, #e0f2ec 48%, #cbded8 100%)",
      location: "Light Gradient — Soft Sage"
    },
    {
      css: "linear-gradient(135deg, #f0fdfa 0%, #dbeafe 55%, #c7d2fe 100%)",
      location: "Light Gradient — Morning Sky"
    },
    {
      css: "linear-gradient(135deg, #fff7ed 0%, #fce7d5 52%, #e9d5ff 100%)",
      location: "Light Gradient — Warm Horizon"
    },
    {
      css: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 55%, #dbeafe 100%)",
      location: "Light Gradient — Cloud Drift"
    }
  ];
  var ACCENT_PALETTES = {
    emerald: {
      label: "Emerald",
      hex: "#10b981",
      shades: {
        100: "209 250 229",
        200: "167 243 208",
        300: "110 231 183",
        400: "52 211 153",
        500: "16 185 129",
        600: "5 150 105",
        700: "4 120 87"
      }
    },
    sky: {
      label: "Sky Blue",
      hex: "#0ea5e9",
      shades: {
        100: "224 242 254",
        200: "186 230 253",
        300: "125 211 252",
        400: "56 189 248",
        500: "14 165 233",
        600: "2 132 199",
        700: "3 105 161"
      }
    },
    violet: {
      label: "Royal Violet",
      hex: "#8b5cf6",
      shades: {
        100: "237 233 254",
        200: "221 214 254",
        300: "196 181 253",
        400: "167 139 250",
        500: "139 92 246",
        600: "124 58 237",
        700: "109 40 217"
      }
    },
    amber: {
      label: "Amber",
      hex: "#f59e0b",
      shades: {
        100: "254 243 199",
        200: "253 230 138",
        300: "252 211 77",
        400: "251 191 36",
        500: "245 158 11",
        600: "217 119 6",
        700: "180 83 9"
      }
    },
    rose: {
      label: "Coral Pink",
      hex: "#f43f5e",
      shades: {
        100: "255 228 230",
        200: "254 205 211",
        300: "253 164 175",
        400: "251 113 133",
        500: "244 63 94",
        600: "225 29 72",
        700: "190 18 60"
      }
    },
    cyan: {
      label: "Turquoise",
      hex: "#06b6d4",
      shades: {
        100: "207 250 254",
        200: "165 243 252",
        300: "103 232 249",
        400: "34 211 238",
        500: "6 182 212",
        600: "8 145 178",
        700: "14 116 144"
      }
    }
  };
  var SEARCH_ENGINES = [
    { name: "Google", url: "https://www.google.com/search?q=" },
    { name: "DuckDuckGo", url: "https://duckduckgo.com/?q=" },
    { name: "YouTube", url: "https://www.youtube.com/results?search_query=" },
    { name: "GitHub", url: "https://github.com/search?q=" }
  ];
  var WEATHER_CITIES = [
    { name: "Sibiu", lat: 45.7983, lon: 24.1256, mockTemp: 17, mockDesc: "Clear", mockWind: 10, mockIcon: "☀️" },
    { name: "Bucharest", lat: 44.4268, lon: 26.1025, mockTemp: 21, mockDesc: "Clear", mockWind: 11, mockIcon: "☀️" },
    { name: "Cluj-Napoca", lat: 46.7712, lon: 23.6236, mockTemp: 18, mockDesc: "Partly cloudy", mockWind: 9, mockIcon: "⛅" },
    { name: "Timisoara", lat: 45.7489, lon: 21.2087, mockTemp: 22, mockDesc: "Clear", mockWind: 14, mockIcon: "☀️" },
    { name: "Iasi", lat: 47.1585, lon: 27.6014, mockTemp: 19, mockDesc: "Partly cloudy", mockWind: 12, mockIcon: "🌤️" },
    { name: "Brasov", lat: 45.6427, lon: 25.5887, mockTemp: 16, mockDesc: "Cool", mockWind: 8, mockIcon: "⛅" },
    { name: "Constanta", lat: 44.1598, lon: 28.6348, mockTemp: 20, mockDesc: "Light breeze", mockWind: 19, mockIcon: "🌤️" }
  ];
  var WORLD_TIMEZONES = [
    { city: "Sibiu / Bucharest", tz: "Europe/Bucharest", country: "RO" },
    { city: "London", tz: "Europe/London", country: "UK" },
    { city: "Paris / Berlin", tz: "Europe/Paris", country: "EU" },
    { city: "New York", tz: "America/New_York", country: "US" },
    { city: "Los Angeles", tz: "America/Los_Angeles", country: "US" },
    { city: "Tokyo", tz: "Asia/Tokyo", country: "JP" },
    { city: "Dubai", tz: "Asia/Dubai", country: "AE" },
    { city: "Sydney", tz: "Australia/Sydney", country: "AU" },
    { city: "UTC / GMT", tz: "UTC", country: "🌐" }
  ];
  var DEFAULT_SUBGROUPS = [
    {
      id: "sg-dev",
      title: "Development & AI",
      collapsed: false,
      items: [
        { id: "lnk-1", title: "GitHub", url: "https://github.com" },
        { id: "lnk-2", title: "ChatGPT", url: "https://chatgpt.com" },
        { id: "lnk-3", title: "MDN Web Docs", url: "https://developer.mozilla.org" },
        { id: "lnk-4", title: "Stack Overflow", url: "https://stackoverflow.com" }
      ]
    },
    {
      id: "sg-daily",
      title: "Daily & Organization",
      collapsed: false,
      items: [
        { id: "lnk-5", title: "Gmail", url: "https://mail.google.com" },
        { id: "lnk-6", title: "Notion", url: "https://notion.so" },
        { id: "lnk-7", title: "YouTube", url: "https://youtube.com" },
        { id: "lnk-8", title: "Figma", url: "https://figma.com" }
      ]
    }
  ];
  var DEFAULT_TODOS = [
    { id: "td-1", text: "Plan today's top priorities", completed: true, priority: "normal", dueDate: "" },
    { id: "td-2", text: "Drag links or tasks between lists", completed: false, priority: "high", dueDate: "" },
    { id: "td-3", text: "Use Ctrl+K for instant search", completed: false, priority: "normal", dueDate: "" }
  ];
  var QUOTES = [
    '"Simplicity is the ultimate sophistication." — Leonardo da Vinci',
    '"The secret of getting ahead is getting started." — Mark Twain',
    '"Focus on being productive instead of busy." — Tim Ferriss',
    '"Quality is not an act, it is a habit." — Aristotle',
    '"Discipline is the bridge between goals and accomplishment." — Jim Rohn',
    '"Don’t count the days, make the days count." — Muhammad Ali'
  ];
  var DEFAULT_VISUAL_SETTINGS = {
    overlayDim: 22,
    // % background dimming
    glassOpacity: 56,
    // % panel opacity
    glassBlur: 22,
    // px panel blur
    theme: "dark",
    // 'dark' | 'light'
    accentColor: "emerald",
    // 'emerald' | 'sky' | 'violet' | 'amber' | 'rose' | 'cyan'
    sharpBgMigrated: true
  };

  // src/defaults.js
  function createInitialWidgetsForMain() {
    return [
      {
        id: "w-links-1",
        type: "links",
        title: "Quick Links",
        visible: true,
        position: { x: 24, y: 12, width: 390, height: 440, zIndex: 10 },
        data: {
          viewMode: "list",
          subgroups: structuredClone(DEFAULT_SUBGROUPS)
        }
      },
      {
        id: "w-todo-1",
        type: "todo",
        title: "To-Do List",
        visible: true,
        position: { x: 436, y: 12, width: 400, height: 440, zIndex: 11 },
        data: {
          filter: "all",
          items: structuredClone(DEFAULT_TODOS)
        }
      },
      {
        id: "w-notes-1",
        type: "notes",
        title: "Quick Notes",
        visible: true,
        position: { x: 860, y: 12, width: 390, height: 440, zIndex: 12 },
        data: {
          content: "# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click this note to edit it, then click outside to see the formatted preview!",
          lastSaved: "Synced locally"
        }
      }
    ];
  }
  function createInitialWorkspaces() {
    return [
      {
        id: "ws-main",
        name: "🏠 Main",
        initializedLayout: false,
        widgets: createInitialWidgetsForMain()
      },
      {
        id: "ws-work",
        name: "💼 Work & Dev",
        initializedLayout: false,
        widgets: [
          {
            id: "w-links-work-1",
            type: "links",
            title: "Project Resources",
            visible: true,
            position: { x: 40, y: 16, width: 410, height: 420, zIndex: 10 },
            data: {
              viewMode: "list",
              subgroups: [
                {
                  id: "sg-work-1",
                  title: "Repos & Cloud",
                  collapsed: false,
                  items: [
                    { id: "lnk-w1", title: "GitHub", url: "https://github.com" },
                    { id: "lnk-w2", title: "GitLab", url: "https://gitlab.com" },
                    { id: "lnk-w3", title: "Cloudflare Dashboard", url: "https://dash.cloudflare.com" }
                  ]
                },
                {
                  id: "sg-work-2",
                  title: "Documentation",
                  collapsed: false,
                  items: [
                    { id: "lnk-w4", title: "Tailwind CSS Docs", url: "https://tailwindcss.com/docs" },
                    { id: "lnk-w5", title: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" }
                  ]
                }
              ]
            }
          },
          {
            id: "w-todo-work-1",
            type: "todo",
            title: "Sprint & Tasks",
            visible: true,
            position: { x: 475, y: 16, width: 410, height: 420, zIndex: 11 },
            data: {
              filter: "all",
              items: [
                { id: "td-w1", text: "Review open pull requests", completed: false, priority: "high", dueDate: "" },
                { id: "td-w2", text: "Update technical documentation", completed: false, priority: "normal", dueDate: "" }
              ]
            }
          },
          {
            id: "w-notes-work-1",
            type: "notes",
            title: "Technical Journal",
            visible: true,
            position: { x: 910, y: 16, width: 380, height: 420, zIndex: 12 },
            data: {
              content: "Notes for work projects...",
              lastSaved: "Synced locally"
            }
          }
        ]
      }
    ];
  }
  function createDefaultState() {
    return {
      userName: "Explorer",
      dailyFocus: {
        text: "",
        completed: false
      },
      searchEngineIndex: 0,
      weatherVisible: true,
      weatherCity: "Sibiu",
      background: {
        mode: "unsplash",
        // 'unsplash' | 'gradient' | 'custom'
        index: 0,
        customUrl: "",
        category: "all",
        // 'all' | 'automotive' | 'software' | 'radar'
        dailyAutoChange: false,
        lastAutoChangeDate: ""
      },
      layoutLocked: false,
      visual: structuredClone(DEFAULT_VISUAL_SETTINGS),
      quoteIndex: 0,
      maxZIndex: 25,
      activeWorkspaceId: "ws-main",
      workspaces: createInitialWorkspaces()
    };
  }
  function ensureLinksSubgroups(widget) {
    if (widget.type !== "links") return;
    if (!widget.data) widget.data = { viewMode: "list", subgroups: [] };
    if (!widget.data.viewMode) widget.data.viewMode = "list";
    if (!Array.isArray(widget.data.subgroups)) {
      const legacyItems = Array.isArray(widget.data.items) ? widget.data.items : [];
      widget.data.subgroups = [
        {
          id: `sg-${Date.now()}-1`,
          title: "General",
          collapsed: false,
          items: legacyItems
        }
      ];
      delete widget.data.items;
    }
    if (widget.data.subgroups.length === 0) {
      widget.data.subgroups.push({
        id: `sg-${Date.now()}-default`,
        title: "General",
        collapsed: false,
        items: []
      });
    }
  }

  // src/storage/idb.js
  var cachedIdbBgDataUrl = "";
  function openAssetsDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error("IndexedDB is unavailable"));
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
    cachedIdbBgDataUrl = dataUrl || "";
    try {
      const db = await openAssetsDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(dataUrl, IDB_BG_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    } catch (err) {
      console.warn("Could not save image to IndexedDB:", err);
    }
  }
  async function loadCustomBgFromIDB() {
    try {
      const db = await openAssetsDB();
      const val = await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readonly");
        const getReq = tx.objectStore(IDB_STORE).get(IDB_BG_KEY);
        getReq.onsuccess = () => resolve(getReq.result || "");
        getReq.onerror = () => reject(getReq.error);
      });
      db.close();
      cachedIdbBgDataUrl = typeof val === "string" ? val : "";
      return cachedIdbBgDataUrl;
    } catch {
      return "";
    }
  }
  async function clearCustomBgFromIDB() {
    cachedIdbBgDataUrl = "";
    try {
      const db = await openAssetsDB();
      await new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).delete(IDB_BG_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
      db.close();
    } catch {
    }
  }

  // src/storage/autosync.js
  var autoSyncFileHandle = null;
  var autoSyncDebounceTimer = null;
  async function saveSyncFileHandleToIDB(handle) {
    try {
      const db = await openAssetsDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).put(handle, IDB_SYNC_HANDLE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    } catch (err) {
      console.warn("Could not save sync file handle to IndexedDB:", err);
    }
  }
  async function loadSyncFileHandleFromIDB() {
    try {
      const db = await openAssetsDB();
      const val = await new Promise((resolve, reject) => {
        const tx = db.transaction(IDB_STORE, "readonly");
        const req = tx.objectStore(IDB_STORE).get(IDB_SYNC_HANDLE_KEY);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
      db.close();
      return val;
    } catch {
      return null;
    }
  }
  async function clearSyncFileHandleFromIDB() {
    autoSyncFileHandle = null;
    try {
      const db = await openAssetsDB();
      await new Promise((resolve) => {
        const tx = db.transaction(IDB_STORE, "readwrite");
        tx.objectStore(IDB_STORE).delete(IDB_SYNC_HANDLE_KEY);
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
      db.close();
    } catch {
    }
  }
  function buildExportPayloadObject() {
    const exportPayload = structuredClone(state);
    if (exportPayload.background?.customUrl === IDB_MARKER && cachedIdbBgDataUrl) {
      exportPayload.customBgDataUrl = cachedIdbBgDataUrl;
    }
    return exportPayload;
  }
  function updateAutoSyncUI(statusText = null) {
    const badge = document.getElementById("autosync-status-badge");
    const textEl = document.getElementById("autosync-status-text");
    const connectBtn = document.getElementById("autosync-connect-btn");
    const nowBtn = document.getElementById("autosync-now-btn");
    const disconnectBtn = document.getElementById("autosync-disconnect-btn");
    if (!badge || !textEl || !connectBtn) return;
    if (autoSyncFileHandle) {
      badge.textContent = "Linked";
      badge.className = "text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-500/25 text-accent-300";
      textEl.textContent = statusText || `Linked to “${autoSyncFileHandle.name}”. Changes auto-save here.`;
      connectBtn.innerHTML = "<span>🔄 Change File</span>";
      if (nowBtn) nowBtn.classList.remove("hidden");
      if (disconnectBtn) disconnectBtn.classList.remove("hidden");
    } else {
      badge.textContent = "Off";
      badge.className = "text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/60";
      textEl.textContent = statusText || "Link a local .json file (e.g. in OneDrive) to auto-save every change across browsers.";
      connectBtn.innerHTML = "<span>🔗 Connect File</span>";
      if (nowBtn) nowBtn.classList.add("hidden");
      if (disconnectBtn) disconnectBtn.classList.add("hidden");
    }
  }
  async function writeAutoSyncFile(requestPermission = false) {
    if (!autoSyncFileHandle) return false;
    try {
      let perm = await autoSyncFileHandle.queryPermission({ mode: "readwrite" });
      if (perm !== "granted" && requestPermission) {
        perm = await autoSyncFileHandle.requestPermission({ mode: "readwrite" });
      }
      if (perm !== "granted") {
        updateAutoSyncUI(`Linked to “${autoSyncFileHandle.name}” — click Sync to grant write access.`);
        return false;
      }
      const writable = await autoSyncFileHandle.createWritable();
      await writable.write(JSON.stringify(buildExportPayloadObject(), null, 2));
      await writable.close();
      const timeStr = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      updateAutoSyncUI(`Synced to “${autoSyncFileHandle.name}” at ${timeStr}`);
      return true;
    } catch (err) {
      console.warn("Auto-sync write failed:", err);
      return false;
    }
  }
  function scheduleAutoSyncWrite() {
    if (!autoSyncFileHandle) return;
    if (autoSyncDebounceTimer) clearTimeout(autoSyncDebounceTimer);
    autoSyncDebounceTimer = setTimeout(() => {
      autoSyncDebounceTimer = null;
      writeAutoSyncFile(false);
    }, 800);
  }
  function setAutoSyncFileHandle(handle) {
    autoSyncFileHandle = handle;
  }

  // src/utils.js
  function debounce(fn, delay = 260) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }
  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str || "";
    return div.innerHTML;
  }
  var toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove("opacity-0", "translate-y-2");
    toast.classList.add("opacity-100", "translate-y-0");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      toast.classList.remove("opacity-100", "translate-y-0");
    }, 2800);
  }
  function normalizeUrl(rawUrl) {
    const trimmed = (rawUrl || "").trim();
    if (!trimmed) return "https://example.com";
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  }
  function isSafeLinkUrl(url) {
    if (typeof url !== "string" || !url.trim()) return false;
    try {
      const { protocol } = new URL(url.trim());
      return protocol === "http:" || protocol === "https:";
    } catch {
      return false;
    }
  }
  function extractDomain(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return "example.com";
    }
  }

  // src/widgets/header.js
  function createWidgetHeader(widget, badgeColorClass, iconSvg, extraActionsFragment, { menuItems = [] } = {}) {
    const header = document.createElement("div");
    header.className = "widget-drag-handle flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 pb-2.5 mb-2.5 border-b border-white/10 select-none";
    const left = document.createElement("div");
    left.className = "flex items-center gap-2 min-w-[7rem] flex-1";
    const iconBox = document.createElement("div");
    iconBox.className = `flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${badgeColorClass}`;
    iconBox.innerHTML = iconSvg;
    const titleWrap = document.createElement("div");
    titleWrap.className = "min-w-0 flex-1";
    const titleEl = document.createElement("h2");
    titleEl.contentEditable = "true";
    titleEl.spellcheck = false;
    titleEl.className = "text-xs sm:text-sm font-semibold tracking-wide text-white truncate rounded px-1 -mx-1 hover:bg-white/10 focus:bg-black/40 focus:outline-none focus:ring-1 focus:ring-accent-400/60 cursor-text transition-colors";
    titleEl.title = "Click to rename this panel";
    titleEl.textContent = widget.title;
    titleEl.addEventListener("blur", () => {
      const val = titleEl.textContent.trim() || "Panel";
      widget.title = val;
      titleEl.textContent = val;
      saveState();
      renderWidgetsManagerList();
    });
    titleEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        titleEl.blur();
      }
    });
    titleWrap.appendChild(titleEl);
    left.appendChild(iconBox);
    left.appendChild(titleWrap);
    const right = document.createElement("div");
    right.className = "flex items-center gap-1 shrink-0 ml-auto";
    if (extraActionsFragment) {
      right.appendChild(extraActionsFragment);
    }
    right.appendChild(
      createWidgetMenu([
        ...menuItems,
        {
          label: "Hide panel",
          hint: "Show it again from the Widgets menu",
          icon: ICON_HIDE,
          onSelect: () => {
            widget.visible = false;
            saveState();
            renderAllWidgets();
          }
        },
        { separator: true },
        {
          label: "Delete panel",
          hint: "Undo with Ctrl+Z",
          icon: ICON_DELETE,
          danger: true,
          onSelect: () => {
            pushUndoState(`Panel “${widget.title}”`);
            const activeWs = getActiveWorkspace();
            activeWs.widgets = activeWs.widgets.filter((w) => w.id !== widget.id);
            saveState();
            renderAllWidgets();
          }
        }
      ])
    );
    header.appendChild(left);
    header.appendChild(right);
    return header;
  }
  var ICON_HIDE = `
  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>`;
  var ICON_DELETE = `
  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>`;
  function closeAllWidgetMenus(except = null) {
    document.querySelectorAll(".widget-menu:not(.hidden)").forEach((menu) => {
      if (menu === except) return;
      menu.classList.add("hidden");
      menu.parentElement?.querySelector('[aria-haspopup="menu"]')?.setAttribute("aria-expanded", "false");
    });
  }
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".widget-menu-wrap")) closeAllWidgetMenus();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAllWidgetMenus();
  });
  function createWidgetMenu(items) {
    const wrap = document.createElement("div");
    wrap.className = "widget-menu-wrap relative";
    const toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "p-1 rounded-lg text-white/55 hover:text-white hover:bg-white/10 transition-colors";
    toggleBtn.title = "More actions";
    toggleBtn.setAttribute("aria-label", "More actions");
    toggleBtn.setAttribute("aria-haspopup", "menu");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
      </svg>
    `;
    const menu = document.createElement("div");
    menu.className = "widget-menu hidden absolute right-0 top-full mt-1 z-50 min-w-[11rem] rounded-xl p-1";
    menu.setAttribute("role", "menu");
    items.forEach((item) => {
      if (item.separator) {
        const sep = document.createElement("div");
        sep.className = "my-1 h-px bg-white/10";
        menu.appendChild(sep);
        return;
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("role", "menuitem");
      btn.className = `flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${item.danger ? "text-rose-300 hover:bg-rose-500/15" : "text-white/85 hover:bg-white/10 hover:text-white"}`;
      if (item.hint) btn.title = item.hint;
      btn.innerHTML = `<span class="shrink-0">${item.icon || ""}</span>`;
      const label = document.createElement("span");
      label.className = "truncate";
      label.textContent = item.label;
      btn.appendChild(label);
      btn.addEventListener("click", () => {
        closeAllWidgetMenus();
        item.onSelect();
      });
      menu.appendChild(btn);
    });
    toggleBtn.addEventListener("click", () => {
      const willOpen = menu.classList.contains("hidden");
      closeAllWidgetMenus(menu);
      menu.classList.toggle("hidden", !willOpen);
      toggleBtn.setAttribute("aria-expanded", String(willOpen));
    });
    wrap.appendChild(toggleBtn);
    wrap.appendChild(menu);
    return wrap;
  }

  // src/widgets/clocks.js
  function updateWorldClocksInDom(now = /* @__PURE__ */ new Date()) {
    document.querySelectorAll("[data-world-tz]").forEach((el) => {
      const tz = el.getAttribute("data-world-tz") || "UTC";
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        }).format(now);
        const dateStr = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          weekday: "short",
          day: "numeric",
          month: "short"
        }).format(now);
        const timeNode = el.querySelector("[data-tz-time]");
        const dateNode = el.querySelector("[data-tz-date]");
        if (timeNode) timeNode.textContent = timeStr;
        if (dateNode) dateNode.textContent = dateStr;
      } catch {
      }
    });
  }
  function buildClocksWidgetContent(widget, cardEl) {
    if (!Array.isArray(widget.data?.clocks) || widget.data.clocks.length === 0) {
      widget.data = {
        clocks: [
          { id: "clk-1", city: "Sibiu / Bucharest", tz: "Europe/Bucharest" },
          { id: "clk-2", city: "London", tz: "Europe/London" },
          { id: "clk-3", city: "New York", tz: "America/New_York" },
          { id: "clk-4", city: "Tokyo", tz: "Asia/Tokyo" }
        ]
      };
    }
    const clocks = widget.data.clocks;
    const actionsFrag = document.createDocumentFragment();
    const selectTz = document.createElement("select");
    selectTz.className = "max-w-[7rem] rounded-lg bg-white/10 border border-white/15 px-2 py-0.5 text-[11px] text-white focus:outline-none";
    selectTz.title = "Add a time zone";
    selectTz.innerHTML = `<option value="" class="bg-slate-900">+ Time zone...</option>` + WORLD_TIMEZONES.map(
      (w) => `<option value="${escapeHtml(w.tz)}|${escapeHtml(w.city)}" class="bg-slate-900">${escapeHtml(
        w.city
      )} (${escapeHtml(w.country)})</option>`
    ).join("");
    selectTz.addEventListener("change", () => {
      if (!selectTz.value) return;
      const [tz, city] = selectTz.value.split("|");
      clocks.push({
        id: `clk-${Date.now()}`,
        city,
        tz
      });
      selectTz.value = "";
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
      "bg-cyan-400/15 text-cyan-300 border-cyan-400/25",
      iconSvg,
      actionsFrag
    );
    const listEl = document.createElement("div");
    listEl.className = "flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1";
    clocks.forEach((clk) => {
      const row = document.createElement("div");
      row.setAttribute("data-world-tz", clk.tz);
      row.className = "group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2";
      row.innerHTML = `
        <div class="min-w-0">
          <div class="text-xs font-semibold text-white truncate">${escapeHtml(clk.city)}</div>
          <div data-tz-date class="text-[10px] text-white/45 capitalize">--</div>
        </div>
        <div class="flex items-center gap-2">
          <span data-tz-time class="font-mono text-sm sm:text-base font-semibold text-accent-300">00:00:00</span>
          <button type="button" data-del-clk class="opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/40 hover:text-rose-300 transition-opacity" title="Remove time zone">✕</button>
        </div>
      `;
      row.querySelector("[data-del-clk]").addEventListener("click", () => {
        pushUndoState(`Clock “${clk.city}”`);
        widget.data.clocks = clocks.filter((c) => c.id !== clk.id);
        saveState();
        renderAllWidgets();
      });
      listEl.appendChild(row);
    });
    const footer = document.createElement("div");
    footer.className = "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    footer.innerHTML = `
      <span>${clocks.length} active time zones</span>
      <span>Updated every second</span>
    `;
    cardEl.appendChild(header);
    cardEl.appendChild(listEl);
    cardEl.appendChild(footer);
    updateWorldClocksInDom(/* @__PURE__ */ new Date());
    return header;
  }

  // src/clock.js
  var clockTimeEl = document.getElementById("clock-time");
  var clockSecondsEl = document.getElementById("clock-seconds");
  var clockDateEl = document.getElementById("clock-date");
  var clockWeekEl = document.getElementById("clock-week");
  var greetingTextEl = document.getElementById("greeting-text");
  var userNameEl = document.getElementById("user-name");
  function getISOWeekNumber(date) {
    const tempDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = tempDate.getUTCDay() || 7;
    tempDate.setUTCDate(tempDate.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
    return Math.ceil(((tempDate - yearStart) / 864e5 + 1) / 7);
  }
  function updateClock() {
    const now = /* @__PURE__ */ new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockTimeEl.textContent = `${hours}:${minutes}`;
    clockSecondsEl.textContent = seconds;
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    clockDateEl.textContent = dateFormatter.format(now);
    if (clockWeekEl) {
      const weekNo = getISOWeekNumber(now);
      clockWeekEl.textContent = `Week ${weekNo}`;
    }
    const hr = now.getHours();
    if (hr >= 5 && hr < 12) {
      greetingTextEl.textContent = "Good morning";
    } else if (hr >= 12 && hr < 18) {
      greetingTextEl.textContent = "Good afternoon";
    } else {
      greetingTextEl.textContent = "Good evening";
    }
    updateWorldClocksInDom(now);
  }
  function initGreetingAndFocus() {
    userNameEl.textContent = state.userName || "Explorer";
    userNameEl.addEventListener("blur", () => {
      const cleaned = userNameEl.textContent.trim() || "Explorer";
      state.userName = cleaned;
      userNameEl.textContent = cleaned;
      saveState();
    });
    userNameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        userNameEl.blur();
      }
    });
  }

  // src/appearance.js
  var bgLayer = document.getElementById("bg-layer");
  var bgModeLabel = document.getElementById("bg-mode-label");
  var bgLocationLabel = document.getElementById("bg-location-label");
  var changeBgBtn = document.getElementById("change-bg-btn");
  var toggleBgModeBtn = document.getElementById("toggle-bg-mode-btn");
  var visualSettingsBtn = document.getElementById("visual-settings-btn");
  var visualSettingsPopover = document.getElementById("visual-settings-popover");
  var resetVisualSettingsBtn = document.getElementById("reset-visual-settings-btn");
  var customBgUrlInput = document.getElementById("custom-bg-url-input");
  var applyCustomBgBtn = document.getElementById("apply-custom-bg-btn");
  var localBgFileInput = document.getElementById("local-bg-file-input");
  var overlayDimSlider = document.getElementById("overlay-dim-slider");
  var overlayDimVal = document.getElementById("overlay-dim-val");
  var glassOpacitySlider = document.getElementById("glass-opacity-slider");
  var glassOpacityVal = document.getElementById("glass-opacity-val");
  var glassBlurSlider = document.getElementById("glass-blur-slider");
  var glassBlurVal = document.getElementById("glass-blur-val");
  var toggleWidgetsBtn = document.getElementById("toggle-widgets-btn");
  var toggleWidgetsLabel = document.getElementById("toggle-widgets-label");
  function applyWidgetsHidden() {
    const hidden = Boolean(state.widgetsHidden);
    document.body.classList.toggle("widgets-hidden", hidden);
    toggleWidgetsBtn.setAttribute("aria-pressed", String(hidden));
    toggleWidgetsLabel.textContent = hidden ? "Show widgets" : "Hide widgets";
  }
  function showWidgetsIfHidden() {
    if (!state.widgetsHidden) return;
    state.widgetsHidden = false;
    applyWidgetsHidden();
  }
  function renderAccentSwatches() {
    const container = document.getElementById("accent-swatches");
    if (!container) return;
    container.innerHTML = "";
    const activeKey = state.visual?.accentColor || "emerald";
    Object.entries(ACCENT_PALETTES).forEach(([key, pal]) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.title = pal.label;
      btn.className = `h-6 w-6 rounded-full border-2 transition-transform ${activeKey === key ? "scale-110 border-white shadow-md" : "border-transparent opacity-80 hover:opacity-100"}`;
      btn.style.backgroundColor = pal.hex;
      btn.addEventListener("click", () => {
        state.visual.accentColor = key;
        applyVisualSettings();
        saveState();
      });
      container.appendChild(btn);
    });
  }
  function getEffectiveTheme() {
    const setting = state.visual?.theme || "dark";
    if (setting === "auto") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return setting === "light" ? "light" : "dark";
  }
  function getFilteredUnsplashBackgrounds() {
    const cat = state.background?.category || "all";
    if (cat === "all") return UNSPLASH_BACKGROUNDS;
    const filtered = UNSPLASH_BACKGROUNDS.filter((item) => item.category === cat);
    return filtered.length > 0 ? filtered : UNSPLASH_BACKGROUNDS;
  }
  function applyVisualSettings() {
    const v = state.visual || DEFAULT_VISUAL_SETTINGS;
    const opacityVal = (v.glassOpacity ?? 56) / 100;
    document.documentElement.style.setProperty("--overlay-dim", String((v.overlayDim ?? 22) / 100));
    document.documentElement.style.setProperty("--glass-opacity", String(opacityVal));
    document.documentElement.style.setProperty("--glass-light-opacity", String(Math.max(0.72, opacityVal)));
    document.documentElement.style.setProperty("--glass-blur", `${v.glassBlur ?? 22}px`);
    const saturateFactor = Math.min(1, opacityVal / 0.56);
    document.documentElement.style.setProperty("--glass-saturate", `${Math.round(100 + 65 * saturateFactor)}%`);
    document.documentElement.style.setProperty("--glass-saturate-pill", `${Math.round(100 + 50 * saturateFactor)}%`);
    const palKey = v.accentColor && ACCENT_PALETTES[v.accentColor] ? v.accentColor : "emerald";
    const shades = ACCENT_PALETTES[palKey].shades;
    Object.entries(shades).forEach(([shade, rgb]) => {
      document.documentElement.style.setProperty(`--accent-${shade}`, rgb);
    });
    const themeSetting = ["dark", "light", "auto"].includes(v.theme) ? v.theme : "dark";
    const effectiveTheme = getEffectiveTheme();
    document.body.classList.toggle("theme-light", effectiveTheme === "light");
    document.querySelectorAll("[data-theme-option]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-theme-option") === themeSetting);
    });
    const activeCat = state.background?.category || "all";
    document.querySelectorAll("[data-bg-category]").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-bg-category") === activeCat);
    });
    const dailyToggle = document.getElementById("bg-daily-auto-toggle");
    if (dailyToggle) {
      dailyToggle.checked = Boolean(state.background?.dailyAutoChange);
    }
    renderAccentSwatches();
    overlayDimSlider.value = String(v.overlayDim ?? 22);
    overlayDimVal.textContent = `${v.overlayDim ?? 22}%`;
    glassOpacitySlider.value = String(v.glassOpacity ?? 56);
    glassOpacityVal.textContent = `${v.glassOpacity ?? 56}%`;
    glassBlurSlider.value = String(v.glassBlur ?? 22);
    glassBlurVal.textContent = `${v.glassBlur ?? 22}px`;
    customBgUrlInput.value = state.background.customUrl && !state.background.customUrl.startsWith("data:") && state.background.customUrl !== IDB_MARKER ? state.background.customUrl : "";
  }
  function applyBackground() {
    const { mode, index, customUrl } = state.background;
    const gradients = getEffectiveTheme() === "light" ? LIGHT_MINIMAL_GRADIENTS : MINIMAL_GRADIENTS;
    if (mode === "custom" && customUrl) {
      const effectiveUrl = customUrl === IDB_MARKER ? cachedIdbBgDataUrl : customUrl;
      if (effectiveUrl) {
        bgModeLabel.textContent = "Custom Image";
        bgLocationLabel.textContent = "🖼️ Custom image";
        bgLayer.style.backgroundImage = `url('${effectiveUrl}')`;
        return;
      }
    }
    if (mode === "gradient") {
      const grad = gradients[index % gradients.length];
      bgLayer.style.backgroundImage = grad.css;
      bgModeLabel.textContent = "Gradient";
      bgLocationLabel.textContent = `✨ ${grad.location}`;
      return;
    }
    const list = getFilteredUnsplashBackgrounds();
    const item = list[index % list.length];
    bgModeLabel.textContent = "4K Unsplash Photo";
    bgLocationLabel.textContent = `📍 ${item.location}`;
    const img = new Image();
    img.onload = () => {
      bgLayer.style.backgroundImage = `url('${item.url}')`;
    };
    img.onerror = () => {
      bgLayer.style.backgroundImage = gradients[0].css;
    };
    img.src = item.url;
  }
  async function initBackgroundAndVisualSettings() {
    if (state.background.customUrl && state.background.customUrl.startsWith("data:")) {
      await saveCustomBgToIDB(state.background.customUrl);
      state.background.customUrl = IDB_MARKER;
      saveState();
    } else if (state.background.customUrl === IDB_MARKER) {
      await loadCustomBgFromIDB();
    }
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    if (state.background.dailyAutoChange && state.background.mode !== "custom" && state.background.lastAutoChangeDate && state.background.lastAutoChangeDate !== todayStr) {
      const list = state.background.mode === "gradient" ? getEffectiveTheme() === "light" ? LIGHT_MINIMAL_GRADIENTS : MINIMAL_GRADIENTS : getFilteredUnsplashBackgrounds();
      state.background.index = (state.background.index + 1) % list.length;
      state.background.lastAutoChangeDate = todayStr;
      saveState();
    } else if (state.background.dailyAutoChange && !state.background.lastAutoChangeDate) {
      state.background.lastAutoChangeDate = todayStr;
      saveState();
    }
    if (window.matchMedia) {
      const colorSchemeMq = window.matchMedia("(prefers-color-scheme: light)");
      const onSchemeChange = () => {
        if (state.visual?.theme === "auto") {
          applyVisualSettings();
          applyBackground();
        }
      };
      if (typeof colorSchemeMq.addEventListener === "function") {
        colorSchemeMq.addEventListener("change", onSchemeChange);
      }
    }
    applyWidgetsHidden();
    toggleWidgetsBtn.addEventListener("click", () => {
      state.widgetsHidden = !state.widgetsHidden;
      applyWidgetsHidden();
      saveState();
    });
    changeBgBtn.addEventListener("click", () => {
      if (state.background.mode === "custom") {
        state.background.mode = "unsplash";
      }
      const list = state.background.mode === "gradient" ? getEffectiveTheme() === "light" ? LIGHT_MINIMAL_GRADIENTS : MINIMAL_GRADIENTS : getFilteredUnsplashBackgrounds();
      let nextIndex = (state.background.index + 1) % list.length;
      if (list.length > 2 && Math.random() > 0.5) {
        const candidates = list.map((_, idx) => idx).filter((idx) => idx !== state.background.index);
        nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
      }
      state.background.index = nextIndex;
      state.background.lastAutoChangeDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      saveState();
      applyBackground();
    });
    toggleBgModeBtn.addEventListener("click", () => {
      const hasCustom = Boolean(state.background.customUrl) && (state.background.customUrl !== IDB_MARKER || Boolean(cachedIdbBgDataUrl));
      if (state.background.mode === "unsplash") {
        state.background.mode = "gradient";
      } else if (state.background.mode === "gradient" && hasCustom) {
        state.background.mode = "custom";
      } else {
        state.background.mode = "unsplash";
      }
      state.background.index = 0;
      saveState();
      applyBackground();
    });
    visualSettingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      visualSettingsPopover.classList.toggle("hidden");
    });
    document.querySelectorAll("[data-theme-option]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const chosen = btn.getAttribute("data-theme-option");
        state.visual.theme = ["dark", "light", "auto"].includes(chosen) ? chosen : "dark";
        applyVisualSettings();
        applyBackground();
        saveState();
      });
    });
    document.querySelectorAll("[data-bg-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-bg-category") || "all";
        state.background.category = cat;
        state.background.mode = "unsplash";
        state.background.index = 0;
        applyVisualSettings();
        applyBackground();
        saveState();
      });
    });
    const dailyToggle = document.getElementById("bg-daily-auto-toggle");
    if (dailyToggle) {
      dailyToggle.addEventListener("change", () => {
        state.background.dailyAutoChange = dailyToggle.checked;
        state.background.lastAutoChangeDate = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        saveState();
        showToast(
          dailyToggle.checked ? "✓ Background will auto-rotate daily!" : "Daily background rotation turned off."
        );
      });
    }
    applyCustomBgBtn.addEventListener("click", () => {
      const url = customBgUrlInput.value.trim();
      if (!url) return;
      state.background.customUrl = url;
      state.background.mode = "custom";
      saveState();
      applyBackground();
      showToast("✓ Custom URL background applied!");
    });
    if (localBgFileInput) {
      localBgFileInput.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (ev) => {
          const dataUrl = String(ev.target?.result || "");
          if (!dataUrl) return;
          await saveCustomBgToIDB(dataUrl);
          state.background.customUrl = IDB_MARKER;
          state.background.mode = "custom";
          saveState();
          applyBackground();
          showToast("✓ Image saved from your computer to IndexedDB and set as background!");
          localBgFileInput.value = "";
        };
        reader.readAsDataURL(file);
      });
    }
    overlayDimSlider.addEventListener("input", () => {
      state.visual.overlayDim = Number(overlayDimSlider.value);
      applyVisualSettings();
      saveState();
    });
    glassOpacitySlider.addEventListener("input", () => {
      state.visual.glassOpacity = Number(glassOpacitySlider.value);
      applyVisualSettings();
      saveState();
    });
    glassBlurSlider.addEventListener("input", () => {
      state.visual.glassBlur = Number(glassBlurSlider.value);
      applyVisualSettings();
      saveState();
    });
    resetVisualSettingsBtn.addEventListener("click", async () => {
      state.visual = structuredClone(DEFAULT_VISUAL_SETTINGS);
      state.background.customUrl = "";
      await clearCustomBgFromIDB();
      if (state.background.mode === "custom") {
        state.background.mode = "unsplash";
      }
      applyVisualSettings();
      applyBackground();
      saveState();
      showToast("Appearance settings have been reset");
    });
    document.addEventListener("click", (e) => {
      if (!visualSettingsPopover.contains(e.target) && !visualSettingsBtn.contains(e.target)) {
        visualSettingsPopover.classList.add("hidden");
      }
    });
    applyVisualSettings();
    applyBackground();
  }

  // src/weather.js
  var weatherIconEl = document.getElementById("weather-icon");
  var weatherTempEl = document.getElementById("weather-temp");
  var weatherDescEl = document.getElementById("weather-desc");
  var weatherCityEl = document.getElementById("weather-city");
  var weatherWindEl = document.getElementById("weather-wind");
  var weatherCityBtn = document.getElementById("weather-city-btn");
  var weatherCityPopover = document.getElementById("weather-city-popover");
  var weatherCityList = document.getElementById("weather-city-list");
  function mapWmoCodeToRo(code) {
    if (code === 0) return { desc: "Clear", icon: "☀️" };
    if (code === 1 || code === 2) return { desc: "Partly cloudy", icon: "⛅" };
    if (code === 3) return { desc: "Overcast", icon: "☁️" };
    if (code >= 45 && code <= 48) return { desc: "Fog", icon: "🌫️" };
    if (code >= 51 && code <= 67) return { desc: "Light rain", icon: "🌧️" };
    if (code >= 71 && code <= 77) return { desc: "Snowfall", icon: "❄️" };
    if (code >= 80 && code <= 82) return { desc: "Averse", icon: "🌦️" };
    if (code >= 95) return { desc: "Thunderstorm", icon: "⛈️" };
    return { desc: "Variabil", icon: "🌤️" };
  }
  async function updateWeather() {
    const cityObj = WEATHER_CITIES.find((c) => c.name === state.weatherCity) || WEATHER_CITIES[0];
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
    }
  }
  function initWeatherWidget() {
    weatherCityList.innerHTML = "";
    WEATHER_CITIES.forEach((city) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = city.name;
      btn.className = "px-2.5 py-1.5 rounded-xl text-left text-white/80 hover:text-white hover:bg-white/15 transition-colors";
      btn.addEventListener("click", () => {
        state.weatherCity = city.name;
        saveState();
        weatherCityPopover.classList.add("hidden");
        updateWeather();
        renderAllWidgets();
      });
      weatherCityList.appendChild(btn);
    });
    weatherCityBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      weatherCityPopover.classList.toggle("hidden");
    });
    document.addEventListener("click", (e) => {
      if (!weatherCityPopover.contains(e.target) && e.target !== weatherCityBtn) {
        weatherCityPopover.classList.add("hidden");
      }
    });
    updateWeather();
  }

  // src/quotes.js
  var dailyQuoteEl = document.getElementById("daily-quote");
  var nextQuoteBtn = document.getElementById("next-quote-btn");
  function renderQuote() {
    const q = QUOTES[state.quoteIndex % QUOTES.length];
    dailyQuoteEl.textContent = q;
  }
  function initQuotes() {
    renderQuote();
    nextQuoteBtn.addEventListener("click", () => {
      state.quoteIndex = (state.quoteIndex + 1) % QUOTES.length;
      saveState();
      renderQuote();
    });
  }

  // src/backup.js
  var backupMenuBtn = document.getElementById("backup-menu-btn");
  var backupPopover = document.getElementById("backup-popover");
  var exportJsonBtn = document.getElementById("export-json-btn");
  var importJsonInput = document.getElementById("import-json-input");
  var importBookmarksInput = document.getElementById("import-bookmarks-input");
  function parseNetscapeBookmarksHtml(htmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const subgroups = [];
    const looseLinks = [];
    const folders = doc.querySelectorAll("dt > h3");
    folders.forEach((h3) => {
      const folderTitle = (h3.textContent || "").trim() || "Folder";
      const parentDt = h3.parentElement;
      const dl = parentDt?.querySelector(":scope > dl") || h3.nextElementSibling;
      if (!dl || dl.tagName.toLowerCase() !== "dl") return;
      const directAnchors = dl.querySelectorAll(":scope > dt > a, :scope > a");
      const items = [];
      directAnchors.forEach((a) => {
        const href = (a.getAttribute("href") || "").trim();
        if (!isSafeLinkUrl(href)) return;
        const title = (a.textContent || "").trim() || extractDomain(href);
        items.push({
          id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: title.slice(0, 48),
          url: href
        });
      });
      if (items.length > 0) {
        subgroups.push({
          id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          title: folderTitle.slice(0, 32),
          collapsed: false,
          items
        });
      }
    });
    if (subgroups.length === 0) {
      doc.querySelectorAll("a[href]").forEach((a) => {
        const href = (a.getAttribute("href") || "").trim();
        if (!isSafeLinkUrl(href)) return;
        const title = (a.textContent || "").trim() || extractDomain(href);
        looseLinks.push({
          id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          title: title.slice(0, 48),
          url: href
        });
      });
    }
    if (looseLinks.length > 0) {
      subgroups.push({
        id: `sg-${Date.now()}-loose`,
        title: "Imported Bookmarks",
        collapsed: false,
        items: looseLinks
      });
    }
    return subgroups;
  }
  function initBackupControls() {
    backupMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      widgetsManagerPopover.classList.add("hidden");
      const addWidgetPopover = document.getElementById("add-widget-popover");
      if (addWidgetPopover) addWidgetPopover.classList.add("hidden");
      backupPopover.classList.toggle("hidden");
    });
    exportJsonBtn.addEventListener("click", async () => {
      const exportPayload = structuredClone(state);
      if (exportPayload.background?.customUrl === IDB_MARKER && cachedIdbBgDataUrl) {
        exportPayload.customBgDataUrl = cachedIdbBgDataUrl;
      }
      const dataStr = JSON.stringify(exportPayload, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dashboard-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      backupPopover.classList.add("hidden");
      showToast("✓ JSON backup downloaded successfully!");
    });
    importJsonInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const parsed = JSON.parse(String(ev.target?.result || "{}"));
          if (parsed.customBgDataUrl && typeof parsed.customBgDataUrl === "string") {
            await saveCustomBgToIDB(parsed.customBgDataUrl);
            delete parsed.customBgDataUrl;
            if (parsed.background) parsed.background.customUrl = IDB_MARKER;
          } else if (parsed.background?.customUrl?.startsWith("data:")) {
            await saveCustomBgToIDB(parsed.background.customUrl);
            parsed.background.customUrl = IDB_MARKER;
          }
          setState(normalizeLoadedState(parsed));
          saveState();
          initGreetingAndFocus();
          applyVisualSettings();
          applyBackground();
          updateWeather();
          renderWorkspacesBar();
          renderAllWidgets();
          renderQuote();
          backupPopover.classList.add("hidden");
          if (lastRemovedUnsafeLinksCount > 0) {
            showToast(
              `✓ Backup imported. ⚠️ ${lastRemovedUnsafeLinksCount} unsafe link(s) were skipped (only http/https allowed).`
            );
          } else {
            showToast("✓ Backup imported and restored successfully!");
          }
        } catch (err) {
          console.error("Invalid JSON file:", err);
          showToast("⚠️ Error: The JSON file is invalid.");
        } finally {
          importJsonInput.value = "";
        }
      };
      reader.readAsText(file);
    });
    if (importBookmarksInput) {
      importBookmarksInput.addEventListener("change", (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const htmlText = String(ev.target?.result || "");
            const importedSubgroups = parseNetscapeBookmarksHtml(htmlText);
            if (importedSubgroups.length === 0) {
              showToast("⚠️ No valid bookmarks were found in the HTML file.");
              return;
            }
            const totalLinks = importedSubgroups.reduce((acc, sg) => acc + sg.items.length, 0);
            const activeWs = getActiveWorkspace();
            const position = computeNewWidgetPosition();
            activeWs.widgets.push({
              id: `w-links-bm-${Date.now()}`,
              type: "links",
              title: "Browser Bookmarks",
              visible: true,
              position: { ...position, width: 410, height: 450 },
              data: {
                viewMode: "list",
                subgroups: importedSubgroups
              }
            });
            saveState();
            renderAllWidgets();
            backupPopover.classList.add("hidden");
            showToast(
              `✓ Imported ${totalLinks} links into ${importedSubgroups.length} subgroups!`
            );
          } catch (err) {
            console.error("Error importing bookmarks:", err);
            showToast("⚠️ The bookmark file could not be read.");
          } finally {
            importBookmarksInput.value = "";
          }
        };
        reader.readAsText(file);
      });
    }
    const autoSyncConnectBtn = document.getElementById("autosync-connect-btn");
    const autoSyncNowBtn = document.getElementById("autosync-now-btn");
    const autoSyncDisconnectBtn = document.getElementById("autosync-disconnect-btn");
    loadSyncFileHandleFromIDB().then((handle) => {
      if (handle) {
        setAutoSyncFileHandle(handle);
      }
      updateAutoSyncUI();
    });
    if (autoSyncConnectBtn) {
      autoSyncConnectBtn.addEventListener("click", async () => {
        if (typeof window.showSaveFilePicker !== "function") {
          showToast("⚠️ Auto-Sync requires Edge or Chrome (File System Access API).");
          return;
        }
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: "focushub-sync.json",
            types: [
              {
                description: "FocusHub JSON Sync File",
                accept: { "application/json": [".json"] }
              }
            ]
          });
          setAutoSyncFileHandle(handle);
          await saveSyncFileHandleToIDB(handle);
          const ok = await writeAutoSyncFile(true);
          if (ok) {
            showToast(`✓ Auto-Sync connected to “${handle.name}”!`);
          }
        } catch (err) {
          if (err?.name !== "AbortError") {
            console.warn("Auto-Sync connect error:", err);
            showToast("⚠️ Could not link the sync file.");
          }
        }
      });
    }
    if (autoSyncNowBtn) {
      autoSyncNowBtn.addEventListener("click", async () => {
        const ok = await writeAutoSyncFile(true);
        if (ok) {
          showToast("✓ Synced to linked file!");
        }
      });
    }
    if (autoSyncDisconnectBtn) {
      autoSyncDisconnectBtn.addEventListener("click", async () => {
        await clearSyncFileHandleFromIDB();
        updateAutoSyncUI();
        showToast("Auto-Sync file disconnected.");
      });
    }
    document.addEventListener("click", (e) => {
      if (!backupPopover.contains(e.target) && !backupMenuBtn.contains(e.target)) {
        backupPopover.classList.add("hidden");
      }
    });
  }

  // src/widgets/links.js
  function buildLinksWidgetContent(widget, cardEl) {
    ensureLinksSubgroups(widget);
    const subgroups = widget.data.subgroups;
    const viewMode = widget.data.viewMode || "list";
    const actionsFrag = document.createDocumentFragment();
    const toggleLayoutBtn = document.createElement("button");
    toggleLayoutBtn.type = "button";
    toggleLayoutBtn.className = "p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors";
    toggleLayoutBtn.title = viewMode === "list" ? "Current view: Compact list (click for grid)" : "Current view: Grid (click for compact list)";
    toggleLayoutBtn.innerHTML = viewMode === "list" ? `<svg class="w-3.5 h-3.5 text-sky-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
           </svg>` : `<svg class="w-3.5 h-3.5 text-sky-300" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
           </svg>`;
    toggleLayoutBtn.addEventListener("click", () => {
      widget.data.viewMode = viewMode === "list" ? "grid" : "list";
      saveState();
      renderAllWidgets();
    });
    const addSubgroupBtn = document.createElement("button");
    addSubgroupBtn.type = "button";
    addSubgroupBtn.className = "flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 px-2 py-1 text-[11px] font-medium text-white/90 transition-colors";
    addSubgroupBtn.title = "Add a subgroup to this group";
    addSubgroupBtn.innerHTML = `
      <svg class="w-3 h-3 text-sky-300" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <span class="widget-action-label">+ Subgroup</span>
    `;
    const addLinkBtn = document.createElement("button");
    addLinkBtn.type = "button";
    addLinkBtn.className = "flex items-center gap-1 rounded-lg bg-sky-400/20 hover:bg-sky-400/30 border border-sky-400/30 px-2 py-1 text-[11px] font-medium text-sky-200 transition-colors";
    addLinkBtn.title = "Add a new link";
    addLinkBtn.innerHTML = `
      <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <span class="widget-action-label">Link</span>
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
      "bg-sky-400/15 text-sky-300 border-sky-400/25",
      iconSvg,
      actionsFrag
    );
    const subgroupForm = document.createElement("form");
    subgroupForm.className = "hidden mb-2.5 rounded-xl bg-black/40 border border-white/15 p-2.5 flex items-center gap-1.5";
    subgroupForm.innerHTML = `
      <input
        type="text"
        name="sgTitle"
        required
        maxlength="32"
        placeholder="Nume subgrup (ex: Servere, Social, Dev)..."
        class="flex-1 rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:border-sky-400 focus:outline-none select-text"
      />
      <button type="submit" class="rounded-lg bg-sky-500 hover:bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Create</button>
      <button type="button" data-cancel-sg class="rounded-lg px-2 py-1 text-xs text-white/60 hover:text-white hover:bg-white/10">✕</button>
    `;
    addSubgroupBtn.addEventListener("click", () => {
      linkForm.classList.add("hidden");
      subgroupForm.classList.toggle("hidden");
      if (!subgroupForm.classList.contains("hidden")) {
        subgroupForm.querySelector('input[name="sgTitle"]').focus();
      }
    });
    subgroupForm.querySelector("[data-cancel-sg]").addEventListener("click", () => {
      subgroupForm.reset();
      subgroupForm.classList.add("hidden");
    });
    subgroupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = subgroupForm.querySelector('input[name="sgTitle"]');
      const title = input.value.trim();
      if (!title) return;
      subgroups.push({
        id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`,
        title,
        collapsed: false,
        items: []
      });
      saveState();
      renderAllWidgets();
    });
    let editingLinkContext = null;
    const linkForm = document.createElement("form");
    linkForm.className = "hidden mb-2.5 rounded-xl bg-black/40 border border-white/15 p-2.5 space-y-2";
    const sgOptionsHtml = subgroups.map(
      (sg) => `<option value="${escapeHtml(sg.id)}" class="bg-slate-900 text-white">${escapeHtml(
        sg.title
      )}</option>`
    ).join("");
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
        <button type="button" data-cancel-lnk class="rounded-lg px-2 py-1 text-xs text-white/65 hover:text-white hover:bg-white/10">Cancel</button>
        <button type="submit" data-submit-lnk class="rounded-lg bg-sky-500 hover:bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Save</button>
      </div>
    `;
    const openLinkFormForSubgroup = (targetSgId, editData = null) => {
      subgroupForm.classList.add("hidden");
      linkForm.classList.remove("hidden");
      const titleInput = linkForm.querySelector('input[name="title"]');
      const urlInput = linkForm.querySelector('input[name="url"]');
      const selectEl = linkForm.querySelector('select[name="subgroupId"]');
      const submitBtn = linkForm.querySelector("[data-submit-lnk]");
      if (editData) {
        editingLinkContext = { linkId: editData.link.id, sourceSgId: targetSgId };
        titleInput.value = editData.link.title;
        urlInput.value = editData.link.url;
        if (selectEl) selectEl.value = targetSgId;
        submitBtn.textContent = "Update";
      } else {
        editingLinkContext = null;
        linkForm.reset();
        if (targetSgId && selectEl) selectEl.value = targetSgId;
        submitBtn.textContent = "Save";
      }
      titleInput.focus();
    };
    addLinkBtn.addEventListener("click", () => {
      editingLinkContext = null;
      linkForm.querySelector("[data-submit-lnk]").textContent = "Save";
      subgroupForm.classList.add("hidden");
      linkForm.classList.toggle("hidden");
      if (!linkForm.classList.contains("hidden")) {
        linkForm.querySelector('input[name="title"]').focus();
      }
    });
    linkForm.querySelector("[data-cancel-lnk]").addEventListener("click", () => {
      editingLinkContext = null;
      linkForm.reset();
      linkForm.classList.add("hidden");
    });
    linkForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = linkForm.querySelector('input[name="title"]').value.trim();
      const url = normalizeUrl(linkForm.querySelector('input[name="url"]').value);
      const sgId = linkForm.querySelector('select[name="subgroupId"]').value;
      if (!title) return;
      if (!isSafeLinkUrl(url)) {
        showToast("⚠️ Invalid URL. Only http:// and https:// links are allowed.");
        return;
      }
      const targetSg = subgroups.find((s) => s.id === sgId) || subgroups[0];
      targetSg.collapsed = false;
      if (editingLinkContext) {
        const oldSg = subgroups.find((s) => s.id === editingLinkContext.sourceSgId);
        const existingIdx = oldSg ? oldSg.items.findIndex((i) => i.id === editingLinkContext.linkId) : -1;
        if (existingIdx !== -1) {
          const updatedItem = {
            ...oldSg.items[existingIdx],
            title,
            url
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
          url
        });
      }
      saveState();
      renderAllWidgets();
    });
    const scrollContainer = document.createElement("div");
    scrollContainer.className = "flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1";
    let totalLinksCount = 0;
    subgroups.forEach((sg, sgIdx) => {
      const items = Array.isArray(sg.items) ? sg.items : [];
      totalLinksCount += items.length;
      const sgBlock = document.createElement("div");
      sgBlock.className = `subgroup-block ${sg.collapsed ? "is-collapsed" : ""}`;
      sgBlock.addEventListener("dragover", (e) => {
        if (!draggedLinkPayload) return;
        e.preventDefault();
        sgBlock.classList.add("drag-over-subgroup");
      });
      sgBlock.addEventListener("dragleave", (e) => {
        if (!sgBlock.contains(e.relatedTarget)) {
          sgBlock.classList.remove("drag-over-subgroup");
        }
      });
      sgBlock.addEventListener("drop", (e) => {
        if (!draggedLinkPayload) return;
        e.preventDefault();
        e.stopPropagation();
        sgBlock.classList.remove("drag-over-subgroup");
        moveLinkViaDragDrop(widget.id, sg.id, null);
      });
      const sgHeader = document.createElement("div");
      sgHeader.className = "subgroup-header group/sg flex items-center justify-between gap-1.5 px-2.5 py-1 select-none";
      const sgLeft = document.createElement("div");
      sgLeft.className = "flex items-center gap-1.5 min-w-0 flex-1";
      const collapseBtn = document.createElement("button");
      collapseBtn.type = "button";
      collapseBtn.className = "p-0.5 rounded text-white/55 hover:text-white transition-transform";
      collapseBtn.title = sg.collapsed ? "Expand subgroup" : "Collapse subgroup";
      collapseBtn.innerHTML = `
        <svg class="w-3 h-3 transition-transform duration-150 ${sg.collapsed ? "-rotate-90" : "rotate-0"}" fill="none" stroke="currentColor" stroke-width="2.4" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      `;
      collapseBtn.addEventListener("click", () => {
        sg.collapsed = !sg.collapsed;
        saveState();
        renderAllWidgets();
      });
      const sgTitle = document.createElement("span");
      sgTitle.contentEditable = "true";
      sgTitle.spellcheck = false;
      sgTitle.className = "text-[11px] font-semibold uppercase tracking-wider text-sky-300/90 truncate rounded px-1 -mx-0.5 hover:bg-white/10 focus:bg-black/40 focus:outline-none cursor-text";
      sgTitle.title = "Click to rename subgroup";
      sgTitle.textContent = sg.title;
      sgTitle.addEventListener("blur", () => {
        const cleaned = sgTitle.textContent.trim() || "Subgroup";
        sg.title = cleaned;
        sgTitle.textContent = cleaned;
        saveState();
      });
      sgTitle.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          sgTitle.blur();
        }
      });
      const sgCount = document.createElement("span");
      sgCount.className = "text-[10px] font-mono text-white/40";
      sgCount.textContent = `(${items.length})`;
      sgLeft.appendChild(collapseBtn);
      sgLeft.appendChild(sgTitle);
      sgLeft.appendChild(sgCount);
      const sgRight = document.createElement("div");
      sgRight.className = "row-actions flex items-center gap-0.5 opacity-0 group-hover/sg:opacity-100 group-focus-within/sg:opacity-100 transition-opacity shrink-0";
      const quickAddHereBtn = document.createElement("button");
      quickAddHereBtn.type = "button";
      quickAddHereBtn.className = "p-0.5 rounded text-sky-300/80 hover:text-sky-200 hover:bg-white/10";
      quickAddHereBtn.title = `Add link to “${sg.title}”`;
      quickAddHereBtn.innerHTML = `
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      `;
      quickAddHereBtn.addEventListener("click", () => openLinkFormForSubgroup(sg.id));
      sgRight.appendChild(quickAddHereBtn);
      if (sgIdx > 0) {
        const sgUpBtn = document.createElement("button");
        sgUpBtn.type = "button";
        sgUpBtn.className = "p-0.5 rounded text-white/40 hover:text-white hover:bg-white/10";
        sgUpBtn.title = "Move subgroup up";
        sgUpBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        `;
        sgUpBtn.addEventListener("click", () => {
          const tmp = subgroups[sgIdx - 1];
          subgroups[sgIdx - 1] = subgroups[sgIdx];
          subgroups[sgIdx] = tmp;
          saveState();
          renderAllWidgets();
        });
        sgRight.appendChild(sgUpBtn);
      }
      if (sgIdx < subgroups.length - 1) {
        const sgDownBtn = document.createElement("button");
        sgDownBtn.type = "button";
        sgDownBtn.className = "p-0.5 rounded text-white/40 hover:text-white hover:bg-white/10";
        sgDownBtn.title = "Move subgroup down";
        sgDownBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        `;
        sgDownBtn.addEventListener("click", () => {
          const tmp = subgroups[sgIdx + 1];
          subgroups[sgIdx + 1] = subgroups[sgIdx];
          subgroups[sgIdx] = tmp;
          saveState();
          renderAllWidgets();
        });
        sgRight.appendChild(sgDownBtn);
      }
      if (subgroups.length > 1) {
        const sgDelBtn = document.createElement("button");
        sgDelBtn.type = "button";
        sgDelBtn.className = "p-0.5 rounded text-white/40 hover:text-rose-300 hover:bg-white/10";
        sgDelBtn.title = "Delete this subgroup";
        sgDelBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        sgDelBtn.addEventListener("click", () => {
          pushUndoState(`Subgroup “${sg.title}”`);
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
        const sgBody = document.createElement("div");
        sgBody.className = viewMode === "list" ? "p-1.5 space-y-1" : "p-1.5 grid grid-cols-2 sm:grid-cols-3 gap-1.5";
        if (items.length === 0) {
          const emptyMsg = document.createElement("div");
          emptyMsg.className = "col-span-full py-2 px-2 text-[11px] text-white/35 italic";
          emptyMsg.textContent = "Empty subgroup — drag a link here or click “+”.";
          sgBody.appendChild(emptyMsg);
        } else {
          items.forEach((link, idx) => {
            const domain = extractDomain(link.url);
            let directFaviconUrl = "";
            try {
              directFaviconUrl = new URL("/favicon.ico", link.url).href;
            } catch {
              directFaviconUrl = "";
            }
            const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;
            const itemEl = document.createElement("div");
            itemEl.draggable = true;
            itemEl.className = viewMode === "list" ? "quick-link-row group flex items-center justify-between gap-2 rounded-lg px-2 py-1 animate-item" : "quick-link-card group rounded-xl p-2 flex items-center justify-between gap-1.5 animate-item";
            itemEl.addEventListener("dragstart", (e) => {
              e.stopPropagation();
              setDraggedLinkPayload({
                sourceWidgetId: widget.id,
                sourceSubgroupId: sg.id,
                linkId: link.id
              });
              itemEl.classList.add("is-link-dragging");
              if (e.dataTransfer) {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("text/plain", link.title);
              }
            });
            itemEl.addEventListener("dragend", () => {
              itemEl.classList.remove("is-link-dragging");
              setDraggedLinkPayload(null);
              document.querySelectorAll(".drag-over-target, .drag-over-subgroup").forEach((el) => el.classList.remove("drag-over-target", "drag-over-subgroup"));
            });
            itemEl.addEventListener("dragover", (e) => {
              if (!draggedLinkPayload || draggedLinkPayload.linkId === link.id) return;
              e.preventDefault();
              e.stopPropagation();
              itemEl.classList.add("drag-over-target");
            });
            itemEl.addEventListener("dragleave", () => {
              itemEl.classList.remove("drag-over-target");
            });
            itemEl.addEventListener("drop", (e) => {
              if (!draggedLinkPayload) return;
              e.preventDefault();
              e.stopPropagation();
              itemEl.classList.remove("drag-over-target");
              sgBlock.classList.remove("drag-over-subgroup");
              moveLinkViaDragDrop(widget.id, sg.id, link.id);
            });
            const anchor = document.createElement("a");
            if (isSafeLinkUrl(link.url)) anchor.href = link.url;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.title = link.url;
            anchor.className = "flex items-center gap-2 min-w-0 flex-1 focus:outline-none";
            const iconWrap = document.createElement("div");
            iconWrap.className = "hidden h-5 w-5 shrink-0 rounded-md bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden";
            const img = document.createElement("img");
            img.alt = "";
            img.className = "h-3.5 w-3.5 object-contain";
            let triedGoogle = false;
            img.onload = () => {
              const isGenericGoogleGlobe = triedGoogle && img.naturalWidth <= 16 && img.naturalHeight <= 16;
              if (img.naturalWidth > 0 && img.naturalHeight > 0 && !isGenericGoogleGlobe) {
                iconWrap.classList.remove("hidden");
              } else {
                iconWrap.remove();
              }
            };
            img.onerror = () => {
              if (!triedGoogle && domain) {
                triedGoogle = true;
                img.src = googleFaviconUrl;
              } else {
                iconWrap.remove();
              }
            };
            const titleSpan = document.createElement("span");
            titleSpan.className = "text-xs font-medium text-white/90 group-hover:text-sky-200 truncate transition-colors";
            titleSpan.textContent = link.title;
            iconWrap.appendChild(img);
            anchor.appendChild(iconWrap);
            anchor.appendChild(titleSpan);
            if (directFaviconUrl) {
              img.src = directFaviconUrl;
            } else if (domain) {
              triedGoogle = true;
              img.src = googleFaviconUrl;
            } else {
              iconWrap.remove();
            }
            const rowActions = document.createElement("div");
            rowActions.className = "row-actions flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shrink-0";
            const editBtn = document.createElement("button");
            editBtn.type = "button";
            editBtn.className = "p-0.5 rounded text-white/45 hover:text-amber-300 hover:bg-white/10";
            editBtn.title = "Edit title, URL, or subgroup";
            editBtn.innerHTML = `
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            `;
            editBtn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              openLinkFormForSubgroup(sg.id, { link });
            });
            rowActions.appendChild(editBtn);
            if (viewMode === "list" && idx > 0) {
              const upBtn = document.createElement("button");
              upBtn.type = "button";
              upBtn.className = "p-0.5 rounded text-white/45 hover:text-white hover:bg-white/10";
              upBtn.title = "Move up";
              upBtn.innerHTML = `
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              `;
              upBtn.addEventListener("click", (e) => {
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
            if (viewMode === "list" && idx < items.length - 1) {
              const downBtn = document.createElement("button");
              downBtn.type = "button";
              downBtn.className = "p-0.5 rounded text-white/45 hover:text-white hover:bg-white/10";
              downBtn.title = "Move down";
              downBtn.innerHTML = `
                <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              `;
              downBtn.addEventListener("click", (e) => {
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
            const delBtn = document.createElement("button");
            delBtn.type = "button";
            delBtn.className = "p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10";
            delBtn.title = "Delete link";
            delBtn.innerHTML = `
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            `;
            delBtn.addEventListener("click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              pushUndoState(`Link “${link.title}”`);
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
    const footer = document.createElement("div");
    footer.className = "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    footer.innerHTML = `
      <span>${subgroups.length} ${subgroups.length === 1 ? "subgroup" : "subgroups"} • ${totalLinksCount} ${totalLinksCount === 1 ? "link" : "links"}</span>
    `;
    const allCollapsed = subgroups.every((s) => s.collapsed);
    const toggleAllCollapseBtn = document.createElement("button");
    toggleAllCollapseBtn.type = "button";
    toggleAllCollapseBtn.className = "hover:text-sky-300 transition-colors";
    toggleAllCollapseBtn.textContent = allCollapsed ? "Expand all" : "Collapse all";
    toggleAllCollapseBtn.addEventListener("click", () => {
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

  // src/widgets/todo.js
  function localIsoDate(offsetDays = 0) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + offsetDays);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  function formatShortDate(offsetDays) {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + offsetDays);
    return new Intl.DateTimeFormat("en-US", { weekday: "short", day: "numeric", month: "short" }).format(d);
  }
  function formatDueDateBadge(dueDateStr) {
    if (!dueDateStr) return null;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const due = /* @__PURE__ */ new Date(`${dueDateStr}T00:00:00`);
    if (Number.isNaN(due.getTime())) return null;
    const diffDays = Math.round((due - today) / 864e5);
    if (diffDays < 0) {
      return {
        label: `Overdue (${Math.abs(diffDays)}d)`,
        cls: "bg-rose-500/20 text-rose-300 border-rose-400/35"
      };
    }
    if (diffDays === 0) {
      return {
        label: "Today",
        cls: "bg-amber-500/20 text-amber-300 border-amber-400/35"
      };
    }
    if (diffDays === 1) {
      return {
        label: "Tomorrow",
        cls: "bg-sky-500/20 text-sky-300 border-sky-400/35"
      };
    }
    const shortFmt = new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short" }).format(due);
    return {
      label: shortFmt,
      cls: "bg-white/10 text-white/65 border-white/15"
    };
  }
  function buildTodoWidgetContent(widget, cardEl) {
    const items = Array.isArray(widget.data.items) ? widget.data.items : [];
    const filter = widget.data.filter || "all";
    const actionsFrag = document.createDocumentFragment();
    const filterWrap = document.createElement("div");
    filterWrap.className = "flex items-center rounded-xl bg-black/30 p-0.5 text-[10px]";
    [
      { key: "all", label: "All" },
      { key: "active", label: "Active" },
      { key: "completed", label: "Completed" }
    ].forEach((f) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = f.label;
      b.className = `todo-filter-btn px-2 py-0.5 rounded-lg transition-colors ${filter === f.key ? "active" : ""}`;
      b.addEventListener("click", () => {
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
      "bg-accent-400/15 text-accent-300 border-accent-400/25",
      iconSvg,
      actionsFrag
    );
    const form = document.createElement("form");
    form.className = "mb-2.5 space-y-1.5";
    form.innerHTML = `
      <div class="relative flex items-center gap-1.5">
        <input
          type="text"
          name="todoText"
          maxlength="140"
          placeholder="Add a new task..."
          class="flex-1 rounded-xl bg-black/25 border border-white/15 px-3 py-1.5 text-xs text-white placeholder-white/45 focus:border-accent-400/70 focus:bg-black/35 focus:outline-none select-text"
        />
        <button
          type="submit"
          class="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 transition-colors"
          title="Add task"
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
          title="Task priority"
        >
          <option value="normal" class="bg-slate-900">⚪ Normal</option>
          <option value="high" class="bg-slate-900">🔴 Urgent</option>
          <option value="low" class="bg-slate-900">🔵 Low</option>
        </select>
        <select
          name="dueQuick"
          class="rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Due date (optional)"
        >
          <option value="" class="bg-slate-900">📅 No due date</option>
          <option value="0" class="bg-slate-900">Today · ${formatShortDate(0)}</option>
          <option value="1" class="bg-slate-900">Tomorrow · ${formatShortDate(1)}</option>
          <option value="7" class="bg-slate-900">In a week · ${formatShortDate(7)}</option>
          <option value="pick" class="bg-slate-900">Pick a date…</option>
        </select>
        <input
          type="date"
          name="dueDate"
          class="hidden rounded-lg bg-black/25 border border-white/10 px-2 py-0.5 text-[11px] text-white/80 focus:outline-none"
          title="Due date"
        />
      </div>
    `;
    const dueQuickSelect = form.querySelector('select[name="dueQuick"]');
    const dueDateInput = form.querySelector('input[name="dueDate"]');
    dueQuickSelect.addEventListener("change", () => {
      const picking = dueQuickSelect.value === "pick";
      dueDateInput.classList.toggle("hidden", !picking);
      if (!picking) {
        dueDateInput.value = "";
        return;
      }
      dueDateInput.focus();
      try {
        dueDateInput.showPicker?.();
      } catch {
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const textInput = form.querySelector('input[name="todoText"]');
      const prioritySelect = form.querySelector('select[name="priority"]');
      const text = textInput.value.trim();
      if (!text) return;
      const dueChoice = dueQuickSelect.value;
      const dueDate = dueChoice === "pick" ? dueDateInput.value || "" : dueChoice === "" ? "" : localIsoDate(Number(dueChoice));
      widget.data.items.unshift({
        id: `td-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        text,
        completed: false,
        priority: prioritySelect.value || "normal",
        dueDate
      });
      saveState();
      renderAllWidgets();
    });
    const ul = document.createElement("ul");
    ul.className = "todo-list-dropzone flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1 rounded-xl transition-colors";
    ul.addEventListener("dragover", (e) => {
      if (!draggedTodoPayload) return;
      e.preventDefault();
      ul.classList.add("drag-over-todo-list");
    });
    ul.addEventListener("dragleave", (e) => {
      if (!ul.contains(e.relatedTarget)) {
        ul.classList.remove("drag-over-todo-list");
      }
    });
    ul.addEventListener("drop", (e) => {
      if (!draggedTodoPayload) return;
      e.preventDefault();
      e.stopPropagation();
      ul.classList.remove("drag-over-todo-list");
      moveTodoViaDragDrop(widget.id, null);
    });
    const filtered = items.filter((t) => {
      if (filter === "active") return !t.completed;
      if (filter === "completed") return t.completed;
      return true;
    });
    if (filtered.length === 0) {
      const emptyLi = document.createElement("li");
      emptyLi.className = "py-8 text-center text-xs text-white/45 border border-dashed border-white/10 rounded-xl";
      emptyLi.textContent = filter === "completed" ? "No completed tasks in this list." : "No active tasks. Add one above or drag one from another list!";
      ul.appendChild(emptyLi);
    } else {
      filtered.forEach((todo) => {
        const li = document.createElement("li");
        li.draggable = true;
        li.className = "todo-item-row group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] hover:bg-white/[0.09] border border-white/10 px-2.5 py-1.5 transition-all animate-item";
        li.addEventListener("dragstart", (e) => {
          e.stopPropagation();
          setDraggedTodoPayload({
            sourceWidgetId: widget.id,
            todoId: todo.id
          });
          li.classList.add("is-todo-dragging");
          if (e.dataTransfer) {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", todo.text);
          }
        });
        li.addEventListener("dragend", () => {
          li.classList.remove("is-todo-dragging");
          setDraggedTodoPayload(null);
          document.querySelectorAll(".drag-over-target, .drag-over-todo-list").forEach((el) => el.classList.remove("drag-over-target", "drag-over-todo-list"));
        });
        li.addEventListener("dragover", (e) => {
          if (!draggedTodoPayload || draggedTodoPayload.todoId === todo.id) return;
          e.preventDefault();
          e.stopPropagation();
          li.classList.add("drag-over-target");
        });
        li.addEventListener("dragleave", () => {
          li.classList.remove("drag-over-target");
        });
        li.addEventListener("drop", (e) => {
          if (!draggedTodoPayload) return;
          e.preventDefault();
          e.stopPropagation();
          li.classList.remove("drag-over-target");
          ul.classList.remove("drag-over-todo-list");
          moveTodoViaDragDrop(widget.id, todo.id);
        });
        const leftWrap = document.createElement("div");
        leftWrap.className = "flex items-center gap-1.5 flex-1 min-w-0";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = Boolean(todo.completed);
        cb.className = "custom-checkbox";
        cb.addEventListener("change", () => {
          todo.completed = cb.checked;
          saveState();
          renderAllWidgets();
        });
        const prioBtn = document.createElement("button");
        prioBtn.type = "button";
        const prio = todo.priority || "normal";
        prioBtn.className = "text-[10px] leading-none shrink-0 opacity-85 hover:scale-110 transition-transform";
        prioBtn.title = "Click to change priority (Normal / Urgent / Low)";
        prioBtn.textContent = prio === "high" ? "🔴" : prio === "low" ? "🔵" : "⚪";
        prioBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          todo.priority = prio === "normal" ? "high" : prio === "high" ? "low" : "normal";
          saveState();
          renderAllWidgets();
        });
        const span = document.createElement("span");
        span.className = `text-xs truncate flex-1 cursor-pointer rounded px-1 -mx-0.5 transition-all ${todo.completed ? "line-through text-white/40" : "text-white/90"}`;
        span.title = "Click to check or double-click to edit the text";
        span.textContent = todo.text;
        const startEditingTodo = () => {
          span.contentEditable = "true";
          span.spellcheck = false;
          span.classList.remove("truncate", "line-through", "text-white/40");
          span.classList.add("bg-black/45", "ring-1", "ring-accent-400/60", "text-white");
          span.focus();
        };
        span.addEventListener("click", () => {
          if (span.isContentEditable) return;
          todo.completed = !todo.completed;
          saveState();
          renderAllWidgets();
        });
        span.addEventListener("dblclick", (e) => {
          e.stopPropagation();
          startEditingTodo();
        });
        span.addEventListener("blur", () => {
          if (!span.isContentEditable) return;
          span.contentEditable = "false";
          const newText = span.textContent.trim();
          if (newText) {
            todo.text = newText;
          }
          saveState();
          renderAllWidgets();
        });
        span.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            span.blur();
          } else if (e.key === "Escape") {
            span.textContent = todo.text;
            span.blur();
          }
        });
        leftWrap.appendChild(cb);
        leftWrap.appendChild(prioBtn);
        leftWrap.appendChild(span);
        const rightWrap = document.createElement("div");
        rightWrap.className = "flex items-center gap-1 shrink-0";
        const dueBadge = formatDueDateBadge(todo.dueDate);
        if (dueBadge && !todo.completed) {
          const badgeEl = document.createElement("span");
          badgeEl.className = `text-[10px] font-medium px-1.5 py-0.5 rounded-md border ${dueBadge.cls}`;
          badgeEl.textContent = dueBadge.label;
          rightWrap.appendChild(badgeEl);
        }
        const actionsWrap = document.createElement("div");
        actionsWrap.className = "row-actions flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shrink-0";
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.className = "p-0.5 rounded text-white/45 hover:text-amber-300 hover:bg-white/10 transition-all";
        editBtn.title = "Edit task";
        editBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        `;
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          startEditingTodo();
        });
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10 transition-all";
        delBtn.title = "Delete task";
        delBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        delBtn.addEventListener("click", () => {
          pushUndoState(`Task “${todo.text.slice(0, 28)}”`);
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
    const percent = total > 0 ? Math.round(completedCount / total * 100) : 0;
    const footer = document.createElement("div");
    footer.className = "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50";
    footer.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div class="h-full bg-accent-400 transition-all duration-300" style="width: ${percent}%"></div>
        </div>
        <span>${activeCount} remaining (${percent}%)</span>
      </div>
    `;
    const clearBtn = document.createElement("button");
    clearBtn.type = "button";
    clearBtn.className = "hover:text-rose-300 transition-colors";
    clearBtn.textContent = "Clear completed";
    clearBtn.addEventListener("click", () => {
      if (completedCount === 0) return;
      pushUndoState(`${completedCount} completed tasks`);
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

  // src/widgets/markdown.js
  function formatInlineMarkdown(text) {
    let safe = escapeHtml(text);
    safe = safe.replace(/`([^`]+)`/g, "<code>$1</code>");
    safe = safe.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    safe = safe.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    safe = safe.replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    return safe;
  }
  function renderMarkdownToElement(container, rawText, onToggleCheckboxLine) {
    container.innerHTML = "";
    const text = (rawText || "").trim();
    if (!text) {
      const empty = document.createElement("p");
      empty.className = "text-white/40 italic text-xs";
      empty.textContent = "Empty note — click “Edit” to start writing.";
      container.appendChild(empty);
      return;
    }
    const lines = rawText.split("\n");
    let currentList = null;
    lines.forEach((line, lineIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        currentList = null;
        return;
      }
      if (trimmed.startsWith("### ")) {
        currentList = null;
        const h3 = document.createElement("h3");
        h3.innerHTML = formatInlineMarkdown(trimmed.slice(4));
        container.appendChild(h3);
        return;
      }
      if (trimmed.startsWith("## ")) {
        currentList = null;
        const h2 = document.createElement("h2");
        h2.innerHTML = formatInlineMarkdown(trimmed.slice(3));
        container.appendChild(h2);
        return;
      }
      if (trimmed.startsWith("# ")) {
        currentList = null;
        const h1 = document.createElement("h1");
        h1.innerHTML = formatInlineMarkdown(trimmed.slice(2));
        container.appendChild(h1);
        return;
      }
      if (trimmed.startsWith("> ")) {
        currentList = null;
        const bq = document.createElement("blockquote");
        bq.innerHTML = formatInlineMarkdown(trimmed.slice(2));
        container.appendChild(bq);
        return;
      }
      const taskMatch = trimmed.match(/^[-*•]\s+\[([ xX])\]\s+(.*)$/);
      if (taskMatch) {
        if (!currentList) {
          currentList = document.createElement("ul");
          container.appendChild(currentList);
        }
        const isChecked = taskMatch[1].toLowerCase() === "x";
        const itemText = taskMatch[2];
        const li = document.createElement("li");
        li.className = "md-task-item";
        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.checked = isChecked;
        cb.className = "custom-checkbox";
        cb.addEventListener("change", () => {
          onToggleCheckboxLine(lineIdx, cb.checked);
        });
        const span = document.createElement("span");
        span.className = isChecked ? "line-through opacity-50" : "";
        span.innerHTML = formatInlineMarkdown(itemText);
        li.appendChild(cb);
        li.appendChild(span);
        currentList.appendChild(li);
        return;
      }
      const ulMatch = trimmed.match(/^[-*•]\s+(.*)$/);
      if (ulMatch) {
        if (!currentList || currentList.tagName !== "UL") {
          currentList = document.createElement("ul");
          container.appendChild(currentList);
        }
        const li = document.createElement("li");
        li.innerHTML = formatInlineMarkdown(ulMatch[1]);
        currentList.appendChild(li);
        return;
      }
      const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        if (!currentList || currentList.tagName !== "OL") {
          currentList = document.createElement("ol");
          container.appendChild(currentList);
        }
        const li = document.createElement("li");
        li.innerHTML = formatInlineMarkdown(olMatch[1]);
        currentList.appendChild(li);
        return;
      }
      currentList = null;
      const p = document.createElement("p");
      p.innerHTML = formatInlineMarkdown(trimmed);
      container.appendChild(p);
    });
  }

  // src/widgets/notes.js
  var editingNoteIds = /* @__PURE__ */ new Set();
  function buildNotesWidgetContent(widget, cardEl) {
    const actionsFrag = document.createDocumentFragment();
    const toggleMdBtn = document.createElement("button");
    toggleMdBtn.type = "button";
    toggleMdBtn.addEventListener("click", () => {
      if (textarea.classList.contains("hidden")) {
        startEditing();
      } else {
        flushContent();
        setPreviewMode(true);
      }
    });
    actionsFrag.appendChild(toggleMdBtn);
    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    `;
    const header = createWidgetHeader(
      widget,
      "bg-amber-400/15 text-amber-300 border-amber-400/25",
      iconSvg,
      actionsFrag,
      {
        menuItems: [
          {
            label: "Copy note",
            icon: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>`,
            onSelect: copyNote
          },
          {
            label: "Clear note",
            hint: "Undo with Ctrl+Z",
            icon: `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>`,
            onSelect: clearNote
          }
        ]
      }
    );
    const textarea = document.createElement("textarea");
    textarea.className = "w-full flex-1 resize-none rounded-xl bg-black/25 border border-white/10 p-3 text-xs sm:text-sm leading-relaxed text-white/95 placeholder-white/40 focus:border-amber-400/60 focus:bg-black/35 focus:outline-none custom-scrollbar select-text";
    textarea.placeholder = "Write notes or use Markdown (# Heading, **bold**, - [ ] task)...";
    textarea.value = widget.data.content || "";
    const mdPreview = document.createElement("div");
    mdPreview.className = "markdown-body w-full flex-1 overflow-y-auto rounded-xl bg-black/20 border border-white/10 p-3 text-white/90 custom-scrollbar select-text cursor-text";
    mdPreview.title = "Click to edit";
    const handleToggleCheckbox = (lineIdx, checked) => {
      const lines = (widget.data.content || "").split("\n");
      if (lines[lineIdx] !== void 0) {
        lines[lineIdx] = lines[lineIdx].replace(
          /^(\s*[-*•]\s+\[)[ xX](\])/,
          `$1${checked ? "x" : " "}$2`
        );
        widget.data.content = lines.join("\n");
        saveState();
        renderAllWidgets();
      }
    };
    function setPreviewMode(preview) {
      const showPreview = preview && Boolean(textarea.value.trim());
      if (showPreview) {
        editingNoteIds.delete(widget.id);
        renderMarkdownToElement(mdPreview, textarea.value, handleToggleCheckbox);
      } else if (!preview) {
        editingNoteIds.add(widget.id);
      }
      textarea.classList.toggle("hidden", showPreview);
      mdPreview.classList.toggle("hidden", !showPreview);
      toggleMdBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium border transition-colors ${showPreview ? "bg-white/10 text-white/75 border-white/10 hover:text-white" : "bg-amber-400/25 text-amber-200 border-amber-400/40"}`;
      toggleMdBtn.title = showPreview ? "Edit this note" : "Show the formatted Markdown preview";
      toggleMdBtn.innerHTML = showPreview ? '✏️<span class="widget-action-label"> Edit</span>' : '👁️<span class="widget-action-label"> Preview</span>';
    }
    function startEditing() {
      setPreviewMode(false);
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }
    function flushContent() {
      if (widget.data.content !== textarea.value) {
        widget.data.content = textarea.value;
        saveState();
      }
    }
    mdPreview.addEventListener("click", (e) => {
      if (e.target.closest("input, a, button")) return;
      if (window.getSelection()?.toString()) return;
      startEditing();
    });
    const footer = document.createElement("div");
    footer.className = "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    const countSpan = document.createElement("span");
    const savedSpan = document.createElement("span");
    savedSpan.textContent = widget.data.lastSaved || "Synced locally";
    const updateMetrics = (txt) => {
      const chars = txt.length;
      const words = txt.trim() ? txt.trim().split(/\s+/).length : 0;
      countSpan.textContent = `${chars} characters • ${words} words`;
    };
    updateMetrics(textarea.value);
    const debouncedSave = debounce((val) => {
      widget.data.content = val;
      const now = /* @__PURE__ */ new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const ss = String(now.getSeconds()).padStart(2, "0");
      widget.data.lastSaved = `Saved at ${hh}:${mm}:${ss}`;
      savedSpan.textContent = widget.data.lastSaved;
      saveState();
    }, 280);
    textarea.addEventListener("input", () => {
      savedSpan.textContent = "Saving...";
      updateMetrics(textarea.value);
      debouncedSave(textarea.value);
    });
    textarea.addEventListener("blur", (e) => {
      if (!document.hasFocus() || e.relatedTarget && cardEl.contains(e.relatedTarget)) return;
      if (!textarea.value.trim()) return;
      flushContent();
      setPreviewMode(true);
    });
    async function copyNote() {
      try {
        await navigator.clipboard.writeText(widget.data.content || "");
        savedSpan.textContent = "✓ Copied to clipboard!";
        showToast("✓ Note copied to clipboard!");
        setTimeout(() => {
          savedSpan.textContent = widget.data.lastSaved || "Synced locally";
        }, 1600);
      } catch {
        textarea.select();
      }
    }
    function clearNote() {
      if (!(widget.data.content || "").trim()) return;
      pushUndoState(`Text in “${widget.title}”`);
      textarea.value = "";
      widget.data.content = "";
      widget.data.lastSaved = "Note cleared";
      updateMetrics("");
      savedSpan.textContent = widget.data.lastSaved;
      saveState();
      renderAllWidgets();
    }
    footer.appendChild(countSpan);
    footer.appendChild(savedSpan);
    setPreviewMode(!editingNoteIds.has(widget.id));
    cardEl.appendChild(header);
    cardEl.appendChild(textarea);
    cardEl.appendChild(mdPreview);
    cardEl.appendChild(footer);
    return header;
  }

  // src/widgets/calendar.js
  function buildCalendarWidgetContent(widget, cardEl) {
    const now = /* @__PURE__ */ new Date();
    if (typeof widget.data?.viewYear !== "number") widget.data.viewYear = now.getFullYear();
    if (typeof widget.data?.viewMonth !== "number") widget.data.viewMonth = now.getMonth();
    const year = widget.data.viewYear;
    const month = widget.data.viewMonth;
    const actionsFrag = document.createDocumentFragment();
    const navWrap = document.createElement("div");
    navWrap.className = "flex items-center gap-1";
    const prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "px-1.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs";
    prevBtn.title = "Previous month";
    prevBtn.textContent = "◀";
    prevBtn.addEventListener("click", () => {
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
    const todayBtn = document.createElement("button");
    todayBtn.type = "button";
    todayBtn.className = "px-2 py-0.5 rounded-lg bg-accent-400/20 hover:bg-accent-400/30 text-accent-300 text-[11px] font-medium";
    todayBtn.textContent = "Today";
    todayBtn.addEventListener("click", () => {
      const curr = /* @__PURE__ */ new Date();
      widget.data.viewMonth = curr.getMonth();
      widget.data.viewYear = curr.getFullYear();
      saveState();
      renderAllWidgets();
    });
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "px-1.5 py-0.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs";
    nextBtn.title = "Next month";
    nextBtn.textContent = "▶";
    nextBtn.addEventListener("click", () => {
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
      "bg-violet-400/15 text-violet-300 border-violet-400/25",
      iconSvg,
      actionsFrag
    );
    const body = document.createElement("div");
    body.className = "flex-1 flex flex-col justify-between";
    const monthName = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric"
    }).format(new Date(year, month, 1));
    const monthTitle = document.createElement("div");
    monthTitle.className = "text-center text-xs sm:text-sm font-semibold capitalize text-white/90 mb-2";
    monthTitle.textContent = monthName;
    body.appendChild(monthTitle);
    const grid = document.createElement("div");
    grid.className = "calendar-grid flex-1 items-center";
    const headers = ["Wk", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    headers.forEach((h, idx) => {
      const hEl = document.createElement("div");
      hEl.className = `text-[10px] font-semibold uppercase tracking-wider py-1 ${idx === 0 ? "text-accent-300/85" : idx >= 6 ? "text-rose-300/75" : "text-white/50"}`;
      hEl.textContent = h;
      grid.appendChild(hEl);
    });
    const firstDayOfMonth = new Date(year, month, 1);
    const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
    const startDate = new Date(year, month, 1 - startOffset);
    for (let row = 0; row < 6; row++) {
      const rowMonday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + row * 7);
      const weekNum = getISOWeekNumber(rowMonday);
      const wkBadge = document.createElement("div");
      wkBadge.className = "calendar-week-badge";
      wkBadge.title = `Week ${weekNum} of the year`;
      wkBadge.textContent = `W${weekNum}`;
      grid.appendChild(wkBadge);
      for (let col = 0; col < 7; col++) {
        const cellDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate() + row * 7 + col
        );
        const isCurrentMonth = cellDate.getMonth() === month;
        const isToday = cellDate.getDate() === now.getDate() && cellDate.getMonth() === now.getMonth() && cellDate.getFullYear() === now.getFullYear();
        const cell = document.createElement("div");
        cell.className = `calendar-cell ${isToday ? "is-today" : isCurrentMonth ? col >= 5 ? "text-rose-200/85 hover:bg-white/10" : "text-white/90 hover:bg-white/10" : "text-white/25"}`;
        cell.textContent = String(cellDate.getDate());
        grid.appendChild(cell);
      }
    }
    body.appendChild(grid);
    const footer = document.createElement("div");
    footer.className = "mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    footer.innerHTML = `
      <span>Current week: <strong class="text-accent-300">W${getISOWeekNumber(now)}</strong></span>
      <span>ISO 8601</span>
    `;
    cardEl.appendChild(header);
    cardEl.appendChild(body);
    cardEl.appendChild(footer);
    return header;
  }

  // src/widgets/forecast.js
  var forecastCache = {};
  function buildForecastWidgetContent(widget, cardEl) {
    const cityObj = WEATHER_CITIES.find((c) => c.name === state.weatherCity) || WEATHER_CITIES[0];
    const actionsFrag = document.createDocumentFragment();
    const cityBadge = document.createElement("span");
    cityBadge.className = "px-2 py-0.5 rounded-lg bg-sky-400/15 text-sky-300 text-[11px] font-medium";
    cityBadge.textContent = `📍 ${cityObj.name}`;
    actionsFrag.appendChild(cityBadge);
    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    `;
    const header = createWidgetHeader(
      widget,
      "bg-sky-400/15 text-sky-300 border-sky-400/25",
      iconSvg,
      actionsFrag
    );
    const listContainer = document.createElement("div");
    listContainer.className = "flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1";
    const renderDays = (days) => {
      listContainer.innerHTML = "";
      days.forEach((d, idx) => {
        const row = document.createElement("div");
        row.className = "flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2 text-xs";
        row.innerHTML = `
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="text-lg leading-none">${d.icon}</span>
            <div>
              <div class="font-medium text-white capitalize">${idx === 0 ? "Today" : escapeHtml(d.dayName)}</div>
              <div class="text-[10px] text-white/50">${escapeHtml(d.desc)}</div>
            </div>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-[10px] text-sky-300/85 font-mono" title="Chance of precipitation">💧 ${d.precip}%</span>
            <div class="font-mono text-xs">
              <span class="font-semibold text-white">${d.max}°</span>
              <span class="text-white/45 ml-1">${d.min}°</span>
            </div>
          </div>
        `;
        listContainer.appendChild(row);
      });
    };
    const fallbackDays = Array.from({ length: 5 }, (_, i) => {
      const dt = /* @__PURE__ */ new Date();
      dt.setDate(dt.getDate() + i);
      const dayName = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short"
      }).format(dt);
      const mapped = mapWmoCodeToRo(i % 3 === 0 ? 0 : i % 2 === 0 ? 1 : 80);
      return {
        dayName,
        icon: mapped.icon,
        desc: mapped.desc,
        max: cityObj.mockTemp + i % 3 - 1,
        min: cityObj.mockTemp - 7 + i % 2,
        precip: i % 2 === 0 ? 10 : 35
      };
    });
    if (forecastCache[cityObj.name]) {
      renderDays(forecastCache[cityObj.name]);
    } else {
      renderDays(fallbackDays);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityObj.lat}&longitude=${cityObj.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=5`;
      fetch(url).then((r) => r.ok ? r.json() : null).then((data) => {
        if (!data?.daily?.time) return;
        const liveDays = data.daily.time.slice(0, 5).map((isoDate, idx) => {
          const dt = /* @__PURE__ */ new Date(`${isoDate}T12:00:00`);
          const dayName = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short"
          }).format(dt);
          const mapped = mapWmoCodeToRo(data.daily.weathercode?.[idx] ?? 0);
          return {
            dayName,
            icon: mapped.icon,
            desc: mapped.desc,
            max: Math.round(data.daily.temperature_2m_max?.[idx] ?? cityObj.mockTemp),
            min: Math.round(data.daily.temperature_2m_min?.[idx] ?? cityObj.mockTemp - 6),
            precip: Math.round(data.daily.precipitation_probability_max?.[idx] ?? 0)
          };
        });
        forecastCache[cityObj.name] = liveDays;
        renderDays(liveDays);
      }).catch(() => {
      });
    }
    const footer = document.createElement("div");
    footer.className = "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    footer.innerHTML = `
      <span>5-day forecast (${escapeHtml(cityObj.name)})</span>
      <span>Open-Meteo</span>
    `;
    cardEl.appendChild(header);
    cardEl.appendChild(listContainer);
    cardEl.appendChild(footer);
    return header;
  }

  // src/widgets/countdown.js
  function buildCountdownWidgetContent(widget, cardEl) {
    if (!Array.isArray(widget.data?.items)) {
      const nextMonth = /* @__PURE__ */ new Date();
      nextMonth.setDate(nextMonth.getDate() + 14);
      widget.data = {
        items: [
          {
            id: "cd-1",
            title: "Project launch / Vacation",
            targetDate: nextMonth.toISOString().slice(0, 10)
          }
        ]
      };
    }
    const items = widget.data.items;
    const actionsFrag = document.createDocumentFragment();
    const addBtn = document.createElement("button");
    addBtn.type = "button";
    addBtn.className = "flex items-center gap-1 rounded-lg bg-rose-400/20 hover:bg-rose-400/30 border border-rose-400/30 px-2 py-1 text-[11px] font-medium text-rose-200 transition-colors";
    addBtn.textContent = "+ Event";
    actionsFrag.appendChild(addBtn);
    const iconSvg = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `;
    const header = createWidgetHeader(
      widget,
      "bg-rose-400/15 text-rose-300 border-rose-400/25",
      iconSvg,
      actionsFrag
    );
    const form = document.createElement("form");
    form.className = "hidden mb-2.5 rounded-xl bg-black/40 border border-white/15 p-2.5 space-y-2";
    form.innerHTML = `
      <input
        type="text"
        name="evTitle"
        required
        maxlength="48"
        placeholder="Event name (e.g., Vacation, Exam, Release)..."
        class="w-full rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:outline-none select-text"
      />
      <div class="flex items-center gap-1.5">
        <input
          type="date"
          name="evDate"
          required
          class="flex-1 rounded-lg bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white focus:outline-none"
        />
        <button type="submit" class="rounded-lg bg-rose-500 hover:bg-rose-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Add</button>
      </div>
    `;
    addBtn.addEventListener("click", () => {
      form.classList.toggle("hidden");
      if (!form.classList.contains("hidden")) {
        form.querySelector('input[name="evTitle"]').focus();
      }
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = form.querySelector('input[name="evTitle"]').value.trim();
      const targetDate = form.querySelector('input[name="evDate"]').value;
      if (!title || !targetDate) return;
      items.push({
        id: `cd-${Date.now()}`,
        title,
        targetDate
      });
      items.sort((a, b) => a.targetDate.localeCompare(b.targetDate));
      saveState();
      renderAllWidgets();
    });
    const listEl = document.createElement("div");
    listEl.className = "flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1";
    const now = /* @__PURE__ */ new Date();
    now.setHours(0, 0, 0, 0);
    if (items.length === 0) {
      const empty = document.createElement("div");
      empty.className = "py-8 text-center text-xs text-white/45 border border-dashed border-white/10 rounded-xl";
      empty.textContent = "No events set. Click “+ Event”.";
      listEl.appendChild(empty);
    } else {
      items.forEach((ev) => {
        const target = /* @__PURE__ */ new Date(`${ev.targetDate}T00:00:00`);
        const diffDays = Math.round((target - now) / 864e5);
        let badgeText = "";
        let badgeCls = "";
        if (diffDays > 1) {
          badgeText = `${diffDays} days`;
          badgeCls = "bg-accent-500/20 text-accent-300 border-accent-400/30";
        } else if (diffDays === 1) {
          badgeText = "Tomorrow!";
          badgeCls = "bg-amber-500/25 text-amber-200 border-amber-400/40";
        } else if (diffDays === 0) {
          badgeText = "Today! 🎉";
          badgeCls = "bg-emerald-500/30 text-emerald-200 border-emerald-400/50";
        } else {
          badgeText = `In the past ${Math.abs(diffDays)}d`;
          badgeCls = "bg-white/10 text-white/45 border-white/10";
        }
        const row = document.createElement("div");
        row.className = "group flex items-center justify-between gap-2 rounded-xl bg-white/[0.045] border border-white/10 px-3 py-2";
        row.innerHTML = `
          <div class="min-w-0 flex-1">
            <div class="text-xs font-semibold text-white truncate">${escapeHtml(ev.title)}</div>
            <div class="text-[10px] text-white/45 font-mono">${escapeHtml(ev.targetDate)}</div>
          </div>
          <div class="flex items-center gap-1.5 shrink-0">
            <span class="font-mono text-xs font-semibold px-2 py-0.5 rounded-lg border ${badgeCls}">${badgeText}</span>
            <button type="button" data-del-cd class="opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/40 hover:text-rose-300 transition-opacity" title="Delete event">✕</button>
          </div>
        `;
        row.querySelector("[data-del-cd]").addEventListener("click", () => {
          pushUndoState(`Event “${ev.title}”`);
          widget.data.items = items.filter((item) => item.id !== ev.id);
          saveState();
          renderAllWidgets();
        });
        listEl.appendChild(row);
      });
    }
    const footer = document.createElement("div");
    footer.className = "mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    footer.innerHTML = `
      <span>${items.length} events tracked</span>
    `;
    cardEl.appendChild(header);
    cardEl.appendChild(form);
    cardEl.appendChild(listEl);
    cardEl.appendChild(footer);
    return header;
  }

  // src/widgets/snippets.js
  function buildSnippetsWidgetContent(widget, cardEl) {
    if (!widget.data) widget.data = { items: [], activeTag: "all" };
    if (!Array.isArray(widget.data.items)) widget.data.items = [];
    if (!widget.data.activeTag) widget.data.activeTag = "all";
    const extraFrag = document.createDocumentFragment();
    const toggleAddBtn = document.createElement("button");
    toggleAddBtn.type = "button";
    toggleAddBtn.className = "px-2 py-1 rounded-lg text-[11px] font-medium text-accent-300 bg-accent-400/15 hover:bg-accent-400/25 transition-colors";
    toggleAddBtn.textContent = "+ Snippet";
    toggleAddBtn.title = "Add a new command or text snippet";
    extraFrag.appendChild(toggleAddBtn);
    const header = createWidgetHeader(
      widget,
      "bg-cyan-400/20 text-cyan-300",
      `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>`,
      extraFrag
    );
    const addForm = document.createElement("form");
    addForm.className = "hidden mb-2.5 p-2.5 rounded-xl bg-black/25 border border-white/10 space-y-1.5";
    addForm.innerHTML = `
      <div class="flex gap-1.5">
        <input type="text" data-field="title" placeholder="Label (e.g. Flash XCP GM27)" class="flex-1 min-w-0 rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs text-white placeholder-white/40 focus:border-accent-400 focus:outline-none select-text" required />
        <input type="text" data-field="tag" placeholder="Tag (Git/XCP)" class="w-24 rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs text-white placeholder-white/40 focus:border-accent-400 focus:outline-none select-text" />
      </div>
      <textarea data-field="code" rows="2" placeholder="Command, path, or text to copy with 1 click..." class="w-full rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs font-mono text-white placeholder-white/40 focus:border-accent-400 focus:outline-none custom-scrollbar select-text" required></textarea>
      <div class="flex justify-end gap-1.5">
        <button type="button" data-action="cancel" class="px-2.5 py-1 rounded-lg text-[11px] text-white/65 hover:text-white hover:bg-white/10">Cancel</button>
        <button type="submit" class="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-accent-500 hover:bg-accent-400 text-slate-950">Save</button>
      </div>
    `;
    toggleAddBtn.addEventListener("click", () => {
      addForm.classList.toggle("hidden");
      if (!addForm.classList.contains("hidden")) {
        addForm.querySelector('[data-field="title"]')?.focus();
      }
    });
    addForm.querySelector('[data-action="cancel"]').addEventListener("click", () => {
      addForm.reset();
      addForm.classList.add("hidden");
    });
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = addForm.querySelector('[data-field="title"]').value.trim();
      const tag = addForm.querySelector('[data-field="tag"]').value.trim() || "General";
      const code = addForm.querySelector('[data-field="code"]').value.trim();
      if (!title || !code) return;
      widget.data.items.unshift({
        id: `snip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title,
        tag,
        code
      });
      saveState();
      renderAllWidgets();
      showToast(`✓ Snippet “${title}” saved!`);
    });
    const filterBar = document.createElement("div");
    filterBar.className = "mb-2 flex items-center gap-1.5";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Filter snippets...";
    searchInput.className = "flex-1 min-w-0 rounded-xl bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:border-accent-400 focus:outline-none select-text";
    const tags = ["all", ...Array.from(new Set(widget.data.items.map((i) => i.tag || "General")))];
    const tagSelect = document.createElement("select");
    tagSelect.className = "rounded-xl bg-white/10 border border-white/15 px-2 py-1 text-[11px] text-white/85 focus:border-accent-400 focus:outline-none";
    tags.forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.className = "bg-slate-900";
      opt.textContent = t === "all" ? "All tags" : `#${t}`;
      if (t === widget.data.activeTag) opt.selected = true;
      tagSelect.appendChild(opt);
    });
    filterBar.appendChild(searchInput);
    filterBar.appendChild(tagSelect);
    const listEl = document.createElement("div");
    listEl.className = "flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1";
    const renderList = () => {
      listEl.innerHTML = "";
      const q = searchInput.value.trim().toLowerCase();
      const activeTag = widget.data.activeTag || "all";
      const filtered = widget.data.items.filter((item) => {
        const tagMatch = activeTag === "all" || (item.tag || "General") === activeTag;
        const textMatch = !q || item.title.toLowerCase().includes(q) || item.code.toLowerCase().includes(q) || (item.tag || "").toLowerCase().includes(q);
        return tagMatch && textMatch;
      });
      if (filtered.length === 0) {
        listEl.innerHTML = `<p class="py-6 text-center text-xs text-white/40">No snippets found. Click + Snippet to add one.</p>`;
        return;
      }
      filtered.forEach((item) => {
        const card = document.createElement("div");
        card.className = "snippet-card rounded-xl p-2 group cursor-pointer";
        card.title = "Click to copy to clipboard";
        const topRow = document.createElement("div");
        topRow.className = "flex items-center justify-between gap-2 mb-1";
        const titleWrap = document.createElement("div");
        titleWrap.className = "flex items-center gap-1.5 min-w-0";
        titleWrap.innerHTML = `
          <span class="text-xs font-medium text-white/95 truncate">${escapeHtml(item.title)}</span>
          <span class="shrink-0 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-accent-300">#${escapeHtml(item.tag || "General")}</span>
        `;
        const actions = document.createElement("div");
        actions.className = "flex items-center gap-1 shrink-0";
        const copyBadge = document.createElement("span");
        copyBadge.className = "px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-accent-500/20 text-accent-300";
        copyBadge.textContent = "📋 Copy";
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/45 hover:text-rose-400 transition-opacity";
        delBtn.title = "Delete snippet";
        delBtn.textContent = "✕";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          pushUndoState(`Snippet “${item.title}”`);
          widget.data.items = widget.data.items.filter((s) => s.id !== item.id);
          saveState();
          renderAllWidgets();
        });
        actions.appendChild(copyBadge);
        actions.appendChild(delBtn);
        topRow.appendChild(titleWrap);
        topRow.appendChild(actions);
        const codeEl = document.createElement("pre");
        codeEl.className = "text-[11px] font-mono text-white/75 bg-black/25 rounded-lg px-2 py-1 overflow-x-auto custom-scrollbar whitespace-pre-wrap break-all select-text";
        codeEl.textContent = item.code;
        card.addEventListener("click", () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(item.code).then(() => {
              copyBadge.textContent = "✓ Copied!";
              showToast(`✓ Copied “${item.title}” to clipboard!`);
              setTimeout(() => {
                copyBadge.textContent = "📋 Copy";
              }, 1400);
            });
          }
        });
        card.appendChild(topRow);
        card.appendChild(codeEl);
        listEl.appendChild(card);
      });
    };
    searchInput.addEventListener("input", renderList);
    tagSelect.addEventListener("change", () => {
      widget.data.activeTag = tagSelect.value;
      saveState();
      renderList();
    });
    renderList();
    const footer = document.createElement("div");
    footer.className = "mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45";
    footer.innerHTML = `<span>${widget.data.items.length} snippets • click any card to copy</span>`;
    cardEl.appendChild(header);
    cardEl.appendChild(addForm);
    cardEl.appendChild(filterBar);
    cardEl.appendChild(listEl);
    cardEl.appendChild(footer);
    return header;
  }

  // src/widgets/pomodoro.js
  var activePomodoroIntervals = /* @__PURE__ */ new Map();
  function playPomodoroChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + idx * 0.14 + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.14);
        osc.stop(ctx.currentTime + idx * 0.14 + 0.36);
      });
    } catch {
    }
  }
  function buildPomodoroWidgetContent(widget, cardEl) {
    if (!widget.data) {
      widget.data = {
        mode: "focus",
        // 'focus' | 'short' | 'long'
        focusMin: 25,
        shortMin: 5,
        longMin: 15,
        remainingSec: 25 * 60,
        running: false,
        completedSessions: 0,
        linkedTask: ""
      };
    }
    const d = widget.data;
    const getDurationSec = (m) => {
      if (m === "short") return (d.shortMin || 5) * 60;
      if (m === "long") return (d.longMin || 15) * 60;
      return (d.focusMin || 25) * 60;
    };
    if (typeof d.remainingSec !== "number" || d.remainingSec < 0) {
      d.remainingSec = getDurationSec(d.mode);
    }
    const header = createWidgetHeader(
      widget,
      "bg-rose-400/20 text-rose-300",
      `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>`
    );
    const body = document.createElement("div");
    body.className = "flex-1 flex flex-col justify-between gap-2.5 overflow-y-auto custom-scrollbar pr-0.5";
    const modesWrap = document.createElement("div");
    modesWrap.className = "grid grid-cols-3 gap-1 rounded-xl bg-black/25 p-1";
    const modeDefs = [
      { id: "focus", label: "Focus", minKey: "focusMin" },
      { id: "short", label: "Short", minKey: "shortMin" },
      { id: "long", label: "Long", minKey: "longMin" }
    ];
    const modeBtns = {};
    modeDefs.forEach((m) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `todo-filter-btn rounded-lg py-1 text-[11px] transition-colors ${d.mode === m.id ? "active" : ""}`;
      btn.textContent = `${m.label} (${d[m.minKey]}m)`;
      btn.addEventListener("click", () => {
        stopTimer();
        d.mode = m.id;
        d.remainingSec = getDurationSec(m.id);
        saveState();
        updateDisplay();
      });
      modeBtns[m.id] = btn;
      modesWrap.appendChild(btn);
    });
    const clockBox = document.createElement("div");
    clockBox.className = "flex flex-col items-center justify-center py-2";
    const timeEl = document.createElement("div");
    timeEl.className = "font-mono text-4xl sm:text-5xl font-light tracking-tight text-white";
    const progressTrack = document.createElement("div");
    progressTrack.className = "w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-3";
    const progressFill = document.createElement("div");
    progressFill.className = "h-full bg-accent-400 transition-all duration-500";
    progressTrack.appendChild(progressFill);
    clockBox.appendChild(timeEl);
    clockBox.appendChild(progressTrack);
    const controls = document.createElement("div");
    controls.className = "flex items-center justify-center gap-2";
    const startPauseBtn = document.createElement("button");
    startPauseBtn.type = "button";
    startPauseBtn.className = "px-4 py-1.5 rounded-xl bg-accent-500 hover:bg-accent-400 text-slate-950 font-semibold text-xs transition-colors";
    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 text-xs transition-colors";
    resetBtn.textContent = "↺ Reset";
    const skipBtn = document.createElement("button");
    skipBtn.type = "button";
    skipBtn.className = "px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white/85 text-xs transition-colors";
    skipBtn.textContent = "⏭ Next";
    controls.appendChild(startPauseBtn);
    controls.appendChild(resetBtn);
    controls.appendChild(skipBtn);
    const activeWs = getActiveWorkspace();
    const openTasks = [];
    activeWs.widgets.forEach((w) => {
      if (w.type === "todo" && Array.isArray(w.data?.items)) {
        w.data.items.forEach((t) => {
          if (!t.completed) openTasks.push(t.text);
        });
      }
    });
    const taskRow = document.createElement("div");
    taskRow.className = "space-y-1";
    const taskLabel = document.createElement("label");
    taskLabel.className = "block text-[10px] uppercase tracking-wider text-white/50";
    taskLabel.textContent = "Current focus task";
    const taskSelect = document.createElement("select");
    taskSelect.className = "w-full rounded-xl bg-white/10 border border-white/15 px-2.5 py-1.5 text-xs text-white/90 focus:border-accent-400 focus:outline-none";
    const emptyOpt = document.createElement("option");
    emptyOpt.value = "";
    emptyOpt.className = "bg-slate-900";
    emptyOpt.textContent = "— Select an active To-Do task —";
    taskSelect.appendChild(emptyOpt);
    openTasks.forEach((txt) => {
      const opt = document.createElement("option");
      opt.value = txt;
      opt.className = "bg-slate-900";
      opt.textContent = txt;
      if (d.linkedTask === txt) opt.selected = true;
      taskSelect.appendChild(opt);
    });
    taskSelect.addEventListener("change", () => {
      d.linkedTask = taskSelect.value;
      saveState();
    });
    taskRow.appendChild(taskLabel);
    taskRow.appendChild(taskSelect);
    const footer = document.createElement("div");
    footer.className = "pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/55";
    const sessionsSpan = document.createElement("span");
    const resetSessionsBtn = document.createElement("button");
    resetSessionsBtn.type = "button";
    resetSessionsBtn.className = "hover:text-white transition-colors";
    resetSessionsBtn.textContent = "Reset count";
    resetSessionsBtn.addEventListener("click", () => {
      d.completedSessions = 0;
      saveState();
      updateDisplay();
    });
    footer.appendChild(sessionsSpan);
    footer.appendChild(resetSessionsBtn);
    function updateDisplay() {
      const mins = String(Math.floor(d.remainingSec / 60)).padStart(2, "0");
      const secs = String(d.remainingSec % 60).padStart(2, "0");
      timeEl.textContent = `${mins}:${secs}`;
      const total = Math.max(1, getDurationSec(d.mode));
      const pct = Math.min(100, Math.max(0, (total - d.remainingSec) / total * 100));
      progressFill.style.width = `${pct}%`;
      startPauseBtn.textContent = d.running ? "⏸ Pause" : "▶ Start";
      sessionsSpan.textContent = `🍅 ${d.completedSessions || 0} sessions completed`;
      Object.entries(modeBtns).forEach(([id, btn]) => {
        btn.classList.toggle("active", d.mode === id);
      });
    }
    function stopTimer() {
      d.running = false;
      const existing = activePomodoroIntervals.get(widget.id);
      if (existing) {
        clearInterval(existing);
        activePomodoroIntervals.delete(widget.id);
      }
    }
    function advanceMode() {
      stopTimer();
      if (d.mode === "focus") {
        d.completedSessions = (d.completedSessions || 0) + 1;
        d.mode = d.completedSessions % 4 === 0 ? "long" : "short";
      } else {
        d.mode = "focus";
      }
      d.remainingSec = getDurationSec(d.mode);
      saveState();
      updateDisplay();
    }
    function startTimer() {
      if (d.running) return;
      d.running = true;
      updateDisplay();
      const id = setInterval(() => {
        if (!document.body.contains(cardEl)) {
          stopTimer();
          return;
        }
        if (d.remainingSec > 0) {
          d.remainingSec -= 1;
          updateDisplay();
        } else {
          playPomodoroChime();
          const finishedLabel = d.mode === "focus" ? "Focus session complete! Take a break." : "Break finished! Ready to focus.";
          showToast(`🍅 ${finishedLabel}`);
          if (typeof Notification === "function" && Notification.permission === "granted") {
            new Notification("FocusHub Pomodoro", { body: finishedLabel });
          }
          advanceMode();
        }
      }, 1e3);
      activePomodoroIntervals.set(widget.id, id);
    }
    startPauseBtn.addEventListener("click", () => {
      if (d.running) {
        stopTimer();
        saveState();
        updateDisplay();
      } else {
        if (typeof Notification === "function" && Notification.permission === "default") {
          Notification.requestPermission().catch(() => {
          });
        }
        startTimer();
      }
    });
    resetBtn.addEventListener("click", () => {
      stopTimer();
      d.remainingSec = getDurationSec(d.mode);
      saveState();
      updateDisplay();
    });
    skipBtn.addEventListener("click", () => {
      advanceMode();
    });
    stopTimer();
    updateDisplay();
    body.appendChild(modesWrap);
    body.appendChild(clockBox);
    body.appendChild(controls);
    body.appendChild(taskRow);
    cardEl.appendChild(header);
    cardEl.appendChild(body);
    cardEl.appendChild(footer);
    return header;
  }

  // src/widgets/converters.js
  function buildConvertersWidgetContent(widget, cardEl) {
    if (!widget.data) {
      widget.data = { activeTab: "radix", value: 255, bits: 16 };
    }
    const d = widget.data;
    if (!d.activeTab) d.activeTab = "radix";
    if (typeof d.value !== "number" || !Number.isFinite(d.value)) d.value = 255;
    if (![8, 16, 32].includes(d.bits)) d.bits = 16;
    const header = createWidgetHeader(
      widget,
      "bg-indigo-400/20 text-indigo-300",
      `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>`
    );
    const tabsWrap = document.createElement("div");
    tabsWrap.className = "grid grid-cols-2 gap-1 rounded-xl bg-black/25 p-1 mb-2.5";
    const tabRadixBtn = document.createElement("button");
    tabRadixBtn.type = "button";
    tabRadixBtn.className = `todo-filter-btn rounded-lg py-1 text-[11px] ${d.activeTab === "radix" ? "active" : ""}`;
    tabRadixBtn.textContent = "Hex / Dec / Bin";
    const tabUnitsBtn = document.createElement("button");
    tabUnitsBtn.type = "button";
    tabUnitsBtn.className = `todo-filter-btn rounded-lg py-1 text-[11px] ${d.activeTab === "units" ? "active" : ""}`;
    tabUnitsBtn.textContent = "RF & Automotive Units";
    tabsWrap.appendChild(tabRadixBtn);
    tabsWrap.appendChild(tabUnitsBtn);
    const contentWrap = document.createElement("div");
    contentWrap.className = "flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-0.5";
    function renderTab() {
      tabRadixBtn.classList.toggle("active", d.activeTab === "radix");
      tabUnitsBtn.classList.toggle("active", d.activeTab === "units");
      contentWrap.innerHTML = "";
      if (d.activeTab === "radix") {
        const bitWidthRow = document.createElement("div");
        bitWidthRow.className = "flex items-center justify-between text-[11px]";
        bitWidthRow.innerHTML = `<span class="text-white/60">Bit width</span>`;
        const bitBtns = document.createElement("div");
        bitBtns.className = "flex gap-1";
        [8, 16, 32].forEach((b) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = `px-2 py-0.5 rounded-md font-mono text-[10px] ${d.bits === b ? "bg-accent-500/25 text-accent-300 font-semibold" : "bg-white/10 text-white/60"}`;
          btn.textContent = `${b}-bit`;
          btn.addEventListener("click", () => {
            d.bits = b;
            d.value = maskVal(d.value, d.bits);
            saveState();
            renderTab();
          });
          bitBtns.appendChild(btn);
        });
        bitWidthRow.appendChild(bitBtns);
        const maskVal = (val, bits) => {
          const v = Math.max(0, Math.floor(Number(val) || 0));
          if (bits === 8) return v & 255;
          if (bits === 16) return v & 65535;
          return v >>> 0;
        };
        const swapEndian = (val, bits) => {
          const v = maskVal(val, bits);
          if (bits === 8) return v;
          if (bits === 16) return (v & 255) << 8 | v >> 8 & 255;
          return ((v & 255) << 24 | (v & 65280) << 8 | v >>> 8 & 65280 | v >>> 24 & 255) >>> 0;
        };
        const makeField = (label, prefix) => {
          const row = document.createElement("div");
          row.className = "flex items-center gap-1.5";
          row.innerHTML = `<span class="w-9 text-[11px] font-mono text-white/60 shrink-0">${label}</span>`;
          const inp = document.createElement("input");
          inp.type = "text";
          inp.className = "flex-1 min-w-0 rounded-lg bg-black/25 border border-white/15 px-2 py-1 text-xs font-mono text-white focus:border-accent-400 focus:outline-none select-text";
          const copyBtn = document.createElement("button");
          copyBtn.type = "button";
          copyBtn.className = "px-1.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] text-white/75";
          copyBtn.textContent = "📋";
          copyBtn.title = `Copy ${label}`;
          copyBtn.addEventListener("click", () => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(`${prefix}${inp.value}`);
              showToast(`✓ Copied ${prefix}${inp.value}`);
            }
          });
          row.appendChild(inp);
          row.appendChild(copyBtn);
          return { row, inp };
        };
        const hexF = makeField("HEX", "0x");
        const decF = makeField("DEC", "");
        const binF = makeField("BIN", "0b");
        const endianInfo = document.createElement("div");
        endianInfo.className = "rounded-xl bg-black/20 border border-white/10 px-2.5 py-1.5 flex items-center justify-between text-[11px] font-mono";
        const bitsGrid = document.createElement("div");
        bitsGrid.className = "grid grid-cols-8 gap-1 pt-1";
        const syncFields = (source = null) => {
          const v = maskVal(d.value, d.bits);
          d.value = v;
          const hexPad = d.bits / 4;
          if (source !== "hex") hexF.inp.value = v.toString(16).toUpperCase().padStart(hexPad, "0");
          if (source !== "dec") decF.inp.value = String(v);
          if (source !== "bin") binF.inp.value = v.toString(2).padStart(d.bits, "0");
          const swapped = swapEndian(v, d.bits).toString(16).toUpperCase().padStart(hexPad, "0");
          endianInfo.innerHTML = `<span class="text-white/55">Byte-Swap (Endian):</span><span class="text-accent-300">0x${swapped}</span>`;
          bitsGrid.innerHTML = "";
          const displayBits = Math.min(d.bits, 16);
          for (let bit = displayBits - 1; bit >= 0; bit--) {
            const isOne = (v >>> bit & 1) === 1;
            const bBtn = document.createElement("button");
            bBtn.type = "button";
            bBtn.className = `converter-bit-btn py-0.5 ${isOne ? "is-one" : ""}`;
            bBtn.title = `Toggle bit ${bit} (1 << ${bit} = 0x${(1 << bit).toString(16).toUpperCase()})`;
            bBtn.innerHTML = `<span class="block text-[8px] opacity-55">b${bit}</span><span>${isOne ? "1" : "0"}</span>`;
            bBtn.addEventListener("click", () => {
              d.value = (v ^ 1 << bit) >>> 0;
              saveState();
              syncFields();
            });
            bitsGrid.appendChild(bBtn);
          }
        };
        hexF.inp.addEventListener("input", () => {
          const cleaned = hexF.inp.value.replace(/^0x/i, "").replace(/[^0-9a-f]/gi, "");
          if (cleaned) {
            d.value = maskVal(parseInt(cleaned, 16), d.bits);
            syncFields("hex");
            saveState();
          }
        });
        decF.inp.addEventListener("input", () => {
          const cleaned = decF.inp.value.replace(/[^0-9]/g, "");
          if (cleaned) {
            d.value = maskVal(parseInt(cleaned, 10), d.bits);
            syncFields("dec");
            saveState();
          }
        });
        binF.inp.addEventListener("input", () => {
          const cleaned = binF.inp.value.replace(/^0b/i, "").replace(/[^01]/g, "");
          if (cleaned) {
            d.value = maskVal(parseInt(cleaned, 2), d.bits);
            syncFields("bin");
            saveState();
          }
        });
        contentWrap.appendChild(bitWidthRow);
        contentWrap.appendChild(hexF.row);
        contentWrap.appendChild(decF.row);
        contentWrap.appendChild(binF.row);
        contentWrap.appendChild(endianInfo);
        contentWrap.appendChild(bitsGrid);
        syncFields();
      } else {
        const buildPairCard = (title, unitA, unitB, aToB, bToA, initA) => {
          const box = document.createElement("div");
          box.className = "rounded-xl bg-black/20 border border-white/10 p-2 space-y-1.5";
          box.innerHTML = `<div class="text-[10px] font-semibold uppercase tracking-wider text-white/60">${title}</div>`;
          const row = document.createElement("div");
          row.className = "flex items-center gap-1.5";
          const inpA = document.createElement("input");
          inpA.type = "number";
          inpA.step = "any";
          inpA.value = String(initA);
          inpA.className = "w-full min-w-0 rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs font-mono text-white focus:border-accent-400 focus:outline-none select-text";
          const lblA = document.createElement("span");
          lblA.className = "text-[11px] font-mono text-accent-300 shrink-0";
          lblA.textContent = unitA;
          const eq = document.createElement("span");
          eq.className = "text-white/40 text-xs";
          eq.textContent = "⇄";
          const inpB = document.createElement("input");
          inpB.type = "number";
          inpB.step = "any";
          inpB.value = Number(aToB(initA)).toFixed(4).replace(/\.?0+$/, "");
          inpB.className = "w-full min-w-0 rounded-lg bg-white/10 border border-white/15 px-2 py-1 text-xs font-mono text-white focus:border-accent-400 focus:outline-none select-text";
          const lblB = document.createElement("span");
          lblB.className = "text-[11px] font-mono text-sky-300 shrink-0";
          lblB.textContent = unitB;
          inpA.addEventListener("input", () => {
            const v = parseFloat(inpA.value);
            if (!Number.isNaN(v)) {
              inpB.value = Number(aToB(v)).toFixed(4).replace(/\.?0+$/, "");
            }
          });
          inpB.addEventListener("input", () => {
            const v = parseFloat(inpB.value);
            if (!Number.isNaN(v)) {
              inpA.value = Number(bToA(v)).toFixed(4).replace(/\.?0+$/, "");
            }
          });
          row.appendChild(inpA);
          row.appendChild(lblA);
          row.appendChild(eq);
          row.appendChild(inpB);
          row.appendChild(lblB);
          box.appendChild(row);
          return box;
        };
        contentWrap.appendChild(
          buildPairCard("Speed (Automotive)", "km/h", "m/s", (v) => v / 3.6, (v) => v * 3.6, 100)
        );
        contentWrap.appendChild(
          buildPairCard(
            "RF Power (Radar)",
            "dBm",
            "mW",
            (dbm) => Math.pow(10, dbm / 10),
            (mw) => mw > 0 ? 10 * Math.log10(mw) : 0,
            10
          )
        );
        contentWrap.appendChild(
          buildPairCard(
            "Radar Wavelength (c = 299.79 mm·GHz)",
            "GHz",
            "mm",
            (ghz) => ghz > 0 ? 299.792458 / ghz : 0,
            (mm) => mm > 0 ? 299.792458 / mm : 0,
            77
          )
        );
        contentWrap.appendChild(
          buildPairCard("Temperature", "°C", "°F", (c) => c * 9 / 5 + 32, (f) => (f - 32) * 5 / 9, 25)
        );
      }
    }
    tabRadixBtn.addEventListener("click", () => {
      d.activeTab = "radix";
      saveState();
      renderTab();
    });
    tabUnitsBtn.addEventListener("click", () => {
      d.activeTab = "units";
      saveState();
      renderTab();
    });
    renderTab();
    cardEl.appendChild(header);
    cardEl.appendChild(tabsWrap);
    cardEl.appendChild(contentWrap);
    return header;
  }

  // src/widgets/manager.js
  function getWidgetTypeBadge(type) {
    if (type === "links") return "🔗";
    if (type === "todo") return "✅";
    if (type === "notes") return "📝";
    if (type === "calendar") return "📅";
    if (type === "forecast") return "🌦️";
    if (type === "clocks") return "🌍";
    if (type === "countdown") return "⏳";
    if (type === "snippets") return "⚡";
    if (type === "pomodoro") return "🍅";
    if (type === "converters") return "🧮";
    return "📦";
  }
  function renderAllWidgets() {
    canvasEl.innerHTML = "";
    const activeWs = getActiveWorkspace();
    const layout = computeRenderedLayout(activeWs);
    const visibleWidgets = activeWs.widgets.filter((w) => w.visible);
    widgetsCountBadge.textContent = `${visibleWidgets.length}/${activeWs.widgets.length}`;
    activeWs.widgets.forEach((widget) => {
      if (!widget.visible) return;
      const rect = layout.rects.get(widget.id) || {
        x: widget.position?.x ?? 20,
        y: widget.position?.y ?? 20,
        width: widget.position?.width ?? 390,
        height: widget.position?.height ?? 430
      };
      const cardEl = document.createElement("article");
      cardEl.dataset.widgetId = widget.id;
      cardEl.className = "glass-panel draggable-widget p-3.5 sm:p-4";
      cardEl.style.left = `${rect.x}px`;
      cardEl.style.top = `${rect.y}px`;
      cardEl.style.width = `${rect.width}px`;
      cardEl.style.height = `${rect.height}px`;
      cardEl.style.zIndex = String(widget.position?.zIndex ?? 10);
      cardEl.addEventListener("pointerdown", () => {
        bringToFront(widget, cardEl);
      });
      let handleEl = null;
      if (widget.type === "links") {
        handleEl = buildLinksWidgetContent(widget, cardEl);
      } else if (widget.type === "todo") {
        handleEl = buildTodoWidgetContent(widget, cardEl);
      } else if (widget.type === "notes") {
        handleEl = buildNotesWidgetContent(widget, cardEl);
      } else if (widget.type === "calendar") {
        handleEl = buildCalendarWidgetContent(widget, cardEl);
      } else if (widget.type === "forecast") {
        handleEl = buildForecastWidgetContent(widget, cardEl);
      } else if (widget.type === "clocks") {
        handleEl = buildClocksWidgetContent(widget, cardEl);
      } else if (widget.type === "countdown") {
        handleEl = buildCountdownWidgetContent(widget, cardEl);
      } else if (widget.type === "snippets") {
        handleEl = buildSnippetsWidgetContent(widget, cardEl);
      } else if (widget.type === "pomodoro") {
        handleEl = buildPomodoroWidgetContent(widget, cardEl);
      } else if (widget.type === "converters") {
        handleEl = buildConvertersWidgetContent(widget, cardEl);
      }
      if (handleEl) {
        attachDragBehavior(widget, cardEl, handleEl);
      }
      const resizeEl = document.createElement("div");
      resizeEl.className = "widget-resize-handle";
      resizeEl.title = "Drag to resize the panel";
      resizeEl.innerHTML = `
        <svg class="w-3 h-3 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" d="M20 14L14 20M20 8L8 20" />
        </svg>
      `;
      cardEl.appendChild(resizeEl);
      attachResizeBehavior(widget, cardEl, resizeEl);
      canvasEl.appendChild(cardEl);
    });
    updateCanvasMinHeight(layout);
    renderWidgetsManagerList();
  }
  function renderWidgetsManagerList() {
    widgetsManagerList.innerHTML = "";
    const activeWs = getActiveWorkspace();
    const weatherRow = document.createElement("div");
    weatherRow.className = "flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2.5 py-1.5 text-xs";
    weatherRow.innerHTML = `
      <span class="truncate text-white/85">☀️ Weather Widget (Corner)</span>
    `;
    const weatherToggleBtn = document.createElement("button");
    weatherToggleBtn.type = "button";
    weatherToggleBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium ${state.weatherVisible ? "bg-accent-500/20 text-accent-300" : "bg-white/10 text-white/50"}`;
    weatherToggleBtn.textContent = state.weatherVisible ? "Visible" : "Hidden";
    weatherToggleBtn.addEventListener("click", () => {
      state.weatherVisible = !state.weatherVisible;
      document.getElementById("widget-weather").classList.toggle("hidden", !state.weatherVisible);
      saveState();
      renderWidgetsManagerList();
    });
    weatherRow.appendChild(weatherToggleBtn);
    widgetsManagerList.appendChild(weatherRow);
    activeWs.widgets.forEach((w) => {
      const row = document.createElement("div");
      row.className = "flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2.5 py-1.5 text-xs";
      const badge = getWidgetTypeBadge(w.type);
      const nameSpan = document.createElement("span");
      nameSpan.className = "truncate text-white/85 flex-1";
      nameSpan.textContent = `${badge} ${w.title}`;
      const rightBtns = document.createElement("div");
      rightBtns.className = "flex items-center gap-1 shrink-0";
      const visBtn = document.createElement("button");
      visBtn.type = "button";
      visBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium ${w.visible ? "bg-accent-500/20 text-accent-300" : "bg-white/10 text-white/50"}`;
      visBtn.textContent = w.visible ? "Visible" : "Hidden";
      visBtn.addEventListener("click", () => {
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
    const { canvasWidth, availableHeight } = bakeWorkspaceLayoutToCurrentViewport(activeWs);
    const width = Math.min(390, Math.max(260, canvasWidth - 16));
    const height = Math.min(defaultHeight, Math.max(240, availableHeight - 20));
    const occupied = activeWs.widgets.filter((w) => w.visible && w.position).map((w) => ({
      x: w.position.x ?? 0,
      y: w.position.y ?? 0,
      width: w.position.width ?? 390,
      height: w.position.height ?? 420
    }));
    const { x, y } = findFreeSlot(occupied, width, height, canvasWidth);
    state.maxZIndex = (state.maxZIndex || 25) + 1;
    return {
      x,
      y,
      width,
      height,
      zIndex: state.maxZIndex
    };
  }
  function addNewWidget(type) {
    const activeWs = getActiveWorkspace();
    const countOfType = activeWs.widgets.filter((w) => w.type === type).length + 1;
    let newWidget = null;
    if (type === "links") {
      newWidget = {
        id: `w-links-${Date.now()}`,
        type: "links",
        title: `Quick Links #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(430),
        data: {
          viewMode: "list",
          subgroups: [
            {
              id: `sg-${Date.now()}-1`,
              title: "General",
              collapsed: false,
              items: [
                { id: `lnk-${Date.now()}-1`, title: "Google", url: "https://google.com" },
                { id: `lnk-${Date.now()}-2`, title: "Wikipedia", url: "https://wikipedia.org" }
              ]
            }
          ]
        }
      };
    } else if (type === "todo") {
      newWidget = {
        id: `w-todo-${Date.now()}`,
        type: "todo",
        title: `To-Do List #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(430),
        data: {
          filter: "all",
          items: [
            {
              id: `td-${Date.now()}-1`,
              text: "New task for this group",
              completed: false,
              priority: "normal",
              dueDate: ""
            }
          ]
        }
      };
    } else if (type === "notes") {
      newWidget = {
        id: `w-notes-${Date.now()}`,
        type: "notes",
        title: `Notes #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(420),
        data: {
          content: "",
          lastSaved: "New note"
        }
      };
    } else if (type === "calendar") {
      const now = /* @__PURE__ */ new Date();
      newWidget = {
        id: `w-cal-${Date.now()}`,
        type: "calendar",
        title: "Calendar",
        visible: true,
        position: computeNewWidgetPosition(360),
        data: {
          viewYear: now.getFullYear(),
          viewMonth: now.getMonth()
        }
      };
    } else if (type === "forecast") {
      newWidget = {
        id: `w-forecast-${Date.now()}`,
        type: "forecast",
        title: "5-Day Forecast",
        visible: true,
        position: computeNewWidgetPosition(370),
        data: {}
      };
    } else if (type === "clocks") {
      newWidget = {
        id: `w-clocks-${Date.now()}`,
        type: "clocks",
        title: "World Clocks",
        visible: true,
        position: computeNewWidgetPosition(350),
        data: {
          clocks: [
            { id: `clk-${Date.now()}-1`, city: "Sibiu / Bucharest", tz: "Europe/Bucharest" },
            { id: `clk-${Date.now()}-2`, city: "London", tz: "Europe/London" },
            { id: `clk-${Date.now()}-3`, city: "New York", tz: "America/New_York" }
          ]
        }
      };
    } else if (type === "countdown") {
      const target = /* @__PURE__ */ new Date();
      target.setDate(target.getDate() + 14);
      newWidget = {
        id: `w-cd-${Date.now()}`,
        type: "countdown",
        title: "Countdown",
        visible: true,
        position: computeNewWidgetPosition(340),
        data: {
          items: [
            {
              id: `cd-${Date.now()}-1`,
              title: "Important Event",
              targetDate: target.toISOString().slice(0, 10)
            }
          ]
        }
      };
    } else if (type === "snippets") {
      newWidget = {
        id: `w-snip-${Date.now()}`,
        type: "snippets",
        title: `Snippets #${countOfType}`,
        visible: true,
        position: computeNewWidgetPosition(400),
        data: {
          activeTag: "all",
          items: [
            {
              id: `snip-${Date.now()}-1`,
              title: "Git Status & Recent Log",
              tag: "Git",
              code: "git status && git log -n 5 --oneline"
            },
            {
              id: `snip-${Date.now()}-2`,
              title: "Radar 77GHz Formula",
              tag: "Radar",
              code: "lambda = c / f = 299.792458 / 77 GHz = 3.893 mm"
            }
          ]
        }
      };
    } else if (type === "pomodoro") {
      newWidget = {
        id: `w-pomo-${Date.now()}`,
        type: "pomodoro",
        title: "Pomodoro Timer",
        visible: true,
        position: computeNewWidgetPosition(360),
        data: {
          mode: "focus",
          focusMin: 25,
          shortMin: 5,
          longMin: 15,
          remainingSec: 25 * 60,
          running: false,
          completedSessions: 0,
          linkedTask: ""
        }
      };
    } else if (type === "converters") {
      newWidget = {
        id: `w-conv-${Date.now()}`,
        type: "converters",
        title: "Engineering Converters",
        visible: true,
        position: computeNewWidgetPosition(390),
        data: {
          activeTab: "radix",
          value: 255,
          bits: 16
        }
      };
    }
    if (!newWidget) return;
    showWidgetsIfHidden();
    activeWs.widgets.push(newWidget);
    saveState();
    renderAllWidgets();
    const newCard = canvasEl.querySelector(`[data-widget-id="${newWidget.id}"]`);
    if (newCard) {
      newCard.classList.add("widget-pulse-highlight");
      newCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    showToast(`✓ Panel “${newWidget.title}” added!`);
  }
  function initMultiWidgetControls() {
    const addWidgetBtn = document.getElementById("add-widget-btn");
    const addWidgetPopover = document.getElementById("add-widget-popover");
    if (addWidgetBtn && addWidgetPopover) {
      addWidgetBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        widgetsManagerPopover.classList.add("hidden");
        backupPopover.classList.add("hidden");
        addWidgetPopover.classList.toggle("hidden");
      });
      addWidgetPopover.querySelectorAll("[data-add-type]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const type = btn.getAttribute("data-add-type");
          addWidgetPopover.classList.add("hidden");
          if (type) addNewWidget(type);
        });
      });
      document.addEventListener("click", (e) => {
        if (!addWidgetPopover.contains(e.target) && !addWidgetBtn.contains(e.target)) {
          addWidgetPopover.classList.add("hidden");
        }
      });
    }
    autoArrangeBtn.addEventListener("click", () => {
      autoArrangeWidgets(true);
    });
    const lockLayoutBtn = document.getElementById("lock-layout-btn");
    if (lockLayoutBtn) {
      lockLayoutBtn.addEventListener("click", () => {
        state.layoutLocked = !state.layoutLocked;
        applyLockLayoutState();
        saveState();
        showToast(state.layoutLocked ? "🔒 Layout locked" : "🔓 Layout unlocked");
      });
    }
    applyLockLayoutState();
    widgetsManagerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      backupPopover.classList.add("hidden");
      if (addWidgetPopover) addWidgetPopover.classList.add("hidden");
      widgetsManagerPopover.classList.toggle("hidden");
    });
    showAllWidgetsBtn.addEventListener("click", () => {
      const activeWs2 = getActiveWorkspace();
      state.weatherVisible = true;
      document.getElementById("widget-weather").classList.remove("hidden");
      activeWs2.widgets.forEach((w) => {
        w.visible = true;
      });
      saveState();
      renderAllWidgets();
    });
    document.addEventListener("click", (e) => {
      if (!widgetsManagerPopover.contains(e.target) && !widgetsManagerBtn.contains(e.target)) {
        widgetsManagerPopover.classList.add("hidden");
      }
    });
    document.getElementById("widget-weather").classList.toggle("hidden", !state.weatherVisible);
    const activeWs = getActiveWorkspace();
    if (!activeWs.initializedLayout) {
      activeWs.initializedLayout = true;
      autoArrangeWidgets(true);
    } else {
      renderAllWidgets();
    }
    window.addEventListener("resize", scheduleLayoutSync);
    if (typeof ResizeObserver === "function") {
      const canvasResizeObserver = new ResizeObserver(() => {
        scheduleLayoutSync();
      });
      canvasResizeObserver.observe(canvasEl);
    }
  }

  // src/canvas.js
  var draggedLinkPayload = null;
  var draggedTodoPayload = null;
  var canvasEl = document.getElementById("widgets-canvas");
  var widgetsCountBadge = document.getElementById("widgets-count-badge");
  var widgetsManagerBtn = document.getElementById("widgets-manager-btn");
  var widgetsManagerPopover = document.getElementById("widgets-manager-popover");
  var widgetsManagerList = document.getElementById("widgets-manager-list");
  var showAllWidgetsBtn = document.getElementById("show-all-widgets-btn");
  var autoArrangeBtn = document.getElementById("auto-arrange-btn");
  var NARROW_STACK_BREAKPOINT = 680;
  var layoutSyncRafId = null;
  function getCanvasDimensions() {
    const rect = canvasEl.getBoundingClientRect();
    const width = Math.max(Math.floor(canvasEl.clientWidth || window.innerWidth - 32), 260);
    const footerEl = document.querySelector("footer");
    const footerHeight = footerEl ? footerEl.getBoundingClientRect().height : 48;
    const canvasTop = rect.top + window.scrollY;
    const availableHeight = Math.max(
      260,
      Math.floor(window.innerHeight - canvasTop - footerHeight - 32)
    );
    return { width, availableHeight };
  }
  function getWorkspaceReferenceSize(ws, currentWidth, currentHeight) {
    if (ws.layoutWidth > 0 && ws.layoutHeight > 0) {
      return { refWidth: ws.layoutWidth, refHeight: ws.layoutHeight };
    }
    let maxRight = 0;
    let maxBottom = 0;
    ws.widgets.forEach((w) => {
      if (!w.visible) return;
      const right = (w.position?.x ?? 0) + (w.position?.width ?? 390);
      const bottom = (w.position?.y ?? 0) + (w.position?.height ?? 420);
      if (right > maxRight) maxRight = right;
      if (bottom > maxBottom) maxBottom = bottom;
    });
    return {
      refWidth: maxRight > currentWidth ? maxRight + 16 : currentWidth,
      refHeight: maxBottom > currentHeight ? maxBottom + 16 : currentHeight
    };
  }
  function computeRenderedLayout(ws) {
    const { width: canvasWidth, availableHeight } = getCanvasDimensions();
    const rects = /* @__PURE__ */ new Map();
    const visibleWidgets = ws.widgets.filter((w) => w.visible);
    if (canvasWidth < NARROW_STACK_BREAKPOINT) {
      const gap = 14;
      let cursorY = 6;
      const stackedHeight = Math.max(260, Math.min(400, Math.floor(availableHeight * 0.78)));
      visibleWidgets.forEach((w) => {
        const h = Math.max(220, Math.min(stackedHeight, w.position?.height ?? 380));
        rects.set(w.id, { x: 0, y: cursorY, width: canvasWidth, height: h });
        cursorY += h + gap;
      });
      return { rects, canvasWidth, availableHeight, isStacked: true };
    }
    const { refWidth } = getWorkspaceReferenceSize(ws, canvasWidth, availableHeight);
    const scaleX = refWidth > 0 ? canvasWidth / refWidth : 1;
    const minW = Math.min(280, Math.max(220, canvasWidth - 8));
    const minH = 220;
    visibleWidgets.forEach((w) => {
      const pos = w.position || { x: 20, y: 20, width: 390, height: 420 };
      let width = Math.round((pos.width ?? 390) * scaleX);
      width = Math.max(minW, Math.min(canvasWidth, width));
      let x = Math.round((pos.x ?? 20) * scaleX);
      const maxX = Math.max(0, canvasWidth - width);
      x = Math.max(0, Math.min(maxX, x));
      const height = Math.max(minH, Math.round(pos.height ?? 420));
      let y = Math.round(pos.y ?? 20);
      y = y >= 0 ? y : Math.max(-210, y);
      rects.set(w.id, { x, y, width, height });
    });
    resolveOverlaps(rects);
    return { rects, canvasWidth, availableHeight, isStacked: false };
  }
  var LAYOUT_GAP = 16;
  function rectsOverlap(a, b, gap = 0) {
    return a.x < b.x + b.width + gap && b.x < a.x + a.width + gap && a.y < b.y + b.height + gap && b.y < a.y + a.height + gap;
  }
  function resolveOverlaps(rects) {
    const ordered = [...rects.values()].sort((a, b) => a.y - b.y || a.x - b.x);
    const placed = [];
    ordered.forEach((rect) => {
      let collided = true;
      while (collided) {
        collided = false;
        for (const other of placed) {
          if (rectsOverlap(rect, other)) {
            rect.y = other.y + other.height + LAYOUT_GAP;
            collided = true;
          }
        }
      }
      placed.push(rect);
    });
  }
  function findFreeSlot(occupied, width, height, canvasWidth) {
    const maxX = Math.max(0, canvasWidth - width);
    const xs = /* @__PURE__ */ new Set([0]);
    const ys = /* @__PURE__ */ new Set([6]);
    occupied.forEach((r) => {
      xs.add(r.x);
      xs.add(r.x + r.width + LAYOUT_GAP);
      ys.add(r.y);
      ys.add(r.y + r.height + LAYOUT_GAP);
    });
    const xList = [...xs].filter((x) => x >= 0 && x <= maxX).sort((a, b) => a - b);
    const yList = [...ys].filter((y) => y >= 0).sort((a, b) => a - b);
    for (const y of yList) {
      for (const x of xList) {
        const candidate = { x, y, width, height };
        if (!occupied.some((r) => rectsOverlap(candidate, r, LAYOUT_GAP))) return { x, y };
      }
    }
    const bottom = occupied.reduce((max, r) => Math.max(max, r.y + r.height), 0);
    return { x: 0, y: occupied.length ? bottom + LAYOUT_GAP : 6 };
  }
  function bakeWorkspaceLayoutToCurrentViewport(ws) {
    const { rects, canvasWidth, availableHeight, isStacked } = computeRenderedLayout(ws);
    if (isStacked) return { canvasWidth, availableHeight, isStacked };
    ws.widgets.forEach((w) => {
      const rect = rects.get(w.id);
      if (rect) {
        w.position = {
          ...w.position || {},
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        };
      }
    });
    ws.layoutWidth = canvasWidth;
    ws.layoutHeight = availableHeight;
    return { canvasWidth, availableHeight, isStacked };
  }
  function autoArrangeWidgets(shouldSave = true) {
    const activeWs = getActiveWorkspace();
    const { width: canvasWidth, availableHeight } = getCanvasDimensions();
    const visibleWidgets = activeWs.widgets.filter((w) => w.visible);
    if (visibleWidgets.length === 0) return;
    const gap = canvasWidth < 700 ? 14 : 20;
    const maxCols = canvasWidth >= 2200 ? 5 : canvasWidth >= 1680 ? 4 : canvasWidth >= 1100 ? 3 : canvasWidth >= 700 ? 2 : 1;
    const cols = Math.min(maxCols, visibleWidgets.length);
    const maxColWidth = cols === 1 ? canvasWidth : Math.min(580, Math.floor((canvasWidth - gap * (cols - 1)) / cols));
    const colWidth = Math.max(Math.min(260, canvasWidth), maxColWidth);
    const totalGridWidth = cols * colWidth + (cols - 1) * gap;
    const startX = Math.max(0, Math.floor((canvasWidth - totalGridWidth) / 2));
    const singleRow = visibleWidgets.length <= cols;
    const singleRowHeight = Math.max(260, Math.min(620, availableHeight - 16));
    const colHeights = new Array(cols).fill(6);
    visibleWidgets.forEach((widget) => {
      let shortestCol = 0;
      for (let i = 1; i < cols; i++) {
        if (colHeights[i] < colHeights[shortestCol]) {
          shortestCol = i;
        }
      }
      const x = startX + shortestCol * (colWidth + gap);
      const y = colHeights[shortestCol];
      const height = singleRow ? singleRowHeight : Math.max(280, Math.min(480, widget.position?.height ?? 420));
      widget.position = {
        x,
        y,
        width: colWidth,
        height,
        zIndex: ++state.maxZIndex
      };
      colHeights[shortestCol] += height + gap;
    });
    activeWs.layoutWidth = canvasWidth;
    activeWs.layoutHeight = availableHeight;
    updateCanvasMinHeight();
    if (shouldSave) saveState();
    renderAllWidgets();
  }
  function updateCanvasMinHeight(precomputedLayout = null) {
    const activeWs = getActiveWorkspace();
    const { rects, availableHeight } = precomputedLayout || computeRenderedLayout(activeWs);
    let maxBottom = 0;
    rects.forEach((rect) => {
      const bottom = rect.y + rect.height + 8;
      if (bottom > maxBottom) maxBottom = bottom;
    });
    canvasEl.style.minHeight = maxBottom > availableHeight ? `${maxBottom}px` : "";
  }
  function applyWidgetLayoutToDOM() {
    const activeWs = getActiveWorkspace();
    const layout = computeRenderedLayout(activeWs);
    const cards = canvasEl.querySelectorAll(".draggable-widget[data-widget-id]");
    cards.forEach((cardEl) => {
      const rect = layout.rects.get(cardEl.dataset.widgetId);
      if (!rect) return;
      cardEl.style.left = `${rect.x}px`;
      cardEl.style.top = `${rect.y}px`;
      cardEl.style.width = `${rect.width}px`;
      cardEl.style.height = `${rect.height}px`;
    });
    updateCanvasMinHeight(layout);
  }
  function scheduleLayoutSync() {
    if (layoutSyncRafId !== null) return;
    layoutSyncRafId = window.requestAnimationFrame(() => {
      layoutSyncRafId = null;
      applyWidgetLayoutToDOM();
    });
  }
  function commitLayoutAfterInteraction() {
    bakeWorkspaceLayoutToCurrentViewport(getActiveWorkspace());
    applyWidgetLayoutToDOM();
    saveState();
  }
  function bringToFront(widget, domEl) {
    state.maxZIndex = (state.maxZIndex || 25) + 1;
    widget.position.zIndex = state.maxZIndex;
    if (domEl) {
      domEl.style.zIndex = String(widget.position.zIndex);
    }
  }
  var SNAP_THRESHOLD = 10;
  var SNAP_GAP = 16;
  function clearSnapGuides() {
    canvasEl.querySelectorAll(".snap-guide-line").forEach((el) => el.remove());
  }
  function renderSnapGuides(guideX, guideY) {
    clearSnapGuides();
    if (guideX !== null) {
      const lineV = document.createElement("div");
      lineV.className = "snap-guide-line snap-guide-v";
      lineV.style.left = `${guideX}px`;
      canvasEl.appendChild(lineV);
    }
    if (guideY !== null) {
      const lineH = document.createElement("div");
      lineH.className = "snap-guide-line snap-guide-h";
      lineH.style.top = `${guideY}px`;
      canvasEl.appendChild(lineH);
    }
  }
  function applyLockLayoutState() {
    const locked = Boolean(state.layoutLocked);
    document.body.classList.toggle("layout-locked", locked);
    const btn = document.getElementById("lock-layout-btn");
    const icon = document.getElementById("lock-layout-icon");
    const label = document.getElementById("lock-layout-label");
    if (btn) {
      btn.classList.toggle("is-locked", locked);
      btn.title = locked ? "Layout is locked (click to unlock dragging & resizing)" : "Lock widget positions and sizes";
    }
    if (icon) icon.textContent = locked ? "🔒" : "🔓";
    if (label) label.textContent = locked ? "Locked" : "Lock";
  }
  function attachDragBehavior(widget, cardEl, handleEl) {
    handleEl.addEventListener("pointerdown", (e) => {
      if (state.layoutLocked) return;
      if (e.target.closest("button") || e.target.closest("input") || e.target.closest("select") || e.target.closest('[contenteditable="true"]')) {
        return;
      }
      e.preventDefault();
      bringToFront(widget, cardEl);
      const activeWs = getActiveWorkspace();
      const { canvasWidth, isStacked } = bakeWorkspaceLayoutToCurrentViewport(activeWs);
      if (isStacked) return;
      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startX = widget.position.x || 0;
      const startY = widget.position.y || 0;
      const currentWidth = widget.position.width || 320;
      const currentHeight = widget.position.height || 420;
      const siblings = activeWs.widgets.filter((w) => w.visible && w.id !== widget.id).map((w) => ({
        x: w.position?.x || 0,
        y: w.position?.y || 0,
        w: w.position?.width || 390,
        h: w.position?.height || 420
      }));
      cardEl.classList.add("is-dragging");
      handleEl.setPointerCapture(e.pointerId);
      const onPointerMove = (moveEvent) => {
        const dx = moveEvent.clientX - startMouseX;
        const dy = moveEvent.clientY - startMouseY;
        const maxX = Math.max(0, canvasWidth - currentWidth);
        let nextX = Math.max(0, Math.min(maxX, Math.round(startX + dx)));
        let nextY = Math.max(-210, Math.round(startY + dy));
        let guideX = null;
        let guideY = null;
        const xCandidates = [
          { target: 0, guide: 0 },
          { target: maxX, guide: canvasWidth }
        ];
        const yCandidates = [{ target: 6, guide: 6 }];
        siblings.forEach((s) => {
          xCandidates.push(
            { target: s.x, guide: s.x },
            { target: s.x + s.w - currentWidth, guide: s.x + s.w },
            { target: s.x + s.w + SNAP_GAP, guide: s.x + s.w + SNAP_GAP },
            { target: s.x - currentWidth - SNAP_GAP, guide: s.x - SNAP_GAP }
          );
          yCandidates.push(
            { target: s.y, guide: s.y },
            { target: s.y + s.h - currentHeight, guide: s.y + s.h },
            { target: s.y + s.h + SNAP_GAP, guide: s.y + s.h + SNAP_GAP },
            { target: s.y - currentHeight - SNAP_GAP, guide: s.y - SNAP_GAP }
          );
        });
        let bestDx = SNAP_THRESHOLD + 1;
        for (const c of xCandidates) {
          const dist = Math.abs(nextX - c.target);
          if (dist < bestDx && c.target >= 0 && c.target <= maxX) {
            bestDx = dist;
            nextX = c.target;
            guideX = c.guide;
          }
        }
        let bestDy = SNAP_THRESHOLD + 1;
        for (const c of yCandidates) {
          const dist = Math.abs(nextY - c.target);
          if (dist < bestDy && c.target >= -210) {
            bestDy = dist;
            nextY = c.target;
            guideY = c.guide;
          }
        }
        renderSnapGuides(guideX, guideY);
        widget.position.x = nextX;
        widget.position.y = nextY;
        cardEl.style.left = `${nextX}px`;
        cardEl.style.top = `${nextY}px`;
      };
      const onPointerUp = (upEvent) => {
        cardEl.classList.remove("is-dragging");
        clearSnapGuides();
        if (handleEl.hasPointerCapture(upEvent.pointerId)) {
          handleEl.releasePointerCapture(upEvent.pointerId);
        }
        handleEl.removeEventListener("pointermove", onPointerMove);
        handleEl.removeEventListener("pointerup", onPointerUp);
        handleEl.removeEventListener("pointercancel", onPointerUp);
        commitLayoutAfterInteraction();
      };
      handleEl.addEventListener("pointermove", onPointerMove);
      handleEl.addEventListener("pointerup", onPointerUp);
      handleEl.addEventListener("pointercancel", onPointerUp);
    });
  }
  function attachResizeBehavior(widget, cardEl, resizeEl) {
    resizeEl.addEventListener("pointerdown", (e) => {
      if (state.layoutLocked) return;
      e.preventDefault();
      e.stopPropagation();
      bringToFront(widget, cardEl);
      const activeWs = getActiveWorkspace();
      const { canvasWidth } = bakeWorkspaceLayoutToCurrentViewport(activeWs);
      const startMouseX = e.clientX;
      const startMouseY = e.clientY;
      const startW = widget.position.width || 390;
      const startH = widget.position.height || 430;
      const currentX = widget.position.x || 0;
      const maxAllowedW = Math.max(280, canvasWidth - currentX);
      const maxAllowedH = Math.max(900, Math.floor(window.innerHeight * 0.9));
      cardEl.classList.add("is-dragging");
      resizeEl.setPointerCapture(e.pointerId);
      const onPointerMove = (moveEvent) => {
        const dw = moveEvent.clientX - startMouseX;
        const dh = moveEvent.clientY - startMouseY;
        const nextW = Math.max(260, Math.min(maxAllowedW, Math.round(startW + dw)));
        const nextH = Math.max(220, Math.min(maxAllowedH, Math.round(startH + dh)));
        widget.position.width = nextW;
        widget.position.height = nextH;
        cardEl.style.width = `${nextW}px`;
        cardEl.style.height = `${nextH}px`;
      };
      const onPointerUp = (upEvent) => {
        cardEl.classList.remove("is-dragging");
        if (resizeEl.hasPointerCapture(upEvent.pointerId)) {
          resizeEl.releasePointerCapture(upEvent.pointerId);
        }
        resizeEl.removeEventListener("pointermove", onPointerMove);
        resizeEl.removeEventListener("pointerup", onPointerUp);
        resizeEl.removeEventListener("pointercancel", onPointerUp);
        commitLayoutAfterInteraction();
      };
      resizeEl.addEventListener("pointermove", onPointerMove);
      resizeEl.addEventListener("pointerup", onPointerUp);
      resizeEl.addEventListener("pointercancel", onPointerUp);
    });
  }
  function moveLinkViaDragDrop(targetWidgetId, targetSubgroupId, targetLinkId = null) {
    if (!draggedLinkPayload) return;
    const { sourceWidgetId, sourceSubgroupId, linkId } = draggedLinkPayload;
    if (sourceWidgetId === targetWidgetId && sourceSubgroupId === targetSubgroupId && linkId === targetLinkId) {
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
  function moveTodoViaDragDrop(targetWidgetId, targetTodoId = null) {
    if (!draggedTodoPayload) return;
    const { sourceWidgetId, todoId } = draggedTodoPayload;
    if (sourceWidgetId === targetWidgetId && todoId === targetTodoId) return;
    const activeWs = getActiveWorkspace();
    const srcWidget = activeWs.widgets.find((w) => w.id === sourceWidgetId);
    const dstWidget = activeWs.widgets.find((w) => w.id === targetWidgetId);
    if (!srcWidget || !dstWidget || srcWidget.type !== "todo" || dstWidget.type !== "todo") return;
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
  function setDraggedLinkPayload(payload) {
    draggedLinkPayload = payload;
  }
  function setDraggedTodoPayload(payload) {
    draggedTodoPayload = payload;
  }

  // src/workspaces.js
  var workspacesBarEl = document.getElementById("workspaces-bar");
  function renderWorkspacesBar() {
    workspacesBarEl.innerHTML = "";
    state.workspaces.forEach((ws) => {
      const isActive = ws.id === state.activeWorkspaceId;
      const tabWrap = document.createElement("div");
      tabWrap.className = `workspace-tab flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium cursor-pointer select-none ${isActive ? "active" : ""}`;
      const nameSpan = document.createElement("span");
      nameSpan.textContent = ws.name;
      nameSpan.className = "truncate max-w-[130px] rounded px-0.5 focus:outline-none";
      nameSpan.title = isActive ? "Double-click to rename this workspace" : `Switch to workspace “${ws.name}”`;
      tabWrap.addEventListener("click", (e) => {
        if (e.target.closest("button") || nameSpan.isContentEditable) return;
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
      nameSpan.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        nameSpan.contentEditable = "true";
        nameSpan.spellcheck = false;
        nameSpan.classList.add("bg-black/40", "ring-1", "ring-accent-400/60", "px-1");
        nameSpan.focus();
      });
      nameSpan.addEventListener("blur", () => {
        if (!nameSpan.isContentEditable) return;
        nameSpan.contentEditable = "false";
        nameSpan.classList.remove("bg-black/40", "ring-1", "ring-accent-400/60", "px-1");
        const cleaned = nameSpan.textContent.trim() || "Workspace";
        ws.name = cleaned;
        nameSpan.textContent = cleaned;
        saveState();
      });
      nameSpan.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          nameSpan.blur();
        }
      });
      tabWrap.appendChild(nameSpan);
      if (isActive && state.workspaces.length > 1) {
        const delWsBtn = document.createElement("button");
        delWsBtn.type = "button";
        delWsBtn.className = "ml-0.5 p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10 transition-colors";
        delWsBtn.title = "Delete this workspace";
        delWsBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
        delWsBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          pushUndoState(`Workspace “${ws.name}”`);
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
    const addWsBtn = document.createElement("button");
    addWsBtn.type = "button";
    addWsBtn.className = "flex items-center justify-center h-7 w-7 rounded-xl text-white/65 hover:text-white hover:bg-white/15 transition-colors";
    addWsBtn.title = "Add a new workspace (new tab)";
    addWsBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    `;
    addWsBtn.addEventListener("click", () => {
      const idx = state.workspaces.length + 1;
      const newWs = {
        id: `ws-${Date.now()}`,
        name: `✨ Workspace #${idx}`,
        initializedLayout: false,
        widgets: [
          {
            id: `w-links-${Date.now()}`,
            type: "links",
            title: "Quick Links",
            visible: true,
            position: { x: 40, y: 16, width: 400, height: 420, zIndex: ++state.maxZIndex },
            data: {
              viewMode: "list",
              subgroups: [
                {
                  id: `sg-${Date.now()}`,
                  title: "General",
                  collapsed: false,
                  items: [
                    { id: `lnk-${Date.now()}`, title: "Google", url: "https://google.com" }
                  ]
                }
              ]
            }
          },
          {
            id: `w-notes-${Date.now() + 1}`,
            type: "notes",
            title: "Notes",
            visible: true,
            position: { x: 465, y: 16, width: 400, height: 420, zIndex: ++state.maxZIndex },
            data: {
              content: "",
              lastSaved: "New note"
            }
          }
        ]
      };
      state.workspaces.push(newWs);
      state.activeWorkspaceId = newWs.id;
      newWs.initializedLayout = true;
      saveState();
      renderWorkspacesBar();
      autoArrangeWidgets(true);
      showToast(`Workspace “${newWs.name}” created!`);
    });
    workspacesBarEl.appendChild(addWsBtn);
  }

  // src/state.js
  var undoStack = [];
  var undoToastTimer = null;
  var shouldSaveMigratedState = false;
  var lastRemovedUnsafeLinksCount = 0;
  var state = loadState();
  function normalizeLoadedState(parsed) {
    lastRemovedUnsafeLinksCount = 0;
    const def = createDefaultState();
    const normalized = {
      ...def,
      ...parsed,
      dailyFocus: { ...def.dailyFocus, ...parsed.dailyFocus || {} },
      background: { ...def.background, ...parsed.background || {} },
      visual: { ...def.visual, ...parsed.visual || {} }
    };
    if (!parsed.visual?.sharpBgMigrated) {
      normalized.visual.overlayDim = 22;
      normalized.visual.sharpBgMigrated = true;
    }
    if (!normalized.visual.theme) normalized.visual.theme = "dark";
    if (!normalized.visual.accentColor || !ACCENT_PALETTES[normalized.visual.accentColor]) {
      normalized.visual.accentColor = "emerald";
    }
    if (!Array.isArray(normalized.workspaces) || normalized.workspaces.length === 0) {
      const existingWidgets = Array.isArray(parsed.widgets) && parsed.widgets.length > 0 ? parsed.widgets : createInitialWidgetsForMain();
      normalized.workspaces = [
        {
          id: "ws-main",
          name: "🏠 Main",
          initializedLayout: Boolean(parsed.widgetsInitializedLayout),
          widgets: existingWidgets
        },
        createInitialWorkspaces()[1]
      ];
      normalized.activeWorkspaceId = "ws-main";
    }
    const legacyDefaults = {
      "🏠 Principal": "🏠 Main",
      "💼 Muncă & Dev": "💼 Work & Dev",
      "Explorator": "Explorer",
      "Scurtături Rapide": "Quick Links",
      "Lista de Sarcini": "To-Do List",
      "Notițe Rapide": "Quick Notes",
      "Dezvoltare & AI": "Development & AI",
      "Zilnice & Organizare": "Daily & Organization",
      "Marcaje Browser": "Browser Bookmarks",
      "Marcaje Importate": "Imported Bookmarks",
      "Documentație": "Documentation",
      "Planifică prioritățile principale ale zilei": "Plan today's top priorities",
      "Trage link-urile sau sarcinile cu mouse-ul între liste": "Drag links or tasks between lists",
      "Folosește Ctrl+K pentru căutare instantanee": "Use Ctrl+K for instant search",
      "Verifică pull request-urile deschise": "Review open pull requests",
      "Actualizează documentația tehnică": "Update technical documentation",
      "Notițe pentru proiectele de la muncă...": "Notes for work projects...",
      "Sincronizat local": "Synced locally",
      "Nou creat": "New note",
      "Calendar Lunar": "Calendar",
      "Eveniment Important": "Important Event",
      "Evenimentul Important": "Important Event",
      "Londra": "London",
      "București": "Bucharest",
      "Timișoara": "Timisoara",
      "Iași": "Iasi",
      "Brașov": "Brasov",
      "Constanța": "Constanta",
      "Toate": "All",
      "Gata": "Completed",
      "Azi": "Today",
      "Mâine": "Tomorrow",
      "Depășit": "Overdue",
      "Senin": "Clear",
      "Parțial noros": "Partly cloudy",
      "Cer variabil": "Partly cloudy",
      "Răcoros": "Cool",
      "Briză ușoară": "Light breeze",
      "Lansare proiect / Concediu": "Project launch / Vacation",
      "# Idei rapide & notițe\n- [x] Comută între **Spații de Lucru** din stânga-sus\n- [ ] Adaugă panouri noi din meniul **+ Adaugă panou** (Calendar, Prognoză 5 zile, Ceasuri, Countdown)\n- [ ] Apasă pe butonul **Markdown** din acest panou pentru previzualizare interactivă!": "# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click this note to edit it, then click outside to see the formatted preview!",
      // Previous English default note (the "Markdown" toggle button no longer exists).
      "# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click the **Markdown** button on this panel for an interactive preview!": "# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click this note to edit it, then click outside to see the formatted preview!"
    };
    const translateLegacyDefault = (value) => {
      if (Object.prototype.hasOwnProperty.call(legacyDefaults, value)) {
        shouldSaveMigratedState = true;
        return legacyDefaults[value];
      }
      return value;
    };
    normalized.userName = translateLegacyDefault(normalized.userName);
    normalized.weatherCity = translateLegacyDefault(normalized.weatherCity);
    normalized.workspaces.forEach((ws) => {
      ws.name = translateLegacyDefault(ws.name);
      if (!Array.isArray(ws.widgets)) ws.widgets = [];
      ws.widgets.forEach((w) => {
        w.title = translateLegacyDefault(w.title);
        ensureLinksSubgroups(w);
        if (w.type === "links") {
          w.data.subgroups.forEach((subgroup) => {
            if (subgroup.title === "Principal") {
              subgroup.title = "General";
              shouldSaveMigratedState = true;
            } else {
              subgroup.title = translateLegacyDefault(subgroup.title);
            }
            const items = Array.isArray(subgroup.items) ? subgroup.items : [];
            subgroup.items = items.filter((item) => item && isSafeLinkUrl(item.url));
            if (subgroup.items.length !== items.length) {
              lastRemovedUnsafeLinksCount += items.length - subgroup.items.length;
              shouldSaveMigratedState = true;
            }
          });
        }
        if (w.type === "todo" && Array.isArray(w.data?.items)) {
          w.data.items.forEach((t) => {
            t.text = translateLegacyDefault(t.text);
            if (!t.priority) t.priority = "normal";
            if (typeof t.dueDate !== "string") t.dueDate = "";
          });
        }
        if (w.type === "notes" && w.data) {
          w.data.content = translateLegacyDefault(w.data.content);
          w.data.lastSaved = translateLegacyDefault(w.data.lastSaved);
        }
        if (w.type === "clocks" && Array.isArray(w.data?.clocks)) {
          w.data.clocks.forEach((clock) => {
            clock.city = translateLegacyDefault(clock.city);
          });
        }
        if (w.type === "countdown" && Array.isArray(w.data?.items)) {
          w.data.items.forEach((item) => {
            item.title = translateLegacyDefault(item.title);
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
        parsedV2.weatherCity = "Sibiu";
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
      console.warn("Error reading localStorage; using default state:", err);
      return createDefaultState();
    }
  }
  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state));
      scheduleAutoSyncWrite();
    } catch (err) {
      console.error("Error saving to localStorage:", err);
      showToast("⚠️ localStorage is full! Use images from your computer or download a JSON backup.");
    }
  }
  function pushUndoState(label) {
    try {
      undoStack.push({
        label,
        snapshot: JSON.stringify(state)
      });
      if (undoStack.length > 15) {
        undoStack.shift();
      }
      showUndoToast(label);
    } catch (err) {
      console.warn("Could not save state for undo:", err);
    }
  }
  function showUndoToast(label) {
    const undoToast = document.getElementById("undo-toast");
    const undoMsg = document.getElementById("undo-toast-msg");
    if (!undoToast || !undoMsg) return;
    undoMsg.textContent = `“${label}” was deleted`;
    undoToast.classList.remove("hidden");
    undoToast.classList.add("flex");
    clearTimeout(undoToastTimer);
    undoToastTimer = setTimeout(() => {
      hideUndoToast();
    }, 7e3);
  }
  function hideUndoToast() {
    const undoToast = document.getElementById("undo-toast");
    if (!undoToast) return;
    undoToast.classList.add("hidden");
    undoToast.classList.remove("flex");
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
      showToast(`↩ Restored: ${last.label}`);
    } catch (err) {
      console.error("Error restoring undo state:", err);
    }
  }
  function getActiveWorkspace() {
    return state.workspaces.find((ws) => ws.id === state.activeWorkspaceId) || state.workspaces[0];
  }
  function setState(nextState) {
    state = nextState;
  }
  function saveMigratedStateIfNeeded() {
    if (!shouldSaveMigratedState) return;
    saveState();
    shouldSaveMigratedState = false;
  }

  // src/search.js
  var searchEngineBtn = document.getElementById("search-engine-btn");
  var globalSearchInput = document.getElementById("global-search-input");
  var globalSearchResults = document.getElementById("global-search-results");
  function getActiveSearchEngine() {
    return SEARCH_ENGINES[(state.searchEngineIndex || 0) % SEARCH_ENGINES.length];
  }
  function collectSearchMatches(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    const results = [];
    state.workspaces.forEach((ws) => {
      ws.widgets.forEach((w) => {
        if (w.type === "links" && Array.isArray(w.data?.subgroups)) {
          w.data.subgroups.forEach((sg) => {
            (sg.items || []).forEach((lnk) => {
              if (lnk.title.toLowerCase().includes(q) || lnk.url.toLowerCase().includes(q) || sg.title.toLowerCase().includes(q)) {
                results.push({
                  kind: "link",
                  title: lnk.title,
                  subtitle: `${ws.name} › ${w.title} › ${sg.title}`,
                  url: lnk.url,
                  workspaceId: ws.id,
                  widgetId: w.id
                });
              }
            });
          });
        } else if (w.type === "todo" && Array.isArray(w.data?.items)) {
          w.data.items.forEach((td) => {
            if (td.text.toLowerCase().includes(q)) {
              results.push({
                kind: "todo",
                title: td.text,
                subtitle: `${ws.name} › ${w.title} (${td.completed ? "Completed" : "Active"})`,
                workspaceId: ws.id,
                widgetId: w.id
              });
            }
          });
        } else if (w.type === "notes" && typeof w.data?.content === "string") {
          if (w.data.content.toLowerCase().includes(q) || w.title.toLowerCase().includes(q)) {
            const snippet = w.data.content.replace(/[#*`>-]/g, "").trim().slice(0, 70) || "Note";
            results.push({
              kind: "notes",
              title: `${w.title}: ${snippet}`,
              subtitle: `${ws.name} › Note`,
              workspaceId: ws.id,
              widgetId: w.id
            });
          }
        } else if (w.type === "countdown" && Array.isArray(w.data?.items)) {
          w.data.items.forEach((ev) => {
            if (ev.title.toLowerCase().includes(q)) {
              results.push({
                kind: "countdown",
                title: `${ev.title} (${ev.targetDate})`,
                subtitle: `${ws.name} › ${w.title}`,
                workspaceId: ws.id,
                widgetId: w.id
              });
            }
          });
        } else if (w.type === "snippets" && Array.isArray(w.data?.items)) {
          w.data.items.forEach((sn) => {
            if (sn.title.toLowerCase().includes(q) || sn.code.toLowerCase().includes(q) || (sn.tag || "").toLowerCase().includes(q)) {
              results.push({
                kind: "snippet",
                title: sn.title,
                subtitle: `${ws.name} › ${w.title} › #${sn.tag || "General"} — ${sn.code.slice(0, 50)}`,
                code: sn.code,
                workspaceId: ws.id,
                widgetId: w.id
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
      globalSearchResults.classList.add("hidden");
      globalSearchResults.innerHTML = "";
      return;
    }
    const matches = collectSearchMatches(query);
    const engine = getActiveSearchEngine();
    globalSearchResults.innerHTML = "";
    globalSearchResults.classList.remove("hidden");
    if (matches.length > 0) {
      const sectionLabel = document.createElement("div");
      sectionLabel.className = "px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/45";
      sectionLabel.textContent = "Found in Dashboard";
      globalSearchResults.appendChild(sectionLabel);
      matches.forEach((m) => {
        const itemBtn = document.createElement("button");
        itemBtn.type = "button";
        itemBtn.className = "w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-left transition-colors";
        const badge = m.kind === "link" ? "🔗" : m.kind === "todo" ? "✅" : m.kind === "countdown" ? "⏳" : m.kind === "snippet" ? "⚡" : "📝";
        itemBtn.innerHTML = `
          <div class="min-w-0 flex-1">
            <div class="text-xs font-medium text-white truncate">${badge} ${escapeHtml(m.title)}</div>
            <div class="text-[10px] text-white/45 truncate">${escapeHtml(m.subtitle)}</div>
          </div>
          <span class="text-[10px] text-sky-300 shrink-0">${m.kind === "link" ? "Open ↗" : m.kind === "snippet" ? "Copy 📋" : "Go to panel →"}</span>
        `;
        itemBtn.addEventListener("click", () => {
          globalSearchResults.classList.add("hidden");
          globalSearchInput.value = "";
          if (m.kind === "link") {
            if (isSafeLinkUrl(m.url)) window.open(m.url, "_blank", "noopener,noreferrer");
          } else if (m.kind === "snippet" && navigator.clipboard) {
            navigator.clipboard.writeText(m.code).then(() => {
              showToast(`✓ Copied snippet “${m.title}”!`);
            });
          } else {
            focusWidgetById(m.workspaceId, m.widgetId);
          }
        });
        globalSearchResults.appendChild(itemBtn);
      });
    }
    const webBtn = document.createElement("button");
    webBtn.type = "button";
    webBtn.className = "w-full mt-1 flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/25 text-left transition-colors";
    webBtn.innerHTML = `
      <span class="text-xs text-sky-200 truncate">🌐 Search <strong>“${escapeHtml(query)}”</strong> on ${escapeHtml(engine.name)}</span>
      <span class="text-[10px] font-mono text-sky-300 shrink-0">Enter ↵</span>
    `;
    webBtn.addEventListener("click", () => {
      window.open(`${engine.url}${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
      globalSearchResults.classList.add("hidden");
      globalSearchInput.value = "";
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
    showWidgetsIfHidden();
    saveState();
    renderAllWidgets();
    const domCard = document.querySelector(`[data-widget-id="${widgetId}"]`);
    if (domCard) {
      domCard.classList.add("widget-pulse-highlight");
      domCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
  function initGlobalSearchAndShortcuts() {
    searchEngineBtn.textContent = getActiveSearchEngine().name;
    const narrowScreen = window.matchMedia("(max-width: 639px)");
    const applySearchPlaceholder = () => {
      globalSearchInput.placeholder = narrowScreen.matches ? "Search links, notes, web…" : "Search links, notes, or the web... (Ctrl+K)";
    };
    applySearchPlaceholder();
    narrowScreen.addEventListener("change", applySearchPlaceholder);
    searchEngineBtn.addEventListener("click", () => {
      state.searchEngineIndex = ((state.searchEngineIndex || 0) + 1) % SEARCH_ENGINES.length;
      searchEngineBtn.textContent = getActiveSearchEngine().name;
      saveState();
      if (globalSearchInput.value.trim()) {
        renderGlobalSearchResults();
      }
    });
    globalSearchInput.addEventListener("input", renderGlobalSearchResults);
    globalSearchInput.addEventListener("focus", () => {
      if (globalSearchInput.value.trim()) renderGlobalSearchResults();
    });
    globalSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        globalSearchResults.classList.add("hidden");
        globalSearchInput.blur();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const query = globalSearchInput.value.trim();
        if (!query) return;
        const matches = collectSearchMatches(query);
        const firstLink = matches.find((m) => m.kind === "link");
        if (firstLink) {
          if (isSafeLinkUrl(firstLink.url)) {
            window.open(firstLink.url, "_blank", "noopener,noreferrer");
          }
        } else {
          const engine = getActiveSearchEngine();
          window.open(`${engine.url}${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
        }
        globalSearchResults.classList.add("hidden");
        globalSearchInput.value = "";
      }
    });
    const undoBtn = document.getElementById("undo-toast-btn");
    if (undoBtn) {
      undoBtn.addEventListener("click", performUndo);
    }
    document.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        globalSearchInput.focus();
        globalSearchInput.select();
        return;
      }
      const tag = (e.target.tagName || "").toLowerCase();
      const isTyping = tag === "input" || tag === "textarea" || tag === "select" || e.target.isContentEditable;
      if (!isTyping && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        if (undoStack.length > 0) {
          e.preventDefault();
          performUndo();
          return;
        }
      }
      if (!isTyping && e.key === "/") {
        e.preventDefault();
        globalSearchInput.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!globalSearchResults.contains(e.target) && e.target !== globalSearchInput && e.target !== searchEngineBtn) {
        globalSearchResults.classList.add("hidden");
      }
    });
  }

  // src/main.js
  function init() {
    updateClock();
    setInterval(updateClock, 1e3);
    renderWorkspacesBar();
    initGreetingAndFocus();
    initGlobalSearchAndShortcuts();
    initBackupControls();
    initBackgroundAndVisualSettings();
    initWeatherWidget();
    initMultiWidgetControls();
    initQuotes();
    saveMigratedStateIfNeeded();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
