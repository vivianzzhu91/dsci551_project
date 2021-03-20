import React from "react";
import "./App.css";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { BoxWrapper } from "./Home";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "Positive",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
      yAxisID: "y-axis-1",
    },
    {
      label: "Negative",
      data: [1, 2, 1, 1, 2, 2],
      fill: false,
      backgroundColor: "rgb(54, 162, 235)",
      borderColor: "rgba(54, 162, 235, 0.2)",
    },
    {
      label: "Neutral",
      data: [1, 5, 7, 8, 2, 2],
      fill: false,
      backgroundColor: "#e29578",
      borderColor: "#d4a373",
    },
  ],
};

const options = {
  title: {
    text: "Sentiment Over Time",
    position: "top",
    display: true,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          callback: function (label, index, labels) {
            return label + "%";
          },
        },
        gridLines: {
          drawOnChartArea: false,
        },
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
      },
    ],
  },
};

function SentimentGraph() {
  const Wrapper = styled(BoxWrapper)`
    width: 40%;
    display: inline-block;
    margin: 5px;
  `;
  return (
    <Wrapper>
      <Line data={data} options={options} />
    </Wrapper>
  );
}

export default SentimentGraph;
