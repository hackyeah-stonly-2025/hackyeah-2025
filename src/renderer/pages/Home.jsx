import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Divider from 'renderer/components/Divider';
import Toast from 'renderer/components/Toast';
import { useToast } from 'renderer/util/useToast';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Flexbox from '../components/Flexbox';
import ExerciseSVG from '../icons/exercise.svg';
import BinocularsSVG from '../icons/binoculars.svg';
import BinocularsSimpleSVG from '../icons/binoculars-simple.svg';
import WaterSVG from '../icons/water.svg';
import EyelidSVG from '../icons/eyelid.svg';
import BreakSVG from '../icons/break.svg';

const Box = styled.div`
  /* padding: 16px; */
`;

const Card = styled(Flexbox)`
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  border-radius: var(--border-radius-2);
  border: 1px solid var(--neutral-180);
`;

const Icon = styled.img`
  align-self: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export default function Home() {
  const { showToast } = useToast();

  return (
    <Box>
      <Flexbox padding={24}>
        <Typography variant="h3">Take a break</Typography>
      </Flexbox>
      <Divider />
      <Flexbox gap={16} padding={24}>
        <Card>
          <Icon width="96px" height="96px" src={ExerciseSVG} />
          <Typography variant="h4">Move your body</Typography>
          <Typography>
            Stand up, stretch, and walk around. Get your blood flowing and shake
            off the stiffness from sitting.
          </Typography>
        </Card>
        <Card>
          <Icon width="96px" height="96px" src={BinocularsSVG} />
          <Typography variant="h4">Rest Your Eyes</Typography>
          <Typography>
            Look at something 20 meters away or close your eyes. Give your eyes
            a break from screen glare.
          </Typography>
        </Card>
        <Card>
          <Icon width="96px" height="96px" src={WaterSVG} />
          <Typography variant="h4">Hydrate & Reset</Typography>
          <Typography>
            Drink water, take deep breaths, and step away mentally. Clear your
            mind for better focus.
          </Typography>
        </Card>
      </Flexbox>
      <Divider />
      <Flexbox padding={24} justifyContent="flex-end" gap={8}>
        <Button
          variant="tertiary"
          onClick={() =>
            showToast("Don't forget to blink!", 'error', EyelidSVG, false)
          }
        >
          Blinking
        </Button>
        <Button
          variant="tertiary"
          onClick={() =>
            showToast(
              "Don't stare - look around!",
              'error',
              BinocularsSimpleSVG,
              true,
            )
          }
        >
          Staring
        </Button>
        <Button
          variant="tertiary"
          onClick={() =>
            showToast(
              "Take a break - you've been staring at your screen for 50 minutes",
              'success',
              BreakSVG,
              true,
            )
          }
        >
          Break
        </Button>
      </Flexbox>
    </Box>
  );
}
