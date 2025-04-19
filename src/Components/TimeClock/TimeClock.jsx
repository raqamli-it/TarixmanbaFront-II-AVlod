import React, { useState, useEffect } from "react";

const TimeClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const hh = String(time.getHours()).padStart(2, "0");
    const mm = String(time.getMinutes()).padStart(2, "0");
    const ss = String(time.getSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  return <h4>{formatTime(time)}</h4>;
};

export default React.memo(TimeClock);
