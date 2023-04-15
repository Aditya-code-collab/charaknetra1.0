import React, { useEffect, useRef, useState } from "react";

const LineChart = () => {
  const chartRef = useRef(null);
  
    const heart_minutes= [
      {"value": 25, "startTimeMillis": "1681109537966", "endTimeMillis": "1681195937966", "startTime": "10 Apr 2023 06:52 am", "endTime": "11 Apr 2023 06:52 am"},
      {"value": 17, "startTimeMillis": "1681195937966", "endTimeMillis": "1681282337966", "startTime": "11 Apr 2023 06:52 am", "endTime": "12 Apr 2023 06:52 am"},
      {"value": 22, "startTimeMillis": "1681282337966", "endTimeMillis": "1681344001000", "startTime": "12 Apr 2023 06:52 am", "endTime": "13 Apr 2023 12:00 am"},
      {"value": 20, "startTimeMillis": "1681370400000", "endTimeMillis": "1681456800000", "startTime": "13 Apr 2023 12:00 am", "endTime": "14 Apr 2023 12:00 am"},
      {"value": 19, "startTimeMillis": "1681456800000", "endTimeMillis": "1681543200000", "startTime": "14 Apr 2023 12:00 am", "endTime": "15 Apr 2023 12:00 am"},
      {"value": 23, "startTimeMillis": "1681543200000", "endTimeMillis": "1681629600000", "startTime": "15 Apr 2023 12:00 am", "endTime": "16 Apr 2023 12:00 am"},
      {"value": 18, "startTimeMillis": "1681629600000", "endTimeMillis": "1681716000000", "startTime": "16 Apr 2023 12:00 am", "endTime": "17 Apr 2023 12:00 am"},
      {"value": 21, "startTimeMillis": "1681716000000", "endTimeMillis": "1681802400000", "startTime": "17 Apr 2023 12:00 am", "endTime": "18 Apr 2023 12:00 am"},
      {"value": 26, "startTimeMillis": "1681802400000", "endTimeMillis": "1681888800000", "startTime": "18 Apr 2023 12:00 am", "endTime": "19 Apr 2023 12:00 am"},
      {"value": 24, "startTimeMillis": "1681888800000", "endTimeMillis": "1681975200000", "startTime": "19 Apr 2023 12:00 am", "endTime": "20 Apr 2023 12:00 am"}
    ]
  
  
  const [heartminute, setheartminute] = useState(heart_minutes);

  const smartwatch = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_NOCODE
        );
      const data = await response.json();
      setheartminute(data.heart_minutes);
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

    // if(heartminute==null){
    //     heartminute =
    // }
    // Extract the x-axis (labels) and y-axis (data values) from the response
    const labels = heartminute? heartminute.map((data) => formatDate(data.startTimeMillis)):[];
    const dataValues = heartminute? heartminute.map((data) => data.value):[];

    // Chart data
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Heart Minutes",
          data: dataValues,
          fill: false,
          borderColor: "#008aff",
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
      type: "line",
      data: data,
      options: options,
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => myChart.destroy();
  }, []);

  return <canvas ref={chartRef}></canvas>;
};

export default LineChart;
