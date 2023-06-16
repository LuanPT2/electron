import React, { useState, useEffect, useRef } from "react";
import SensorControl from "./components/SensorControl";
import { SensorInfo } from "models/Sensor";
import { SearchChartInfo } from "models/SearchChart";
import ChartSensor from "./components/ChartSensor";
import { chartInfo } from "models/Chart";
import { useAppDispatch, useAppSelector } from "utils/hook";
import { AppState } from "store/rootReducers";
import {
  getDataSensor,
  changeConfigSensor,
} from "pages/Control/redux/actionCreators";
import { LABLES_CHART } from "constants/constant";
import DateTimePicker from "components/DateTimePicker";
import { compose } from "redux";
import moment from "moment";

const MainControl = () => {
  const dispatch = useAppDispatch();

  const [searchChartInfo, setSearchChartInfo] = useState<SearchChartInfo>({
    searchDate: "",
  });

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

  const handleChangeSensorInfo = (
    valueMin: number,
    nameMin: string,
    valueMax: number,
    nameMax: string
  ) => {
    setSensorInfoState({
      ...sensorInfoState,
      [nameMin]: valueMin,
      [nameMax]: valueMax,
    });
  };

  console.log(sensorInfoState);

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
  useEffect(() => {
    if (sensorInfo) {
      setSensorInfoState(sensorInfo);
      const interval = setInterval(() => {
        console.log("Call interval!");
        dispatch(getDataSensor());
      }, 50000);
      return () => clearInterval(interval);
    }
  }, [sensorInfo]);

  const onClickChangeConfig = () => {
    dispatch(changeConfigSensor(sensorInfoState));
  };

  const handleOnchangeDateSearch = (date: Date) => {
    console.log(date);
  };

  return (
    <div className="main-control-page">
      <div className=" control-title">
        <h1 className="center">Hệ Thông Giám Sát Thủy Canh</h1>
      </div>
      <div className="search-chart">
        <DateTimePicker
          className="form-employement-change-report-front-side__group-10__col4"
          selected={
            searchChartInfo.searchDate
              ? moment(searchChartInfo.searchDate, "YYYY-MM-DD").toDate()
              : ("" as unknown as Date)
          }
          showTimeSelect
          onChange={(date: Date) => {
            handleOnchangeDateSearch(date);
          }}
          dateFormat="yyyy.MM.dd"
          isShowIcon={true}
        />
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
        <div className="search-chart"></div>
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
