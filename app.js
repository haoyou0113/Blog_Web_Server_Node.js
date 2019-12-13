const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { get, set } = require('./src/db/redis');
// // session 数据
// const SESSION_DATA = {};
// 处理postdata
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
  // console.log('d.toGMTSring  : ', d.toGMTString());
  return d.toGMTString();
};
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
  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item => {
    // 使用;分割cookie 循环遍历
    if (!item) {
      return;
    }
    // 分别取出arr中的首末项 key val
    const arr = item.split('=');
    const key = arr[0].trim();
    const val = arr[1].trim();
    req.cookie[key] = val;
  });
  // console.log(arr[0]);
  // console.log('req.cookie is', req.cookie);

  // // 解析session
  // let needSetCookie = false;
  // let userId = req.cookie.userid;
  // if (userId) {
  //   if (!SESSION_DATA[userId]) {
  //     SESSION_DATA[userId] = {};
  //     // 没有值得话初始化一个空对象
  //     // 第二次登录后已经有userid
  //   }
  // } else {
  //   needSetCookie = true;
  //   userId = `${Date.now()}_${Math.random()}`;
  //   SESSION_DATA[userId] = {};
  //   // 如果没有userId 创建随机的userId防止重复
  // }
  // req.session = SESSION_DATA[userId];

  // 解析session with redis
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (!userId) {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    // 初始化 redis 中的 session 值
    set(userId, {});
  }
  // 获取 session
  req.sessionId = userId;
  get(req.sessionId)
    .then(sessionData => {
      if (sessionData == null) {
        // 初始化 redis 中的 session 值
        set(req.sessionId, {});
        // 设置 session
        req.session = {};
      } else {
        // 设置 session
        req.session = sessionData;
      }
      console.log('req.session', req.session);

      // handle post data

      return getPostData(req);
    })

    // 处理post data
    .then(postData => {
      req.body = postData;
      //   处理Blog router

      const blogResult = handleBlogRouter(req, res);
      // if (blogData) {
      //   res.end(JSON.stringify(blogData));
      //   return;
      // }
      // console.log('blogreuslt', blogResult);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()} `
            );
          }
          res.end(JSON.stringify(blogData));
        });
        return;
      }

      // 处理user路由
      // const userData = handleUserRouter(req, res);
      // if (userData) {
      //   res.end(JSON.stringify(userData));
      //   return;
      // }

      const userResult = handleUserRouter(req, res);
      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`
            );
          }

          res.end(JSON.stringify(userData));
        });
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
