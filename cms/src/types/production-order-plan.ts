import { ITFLocation } from './location.type'
import { ITFTable } from './table.type'
import { ITFWoodItemStock } from './wood-item-stock.type'
import { ITFWoodStock } from './wood-stock.type'

export interface ITFProductionOrderPlanResponse {
  plans?: ITFProductionOrderPlan[] | null
  suggest?: ITFProductionOrderPlanSuggest[] | null
  minLength?: number | null
  woodLength?: number | null
  woodStock?: ITFWoodStock | null
  totalUsedWood?: number | null
  listUsedWoodStock?: ITFWoodItemStock[] | null
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

export interface ITFTableProductionOrderWood extends ITFTable {
  woodType?: string | null
  length?: number | null
  qty?: number | null
  location?: ITFLocation
}

export interface ITFProductionOrderCreatePlanParams {
  id: number
  sparePart: number
}
