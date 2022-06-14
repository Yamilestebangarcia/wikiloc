import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  Filler,
} from "chart.js";
import React, { useState, useEffect, useRef } from "react";

function Chart({ track, point, setpointChart }) {
  const chartRef = useRef(null);
  const ElementChartRef = useRef(null);

  const labels = [];
  const dataElev = [];

  for (let index = 0; index < track.length; index++) {
    dataElev.push(track[index].ele);

    labels.push(index);
  }

  ChartJS.register(
    LineController,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
  );

  const data = {
    labels,
    datasets: [
      {
        data: dataElev,
        borderColor: "#83bd75",
        backgroundColor: "#e9efc0",
        hoverBackgroundColor: "red",
        hoverRadius: 6,
        pointBackgrounColor: "transparent",
        pointRadius: 0,
        pointBorderColor: "transparent",
        tension: 0.3,
      },
    ],
  };
  const options = {
    fill: true,

    responsive: true,
    onClick: (e, item) => {
      if (item[0]) {
        setpointChart(item[0].index);
      }
    },
    plugins: {
      tooltip: {
        bodyFont: {
          family: "Times New Roman",
          size: 17,
        },
        mode: "nearest",
        intersect: false, //no se si dejarlo
        displayColors: false,
        backgroundColor: "#4e944f",
        caretPadding: 8,
        caretSize: 8,
        padding: 7,
        borderColor: "transparent",
        borderWidth: 0,
        callbacks: {
          title: function (context) {
            return "";
          },
          label: function (context) {
            return "Altura " + context.formattedValue + " m";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          borderColor: "#4e944f",
          borderWidth: 3,
        },

        ticks: {
          color: "transparent",
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          stepSize: 250,
          color: "#4e944f",
        },
      },
    },
  };

  useEffect(() => {
    chartRef.current = new ChartJS(ElementChartRef.current, {
      type: "line",
      data: data,
      options: options,
    });
  }, []);

  useEffect(() => {
    if (point) {
      chartRef.current.setActiveElements([{ index: point, datasetIndex: 0 }]);

      chartRef.current.tooltip.setActiveElements([
        { index: point, datasetIndex: 0 },
      ]);
      chartRef.current.update();
    }
  }, [point]);
  return (
    <>
      <div style={{ width: "100%", height: "auto" }}>
        <canvas ref={ElementChartRef} id="canvas"></canvas>
      </div>
    </>
  );
}
export default Chart;
