import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import BoxWrapper from './util/BoxWrapper';
import sentimentOverTime from './endpoint/home';

const Wrapper = styled(BoxWrapper)`
  width: 40%;
  display: inline-block;
  margin: 5px;
`;

const options = {
  title: {
    text: 'Sentiment Over Time',
    position: 'top',
    display: true,
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
      },
    ],
    yAxes: [
      {
        ticks: {
          // eslint-disable-next-line no-unused-vars
          callback(label, index, labels) {
            return label;
          },
        },
        gridLines: {
          drawOnChartArea: false,
        },
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Count',
        },
        position: 'left',
        id: 'y-axis-1',
      },
    ],
  },
};

function SentimentGraph() {
  const [sentimentData, setSentimentData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Positive',
        data: [],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: 'Negative',
        data: [],
        fill: false,
        backgroundColor: 'rgb(54,162,235)',
        borderColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Neutral',
        data: [],
        fill: false,
        backgroundColor: '#e29578',
        borderColor: '#d4a373',
      },
    ],
  });

  useEffect(() => {
    sentimentOverTime().then((res) => {
      setSentimentData(res);
    });
  }, []);
  return (
    <Wrapper>
      <Line data={sentimentData} options={options} />
    </Wrapper>
  );
}

export default SentimentGraph;
