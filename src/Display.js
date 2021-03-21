import React from 'react';
import styled from 'styled-components';
import BoxWrapper from './util/BoxWrapper';

const Wrapper = styled(BoxWrapper)`
  padding-top: 20px;
  text-align: center;
  width: 100%;
  height: 40%;
`;

function Display() {
  return <Wrapper>good</Wrapper>;
}

export default Display;
