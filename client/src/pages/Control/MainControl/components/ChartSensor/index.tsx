import { chartInfo } from "models/Chart";
import React, { useState, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "utils/hook";
import { AppState } from "store/rootReducers";
import { LABLES_CHART } from "constants/constant";
import { compose } from "redux";
import { Line } from "react-chartjs-2";
import SearchChart from "../SearchChart";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartSensor = () => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="charts-page">
      <div className="chart-title">
        <h1 className="center">Biểu Đồ Lịch Sử Theo Ngày</h1>
      </div>
      <SearchChart />
      <div className="chart">
        <Line options={chartInfoTemp.options} data={chartInfoTemp.data} />
      </div>
      <div className="chart">
        <Line options={chartInfoHumi.options} data={chartInfoHumi.data} />
      </div>
      <div className="chart">
        <Line options={chartInfoPh.options} data={chartInfoPh.data} />
      </div>
    </div>
  );
};

export default ChartSensor;
