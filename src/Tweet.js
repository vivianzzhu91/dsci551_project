import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import { BoxWrapper } from "./Home";

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
const Date = styled.div`
  color: #a9a9a9;
  margin-left: 28px;
  font-size: 15px;
  margin-top: 10px;
`;
const Tag = styled.div`
  border-radius: 3px;
  background-color: #f6f4d2;
  color: #2ec4b6;
  width: 80px;
  height: 30px;
  float: right;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;

function Tweet() {
  const Wrapper = styled(BoxWrapper)`
    width: 700px;
  `;

  return (
    <Wrapper className="tweet">
      <ol>
        <Item>
          love your app!
          <Tag>Covid</Tag>
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          It's not user friendly at all
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          The App is coming from no where
          <Date>Jan 19, 2021</Date>
        </Item>
        <Item>
          Is it cost-effective to write this really long long long long test
          methods
          <Date>Jan 19, 2021</Date>
        </Item>
      </ol>
    </Wrapper>
  );
}

export default Tweet;
