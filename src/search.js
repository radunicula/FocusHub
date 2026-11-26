import { SEARCH_ENGINES } from './constants.js';
import { getActiveWorkspace, performUndo, saveState, state, undoStack } from './state.js';
import { escapeHtml, isSafeLinkUrl, showToast } from './utils.js';
import { renderWorkspacesBar } from './workspaces.js';
import { renderAllWidgets } from './widgets/manager.js';
import { showWidgetsIfHidden } from './appearance.js';

// ==========================================================================
// 4. GLOBAL QUICK SEARCH (CTRL+K OR /) + WEB SEARCH
// ==========================================================================

const searchEngineBtn = document.getElementById('search-engine-btn');
const globalSearchInput = document.getElementById('global-search-input');
const globalSearchResults = document.getElementById('global-search-results');

function getActiveSearchEngine() {
  return SEARCH_ENGINES[(state.searchEngineIndex || 0) % SEARCH_ENGINES.length];
}

function collectSearchMatches(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results = [];

  state.workspaces.forEach((ws) => {
    ws.widgets.forEach((w) => {
      if (w.type === 'links' && Array.isArray(w.data?.subgroups)) {
        w.data.subgroups.forEach((sg) => {
          (sg.items || []).forEach((lnk) => {
            if (
              lnk.title.toLowerCase().includes(q) ||
              lnk.url.toLowerCase().includes(q) ||
              sg.title.toLowerCase().includes(q)
            ) {
              results.push({
                kind: 'link',
                title: lnk.title,
                subtitle: `${ws.name} › ${w.title} › ${sg.title}`,
                url: lnk.url,
                workspaceId: ws.id,
                widgetId: w.id,
              });
            }
          });
        });
      } else if (w.type === 'todo' && Array.isArray(w.data?.items)) {
        w.data.items.forEach((td) => {
          if (td.text.toLowerCase().includes(q)) {
            results.push({
              kind: 'todo',
              title: td.text,
              subtitle: `${ws.name} › ${w.title} (${td.completed ? 'Completed' : 'Active'})`,
              workspaceId: ws.id,
              widgetId: w.id,
            });
          }
        });
      } else if (w.type === 'notes' && typeof w.data?.content === 'string') {
        if (
          w.data.content.toLowerCase().includes(q) ||
          w.title.toLowerCase().includes(q)
        ) {
          const snippet = w.data.content.replace(/[#*`>-]/g, '').trim().slice(0, 70) || 'Note';
          results.push({
            kind: 'notes',
            title: `${w.title}: ${snippet}`,
            subtitle: `${ws.name} › Note`,
            workspaceId: ws.id,
            widgetId: w.id,
          });
        }
      } else if (w.type === 'countdown' && Array.isArray(w.data?.items)) {
        w.data.items.forEach((ev) => {
          if (ev.title.toLowerCase().includes(q)) {
            results.push({
              kind: 'countdown',
              title: `${ev.title} (${ev.targetDate})`,
              subtitle: `${ws.name} › ${w.title}`,
              workspaceId: ws.id,
              widgetId: w.id,
            });
          }
        });
      } else if (w.type === 'snippets' && Array.isArray(w.data?.items)) {
        w.data.items.forEach((sn) => {
          if (
            sn.title.toLowerCase().includes(q) ||
            sn.code.toLowerCase().includes(q) ||
            (sn.tag || '').toLowerCase().includes(q)
          ) {
            results.push({
              kind: 'snippet',
              title: sn.title,
              subtitle: `${ws.name} › ${w.title} › #${sn.tag || 'General'} — ${sn.code.slice(0, 50)}`,
              code: sn.code,
              workspaceId: ws.id,
              widgetId: w.id,
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
    globalSearchResults.classList.add('hidden');
    globalSearchResults.innerHTML = '';
    return;
  }

  const matches = collectSearchMatches(query);
  const engine = getActiveSearchEngine();
  globalSearchResults.innerHTML = '';
  globalSearchResults.classList.remove('hidden');

  if (matches.length > 0) {
    const sectionLabel = document.createElement('div');
    sectionLabel.className =
      'px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/45';
    sectionLabel.textContent = 'Found in Dashboard';
    globalSearchResults.appendChild(sectionLabel);

    matches.forEach((m) => {
      const itemBtn = document.createElement('button');
      itemBtn.type = 'button';
      itemBtn.className =
        'w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/10 text-left transition-colors';

      const badge =
        m.kind === 'link'
          ? '🔗'
          : m.kind === 'todo'
          ? '✅'
          : m.kind === 'countdown'
          ? '⏳'
          : m.kind === 'snippet'
          ? '⚡'
          : '📝';

      itemBtn.innerHTML = `
          <div class="min-w-0 flex-1">
            <div class="text-xs font-medium text-white truncate">${badge} ${escapeHtml(m.title)}</div>
            <div class="text-[10px] text-white/45 truncate">${escapeHtml(m.subtitle)}</div>
          </div>
          <span class="text-[10px] text-sky-300 shrink-0">${
            m.kind === 'link' ? 'Open ↗' : m.kind === 'snippet' ? 'Copy 📋' : 'Go to panel →'
          }</span>
        `;

      itemBtn.addEventListener('click', () => {
        globalSearchResults.classList.add('hidden');
        globalSearchInput.value = '';
        if (m.kind === 'link') {
          if (isSafeLinkUrl(m.url)) window.open(m.url, '_blank', 'noopener,noreferrer');
        } else if (m.kind === 'snippet' && navigator.clipboard) {
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

  // Direct web search row
  const webBtn = document.createElement('button');
  webBtn.type = 'button';
  webBtn.className =
    'w-full mt-1 flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/25 text-left transition-colors';
  webBtn.innerHTML = `
      <span class="text-xs text-sky-200 truncate">🌐 Search <strong>“${escapeHtml(query)}”</strong> on ${escapeHtml(engine.name)}</span>
      <span class="text-[10px] font-mono text-sky-300 shrink-0">Enter ↵</span>
    `;
  webBtn.addEventListener('click', () => {
    window.open(`${engine.url}${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
    globalSearchResults.classList.add('hidden');
    globalSearchInput.value = '';
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
    domCard.classList.add('widget-pulse-highlight');
    domCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

export function initGlobalSearchAndShortcuts() {
  searchEngineBtn.textContent = getActiveSearchEngine().name;

  // Small screens (usually touch, no keyboard shortcuts) get a shorter placeholder that fits.
  const narrowScreen = window.matchMedia('(max-width: 639px)');
  const applySearchPlaceholder = () => {
    globalSearchInput.placeholder = narrowScreen.matches
      ? 'Search links, notes, web…'
      : 'Search links, notes, or the web... (Ctrl+K)';
  };
  applySearchPlaceholder();
  narrowScreen.addEventListener('change', applySearchPlaceholder);

  searchEngineBtn.addEventListener('click', () => {
    state.searchEngineIndex = ((state.searchEngineIndex || 0) + 1) % SEARCH_ENGINES.length;
    searchEngineBtn.textContent = getActiveSearchEngine().name;
    saveState();
    if (globalSearchInput.value.trim()) {
      renderGlobalSearchResults();
    }
  });

  globalSearchInput.addEventListener('input', renderGlobalSearchResults);
  globalSearchInput.addEventListener('focus', () => {
    if (globalSearchInput.value.trim()) renderGlobalSearchResults();
  });

  globalSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      globalSearchResults.classList.add('hidden');
      globalSearchInput.blur();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const query = globalSearchInput.value.trim();
      if (!query) return;
      const matches = collectSearchMatches(query);
      const firstLink = matches.find((m) => m.kind === 'link');
      if (firstLink) {
        if (isSafeLinkUrl(firstLink.url)) {
          window.open(firstLink.url, '_blank', 'noopener,noreferrer');
        }
      } else {
        const engine = getActiveSearchEngine();
        window.open(`${engine.url}${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
      }
      globalSearchResults.classList.add('hidden');
      globalSearchInput.value = '';
    }
  });

  const undoBtn = document.getElementById('undo-toast-btn');
  if (undoBtn) {
    undoBtn.addEventListener('click', performUndo);
  }

  // Global keyboard shortcuts: Ctrl+K, '/', and Ctrl+Z for undo
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      globalSearchInput.focus();
      globalSearchInput.select();
      return;
    }

    const tag = (e.target.tagName || '').toLowerCase();
    const isTyping =
      tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable;

    if (!isTyping && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      if (undoStack.length > 0) {
        e.preventDefault();
        performUndo();
        return;
      }
    }

    if (!isTyping && e.key === '/') {
      e.preventDefault();
      globalSearchInput.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (
      !globalSearchResults.contains(e.target) &&
      e.target !== globalSearchInput &&
      e.target !== searchEngineBtn
    ) {
      globalSearchResults.classList.add('hidden');
    }
  });
}
