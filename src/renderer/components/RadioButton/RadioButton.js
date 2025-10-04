import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import Flexbox from '../Flexbox';
import Typography from '../Typography';

const Circle = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border: 2px solid var(--neutral-180);
  background-color: var(--neutral-200);
  border-radius: 50%;
  flex-shrink: 0;

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: var(--primary-100);
      border: none;

      &:after {
        content: '';
        position: absolute;
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        background-color: var(--neutral-200);
        border-radius: 50%;
      }
    `}
`;

function RadioButton({ className, label, isActive, onClick }) {
  return (
    <Flexbox
      className={className}
      gap={12}
      isActive={isActive}
      onClick={onClick}
    >
      <Circle isActive={isActive} />
      <Typography variant="label">{label}</Typography>
    </Flexbox>
  );
}

RadioButton.propTypes = {
  className: T.string,
  label: T.string.isRequired,
  isActive: T.bool,
  onClick: T.func,
};

export default RadioButton;
