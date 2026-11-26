import { IDB_MARKER } from './constants.js';
import { cachedIdbBgDataUrl, saveCustomBgToIDB } from './storage/idb.js';
import {
  clearSyncFileHandleFromIDB,
  loadSyncFileHandleFromIDB,
  saveSyncFileHandleToIDB,
  setAutoSyncFileHandle,
  updateAutoSyncUI,
  writeAutoSyncFile,
} from './storage/autosync.js';
import {
  getActiveWorkspace,
  lastRemovedUnsafeLinksCount,
  normalizeLoadedState,
  saveState,
  setState,
  state,
} from './state.js';
import { extractDomain, isSafeLinkUrl, showToast } from './utils.js';
import { renderWorkspacesBar } from './workspaces.js';
import { initGreetingAndFocus } from './clock.js';
import { widgetsManagerPopover } from './canvas.js';
import { computeNewWidgetPosition, renderAllWidgets } from './widgets/manager.js';
import { applyBackground, applyVisualSettings } from './appearance.js';
import { updateWeather } from './weather.js';
import { renderQuote } from './quotes.js';

// ==========================================================================
// 5. BACKUP EXPORT & IMPORT (.JSON) + BROWSER BOOKMARK IMPORT (.HTML)
// ==========================================================================

const backupMenuBtn = document.getElementById('backup-menu-btn');
export const backupPopover = document.getElementById('backup-popover');
const exportJsonBtn = document.getElementById('export-json-btn');
const importJsonInput = document.getElementById('import-json-input');
const importBookmarksInput = document.getElementById('import-bookmarks-input');

function parseNetscapeBookmarksHtml(htmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlText, 'text/html');
  const subgroups = [];
  const looseLinks = [];

  const folders = doc.querySelectorAll('dt > h3');
  folders.forEach((h3) => {
    const folderTitle = (h3.textContent || '').trim() || 'Folder';
    const parentDt = h3.parentElement;
    const dl = parentDt?.querySelector(':scope > dl') || h3.nextElementSibling;
    if (!dl || dl.tagName.toLowerCase() !== 'dl') return;

    const directAnchors = dl.querySelectorAll(':scope > dt > a, :scope > a');
    const items = [];
    directAnchors.forEach((a) => {
      const href = (a.getAttribute('href') || '').trim();
      if (!isSafeLinkUrl(href)) return;
      const title = (a.textContent || '').trim() || extractDomain(href);
      items.push({
        id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: title.slice(0, 48),
        url: href,
      });
    });

    if (items.length > 0) {
      subgroups.push({
        id: `sg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        title: folderTitle.slice(0, 32),
        collapsed: false,
        items,
      });
    }
  });

  // Handle cases with no structured folders or links outside folders
  if (subgroups.length === 0) {
    doc.querySelectorAll('a[href]').forEach((a) => {
      const href = (a.getAttribute('href') || '').trim();
      if (!isSafeLinkUrl(href)) return;
      const title = (a.textContent || '').trim() || extractDomain(href);
      looseLinks.push({
        id: `lnk-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: title.slice(0, 48),
        url: href,
      });
    });
  }

  if (looseLinks.length > 0) {
    subgroups.push({
      id: `sg-${Date.now()}-loose`,
      title: 'Imported Bookmarks',
      collapsed: false,
      items: looseLinks,
    });
  }

  return subgroups;
}

export function initBackupControls() {
  backupMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetsManagerPopover.classList.add('hidden');
    const addWidgetPopover = document.getElementById('add-widget-popover');
    if (addWidgetPopover) addWidgetPopover.classList.add('hidden');
    backupPopover.classList.toggle('hidden');
  });

  exportJsonBtn.addEventListener('click', async () => {
    const exportPayload = structuredClone(state);
    if (exportPayload.background?.customUrl === IDB_MARKER && cachedIdbBgDataUrl) {
      exportPayload.customBgDataUrl = cachedIdbBgDataUrl;
    }

    const dataStr = JSON.stringify(exportPayload, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const dateStr = new Date().toISOString().slice(0, 10);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    backupPopover.classList.add('hidden');
    showToast('✓ JSON backup downloaded successfully!');
  });

  importJsonInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const parsed = JSON.parse(String(ev.target?.result || '{}'));
        if (parsed.customBgDataUrl && typeof parsed.customBgDataUrl === 'string') {
          await saveCustomBgToIDB(parsed.customBgDataUrl);
          delete parsed.customBgDataUrl;
          if (parsed.background) parsed.background.customUrl = IDB_MARKER;
        } else if (parsed.background?.customUrl?.startsWith('data:')) {
          await saveCustomBgToIDB(parsed.background.customUrl);
          parsed.background.customUrl = IDB_MARKER;
        }

        setState(normalizeLoadedState(parsed));
        saveState();

        initGreetingAndFocus();
        applyVisualSettings();
        applyBackground();
        updateWeather();
        renderWorkspacesBar();
        renderAllWidgets();
        renderQuote();

        backupPopover.classList.add('hidden');
        if (lastRemovedUnsafeLinksCount > 0) {
          showToast(
            `✓ Backup imported. ⚠️ ${lastRemovedUnsafeLinksCount} unsafe link(s) were skipped (only http/https allowed).`
          );
        } else {
          showToast('✓ Backup imported and restored successfully!');
        }
      } catch (err) {
        console.error('Invalid JSON file:', err);
        showToast('⚠️ Error: The JSON file is invalid.');
      } finally {
        importJsonInput.value = '';
      }
    };
    reader.readAsText(file);
  });

  if (importBookmarksInput) {
    importBookmarksInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const htmlText = String(ev.target?.result || '');
          const importedSubgroups = parseNetscapeBookmarksHtml(htmlText);

          if (importedSubgroups.length === 0) {
            showToast('⚠️ No valid bookmarks were found in the HTML file.');
            return;
          }

          const totalLinks = importedSubgroups.reduce((acc, sg) => acc + sg.items.length, 0);
          const activeWs = getActiveWorkspace();
          const position = computeNewWidgetPosition();

          activeWs.widgets.push({
            id: `w-links-bm-${Date.now()}`,
            type: 'links',
            title: 'Browser Bookmarks',
            visible: true,
            position: { ...position, width: 410, height: 450 },
            data: {
              viewMode: 'list',
              subgroups: importedSubgroups,
            },
          });

          saveState();
          renderAllWidgets();
          backupPopover.classList.add('hidden');
          showToast(
            `✓ Imported ${totalLinks} links into ${importedSubgroups.length} subgroups!`
          );
        } catch (err) {
          console.error('Error importing bookmarks:', err);
          showToast('⚠️ The bookmark file could not be read.');
        } finally {
          importBookmarksInput.value = '';
        }
      };
      reader.readAsText(file);
    });
  }

  // Auto-Sync Local File (File System Access API)
  const autoSyncConnectBtn = document.getElementById('autosync-connect-btn');
  const autoSyncNowBtn = document.getElementById('autosync-now-btn');
  const autoSyncDisconnectBtn = document.getElementById('autosync-disconnect-btn');

  loadSyncFileHandleFromIDB().then((handle) => {
    if (handle) {
      setAutoSyncFileHandle(handle);
    }
    updateAutoSyncUI();
  });

  if (autoSyncConnectBtn) {
    autoSyncConnectBtn.addEventListener('click', async () => {
      if (typeof window.showSaveFilePicker !== 'function') {
        showToast('⚠️ Auto-Sync requires Edge or Chrome (File System Access API).');
        return;
      }
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName: 'focushub-sync.json',
          types: [
            {
              description: 'FocusHub JSON Sync File',
              accept: { 'application/json': ['.json'] },
            },
          ],
        });
        setAutoSyncFileHandle(handle);
        await saveSyncFileHandleToIDB(handle);
        const ok = await writeAutoSyncFile(true);
        if (ok) {
          showToast(`✓ Auto-Sync connected to “${handle.name}”!`);
        }
      } catch (err) {
        if (err?.name !== 'AbortError') {
          console.warn('Auto-Sync connect error:', err);
          showToast('⚠️ Could not link the sync file.');
        }
      }
    });
  }

  if (autoSyncNowBtn) {
    autoSyncNowBtn.addEventListener('click', async () => {
      const ok = await writeAutoSyncFile(true);
      if (ok) {
        showToast('✓ Synced to linked file!');
      }
    });
  }

  if (autoSyncDisconnectBtn) {
    autoSyncDisconnectBtn.addEventListener('click', async () => {
      await clearSyncFileHandleFromIDB();
      updateAutoSyncUI();
      showToast('Auto-Sync file disconnected.');
    });
  }

  document.addEventListener('click', (e) => {
    if (!backupPopover.contains(e.target) && !backupMenuBtn.contains(e.target)) {
      backupPopover.classList.add('hidden');
    }
  });
}
