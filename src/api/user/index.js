import axios from '../../plugins/axios';

export const login = params => {
  return axios.post('/user/login', params);
};

export const getUserInfo = params => {
  return axios.post('/user/getUserInfo', params);
};

export const logout = params => {
  return axios.post('/user/logout', params);
};

export default {
  login,
  getUserInfo,
  logout,
}
