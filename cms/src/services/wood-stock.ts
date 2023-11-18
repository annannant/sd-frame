import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ITFGetWoodStockByWoodIdResponse,
  ITFWoodStock,
  ITFWoodStockWood,
} from 'types/wood-stock.type'

export const woodStockApiSlice = createApi({
  reducerPath: 'woodStockApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllWoodStocksByWoods: builder.query<ITFWoodStockWood[], void>({
      query: () => 'wood-stocks/woods',
    }),
    getWoodStocksByWoodID: builder.query<
      ITFGetWoodStockByWoodIdResponse,
      string
    >({
      query: (id: string | number | undefined) => ({
        url: `wood-stocks/woods/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllWoodStocksByWoodsQuery,
  useGetWoodStocksByWoodIDQuery,
} = woodStockApiSlice
