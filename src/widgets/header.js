import { getActiveWorkspace, pushUndoState, saveState } from '../state.js';
import { renderAllWidgets, renderWidgetsManagerList } from './manager.js';

export function createWidgetHeader(
  widget,
  badgeColorClass,
  iconSvg,
  extraActionsFragment,
  { menuItems = [] } = {}
) {
  const header = document.createElement('div');
  header.className =
    'widget-drag-handle flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5 pb-2.5 mb-2.5 border-b border-white/10 select-none';

  const left = document.createElement('div');
  // Explicit min width keeps the title readable when the header actions need space.
  left.className = 'flex items-center gap-2 min-w-[7rem] flex-1';

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
  titleEl.title = 'Click to rename this panel';
  titleEl.textContent = widget.title;

  titleEl.addEventListener('blur', () => {
    const val = titleEl.textContent.trim() || 'Panel';
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
  // ml-auto keeps the actions right-aligned when they wrap below the title on narrow widgets.
  right.className = 'flex items-center gap-1 shrink-0 ml-auto';

  if (extraActionsFragment) {
    right.appendChild(extraActionsFragment);
  }

  right.appendChild(
    createWidgetMenu([
      ...menuItems,
      {
        label: 'Hide panel',
        hint: 'Show it again from the Widgets menu',
        icon: ICON_HIDE,
        onSelect: () => {
          widget.visible = false;
          saveState();
          renderAllWidgets();
        },
      },
      { separator: true },
      {
        label: 'Delete panel',
        hint: 'Undo with Ctrl+Z',
        icon: ICON_DELETE,
        danger: true,
        onSelect: () => {
          pushUndoState(`Panel “${widget.title}”`);
          const activeWs = getActiveWorkspace();
          activeWs.widgets = activeWs.widgets.filter((w) => w.id !== widget.id);
          saveState();
          renderAllWidgets();
        },
      },
    ])
  );

  header.appendChild(left);
  header.appendChild(right);

  return header;
}

const ICON_HIDE = `
  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>`;

const ICON_DELETE = `
  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>`;

function closeAllWidgetMenus(except = null) {
  document.querySelectorAll('.widget-menu:not(.hidden)').forEach((menu) => {
    if (menu === except) return;
    menu.classList.add('hidden');
    menu.parentElement?.querySelector('[aria-haspopup="menu"]')?.setAttribute('aria-expanded', 'false');
  });
}

// A single document-level listener closes open menus, since headers are re-created on every render.
document.addEventListener('click', (e) => {
  if (!e.target.closest('.widget-menu-wrap')) closeAllWidgetMenus();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAllWidgetMenus();
});

function createWidgetMenu(items) {
  const wrap = document.createElement('div');
  wrap.className = 'widget-menu-wrap relative';

  const toggleBtn = document.createElement('button');
  toggleBtn.type = 'button';
  toggleBtn.className =
    'p-1 rounded-lg text-white/55 hover:text-white hover:bg-white/10 transition-colors';
  toggleBtn.title = 'More actions';
  toggleBtn.setAttribute('aria-label', 'More actions');
  toggleBtn.setAttribute('aria-haspopup', 'menu');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
      </svg>
    `;

  const menu = document.createElement('div');
  menu.className = 'widget-menu hidden absolute right-0 top-full mt-1 z-50 min-w-[11rem] rounded-xl p-1';
  menu.setAttribute('role', 'menu');

  items.forEach((item) => {
    if (item.separator) {
      const sep = document.createElement('div');
      sep.className = 'my-1 h-px bg-white/10';
      menu.appendChild(sep);
      return;
    }
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role', 'menuitem');
    btn.className = `flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
      item.danger
        ? 'text-rose-300 hover:bg-rose-500/15'
        : 'text-white/85 hover:bg-white/10 hover:text-white'
    }`;
    if (item.hint) btn.title = item.hint;
    btn.innerHTML = `<span class="shrink-0">${item.icon || ''}</span>`;
    const label = document.createElement('span');
    label.className = 'truncate';
    label.textContent = item.label;
    btn.appendChild(label);
    btn.addEventListener('click', () => {
      closeAllWidgetMenus();
      item.onSelect();
    });
    menu.appendChild(btn);
  });

  toggleBtn.addEventListener('click', () => {
    const willOpen = menu.classList.contains('hidden');
    closeAllWidgetMenus(menu);
    menu.classList.toggle('hidden', !willOpen);
    toggleBtn.setAttribute('aria-expanded', String(willOpen));
  });

  wrap.appendChild(toggleBtn);
  wrap.appendChild(menu);
  return wrap;
}
