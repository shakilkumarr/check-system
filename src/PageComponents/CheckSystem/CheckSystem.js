import React from 'react';
import cogoToast from 'cogo-toast';

import _map from 'lodash/map';
import _keys from 'lodash/keys';
import _values from 'lodash/values';

import SelectionContainer from '../SelectionContainer';
import ErrorComponent from '../ErrorComponent';
import { getCheckLists, submitCheckList } from '../../actions/checkSystem.actions';

import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../base/constants';

import { 
  ROW_NAVIGATION, COL_NAVIGATION,
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
  const [checkLists, setCheckList] = React.useState(EMPTY_ARRAY);
  const [isError, setErrorStatus] = React.useState(false);
  const [filledCheckListIds, setFilledCheckIds] = React.useState(EMPTY_OBJECT);
  const [isOnRequest, setRequestStatus] = React.useState(false);
  const [currentRow, setCurrentRow] = React.useState(-1);
  const containerDiv = React.useRef(null);
  
  const updateCheckList = () => {
    if (isOnRequest) return;
    setRequestStatus(true);
    getCheckLists()
      .then((checkList) => {
        setCheckList(checkList);
        setErrorStatus(false);
      })
      .catch((err) => {
        setErrorStatus(true);
      })
      .finally(() => {
        setRequestStatus(false);
      });
  };
  
  React.useEffect(() => {
    updateCheckList();
    containerDiv.current.focus();
  }, EMPTY_ARRAY);

  const isFormFilled = React.useMemo(() => {
    if (checkLists.length === _keys(filledCheckListIds).length || _values(filledCheckListIds).indexOf(0) > -1) return true;
    return false;
  }, [checkLists, filledCheckListIds]);

  const updateFilledCheckIds = (targetStatus, targetIndex, updatedCheckLists) => {
    const updatedFilledCheckIds = { ...filledCheckListIds, [targetIndex]: targetStatus };
    for (let i = targetIndex; i < checkLists.length - 1; i += 1) {
      if (updatedCheckLists[i + 1].status === -1) break;
      updatedFilledCheckIds[i + 1] = targetStatus;
    }
    setFilledCheckIds(updatedFilledCheckIds);
  };

  const handleCheckListSelection = (targetStatus, targetIndex) => {
    const updatedCheckLists = _map(checkLists, (checkListInfo, index) => {
      if (index !== targetIndex) return checkListInfo;
      return ({
        ...checkListInfo,
        status: targetStatus,
      });
    });
    updateFilledCheckIds(targetStatus, targetIndex, updatedCheckLists);
    setCheckList(updatedCheckLists);
    setCurrentRow(targetIndex);
  };

  const resetFormValues = () => {
    if (isOnRequest) return;
    setFilledCheckIds(EMPTY_OBJECT);
    setCurrentRow(-1);
    setCheckList(_map(checkLists, checkListInfo => ({ ...checkListInfo, status: -1 })));
  };

  const handleSubmit = () => {
    if (isOnRequest || !isFormFilled) return;
    setRequestStatus(true);
    submitCheckList(checkLists)
      .then(() => {
        cogoToast.success('Your checklists has been submitted successfully!', { position: 'bottom-center' });
        resetFormValues();
      })
      .catch(() => {
        cogoToast.error('There is some issue in posting your data. Please Try again!', { position: 'bottom-center' });
      })
      .finally(() => {
        setRequestStatus(false);
      })
  };

  const handleColNavigation = (targetStatus) => {
    if (currentRow < 0) return;
    handleCheckListSelection(targetStatus, currentRow);
  }

  const handleRowNavigation = (rowToUpdate) => {
    const rowIndexToHightlight = currentRow + rowToUpdate;
    if ((rowIndexToHightlight < 0 || rowIndexToHightlight >= checkLists.length) || (rowIndexToHightlight > 0 && filledCheckListIds[rowIndexToHightlight - 1] !== 1)) return;
    setCurrentRow(rowIndexToHightlight);
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
