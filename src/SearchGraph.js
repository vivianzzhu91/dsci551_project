import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Line, Doughnut } from 'react-chartjs-2';
import BoxWrapper from './util/BoxWrapper';

const Wrapper = styled(BoxWrapper)`
  width: 100%;
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
          fixedStepSize: 1,
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

const pieOptions = {
  title: {
    text: 'Tag count',
    position: 'top',
    display: true,
  },
};
function SearchGraph(props) {
  const { searchGraphData, tagCountData } = props;
  return (
    <Wrapper>
      <Line data={searchGraphData} options={options} />
      <Doughnut data={tagCountData} options={pieOptions} />
    </Wrapper>
  );
}

export default SearchGraph;
