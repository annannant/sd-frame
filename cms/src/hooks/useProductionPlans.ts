import {
  ITFProductionOrder,
  ITFTableProductionOrder,
} from 'types/production-order.type'
import { ITFProductionPlanWood } from 'types/production-plan-wood'
import { ITFProductionPlanWoodItem } from 'types/production-plan-wood-item'
import {
  ITFProductionWoodSummary,
  ITFProductionWoodSummaryTemp,
  ITFTableProductionWoodSummary,
} from 'types/production-wood-summary'

import { parser } from 'helper/number'

import { orderBy } from 'lodash'

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

  const formatWood = (
    productionWoodSummary: ITFProductionWoodSummary[]
  ): ITFProductionWoodSummaryTemp[] => {
    const result = [] as ITFProductionWoodSummaryTemp[]
    for (const wood of productionWoodSummary) {
      if ((wood.totalWithdraw ?? 0) <= 0) {
        continue
      }
      // if (wood.woodType === 'part') {
      for (let index = 0; index < (wood?.totalWithdraw ?? 0); index++) {
        result.push({
          ...wood,
          totalWithdraw: 1,
          tempId: `${wood.woodType}-${wood.id}-${index}`,
        })
      }
    }
    return result
  }

  const transformProductionPlanWoods = (
    productionPlanWoods: ITFProductionPlanWood[],
    productionWoodSummary: ITFProductionWoodSummary[]
  ) => {
    let formattedWoods = formatWood(productionWoodSummary)

    const formatted = (productionPlanWoods ?? []).map(
      (item: ITFProductionPlanWood) => {
        const items = (item.productionPlanWoodItems ?? []).map(
          (val: ITFProductionPlanWoodItem) => {
            return {
              ...val,
              length: parser(val.length),
              hasRemaining: val.type === 'keep' ? 1 : 0,
            }
          }
        )

        const orderedItems = orderBy(
          items,
          ['hasRemaining', 'length'],
          ['asc', 'desc']
        )
        const hasRemaining = item.productionPlanWoodItems?.find((val) =>
          val.type === 'keep' ? 1 : 0
        )
        return {
          ...item,
          productionPlanWoodItems: orderedItems,
          hasRemaining: hasRemaining ? 1 : 0,
          length: parser(item.length),
        }
      }
    )

    for (const wood of formatted) {
      const found = formattedWoods.find(
        (val) => parser(val.length ?? 0) === wood.length
      )
      if (found) {
        wood.tempWood = found
        formattedWoods = formattedWoods.filter(
          (val) => val.tempId !== found.tempId
        )
      }
    }

    return orderBy(formatted, ['length', 'hasRemaining'], ['asc', 'asc'])
  }

  return {
    transformTable,
    transformTableWoodSummary,
    transformProductionPlanWoods,
  }
}
