import axios from '../../plugins/axios';

const getUserInfo = params => {
  return axios.post('./getUserInfo', params);
};

export default {
  getUserInfo
}
