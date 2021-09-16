import SelectionContainer from '../SelectionContainer';

import {
  Container,
  Header,
  BodyContainer,
  Footer,
  Button,
} from './checkSystem.styles';

const CheckSystem = () => (
  <Container>
    <Header>CHECKS FOR THIS SESSION</Header>
    <BodyContainer><SelectionContainer /></BodyContainer>
    <Footer><Button>SUBMIT</Button></Footer>
  </Container>
);

export default CheckSystem;
