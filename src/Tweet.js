import React from 'react';
import './App.css';
import styled from 'styled-components';
import elasticsearch from 'elasticsearch';
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
  width: 90px;
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
const Bar = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding: 10px 0 10px 30px;
`;

function Tweet() {
  const Wrapper = styled(BoxWrapper)`
    width: 650px;
    padding-right: 20px;
    overflow-y: scroll;
  `;
  const client = elasticsearch.Client({
    host: 'http://localhost:9200/',
  });
  client.search(
    {
      index: 'twitter-stream',
      body: {
        query: {
          match: {
            user: 'Amirm15625567',
          },
        },
      },
    },
    (err, result) => {
      if (err) console.log(err);
      if (result) {
        console.log(result);
      }
    },
  );

  return (
    <Wrapper className="tweet">
      <Bar>
        <Text>234 Tweets</Text>
      </Bar>
      <ol>
        <Item>
          <Text>love your app!</Text>
          <PositiveTag>Positive</PositiveTag>
          <Tag>Covid</Tag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          <Text>It&apos;s not user friendly at all</Text>
          <PositiveTag>Positive</PositiveTag>
          <Tag>Online Class</Tag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          <Text>The App is coming from no where</Text>
          <NegativeTag>Negative</NegativeTag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          <Text>
            Is it cost-effective to write this really long long long long test
            methods
          </Text>
          <PositiveTag>Positive</PositiveTag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          <Text>
            Is it cost-effective to write this really long long long long test
            methods
          </Text>
          <PositiveTag>Positive</PositiveTag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          <Text>
            Is it cost-effective to write this really long long long long test
            methods
          </Text>
          <PositiveTag>Positive</PositiveTag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          <Text>
            Is it cost-effective to write this really long long long long test
            methods
          </Text>
          <PositiveTag>Positive</PositiveTag>
          <Date>Jan 19, 2021</Date>
        </Item>
      </ol>
    </Wrapper>
  );
}

export default Tweet;
