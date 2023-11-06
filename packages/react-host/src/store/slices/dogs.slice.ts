import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const dogs:Array<IDog> = [];

export interface IDogsUpdate {
  type: string;
  payload: IDog;
}

export interface IDogs {
  dogs?: Array<IDog>;
}

export interface IDog {
  name: string;
}

const dogsInterface:Array<IDog> = dogs as Array<IDog>;

const initialState:IDogs = { 
  dogs: [...dogsInterface] as Array<IDog>
} 

export const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
});

export const selectDogs = (state: RootState): IDogs => state.dogs;

export default dogsSlice.reducer;