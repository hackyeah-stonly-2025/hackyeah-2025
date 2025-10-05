// import styled from 'styled-components';

import { useEffect } from 'react';
import { useToast } from 'renderer/util/useToast';

// import ExerciseSVG from '../icons/exercise.svg';
// import BinocularsSVG from '../icons/binoculars.svg';
import HeadTiltSVG from '../icons/head-tilt.svg';
import BinocularsSimpleSVG from '../icons/binoculars-simple.svg';
import EyelidSVG from '../icons/eyelid.svg';
import BreakSVG from '../icons/break.svg';
// import TurtleHeadSVG from '../icons/head-tilt.svg';

const iconMap = {
  blink: EyelidSVG,
  stare: BinocularsSimpleSVG,
  break: BreakSVG,
  straightenHead: HeadTiltSVG,
  turtleHead: HeadTiltSVG,
};

const variantMap = {
  blink: 'error',
  stare: 'error',
  break: 'success',
  straightenHead: 'error',
  turtleHead: 'error',
};

const labelMap = {
  blink: "Don't forget to blink!",
  stare: "Don't stare - look around!",
  break: "Take a break - you've been staring at your screen for some time!",
  straightenHead: "Straighten your head - it's tilted!",
  turtleHead: "Don't be a turtle, straighten your back!",
};

export default function Notifications() {
  const { showToast } = useToast();

  // useEffect(() => {
  //   setTimeout(() => {
  //     showToast(labelMap.blink, variantMap.blink, iconMap.blink, true);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    const unsubscribe = window.electron?.ipcRenderer.on(
      'notification',
      (data) => {
        const { type } = data;
        // eslint-disable-next-line no-console
        showToast(labelMap[type], variantMap[type], iconMap[type], true);
      },
    );
    return () => unsubscribe();
  }, [showToast]);

  return <style>{`body { background-color: transparent; }`}</style>;
}
