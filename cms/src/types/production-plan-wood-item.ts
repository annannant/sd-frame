type TypeProductionPlanWoodItemType = 'normal' | 'wasted' | 'keep'
type TypeProductionPlanWoodItemCuttingStatus = 'pending' | 'wasted' | 'keep'

export interface ITFProductionPlanWoodItem {
  id: number
  productionPlanWoodID?: number | null
  productionPlanID?: number | null
  length: number
  type: TypeProductionPlanWoodItemType
  cuttingStatus: TypeProductionPlanWoodItemCuttingStatus
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}
