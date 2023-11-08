import { ITFCreateWoodType, ITFWoodType } from 'types/wood-type.type'

import { httpClient } from 'utils/httpClient'

export const postCreateWoodType = async (data: ITFCreateWoodType) => {
  return await httpClient.post('/wood-types', data)
}

export const patchUpdateWoodType = async (id: string, data: any) => {
  return await httpClient.patch(`/wood-types/${id}`, data)
}

export const deleteWoodType = async (id: string) => {
  return await httpClient.delete(`/wood-types/${id}`)
}
