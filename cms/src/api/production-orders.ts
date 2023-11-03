import { httpClient } from 'utils/httpClient'

export const postCreate = async (data: any) => {
  return await httpClient.post('/production-orders', data)
}

export const patchUpdate = async (id: string, data: any) => {
  return await httpClient.patch(`/production-orders/${id}`, data)
}
