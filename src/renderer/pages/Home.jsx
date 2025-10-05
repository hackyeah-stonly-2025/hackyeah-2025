import styled from 'styled-components';
import EnergyIndicator from 'renderer/components/EnergyIndicator';
import Button from 'renderer/components/Button';
import { useState } from 'react';
import Modal from 'renderer/components/Modal';
import Typography from '../components/Typography';
import Flexbox from '../components/Flexbox';
import BreakModalContent from './BreakModalContent';

const Box = styled.div`
  max-width: 800px;
  margin: 40px auto;
`;

export default function Home() {
  const [showBreakModal, setShowBreakModal] = useState(false);

  return (
    <Box>
      <Typography variant="h3" marginBottom={32}>
        Your on-screen session
      </Typography>

      <Flexbox gap={24} alignItems="flex-start">
        <Flexbox gap={40} padding={24} flexGrow={1} isBordered>
          <Flexbox flexDirection="column" gap={16}>
            <Typography variant="h4">Tiredness</Typography>
            <EnergyIndicator value={parseInt(Math.random() * 100, 10)} />
          </Flexbox>

          <Flexbox flexDirection="column" gap={16} flexGrow={1}>
            <Typography variant="h4" marginBottom={8}>
              Session details
            </Typography>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Session duration
              </Typography>
              <Typography variant="h5">5h 34m</Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Number of breaks
              </Typography>
              <Typography variant="h5">3 breaks</Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                No blinking detected
              </Typography>
              <Typography variant="h5">12 times</Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Turtle heads
              </Typography>
              <Typography variant="h5">3 times</Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Head tilts
              </Typography>
              <Typography variant="h5">7 times</Typography>
            </Flexbox>
          </Flexbox>
        </Flexbox>

        <Flexbox
          gap={12}
          padding={24}
          flexDirection="column"
          flexGrow={1}
          isBordered
        >
          <Typography variant="h4" marginBottom={16}>
            Quick Actions
          </Typography>
          <Button onClick={() => setShowBreakModal(true)} fullWidth>
            Take a break
          </Button>
          <Button variant="tertiary" fullWidth>
            Reset session
          </Button>
        </Flexbox>
      </Flexbox>
      {showBreakModal && (
        <Modal
          onClose={() => setShowBreakModal(false)}
          content={BreakModalContent}
        />
      )}
    </Box>
  );
}
