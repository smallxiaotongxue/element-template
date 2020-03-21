import axios from '../../plugins/axios';

export const login = params => {
  return axios.post('/user/login', params);
};

export const getUserMenu = params => {
  return axios.post('/user/getUserMenu', params);
};

export const logout = params => {
  return axios.post('/user/logout', params);
};

export default {
  login,
  getUserMenu,
  logout,
}
