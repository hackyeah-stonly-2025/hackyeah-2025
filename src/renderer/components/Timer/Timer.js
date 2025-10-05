import React, { useEffect, useRef, useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { useTimer } from 'react-timer-hook';
import Typography from '../Typography';
import Flexbox from '../Flexbox';

const Box = styled(Flexbox)`
  /* background: var(--neutral-200);
  box-shadow: var(--shadow-2);
  border-radius: var(--border-radius-2);
  overflow: hidden;
  position: fixed;
  right: 16px;
  bottom: ${({ index }) => 16 + 64 + index * (120 + 16)}px;
  z-index: var(--z-index-above); */
`;

const Time = styled(Typography)``;

function Timer({ className, value = 1 }) {
  // const [isGoingOff, setIsGoingOff] = useState(false);

  const time = new Date();
  time.setSeconds(time.getSeconds() + value * 60);
  const expiryTimestamp = time;

  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    autoStart: true,
    // onExpire: () => setIsGoingOff(true),
  });

  // const audioRef = useRef();

  // useEffect(() => {
  //   if (isGoingOff) {
  //     audioRef.current.play();
  //   } else {
  //     audioRef.current.pause();
  //     audioRef.current.currentTime = 0;
  //   }
  // }, [isGoingOff]);

  return (
    <Box className={className} flexDirection="column">
      <Flexbox alignItems="center" gap={8} padding={8}>
        <Time variant="mono">
          {days > 0 && <>{days.toString().padStart(2, '0')}:</>}
          {value >= 60 && <>{hours.toString().padStart(2, '0')}:</>}
          {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </Time>
      </Flexbox>
    </Box>
  );
}

Timer.propTypes = {
  className: T.string,
  value: T.number,
};

export default Timer;
