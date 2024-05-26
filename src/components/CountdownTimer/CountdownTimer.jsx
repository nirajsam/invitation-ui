import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
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

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span className='timerbox'>
        <span className='tm'>{timeLeft[interval]}</span> <span>{interval}</span>{' '}
      </span>
    );
  });

  return (
    <div className='timerbox-wrapper'>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Countdown completed!</span>
      )}
    </div>
  );
};

export default CountdownTimer;
