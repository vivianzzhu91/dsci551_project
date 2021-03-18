import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import Switch from "./Switch";
import Home from "./Home";

export const tabs = {
  HOME: "Home",
  SEARCH: "search",
  DISPLAY: "display",
};

const AppBackground = styled.div`
  background-color: #fdf0d5;
  width: 100%;
  height: 100%;
  background-size: cover;
  top: 0;
  left: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  font-family: "Roboto", sans-serif;
`;
const ContentBackground = styled.div`
  position: absolute;
  top: 20%;
  background-color: #eeeeee;
  width: 90%;
  height: 75%;
  padding: 10px;
  border-radius: 10px;
`;
const Title = styled.h1`
  font-family: "Josefin Sans", sans-serif;
  text-transform: uppercase;
`;

function App() {
  const [tab, setTab] = useState(tabs.HOME);

  return (
    <div className="App">
      <AppBackground>
        <Title>Sentiment Analysis on Tweets</Title>
        <Switch setTab={setTab} tab={tab} />
        <ContentBackground>
          {tab === tabs.HOME ? (
            <Home />
          ) : tab === tabs.SEARCH ? (
            "search"
          ) : (
            "display"
          )}
        </ContentBackground>
      </AppBackground>
    </div>
  );
}

export default App;
