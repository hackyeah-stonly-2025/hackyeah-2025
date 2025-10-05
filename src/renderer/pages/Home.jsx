import styled from 'styled-components';
import EnergyIndicator from 'renderer/components/EnergyIndicator';
import Button from 'renderer/components/Button';
import { useEffect, useState } from 'react';
import Modal from 'renderer/components/Modal';
import Typography from '../components/Typography';
import Flexbox from '../components/Flexbox';
import BreakModalContent from './BreakModalContent';
import { formatTime } from '../util/helpers';

const Box = styled.div`
  max-width: 800px;
  margin: 40px auto;
`;

export default function Home() {
  const [showBreakModal, setShowBreakModal] = useState(false);
  const [stats, setStats] = useState({});
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    window.electronStore
      .get('stats')
      .then((data) => setStats(data))
      .catch(console.error);

    window.electronStore
      .get('startTime')
      .then((data) => setStartTime(data))
      .catch(console.error);

    const unsubscribe = window.electronStore.onDidChange(
      'stats',
      ({ key, newValue }) => {
        if (key === 'stats') setStats(newValue);
      },
    );

    // cleanup if needed (you can’t easily remove listener unless you wrap ipcRenderer)
    return () => unsubscribe?.();
  }, []);

  const currentTime = Date.now();
  const sessionDuration = currentTime - startTime;
  const sessionDurationFormatted = formatTime(sessionDuration / (1000 * 60));

  return (
    <Box>
      <Typography variant="h3" marginBottom={32}>
        Your on-screen session
      </Typography>

      <Flexbox gap={24} alignItems="flex-start">
        <Flexbox gap={40} padding={24} flexGrow={1} isBordered>
          <Flexbox flexDirection="column" gap={16}>
            <Typography variant="h4">Tiredness</Typography>
            <EnergyIndicator value={78} />
          </Flexbox>

          <Flexbox flexDirection="column" gap={16} flexGrow={1}>
            <Typography variant="h4" marginBottom={8}>
              Session details
            </Typography>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Session duration
              </Typography>
              <Typography variant="h5">{sessionDurationFormatted}</Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Number of break warnings
              </Typography>
              <Typography variant="h5">
                {stats?.breakWarnings}{' '}
                {stats?.breakWarnings === 1 ? 'break' : 'breaks'}
              </Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                No blinking detected
              </Typography>
              <Typography variant="h5">
                {stats?.blinkWarnings}{' '}
                {stats?.blinkWarnings === 1 ? 'time' : 'times'}
              </Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Turtle heads
              </Typography>
              <Typography variant="h5">
                {stats?.turtleHeadWarnings}{' '}
                {stats?.turtleHeadWarnings === 1 ? 'time' : 'times'}
              </Typography>
            </Flexbox>
            <Flexbox justifyContent="space-between">
              <Typography variant="body" color="neutral-140">
                Head tilts
              </Typography>
              <Typography variant="h5">
                {stats?.headTiltWarnings}{' '}
                {stats?.headTiltWarnings === 1 ? 'time' : 'times'}
              </Typography>
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
          content={<BreakModalContent />}
        />
      )}
    </Box>
  );
}
