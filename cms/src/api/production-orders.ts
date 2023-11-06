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
