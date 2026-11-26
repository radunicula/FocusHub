import { getActiveWorkspace, saveState, state } from '../state.js';
import { showToast } from '../utils.js';
import { backupPopover } from '../backup.js';
import {
  applyLockLayoutState,
  attachDragBehavior,
  attachResizeBehavior,
  autoArrangeBtn,
  autoArrangeWidgets,
  bakeWorkspaceLayoutToCurrentViewport,
  bringToFront,
  canvasEl,
  computeRenderedLayout,
  findFreeSlot,
  scheduleLayoutSync,
  showAllWidgetsBtn,
  updateCanvasMinHeight,
  widgetsCountBadge,
  widgetsManagerBtn,
  widgetsManagerList,
  widgetsManagerPopover,
} from '../canvas.js';
import { buildLinksWidgetContent } from './links.js';
import { buildTodoWidgetContent } from './todo.js';
import { buildNotesWidgetContent } from './notes.js';
import { buildCalendarWidgetContent } from './calendar.js';
import { buildForecastWidgetContent } from './forecast.js';
import { buildClocksWidgetContent } from './clocks.js';
import { buildCountdownWidgetContent } from './countdown.js';
import { buildSnippetsWidgetContent } from './snippets.js';
import { buildPomodoroWidgetContent } from './pomodoro.js';
import { buildConvertersWidgetContent } from './converters.js';
import { showWidgetsIfHidden } from '../appearance.js';

// -------------------- COMPLETE CANVAS RENDERING & PANEL MANAGER --------------------
function getWidgetTypeBadge(type) {
  if (type === 'links') return '🔗';
  if (type === 'todo') return '✅';
  if (type === 'notes') return '📝';
  if (type === 'calendar') return '📅';
  if (type === 'forecast') return '🌦️';
  if (type === 'clocks') return '🌍';
  if (type === 'countdown') return '⏳';
  if (type === 'snippets') return '⚡';
  if (type === 'pomodoro') return '🍅';
  if (type === 'converters') return '🧮';
  return '📦';
}

export function renderAllWidgets() {
  canvasEl.innerHTML = '';
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
      height: widget.position?.height ?? 430,
    };

    const cardEl = document.createElement('article');
    cardEl.dataset.widgetId = widget.id;
    cardEl.className = 'glass-panel draggable-widget p-3.5 sm:p-4';
    cardEl.style.left = `${rect.x}px`;
    cardEl.style.top = `${rect.y}px`;
    cardEl.style.width = `${rect.width}px`;
    cardEl.style.height = `${rect.height}px`;
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
    } else if (widget.type === 'snippets') {
      handleEl = buildSnippetsWidgetContent(widget, cardEl);
    } else if (widget.type === 'pomodoro') {
      handleEl = buildPomodoroWidgetContent(widget, cardEl);
    } else if (widget.type === 'converters') {
      handleEl = buildConvertersWidgetContent(widget, cardEl);
    }

    if (handleEl) {
      attachDragBehavior(widget, cardEl, handleEl);
    }

    const resizeEl = document.createElement('div');
    resizeEl.className = 'widget-resize-handle';
    resizeEl.title = 'Drag to resize the panel';
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

export function renderWidgetsManagerList() {
  widgetsManagerList.innerHTML = '';
  const activeWs = getActiveWorkspace();

  const weatherRow = document.createElement('div');
  weatherRow.className =
    'flex items-center justify-between gap-2 rounded-xl bg-white/5 px-2.5 py-1.5 text-xs';
  weatherRow.innerHTML = `
      <span class="truncate text-white/85">☀️ Weather Widget (Corner)</span>
    `;
  const weatherToggleBtn = document.createElement('button');
  weatherToggleBtn.type = 'button';
  weatherToggleBtn.className = `px-2 py-0.5 rounded-lg text-[11px] font-medium ${
      state.weatherVisible
        ? 'bg-accent-500/20 text-accent-300'
        : 'bg-white/10 text-white/50'
    }`;
  weatherToggleBtn.textContent = state.weatherVisible ? 'Visible' : 'Hidden';
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
    visBtn.textContent = w.visible ? 'Visible' : 'Hidden';
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

export function computeNewWidgetPosition(defaultHeight = 420) {
  const activeWs = getActiveWorkspace();
  const { canvasWidth, availableHeight } = bakeWorkspaceLayoutToCurrentViewport(activeWs);
  const width = Math.min(390, Math.max(260, canvasWidth - 16));
  const height = Math.min(defaultHeight, Math.max(240, availableHeight - 20));
  const occupied = activeWs.widgets
    .filter((w) => w.visible && w.position)
    .map((w) => ({
      x: w.position.x ?? 0,
      y: w.position.y ?? 0,
      width: w.position.width ?? 390,
      height: w.position.height ?? 420,
    }));
  const { x, y } = findFreeSlot(occupied, width, height, canvasWidth);

  state.maxZIndex = (state.maxZIndex || 25) + 1;
  return {
    x,
    y,
    width,
    height,
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
      title: `Quick Links #${countOfType}`,
      visible: true,
      position: computeNewWidgetPosition(430),
      data: {
        viewMode: 'list',
        subgroups: [
          {
            id: `sg-${Date.now()}-1`,
            title: 'General',
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
      title: `To-Do List #${countOfType}`,
      visible: true,
      position: computeNewWidgetPosition(430),
      data: {
        filter: 'all',
        items: [
          {
            id: `td-${Date.now()}-1`,
            text: 'New task for this group',
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
      title: `Notes #${countOfType}`,
      visible: true,
      position: computeNewWidgetPosition(420),
      data: {
        content: '',
        lastSaved: 'New note',
      },
    };
  } else if (type === 'calendar') {
    const now = new Date();
    newWidget = {
      id: `w-cal-${Date.now()}`,
      type: 'calendar',
      title: 'Calendar',
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
      title: '5-Day Forecast',
      visible: true,
      position: computeNewWidgetPosition(370),
      data: {},
    };
  } else if (type === 'clocks') {
    newWidget = {
      id: `w-clocks-${Date.now()}`,
      type: 'clocks',
      title: 'World Clocks',
      visible: true,
      position: computeNewWidgetPosition(350),
      data: {
        clocks: [
          { id: `clk-${Date.now()}-1`, city: 'Sibiu / Bucharest', tz: 'Europe/Bucharest' },
          { id: `clk-${Date.now()}-2`, city: 'London', tz: 'Europe/London' },
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
      title: 'Countdown',
      visible: true,
      position: computeNewWidgetPosition(340),
      data: {
        items: [
          {
            id: `cd-${Date.now()}-1`,
            title: 'Important Event',
            targetDate: target.toISOString().slice(0, 10),
          },
        ],
      },
    };
  } else if (type === 'snippets') {
    newWidget = {
      id: `w-snip-${Date.now()}`,
      type: 'snippets',
      title: `Snippets #${countOfType}`,
      visible: true,
      position: computeNewWidgetPosition(400),
      data: {
        activeTag: 'all',
        items: [
          {
            id: `snip-${Date.now()}-1`,
            title: 'Git Status & Recent Log',
            tag: 'Git',
            code: 'git status && git log -n 5 --oneline',
          },
          {
            id: `snip-${Date.now()}-2`,
            title: 'Radar 77GHz Formula',
            tag: 'Radar',
            code: 'lambda = c / f = 299.792458 / 77 GHz = 3.893 mm',
          },
        ],
      },
    };
  } else if (type === 'pomodoro') {
    newWidget = {
      id: `w-pomo-${Date.now()}`,
      type: 'pomodoro',
      title: 'Pomodoro Timer',
      visible: true,
      position: computeNewWidgetPosition(360),
      data: {
        mode: 'focus',
        focusMin: 25,
        shortMin: 5,
        longMin: 15,
        remainingSec: 25 * 60,
        running: false,
        completedSessions: 0,
        linkedTask: '',
      },
    };
  } else if (type === 'converters') {
    newWidget = {
      id: `w-conv-${Date.now()}`,
      type: 'converters',
      title: 'Engineering Converters',
      visible: true,
      position: computeNewWidgetPosition(390),
      data: {
        activeTab: 'radix',
        value: 255,
        bits: 16,
      },
    };
  }

  if (!newWidget) return;
  showWidgetsIfHidden();
  activeWs.widgets.push(newWidget);
  saveState();
  renderAllWidgets();
  const newCard = canvasEl.querySelector(`[data-widget-id="${newWidget.id}"]`);
  if (newCard) {
    newCard.classList.add('widget-pulse-highlight');
    newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  showToast(`✓ Panel “${newWidget.title}” added!`);
}

export function initMultiWidgetControls() {
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

  const lockLayoutBtn = document.getElementById('lock-layout-btn');
  if (lockLayoutBtn) {
    lockLayoutBtn.addEventListener('click', () => {
      state.layoutLocked = !state.layoutLocked;
      applyLockLayoutState();
      saveState();
      showToast(state.layoutLocked ? '🔒 Layout locked' : '🔓 Layout unlocked');
    });
  }
  applyLockLayoutState();

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

  window.addEventListener('resize', scheduleLayoutSync);
  if (typeof ResizeObserver === 'function') {
    const canvasResizeObserver = new ResizeObserver(() => {
      scheduleLayoutSync();
    });
    canvasResizeObserver.observe(canvasEl);
  }
}
