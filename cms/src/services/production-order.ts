// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {
  ITFProductionOrderCreatePlanParams,
  ITFProductionOrderPlanResponse,
} from 'types/production-order-plan'
import {
  ITFProductionOrder,
  ITFProductionOrderQueryParams,
} from 'types/production-order.type'

import { API_URL } from 'config/url.constant'

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
    postProductionCreatePlan: builder.query<
      ITFProductionOrderPlanResponse,
      ITFProductionOrderCreatePlanParams
    >({
      query: (params: ITFProductionOrderCreatePlanParams) => ({
        url: `production-orders/create-plan`,
        method: 'POST',
        body: params,
      }),
    }),
  }),
})

export const {
  useGetAllProductionOrdersQuery,
  useGetProductionOrderByIDQuery,
  usePostProductionCreatePlanQuery,
} = productionOrderApiSlice
