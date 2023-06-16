import React, { useState, useEffect, useRef } from "react";
import SensorControl from "./components/SensorControl";
import { SensorInfo } from "models/Sensor";
import ChartSensor from "./components/ChartSensor";
import { chartInfo } from "models/Chart";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { AppState } from "store/rootReducers";
import {
  getDataSensor,
  changeConfigSensor,
} from "pages/Control/redux/actionCreators";
import { LABLES_CHART } from "constants/constant";

const MainControl = () => {
  const dispatch = useAppDispatch();

  const [sensorInfoState, setSensorInfoState] = useState<SensorInfo>({
    EnvTemp: 0,
    EnvTempMin: 25,
    EnvTempMax: 28,
    EnvHumi: 0,
    EnvHumiMin: 60,
    EnvHumiMax: 70,
    PH: 0,
    PHMin: 6,
    PHMax: 7,
    Flow: 0,
    StartPump: 0,
    StaLight: 0,
    StartCharge: 0,
    StarDisch: 0,
    PumTemp: 0,
    Illu: 0,
    StaPump: 0,
    StaCharge: 0,
  });

  const optionsTemp = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Biểu đồ nhiệt độ trong ngày",
      },
    },
  };

  const optionsHumi = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Biểu đồ độ ẩm trong ngày",
      },
    },
  };

  const optionsPh = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Biểu đồ PH trong ngày",
      },
    },
  };

  const dataTemp = {
    LABLES_CHART,
    datasets: [
      {
        label: "Nhiệt độ",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataHumi = {
    LABLES_CHART,
    datasets: [
      {
        label: "Độ ẩm",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const dataPh = {
    LABLES_CHART,
    datasets: [
      {
        label: "Ph",
        data: [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleChangeSensorInfo = (value: number, name: string) => {
    console.log(name + ":" + value);
    setSensorInfoState({ ...sensorInfoState, [name]: value });
  };

  const [chartInfoTemp, setChartInfoTemp] = useState<chartInfo>({
    options: optionsTemp,
    data: dataTemp,
  });

  const [chartInfoHumi, setChartInfoHumi] = useState<chartInfo>({
    options: optionsHumi,
    data: dataHumi,
  });

  const [chartInfoPh, setChartInfoPh] = useState<chartInfo>({
    options: optionsPh,
    data: dataPh,
  });

  useEffect(() => {
    dispatch(getDataSensor());
  }, []);

  const { sensorInfo } = useAppSelector((state) => state.sensorReducer);
  // useEffect(() => {
  //   if (sensorInfo) {
  //     setSensorInfoState(sensorInfo);

  //     const interval = setInterval(() => {
  //       console.log("Call interval!");
  //       dispatch(getDataSensor());
  //     }, 1000000);
  //     return () => clearInterval(interval);
  //   }
  // }, [sensorInfo]);

  const onClickChangeConfig = () => {
    dispatch(changeConfigSensor(sensorInfoState));
  };

  return (
    <div className="main-control-page">
      <div className=" control-title">
        <h1 className="center">Hệ Thông Giám Sát Thủy Canh</h1>
      </div>
      <div className="sensor-control">
        <SensorControl
          sensorInfo={sensorInfoState}
          onChangeSliderValue={handleChangeSensorInfo}
          onClickChangeConfig={onClickChangeConfig}
        />
      </div>
      <div className="charts-page">
        <div className="chart-title">
          <h1 className="center">Biểu Đồ Lịch Sử Theo Ngày</h1>
        </div>
        <div className="chart">
          <ChartSensor chartInfo={chartInfoTemp} />
        </div>
        <div className="chart">
          <ChartSensor chartInfo={chartInfoHumi} />
        </div>
        <div className="chart">
          <ChartSensor chartInfo={chartInfoPh} />
        </div>
      </div>
    </div>
  );
};

export default MainControl;
