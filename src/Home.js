import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import Tweet from "./Tweet";
import SentimentGraph from "./SentimentGraph";

export const BoxWrapper = styled.div`
  border-radius: 5px;
  padding: 5px;
  text-align: left;
  background-color: white;
`;
const HomeWrapper = styled(BoxWrapper)`
  display: flex;
`;

function Home() {
  return (
    <HomeWrapper>
      <Tweet />
      <SentimentGraph />
    </HomeWrapper>
  );
}

export default Home;
