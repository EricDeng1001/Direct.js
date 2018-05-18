const sec = 1000;
const min = 60 * sec;
const hour = 60 * min;
const day = 24 * hour;
const month = 30 * day;
const year = 12 * month;

module.exports = {
  //neverUse: 0
  __authorizeThrottling__: 1001,
  __bandWidthThrottling__: 1002,
  __userExist__: 223,
  __userNotExist__: 224,
  __passwordWrong__: 225,
  __permissionDenied__: 1226,
  __maxAge__: 1 * month
};
