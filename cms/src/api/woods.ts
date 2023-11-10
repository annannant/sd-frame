import { ITFCreateWood } from 'types/wood.type'

import { httpClient } from 'utils/httpClient'

export const postCreateWood = async (data: ITFCreateWood) => {
  return await httpClient.post('/woods', data)
}

export const patchUpdateWood = async (id: string, data: any) => {
  return await httpClient.patch(`/woods/${id}`, data)
}

export const deleteWood = async (id: string) => {
  return await httpClient.delete(`/woods/${id}`)
}
