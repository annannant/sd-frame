import {
  ITFTableListWoodStockLocation,
  ITFTableWoodStockLocation,
  ITFWoodStockLocation,
} from 'types/wood-stock-location.type'
import {
  ITFTableWoodStock,
  ITFTableWoodStockWood,
  ITFWoodStock,
  ITFWoodStockWood,
} from 'types/wood-stock.type'

import { groupBy, orderBy } from 'lodash'

export const useWoodStockLocations = () => {
  const transformStockLocations = (
    data: ITFWoodStockLocation[]
  ): ITFTableListWoodStockLocation[] => {
    const group = groupBy(data, 'locationId')
    const res = []
    for (const key of Object.keys(group)) {
      const item = group[key]
      const info: ITFWoodStockLocation = item[0]
      const data: ITFTableListWoodStockLocation = {
        key: `${info?.woodId}${info?.locationId}${info?.lot}`,
        title: info.location?.name,
        location: info.location,
        wood: info.wood,
        dataSource: transformTableLocations(item),
      }
      res.push(data)
    }
    console.log('res:', res)

    return res
  }

  const transformTableLocations = (
    data: ITFWoodStockLocation[]
  ): ITFTableWoodStockLocation[] => {
    const result = data.map(
      (item, index: number): ITFTableWoodStockLocation => {
        return {
          ...item,
          key: `${item?.woodId}${item?.locationId}${item?.lot}`,
          no: index + 1,
        }
      }
    )

    return orderBy(result, ['lot'], ['asc'])
  }

  return {
    transformStockLocations,
    transformTableLocations,
  }
}
