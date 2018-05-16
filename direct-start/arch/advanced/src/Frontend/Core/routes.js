import asyncLoadSafe from "HOC/asyncLoadSafe";

import IndexPage from "Page/Index";

const NotFoundPage = asyncLoadSafe(
  () => import(/* webpackChunkName: "404Page" */"Page/NotFound")
);

const AuthPage = asyncLoadSafe(
  () => import(/* webpackChunkName: "AuthPage" */"Page/Auth")
);


const nested = true;

export default {
  "/": IndexPage,
  "/auth": AuthPage,
  "/notFound": NotFoundPage,
  "*": {
    redirect: "/notFound"
  }
};
