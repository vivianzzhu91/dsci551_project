import React from 'react';
import './App.css';
import moment from 'moment';
import styled from 'styled-components';
import BoxWrapper from './util/BoxWrapper';

const Item = styled.li`
  padding: 10px 5px 10px 5px;
  display: block;
  border-bottom: 1px solid #e2e2e2;
  counter-increment: item;
  margin-top: 5px;
  :before {
    margin-right: 10px;
    content: counter(item);
    border-radius: 100%;
    color: #a9a9a9;
    width: 1.2em;
    text-align: center;
    display: inline-block;
    font-size: 15px;
  }
`;
const Text = styled.div`
  width: 300px;
  overflow-wrap: break-word;
  white-space: normal;
  display: inline-block;
`;
const Date = styled.div`
  color: #a9a9a9;
  margin-left: 28px;
  font-size: 15px;
  margin-top: 10px;
`;
const Tag = styled.div`
  border-radius: 3px;
  border: 1px solid #0077b6;
  background-color: #caf0f8;
  color: #0077b6;
  width: 110px;
  height: 30px;
  float: right;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  font-size: 12px;
  vertical-align: center;
  align-items: center;
`;
const PositiveTag = styled(Tag)`
  border: 1px solid #87986a;
  background-color: #e9f5db;
  color: #87986a;
`;
const NegativeTag = styled(Tag)`
  border: 1px solid #8a2846;
  background-color: #ffe0e9;
  color: #8a2846;
`;
const NeutralTag = styled(Tag)`
  border: 1px solid #bc6c25;
  background-color: #ffe5d9;
  color: #bc6c25;
`;
const Bar = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding: 10px 0 10px 30px;
`;
const Wrapper = styled(BoxWrapper)`
  width: 100%;
  padding-right: 20px;
  overflow-y: scroll;
  height: 770px;
`;

const getSentiment = (sentiment) => {
  const max = Math.max(
    Math.abs(sentiment.pos),
    Math.abs(sentiment.neg),
    Math.abs(sentiment.neu),
  );
  const res =
    max === Math.abs(sentiment.neg) ? (
      <NegativeTag>Negative</NegativeTag>
    ) : (
      <NeutralTag>Neutral</NeutralTag>
    );
  return max === Math.abs(sentiment.pos) ? (
    <PositiveTag>Positive</PositiveTag>
  ) : (
    res
  );
};

function Tweet(props) {
  const { myHits } = props;

  return (
    <Wrapper className="tweet">
      <Bar>
        <Text>Latest {myHits.length} Tweets</Text>
      </Bar>
      <ol>
        {myHits.map((tweet) => {
          return (
            <Item key={tweet.id}>
              <Text>{tweet.text}</Text>
              {getSentiment(tweet.sentiment)}
              {tweet.tags.map((tag) => {
                return <Tag key={tag}>{tag}</Tag>;
              })}
              <Date>{moment(tweet.date).format('YYYY-MM-DD HH:mm:ss')}</Date>
            </Item>
          );
        })}
      </ol>
    </Wrapper>
  );
}

export default Tweet;
