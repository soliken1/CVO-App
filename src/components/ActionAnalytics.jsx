import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import fetchActionCounts from "../hooks/fetchActionCounts";

const ActionAnalytics = () => {
  const [chartData, setChartData] = useState(null);
  const [topActions, setTopActions] = useState(new Set());

  const chartRef = useRef(null);

  const getRandomColor = () => {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;
  };

  useEffect(() => {
    const getData = async () => {
      const actionCounts = await fetchActionCounts();
      if (Object.keys(actionCounts).length === 0) return;

      const labels = Object.keys(actionCounts).sort();
      const actionFrequency = {}; // Store total action counts

      labels.forEach((date) => {
        Object.entries(actionCounts[date]).forEach(([action, count]) => {
          actionFrequency[action] = (actionFrequency[action] || 0) + count;
        });
      });

      // Get top 3 most frequent actions
      const sortedActions = Object.entries(actionFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([action]) => action);

      setTopActions(new Set(sortedActions));

      // Prepare datasets
      const actions = new Set(Object.keys(actionFrequency)); // All unique actions
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
    <div className="w-full mt-4 flex flex-col gap-1">
      <label className="text-lg font-semibold font-roboto">
        Specific User Activities
      </label>
      {chartData ? (
        <>
          <label className=" text-xs text-gray-400 mb-2">
            Top 3 Most Frequent Actions Labeled:
          </label>
          <Line
            ref={chartRef}
            height={200}
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    filter: (legendItem) => topActions.has(legendItem.text),
                  },
                },
              },
              scales: {
                x: { title: { display: true, text: "Date" } },
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "Action Count" },
                },
              },
            }}
          />
        </>
      ) : (
        <div className="w-full h-8 animate-pulse bg-[#050419] rounded-full duration-1000 mt-5"></div>
      )}
    </div>
  );
};

export default ActionAnalytics;
