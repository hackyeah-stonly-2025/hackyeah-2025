import styled from 'styled-components';
import Divider from 'renderer/components/Divider';
import Accordion from 'renderer/components/Accordion';
import T from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import Typography from '../components/Typography';
import Button from '../components/Button';
import Flexbox from '../components/Flexbox';

const Box = styled.div`
  width: 800px;
`;

const Img = styled.video`
  object-fit: cover;
  border-radius: 50%;
  margin-top: 24px;
  transform: scaleX(-1);
`;

const Steps = styled(Flexbox)`
  flex: 1;
`;

export default function CalibrationModalContent({ onClose }) {
  const [completedSteps, setCompletedSteps] = useState(0);
  const videoRef = useRef(null);

  const completeStep = () => {
    if (completedSteps === 0) {
      window.electron?.ipcRenderer.sendMessage('calibrate-posture');
    } else if (completedSteps === 1) {
      window.electron?.ipcRenderer.sendMessage('calibrate-blink');
    } else if (completedSteps === 2) {
      window.electron?.ipcRenderer.sendMessage('calibrate-yawn');
    }
    setCompletedSteps((steps) => steps + 1);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        return stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera: ', error);
      });
  }, []);

  useEffect(() => {
    window.electron?.ipcRenderer.sendMessage('calibrate-posture');
  }, []);

  return (
    <Box>
      <Flexbox padding={24}>
        <Typography variant="h3">Calibrate</Typography>
      </Flexbox>
      <Divider />
      <Flexbox gap={32} padding={24}>
        <Img
          ref={videoRef}
          alt="Calibration Model"
          width="220px"
          height="220px"
        />
        <Steps flexDirection="column" gap={8}>
          <Typography variant="h4" marginY={12}>
            Calibrate your facial expressions
          </Typography>

          <Accordion
            label="1. Keep your back straight"
            isComplete={completedSteps > 0}
            isExpanded={completedSteps === 0}
          >
            <Typography>
              Keep your back straight and shoulders down. This helps the system
              detect your posture and avoid false alerts.
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
      <Button variant="tertiary" onClick={completeStep}>
        Next
      </Button>

      <Flexbox padding={24} justifyContent="flex-end" gap={8}>
        {completedSteps < 3 ? (
          <Button variant="tertiary" onClick={completeStep}>
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
