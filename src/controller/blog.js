const { exec } = require('../db/mysql');
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  // where 1=1站位 防止author keyword都没有值报错
  if (author) {
    sql += `and author ='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc; `;
  // return promise
  return exec(sql);
};
const getDetail = () => {
  return [
    {
      if: 1,
      title: 'Title A',
      content: 'Content A',
      createTime: 12345678945,
      author: 'Leon'
    }
  ];
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象, 包含title content 属性
  console.log('new blog data', blogData);
  return {
    id: 3 //表示新建博客,插入数据表里的id
  };
};

const updateBlog = (id, blogData = {}) => {
  // id 为需要更新的id
  // blogData 是一个博客对象, 包含title content 属性
  console.log('updateBlog', id, blogData);
  return {};
};

const delBlog = id => {
  // 需要删除的id
  return true;
};
module.exports = {
  getList,
  delBlog,
  getDetail,
  newBlog,
  updateBlog
};
