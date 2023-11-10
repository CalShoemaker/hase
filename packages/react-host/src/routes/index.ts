import React from "react";
import PathConstants from "./path.constants";
import App from "../App";
import { Router, Route, RootRoute } from "@tanstack/react-router";

const Home = React.lazy(() => import("../components/page/Home"));
const Dogs = React.lazy(() => import("../components/page/Dogs"));
const Dog = React.lazy(() => import("../components/page/Dog"));

const dogsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "dogs",
  component: Dogs,
  id: "Dogs",
});

const dogRoute = new Route({
  getParentRoute: () => dogsRoute,
  path: "$dogId",
  component: Dog,
  id: "Dog",
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.HOME,
  component: Home,
  id: "Home",
});

const rootRoute = new RootRoute({
  component: App,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  dogsRoute.addChildren([dogRoute]),
]);

const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
