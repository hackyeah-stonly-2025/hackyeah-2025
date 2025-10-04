import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';

const Box = styled.div``;

function Insights({ className }) {
  return <Box className={className}>Insights</Box>;
}

Insights.propTypes = {
  className: T.string,
};

export default Insights;
