import type { ChartData, ChartOptions } from 'chart.js';

export type chartInfo = {
    options: ChartOptions<'line'>;
    data: ChartData<'line'>;
};
  
  