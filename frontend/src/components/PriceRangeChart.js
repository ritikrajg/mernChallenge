import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, ArcElement, BarController } from 'chart.js';

Chart.register(CategoryScale, ArcElement, BarController);
const PriceRangeChart = ({ data }) => {
  const chartData = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500'],
    datasets: [
      {
        label: 'Number of Sales',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default PriceRangeChart;
