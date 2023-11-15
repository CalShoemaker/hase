import { Outlet, useParams } from "@tanstack/react-router";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import Dashboard from "../../feature/Dashboard";
import DogsList from "../../ui/DogsList";
import Sidebar from "../../feature/Sidebar";

import { 
  selectFilters, 
  selectFormattedFilters, 
  setFilters 
} from "../../../store/slices/filters.slice";

import { useGetFilteredDogsQuery } from "../../../store/slices/api.slice";

// const DList = (formatted: string) => {
//   const { data: dogs } = useGetFilteredDogsQuery(formatted);
//   return(<DogsList dogs={ dogs } />)
// }

export function Dogs() {
  const { dogId } = useParams({ from: "/Dogs/Dog" });
  const filters = useSelector(selectFilters);
  const formatted = useSelector(selectFormattedFilters);
  const { data: dogs } = useGetFilteredDogsQuery(formatted);

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Dashboard
        main={dogId ? <Outlet /> : <DogsList dogs={ dogs } /> }
        sidebar={<Sidebar setFilters={setFilters} filters={filters} />}
      />
    </Suspense>
  );
}

export default Dogs;