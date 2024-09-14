// src/components/Countdown.tsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TheDestiny from "../../assets/fonts/The-Destiny.woff"
import TheDestiny2 from "../../assets/fonts/The-Destiny.woff2" 

interface CountdownProps {
  targetDate: string;
}

const breakpoints = {
  xxs: '400.98px',
  xs: '575.98px',
  sm: '767.98px',
  md: '991.98px',
  lg: '1199.98px',
  xl: '1600px',
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: any = {};

    if (difference > 0) {
      timeLeft = {
        Días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutos: Math.floor((difference / 1000 / 60) % 60),
        Segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <TimerContainer key={interval}>
        <TimerNumber>{timeLeft[interval]}</TimerNumber>
        <TimerLabel>{interval}</TimerLabel>
      </TimerContainer>
    );
  });

  return (
    <CountdownWrapper>
      {timerComponents.length ? timerComponents : 
      <div className='title-timer-container'>
        <p className='title-timer'>MI GRAN DÍA HA LLEGADO!</p>
      </div>}
    </CountdownWrapper>
  );
};

const CountdownWrapper = styled.div`
  text-align: center;
  font-size: 1.5em;
  color: #F2EDE7;
  @media (max-width: ${breakpoints.xxs}) {
        font-size: 1.45em;
  }
`;

const TimerContainer = styled.div`
  display: inline-block;
  margin: 10px;
  text-align: center;
  @media (min-width: ${breakpoints.md}) {
        margin: 10px 40px;
  }
`;

const TimerNumber = styled.div`
  font-size: 45px;
  font-weight: 400;
  font-family: 'Cormorant Garamond', serif;
  @media (min-width: ${breakpoints.md}) {
    font-size: 70px;
  }
`;

const TimerLabel = styled.div`
  font-size: 14px;
  font-weight: 120;
  text-transform:uppercase;
  letter-spacing:4px;
  @media (min-width: ${breakpoints.md}) {
        font-size: 18px;
        font-weight: 100;

  }
  `;

export default Countdown;
