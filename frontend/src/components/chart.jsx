import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
function Chart({ track }) {
  const labels = [];
  const dataElev = [];

  for (let index = 0; index < track.length; index++) {
    dataElev.push(track[index]);
    labels.push(index);
  }
  ChartJS.register(
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
        borderColor: "#716fd9",
        backgroundColor: "#716fd938",
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
    plugins: {
      tooltip: {
        bodyFont: {
          family: "Times New Roman",
          size: 17,
        },
        mode: "nearest",
        intersect: false, //no se si dejarlo
        displayColors: false,
        backgroundColor: "#716fd9db",
        caretPadding: 8,
        caretSize: 8,
        padding: 7,
        borderColor: "#716fd9",
        borderWidth: 1,
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
          borderColor: "black",
          borderWidth: 3,
        },
        ticks: {
          color: "transparent",
        },
      },
      y: {
        grid: {
          display: false,
          borderColor: "transparent",
        },
        ticks: {
          stepSize: 250,
          color: "black",
        },
      },
    },
  };

  return (
    <>
      <div style={{ width: "100%", height: "300px" }}>
        <Line options={options} data={data} />
      </div>
    </>
  );
}
export default Chart;
