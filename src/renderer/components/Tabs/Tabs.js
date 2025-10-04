import React from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import Tab from './Tab.js';

const Box = styled.div`
  display: inline-flex;
  background-color: var(--neutral-190);
  border-radius: var(--border-radius-1);
  flex-direction: ${({ direction }) => direction};
`;

function Tabs({
  className,
  tabs,
  activeTabId,
  setActiveTabId = () => {},
  direction = 'row',
}) {
  return (
    <Box className={className} direction={direction}>
      {tabs.map((tab) => (
        <Tab
          key={tab.id}
          isActive={activeTabId === tab.id}
          {...tab}
          onClick={() => setActiveTabId(tab.id)}
          link={tab.link}
        />
      ))}
    </Box>
  );
}

Tabs.propTypes = {
  className: T.string,
  tabs: T.arrayOf(
    T.shape({
      isActive: T.bool,
      label: T.string.isRequired,
      icon: T.string,
      onClick: T.func,
      link: T.string,
    }),
  ),
  direction: T.oneOf(['row', 'column']),
  activeTabId: T.oneOfType([T.string, T.number]),
  setActiveTabId: T.func,
};

export default Tabs;
