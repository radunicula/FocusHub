import { WORLD_TIMEZONES } from '../constants.js';
import { pushUndoState, saveState } from '../state.js';
import { escapeHtml } from '../utils.js';
import { createWidgetHeader } from './header.js';
import { renderAllWidgets } from './manager.js';

// -------------------- F. WIDGET CEASURI MONDIALE (FUSURI ORARE LIVE) --------------------
export function updateWorldClocksInDom(now = new Date()) {
  document.querySelectorAll('[data-world-tz]').forEach((el) => {
    const tz = el.getAttribute('data-world-tz') || 'UTC';
    try {
      const timeStr = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      const dateStr = new Intl.DateTimeFormat('en-US', {
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

export function buildClocksWidgetContent(widget, cardEl) {
  if (!Array.isArray(widget.data?.clocks) || widget.data.clocks.length === 0) {
    widget.data = {
      clocks: [
        { id: 'clk-1', city: 'Sibiu / Bucharest', tz: 'Europe/Bucharest' },
        { id: 'clk-2', city: 'London', tz: 'Europe/London' },
        { id: 'clk-3', city: 'New York', tz: 'America/New_York' },
        { id: 'clk-4', city: 'Tokyo', tz: 'Asia/Tokyo' },
      ],
    };
  }

  const clocks = widget.data.clocks;
  const actionsFrag = document.createDocumentFragment();

  const selectTz = document.createElement('select');
  selectTz.className =
    'max-w-[7rem] rounded-lg bg-white/10 border border-white/15 px-2 py-0.5 text-[11px] text-white focus:outline-none';
  selectTz.title = 'Add a time zone';
  selectTz.innerHTML =
    `<option value="" class="bg-slate-900">+ Time zone...</option>` +
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
          <button type="button" data-del-clk class="opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/40 hover:text-rose-300 transition-opacity" title="Remove time zone">✕</button>
        </div>
      `;

    row.querySelector('[data-del-clk]').addEventListener('click', () => {
      pushUndoState(`Clock “${clk.city}”`);
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
      <span>${clocks.length} active time zones</span>
      <span>Updated every second</span>
    `;

  cardEl.appendChild(header);
  cardEl.appendChild(listEl);
  cardEl.appendChild(footer);

  updateWorldClocksInDom(new Date());
  return header;
}
