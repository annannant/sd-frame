import {
  ITFCreateImportWoodStock,
  ITFImportWoodStock,
} from 'types/wood-stock-import.type'

import { httpClient } from 'utils/httpClient'

export const postValidateImportStock = async (
  data: ITFCreateImportWoodStock[]
) => {
  return await httpClient.post<ITFImportWoodStock[]>(
    '/wood-stocks/import/validation',
    data
  )
}

export const postImportStock = async (data: ITFCreateImportWoodStock[]) => {
  return await httpClient.post<ITFImportWoodStock[]>(
    '/wood-stocks/import',
    data
  )
}
