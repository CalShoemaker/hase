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
  dogs: IDog[];
}

export interface IDog {
  title: string;
  id: string;
  tags?: string[];
  statistics?: object;
  facts?: Array<any>,
}

const dogsInterface:IDog[] = dogs;
const initialState:IDog[] = [...dogsInterface];

export const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {},
});

export const selectDogs = (state: RootState): IDogs => state;
export const selectDogById = (ID: string) => (state:RootState):IDog => state.dogs.filter(({ id }) => id === ID)[0];
export default dogsSlice.reducer;