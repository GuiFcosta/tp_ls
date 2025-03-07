import React, { useState, useEffect } from "react";

export default function Timer({ gameOver }) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timeIntervalId;
    if (!gameOver) {
      timeIntervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timeIntervalId);
  }, [gameOver]);

  return (
    <div style={{ 
      color: "white", 
      fontSize: 20, 
      background: "transparent", 
      }}>
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
      {time}"
    </div>
  );
}