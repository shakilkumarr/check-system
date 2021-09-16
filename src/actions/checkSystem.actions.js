import axios from 'axios';

const CHECK_LIST_URL = '/api/checkLists';

export const getCheckLists = () => axios.get(CHECK_LIST_URL).then(({ data }) => data);

export const updateCheckList = payload => axios.post(CHECK_LIST_URL, payload).then(({ data }) => data);
