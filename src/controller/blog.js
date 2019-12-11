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
const getDetail = id => {
  const sql = `select * from blogs where id='${id}' `;
  return exec(sql).then(row => {
    return row[0];
  });
};

const newBlog = (blogData = {}) => {
  // blogData 是一个博客对象, 包含title content 属性
  // console.log('new blog data', blogData);
  // return {
  //   id: 3 //表示新建博客,插入数据表里的id
  // };
  const title = blogData.title;
  const content = blogData.content;
  const author = blogData.author;
  const createTime = Date.now();
  const sql = `insert into blogs (title, content, createtime, author) value ('${title}', '${content}', '${createTime}', '${author}');`;
  return exec(sql).then(insertData => {
    console.log('insertData', insertData);
    return { id: insertData.insertId };
    // 返回新插入的id
  });
};

const updateBlog = (id, blogData = {}) => {
  // id 为需要更新的id
  // blogData 是一个博客对象, 包含title content 属性
  // console.log('updateBlog', id, blogData);
  // return {};

  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
  return exec(sql).then(updateData => {
    // console.log('updateDate', updateData);
    if (updateData.affectedRows > 0) {
      // 判断返回的结果中影响的row数是否大于0 来表明是否更新成功
      return true;
    } else {
      return false;
    }
  });
};

const delBlog = (id, author) => {
  // 需要删除的id
  // return true;
  const sql = `delete from blogs where id='${id}' and author='${author}';`;
  return exec(sql).then(deleteData => {
    console.log('deleteData', deleteData);
    if (deleteData.affectedRows > 0) {
      // 判断返回的结果中影响的row数是否大于0 来表明是否delete成功
      return true;
    }
    return false;
  });
};
module.exports = {
  getList,
  delBlog,
  getDetail,
  newBlog,
  updateBlog
};
