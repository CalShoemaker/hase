import { Outlet, useParams } from "@tanstack/react-router";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { selectDogs } from "../../../store/slices/dogs.slice";
import Dashboard from "../../feature/Dashboard";
import DogsList from "../DogsList";
import Sidebar from "../../feature/Sidebar";

export const Dogs = () => {
  const { dogId } = useParams({ from: "/Dogs/Dog" });
  const data = useSelector(selectDogs);
  const [filter, setFilter] = useState("");

  // NOTE: This stringify filter was a cute bootstrap for the PoC.
  //       Filters by flat object to string then checks the arg.
  //       Consider string length of flat object. Bad, working, code.
  const dogsFlatByRaw = data.dogs.filter(
    (f) => JSON.stringify(f).includes(filter) || filter === "",
  );

  const setFilters = (payload: string) => {
    setFilter(payload);
  };

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Dashboard
        main={dogId ? <Outlet /> : <DogsList dogs={dogsFlatByRaw} />}
        sidebar={<Sidebar setFilters={setFilters} />}
      />
    </Suspense>
  );
};

export default Dogs;
