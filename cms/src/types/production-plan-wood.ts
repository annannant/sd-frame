import { ITFProductionPlanWoodItem } from './production-plan-wood-item'

export type ITFProductionPlanWoodItemType = 'full' | 'part'

export interface ITFProductionPlanWood {
  id: number
  productionPlanID?: number | null
  woodItemStockID?: string | null
  itemType: ITFProductionPlanWoodItemType
  length: number
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  productionPlanWoodItems?: ITFProductionPlanWoodItem[]
}
