import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFWoodTypeOption } from 'types/wood-type-option.type'
import { ITFWoodType } from 'types/wood-type.type'

import { orderBy } from 'lodash'

export const woodTypeApiSlice = createApi({
  reducerPath: 'woodTypeApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllWoodTypes: builder.query<ITFWoodType[], void>({
      query: () => 'wood-types',
    }),
    getAllWoodTypesOptions: builder.query<ITFWoodTypeOption[], void>({
      query: () => 'wood-types',
      transformResponse: (response: ITFWoodType[], meta, arg) => {
        return transformToOptions(response)
      },
    }),
    getWoodTypesByID: builder.query<ITFWoodType, string>({
      query: (id: string | number | undefined) => ({
        url: `wood-types/${id}`,
        method: 'GET',
      }),
    }),
    getWoodsByWoodTypeID: builder.query<ITFWoodType, string>({
      query: (id: string | number | undefined) => ({
        url: `wood-types/${id}/woods`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllWoodTypesQuery,
  useGetWoodTypesByIDQuery,
  useGetWoodsByWoodTypeIDQuery,
  useGetAllWoodTypesOptionsQuery,
} = woodTypeApiSlice

export const transformToOptions = (
  woods: ITFWoodType[]
): ITFWoodTypeOption[] => {
  return orderBy(woods, ['name']).map((item: ITFWoodType) => ({
    value: item.id,
    label: `${item.name} (${item.code ?? ''})`,
    data: item,
  }))
}
