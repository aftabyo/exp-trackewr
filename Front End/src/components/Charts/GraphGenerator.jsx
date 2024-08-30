import { Bar, Doughnut, Line, Pie, PolarArea, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  RadarController
);

export default function GraphGenerator({
  data = [],
  type = "",
  x = "",
  y = "",
  title = "",
}) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        label: "Value",
        data: data.map((item) => item.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: x,
        },
      },
      y: {
        title: {
          display: true,
          text: y,
        },
      },
    },
  };

  if (type === "Bar") return <Bar data={chartData} options={options} />;
  else if (type === "Doughnut")
    return <Doughnut data={chartData} options={options} />;
  else if (type === "Line") return <Line data={chartData} options={options} />;
  else if (type === "Pie") return <Pie data={chartData} options={options} />;
  else if (type === "PolarArea")
    return <PolarArea data={chartData} options={options} />;
  else if (type === "Radar")
    return <Radar data={chartData} options={options} />;
}
