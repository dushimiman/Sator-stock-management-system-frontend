// src/components/StockChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Container } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockChart = ({ stockData }) => {
  const branches = stockData.map(branch => branch.name);
  const gpsData = stockData.map(branch => branch.items.GPS);
  const speedGovernorsData = stockData.map(branch => branch.items.SPEED_GOVERNORS);
  const fuelLeverSensorData = stockData.map(branch => branch.items.FUEL_LEVER_SENSOR);
  const sensorForRoscoData = stockData.map(branch => branch.items.SENSOR_FOR_ROSCO);
  const x1rProductData = stockData.map(branch => branch.items.X_1R_PRODUCT);

  const data = {
    labels: branches,
    datasets: [
      {
        label: 'GPS',
        data: gpsData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Speed Governors',
        data: speedGovernorsData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Fuel Lever Sensor',
        data: fuelLeverSensorData,
        backgroundColor: 'rgba(255, 206, 86, 0.5)',
      },
      {
        label: 'Sensor for Rosco',
        data: sensorForRoscoData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
      {
        label: 'X-1R Product',
        data: x1rProductData,
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Stock Statistics',
      },
    },
  };

  return (
    <Container>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default StockChart;
