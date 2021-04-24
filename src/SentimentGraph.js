import React from 'react';
import './App.css';

function SentimentGraph() {
  return (
    <div className="row">
      <div className="col-12">
        <iframe
          title="dashboard"
          src="http://localhost:5601/app/dashboards#/view/eaebe9d0-a4b4-11eb-8196-c7a80bbad262?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))&show-top-menu=true&show-query-input=true&show-time-filter=true"
          height="600"
          width="500"
        />
      </div>
    </div>
  );
}

export default SentimentGraph;
