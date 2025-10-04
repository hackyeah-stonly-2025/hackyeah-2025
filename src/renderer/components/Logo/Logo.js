import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LogoSVG from 'images/logo.svg';
import GooseHonk1 from 'sounds/goose_honk_01.wav';
import GooseHonk2 from 'sounds/goose_honk_02.wav';
import GooseHonk3 from 'sounds/goose_honk_03.wav';
import GooseHonk4 from 'sounds/goose_honk_04.wav';
import GooseHonk5 from 'sounds/goose_honk_05.wav';
import { getRandomIntInRange } from 'renderer/util/helpers';

const LogoLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: 'Ubuntu';
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
  color: var(--primary-100);
`;

function Logo({ className, link }) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const audio1 = new Audio(GooseHonk1);
    const audio2 = new Audio(GooseHonk2);
    const audio3 = new Audio(GooseHonk3);
    const audio4 = new Audio(GooseHonk4);
    const audio5 = new Audio(GooseHonk5);

    if (clicks && clicks % 3 === 0) {
      const randomInt = getRandomIntInRange(1, 5);

      switch (randomInt) {
        case 1:
          audio1.play();
          break;
        case 2:
          audio2.play();
          break;
        case 3:
          audio3.play();
          break;
        case 4:
          audio4.play();
          break;
        case 5:
          audio5.play();
          break;
      }
    }
  }, [clicks]);

  return (
    <LogoLink className={className} to={link}>
      <img
        src={LogoSVG}
        alt="Cook Your Goose logo"
        onClick={() => setClicks((c) => c + 1)}
      />
      <span className="logo-text">cook your goose</span>
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
  link: T.string,
};

export default Logo;
