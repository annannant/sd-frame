import {
  CUTTING_INPROGRESS,
  DRAFT,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'
import {
  ITFProductionOrderPlanResponse,
  ITFTableProductionOrderWood,
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

  const transformTableProductionOrderWood = (
    data: ITFProductionOrderPlanResponse
  ): ITFTableProductionOrderWood[] => {
    let no = 1
    const response = []
    // wood in stock
    for (const woodItem of orderBy(
      data?.listUsedWoodStock ?? [],
      'woodLength',
      'asc'
    )) {
      console.log('woodItem:', woodItem)
      response.push({
        no: no,
        key: `wood-${woodItem.id}`,
        woodType: 'ไม้ในสต๊อก',
        length: woodItem.woodLength,
        qty: 1,
        location: woodItem?.location ?? {},
      })
      no++
    }

    if ((data.totalUsedWood ?? 0) > 0) {
      const list = data.woodStock?.woodStockLocations ?? []
      const locations = selectedLocation(data.totalUsedWood ?? 0, list)
      for (const location of locations) {
        response.push({
          no: no,
          key: `full-${location.woodId}${location.lot}${location.locationId}`,
          woodType: 'ไม้เส้น เต็มขนาด',
          length: data.woodLength,
          qty: location.qty,
          location: location?.location ?? {},
        })
        no++
      }
    }

    return response
  }

  return {
    transformTableProductionOrderWood,
  }
}
