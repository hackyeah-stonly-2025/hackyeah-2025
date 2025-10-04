import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import InputBase from '../InputBase';

const InputBaseStyled = styled(InputBase)`
  min-width: 88px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  ${({ unit }) =>
    unit &&
    css`
      & > div:before {
        content: '${unit}';
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        color: var(--neutral-140);
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        text-wrap: nowrap;
      }
    `}
`;

function NumberInput({
  className,
  value = null,
  onChange,
  min,
  max,
  step,
  unit,
  ...inputProps
}) {
  function onChangeProxy(newValue) {
    if (onChange) onChange(newValue === '' ? null : +newValue);
  }

  return (
    <InputBaseStyled
      className={className}
      type="number"
      value={value === null ? '' : value}
      onChange={onChangeProxy}
      min={min}
      max={max}
      step={step}
      unit={unit}
      {...inputProps}
    />
  );
}

NumberInput.propTypes = {
  className: T.string,
  value: T.oneOfType([T.number, T.string]),
  onChange: T.func,
  min: T.number,
  max: T.number,
  step: T.number,
  unit: T.string,
};

export default NumberInput;
