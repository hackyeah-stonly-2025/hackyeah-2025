// import React from 'react';
// import styled from 'styled-components';
// import BreatheGIF from 'renderer/icons/breathe.gif';

// const Box = styled.div`
//   width: 100%;
// `;

// const Img = styled.img`
//   display: block;
//   margin: 0 auto;
// `;

// function Breathing({ className }) {
//   return (
//     <Box className={className}>
//       <Img src={BreatheGIF} alt="Guided Breathing Animation" width={360} />
//     </Box>
//   );
// }

// Breathing.propTypes = {
//   className: T.string,
// };

// export default Breathing;

import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import T from 'prop-types';

// Breathing.jsx
// Default-exported React component using styled-components.
// - Inner circle gently scales (breath in/out)
// - SVG outline shows progress around the circle
// - JS-driven animation so phases (inhale / hold / exhale) can have different durations

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  width: 400px;
  margin: 0 auto;
`;

const CircleFrame = styled.div`
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  display: grid;
  place-items: center;
  position: relative;
`;

const InnerCircle = styled.div`
  width: calc(${(p) => p.size}px * 0.6);
  height: calc(${(p) => p.size}px * 0.6);
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(122, 199, 144, 0.32),
    rgba(122, 199, 144, 0.42)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  transition: transform 120ms linear;
  box-shadow: 0 6px 18px rgba(48, 63, 79, 0.08);
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  transform: rotate(-90deg); /* start at top */
  overflow: visible;
`;

const OutlineBg = styled.circle`
  fill: none;
  stroke: rgba(0, 0, 0, 0.06);
  stroke-width: 8;
`;

const Outline = styled.circle`
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  /* stroke color uses a soft green */
  stroke: #7ac790;
  transition: stroke-dashoffset 80ms linear;
`;

const Controls = styled.div`
  display: flex;
  gap: 8px;
`;

const Button = styled.button`
  background: ${(p) => (p.primary ? '#7ac790' : 'transparent')};
  color: ${(p) => (p.primary ? 'white' : '#2b2b2b')};
  border: 1px solid rgba(43, 43, 43, 0.06);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  box-shadow: ${(p) =>
    p.primary ? '0 6px 12px rgba(122,199,144,0.12)' : 'none'};
`;

// easing helper
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function Breathing({
  size = 220,
  inhale = 4000, // ms
  hold = 2000, // ms
  exhale = 4000, // ms
  minScale = 0.75,
  maxScale = 1.12,
  showControls = true,
  startAutomatically = false,
}) {
  const total = inhale + hold + exhale;
  const r = (size * 0.9) / 2 - 4; // radius for SVG circle, account for stroke
  const circumference = 2 * Math.PI * r;

  const [isPlaying, setIsPlaying] = useState(Boolean(startAutomatically));
  const [stage, setStage] = useState('Ready'); // "Inhale", "Hold", "Exhale"
  const [elapsed, setElapsed] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const lastPauseRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) {
      cancelAnimationFrame(rafRef.current);
      startRef.current = null;
      return;
    }

    function tick(ts) {
      if (!startRef.current) startRef.current = ts - lastPauseRef.current;
      const localElapsed = ts - startRef.current;
      const cycleElapsed = localElapsed % total;
      setElapsed(cycleElapsed);

      // determine stage
      if (cycleElapsed < inhale) setStage('Inhale');
      else if (cycleElapsed < inhale + hold) setStage('Hold');
      else setStage('Exhale');

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isPlaying, inhale, hold, exhale, total]);

  // compute scale based on phase and easing
  const getScale = () => {
    const t = elapsed;
    if (t < inhale) {
      // inhale: 0 -> 1
      const p = t / inhale;
      return minScale + (maxScale - minScale) * easeInOutQuad(p);
    }
    if (t < inhale + hold) {
      // hold: keep at maxScale
      return maxScale;
    }
    // exhale: 0 -> 1 over exhale duration, return from maxScale to minScale
    const p = (t - inhale - hold) / exhale;
    return maxScale - (maxScale - minScale) * easeInOutQuad(p);
  };

  const scale = getScale();
  const progress = elapsed / total; // 0..1 progress around outline
  const dashOffset = Math.max(0, circumference * (1 - progress));

  function toggle() {
    if (isPlaying) {
      // pause
      setIsPlaying(false);
      lastPauseRef.current = performance.now() - (startRef.current ?? 0);
    } else {
      // start/resume
      setIsPlaying(true);
    }
  }

  function reset() {
    setIsPlaying(false);
    setElapsed(0);
    startRef.current = null;
    lastPauseRef.current = 0;
    setStage('Ready');
  }

  return (
    <Container>
      <CircleFrame
        size={size}
        role="img"
        aria-label={`Guided breathing circle. Phase: ${stage}`}
      >
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <OutlineBg cx={size / 2} cy={size / 2} r={r} />
          <Outline
            cx={size / 2}
            cy={size / 2}
            r={r}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </Svg>

        <InnerCircle size={size} style={{ transform: `scale(${scale})` }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700 }}>
              {stage === 'Ready' ? 'Get Ready' : null}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
              {Math.ceil((total - elapsed) / 1000)}s
            </div>
          </div>
        </InnerCircle>
      </CircleFrame>

      {showControls && (
        <Controls>
          <Button primary onClick={toggle}>
            {isPlaying ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={reset}>Reset</Button>
        </Controls>
      )}
    </Container>
  );
}

Breathing.propTypes = {
  size: T.number,
  inhale: T.number,
  hold: T.number,
  exhale: T.number,
  minScale: T.number,
  maxScale: T.number,
  showControls: T.bool,
  startAutomatically: T.bool,
};
