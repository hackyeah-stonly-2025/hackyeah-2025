import React from 'react';
import T from 'prop-types';
import Flexbox from '../Flexbox';
import Typography from '../Typography';
import RadioButtonWrap from '../RadioButtonWrap';
import NumberInput from '../NumberInput';

function Setting({
  type,
  label,
  description,
  value,
  options = [],
  min = 1,
  max = 100,
  step = 1,
  onChange,
}) {
  return (
    <Flexbox
      flexDirection="column"
      padding={16}
      gap={10}
      alignItems="flex-start"
    >
      <Typography variant="h4">{label}</Typography>
      <Typography variant="body">{description}</Typography>
      {type === 'select' && (
        <Flexbox gap={12} alignItems="flex-start" flexWrap="wrap">
          {options.map((option) => (
            <RadioButtonWrap
              key={option.value}
              label={option.label}
              isActive={value?.includes(option.value)}
              onClick={() => onChange(option.value)}
            />
          ))}
        </Flexbox>
      )}
      {type === 'bool' && (
        <Flexbox gap={12} alignItems="flex-start" flexWrap="wrap">
          <RadioButtonWrap
            label="Yes"
            isActive={!!value}
            onClick={() => onChange(true)}
          />
          <RadioButtonWrap
            label="No"
            isActive={!value}
            onClick={() => onChange(false)}
          />
        </Flexbox>
      )}
      {type === 'number' && (
        <Flexbox gap={12} alignItems="flex-start">
          <NumberInput
            value={value}
            onChange={onChange}
            unit="min"
            min={min}
            max={max}
            step={step}
          />
        </Flexbox>
      )}
    </Flexbox>
  );
}

Setting.propTypes = {
  type: T.oneOf(['select', 'bool', 'number']).isRequired,
  label: T.string.isRequired,
  value: T.any,
  description: T.string,
  options: T.array,
  min: T.number,
  max: T.number,
  step: T.number,
  onChange: T.func,
};

export default Setting;
