import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { ITFAttributeOption } from 'types/attribute-option'
import { ITFAttribute } from 'types/attribute.type'

import { orderBy } from 'lodash'

export const attributeApiSlice = createApi({
  reducerPath: 'attributeApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3101/api/v1/' }),
  endpoints: (builder) => ({
    getAllAttributesOptions: builder.query<ITFAttributeOption[], void>({
      query: () => 'attributes',
      transformResponse: (response: ITFAttribute[], meta, arg) => {
        return transformToOptions(response)
      },
    }),
  }),
})

export const { useGetAllAttributesOptionsQuery } = attributeApiSlice

export const transformToOptions = (
  list: ITFAttribute[]
): ITFAttributeOption[] => {
  return orderBy(list, ['name']).map((item: ITFAttribute) => ({
    value: item.id,
    label: `${item.description} (${item.name ?? ''})`,
    data: item,
  }))
}
