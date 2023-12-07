// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFLocationOption } from 'types/location-option.type'
import { ITFLocation } from 'types/location.type'

import { orderBy } from 'lodash'

interface ITFLocationResponse {
  list: ITFLocation[]
  options: ITFLocationOption[]
}

export const locationApiSlice = createApi({
  reducerPath: 'locationApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllLocations: builder.query<ITFLocationResponse, void>({
      query: () => 'locations',
      transformResponse: (response: ITFLocation[], meta, arg) => {
        return {
          list: response,
          options: transformToOptions(response),
        }
      },
    }),
    getLocationByID: builder.query<ITFLocation, string>({
      query: (id: string | number | undefined) => ({
        url: `woods/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetAllLocationsQuery, useGetLocationByIDQuery } =
  locationApiSlice

export const transformToOptions = (
  locations: ITFLocation[]
): ITFLocationOption[] => {
  return orderBy(locations, ['name']).map((item: ITFLocation) => ({
    value: item.id ?? 0,
    label: `${item.code} - ${[item.name, item.description ?? '']
      .filter(Boolean)
      .join(', ')}`,
    data: item,
  }))
}
