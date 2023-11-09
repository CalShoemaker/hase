import React, { Suspense } from "react";
import { Outlet } from "@tanstack/react-router";

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};

export default App;
