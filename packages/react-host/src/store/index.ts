import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
//import dogsReducer from "./slices/dogs.slice";
import filtersReducer from "./slices/filters.slice";
import { dogsApi } from "./slices/api.slice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [dogsApi.reducerPath]: dogsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(dogsApi.middleware)
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
