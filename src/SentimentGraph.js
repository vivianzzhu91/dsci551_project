import React from 'react';
import './App.css';

function SentimentGraph() {
  return (
    <iframe
      title="sentiment over time"
      src="http://localhost:5601/app/visualize#/edit/49bb7b40-a44e-11eb-96fc-cdb217988c24?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))"
      height="300"
      width="300"
    />
  );
}

export default SentimentGraph;
