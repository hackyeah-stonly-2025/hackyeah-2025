import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

const Box = styled.div``;

function Water({ className }) {
  return <Box className={className}>...</Box>;
}

Water.propTypes = {
  className: T.string,
};

export default Water;
