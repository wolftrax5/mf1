import React from "react";

const HelloPage = React.lazy(() => import("./HelloPage"));

const routes = [
  {
    path: "/hello",
    component: HelloPage,
  },
];

export default routes;
