import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";
import * as tempDB from '../../db/report.1.1.1.1.json'
const db = JSON.parse(JSON.stringify(tempDB));
const dogs:Array<IDog> = [...db.dogs];

export interface IDogsUpdate {
  type: string;
  payload: IDog;
}

export interface IDogs {
  dogs?: Array<IDog>;
}

export interface IDog {
  title: string;
  facts?: Array<any>
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