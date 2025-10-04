import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import EyelidSVG from '../../icons/eyelid.svg';

const LogoLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: 'Ubuntu';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: var(--primary-100);
`;

const Img = styled.img`
  color: var(--primary-100);
`;

function Logo({ className, link }) {
  return (
    <LogoLink className={className} to={link}>
      {/* <Img
        src={EyelidSVG}
        alt="Peaky Blinkers logo"
        width="24px"
        height="24px"
      /> */}
      <span className="logo-text">Peaky Blinkers</span>
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
  link: T.string,
};

export default Logo;
