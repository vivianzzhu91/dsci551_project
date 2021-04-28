/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import elasticsearch from 'elasticsearch';

// import moment from 'moment';
// import styled from 'styled-components';
// import BoxWrapper from './util/BoxWrapper';

const client = elasticsearch.Client({
  host: 'http://localhost:9200/',
});

// const Wrapper = styled(BoxWrapper)`
//   padding-top: 20px;
//   text-align: center;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
// `;

function Display() {
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);

  useEffect(() => {
    client
      .search({
        index: 'twitter-stream',
        size: 1000,
        body: {
          query: {
            match_all: {},
          },
        },
      })
      .then((response) => {
        const { hits } = response.hits;
        const res = [];
        hits.forEach((item) => {
          const src = item._source;
          res.push({
            id: item._id,
            date: src.date,
            text: src.text,
            user: src.user,
            sentiment: src.sentiment,
            tags: src.tags,
          });
        });
        setData(res);
      });
  }, []);

  return (
    <iframe
      title="table"
      src="http://localhost:5601/app/dashboards#/view/d4d783c0-a68f-11eb-9426-ebe1cb92d42d?embed=true&_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-14d%2Cto%3Anow))"
      height="830"
      width="1700"
    />
  );
  // return (
  // <Wrapper>
  //   <table className="table">
  //     <thead>
  //       <tr>
  //         <th scope="col">#</th>
  //         <th scope="col">date</th>
  //         <th scope="col">Twitter Text</th>
  //         <th scope="col">Author</th>
  //         <th scope="col">Sentiment</th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {data.map((item, i) => {
  //         return (
  //           <tr key={item.id}>
  //             <th scope="row">{i}</th>
  //             <td>{moment(item.date).format('YYYY-MM-DD HH:mm')}</td>
  //             <td>{item.text}</td>
  //             <td>{item.user}</td>
  //             <td>
  //               <p>Positive: {item.sentiment.pos}</p>
  //               <p>Negative: {item.sentiment.neg}</p>
  //               <p>Neutral: {item.sentiment.neu}</p>
  //             </td>
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   </table>
  // </Wrapper>
  // );
}

export default Display;
