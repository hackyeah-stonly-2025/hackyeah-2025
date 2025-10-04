import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

const Box = styled.div``;

function AppWrapper() {
  return (
    <Box>
      <Navigation />
      <Outlet />
    </Box>
  );
}

export default AppWrapper;
