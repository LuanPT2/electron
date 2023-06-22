import React, { useState, useEffect, useRef } from "react";
import SensorControl from "./components/SensorControl";
import ChartSensor from "./components/ChartSensor";

const MainControl = () => {
  return (
    <div className="main-control-page">
      <div className=" control-title">
        <h1 className="center">Hệ Thống Giám Sát Thủy Canh</h1>
      </div>
      <SensorControl />
      <ChartSensor />
    </div>
  );
};

export default MainControl;
