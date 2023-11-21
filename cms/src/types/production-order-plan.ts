import { ITFLocation } from './location.type'
import { ITFTable } from './table.type'
import { ITFWoodItemStock } from './wood-item-stock.type'
import { ITFWoodStock } from './wood-stock.type'

export interface ITFProductionOrderPlanResponse {
  plans?: ITFProductionOrderPlan[] | null
  suggest?: ITFProductionOrderPlanSuggest[] | null
  summaryWood?: ITFProductionOrderPlanSummaryWood[] | null
  minLength?: number | null
  woodLength?: number | null
  isWoodOutStock?: boolean | null
  // woodStock?: ITFWoodStock | null
  // totalUsedWood?: number | null
  // listUsedWoodStock?: ITFWoodItemStock[] | null
}

export interface ITFProductionOrderPlan {
  no: number
  wood?: number | null
  list?: number[]
}

export interface ITFProductionOrderPlanSuggest {
  no: number
  size?: number
  qty?: number
}

export interface ITFProductionOrderCreatePlanParams {
  id: number
  sparePart: number
}

export interface ITFProductionOrderPlanSummaryWood {
  woodId?: number | null
  locationId?: number | null
  lot?: number | null
  stock?: number | null
  woodLength?: number | null
  location?: ITFLocation
  usedQty?: number | null
  woodFromStock?: boolean | null
  isOutStock?: boolean | null
}

export interface ITFTableProductionOrderPlanSummaryWood
  extends ITFTable,
    ITFProductionOrderPlanSummaryWood {}
