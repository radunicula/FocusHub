import { IDB_BG_KEY, IDB_NAME, IDB_STORE } from '../constants.js';

// ==========================================================================
// 0. INDEXEDDB FOR LOCAL BACKGROUNDS (WITHOUT THE 5 MB LIMIT)
// ==========================================================================

export let cachedIdbBgDataUrl = '';

export function openAssetsDB() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is unavailable'));
      return;
    }
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveCustomBgToIDB(dataUrl) {
  cachedIdbBgDataUrl = dataUrl || '';
  try {
    const db = await openAssetsDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(dataUrl, IDB_BG_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  } catch (err) {
    console.warn('Could not save image to IndexedDB:', err);
  }
}

export async function loadCustomBgFromIDB() {
  try {
    const db = await openAssetsDB();
    const val = await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const getReq = tx.objectStore(IDB_STORE).get(IDB_BG_KEY);
      getReq.onsuccess = () => resolve(getReq.result || '');
      getReq.onerror = () => reject(getReq.error);
    });
    db.close();
    cachedIdbBgDataUrl = typeof val === 'string' ? val : '';
    return cachedIdbBgDataUrl;
  } catch {
    return '';
  }
}

export async function clearCustomBgFromIDB() {
  cachedIdbBgDataUrl = '';
  try {
    const db = await openAssetsDB();
    await new Promise((resolve) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_BG_KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
    db.close();
  } catch {
    // Ignore
  }
}
