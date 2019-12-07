const handleUserRouter = (req, res) => {
  const method = req.method;

  // 登录
  if (method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: 'api for login '
    };
  }
};
module.exports = handleUserRouter;
