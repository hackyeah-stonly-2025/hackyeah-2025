import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoSVG from 'renderer/images/logo.svg';

const LogoLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: 'Ubuntu';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: var(--neutral-100);
`;

const Img = styled.img`
  color: var(--primary-100);

  path {
    fill: var(--primary-100);
  }
`;

function Logo({ className }) {
  return (
    <LogoLink className={className} to="/">
      <Img src={LogoSVG} alt="Peaky Blinkers logo" width="32px" height="32px" />
      <span className="logo-text">Peaky Blinkers</span>
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
};

export default Logo;
