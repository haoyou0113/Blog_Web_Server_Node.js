const fs = require('fs');
const path = require('path');

// 写日志
function writeLog(writeStream, log) {
  writeStream.write(log + '\n'); // 关键代码
}
// 生成write stream
function creatWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  });
  return writeStream;
}

// write log

const accessWriteStreaem = creatWriteStream('access.log');

function access(log) {
  writeLog(accessWriteStreaem, log);
}

module.exports = {
  access
};
