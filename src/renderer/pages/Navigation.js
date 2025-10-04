import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/Logo';
import Flexbox from '../components/Flexbox';
import { BREAKPOINTS } from '../util/breakpoints';

const Box = styled(Flexbox)`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 14px 32px;
  background-color: var(--secondary-190);
  width: 100%;
  border-radius: var(--border-radius-0);
  z-index: var(--z-index-above);

  @media (max-width: ${BREAKPOINTS.medium}) {
    .logo-text {
      display: none;
    }
  }
`;

const Links = styled(Flexbox)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const LinkStyled = styled(Link)`
  color: var(--neutral-120);
  padding: 4px 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  border-radius: var(--border-radius-1);

  ${({ $isActive }) =>
    $isActive &&
    css`
      font-weight: 700;
      color: var(--primary-100);
      background-color: var(--neutral-200);
    `}

  &:hover {
    color: var(--primary-100);
  }

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 4px;
  }
`;

function Navigation({ className }) {
  const location = useLocation();

  return (
    <Box
      className={className}
      alignItems="center"
      justifyContent="space-between"
    >
      <Logo link="/app" />
      <Links justifyContent="center" gap={16}>
        <LinkStyled $isActive={location.pathname === '/'} to="/">
          Home
        </LinkStyled>
        <LinkStyled
          $isActive={location.pathname.includes('insights')}
          to="insights"
        >
          Insights
        </LinkStyled>
        <LinkStyled
          $isActive={location.pathname.includes('settings')}
          to="settings/events"
        >
          Settings
        </LinkStyled>
      </Links>
    </Box>
  );
}

Navigation.propTypes = {
  className: T.string,
};

export default Navigation;
