import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Typography from 'renderer/components/Typography';

const Box = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 460px;
`;

const WaterRoundContainer = styled.div`
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 24px;
  animation: water-waves linear infinite;
`;
const Wave1 = styled.div`
  position: absolute;
  top: 40%;
  left: -25%;
  background: #bad5e9;
  opacity: 0.7;
  width: 200%;
  height: 200%;
  border-radius: 40%;
  animation: inherit;
  animation-duration: 8s;
`;

const Wave2 = styled.div`
  position: absolute;
  top: 45%;
  left: -35%;
  background: #a3c7e1;
  opacity: 0.5;
  width: 200%;
  height: 200%;
  border-radius: 35%;
  animation: inherit;
  animation-duration: 10s;
`;

const Wave3 = styled.div`
  position: absolute;
  top: 50%;
  left: -35%;
  background: #8cb9da;
  opacity: 0.3;
  width: 200%;
  height: 200%;
  border-radius: 33%;
  animation: inherit;
  animation-duration: 15s;

  @keyframes water-waves {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const funFacts = [
  'Hydration is directly correlated with a person’s ability to concentrate',
  'The human body is made up of approximately 60% water',
  'Staying hydrated can improve cognitive function and concentration',
  'Water is essential for maintaining healthy skin and can help reduce the appearance of wrinkles',
  'Proper hydration can improve physical performance during exercise and reduce fatigue',
  'Waiting until you are thirsty is not the best indicator to let you know that you are dehydrated',
];

function Water({ className }) {
  return (
    <Box className={className}>
      <WaterRoundContainer>
        <Wave1 />
        <Wave2 />
        <Wave3 />
      </WaterRoundContainer>
      <Typography variant="body1">
        {funFacts[Math.floor(Math.random() * funFacts.length)]}
      </Typography>
    </Box>
  );
}

Water.propTypes = {
  className: T.string,
};

export default Water;
