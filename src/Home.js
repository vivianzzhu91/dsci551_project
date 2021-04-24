/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';

import elasticsearch from 'elasticsearch';
import BoxWrapper from './util/BoxWrapper';
import Tweet from './Tweet';
import SentimentGraph from './SentimentGraph';

const HomeWrapper = styled(BoxWrapper)`
  display: flex;
  height: 100%;
`;

const client = elasticsearch.Client({
  host: 'http://localhost:9200/',
});

function Home() {
  const [myHits, setMyHits] = useState([]);

  useEffect(() => {
    client
      .search({
        index: 'twitter-stream',
        from: 0,
        size: 20,
        body: {},
      })
      .then((data) => {
        const { hits } = data.hits;
        const res = [];
        hits.forEach((item) => {
          const src = item._source;
          res.push({
            id: item._id,
            date: src.date,
            text: src.text,
            user: src.user,
            sentiment: src.sentiment,
            tags: src.tags,
          });
        });
        setMyHits(res);
      });
  }, []);
  return (
    <HomeWrapper>
      <Tweet myHits={myHits} />
      <SentimentGraph />
    </HomeWrapper>
  );
}

export default Home;
