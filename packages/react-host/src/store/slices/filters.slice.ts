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
    life: [2, 20],
    height: [4, 14],
    weight: [5, 60],
    breed: "Pure",
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
