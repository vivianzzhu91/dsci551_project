/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import elasticsearch from 'elasticsearch';

import moment from 'moment';
import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import BoxWrapper from './util/BoxWrapper';
import SearchGraph from './SearchGraph';
import Tweet from './Tweet';

const FormWrapper = styled.div`
  width: 75%;
  text-align: left;
  margin: auto;
`;
const FormTitle = styled.div`
  font-size: 18px;
  margin-right: 30px;
  display: inline;
`;
const Button = styled.button`
  margin-top: 40px;
  padding: 5px 20px 5px 20px;
  background-color: #cbc0d3;
  color: white;
  border: none;
  font-weight: bold;
  :hover {
    border: 0.5px solid #e2e2e2;
    background-color: white;
    color: #cbc0d3;
  }
`;
const Toggle = styled(Button)`
  margin: 0 0 0 20px;
`;
const Wrapper = styled(BoxWrapper)`
  padding-top: 20px;
  text-align: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const client = elasticsearch.Client({
  host: 'http://localhost:9200/',
});

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'.split('');
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function Search() {
  const [isSearching, setIsSearching] = useState(false);
  const [sent, setSent] = useState([]);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState('desc');
  const [isOpen, setIsOpen] = useState(false);
  const [myHits, setMyHits] = useState([]);
  const [time, setTime] = useState({
    selection: {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection',
    },
  });
  const [searchGraphData, setSearchGraphData] = useState({
    datasets: [],
    labels: [],
  });
  const [tagCountData, setTagCountData] = useState({
    datasets: [],
    labels: [],
  });

  const toggleSentiment = (e, val) => {
    // add to array
    let newArr = [];
    newArr = sent;
    if (e.target.checked) {
      newArr.push(val);
    } else {
      // remove from array
      newArr = newArr.filter((s) => s !== val);
    }
    setSent(newArr);
  };

  const convertGraphData = (data) => {
    const result = {
      labels: [],
      datasets: [
        {
          label: 'Positive',
          data: [],
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
          yAxisID: 'y-axis-1',
        },
        {
          label: 'Negative',
          data: [],
          fill: false,
          backgroundColor: 'rgb(54,162,235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        },
        {
          label: 'Neutral',
          data: [],
          fill: false,
          backgroundColor: '#e29578',
          borderColor: '#d4a373',
        },
      ],
    };
    data.forEach((item) => {
      const resp = item._source;
      const date = moment(resp.date).format('YYYY-MM-DD HH:mm');
      result.labels.push(date);
      result.datasets[0].data.push(resp.sentiment.pos);
      result.datasets[1].data.push(resp.sentiment.neg);
      result.datasets[2].data.push(resp.sentiment.neu);
    });
    setSearchGraphData(result);
  };

  const convertDoughnutData = (data) => {
    const dataMap = new Map();
    data.forEach((item) => {
      const res = item._source;
      if (res.tags.length !== 0) {
        const { tags } = res;
        tags.forEach((tag) => {
          if (dataMap.has(tag)) {
            const cnt = dataMap.get(tag);
            dataMap.set(tag, cnt + 1);
          } else {
            dataMap.set(tag, 1);
          }
        });
      }
    });
    const res = {
      labels: [...dataMap.keys()],
      datasets: [
        {
          label: 'Tag count over time',
          data: [...dataMap.values()],
          hoverOffset: 4,
          backgroundColor: [...dataMap.keys()].map(() => {
            return getRandomColor();
          }),
        },
      ],
    };
    setTagCountData(res);
  };

  const getTweet = (data) => {
    const { hits } = data.hits;
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
    setMyHits(res);
  };

  const search = (e) => {
    client
      .search({
        index: 'twitter-stream',
        from: 0,
        size: limit,
        body: {
          query: {
            bool: {
              must: [
                {
                  range: {
                    date: {
                      gte: new Date(time.selection.startDate).getTime(),
                      lte: new Date(time.selection.endDate).getTime(),
                      format: 'epoch_millis',
                    },
                  },
                },
                {
                  match: {
                    emotion: {
                      query:
                        sent.length !== 0
                          ? sent.join(' ')
                          : 'positive negative neutral',
                      operator: 'or',
                    },
                  },
                },
              ],
            },
          },
          sort: [{ date: { order: sort } }],
        },
      })
      .then((data) => {
        convertGraphData(data.hits.hits);
        convertDoughnutData(data.hits.hits);
        getTweet(data);
        setIsSearching(true);
        // console.log(data.hits.hits);
      });
    e.preventDefault();
  };

  return (
    <Wrapper>
      <form onSubmit={() => {}}>
        <h5 className="mb-3">Search Form</h5>
        <FormWrapper>
          <div className="mb-3">
            <FormTitle>Select Sentiment:</FormTitle>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="me-3" value="positive">
              <input
                type="checkbox"
                className="option-input checkbox"
                onChange={(e) => {
                  toggleSentiment(e, 'positive');
                }}
              />
              Positive
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="me-3">
              <input
                type="checkbox"
                className="option-input checkbox"
                onChange={(e) => {
                  toggleSentiment(e, 'negative');
                }}
              />
              Negative
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="me-3">
              <input
                type="checkbox"
                className="option-input checkbox"
                onChange={(e) => {
                  toggleSentiment(e, 'neutral');
                }}
              />
              Neutral
            </label>
          </div>
          <div className="mb-3">
            <FormTitle>Limit count:</FormTitle>
            <select
              id="dropdown"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
              }}
            >
              <option value="N/A" disabled="disabled">
                Select limit count
              </option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="200">200</option>
            </select>
          </div>
          <div className="mb-3">
            <FormTitle>Sort by date:</FormTitle>
            <select
              id="dropdown"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="N/A" disabled="disabled">
                Sort
              </option>
              <option value="asc">ascending</option>
              <option value="desc">descending</option>
            </select>
          </div>
          <div className="mb-3">
            <FormTitle>Select Time Range:</FormTitle>
            <span>
              {time.selection.startDate.toDateString()} -
              {time.selection.endDate.toDateString()}
            </span>
            <Toggle
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Toggle calendar
            </Toggle>
            {isOpen ? (
              <DateRangePicker
                onChange={(item) => setTime({ ...time, ...item })}
                months={1}
                minDate={addDays(new Date(), -1)}
                maxDate={new Date()}
                direction="vertical"
                scroll={{ enabled: true }}
                ranges={[time.selection]}
              />
            ) : (
              <></>
            )}
          </div>
        </FormWrapper>
        <Button
          onClick={(e) => {
            search(e);
          }}
        >
          Search
        </Button>
        <Button
          className="mx-3"
          onClick={() => {
            setIsSearching(false);
          }}
        >
          Clear
        </Button>
      </form>
      {isSearching ? (
        <div className="row">
          <div className="col-12">
            <SearchGraph
              searchGraphData={searchGraphData}
              tagCountData={tagCountData}
            />
          </div>
          <div className="col-12">
            <Tweet myHits={myHits} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

export default Search;
