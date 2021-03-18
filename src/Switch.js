import React from "react";

import { tabs } from "./App";

function Switch(props) {
  return (
    <div className="switchTab">
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
    </div>
  );
}

export default Switch;
