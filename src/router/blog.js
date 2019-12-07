const handleBlogRouter = (req, res) => {
  const method = req.method;

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    return {
      msg: 'api for getting blog list'
    };
  }
  //   获取博客信息
  if (method === 'GET' && req.path === '/api/blog/detail') {
    return {
      msg: 'api for getting blog detail'
    };
  }
  //   新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    return {
      msg: 'api for creating blog '
    };
  }
  //   更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    return {
      msg: 'api for updating blog '
    };
  }
  //   删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    return {
      msg: 'api for deleting blog '
    };
  }
};

module.exports = handleBlogRouter;
