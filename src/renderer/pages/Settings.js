import React from 'react';
import styled from 'styled-components';
import { Outlet, useLocation } from 'react-router-dom';
import Tabs from '../components/Tabs';

const Box = styled.div`
  position: relative;
  width: 600px;
  max-width: 100%;
  margin: 40px auto 160px;
`;

const AbsoluteTabs = styled(Tabs)`
  position: absolute;
  left: -154px;
`;

function Settings() {
  const location = useLocation();

  const tabs = [
    {
      id: '/settings/events',
      label: 'Events',
      link: '/settings/events',
    },
    {
      id: '/settings/breaks',
      label: 'Breaks',
      link: '/settings/breaks',
    },
    {
      id: '/settings/calibration',
      label: 'Calibration',
      link: '/settings/calibration',
    },
  ];

  return (
    <Box>
      <AbsoluteTabs
        direction="column"
        activeTabId={location.pathname}
        tabs={tabs}
      />
      <Outlet />
    </Box>
  );
}

export default Settings;
