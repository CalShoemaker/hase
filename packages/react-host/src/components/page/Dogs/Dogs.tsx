import { Outlet, useParams } from "@tanstack/react-router";
import React, { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectDogs,
  setDogs,
  fetchDogs,
} from "../../../store/slices/dogs.slice";
import { selectFilters, setFilters } from "../../../store/slices/filters.slice";
import Dashboard from "../../feature/Dashboard";
import DogsList from "../DogsList";
import Sidebar from "../../feature/Sidebar";
import { useDispatch } from "react-redux";
import useAPI from "../../hooks/useAPI";
//https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced
export function Dogs() {
  const { dogId } = useParams({ from: "/Dogs/Dog" });
  const data = useSelector(selectDogs);
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchDogs(filters.filters));
  }, [filters.filters]);

  return (
    <Suspense fallback={<h2>🌀 Loading...</h2>}>
      <Dashboard
        main={dogId ? <Outlet /> : <DogsList dogs={data.dogs} />}
        sidebar={<Sidebar setFilters={setFilters} filters={filters} />}
      />
    </Suspense>
  );
}

export default Dogs;
