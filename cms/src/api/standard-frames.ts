import { ITFCreateStandardFrame } from 'types/standard-frame.type'

import { httpClient } from 'utils/httpClient'

export const postCreateStandardFrame = async (data: ITFCreateStandardFrame) => {
  return await httpClient.post('/standard-frames', data)
}

export const patchUpdateStandardFrame = async (id: number, data: any) => {
  return await httpClient.patch(`/standard-frames/${id}`, data)
}

export const deleteStandardFrame = async (id: number) => {
  return await httpClient.delete(`/standard-frames/${id}`)
}

export const patchActiveStandardFrame = async (id: number, data: any) => {
  return await httpClient.patch(`/standard-frames/${id}/active`, data)
}
