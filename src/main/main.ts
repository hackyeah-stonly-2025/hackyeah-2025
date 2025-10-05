/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from 'path';
import { execFile, ChildProcess } from 'child_process';
import { registerStoreHandlers } from './storeIpcHandlers';
import store from './store.ts';

// const store = new Store({
//   defaults: {
//     stats: {
//       blinkWarnings: 0,
//       breakWarnings: 0,
//       headTiltWarnings: 0,
//       turtleHeadWarnings: 0,
//     },
//     calibration: {
//       eyesToArmsRatio: 0,
//       blinkThreshold: 0,
//       yawnThreshold: 0,
//     },
//     startTime: 0,
//   },
// });

import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  screen,
  type Display,
} from 'electron';

import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { ImageAnalysisMetrics } from './metrics.types';

let mainWindow: BrowserWindow | null = null;
let notificationWindow: BrowserWindow | null = null;
let videoFeedWindow: BrowserWindow | null = null;
let serverProcess: ChildProcess | null = null;
let isServerStarted: boolean = false;
let lastTenFramesData: ImageAnalysisMetrics[] = [];

let lastTwentyFramesPresence: boolean[] = [];

const updateLastTenFramesData = (data: ImageAnalysisMetrics) => {
  lastTenFramesData.push(data);
  if (lastTenFramesData.length > 10) {
    lastTenFramesData.shift();
  }
};

const updateLastTwentyFramesPresence = (data: ImageAnalysisMetrics) => {
  lastTwentyFramesPresence.push(
    Boolean(data.face_detected || data.metrics.pose.pose_detected),
  );
  if (lastTwentyFramesPresence.length > 20) {
    lastTwentyFramesPresence.shift();
  }
};

const getAverageIsPresent = () => {
  return lastTwentyFramesPresence.reduce((acc, data) => {
    return acc || data;
  }, false);
};

// const getAverageYawn = () => {
//   return lastTenFramesData.slice(0, 3).reduce((acc, data) => {
//     return acc + data.metrics.face.mouth_open_ratio;
//   }, false);
// };

const getAveragedData = () => {
  const averageIsPresent = getAverageIsPresent();
  // const averageYawn = getAverageYawn();

  const averageEyesDistance =
    lastTenFramesData.reduce((acc, data) => {
      return acc + data.metrics.face.eye_to_eye_distance_px;
    }, 0) / lastTenFramesData.length;

  const averageShoulderWidth =
    lastTenFramesData.reduce((acc, data) => {
      return acc + data.metrics.pose.shoulder_width_px;
    }, 0) / lastTenFramesData.length;

  const averageMouthOpenRatio =
    lastTenFramesData.reduce((acc, data) => {
      return acc + data.metrics.face.mouth_open_ratio;
    }, 0) / lastTenFramesData.length;

  const averageHeadTilt =
    lastTenFramesData.reduce((acc, data) => {
      return acc + data.metrics.face.sideways_tilt_deg;
    }, 0) / lastTenFramesData.length;

  const averageEyeOpenness =
    lastTenFramesData.reduce((acc, data) => {
      return acc + data.metrics.face.eye_openness;
    }, 0) / lastTenFramesData.length;

  return {
    averageEyesDistance,
    averageShoulderWidth,
    averageEyeOpenness,
    averageMouthOpenRatio,
    averageHeadTilt,
    averageIsPresent,
    // averageYawn,
  };
};

const getAveragedLastThreeFramesBlink = () => {
  return (
    lastTenFramesData.slice(0, 3).reduce((acc, data) => {
      return acc + (data.metrics.face.is_blink ? 1 : 0);
    }, 0) / 3
  );
};

// Timers/thresholds for behavioral notifications
const NOTIFY_NO_BLINK_MS = 10000; // 20s
const STRAIGHTEN_HEAD_TILT_MS = 15000; // 15s
const MOVE_AWAY_PRESENT_MS = 30000; // 30s
const HEAD_TILT_DEG_THRESHOLD = 12; // degrees
const TURTLE_HEAD_MS = 3000; // 15s
const NOTIFY_YAWNING_MS = 1500; // 15s

let lastBlinkAt: number | null = null;
let headTiltStartAt: number | null = null;
let presenceStartAt: number | null = null;
let turtleHeadStartAt: number | null = null;
let yawnStartAt: number | null = null;

// const calibrationState = {
//   eyesToArmsRatio: 0,
//   blinkThreshold: 0,
//   yawnThreshold: 0,
// };

ipcMain.on('calibrate-posture', async (event) => {
  const averagedData = getAveragedData();
  store.set(
    'calibration.eyesToArmsRatio',
    averagedData.averageEyesDistance / averagedData.averageShoulderWidth,
  );
  // calibrationState.eyesToArmsRatio =
  //   averagedData.averageEyesDistance / averagedData.averageShoulderWidth;
});

ipcMain.on('calibrate-blink', async (event) => {
  const averagedData = getAveragedData();
  store.set('calibration.blinkThreshold', averagedData.averageEyeOpenness);
  // calibrationState.blinkThreshold = averagedData.averageEyeOpenness;
});

ipcMain.on('calibrate-yawn', async (event) => {
  const averagedData = getAveragedData();
  store.set('calibration.yawnThreshold', averagedData.averageMouthOpenRatio);
  // calibrationState.yawnThreshold = averagedData.averageMouthOpenRatio;
});

const processCurrentData = (data: ImageAnalysisMetrics) => {
  const calibrationState = store.get('calibration');

  const averagedData = getAveragedData();
  const now = Date.now();
  const { face, pose } = data.metrics;

  const isPresent = averagedData.averageIsPresent;
  const isTurtleCalibrated = !!calibrationState.eyesToArmsRatio;

  // Track presence duration
  if (isPresent) {
    if (presenceStartAt == null) {
      presenceStartAt = now;
    }
  } else {
    presenceStartAt = null;
  }

  // Track yawn time
  if (
    calibrationState.yawnThreshold &&
    averagedData.averageMouthOpenRatio >
      Number(calibrationState.yawnThreshold) - 0.15
  ) {
    yawnStartAt = now;
  } else {
    yawnStartAt = null;
  }

  // Track last blink time
  if (face.is_blink) {
    lastBlinkAt = now;
  }

  // Determine if head is tilted beyond threshold
  const sidewaysTilt = Math.abs(averagedData.averageHeadTilt);
  // const shoulderLineTilt = Math.abs(pose.shoulder_line_tilt_deg);
  const isHeadTilted = sidewaysTilt > HEAD_TILT_DEG_THRESHOLD;

  // Track head tilt duration
  if (isPresent && isHeadTilted) {
    if (headTiltStartAt == null) {
      headTiltStartAt = now;
    }
  } else {
    headTiltStartAt = null;
  }

  const averageEyesToArmsRatio =
    averagedData.averageEyesDistance / averagedData.averageShoulderWidth;
  const averageTurtleToCalibratedRatio =
    averageEyesToArmsRatio / calibrationState.eyesToArmsRatio;

  console.log('averageTurtleToCalibratedRatio', averageTurtleToCalibratedRatio);

  if (isTurtleCalibrated && averageTurtleToCalibratedRatio > 1.1) {
    if (turtleHeadStartAt == null) {
      turtleHeadStartAt = now;
    }
  } else {
    turtleHeadStartAt = null;
  }

  const hasBeenPresentMs = presenceStartAt != null ? now - presenceStartAt : 0;
  const hasHeadTiltedMs = headTiltStartAt != null ? now - headTiltStartAt : 0;
  const msSinceYawning = yawnStartAt != null ? now - yawnStartAt : 0;
  const msSinceLastBlink = lastBlinkAt != null ? now - lastBlinkAt : Infinity;
  const msSinceTurtleHead =
    turtleHeadStartAt != null ? now - turtleHeadStartAt : 0;

  const shouldNotifyAboutBlinking =
    isPresent && msSinceLastBlink > NOTIFY_NO_BLINK_MS;
  const shouldNotifyAboutYawning =
    isPresent && msSinceYawning > NOTIFY_YAWNING_MS;
  const shouldStraightenTheirHead =
    isPresent && hasHeadTiltedMs > STRAIGHTEN_HEAD_TILT_MS;
  const shouldMoveAwayFromTheComputer =
    isPresent && hasBeenPresentMs > MOVE_AWAY_PRESENT_MS;
  const shouldNotifyAboutTurtleHead =
    isPresent && msSinceTurtleHead > TURTLE_HEAD_MS;

  console.log('notifications', {
    shouldNotifyAboutBlinking,
    shouldMoveAwayFromTheComputer,
    shouldStraightenTheirHead,
    shouldNotifyAboutTurtleHead,
    shouldNotifyAboutYawning,
  });

  return {
    shouldNotifyAboutBlinking,
    shouldMoveAwayFromTheComputer,
    shouldStraightenTheirHead,
    shouldNotifyAboutTurtleHead,
    shouldNotifyAboutYawning,
  };
};

const notificationsState = {
  hasNotifiedAboutBlinking: false,
  hasNotifiedAboutMovingAwayFromTheComputer: false,
  hasNotifiedAboutStraighteningTheirHead: false,
  hasNotifiedAboutTurtleHead: false,
  hasNotifiedAboutYawning: false,
};

ipcMain.on('video-data', async (event, imageData) => {
  const image = Buffer.from(imageData.data);
  const blob = new Blob([image], { type: imageData.type });

  const formData = new FormData();
  formData.append('image', blob);
  fetch('http://localhost:8765/analyze', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      const stats = store.get('stats');

      updateLastTenFramesData(data);
      updateLastTwentyFramesPresence(data);
      // handleUserMetrics(data);

      const {
        shouldNotifyAboutBlinking,
        shouldMoveAwayFromTheComputer,
        shouldStraightenTheirHead,
        shouldNotifyAboutTurtleHead,
        shouldNotifyAboutYawning,
      } = processCurrentData(data);

      if (shouldNotifyAboutBlinking) {
        if (!notificationsState.hasNotifiedAboutBlinking) {
          notificationsState.hasNotifiedAboutBlinking = true;
          notificationWindow?.webContents.send('notification', {
            type: 'blink',
          });
          store.set('stats.blinkWarnings', (stats.blinkWarnings || 0) + 1);
        }
      } else {
        notificationsState.hasNotifiedAboutBlinking = false;
      }

      if (shouldMoveAwayFromTheComputer) {
        if (!notificationsState.hasNotifiedAboutMovingAwayFromTheComputer) {
          notificationsState.hasNotifiedAboutMovingAwayFromTheComputer = true;
          notificationWindow?.webContents.send('notification', {
            type: 'break',
          });
          store.set('stats.breakWarnings', (stats.breakWarnings || 0) + 1);
        }
      } else {
        notificationsState.hasNotifiedAboutMovingAwayFromTheComputer = false;
      }

      if (shouldStraightenTheirHead) {
        if (!notificationsState.hasNotifiedAboutStraighteningTheirHead) {
          notificationsState.hasNotifiedAboutStraighteningTheirHead = true;
          notificationWindow?.webContents.send('notification', {
            type: 'straightenHead',
          });
          store.set(
            'stats.headTiltWarnings',
            (stats.headTiltWarnings || 0) + 1,
          );
        }
      } else {
        notificationsState.hasNotifiedAboutStraighteningTheirHead = false;
      }

      if (shouldNotifyAboutTurtleHead) {
        if (!notificationsState.hasNotifiedAboutTurtleHead) {
          notificationsState.hasNotifiedAboutTurtleHead = true;
          notificationWindow?.webContents.send('notification', {
            type: 'turtleHead',
          });
          store.set(
            'stats.turtleHeadWarnings',
            (stats.turtleHeadWarnings || 0) + 1,
          );
        }
      } else {
        notificationsState.hasNotifiedAboutTurtleHead = false;
      }

      if (shouldNotifyAboutYawning) {
        if (!notificationsState.hasNotifiedAboutYawning) {
          notificationsState.hasNotifiedAboutYawning = true;
          notificationWindow?.webContents.send('notification', {
            type: 'yawn',
          });
          store.set('stats.yawns', (stats.yawns || 0) + 1);
        }
      } else {
        notificationsState.hasNotifiedAboutYawning = false;
      }
    });
});

ipcMain.on('is-recognition-server-started', async (event) => {
  if (isServerStarted) {
    mainWindow?.webContents.send('recognition-server-started');
  }
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  // require('electron-debug').default();
}

const startRecognitionServer = () => {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow?.webContents.send('log', 'Starting recognition server...');
  mainWindow?.webContents.send('log', `${__dirname}/peakyblinkers`);
  serverProcess = execFile(getAssetPath('peakyblinkers'), [
    'serve',
    '--host',
    '127.0.0.1',
    '--port',
    '8765',
  ]);
  serverProcess.on('error', (error) => {
    console.error(error);
  });
  // serverProcess.stdout?.on('data', (data) => {
  // });
  serverProcess.stderr?.on('data', (data) => {
    console.error('stderr', data);
    if (data.includes('Application startup complete')) {
      isServerStarted = true;
      mainWindow?.webContents.send('recognition-server-started');
    }
  });
};

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createVideoFeedWindow = () => {
  videoFeedWindow = new BrowserWindow({
    width: 1,
    height: 1,
    frame: false,
    alwaysOnTop: true,
    show: true,
    transparent: false,
    x: 0,
    y: 0,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  videoFeedWindow.setIgnoreMouseEvents(true);
  videoFeedWindow.loadURL(
    `${resolveHtmlPath('index.html')}?pathname=/video-feed`,
  );
};

const createNotificationWindow = (display: Display) => {
  notificationWindow = new BrowserWindow({
    width: display.workArea.width,
    height: display.workArea.height,
    frame: false,
    alwaysOnTop: true,
    show: true,
    transparent: true,
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });
  notificationWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  });
  notificationWindow.setIgnoreMouseEvents(true);
  notificationWindow.loadURL(
    `${resolveHtmlPath('index.html')}?pathname=/notifications`,
  );
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(`${resolveHtmlPath('index.html')}?pathname=/`);

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  return mainWindow;
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    serverProcess?.kill();
    app.quit();
  }
});

app
  .whenReady()
  .then(async () => {
    const mainWindow = await createWindow();
    registerStoreHandlers(mainWindow);

    store.set('startTime', Date.now());
    startRecognitionServer();
    createVideoFeedWindow();

    const primaryDisplay = screen.getPrimaryDisplay();
    createNotificationWindow(primaryDisplay);

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
      if (notificationWindow === null) createNotificationWindow(primaryDisplay);
    });
  })
  .catch(console.log);
