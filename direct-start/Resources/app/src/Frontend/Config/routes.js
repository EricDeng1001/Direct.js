import asyncLoad from "direct-core/asyncLoad";

import Index from "Page/Index";

const NotFound = asyncLoad( () => import("Page/NotFound") );

export default {
  "/": {
    page: Index,
    exact: true
  },
  "*": {
    page: NotFound
  }
};
