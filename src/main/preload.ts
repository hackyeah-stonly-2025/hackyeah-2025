// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example' | 'video-data' | 'notification';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

const storeHandler = {
  get: (key: string) => ipcRenderer.invoke('store:get', key),
  set: (key: string, value: unknown) =>
    ipcRenderer.invoke('store:set', key, value),
  delete: (key: string) => ipcRenderer.invoke('store:delete', key),
  all: () => ipcRenderer.invoke('store:all'),
  onDidChange: (
    key: string,
    callback: (newValue: unknown, oldValue: unknown) => void,
  ) => {
    ipcRenderer.send('store:watch', key);

    const listener = (
      _: IpcRendererEvent,
      data: { key: string; newValue: unknown; oldValue: unknown },
    ) => {
      if (data.key === key) {
        callback(data.newValue, data.oldValue);
      }
    };

    ipcRenderer.on('store:changed', listener);

    // Return unsubscribe function
    return () => ipcRenderer.removeListener('store:changed', listener);
  },
};

contextBridge.exposeInMainWorld('electronStore', storeHandler);
contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
