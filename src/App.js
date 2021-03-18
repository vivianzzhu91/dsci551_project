import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import Switch from "./Switch";

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

function App() {
  const [tab, setTab] = useState(tabs.HOME);

  return (
    <div className="App">
      <AppBackground>
        <Switch setTab={setTab} tab={tab} />
        {tab === tabs.HOME
          ? "home"
          : tab === tabs.SEARCH
          ? "search"
          : "display"}
      </AppBackground>
    </div>
  );
}

export default App;
