import axios from 'axios';

const CHECK_LIST_URL = '/api/checkLists';

export const checkLists = () => axios.get(CHECK_LIST_URL);

export const postCheckList = payload => axios.post(CHECK_LIST_URL, payload).then(({ data }) => data);