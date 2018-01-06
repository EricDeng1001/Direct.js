import asyncLoad from 'renext/asyncLoad';

import Index from 'Page/Index';

const NotFound = asyncLoad( () => import('Page/NotFound') );
const UITest = asyncLoad( () => import('Page/UITest') );
const User = asyncLoad( () => import('Page/User') );
const Chat = asyncLoad( () => import('Page/Chat') );

export default {
  '/': {
    page: Index,
    exact: true
  },
  '/ui': {
    page: UITest,
    exact: true
  },
  '/user': {
    page: User,
    exact: true
  },
  '/chat': {
    page: Chat,
    exact: true
  },
  '*': {
    page: NotFound
  }
};
