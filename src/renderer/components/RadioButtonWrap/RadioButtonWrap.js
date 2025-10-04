import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import RadioButton from '../RadioButton';
import Flexbox from '../Flexbox';

const Box = styled(Flexbox)`
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  min-width: 140px;
  padding: 10px 12px;
  border: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-2);
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background-color: var(--neutral-190);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      border: 1px solid var(--primary-190);
      background-color: var(--primary-190);

      &:hover {
        background-color: var(--primary-180);
      }
    `}
`;

const Content = styled.div`
  max-width: 100%;
  border: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-2);
  background-color: var(--neutral-200);
  overflow: hidden;
`;

function RadioButtonWrap({
  className,
  label,
  isActive = false,
  children,
  onClick,
}) {
  return (
    <Box className={className} isActive={isActive} onClick={onClick}>
      <RadioButton label={label} isActive={isActive} />
      {children && <Content>{children}</Content>}
    </Box>
  );
}

RadioButtonWrap.propTypes = {
  className: T.string,
  label: T.string.isRequired,
  isActive: T.bool,
  children: T.oneOfType([T.object, T.string, T.node]),
  onClick: T.func.isRequired,
};

export default RadioButtonWrap;
