import {
  ACCENT_PALETTES,
  DEFAULT_VISUAL_SETTINGS,
  IDB_MARKER,
  LIGHT_MINIMAL_GRADIENTS,
  MINIMAL_GRADIENTS,
  UNSPLASH_BACKGROUNDS,
} from './constants.js';
import {
  cachedIdbBgDataUrl,
  clearCustomBgFromIDB,
  loadCustomBgFromIDB,
  saveCustomBgToIDB,
} from './storage/idb.js';
import { saveState, state } from './state.js';
import { showToast } from './utils.js';

// ==========================================================================
// 8. BACKGROUND, THEME (DARK/LIGHT), ACCENT COLOR & GLASS EFFECT
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

const toggleWidgetsBtn = document.getElementById('toggle-widgets-btn');
const toggleWidgetsLabel = document.getElementById('toggle-widgets-label');

// "Hide widgets" leaves only the clock and search over the background (persisted, like a clean start page).
function applyWidgetsHidden() {
  const hidden = Boolean(state.widgetsHidden);
  document.body.classList.toggle('widgets-hidden', hidden);
  toggleWidgetsBtn.setAttribute('aria-pressed', String(hidden));
  toggleWidgetsLabel.textContent = hidden ? 'Show widgets' : 'Hide widgets';
}

export function showWidgetsIfHidden() {
  if (!state.widgetsHidden) return;
  state.widgetsHidden = false;
  applyWidgetsHidden();
}

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

function getEffectiveTheme() {
  const setting = state.visual?.theme || 'dark';
  if (setting === 'auto') {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
  return setting === 'light' ? 'light' : 'dark';
}

function getFilteredUnsplashBackgrounds() {
  const cat = state.background?.category || 'all';
  if (cat === 'all') return UNSPLASH_BACKGROUNDS;
  const filtered = UNSPLASH_BACKGROUNDS.filter((item) => item.category === cat);
  return filtered.length > 0 ? filtered : UNSPLASH_BACKGROUNDS;
}

export function applyVisualSettings() {
  const v = state.visual || DEFAULT_VISUAL_SETTINGS;
  const opacityVal = (v.glassOpacity ?? 56) / 100;
  document.documentElement.style.setProperty('--overlay-dim', String((v.overlayDim ?? 22) / 100));
  document.documentElement.style.setProperty('--glass-opacity', String(opacityVal));
  document.documentElement.style.setProperty('--glass-light-opacity', String(Math.max(0.72, opacityVal)));
  document.documentElement.style.setProperty('--glass-blur', `${v.glassBlur ?? 22}px`);
  // The saturation boost fades out with the glass opacity: at 0% the panels must be truly
  // see-through, otherwise saturate() tints them noticeably over smooth gradient backgrounds.
  const saturateFactor = Math.min(1, opacityVal / 0.56);
  document.documentElement.style.setProperty('--glass-saturate', `${Math.round(100 + 65 * saturateFactor)}%`);
  document.documentElement.style.setProperty('--glass-saturate-pill', `${Math.round(100 + 50 * saturateFactor)}%`);

  // Apply accent palette
  const palKey = v.accentColor && ACCENT_PALETTES[v.accentColor] ? v.accentColor : 'emerald';
  const shades = ACCENT_PALETTES[palKey].shades;
  Object.entries(shades).forEach(([shade, rgb]) => {
    document.documentElement.style.setProperty(`--accent-${shade}`, rgb);
  });

  // Apply panel theme (dark / light / auto)
  const themeSetting = ['dark', 'light', 'auto'].includes(v.theme) ? v.theme : 'dark';
  const effectiveTheme = getEffectiveTheme();
  document.body.classList.toggle('theme-light', effectiveTheme === 'light');
  document.querySelectorAll('[data-theme-option]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-theme-option') === themeSetting);
  });

  // Update background category & daily auto-rotate controls
  const activeCat = state.background?.category || 'all';
  document.querySelectorAll('[data-bg-category]').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-bg-category') === activeCat);
  });
  const dailyToggle = document.getElementById('bg-daily-auto-toggle');
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

  customBgUrlInput.value =
    state.background.customUrl &&
    !state.background.customUrl.startsWith('data:') &&
    state.background.customUrl !== IDB_MARKER
      ? state.background.customUrl
      : '';
}

export function applyBackground() {
  const { mode, index, customUrl } = state.background;
  const gradients =
    getEffectiveTheme() === 'light' ? LIGHT_MINIMAL_GRADIENTS : MINIMAL_GRADIENTS;

  if (mode === 'custom' && customUrl) {
    const effectiveUrl = customUrl === IDB_MARKER ? cachedIdbBgDataUrl : customUrl;
    if (effectiveUrl) {
      bgModeLabel.textContent = 'Custom Image';
      bgLocationLabel.textContent = '🖼️ Custom image';
      bgLayer.style.backgroundImage = `url('${effectiveUrl}')`;
      return;
    }
  }

  if (mode === 'gradient') {
    const grad = gradients[index % gradients.length];
    bgLayer.style.backgroundImage = grad.css;
    bgModeLabel.textContent = 'Gradient';
    bgLocationLabel.textContent = `✨ ${grad.location}`;
    return;
  }

  const list = getFilteredUnsplashBackgrounds();
  const item = list[index % list.length];
  bgModeLabel.textContent = '4K Unsplash Photo';
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

export async function initBackgroundAndVisualSettings() {
  // Migrate a data URL from the previous localStorage version to IndexedDB
  if (state.background.customUrl && state.background.customUrl.startsWith('data:')) {
    await saveCustomBgToIDB(state.background.customUrl);
    state.background.customUrl = IDB_MARKER;
    saveState();
  } else if (state.background.customUrl === IDB_MARKER) {
    await loadCustomBgFromIDB();
  }

  // Daily auto-rotate background if enabled
  const todayStr = new Date().toISOString().slice(0, 10);
  if (
    state.background.dailyAutoChange &&
    state.background.mode !== 'custom' &&
    state.background.lastAutoChangeDate &&
    state.background.lastAutoChangeDate !== todayStr
  ) {
    const list =
      state.background.mode === 'gradient'
        ? getEffectiveTheme() === 'light'
          ? LIGHT_MINIMAL_GRADIENTS
          : MINIMAL_GRADIENTS
        : getFilteredUnsplashBackgrounds();
    state.background.index = (state.background.index + 1) % list.length;
    state.background.lastAutoChangeDate = todayStr;
    saveState();
  } else if (state.background.dailyAutoChange && !state.background.lastAutoChangeDate) {
    state.background.lastAutoChangeDate = todayStr;
    saveState();
  }

  // Follow OS theme changes when set to 'auto'
  if (window.matchMedia) {
    const colorSchemeMq = window.matchMedia('(prefers-color-scheme: light)');
    const onSchemeChange = () => {
      if (state.visual?.theme === 'auto') {
        applyVisualSettings();
        applyBackground();
      }
    };
    if (typeof colorSchemeMq.addEventListener === 'function') {
      colorSchemeMq.addEventListener('change', onSchemeChange);
    }
  }

  applyWidgetsHidden();
  toggleWidgetsBtn.addEventListener('click', () => {
    state.widgetsHidden = !state.widgetsHidden;
    applyWidgetsHidden();
    saveState();
  });

  changeBgBtn.addEventListener('click', () => {
    if (state.background.mode === 'custom') {
      state.background.mode = 'unsplash';
    }
    const list =
      state.background.mode === 'gradient'
        ? getEffectiveTheme() === 'light'
          ? LIGHT_MINIMAL_GRADIENTS
          : MINIMAL_GRADIENTS
        : getFilteredUnsplashBackgrounds();
    let nextIndex = (state.background.index + 1) % list.length;
    if (list.length > 2 && Math.random() > 0.5) {
      const candidates = list
        .map((_, idx) => idx)
        .filter((idx) => idx !== state.background.index);
      nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
    }
    state.background.index = nextIndex;
    state.background.lastAutoChangeDate = new Date().toISOString().slice(0, 10);
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
      state.visual.theme = ['dark', 'light', 'auto'].includes(chosen) ? chosen : 'dark';
      applyVisualSettings();
      applyBackground();
      saveState();
    });
  });

  document.querySelectorAll('[data-bg-category]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-bg-category') || 'all';
      state.background.category = cat;
      state.background.mode = 'unsplash';
      state.background.index = 0;
      applyVisualSettings();
      applyBackground();
      saveState();
    });
  });

  const dailyToggle = document.getElementById('bg-daily-auto-toggle');
  if (dailyToggle) {
    dailyToggle.addEventListener('change', () => {
      state.background.dailyAutoChange = dailyToggle.checked;
      state.background.lastAutoChangeDate = new Date().toISOString().slice(0, 10);
      saveState();
      showToast(
        dailyToggle.checked
          ? '✓ Background will auto-rotate daily!'
          : 'Daily background rotation turned off.'
      );
    });
  }

  applyCustomBgBtn.addEventListener('click', () => {
    const url = customBgUrlInput.value.trim();
    if (!url) return;
    state.background.customUrl = url;
    state.background.mode = 'custom';
    saveState();
    applyBackground();
    showToast('✓ Custom URL background applied!');
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
        showToast('✓ Image saved from your computer to IndexedDB and set as background!');
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
    showToast('Appearance settings have been reset');
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
