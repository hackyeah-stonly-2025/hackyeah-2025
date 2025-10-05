// import { state } from './main';

import { ImageAnalysisMetrics } from './metrics.types';

const state = {
  timeSinceLastBlink: 0,
  timeSinceLastYawn: 0,
  timeSinceLastBreak: 0,
};

export const handleUserMetrics = (metrics: UserMetrics) => {
  // const { face, pose } = metrics.metrics;
  // const { is_blink, is_yawn } = face;
  // const { pose_detected } = pose;
  // if (is_blink) {
  //   return 'blink';
  // }

  const shouldTriggerBlinkWarning =
    !metrics.metrics.face.is_blink && state.timeSinceLastBlink > 10000;

  return {
    shouldTriggerBlinkWarning,
  };
};
