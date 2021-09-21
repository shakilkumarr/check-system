import PropTypes from 'prop-types';

import { description, id } from '../../base/checkList.reader';

import {
  Container,
  Label,
  RadioContainer,
  CheckColumns,
  CheckText,
} from './selectionContainer.styles';

const SelectionContainer = ({
  checkLists, handleCheckListSelection, filledCheckListIds, currentRow,
}) => {
  const handleRadio = (targetStaus, targetIndex) => () => handleCheckListSelection(targetStaus, targetIndex);

  return checkLists.map((checkListInfo, index) => (
    <Container
      key={id(checkListInfo)}
      isDisabled={index > 0 && filledCheckListIds[index - 1] !== 1}
      isActive={currentRow === index}
    >
      <Label>{description(checkListInfo)}</Label>
      <RadioContainer >
        <CheckColumns isBorderNeeded isSelected={checkListInfo.status === 1} onClick={handleRadio(1, index)}>
          <CheckText>YES</CheckText>
        </CheckColumns>
        <CheckColumns isSelected={checkListInfo.status === 0} onClick={handleRadio(0, index)}>
          <CheckText>NO</CheckText>
        </CheckColumns>
      </RadioContainer>
    </Container>
  ));
};

SelectionContainer.propTypes = {
  checkLists: PropTypes.array.isRequired,
  handleCheckListSelection: PropTypes.func.isRequired,
  filledCheckListIds: PropTypes.object.isRequired,
  currentRow: PropTypes.number.isRequired,
}

export default SelectionContainer;
