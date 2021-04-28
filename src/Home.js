/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';

import elasticsearch from 'elasticsearch';
import moment from 'moment';
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
    setInterval(() => {
      client
        .search({
          index: 'twitter-stream',
          size: 20,
          body: {
            query: {
              match_all: {},
            },
            sort: [
              {
                date: {
                  order: 'desc',
                },
              },
            ],
          },
        })
        .then((data) => {
          const { hits } = data.hits;
          const res = [];
          hits.forEach((item) => {
            const src = item._source;
            res.push({
              id: item._id,
              date: moment(src.date)
                .add(8, 'hours')
                .format('YYYY-MM-DD HH:mm:ss'),
              text: src.text,
              user: src.user,
              sentiment: src.sentiment,
              tags: src.tags,
            });
          });
          setMyHits(res);
        });
    }, 5000);
  }, []);
  return (
    <HomeWrapper>
      <div className="row">
        <div className="col-6">
          <Tweet myHits={myHits} />
        </div>
        <div className="col-6">
          <SentimentGraph />
        </div>
      </div>
    </HomeWrapper>
  );
}

export default Home;
