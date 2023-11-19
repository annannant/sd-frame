import { ITFCreateStandardFrameStock } from 'types/standard-frame-stock.type'

import { httpClient } from 'utils/httpClient'

export const postCreateStandardFrameStock = async (
  data: ITFCreateStandardFrameStock
) => {
  return await httpClient.post('/standard-frame-stocks', data)
}

export const patchUpdateStandardFrameStock = async (
  data: ITFCreateStandardFrameStock
) => {
  return await httpClient.patch(`/standard-frame-stocks`, data)
}

export const deleteStandardFrameStock = async (
  data: ITFCreateStandardFrameStock
) => {
  return await httpClient.delete(`/standard-frame-stocks`, { data })
}
