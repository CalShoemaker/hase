import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

export interface IFilter {
  life?: number[];
  height?: number[];
  weight?: number[];
  breed?: string;
  tags?: string[];
}

interface IFilters {
  filters: IFilter;
}

const initialState: IFilters = {
  filters: {
    life: [2, 18],
    height: [6, 20],
    weight: [10, 25],
    breed: "Mixed",
  },
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    setFilters: (state: IFilters, action: PayloadAction<IFilter>) => ({
      ...state,
      filters: action.payload,
    }),
  },
});

export const selectFilters = (state: RootState): IFilters => state.filters;

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
