import styled from 'styled-components';
import Divider from 'renderer/components/Divider';
import { useState } from 'react';
import Button from 'renderer/components/Button';
import Timer from 'renderer/components/Timer';
import Typography from '../components/Typography';
import Flexbox from '../components/Flexbox';
import ExerciseSVG from '../icons/exercise.svg';
import BreatheSVG from '../icons/breathe.svg';
import WaterSVG from '../icons/water.svg';
import Exercise from './break/Exercise';
import Breathing from './break/Breathing';
import Water from './break/Water';

const Box = styled.div`
  width: 800px;
`;

const Card = styled(Flexbox)`
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  border-radius: var(--border-radius-2);
  border: 1px solid var(--neutral-180);
  width: 33%;
  cursor: pointer;

  &:hover {
    background-color: var(--neutral-190);
  }
`;

const Icon = styled.img`
  align-self: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export default function BreakModalContent() {
  const [breakType, setBreakType] = useState(null);

  return (
    <Box>
      <Flexbox padding={24} justifyContent="space-between" alignItems="center">
        <Typography variant="h3">Take a break</Typography>
        <Typography variant="mono">
          <Timer value={10} />
        </Typography>
      </Flexbox>
      <Divider />
      <Flexbox gap={16} padding={24}>
        {!breakType && (
          <>
            <Card onClick={() => setBreakType('exercise')}>
              <Icon width="96px" height="96px" src={ExerciseSVG} />
              <Typography variant="h4">Move & Stretch</Typography>
              <Typography>
                Step away from your desk for a quick stretch and light movement
                to refresh your body and improve posture.
              </Typography>
            </Card>
            <Card onClick={() => setBreakType('breathing')}>
              <Icon width="96px" height="96px" src={BreatheSVG} />
              <Typography variant="h4">Guided Breathing</Typography>
              <Typography>
                Follow a calm animation that helps you breathe deeply, relax
                your eyes, and clear your mind in under two minutes.
              </Typography>
            </Card>
            <Card onClick={() => setBreakType('water')}>
              <Icon width="96px" height="96px" src={WaterSVG} />
              <Typography variant="h4">Quick Water Break</Typography>
              <Typography>
                Take a moment to hydrate — give your body and brain a boost with
                a quick water break.
              </Typography>
            </Card>
          </>
        )}
        {breakType === 'exercise' && <Exercise />}
        {breakType === 'breathing' && <Breathing />}
        {breakType === 'water' && <Water />}
      </Flexbox>
      {breakType && (
        <Flexbox padding={24} marginTop="auto">
          <Button variant="tertiary" onClick={() => setBreakType(null)}>
            Back
          </Button>
        </Flexbox>
      )}
    </Box>
  );
}
