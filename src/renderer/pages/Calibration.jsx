import styled from 'styled-components';
import { useState } from 'react';
import Modal from 'renderer/components/Modal';
import Flexbox from 'renderer/components/Flexbox';
import Typography from '../components/Typography';
import Button from '../components/Button';
import CalibrationModalContent from './CalibrationModalContent';

const Box = styled.div``;

export default function Calibration() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Box>
      <Typography variant="h3">Calibrate</Typography>
      <Flexbox
        flexDirection="column"
        gap={16}
        marginTop={24}
        isBordered
        padding={16}
        alignItems="flex-start"
      >
        <Typography variant="h4">
          Calibrate Attention & Posture Detection
        </Typography>
        <Typography variant="body">
          Run a short calibration to help the system learn your normal posture,
          head position, and blinking patterns.
        </Typography>
        <Typography variant="body">
          This ensures more accurate detection of tiredness, slouching, or loss
          of focus — and prevents false alerts.
        </Typography>

        <Button onClick={() => setShowModal(true)}>Calibrate</Button>
      </Flexbox>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          content={(closeModal) => (
            <CalibrationModalContent onClose={closeModal} />
          )}
        />
      )}
    </Box>
  );
}
