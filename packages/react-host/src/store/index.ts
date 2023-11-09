import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import dogsReducer from "./slices/dogs.slice";
import filtersReducer from "./slices/filters.slice";
import * as DogsAPI from "../api/dogs.api";

export const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    filters: filtersReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware({
  //     thunk: {
  //       extraArgument: DogsAPI
  //     }
  //   })
});
export const useAppDispatch: () => AppDispatch = useDispatch;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
