import { ITFProductionOrderItem } from './production-order-items.type'
import { ITFProductionOrder } from './production-order.type'
import { ITFProductionPlanSuggestItem } from './production-plan-suggest-item.type'
import { ITFProductionPlanWood } from './production-plan-wood'
import { ITFProductionWoodSummary } from './production-wood-summary'

export interface ITFProductionPlan {
  id: number
  woodLot?: number | null
  sparePart?: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  productionOrder?: ITFProductionOrder
  productionPlanSuggestItems?: ITFProductionPlanSuggestItem[]
  productionPlanWoods?: ITFProductionPlanWood[]
  productionWoodSummary?: ITFProductionWoodSummary[]
  summaryOrderItems?: ITFProductionOrderItem[]
  summarySuggestItems?: ITFProductionOrderItem[]
}
