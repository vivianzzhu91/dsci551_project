import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

const AppBackground = styled.div`
  background-color: #fdf0d5;
  width: 100%;
  height: 100%;
  background-size: cover;
  top: 0;
  position: absolute;
`;

function App() {
  return (
    <div className="App">
      <AppBackground></AppBackground>
    </div>
  );
}

export default App;
