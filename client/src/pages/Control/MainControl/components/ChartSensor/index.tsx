import { chartInfo } from "models/Chart";

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
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  chartInfo: chartInfo;
};

const ChartSensor = ({ chartInfo }: ChartProps) => {
  return (
    <div className="charts">
      <Line options={chartInfo.options} data={chartInfo.data} />
    </div>
  );
};

export default ChartSensor;
