import { ITFCreateWoodItemStock } from 'types/wood-item-stock.type'

import { httpClient } from 'utils/httpClient'

export const postCreate = async (data: any) => {
  return await httpClient.post('/wood-item-stocks', data)
}
export const postCreateMultiple = async (data: ITFCreateWoodItemStock[]) => {
  return await httpClient.post('/wood-item-stocks/multiple', data)
}
