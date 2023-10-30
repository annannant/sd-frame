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
    getAllStandardFrames: builder.query<ITFStandardFrameResponse, void>({
      query: () => 'standard-frames',
      transformResponse: (response: ITFStandardFrame[], meta, arg) => {
        return {
          list: response,
          options: TransformToOptions(response),
        }
      },
    }),
  }),
})

export const { useGetAllStandardFramesQuery } = standardFrameApiSlice

export const TransformToOptions = (
  woods: ITFStandardFrame[]
): ITFStandardFrameOption[] => {
  return woods.map((item: ITFStandardFrame) => ({
    value: item.id,
    label: item.name,
    data: item,
  }))
}
