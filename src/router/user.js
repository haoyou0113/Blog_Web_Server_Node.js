const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

// 获取cookie 过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  console.log('d.toGMTSring  : ', d.toGMTString());
  return d.toGMTString();
};
const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === 'GET' && req.path === '/api/user/login') {
    // const { username, password } = req.body;
    const { username, password } = req.query;
    const result = login(username, password);
    // console.log('result', result);
    return result.then(data => {
      if (data.username) {
        // console.log('data.username', data);
        // 操作cookie path=/本网站中所有的页面都会生效 httpOnly 只允许后端修改cookie expires=${getCookieExpires() 设置过期时间
        // res.setHeader(
        //   'Set-Cookie',
        //   `username=${
        //     data.username
        //   }; path=/; httpOnly; expires=${getCookieExpires()} `
        // );
        //  设置session
        req.session.username = data.username;
        req.session.realname = data.realname;
        console.log('req.session : ', req.session);

        return new SuccessModel(data);
      }
      return new ErrorModel('Login Failed');
    });
  }

  // 登录验证的测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session) {
      return Promise.resolve(new SuccessModel({ session: req.session }));
    }
    return Promise.resolve(new ErrorModel('Not logged in'));
  }
};
module.exports = handleUserRouter;
