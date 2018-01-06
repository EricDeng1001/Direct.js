import asyncLoad from 'renext/asyncLoad';

const NotFound = asyncLoad( () => import('Page/NotFound') );

export default {
  '*': {
    page: NotFound
  }
};
