import React, { useEffect, useRef, useState } from "react";

const BarChart = () => {
  const chartRef = useRef(null);
  
  const dailySteps = [
    { date: "2023-04-10", count: 10000 },
    { date: "2023-04-11", count: 7500 },
    { date: "2023-04-12", count: 12000 },
    { date: "2023-04-13", count: 9000 },
    { date: "2023-04-14", count: 8000 },
    { date: "2023-04-15", count: 11000 },
    { date: "2023-04-16", count: 7000 },
  ];

  const [stepCount, setStepCount] = useState(dailySteps);

  const fitnessData = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_NOCODE
      );
      const data = await response.json();
      setStepCount(data.dailySteps);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    fitnessData();

    // Helper function to format the date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getDate()} ${date.toLocaleString("default", {
        month: "short",
      })} ${date.getFullYear()}`;
    };

    // if(stepCount==null){
    //     stepCount =
    // }
    // Extract the x-axis (labels) and y-axis (data values) from the response
    const labels = stepCount ? stepCount.map((data) => formatDate(data.date)) : [];
    const dataValues = stepCount ? stepCount.map((data) => data.count) : [];

    // Chart data
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Daily Step Count",
          data: dataValues,
          backgroundColor: "#008aff",
          hoverBackgroundColor: "#005eff",
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
              beginAtZero: true,
            },
          },
        ],
      },
    };

    // Create new chart instance
    const myChart = new window.Chart(ctx, {
      type: "bar",
      data: data,
      options: options,
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => myChart.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
