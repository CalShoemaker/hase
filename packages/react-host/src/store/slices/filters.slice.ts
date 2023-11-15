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
  formatted?: string;
}

const initialState: IFilters = {
  filters: {
    life: [2, 20],
    height: [4, 14],
    weight: [5, 60],
    breed: "Pure",
  }
};

const format = (filters: IFilter) => {
  const { life, height, weight, breed } = filters;
  const [ minLife, maxLife] = life || [0, 18];
  const [ minHeight, maxHeight ] =  height || [0, 18];
  const [ minWeight, maxWeight ] = weight || [0, 18];
  const s = 'statistics.';

  const filter = '?' + s + 'Breed=' + breed + 
        '&' + s + 'Life.min_gte=' + minLife + '&' + s + 'Life.max_lte=' + maxLife +
        '&' + s + 'Height.min_gte=' + minHeight + '&' + s + 'Height.max_lte=' + maxHeight +
        '&' + s + 'Weight.min_gte=' + minWeight + '&' + s + 'Weight.max_lte=' + maxWeight;

  return filter;
}

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    setFilters: (state: IFilters, action: PayloadAction<IFilter>) => ({
      ...state,
      filters: action.payload
    })
  }
});

export const selectFilters = (state: RootState): IFilters => state.filters;
export const selectFormattedFilters = (state: RootState): string => format(state.filters.filters);
export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
