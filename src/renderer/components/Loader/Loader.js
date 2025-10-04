import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Flexbox from '../Flexbox';

const Container = styled(Flexbox)`
  width: 100%;
  height: ${({ containerHeight }) => containerHeight};
`;

const Ripple = styled.div`
  position: absolute;
  border: 4px solid ${({ color }) => color && `var(--${color})`};
  border-radius: 50%;
  animation: ripple 2s ease-out infinite;
  width: 40px;
  height: 40px;
  transform: scale(0);

  &:first-child {
    animation-delay: 1s;
  }

  @keyframes ripple {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    30% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 0;
      transform: scale(1);
    }
  }
`;

function Loader({
  className,
  color = 'primary-100',
  containerHeight = '40px',
}) {
  return (
    <Container
      className={className}
      containerHeight={containerHeight}
      justifyContent="center"
      alignItems="center"
    >
      <Ripple color={color} />
      <Ripple color={color} />
    </Container>
  );
}

Loader.propTypes = {
  className: T.string,
  color: T.string,
  containerHeight: T.string,
};

export default Loader;
