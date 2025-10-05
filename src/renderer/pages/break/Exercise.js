import React, { useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Typography from 'renderer/components/Typography';
import Flexbox from 'renderer/components/Flexbox';
import Exercise1 from 'renderer/images/exercise1.jpg';
import Exercise2 from 'renderer/images/exercise2.jpg';
import Exercise3 from 'renderer/images/exercise3.jpg';
import Exercise4 from 'renderer/images/exercise4.jpg';
import Exercise5 from 'renderer/images/exercise5.jpg';
import Exercise6 from 'renderer/images/exercise6.jpg';
import Button from 'renderer/components/Button';

const Box = styled(Flexbox)`
  position: relative;
  width: 100%;
`;

const Img = styled.img`
  display: block;
  margin: 0 auto;
  border-radius: 8px;
  max-width: 100%;
  height: auto;
`;

const ButtonStyled = styled(Button)`
  position: absolute;
  top: 50%;
  z-index: var(--z-index-0);

  ${({ position }) => {
    if (position === 'left') return 'left: 0;';
    if (position === 'right') return 'right: 0;';
  }}
`;

const exercises = [
  {
    title: 'Neck Rolls',
    description: 'Slowly roll your head in a circle, 5 times each direction.',
    image: Exercise1,
  },
  {
    title: 'Shoulder Shrugs',
    description:
      'Lift shoulders to ears, hold for 3 seconds, release. Repeat 10 times.',
    image: Exercise2,
  },
  {
    title: 'Wrist Circles',
    description: 'Rotate wrists clockwise and counterclockwise, 10 times each.',
    image: Exercise3,
  },
  {
    title: 'Standing Back Stretch',
    description:
      'Stand up, clasp hands overhead, and lean gently side to side. Hold each side for 15 seconds.',
    image: Exercise4,
  },
  {
    title: 'Calf Raises',
    description:
      'Stand and rise up on your toes, hold 2 seconds, lower down. Do 15 reps.',
    image: Exercise5,
  },
  {
    title: 'Torso Twists',
    description:
      'Sit or stand, hands on hips, twist gently left and right. Do 10 each side.',
    image: Exercise6,
  },
];

function Exercise({ className }) {
  const [index, setIndex] = useState(0);

  return (
    <Box className={className} gap={8} flexDirection="column">
      <ButtonStyled
        variant="tertiary"
        size="medium"
        icon="arrow_back"
        onClick={() => setIndex((i) => i - 1)}
        position="left"
        disabled={index === 0}
      />
      <Img
        src={exercises[index].image}
        alt={exercises[index].title}
        width={240}
      />
      <Flexbox
        flexDirection="column"
        gap={8}
        style={{ width: '380px' }}
        marginX="auto"
      >
        <Typography variant="h4">
          {index + 1}. {exercises[index].title}
        </Typography>
        <Typography>{exercises[index].description}</Typography>
      </Flexbox>
      <ButtonStyled
        variant="tertiary"
        size="medium"
        icon="arrow_forward"
        onClick={() => setIndex((i) => i + 1)}
        position="right"
        disabled={index === exercises.length - 1}
      />
    </Box>
  );
}

Exercise.propTypes = {
  className: T.string,
};

export default Exercise;
