import asyncLoad from 'HOC/asyncLoad';

import Index from 'Page/Index';

const NotFound = asyncLoad( () => import('Page/NotFound') );
const UITest = asyncLoad( () => import('Page/UITest') );

export default {
  '/': {
    page: Index,
    exact: true
  },
  '/ui': {
    page: UITest,
    exact: true
  },
  '*': {
    page: NotFound
  }
};
