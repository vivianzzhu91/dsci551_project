import React from 'react';
import './App.css';

function SentimentGraph() {
  return (
    <div className="row">
      <div className="col-6">
        <iframe
          title="sentiment over time"
          src="http://localhost:5601/app/visualize#/edit/49bb7b40-a44e-11eb-96fc-cdb217988c24?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))"
          height="300"
          width="300"
        />
      </div>
      <div className="col-6">
        <iframe
          title="tag count over time"
          src="http://localhost:5601/app/visualize#/edit/98c0b510-a4a4-11eb-acf1-cb2f1ba61330?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))"
          height="300"
          width="300"
        />
      </div>
      <div className="col-6">
        <iframe
          title="tag word cloud"
          src="http://localhost:5601/app/visualize#/edit/e528a800-a4a8-11eb-acf1-cb2f1ba61330?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-15m%2Cto%3Anow))"
          height="300"
          width="300"
        />
      </div>
    </div>
  );
}

export default SentimentGraph;
