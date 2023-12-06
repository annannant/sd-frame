// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFProductionPlan } from 'types/production-plan.type'

import { API_URL } from 'config/url.constant'

export const productionPlanApiSlice = createApi({
  reducerPath: 'productionPlanApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL + '/' }),
  endpoints: (builder) => ({
    getProductionPlanByID: builder.query<ITFProductionPlan, string>({
      query: (id: string | number | undefined) => ({
        url: `production-plans/${id}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useGetProductionPlanByIDQuery } = productionPlanApiSlice
