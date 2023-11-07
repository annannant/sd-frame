import {
  ITFProductionOrder,
  ITFTableProductionOrder,
} from 'types/production-order.type'
import { ITFTableWoodType, ITFWoodType } from 'types/wood-type.type'

export const useWoodTypes = () => {
  const transformTable = (data: ITFWoodType[]): ITFTableWoodType[] => {
    const result = data.map((item, index: number): ITFTableWoodType => {
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
