import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFStandardFrameOption } from 'types/standard-frame-option.type'
import { ITFStandardFrame } from 'types/standard-frame.type'

interface ITFStandardFrameResponse {
  list: ITFStandardFrame[]
  options: ITFStandardFrameOption[]
}

export const standardFrameApiSlice = createApi({
  reducerPath: 'standardFrameApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllStandardFrames: builder.query<ITFStandardFrame[], void>({
      query: () => 'standard-frames',
    }),
    getAllActiveStandardFrames: builder.query<ITFStandardFrameResponse, void>({
      query: () => 'standard-frames',
      transformResponse: (response: ITFStandardFrame[], meta, arg) => {
        return {
          list: response,
          options: TransformToOptions(response),
        }
      },
    }),
    getStandardFramesByID: builder.query<ITFStandardFrame, string>({
      query: (id: string | number | undefined) => ({
        url: `standard-frames/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllStandardFramesQuery,
  useGetAllActiveStandardFramesQuery,
  useGetStandardFramesByIDQuery,
} = standardFrameApiSlice

export const TransformToOptions = (
  woods: ITFStandardFrame[]
): ITFStandardFrameOption[] => {
  return woods.map((item: ITFStandardFrame) => ({
    value: item.id,
    label: item.name,
    data: item,
  }))
}
