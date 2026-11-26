import { IDB_MARKER, IDB_STORE, IDB_SYNC_HANDLE_KEY } from '../constants.js';
import { cachedIdbBgDataUrl, openAssetsDB } from './idb.js';
import { state } from '../state.js';

let autoSyncFileHandle = null;
let autoSyncDebounceTimer = null;

export async function saveSyncFileHandleToIDB(handle) {
  try {
    const db = await openAssetsDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(handle, IDB_SYNC_HANDLE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch (err) {
    console.warn('Could not save sync file handle to IndexedDB:', err);
  }
}

export async function loadSyncFileHandleFromIDB() {
  try {
    const db = await openAssetsDB();
    const val = await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(IDB_SYNC_HANDLE_KEY);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return val;
  } catch {
    return null;
  }
}

export async function clearSyncFileHandleFromIDB() {
  autoSyncFileHandle = null;
  try {
    const db = await openAssetsDB();
    await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_SYNC_HANDLE_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
    db.close();
  } catch {
    // Ignore
  }
}

function buildExportPayloadObject() {
  const exportPayload = structuredClone(state);
  if (exportPayload.background?.customUrl === IDB_MARKER && cachedIdbBgDataUrl) {
    exportPayload.customBgDataUrl = cachedIdbBgDataUrl;
  }
  return exportPayload;
}

export function updateAutoSyncUI(statusText = null) {
  const badge = document.getElementById('autosync-status-badge');
  const textEl = document.getElementById('autosync-status-text');
  const connectBtn = document.getElementById('autosync-connect-btn');
  const nowBtn = document.getElementById('autosync-now-btn');
  const disconnectBtn = document.getElementById('autosync-disconnect-btn');
  if (!badge || !textEl || !connectBtn) return;

  if (autoSyncFileHandle) {
    badge.textContent = 'Linked';
    badge.className = 'text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent-500/25 text-accent-300';
    textEl.textContent = statusText || `Linked to “${autoSyncFileHandle.name}”. Changes auto-save here.`;
    connectBtn.innerHTML = '<span>🔄 Change File</span>';
    if (nowBtn) nowBtn.classList.remove('hidden');
    if (disconnectBtn) disconnectBtn.classList.remove('hidden');
  } else {
    badge.textContent = 'Off';
    badge.className = 'text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/60';
    textEl.textContent =
      statusText ||
      'Link a local .json file (e.g. in OneDrive) to auto-save every change across browsers.';
    connectBtn.innerHTML = '<span>🔗 Connect File</span>';
    if (nowBtn) nowBtn.classList.add('hidden');
    if (disconnectBtn) disconnectBtn.classList.add('hidden');
  }
}

export async function writeAutoSyncFile(requestPermission = false) {
  if (!autoSyncFileHandle) return false;
  try {
    let perm = await autoSyncFileHandle.queryPermission({ mode: 'readwrite' });
    if (perm !== 'granted' && requestPermission) {
      perm = await autoSyncFileHandle.requestPermission({ mode: 'readwrite' });
    }
    if (perm !== 'granted') {
      updateAutoSyncUI(`Linked to “${autoSyncFileHandle.name}” — click Sync to grant write access.`);
      return false;
    }
    const writable = await autoSyncFileHandle.createWritable();
    await writable.write(JSON.stringify(buildExportPayloadObject(), null, 2));
    await writable.close();
    const timeStr = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    updateAutoSyncUI(`Synced to “${autoSyncFileHandle.name}” at ${timeStr}`);
    return true;
  } catch (err) {
    console.warn('Auto-sync write failed:', err);
    return false;
  }
}

export function scheduleAutoSyncWrite() {
  if (!autoSyncFileHandle) return;
  if (autoSyncDebounceTimer) clearTimeout(autoSyncDebounceTimer);
  autoSyncDebounceTimer = setTimeout(() => {
    autoSyncDebounceTimer = null;
    writeAutoSyncFile(false);
  }, 800);
}

export function setAutoSyncFileHandle(handle) {
  autoSyncFileHandle = handle;
}
