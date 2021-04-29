import React from 'react';
import './App.css';

function SentimentGraph() {
  return (
    <div className="row">
      <div className="col-12">
        <iframe
          title="sentiment"
          src="http://localhost:5601/app/dashboards#/view/0fd9ad10-9f86-11eb-8d49-ff4e822982ba?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A5000)%2Ctime%3A(from%3Anow-2w%2Cto%3Anow))"
          height="770"
          width="820"
        />
      </div>
    </div>
  );
}

export default SentimentGraph;
