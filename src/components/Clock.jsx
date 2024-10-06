import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Updates the time every second

    return () => clearInterval(timer); // Cleanup the interval on component unmount
  }, []);

  return (
    <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
      {currentTime.toLocaleTimeString()} {/* Display the time */}
    </div>
  );
};

export default Clock;
