import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IDog, IDogs } from './dogs.slice';

const baseUrl = 'http://localhost:3000/';

export const dogsApi = createApi({
  reducerPath: 'dogsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getDogs: builder.query<IDogs, void>({
      query: () => `dogs/`,
    }),
    getFilteredDogs: builder.query<IDogs, string>({
      query: (filter) => `dogs/${filter}`,
    }),
    getDogById: builder.query<any, string>({
      query: (id) => ({ url: `dogs/?id=${id}` }),
    })
  })
})

export const { useGetDogsQuery, useGetFilteredDogsQuery, useGetDogByIdQuery } = dogsApi