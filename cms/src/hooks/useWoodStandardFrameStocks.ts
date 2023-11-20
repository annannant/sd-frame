import {
  ITFProductionOrder,
  ITFTableProductionOrder,
} from 'types/production-order.type'
import {
  ITFStandardFrameStock,
  ITFTableStandardFrameStock,
} from 'types/standard-frame-stock.type'
import { ITFTableWoodType, ITFWoodType } from 'types/wood-type.type'
import { ITFTableWood, ITFWood } from 'types/wood.type'

export const useWoodStandardFrameStocks = () => {
  const transformTable = (
    data: ITFStandardFrameStock[]
  ): ITFTableStandardFrameStock[] => {
    const result = data.map(
      (item, index: number): ITFTableStandardFrameStock => {
        return {
          ...item,
          key: `${item?.standardFrameId?.toString()}${item?.woodId?.toString()}`,
          no: index + 1,
        }
      }
    )

    return result
  }

  return {
    transformTable,
  }
}
