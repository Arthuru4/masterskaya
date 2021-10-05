import React from "react";
import s from "./Content.module.scss";
import ContentRouter from "../../scripts/Router";
// import { useRoutes } from "hookrouter";
const useRoutes = require('hookrouter').useRoutes

const Content = () => {
  // @ts-ignore
  const routeResult = useRoutes(ContentRouter);

  return <div className={s.Content}>{routeResult}</div>;
};

export default Content;
