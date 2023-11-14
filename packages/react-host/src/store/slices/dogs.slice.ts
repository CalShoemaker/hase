import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

const dogs: Array<IDog> = [];

export interface IDogsUpdate {
  type: string;
  payload: IDog;
}

export interface IDogs {
  dogs: IDog[];
}

interface IRating {
  title?: string;
  stars?: string;
}

interface ICharacteristics {
  content?: Array<string>;
  rating?: Array<IRating>;
}

interface IAccordion {
  title?: string;
  characteristics?: ICharacteristics;
}

interface ISpecialCards {
  rating?: Array<IRating>;
  accordions?: Array<IAccordion>;
}

interface ISpecial {
  cards?: Array<ISpecialCards>;
}

interface IRange {
  min: number;
  max: number;
  unit: string
}

export interface IStatistics {
  Breed: string;
  Height: IRange;
  Weight: IRange;
  Life: IRange;
}

export interface IDog {
  title: string;
  id: string;
  tags?: string[];
  statistics?: IStatistics;
  facts?: Array<any>;
  images?: Array<string>;
  special?: ISpecial;
}

export interface IFilters {
  life?: number[];
  height?: number[];
  weight?: number[];
  breed?: string;
  tags?: string[];
}

export interface IHase {
  dogs: IDog[];
  isLoading: boolean;
  isError: boolean;
}

const dogsInterface: IDog[] = dogs;
const initialState: IHase = {
  dogs: [...dogsInterface],
  isError: false,
  isLoading: false
};

export const fetchDogs = createAsyncThunk("fetchDogs", async (filters:IFilters) => {
  const { life, height, weight, breed } = filters;
  // TODO: Improve this...
  // TODO: Cache results, debounce, throttle.
  const minLife = life ? life[0] : 0;
  const maxLife = life ? life[1] : 18;
  const minHeight = height ? height[0] : 0;
  const maxHeight = height ? height[1] : 18;
  const minWeight = weight ? weight[0] : 0;
  const maxWeight = weight ? weight[1] : 18;

  const filter = '?statistics.Breed=' + breed + 
        '&statistics.Life.min_gte=' + minLife + '&statistics.Life.max_lte=' + maxLife +
        '&statistics.Height.min_gte=' + minHeight + '&statistics.Height.max_lte=' + maxHeight +
        '&statistics.Weight.min_gte=' + minWeight + '&statistics.Weight.max_lte=' + maxWeight;

  // TODO: Use Nest instead of JSON-Server, add auth.
  const res = await fetch(`http://localhost:3000/dogs${filter}`);
  return res?.json();
});

export const dogsSlice = createSlice({
  name: "dogs",
  initialState,
  reducers: {
    reset: () => ({ ...initialState }),
    setDogs:(state:IHase, action:PayloadAction<Array<IDog>>) => ({
      ...state,
      dogs: action.payload
    })
  },
  extraReducers: (builder) => {
   builder.addCase(fetchDogs.pending, (state, action) => {
    state.isLoading = true;
   })
   builder.addCase(fetchDogs.fulfilled, (state, action) => {
    state.isLoading = false;
    state.dogs = action.payload;
   })
   builder.addCase(fetchDogs.rejected, (state, action) => {
    state.isError = true;
   })
  }
});

export const selectDogs = (state: RootState): IDogs => state.dogs;
export const selectFilteredDogs = (state: RootState): IDogs => state.dogs;
export const selectDogById =
  (ID: string) =>
  (state: RootState): IDog =>
    state.dogs.dogs.filter(({ id }) => id === ID)[0];

export const { setDogs } = dogsSlice.actions;
export default dogsSlice.reducer;
