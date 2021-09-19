import _map from 'lodash/map';

import { priority } from '../base/checkList.reader';
import {
  checkLists, postCheckList,
} from './checkSystem.api';

const orderDataByPriority = checkListData => _map(checkListData.sort((a, b) => priority(a) - priority(b)), (checkListSortedData) => ({
  ...checkListSortedData,
  status: -1,
}));

const formattedPayload = checkListData => _map(checkListData, ({ id, status }) => ({
  checkId: id,
  value: status,
}))

export const getCheckLists = () => checkLists()
  .then(({ data }) => orderDataByPriority(data.checkList))
  .catch(() => { throw new Error() });

export const submitCheckList = payload => postCheckList(formattedPayload(payload)).then(({ data }) => data);
