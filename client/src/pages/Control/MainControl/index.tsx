
import React, { useState } from 'react';
import SensorControl from "./components/SensorControl";
import { sensorInfo } from 'models/Sensor';

const MainControl = () => {
  const [sensorInfo, setSensorInfo] = useState<sensorInfo>({
    EnvTemp: 0,
    EnvTempMin: 0,
    EnvTempMax: 0,
    EnvHumi: 0,
    EnvHumiMin: 0,
    EnvHumiMax: 0,
    PH: 0,
    PHMin: 0,
    PHMax: 0,
    Flow: 0,
    StartPump: 0,
    StaLight: 0,
    StartCharge: 0,
    StarDisch: 0,
  });

  return (
    <div className="MainControl-page">
      <SensorControl
      sensorInfo={sensorInfo}
      />
    </div>
  );
};

export default MainControl;
