import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFWoodStockLocation } from 'types/wood-stock-location.type'

export const woodStockLocationApiSlice = createApi({
  reducerPath: 'woodStockLocationApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getWoodStocksLocationByWoodID: builder.query<
      ITFWoodStockLocation[],
      string
    >({
      query: (id: string | number | undefined) => ({
        url: `wood-stock-locations/woods/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetWoodStocksLocationByWoodIDQuery } =
  woodStockLocationApiSlice
