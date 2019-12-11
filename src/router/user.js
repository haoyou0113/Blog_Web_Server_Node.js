const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    const { userName, password } = req.body;
    const result = loginCheck(userName, password);
    console.log(result);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('Login failed ');
    }
  }
};
module.exports = handleUserRouter;
