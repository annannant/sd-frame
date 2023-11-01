// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ITFProductionOrder,
  ITFProductionOrderQueryParams,
} from 'types/production-order.type'
import { ITFWoodOption } from 'types/wood-option.type'
import { ITFWood } from 'types/wood.type'

import { API_URL } from 'config/url.constant'
import { orderBy } from 'lodash'

export const productionOrderApiSlice = createApi({
  reducerPath: 'productionOrderApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL + '/' }),
  endpoints: (builder) => ({
    getAllProductionOrders: builder.query<
      ITFProductionOrder[],
      ITFProductionOrderQueryParams
    >({
      query: (params: ITFProductionOrderQueryParams) => ({
        url: `production-orders`,
        method: 'GET',
        params: {
          ...params,
          statuses: params.statuses?.join(','),
        },
      }),
    }),
    getProductionOrderByID: builder.query<ITFProductionOrder, string>({
      query: (id: string | number | undefined) => ({
        url: `production-orders/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetAllProductionOrdersQuery,
  useGetProductionOrderByIDQuery,
} = productionOrderApiSlice