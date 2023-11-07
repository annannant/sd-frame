import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFWoodType } from 'types/wood-type.type'

export const woodTypeApiSlice = createApi({
  reducerPath: 'woodTypeApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllWoodTypes: builder.query<ITFWoodType[], void>({
      query: () => 'wood-types',
    }),
    getWoodTypesByID: builder.query<ITFWoodType, string>({
      query: (id: string | number | undefined) => ({
        url: `wood-types/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllWoodTypesQuery } = woodTypeApiSlice
