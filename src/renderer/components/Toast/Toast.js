import React from 'react';
import T from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '../Icon';
import Flexbox from '../Flexbox';

const Box = styled(Flexbox)`
  position: relative;
  padding: 8px;
  padding-right: 16px;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  align-items: center;
  max-width: 560px;
  background-color: var(--neutral-200);

  ${({ shouldShowCloseIcon }) =>
    shouldShowCloseIcon &&
    css`
      padding-right: 60px;
    `};
`;

// const ToastIcon = styled(Icon)`
//   border-radius: var(--border-radius-2);
//   color: var(--neutral-200);
//   padding: 4px;
//   background-color: ${({ variant }) => {
//     if (variant === 'success') return 'var(--green-100)';
//     if (variant === 'error') return 'var(--red-100)';
//     if (variant === 'info') return 'var(--blue-100)';
//   }};
// `;

const ToastIcon = styled.img`
  border-radius: var(--border-radius-2);
  color: var(--neutral-200);
  padding: 4px;
  background-color: ${({ variant }) => {
    if (variant === 'success') return 'var(--green-100)';
    if (variant === 'error') return 'var(--red-100)';
    if (variant === 'info') return 'var(--blue-100)';
  }};
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  right: 8px;
`;

// const iconVariants = {
//   success: 'check',
//   error: 'priority_high',
//   info: 'info_i',
// };

function Toast({ id, variant = 'success', label, icon, hideToast, autoHide }) {
  const shouldShowCloseIcon = !autoHide;
  return (
    <Box gap={12} variant={variant} shouldShowCloseIcon={shouldShowCloseIcon}>
      {console.log('icon', icon)}
      <ToastIcon size={24} src={icon} variant={variant} />
      {label}
      {shouldShowCloseIcon && (
        <CloseIcon
          name="close"
          size={20}
          variant={variant}
          onClick={() => hideToast(id)}
        />
      )}
    </Box>
  );
}

Toast.propTypes = {
  id: T.number,
  variant: T.oneOf(['success', 'error', 'info']),
  icon: T.string,
  label: T.string,
  hideToast: T.func,
  autoHide: T.bool,
};

export default Toast;
