import { ITFUpdateStatusProductionPlanWoodItem } from 'types/production-plan-wood-item'

import { httpClient } from 'utils/httpClient'

export const patchUpdateStatus = async (
  data: ITFUpdateStatusProductionPlanWoodItem
) => {
  return await httpClient.patch(`/production-plan-wood-items/status`, data)
}
