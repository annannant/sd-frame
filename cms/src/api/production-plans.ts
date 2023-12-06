import { ITFProductionWoodSummary } from 'types/production-wood-summary'

import { httpClient } from 'utils/httpClient'

export const postCreate = async (data: any) => {
  return await httpClient.post('/production-plans', data)
}

export const patchWithdrawWoods = async (
  id: number,
  data: ITFProductionWoodSummary[]
) => {
  return await httpClient.patch(`/production-plans/${id}/withdraw-woods`, data)
}
