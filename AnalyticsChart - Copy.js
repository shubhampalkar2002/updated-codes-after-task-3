// src/components/AnalyticsChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/analyticsData.json'); // Adjust the path accordingly
        const data = await response.json();

        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: 'Analytics Data',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: data.values,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs once

  return (
    <div>
      <h2>Your Analytics Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default AnalyticsChart;
