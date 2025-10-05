import React from 'react';
import styled from 'styled-components';
import T from 'prop-types';
import Typography from '../Typography';

const Box = styled.div`
  position: relative;
`;

const Value = styled(Typography)`
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LabelWrap = styled(Typography)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  padding: 2px 8px;
  color: var(--neutral-200);
  font-weight: 600;
  ${({ color }) => color && `background-color: ${color};`}
  white-space: nowrap;
`;

const Svg = styled.svg`
  display: block;
  margin: 0 auto;
`;

function EnergyIndicator({ value }) {
  const radius = 100;
  const stroke = 16;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  function getColor() {
    if (value < 25) return 'var(--red-100)';
    if (value < 50) return 'var(--orange-100)';
    if (value < 75) return 'var(--yellow-100)';
    return 'var(--turquoise-100)';
  }

  function getLabel() {
    if (value < 25) return 'Very Tired';
    if (value < 50) return 'Tired';
    if (value < 75) return 'Energy Dropping';
    return 'Focused';
  }

  return (
    <Box>
      <Value variant="h2">{value}</Value>
      <LabelWrap color={getColor()}>
        <Typography variant="label">{getLabel()}</Typography>
      </LabelWrap>
      <Svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </Svg>
    </Box>
  );
}

EnergyIndicator.propTypes = {
  value: T.number.isRequired,
  label: T.string.isRequired,
};

export default EnergyIndicator;
