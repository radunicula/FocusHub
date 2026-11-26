import { getActiveWorkspace, pushUndoState, saveState, state } from './state.js';
import { showToast } from './utils.js';
import { autoArrangeWidgets } from './canvas.js';
import { renderAllWidgets } from './widgets/manager.js';

// ==========================================================================
// 2. WORKSPACES (TABS IN THE TOP-LEFT CORNER)
// ==========================================================================

const workspacesBarEl = document.getElementById('workspaces-bar');

export function renderWorkspacesBar() {
  workspacesBarEl.innerHTML = '';

  state.workspaces.forEach((ws) => {
    const isActive = ws.id === state.activeWorkspaceId;
    const tabWrap = document.createElement('div');
    tabWrap.className = `workspace-tab flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-medium cursor-pointer select-none ${
        isActive ? 'active' : ''
      }`;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = ws.name;
    nameSpan.className = 'truncate max-w-[130px] rounded px-0.5 focus:outline-none';
    nameSpan.title = isActive
      ? 'Double-click to rename this workspace'
      : `Switch to workspace “${ws.name}”`;

    tabWrap.addEventListener('click', (e) => {
      if (e.target.closest('button') || nameSpan.isContentEditable) return;
      if (state.activeWorkspaceId !== ws.id) {
        state.activeWorkspaceId = ws.id;
        saveState();
        renderWorkspacesBar();
        const activeWs = getActiveWorkspace();
        if (!activeWs.initializedLayout) {
          activeWs.initializedLayout = true;
          autoArrangeWidgets(true);
        } else {
          renderAllWidgets();
        }
      }
    });

    // Rename workspace on double-click
    nameSpan.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      nameSpan.contentEditable = 'true';
      nameSpan.spellcheck = false;
      nameSpan.classList.add('bg-black/40', 'ring-1', 'ring-accent-400/60', 'px-1');
      nameSpan.focus();
    });

    nameSpan.addEventListener('blur', () => {
      if (!nameSpan.isContentEditable) return;
      nameSpan.contentEditable = 'false';
      nameSpan.classList.remove('bg-black/40', 'ring-1', 'ring-accent-400/60', 'px-1');
      const cleaned = nameSpan.textContent.trim() || 'Workspace';
      ws.name = cleaned;
      nameSpan.textContent = cleaned;
      saveState();
    });

    nameSpan.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        nameSpan.blur();
      }
    });

    tabWrap.appendChild(nameSpan);

    // Show a delete button on the active tab when there is more than one workspace
    if (isActive && state.workspaces.length > 1) {
      const delWsBtn = document.createElement('button');
      delWsBtn.type = 'button';
      delWsBtn.className =
        'ml-0.5 p-0.5 rounded text-white/45 hover:text-rose-300 hover:bg-white/10 transition-colors';
      delWsBtn.title = 'Delete this workspace';
      delWsBtn.innerHTML = `
          <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        `;
      delWsBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        pushUndoState(`Workspace “${ws.name}”`);
        state.workspaces = state.workspaces.filter((item) => item.id !== ws.id);
        state.activeWorkspaceId = state.workspaces[0].id;
        saveState();
        renderWorkspacesBar();
        renderAllWidgets();
      });
      tabWrap.appendChild(delWsBtn);
    }

    workspacesBarEl.appendChild(tabWrap);
  });

  // Add a new workspace button
  const addWsBtn = document.createElement('button');
  addWsBtn.type = 'button';
  addWsBtn.className =
    'flex items-center justify-center h-7 w-7 rounded-xl text-white/65 hover:text-white hover:bg-white/15 transition-colors';
  addWsBtn.title = 'Add a new workspace (new tab)';
  addWsBtn.innerHTML = `
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.3" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    `;
  addWsBtn.addEventListener('click', () => {
    const idx = state.workspaces.length + 1;
    const newWs = {
      id: `ws-${Date.now()}`,
      name: `✨ Workspace #${idx}`,
      initializedLayout: false,
      widgets: [
        {
          id: `w-links-${Date.now()}`,
          type: 'links',
          title: 'Quick Links',
          visible: true,
          position: { x: 40, y: 16, width: 400, height: 420, zIndex: ++state.maxZIndex },
          data: {
            viewMode: 'list',
            subgroups: [
              {
                id: `sg-${Date.now()}`,
                title: 'General',
                collapsed: false,
                items: [
                  { id: `lnk-${Date.now()}`, title: 'Google', url: 'https://google.com' },
                ],
              },
            ],
          },
        },
        {
          id: `w-notes-${Date.now() + 1}`,
          type: 'notes',
          title: 'Notes',
          visible: true,
          position: { x: 465, y: 16, width: 400, height: 420, zIndex: ++state.maxZIndex },
          data: {
            content: '',
            lastSaved: 'New note',
          },
        },
      ],
    };

    state.workspaces.push(newWs);
    state.activeWorkspaceId = newWs.id;
    newWs.initializedLayout = true;
    saveState();
    renderWorkspacesBar();
    autoArrangeWidgets(true);
    showToast(`Workspace “${newWs.name}” created!`);
  });

  workspacesBarEl.appendChild(addWsBtn);
}
