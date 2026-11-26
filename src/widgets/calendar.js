import { saveState } from '../state.js';
import { getISOWeekNumber } from '../clock.js';
import { createWidgetHeader } from './header.js';
import { renderAllWidgets } from './manager.js';

// -------------------- D. MONTHLY CALENDAR WIDGET WITH WEEK NUMBER (ISO 8601) --------------------
export function buildCalendarWidgetContent(widget, cardEl) {
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
  prevBtn.title = 'Previous month';
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
  todayBtn.textContent = 'Today';
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
  nextBtn.title = 'Next month';
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

  const monthName = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month, 1));

  const monthTitle = document.createElement('div');
  monthTitle.className = 'text-center text-xs sm:text-sm font-semibold capitalize text-white/90 mb-2';
  monthTitle.textContent = monthName;
  body.appendChild(monthTitle);

  const grid = document.createElement('div');
  grid.className = 'calendar-grid flex-1 items-center';

  // Header: week number + weekdays (Monday -> Sunday)
  const headers = ['Wk', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  headers.forEach((h, idx) => {
    const hEl = document.createElement('div');
    hEl.className = `text-[10px] font-semibold uppercase tracking-wider py-1 ${
        idx === 0 ? 'text-accent-300/85' : idx >= 6 ? 'text-rose-300/75' : 'text-white/50'
      }`;
    hEl.textContent = h;
    grid.appendChild(hEl);
  });

  const firstDayOfMonth = new Date(year, month, 1);
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7; // 0 = Monday ... 6 = Sunday
  const startDate = new Date(year, month, 1 - startOffset);

  for (let row = 0; row < 6; row++) {
    const rowMonday = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + row * 7);
    const weekNum = getISOWeekNumber(rowMonday);

    const wkBadge = document.createElement('div');
    wkBadge.className = 'calendar-week-badge';
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
      <span>Current week: <strong class="text-accent-300">W${getISOWeekNumber(now)}</strong></span>
      <span>ISO 8601</span>
    `;

  cardEl.appendChild(header);
  cardEl.appendChild(body);
  cardEl.appendChild(footer);

  return header;
}
