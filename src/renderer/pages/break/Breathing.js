import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import Typography from 'renderer/components/Typography';

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
  background: #ffd6db;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  transition: transform 120ms linear;
`;

const StageLabel = styled(Typography)`
  position: absolute;
  color: #a3434e;
  font-weight: 500;
  font-size: 20px;
`;

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function Breathing({
  size = 320,
  inhale = 3000, // ms
  hold = 1500, // ms
  exhale = 4000, // ms
  minScale = 0.5,
  maxScale = 1.43,
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [stage, setStage] = useState('Get Ready');
  const [elapsed, setElapsed] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const lastPauseRef = useRef(0);

  const total = inhale + hold + exhale;

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

  return (
    <Container>
      <CircleFrame size={size} role="img">
        <InnerCircle size={size} style={{ transform: `scale(${scale})` }} />
        <StageLabel variant="h4">{stage}</StageLabel>
      </CircleFrame>
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
};
