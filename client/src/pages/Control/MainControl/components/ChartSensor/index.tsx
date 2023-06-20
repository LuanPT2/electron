import { chartInfo } from "models/Chart";
import React, { useState, useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "utils/hook";
import { AppState } from "store/rootReducers";
import { labels } from "constants/constant";
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
  const { listDataChartInfo } = useAppSelector(
    (state) => state.chartsSensorReducer
  );

  useEffect(() => {
    console.log(listDataChartInfo);
  }, [listDataChartInfo]);

  const options = (message: string) => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        title: {
          display: true,
          text: message,
        },
      },
    };
  };

  const objectData = (labels, lineName, data) => {
    return {
      labels,
      datasets: [
        {
          label: lineName,
          data: data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };
  };

  return (
    <div className="charts-page">
      <div className="chart-title">
        <h1 className="center">Biểu Đồ Lịch Sử Theo Ngày</h1>
      </div>
      <SearchChart />
      <div className="chart">
        <Line
          options={options("Biểu đồ nhiệt độ trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "Nhiệt độ",
            listDataChartInfo.envTemps
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ độ ẩm trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "Độ ẩm",
            listDataChartInfo.envHumis
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ độ PH trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "PH",
            listDataChartInfo.pHs
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ độ sáng trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "Độ sáng",
            listDataChartInfo.staLights
          )}
        />
      </div>
    </div>
  );
};

export default ChartSensor;
