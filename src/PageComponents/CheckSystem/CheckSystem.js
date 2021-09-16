import React from 'react';

import SelectionContainer from '../SelectionContainer';
import { getCheckLists, updateCheckList } from '../../actions/checkSystem.actions';

import { EMPTY_ARRAY } from '../../base/constants';

import {
  Container,
  Header,
  BodyContainer,
  Footer,
  Button,
} from './checkSystem.styles';

const CheckSystem = () => {
  React.useEffect(() => {
    getCheckLists()
      .then((checkLists) => {
        console.log(checkLists);
        updateCheckList(checkLists).then((data) => console.log(data)).catch((err) => console.log(err));
      })
      .catch((error) => {
        console.log(error);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, EMPTY_ARRAY);
  
  return (
    <Container>
      <Header>CHECKS FOR THIS SESSION</Header>
      <BodyContainer><SelectionContainer /></BodyContainer>
      <Footer><Button>SUBMIT</Button></Footer>
    </Container>
  );
};

export default CheckSystem;
