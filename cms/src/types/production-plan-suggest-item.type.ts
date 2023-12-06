import { ITFTable } from './table.type'

export interface ITFProductionPlanSuggestItem {
  id: number
  productionPlanID?: number | null
  name?: string | null
  width?: string | null
  height?: string | null
  qty?: number | null
}

export interface ITFTableProductionPlanSuggestItem
  extends ITFTable,
    ITFProductionPlanSuggestItem {}
