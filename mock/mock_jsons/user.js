const Mock = require('mockjs')

const tokens = {
  admin: 'admin-token',
}

const userInfoList = {
  'admin-token': {
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '系统管理员',
    introduction: 'I am a super administrator',
    menuList: [

    ]
  }
}

// user login
Mock.mock(/.*\/user\/login.*/, 'post', (config) => {
  console.log('Mock: ', config);
  const { username } = JSON.parse(config.body);
  const token = tokens[username];
  // mock error
  if (!token) {
    return { ret: -1, message: '账号密码不正确' }
  }
  let result = {
    ret: 0,
    data: {
      token: token,
      userInfo: userInfoList[token],
    },
    message: 'success'
  };
  console.log(config.url, result);
  return result;
});

// get user info
Mock.mock(/.*\/user\/userInfo.*/, 'post', (config) => {
  const { token } = JSON.parse(config.body);
  let info = userInfoList[token];
  return {
    ret: 0,
    data: {
      token: token,
      userInfo: info || {},
    },
    message: 'success'
  }
});

// logout
Mock.mock(/.*\/user\/logout.*/  , 'post', (config) => {
  return {
    ret: 0,
    message: 'success'
  }
});
