import Store from 'electron-store';

const store = new Store({
  defaults: {
    stats: {
      blinkWarnings: 0,
      breakWarnings: 0,
      headTiltWarnings: 0,
      turtleHeadWarnings: 0,
      yawns: 0,
    },
    calibration: {
      eyesToArmsRatio: 0,
      blinkThreshold: 0,
      yawnThreshold: 0,
    },
    startTime: 0,
  },
});

export default store;
