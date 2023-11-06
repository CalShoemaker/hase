// ./src/routes/index.js

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

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.ABOUT,
  component: About,
})

// Create an index route
const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.HOME,
  component: Home,
})

// Create an index route
const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: PathConstants.DASHBOARD,
  component: Dashboard,
})

// Create a root route
const rootRoute = new RootRoute({
  component: App,
})

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([homeRoute, aboutRoute, dashboardRoute])

// Create the router using your route tree
const router = new Router({ routeTree })

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default router