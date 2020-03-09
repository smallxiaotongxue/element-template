import axios from '../../plugins/axios';

const login = params => {
  return axios.post('./login', params);
};

export default {
  login
}
