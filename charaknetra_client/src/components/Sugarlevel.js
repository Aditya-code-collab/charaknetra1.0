import React, { useEffect, useRef, useState } from "react";
require('dotenv').config();
const Sugarlevel = () => {
  const chartRef = useRef(null);
  
  // Generate dummy sugar level data
  const sugarLevels = [];
  const startDate = new Date(2023, 3, 10);
  for (let i = 0; i < 10; i++) {
    const date = new Date(startDate.getTime() + i * 86400000);
    const sugarLevel = Math.floor(Math.random() * 30) + 70; // generate a number between 70 and 100
    const dataPoint = {
      value: sugarLevel,
      startTimeMillis: date.getTime(),
      endTimeMillis: date.getTime() + 86400000,
      startTime: date.toLocaleString(),
      endTime: new Date(date.getTime() + 86400000).toLocaleString()
    };
    sugarLevels.push(dataPoint);
  }
  
  const [sugarLevelData, setSugarLevelData] = useState(sugarLevels);

  const smartwatch = async () => {
    try {
      const response = await fetch(
        "https://v1.nocodeapi.com/aditya360/fit/tWpqXXaGECMOlBQp/dataSourcesList"
        );
      const data = await response.json();
      setSugarLevelData(data.sugarLevels);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    smartwatch();

    // Helper function to format the timestamp
    const formatDate = (timestamp) => {
      const date = new Date(Number(timestamp));
      return `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;
    };

    // Extract the x-axis (labels) and y-axis (data values) from the response
    const labels = sugarLevelData? sugarLevelData.map((data) => formatDate(data.startTimeMillis)):[];
    const dataValues = sugarLevelData? sugarLevelData.map((data) => data.value):[];

    // Chart data
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Sugar Levels",
          data: dataValues,
          fill: false,
          borderColor: "#e71d36",
        },
      ],
    };

    // Chart options
    const options = {
      responsive: true,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,
            },
          },
        ],
      },
    };

    // Create new chart instance
    const myChart = new window.Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => myChart.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default Sugarlevel;
