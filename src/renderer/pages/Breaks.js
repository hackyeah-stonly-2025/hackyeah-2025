import React, { useState } from 'react';
import Typography from '../components/Typography';
import Flexbox from '../components/Flexbox';
import Setting from '../components/Setting';

function Breaks() {
  const [settings, setSettings] = useState({
    breakReminderInterval: 50,
    breakDuration: 10,
  });

  return (
    <>
      <Typography variant="h3">Breaks</Typography>
      <Flexbox flexDirection="column" gap={8} marginTop={24} isBordered>
        <Setting
          label="Break Reminder Interval"
          description="Choose how long you can work before a reminder appears suggesting a short break."
          type="number"
          value={settings.breakReminderInterval}
          onChange={(value) =>
            setSettings({ ...settings, breakReminderInterval: value })
          }
        />
        <Setting
          label="Break Duration"
          description="Set how long each break should last. Short breaks help you recharge without losing focus."
          type="number"
          value={settings.breakDuration}
          onChange={(value) =>
            setSettings({ ...settings, breakDuration: value })
          }
        />
      </Flexbox>
    </>
  );
}

export default Breaks;
