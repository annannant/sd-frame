// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFWoodOption } from 'types/wood-option.type'
import { ITFWood } from 'types/wood.type'

import { orderBy } from 'lodash'

interface ITFWoodResponse {
  list: ITFWood[]
  options: ITFWoodOption[]
}

export const woodApiSlice = createApi({
  reducerPath: 'woodApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllWoods: builder.query<ITFWoodResponse, void>({
      query: () => 'woods',
      transformResponse: (response: ITFWood[], meta, arg) => {
        return {
          list: response,
          options: TransformToOptions(response),
        }
      },
    }),
    // getPokemonByName: builder.query<Pokemon, string>({
    //   query: (name) => `pokemon/${name}`,
    // }),
  }),
})

export const { useGetAllWoodsQuery } = woodApiSlice

export const TransformToOptions = (woods: ITFWood[]): ITFWoodOption[] => {
  return orderBy(woods, ['name']).map((item: ITFWood) => ({
    value: item.id,
    label: `${item.name} - ${item.description}`,
    data: item,
  }))
}
