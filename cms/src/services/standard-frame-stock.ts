import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ITFParamStandardFrameStock,
  ITFStandardFrameStock,
  ITFStandardFrameStockByStandardFrame,
} from 'types/standard-frame-stock.type'

export const standardFrameStockApiSlice = createApi({
  reducerPath: 'standardFrameStockApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllStandardFrameStocks: builder.query<
      ITFStandardFrameStock[],
      ITFParamStandardFrameStock
    >({
      query: (params: ITFParamStandardFrameStock) => ({
        url: `standard-frame-stocks`,
        method: 'GET',
        params: {
          ...params,
        },
      }),
    }),
    getAllStandardFrameStocksByStandardFrames: builder.query<
      ITFStandardFrameStockByStandardFrame[],
      ITFParamStandardFrameStock
    >({
      query: (params: ITFParamStandardFrameStock) => ({
        url: `standard-frame-stocks/standard-frames`,
        method: 'GET',
        params: {
          ...params,
        },
      }),
    }),
    getAllStandardFrameStocksByStandardFrameID: builder.query<
      ITFStandardFrameStockByStandardFrame[],
      { id: string | number | undefined; params?: ITFParamStandardFrameStock }
    >({
      query: ({
        id,
        params,
      }: {
        id: string | number | undefined
        params: ITFParamStandardFrameStock
      }) => ({
        url: `standard-frame-stocks/standard-frames/${id}`,
        method: 'GET',
        params: {
          ...params,
        },
      }),
    }),
  }),
})

export const {
  useGetAllStandardFrameStocksByStandardFramesQuery,
  useGetAllStandardFrameStocksByStandardFrameIDQuery,
  useGetAllStandardFrameStocksQuery,
} = standardFrameStockApiSlice
