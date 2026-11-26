import { pushUndoState, saveState } from '../state.js';
import { escapeHtml } from '../utils.js';
import { createWidgetHeader } from './header.js';
import { renderAllWidgets } from './manager.js';

// -------------------- G. EVENT COUNTDOWN WIDGET --------------------
export function buildCountdownWidgetContent(widget, cardEl) {
  if (!Array.isArray(widget.data?.items)) {
    const nextMonth = new Date();
    nextMonth.setDate(nextMonth.getDate() + 14);
    widget.data = {
      items: [
        {
          id: 'cd-1',
          title: 'Project launch / Vacation',
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
  addBtn.textContent = '+ Event';
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
    empty.textContent = 'No events set. Click “+ Event”.';
    listEl.appendChild(empty);
  } else {
    items.forEach((ev) => {
      const target = new Date(`${ev.targetDate}T00:00:00`);
      const diffDays = Math.round((target - now) / 86400000);

      let badgeText = '';
      let badgeCls = '';
      if (diffDays > 1) {
        badgeText = `${diffDays} days`;
        badgeCls = 'bg-accent-500/20 text-accent-300 border-accent-400/30';
      } else if (diffDays === 1) {
        badgeText = 'Tomorrow!';
        badgeCls = 'bg-amber-500/25 text-amber-200 border-amber-400/40';
      } else if (diffDays === 0) {
        badgeText = 'Today! 🎉';
        badgeCls = 'bg-emerald-500/30 text-emerald-200 border-emerald-400/50';
      } else {
        badgeText = `In the past ${Math.abs(diffDays)}d`;
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
            <button type="button" data-del-cd class="opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/40 hover:text-rose-300 transition-opacity" title="Delete event">✕</button>
          </div>
        `;

      row.querySelector('[data-del-cd]').addEventListener('click', () => {
        pushUndoState(`Event “${ev.title}”`);
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
      <span>${items.length} events tracked</span>
    `;

  cardEl.appendChild(header);
  cardEl.appendChild(form);
  cardEl.appendChild(listEl);
  cardEl.appendChild(footer);

  return header;
}
