import React from 'react';
import './App.css';
import styled from 'styled-components';
import moment from 'moment';
import { Scatter, Doughnut, Bar } from 'react-chartjs-2';
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

const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Covid-19 Trend Over Time',
    },
  },
};
function SearchGraph(props) {
  const { searchGraphData, tagCountData, covidData } = props;
  return (
    <Wrapper>
      <Scatter data={searchGraphData} options={options} />
      <Doughnut data={tagCountData} options={pieOptions} />
      <Bar data={covidData} options={barOptions} />
    </Wrapper>
  );
}

export default SearchGraph;
