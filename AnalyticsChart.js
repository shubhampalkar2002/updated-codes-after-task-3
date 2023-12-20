// AnalyticsChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState({});
  const [formData, setFormData] = useState({
    accessTime: '',
    accessDate: '',
    employeeName: '',
    filter: '',
  });

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/chartData');
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
            data: data.values,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Submit form data to backend
      const response = await fetch('http://localhost:5000/api/logData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const updatedData = await response.json();

      // Update chart data based on the form submission
      setChartData({
        labels: updatedData.labels,
        datasets: [
          {
            label: 'Analytics Data',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            data: updatedData.values,
          },
        ],
      });

      // Clear the form data
      setFormData({
        accessTime: '',
        accessDate: '',
        employeeName: '',
        filter: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Your Analytics Chart</h2>
      <Line data={chartData} />

      <form onSubmit={handleSubmit}>
        <label>
          Access Time:
          <input
            type="time"
            name="accessTime"
            value={formData.accessTime}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Access Date:
          <input
            type="date"
            name="accessDate"
            value={formData.accessDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Employee Name:
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Filter:
          <input
            type="text"
            name="filter"
            value={formData.filter}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AnalyticsChart;
