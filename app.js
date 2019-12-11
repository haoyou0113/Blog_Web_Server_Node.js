const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
// 处理postdata
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  });
  return promise;
};

const serverHandle = (req, res) => {
  // 设置返回格式 JASON process.env.NODE_ENV
  res.setHeader('Content-type', 'application/json');

  //   处理获取path
  const url = req.url;
  req.path = url.split('?')[0];

  // 解析 query
  req.query = querystring.parse(url.split('?')[1]);
  // 处理post data
  getPostData(req).then(postData => {
    req.body = postData;
    //   处理Blog router

    const blogResult = handleBlogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    console.log('blogreuslt', blogResult);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    // 处理user路由
    const userData = handleUserRouter(req, res);
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }
    //   无路由返回404
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.write('404 Not Found\n');
    res.end();
  });
  // .catch(error => {
  //   assert.isNotOk(error, 'Promise error');
  //   done();
  // });
};

module.exports = serverHandle;
