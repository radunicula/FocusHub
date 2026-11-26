import { ACCENT_PALETTES, STORAGE_KEY_V1, STORAGE_KEY_V2, STORAGE_KEY_V3 } from './constants.js';
import {
  createDefaultState,
  createInitialWidgetsForMain,
  createInitialWorkspaces,
  ensureLinksSubgroups,
} from './defaults.js';
import { scheduleAutoSyncWrite } from './storage/autosync.js';
import { isSafeLinkUrl, showToast } from './utils.js';
import { renderWorkspacesBar } from './workspaces.js';
import { renderAllWidgets } from './widgets/manager.js';

// Undo stack
export const undoStack = [];
let undoToastTimer = null;

let shouldSaveMigratedState = false;
export let lastRemovedUnsafeLinksCount = 0;
export let state = loadState();

// ==========================================================================
// 1. LOCALSTORAGE PERSISTENCE, MIGRATION & UNDO (CTRL+Z)
// ==========================================================================

export function normalizeLoadedState(parsed) {
  lastRemovedUnsafeLinksCount = 0;
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
        name: '🏠 Main',
        initializedLayout: Boolean(parsed.widgetsInitializedLayout),
        widgets: existingWidgets,
      },
      createInitialWorkspaces()[1],
    ];
    normalized.activeWorkspaceId = 'ws-main';
  }

  const legacyDefaults = {
    '🏠 Principal': '🏠 Main',
    '💼 Muncă & Dev': '💼 Work & Dev',
    'Explorator': 'Explorer',
    'Scurtături Rapide': 'Quick Links',
    'Lista de Sarcini': 'To-Do List',
    'Notițe Rapide': 'Quick Notes',
    'Dezvoltare & AI': 'Development & AI',
    'Zilnice & Organizare': 'Daily & Organization',
    'Marcaje Browser': 'Browser Bookmarks',
    'Marcaje Importate': 'Imported Bookmarks',
    'Documentație': 'Documentation',
    'Planifică prioritățile principale ale zilei': "Plan today's top priorities",
    'Trage link-urile sau sarcinile cu mouse-ul între liste': 'Drag links or tasks between lists',
    'Folosește Ctrl+K pentru căutare instantanee': 'Use Ctrl+K for instant search',
    'Verifică pull request-urile deschise': 'Review open pull requests',
    'Actualizează documentația tehnică': 'Update technical documentation',
    'Notițe pentru proiectele de la muncă...': 'Notes for work projects...',
    'Sincronizat local': 'Synced locally',
    'Nou creat': 'New note',
    'Calendar Lunar': 'Calendar',
    'Eveniment Important': 'Important Event',
    'Evenimentul Important': 'Important Event',
    'Londra': 'London',
    'București': 'Bucharest',
    'Timișoara': 'Timisoara',
    'Iași': 'Iasi',
    'Brașov': 'Brasov',
    'Constanța': 'Constanta',
    'Toate': 'All',
    'Gata': 'Completed',
    'Azi': 'Today',
    'Mâine': 'Tomorrow',
    'Depășit': 'Overdue',
    'Senin': 'Clear',
    'Parțial noros': 'Partly cloudy',
    'Cer variabil': 'Partly cloudy',
    'Răcoros': 'Cool',
    'Briză ușoară': 'Light breeze',
    'Lansare proiect / Concediu': 'Project launch / Vacation',
    '# Idei rapide & notițe\n- [x] Comută între **Spații de Lucru** din stânga-sus\n- [ ] Adaugă panouri noi din meniul **+ Adaugă panou** (Calendar, Prognoză 5 zile, Ceasuri, Countdown)\n- [ ] Apasă pe butonul **Markdown** din acest panou pentru previzualizare interactivă!':
      '# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click this note to edit it, then click outside to see the formatted preview!',
    // Previous English default note (the "Markdown" toggle button no longer exists).
    '# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click the **Markdown** button on this panel for an interactive preview!':
      '# Quick Ideas & Notes\n- [x] Switch between **Workspaces** in the top-left\n- [ ] Add widgets from the **+ Add Widget** menu (Calendar, 5-Day Forecast, Clocks, Countdown)\n- [ ] Click this note to edit it, then click outside to see the formatted preview!',
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
      if (w.type === 'links') {
        w.data.subgroups.forEach((subgroup) => {
          if (subgroup.title === 'Principal') {
            subgroup.title = 'General';
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
      if (w.type === 'todo' && Array.isArray(w.data?.items)) {
        w.data.items.forEach((t) => {
          t.text = translateLegacyDefault(t.text);
          if (!t.priority) t.priority = 'normal';
          if (typeof t.dueDate !== 'string') t.dueDate = '';
        });
      }
      if (w.type === 'notes' && w.data) {
        w.data.content = translateLegacyDefault(w.data.content);
        w.data.lastSaved = translateLegacyDefault(w.data.lastSaved);
      }
      if (w.type === 'clocks' && Array.isArray(w.data?.clocks)) {
        w.data.clocks.forEach((clock) => {
          clock.city = translateLegacyDefault(clock.city);
        });
      }
      if (w.type === 'countdown' && Array.isArray(w.data?.items)) {
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
    console.warn('Error reading localStorage; using default state:', err);
    return createDefaultState();
  }
}

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY_V3, JSON.stringify(state));
    scheduleAutoSyncWrite();
  } catch (err) {
    console.error('Error saving to localStorage:', err);
    showToast('⚠️ localStorage is full! Use images from your computer or download a JSON backup.');
  }
}

export function pushUndoState(label) {
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
    console.warn('Could not save state for undo:', err);
  }
}

function showUndoToast(label) {
  const undoToast = document.getElementById('undo-toast');
  const undoMsg = document.getElementById('undo-toast-msg');
  if (!undoToast || !undoMsg) return;

  undoMsg.textContent = `“${label}” was deleted`;
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

export function performUndo() {
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
    console.error('Error restoring undo state:', err);
  }
}

export function getActiveWorkspace() {
  return (
    state.workspaces.find((ws) => ws.id === state.activeWorkspaceId) ||
    state.workspaces[0]
  );
}

export function setState(nextState) {
  state = nextState;
}

export function saveMigratedStateIfNeeded() {
  if (!shouldSaveMigratedState) return;
  saveState();
  shouldSaveMigratedState = false;
}
