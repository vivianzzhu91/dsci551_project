import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import Tweet from "./Tweet";

export const BoxWrapper = styled.div`
  border-radius: 5px;
  padding: 5px;
  text-align: left;
  background-color: white;
`;

function Home() {
  return <Tweet />;
}

export default Home;
