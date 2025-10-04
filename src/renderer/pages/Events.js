import React, { useState } from 'react';
import Typography from '../components/Typography';
import Flexbox from '../components/Flexbox';
import Setting from '../components/Setting';

function Events() {
  const [settings, setSettings] = useState({
    blinkFrequency: 'full_screen',
    turtleHead: 'toast',
    headTilt: 'toast',
    tiredness: 'toast',
  });

  return (
    <>
      <Typography variant="h3">Events</Typography>
      <Flexbox flexDirection="column" gap={8} marginTop={24} isBordered>
        <Setting
          label="Blink frequency"
          description="Detects when you blink too rarely. If your eyes stay open too long, a gentle reminder appears to help prevent dryness and strain."
          type="select"
          value={settings.blinkFrequency}
          onChange={(value) =>
            setSettings({ ...settings, blinkFrequency: value })
          }
          options={[
            { label: 'Off', value: 'off' },
            { label: 'Toast notification', value: 'toast' },
            {
              label: 'Full screen notification',
              value: 'full_screen',
            },
          ]}
        />
        <Setting
          label="Turtle Head"
          description="Detects when your head leans too far forward. Gently reminds you to straighten up for healthier neck and spine alignment."
          type="select"
          value={settings.turtleHead}
          onChange={(value) => setSettings({ ...settings, turtleHead: value })}
          options={[
            { label: 'Off', value: 'off' },
            { label: 'Toast notification', value: 'toast' },
          ]}
        />
        <Setting
          label="Head Tilt"
          description="Monitors if your head is tilted sideways too long. Prompts you to adjust your posture to reduce muscle tension and neck strain."
          type="select"
          value={settings.headTilt}
          onChange={(value) => setSettings({ ...settings, headTilt: value })}
          options={[
            { label: 'Off', value: 'off' },
            { label: 'Toast notification', value: 'toast' },
          ]}
        />
        <Setting
          label="Tiredness"
          description="Measures overall fatigue based on signs like longer eye closures, slower blinks, and yawning. If sustained tiredness is detected it recommends a rest or ending the work session."
          type="select"
          value={settings.tiredness}
          onChange={(value) => setSettings({ ...settings, tiredness: value })}
          options={[
            { label: 'Off', value: 'off' },
            { label: 'Toast notification', value: 'toast' },
          ]}
        />
      </Flexbox>
    </>
  );
}

export default Events;
