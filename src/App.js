import React from 'react';
import { Route, HashRouter as Router, Switch, Link } from 'react-router-dom';
import './App.css';
import styled from 'styled-components';

import Home from './Home';
import Search from './Search';
import Display from './Display';

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
  font-family: 'Roboto', sans-serif;
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
  font-family: 'Josefin Sans', sans-serif;
  text-transform: uppercase;
`;

function App() {
  return (
    <div className="App">
      <AppBackground>
        <Router>
          <Title>Sentiment Analysis on Tweets</Title>
          <div className="switchTab">
            <ul>
              <li className="home">
                <Link to="/">Home</Link>
              </li>
              <li className="search">
                <Link to="/search">Search</Link>
              </li>
              <li className="display">
                <Link to="/display">Display</Link>
              </li>
            </ul>
          </div>
          <ContentBackground>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/search" exact component={Search} />
              <Route path="/display" exact component={Display} />
            </Switch>
          </ContentBackground>
        </Router>
      </AppBackground>
    </div>
  );
}

export default App;
