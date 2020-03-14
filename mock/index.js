import Mock from 'mockjs';

Mock.XHR.prototype.withCredentials = true;

import user from './mock_jsons/user'
import role from './mock_jsons/role'
import article from './mock_jsons/article'
import search from './mock_jsons/remote-search'

const mocks = [
  ...user,
  ...role,
  ...article,
  ...search
];

export default mocks;
