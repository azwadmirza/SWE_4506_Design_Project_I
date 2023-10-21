import { useState, useEffect } from 'react';
import '../assets/css/otp.css';

type OTPProps={
  validityPeriodInSeconds:number,
  onTimerExpired:()=>void
}

const OTPValidityTimer = ({ validityPeriodInSeconds, onTimerExpired }:OTPProps) => {
  const [remainingTime, setRemainingTime] = useState(validityPeriodInSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          onTimerExpired();
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [validityPeriodInSeconds, onTimerExpired]);

  const formatTime = (timeInSeconds:number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return <div style={{color:'red'}}>{formatTime(remainingTime)}</div>;
};

export default OTPValidityTimer;
