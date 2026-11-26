import { ensureLinksSubgroups } from '../defaults.js';
import { pushUndoState, saveState } from '../state.js';
import { escapeHtml, extractDomain, isSafeLinkUrl, normalizeUrl, showToast } from '../utils.js';
import { draggedLinkPayload, moveLinkViaDragDrop, setDraggedLinkPayload } from '../canvas.js';
import { createWidgetHeader } from './header.js';
import { renderAllWidgets } from './manager.js';

// -------------------- A. QUICK LINKS WIDGET (SUBGROUPS, EDITING & DRAG-DROP) --------------------
export function buildLinksWidgetContent(widget, cardEl) {
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
      ? 'Current view: Compact list (click for grid)'
      : 'Current view: Grid (click for compact list)';
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
  addSubgroupBtn.title = 'Add a subgroup to this group';
  addSubgroupBtn.innerHTML = `
      <svg class="w-3 h-3 text-sky-300" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
      <span class="widget-action-label">+ Subgroup</span>
    `;

  const addLinkBtn = document.createElement('button');
  addLinkBtn.type = 'button';
  addLinkBtn.className =
    'flex items-center gap-1 rounded-lg bg-sky-400/20 hover:bg-sky-400/30 border border-sky-400/30 px-2 py-1 text-[11px] font-medium text-sky-200 transition-colors';
  addLinkBtn.title = 'Add a new link';
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
    'bg-sky-400/15 text-sky-300 border-sky-400/25',
    iconSvg,
    actionsFrag
  );

  // Add subgroup form
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
      <button type="submit" class="rounded-lg bg-sky-500 hover:bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Create</button>
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

  // Add/edit link form
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
        <button type="button" data-cancel-lnk class="rounded-lg px-2 py-1 text-xs text-white/65 hover:text-white hover:bg-white/10">Cancel</button>
        <button type="submit" data-submit-lnk class="rounded-lg bg-sky-500 hover:bg-sky-400 px-2.5 py-1 text-xs font-semibold text-slate-950">Save</button>
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
      submitBtn.textContent = 'Update';
    } else {
      editingLinkContext = null;
      linkForm.reset();
      if (targetSgId && selectEl) selectEl.value = targetSgId;
      submitBtn.textContent = 'Save';
    }
    titleInput.focus();
  };

  addLinkBtn.addEventListener('click', () => {
    editingLinkContext = null;
    linkForm.querySelector('[data-submit-lnk]').textContent = 'Save';
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
    if (!isSafeLinkUrl(url)) {
      showToast('⚠️ Invalid URL. Only http:// and https:// links are allowed.');
      return;
    }

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
    collapseBtn.title = sg.collapsed ? 'Expand subgroup' : 'Collapse subgroup';
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
    sgTitle.title = 'Click to rename subgroup';
    sgTitle.textContent = sg.title;

    sgTitle.addEventListener('blur', () => {
      const cleaned = sgTitle.textContent.trim() || 'Subgroup';
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
      'row-actions flex items-center gap-0.5 opacity-0 group-hover/sg:opacity-100 group-focus-within/sg:opacity-100 transition-opacity shrink-0';

    const quickAddHereBtn = document.createElement('button');
    quickAddHereBtn.type = 'button';
    quickAddHereBtn.className =
      'p-0.5 rounded text-sky-300/80 hover:text-sky-200 hover:bg-white/10';
    quickAddHereBtn.title = `Add link to “${sg.title}”`;
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
      sgUpBtn.title = 'Move subgroup up';
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
      sgDownBtn.title = 'Move subgroup down';
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
      sgDelBtn.title = 'Delete this subgroup';
      sgDelBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
      sgDelBtn.addEventListener('click', () => {
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
      const sgBody = document.createElement('div');
      sgBody.className =
        viewMode === 'list'
          ? 'p-1.5 space-y-1'
          : 'p-1.5 grid grid-cols-2 sm:grid-cols-3 gap-1.5';

      if (items.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'col-span-full py-2 px-2 text-[11px] text-white/35 italic';
        emptyMsg.textContent = 'Empty subgroup — drag a link here or click “+”.';
        sgBody.appendChild(emptyMsg);
      } else {
        items.forEach((link, idx) => {
          const domain = extractDomain(link.url);
          let directFaviconUrl = '';
          try {
            directFaviconUrl = new URL('/favicon.ico', link.url).href;
          } catch {
            directFaviconUrl = '';
          }
          const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;

          const itemEl = document.createElement('div');
          itemEl.draggable = true;
          itemEl.className =
            viewMode === 'list'
              ? 'quick-link-row group flex items-center justify-between gap-2 rounded-lg px-2 py-1 animate-item'
              : 'quick-link-card group rounded-xl p-2 flex items-center justify-between gap-1.5 animate-item';

          itemEl.addEventListener('dragstart', (e) => {
            e.stopPropagation();
            setDraggedLinkPayload({
              sourceWidgetId: widget.id,
              sourceSubgroupId: sg.id,
              linkId: link.id,
            });
            itemEl.classList.add('is-link-dragging');
            if (e.dataTransfer) {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', link.title);
            }
          });

          itemEl.addEventListener('dragend', () => {
            itemEl.classList.remove('is-link-dragging');
            setDraggedLinkPayload(null);
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
          if (isSafeLinkUrl(link.url)) anchor.href = link.url;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
          anchor.title = link.url;
          anchor.className = 'flex items-center gap-2 min-w-0 flex-1 focus:outline-none';

          const iconWrap = document.createElement('div');
          iconWrap.className =
            'hidden h-5 w-5 shrink-0 rounded-md bg-white/10 border border-white/10 flex items-center justify-center overflow-hidden';

          const img = document.createElement('img');
          img.alt = '';
          img.className = 'h-3.5 w-3.5 object-contain';
          let triedGoogle = false;

          img.onload = () => {
            const isGenericGoogleGlobe =
              triedGoogle && img.naturalWidth <= 16 && img.naturalHeight <= 16;
            if (img.naturalWidth > 0 && img.naturalHeight > 0 && !isGenericGoogleGlobe) {
              iconWrap.classList.remove('hidden');
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

          const titleSpan = document.createElement('span');
          titleSpan.className =
            'text-xs font-medium text-white/90 group-hover:text-sky-200 truncate transition-colors';
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

          const rowActions = document.createElement('div');
          rowActions.className =
            'row-actions flex items-center gap-0.5 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity shrink-0';

          const editBtn = document.createElement('button');
          editBtn.type = 'button';
          editBtn.className =
            'p-0.5 rounded text-white/45 hover:text-amber-300 hover:bg-white/10';
          editBtn.title = 'Edit title, URL, or subgroup';
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
            upBtn.title = 'Move up';
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
            downBtn.title = 'Move down';
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
          delBtn.title = 'Delete link';
          delBtn.innerHTML = `
              <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            `;
          delBtn.addEventListener('click', (e) => {
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

  const footer = document.createElement('div');
  footer.className =
    'mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/45';
  footer.innerHTML = `
      <span>${subgroups.length} ${subgroups.length === 1 ? 'subgroup' : 'subgroups'} • ${totalLinksCount} ${totalLinksCount === 1 ? 'link' : 'links'}</span>
    `;

  const allCollapsed = subgroups.every((s) => s.collapsed);
  const toggleAllCollapseBtn = document.createElement('button');
  toggleAllCollapseBtn.type = 'button';
  toggleAllCollapseBtn.className = 'hover:text-sky-300 transition-colors';
  toggleAllCollapseBtn.textContent = allCollapsed
    ? 'Expand all'
    : 'Collapse all';
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
