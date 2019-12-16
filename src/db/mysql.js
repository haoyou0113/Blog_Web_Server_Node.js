const mysql = require('mysql');

const { MYSQL_CONF } = require('../conf/db');
// console.log(MYSQL_CONF);
const con = mysql.createConnection(MYSQL_CONF);
// console.log('con', con);
con.connect();
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
      // console.log('result', result);
    });
  });
  return promise;
}

// con.end(); 保持链接状态 需要多次执行exec

module.exports = {
  exec,
  escape: mysql.escape
};
