const loginCheck = (userName, Password) => {
  if (userName === 'Leon' && Password === '123') {
    return true;
  } else {
    return false;
  }
};
module.exports = {
  loginCheck
};
