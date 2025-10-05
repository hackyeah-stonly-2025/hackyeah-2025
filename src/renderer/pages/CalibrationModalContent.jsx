import styled from 'styled-components';
import Divider from 'renderer/components/Divider';
import Accordion from 'renderer/components/Accordion';
import { useState } from 'react';
import T from 'prop-types';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Flexbox from '../components/Flexbox';

import CalibrationModelImg from '../images/calibration-model.jpg';

const Box = styled.div`
  width: 800px;
`;

const Img = styled.img`
  object-fit: cover;
  border-radius: 50%;
  margin-top: 24px;
`;

const Steps = styled(Flexbox)`
  flex: 1;
`;

export default function CalibrationModalContent({ onClose }) {
  const [completedSteps, setCompletedSteps] = useState(0);

  return (
    <Box>
      <Flexbox padding={24}>
        <Typography variant="h3">Calibrate</Typography>
      </Flexbox>
      <Divider />
      <Flexbox gap={32} padding={24}>
        <Img
          src={CalibrationModelImg}
          alt="Calibration Model"
          width="220px"
          height="220px"
        />
        <Steps flexDirection="column" gap={8}>
          <Typography variant="h4" marginY={12}>
            Calibrate your facial expressions
          </Typography>

          <Accordion
            label="1. Frame Your Face"
            isComplete={completedSteps > 0}
            isExpanded={completedSteps === 0}
          >
            <Typography>
              Position your face within the frame so it`s clearly visible and
              centered. Make sure there`s adequate lighting and your entire face
              fits comfortably in the camera view.
            </Typography>
          </Accordion>
          <Accordion
            label="2. Blink Detection"
            isComplete={completedSteps > 1}
            isExpanded={completedSteps === 1}
          >
            <Typography>
              Blink naturally a few times so the system can detect and recognize
              your eye movements. This helps distinguish between active
              engagement and simply being present.
            </Typography>
          </Accordion>
          <Accordion
            label="3. Yawn Recognition"
            isComplete={completedSteps > 2}
            isExpanded={completedSteps === 2}
          >
            <Typography>
              Open your mouth wide as if yawning. This calibrates the system to
              detect fatigue signals and recognize when you might need a break
              from screen time.
            </Typography>
          </Accordion>
        </Steps>
      </Flexbox>

      <Divider />
      <Button
        variant="tertiary"
        onClick={() => setCompletedSteps((steps) => steps + 1)}
      >
        Next
      </Button>

      <Flexbox padding={24} justifyContent="flex-end" gap={8}>
        {completedSteps < 3 ? (
          <Button variant="tertiary" onClick={() => setCompletedSteps(3)}>
            Skip
          </Button>
        ) : (
          <>
            <Button onClick={() => setCompletedSteps(0)} variant="tertiary">
              Recalibrate
            </Button>
            <Button onClick={onClose}>Save</Button>
          </>
        )}
      </Flexbox>
    </Box>
  );
}

CalibrationModalContent.propTypes = {
  onClose: T.func.isRequired,
};
