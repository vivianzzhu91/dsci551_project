import React, { useState } from "react";
import styled from "styled-components";
import "./Switch.css";

import { tabs } from "./App";

function Switch(props) {
  return (
    <ul>
      <li
        onClick={() => {
          props.setTab(tabs.HOME);
        }}
        className={props.tab === tabs.HOME ? "active" : "inactive"}
      >
        Home
      </li>
      <li
        onClick={() => {
          props.setTab(tabs.SEARCH);
        }}
        className={props.tab === tabs.SEARCH ? "active" : "inactive"}
      >
        Search
      </li>
      <li
        onClick={() => {
          props.setTab(tabs.DISPLAY);
        }}
        className={props.tab === tabs.DISPLAY ? "active" : "inactive"}
      >
        Display
      </li>
    </ul>
  );
}

export default Switch;
