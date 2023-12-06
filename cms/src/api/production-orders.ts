import { ITFProductionOrderCreatePlan } from 'types/production-order-plan.type'

import { httpClient } from 'utils/httpClient'

export const postCreateProductionOrder = async (data: any) => {
  return await httpClient.post('/production-orders', data)
}

export const patchUpdateProductionOrder = async (id: string, data: any) => {
  return await httpClient.patch(`/production-orders/${id}`, data)
}

export const deleteProductionOrder = async (id: string) => {
  return await httpClient.delete(`/production-orders/${id}`)
}

export const postProductionOrderCreatePlan = async (
  id: string,
  data: ITFProductionOrderCreatePlan
) => {
  return await httpClient.post(`/production-orders/${id}/create-plan`, data)
}

export const postProductionOrderCancelPlan = async (id: string, data: any) => {
  return await httpClient.post(`/production-orders/${id}/cancel-plan`, data)
}
