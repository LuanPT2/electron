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

  const objectData = (labels, lineName, data, colorLine, backgroundColor) => {
    return {
      labels,
      datasets: [
        {
          label: lineName,
          data: data,
          borderColor: colorLine,
          backgroundColor: backgroundColor,
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
            listDataChartInfo.envTemps,
            "rgb(255, 0, 0)",
            "rgba(255, 0, 0, 0.5)"
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ độ ẩm trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "Độ ẩm",
            listDataChartInfo.envHumis,
            "rgb(0, 255, 0)",
            "rgba(0, 255, 0, 0.5)"
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ độ sáng trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "Độ sáng",
            listDataChartInfo.envIllus,
            "rgb(255, 255, 0)",
            "rgba(255, 255, 0, 0.5)"
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ độ PH trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "PH",
            listDataChartInfo.pHs,
            "rgb(205, 133, 63)",
            "rgba(205, 133, 63)"
          )}
        />
      </div>
      <div className="chart">
        <Line
          options={options("Biểu đồ mực nước trong ngày")}
          data={objectData(
            listDataChartInfo.lables,
            "Mực nước",
            listDataChartInfo.waters,
            "rgb(53, 162, 112)",
            "rgba(53, 162, 235, 0.5)"
          )}
        />
      </div>
    </div>
  );
};

export default ChartSensor;
