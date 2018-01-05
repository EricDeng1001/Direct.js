const requireAPI = ( api ) => require('../API/' + api );
const loginedProtect = require('../HOF/loginedProtect');

module.exports = {
  '/signup': requireAPI('signup'),
  '/login': requireAPI('login'),
  '/logout': loginedProtect( requireAPI('logout') ),
  '/readUserInfo': loginedProtect( requireAPI('readUserInfo') ),
  '/writeUserInfo': loginedProtect( requireAPI('writeUserInfo') )
};
