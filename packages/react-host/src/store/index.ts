import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import dogsReducer from './slices/dogs.slice'

export const store = configureStore({
  reducer: {
    dogs: dogsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store