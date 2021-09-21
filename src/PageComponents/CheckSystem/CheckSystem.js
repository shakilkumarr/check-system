import React from 'react';
import cogoToast from 'cogo-toast';
import { usePartialState } from 'use-partial-state';

import SelectionContainer from '../SelectionContainer';
import ErrorComponent from '../ErrorComponent';
import { getCheckLists, submitCheckList } from '../../actions/checkSystem.actions';

import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../base/constants';

import { 
  ROW_NAVIGATION, COL_NAVIGATION, DEFAULT_STATE_VALUES,
} from './CheckSystem.constants';

import {
  Container,
  Header,
  BodyContainer,
  Footer,
  Button,
  TertiaryButton,
} from './checkSystem.styles';

const CheckSystem = () => {
  const [state, _, updateState] = usePartialState(DEFAULT_STATE_VALUES);
  const {
    checkLists,
    isError,
    filledCheckListIds,
    isOnRequest,
    currentRow,
  } = state;
  const containerDiv = React.useRef(null);
  
  const updateCheckList = () => {
    if (isOnRequest) return;
    updateState({ isOnRequest: true });
    getCheckLists()
      .then((checkList) => {
        updateState({ checkLists: checkList, isError: false });
      })
      .catch((err) => {
        updateState({ isError: true });
      })
      .finally(() => {
        updateState({ isOnRequest: false });
      });
  };
  
  React.useEffect(() => {
    updateCheckList();
    containerDiv.current.focus();
  }, EMPTY_ARRAY);

  const isFormFilled = React.useMemo(() => checkLists.length === Object.keys(filledCheckListIds).length || Object.values(filledCheckListIds).indexOf(0) > -1, [checkLists, filledCheckListIds]);

  const getFilledCheckIds = (targetStatus, targetIndex, updatedCheckLists) => {
    const updatedFilledCheckIds = { ...filledCheckListIds, [targetIndex]: targetStatus };
    for (let i = targetIndex; i < checkLists.length - 1; i += 1) {
      if (updatedCheckLists[i + 1].status === -1) break;
      updatedFilledCheckIds[i + 1] = targetStatus;
    }
    return updatedFilledCheckIds;
  };

  const handleCheckListSelection = (targetStatus, targetIndex) => {
    const updatedCheckLists = checkLists.map((checkListInfo, index) => {
      if (index !== targetIndex) return checkListInfo;
      return ({
        ...checkListInfo,
        status: targetStatus,
      });
    });
    updateState({
      filledCheckListIds: getFilledCheckIds(targetStatus, targetIndex, updatedCheckLists),
      checkLists: updatedCheckLists,
      currentRow: targetIndex,
    });
  };

  const resetFormValues = () => {
    if (isOnRequest) return;
    updateState({
      filledCheckListIds: EMPTY_OBJECT,
      checkLists: checkLists.map(checkListInfo => ({ ...checkListInfo, status: -1 })),
      currentRow: -1,
    });
  };

  const handleSubmit = () => {
    if (isOnRequest || !isFormFilled) return;
    updateState({ isOnRequest: true });
    submitCheckList(checkLists)
      .then(() => {
        cogoToast.success('Your checklists has been submitted successfully!', { position: 'bottom-center' });
        resetFormValues();
      })
      .catch(() => {
        cogoToast.error('There is some issue in posting your data. Please Try again!', { position: 'bottom-center' });
      })
      .finally(() => {
        updateState({ isOnRequest: false });
      })
  };

  const handleColNavigation = (targetStatus) => {
    if (currentRow < 0) return;
    handleCheckListSelection(targetStatus, currentRow);
  }

  const handleRowNavigation = (rowToUpdate) => {
    const rowIndexToHightlight = currentRow + rowToUpdate;
    if ((rowIndexToHightlight < 0 || rowIndexToHightlight >= checkLists.length) || (rowIndexToHightlight > 0 && filledCheckListIds[rowIndexToHightlight - 1] !== 1)) return;
    updateState({ currentRow: rowIndexToHightlight });
  }

  const handleKeyUp = (ev) => {
    const keyCode = ev.keyCode;
    if (COL_NAVIGATION[keyCode] !== undefined) handleColNavigation(COL_NAVIGATION[keyCode]);
    else if (ROW_NAVIGATION[keyCode] !== undefined) handleRowNavigation(ROW_NAVIGATION[keyCode]); 
  }
  
  return (
    <Container onKeyUp={handleKeyUp} tabIndex="0" ref={containerDiv}>
      <Header>CHECKS FOR THIS SESSION</Header>
      <BodyContainer>
        {
          (isError || isOnRequest) ? <ErrorComponent updateCheckList={updateCheckList} isOnRequest={isOnRequest} /> : (
            <SelectionContainer
              checkLists={checkLists}
              handleCheckListSelection={handleCheckListSelection}
              filledCheckListIds={filledCheckListIds}
              currentRow={currentRow}
            />
          )
        }
      </BodyContainer>
      <Footer>
        <Button isDisabled={!isFormFilled || isOnRequest || isError} onClick={handleSubmit}>
          SUBMIT
        </Button>
        <TertiaryButton onClick={resetFormValues} isError={isError}>Reset</TertiaryButton>
      </Footer>
    </Container>
  );
};

export default CheckSystem;
