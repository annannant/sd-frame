import {
  ITFProductionOrder,
  ITFTableProductionOrder,
} from 'types/production-order.type'
import { ITFTableWoodType, ITFWoodType } from 'types/wood-type.type'
import { ITFTableWood, ITFWood } from 'types/wood.type'

export const useWoods = () => {
  const transformTable = (data: ITFWood[]): ITFTableWood[] => {
    const result = data.map((item, index: number): ITFTableWood => {
      return {
        ...item,
        key: item?.id?.toString(),
        no: index + 1,
      }
    })

    return result
  }

  return {
    transformTable,
  }
}
