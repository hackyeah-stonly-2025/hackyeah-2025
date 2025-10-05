import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '../Icon';
import Flexbox from '../Flexbox';
import Typography from '../Typography';

const Box = styled.div`
  background-color: var(--neutral-190);
  border-radius: var(--border-radius-2);
`;

const Header = styled(Flexbox)`
  padding: 12px 8px;
  user-select: none;
`;

const Content = styled.div`
  padding: 8px 12px 16px;
`;

const IconStyled = styled(Icon)`
  border-radius: 50%;
  background-color: var(--turquoise-100);
  color: var(--neutral-200);
`;

function Accordion({ className, label, children, isComplete, isExpanded }) {
  return (
    <Box className={className}>
      <Header justifyContent="space-between" alignItems="center">
        <Typography variant="h4">{label}</Typography>
        {isComplete && <IconStyled name="check" size={20} />}
      </Header>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Content>{children}</Content>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

Accordion.propTypes = {
  className: T.string,
  label: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
  isComplete: T.bool,
  isExpanded: T.bool,
};

export default Accordion;
