import {
  ITFProductionOrder,
  ITFTableProductionOrder,
} from 'types/production-order.type'
import {
  ITFProductionWoodSummary,
  ITFTableProductionWoodSummary,
} from 'types/production-wood-summary'

export const useProductionPlans = () => {
  const transformTable = (
    data: ITFProductionOrder[]
  ): ITFTableProductionOrder[] => {
    const result = data.map((item, index: number): ITFTableProductionOrder => {
      return {
        ...item,
        key: item?.id?.toString(),
        no: index + 1,
      }
    })

    return result
  }

  const transformTableWoodSummary = (
    data: ITFProductionWoodSummary[]
  ): ITFTableProductionWoodSummary[] => {
    const result = data.map(
      (item, index: number): ITFTableProductionWoodSummary => {
        return {
          ...item,
          key: item?.id?.toString(),
          no: index + 1,
        }
      }
    )

    return result
  }

  return {
    transformTable,
    transformTableWoodSummary,
  }
}
