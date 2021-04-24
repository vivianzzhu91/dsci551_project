import React from 'react';
import './App.css';
import styled from 'styled-components';
import moment from 'moment';
import { Scatter, Doughnut } from 'react-chartjs-2';
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
        ticks: {
          userCallback(label) {
            return moment(label).format('DD/MM/YY');
          },
        },
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Date',
        },
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
      <Scatter data={searchGraphData} options={options} />
      <Doughnut data={tagCountData} options={pieOptions} />
    </Wrapper>
  );
}

export default SearchGraph;
