import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../base/constants';

export const COL_NAVIGATION = {
  49: 1,
  50: 0,
};

export const ROW_NAVIGATION = {
  38: -1,
  40: 1,
};

export const DEFAULT_STATE_VALUES = {
  checkLists: EMPTY_ARRAY,
  isError: false,
  filledCheckListIds: EMPTY_OBJECT,
  isOnRequest: false,
  currentRow: -1,
};
