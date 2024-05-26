import React, { useState, useEffect } from 'react';

const initialBiometricData = {
  heartRate: 72,
  steps: 0,
  caloriesBurned: 0,
  stressLevel: 1
};

const BiometricDataWidget = () => {
  const [biometricData, setBiometricData] = useState(initialBiometricData);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(() => {
      setBiometricData((prevData) => ({
        ...prevData,
        heartRate: Math.floor(60 + Math.random() * 40),
        steps: prevData.steps + Math.floor(Math.random() * 10),
        caloriesBurned: prevData.caloriesBurned + Math.random(),
        stressLevel: Math.floor(Math.random() * 5) + 1
      }));
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const handleStopMonitoring = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleStartMonitoring = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        setBiometricData((prevData) => ({
          ...prevData,
          heartRate: Math.floor(60 + Math.random() * 40),
          steps: prevData.steps + Math.floor(Math.random() * 10),
          caloriesBurned: prevData.caloriesBurned + Math.random(),
          stressLevel: Math.floor(Math.random() * 5) + 1
        }));
      }, 1000);

      setIntervalId(id);
    }
  };

  return (
    <div className="widget biometric-data">
      <h3>Biometric Data</h3>
      <div>
        <p><strong>Heart Rate:</strong> {biometricData.heartRate} bpm</p>
        <p><strong>Steps:</strong> {biometricData.steps}</p>
        <p><strong>Calories Burned:</strong> {biometricData.caloriesBurned.toFixed(2)} kcal</p>
        <p><strong>Stress Level:</strong> {biometricData.stressLevel}/5</p>
      </div>
      <div>
        {intervalId ? (
          <button onClick={handleStopMonitoring}>Stop Monitoring</button>
        ) : (
          <button onClick={handleStartMonitoring}>Start Monitoring</button>
        )}
      </div>
    </div>
  );
};

export default BiometricDataWidget;
