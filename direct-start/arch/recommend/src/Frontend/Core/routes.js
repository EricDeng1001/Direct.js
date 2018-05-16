import asyncLoadSafe from "HOC/asyncLoadSafe";

import IndexPage from "Page/Index";

const NotFoundPage = asyncLoadSafe(
  () => import(/* webpackChunkName: "404Page" */"Page/NotFound")
);

const nested = true;

export default {
  "/": IndexPage,
  "/notFound": NotFoundPage,
  "*": {
    redirect: "/notFound"
  }
};
