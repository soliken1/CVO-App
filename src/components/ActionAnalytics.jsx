import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import fetchActionCounts from "../hooks/fetchActionCounts";

const ActionAnalytics = () => {
  const [chartData, setChartData] = useState(null);

  const chartRef = useRef(null);

  const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  };

  useEffect(() => {
    const getData = async () => {
      const actionCounts = await fetchActionCounts();
      if (Object.keys(actionCounts).length === 0) return;

      const labels = Object.keys(actionCounts).sort();
      const actions = new Set();

      labels.forEach((date) => {
        Object.keys(actionCounts[date]).forEach((action) =>
          actions.add(action)
        );
      });

      const datasets = Array.from(actions).map((action) => ({
        label: action,
        data: labels.map((date) => actionCounts[date][action] || 0),
        borderColor: getRandomColor(),
        fill: false,
      }));

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      setChartData({ labels, datasets });
    };

    getData();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);
  return (
    <div className="w-full h-60">
      {chartData ? (
        <Line
          ref={chartRef} // Attach the reference
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: {
                beginAtZero: true,
                title: { display: true, text: "Action" },
              },
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default ActionAnalytics;
