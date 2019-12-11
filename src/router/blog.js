const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const handleBlogRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  // 从url拿数据
  const blogData = req.body;
  // 从传过来的body中拿数据

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);
    const result = getList(author, keyword);
    // console.log(result);
    return result.then(listData => {
      return new SuccessModel(listData);
    });
  }
  //   获取博客信息
  if (method === 'GET' && req.path === '/api/blog/detail') {
    const data = getDetail(id);
    return new SuccessModel(data);
  }
  //   新建博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    const data = newBlog(blogData);
    return new SuccessModel(data);
  }
  //   更新博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, blogData);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('update failed');
    }
  }
  //   删除博客
  if (method === 'POST' && req.path === '/api/blog/delete') {
    const result = delBlog(id);

    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel('delete failed');
    }
  }
};

module.exports = handleBlogRouter;
