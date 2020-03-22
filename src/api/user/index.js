import { post } from '../../plugins/axios';

export const login = params => {
  return post('/user/login', params);
};

export const getUserMenu = params => {
  return post('/user/getUserMenu', params);
};

export const logout = params => {
  return post('/user/logout', params);
};

export default {
  login,
  getUserMenu,
  logout,
}
