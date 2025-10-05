import { ipcMain, BrowserWindow } from 'electron';
import store from './store';

export function registerStoreHandlers(mainWindow: BrowserWindow) {
  ipcMain.handle('store:get', (_, key) => {
    return store.get(key);
  });

  ipcMain.handle('store:set', (_, key, value) => {
    store.set(key, value);
  });

  ipcMain.handle('store:delete', (_, key) => {
    store.delete(key);
  });

  ipcMain.handle('store:all', () => {
    return store.store; // returns entire object
  });

  // Watchers map (for unsubscribing if you want to extend later)
  const watchedKeys = new Set();

  // Handler for when the renderer requests to watch a specific key
  ipcMain.on('store:watch', (event, key) => {
    if (!watchedKeys.has(key)) {
      watchedKeys.add(key);
      store.onDidChange(key, (newValue: unknown, oldValue: unknown) => {
        mainWindow?.webContents?.send('store:changed', {
          key,
          newValue,
          oldValue,
        });
      });
    }
  });
}
