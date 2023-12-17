import { ITFProductionWoodSummary } from 'types/production-wood-summary'

import { httpClient } from 'utils/httpClient'

export const postCreate = async (data: any) => {
  return await httpClient.post('/production-plans', data)
}

export const patchFinishPlan = async (id: number) => {
  return await httpClient.patch(`/production-plans/${id}/finish`)
}

export const patchWithdrawWoods = async (
  id: number,
  data: ITFProductionWoodSummary[]
) => {
  return await httpClient.patch(`/production-plans/${id}/withdraw-woods`, data)
}

export const patchUpdateStatus = async (data: any) => {
  return await httpClient.patch('/production-plans', data)
}
