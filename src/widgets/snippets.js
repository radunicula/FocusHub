import { pushUndoState, saveState } from '../state.js';
import { escapeHtml, showToast } from '../utils.js';
import { createWidgetHeader } from './header.js';
import { renderAllWidgets } from './manager.js';

// -------------------- WIDGET 8: SNIPPETS & COMMANDS (1-CLICK COPY) --------------------
export function buildSnippetsWidgetContent(widget, cardEl) {
  if (!widget.data) widget.data = { items: [], activeTag: 'all' };
  if (!Array.isArray(widget.data.items)) widget.data.items = [];
  if (!widget.data.activeTag) widget.data.activeTag = 'all';

  const extraFrag = document.createDocumentFragment();
  const toggleAddBtn = document.createElement('button');
  toggleAddBtn.type = 'button';
  toggleAddBtn.className =
    'px-2 py-1 rounded-lg text-[11px] font-medium text-accent-300 bg-accent-400/15 hover:bg-accent-400/25 transition-colors';
  toggleAddBtn.textContent = '+ Snippet';
  toggleAddBtn.title = 'Add a new command or text snippet';
  extraFrag.appendChild(toggleAddBtn);

  const header = createWidgetHeader(
    widget,
    'bg-cyan-400/20 text-cyan-300',
    `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>`,
    extraFrag
  );

  const addForm = document.createElement('form');
  addForm.className =
    'hidden mb-2.5 p-2.5 rounded-xl bg-black/25 border border-white/10 space-y-1.5';
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

  toggleAddBtn.addEventListener('click', () => {
    addForm.classList.toggle('hidden');
    if (!addForm.classList.contains('hidden')) {
      addForm.querySelector('[data-field="title"]')?.focus();
    }
  });

  addForm.querySelector('[data-action="cancel"]').addEventListener('click', () => {
    addForm.reset();
    addForm.classList.add('hidden');
  });

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = addForm.querySelector('[data-field="title"]').value.trim();
    const tag = addForm.querySelector('[data-field="tag"]').value.trim() || 'General';
    const code = addForm.querySelector('[data-field="code"]').value.trim();
    if (!title || !code) return;
    widget.data.items.unshift({
      id: `snip-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      title,
      tag,
      code,
    });
    saveState();
    renderAllWidgets();
    showToast(`✓ Snippet “${title}” saved!`);
  });

  // Search + tag filter bar
  const filterBar = document.createElement('div');
  filterBar.className = 'mb-2 flex items-center gap-1.5';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Filter snippets...';
  searchInput.className =
    'flex-1 min-w-0 rounded-xl bg-white/10 border border-white/15 px-2.5 py-1 text-xs text-white placeholder-white/40 focus:border-accent-400 focus:outline-none select-text';

  const tags = ['all', ...Array.from(new Set(widget.data.items.map((i) => i.tag || 'General')))];
  const tagSelect = document.createElement('select');
  tagSelect.className =
    'rounded-xl bg-white/10 border border-white/15 px-2 py-1 text-[11px] text-white/85 focus:border-accent-400 focus:outline-none';
  tags.forEach((t) => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.className = 'bg-slate-900';
    opt.textContent = t === 'all' ? 'All tags' : `#${t}`;
    if (t === widget.data.activeTag) opt.selected = true;
    tagSelect.appendChild(opt);
  });

  filterBar.appendChild(searchInput);
  filterBar.appendChild(tagSelect);

  const listEl = document.createElement('div');
  listEl.className = 'flex-1 overflow-y-auto custom-scrollbar space-y-1.5 pr-1';

  const renderList = () => {
    listEl.innerHTML = '';
    const q = searchInput.value.trim().toLowerCase();
    const activeTag = widget.data.activeTag || 'all';
    const filtered = widget.data.items.filter((item) => {
      const tagMatch = activeTag === 'all' || (item.tag || 'General') === activeTag;
      const textMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        (item.tag || '').toLowerCase().includes(q);
      return tagMatch && textMatch;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<p class="py-6 text-center text-xs text-white/40">No snippets found. Click + Snippet to add one.</p>`;
      return;
    }

    filtered.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'snippet-card rounded-xl p-2 group cursor-pointer';
      card.title = 'Click to copy to clipboard';

      const topRow = document.createElement('div');
      topRow.className = 'flex items-center justify-between gap-2 mb-1';

      const titleWrap = document.createElement('div');
      titleWrap.className = 'flex items-center gap-1.5 min-w-0';
      titleWrap.innerHTML = `
          <span class="text-xs font-medium text-white/95 truncate">${escapeHtml(item.title)}</span>
          <span class="shrink-0 rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-accent-300">#${escapeHtml(item.tag || 'General')}</span>
        `;

      const actions = document.createElement('div');
      actions.className = 'flex items-center gap-1 shrink-0';

      const copyBadge = document.createElement('span');
      copyBadge.className =
        'px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-accent-500/20 text-accent-300';
      copyBadge.textContent = '📋 Copy';

      const delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className =
        'opacity-0 group-hover:opacity-100 p-0.5 rounded text-white/45 hover:text-rose-400 transition-opacity';
      delBtn.title = 'Delete snippet';
      delBtn.textContent = '✕';
      delBtn.addEventListener('click', (e) => {
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

      const codeEl = document.createElement('pre');
      codeEl.className =
        'text-[11px] font-mono text-white/75 bg-black/25 rounded-lg px-2 py-1 overflow-x-auto custom-scrollbar whitespace-pre-wrap break-all select-text';
      codeEl.textContent = item.code;

      card.addEventListener('click', () => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(item.code).then(() => {
            copyBadge.textContent = '✓ Copied!';
            showToast(`✓ Copied “${item.title}” to clipboard!`);
            setTimeout(() => {
              copyBadge.textContent = '📋 Copy';
            }, 1400);
          });
        }
      });

      card.appendChild(topRow);
      card.appendChild(codeEl);
      listEl.appendChild(card);
    });
  };

  searchInput.addEventListener('input', renderList);
  tagSelect.addEventListener('change', () => {
    widget.data.activeTag = tagSelect.value;
    saveState();
    renderList();
  });

  renderList();

  const footer = document.createElement('div');
  footer.className =
    'mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
  footer.innerHTML = `<span>${widget.data.items.length} snippets • click any card to copy</span>`;

  cardEl.appendChild(header);
  cardEl.appendChild(addForm);
  cardEl.appendChild(filterBar);
  cardEl.appendChild(listEl);
  cardEl.appendChild(footer);

  return header;
}
