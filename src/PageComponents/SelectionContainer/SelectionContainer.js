import {
  Container,
  Label,
  RadioContainer,
  CheckColumns,
  CheckText,
} from './selectionContainer.styles';

const SelectionContainer = () => (
  <Container>
    <Label>Images not submitted as a slideshow</Label>
    <RadioContainer>
      <CheckColumns isBorderNeeded isSelected><CheckText>YES</CheckText></CheckColumns>
      <CheckColumns><CheckText>NO</CheckText></CheckColumns>
    </RadioContainer>
  </Container>
);

export default SelectionContainer;
