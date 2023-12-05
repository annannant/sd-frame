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
import { pick } from 'lodash'

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
    postProductionOrderCreatePlan: builder.query<
      ITFProductionOrderPlanResponse,
      {
        id: string
        params: ITFProductionOrderCreatePlanParams
      }
    >({
      query: ({
        id,
        params,
      }: {
        id: string
        params: ITFProductionOrderCreatePlanParams
      }) => {
        return {
          url: `production-orders/${id}/plan`,
          method: 'POST',
          body: params,
          params: pick(params, ['debug']),
        }
      },
    }),
  }),
})

export const {
  useGetAllProductionOrdersQuery,
  useGetProductionOrderByIDQuery,
  usePostProductionOrderCreatePlanQuery,
} = productionOrderApiSlice
