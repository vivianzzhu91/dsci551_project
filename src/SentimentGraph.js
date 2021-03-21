import React from 'react';
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
  return (
    <Wrapper>
      <Line data={sentimentOverTime()} options={options} />
    </Wrapper>
  );
}

export default SentimentGraph;
