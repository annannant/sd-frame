import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFStandardFrameStockByStdFrame } from 'types/standard-frame-stock.type'

export const standardFrameStockApiSlice = createApi({
  reducerPath: 'standardFrameStockApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllStandardFrameStocksByStandardFrames: builder.query<
      ITFStandardFrameStockByStdFrame[],
      void
    >({
      query: () => 'standard-frame-stocks/standard-frames',
    }),
    getAllStandardFrameStocksByStandardFrameID: builder.query<
      ITFStandardFrameStockByStdFrame[],
      string
    >({
      query: (id: string | number | undefined) => ({
        url: `standard-frame-stocks/standard-frames/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllStandardFrameStocksByStandardFramesQuery,
  useGetAllStandardFrameStocksByStandardFrameIDQuery,
} = standardFrameStockApiSlice
