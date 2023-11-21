import {
  CUTTING_INPROGRESS,
  DRAFT,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'
import {
  ITFProductionOrderPlanResponse,
  ITFProductionOrderPlanSummaryWood,
  ITFTableProductionOrderPlanSummaryWood,
} from 'types/production-order-plan'
import { ITFWoodStockLocation } from 'types/wood-stock-location.type'

import { orderBy } from 'lodash'
import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const useProductionOrdersPlan = () => {
  const selectedLocation = (
    totalUsedWood: number,
    woodStockLocations: ITFWoodStockLocation[]
  ) => {
    const response = []
    let remaining = totalUsedWood
    for (const location of woodStockLocations) {
      if (remaining > 0) {
        const qty = location.stock ?? 0
        const used = qty > remaining ? remaining : qty
        const newLocation = {
          ...location,
          qty: used,
        }
        response.push(newLocation)
        remaining -= used
      }
    }
    console.log('response:', response)

    return response
  }

  const transformTableSummaryWood = (
    data: ITFProductionOrderPlanSummaryWood[]
  ): ITFTableProductionOrderPlanSummaryWood[] => {
    const response = data.map((item, index) => {
      const key = [
        `${item.woodFromStock ? 'stock' : 'full'}`,
        item.woodId,
        item.locationId,
        item.lot,
      ].join('')
      return {
        ...item,
        key,
        no: index + 1,
      }
    })
    return response
  }

  return {
    transformTableSummaryWood,
  }
}
