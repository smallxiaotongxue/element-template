import axios from '../../plugins/axios';

export const login = params => {
  return axios.post('./login', params);
};

export const getUserInfo = params => {
  return axios.post('./getUserInfo', params);
};

export const loginOut = params => {
  return axios.post('./loginOut', params);
};

export default {
  login,
  getUserInfo,
  loginOut,
}
