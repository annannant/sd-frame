import {
  ITFProductionOrder,
  ITFTableProductionOrder,
} from 'types/production-order.type'

export const useProductionPlanOrders = () => {
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

  return {
    transformTable,
  }
}
