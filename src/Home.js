import React from 'react';
import './App.css';
import styled from 'styled-components';

import BoxWrapper from './util/BoxWrapper';
import Tweet from './Tweet';
// import SentimentGraph from './SentimentGraph';

const HomeWrapper = styled(BoxWrapper)`
  display: flex;
  height: 100%;
`;

function Home() {
  return (
    <HomeWrapper>
      <Tweet />
      {/* <SentimentGraph /> */}
    </HomeWrapper>
  );
}

export default Home;
