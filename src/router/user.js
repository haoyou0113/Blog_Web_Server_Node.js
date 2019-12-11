const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { username, password } = req.body;
    const result = loginCheck(username, password);
    console.log('result', result);
    return result.then(data => {
      if (data.username) {
        console.log('data.username', data);
        return new SuccessModel(data);
      }
      return new ErrorModel('Login Failed');
    });
  }
};
module.exports = handleUserRouter;
