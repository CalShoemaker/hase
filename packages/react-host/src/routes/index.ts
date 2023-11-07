import React from "react"
import PathConstants from "./path.constants"
import App from "../App";

import {
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'

const Home = React.lazy(() => import("../views/Home/"));
const About = React.lazy(() => import("../views/About/"));
const Dashboard = React.lazy(() => import("../views/Dashboard/"));
const Dogs = React.lazy(() => import("../views/Dogs/"));

const dogsRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "dogs",
  id: "Dogs"
})

const dogRoute = new Route({
  getParentRoute: () => dogsRoute,
  path: '$dogId',
  component: Dogs,
  id: "Dog"
})

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.ABOUT,
  component: About,
  id: "About"
})

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.HOME,
  component: Home,
  id: "Home"
})

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.DASHBOARD,
  component: Dashboard,
  id: "Dashboard"
})

const dogRouteAlt = new Route({
  getParentRoute: () => dashboardRoute,
  path: '$dogId',
  component: Dogs,
  id: "Dog"
})

const rootRoute = new RootRoute({
  component: App,
})

const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, dashboardRoute.addChildren([dogRouteAlt]), dogsRoute.addChildren([dogRoute])])

const router = new Router({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router