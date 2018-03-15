let certRegExp = /^\w*$/;
let passwordRegExp = /^[\w!@*]*([!@*]|[A-Z])+[\w!@*]*([!@*]|[A-Z])+[\w!@*]*$/;

const setCertRegExp = reg => certRegExp = reg;
const setPasswordRegExp = reg => passwordRegExp = reg;
module.exports = {
  certRegExp,
  passwordRegExp,
  setCertRegExp,
  setPasswordRegExp
};
