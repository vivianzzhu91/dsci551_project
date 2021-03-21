import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import BoxWrapper from './util/BoxWrapper';

const sentiment = {
  POSITIVE: 'positive',
  NEGATIVE: 'negative',
  NEUTRAL: 'neutral',
};

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
function Search() {
  const Wrapper = styled(BoxWrapper)`
    padding-top: 20px;
    text-align: center;
    width: 100%;
    height: 40%;
  `;
  // eslint-disable-next-line no-unused-vars
  const [sent, setSent] = useState(sentiment.POSITIVE);
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState({
    selection: {
      startDate: addDays(new Date(), -300),
      endDate: new Date(),
      key: 'selection',
    },
  });

  return (
    <Wrapper>
      <form onSubmit={() => {}}>
        <h5 className="mb-3">Search Form</h5>
        <FormWrapper>
          <div className="mb-3">
            <FormTitle>Select Sentiment:</FormTitle>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="me-3">
              <input type="checkbox" className="option-input checkbox" />
              Positive
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="me-3">
              <input type="checkbox" className="option-input checkbox" />
              Negative
            </label>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className="me-3">
              <input type="checkbox" className="option-input checkbox" />
              Neutral
            </label>
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
                minDate={addDays(new Date(), -300)}
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
        <Button>Search</Button>
      </form>
    </Wrapper>
  );
}

export default Search;
