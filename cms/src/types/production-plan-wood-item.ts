export type TypeProductionPlanWoodItemType = 'normal' | 'wasted' | 'keep'
export type TypeProductionPlanWoodItemCuttingStatus = 'pending' | 'success'

export interface ITFProductionPlanWoodItem {
  id: number
  productionPlanWoodID?: number | null
  productionPlanID?: number | null
  length: number
  type?: TypeProductionPlanWoodItemType
  cuttingStatus?: TypeProductionPlanWoodItemCuttingStatus
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
}

export interface ITFUpdateStatusProductionPlanWoodItem {
  cuttingStatus?: TypeProductionPlanWoodItemCuttingStatus
  ids?: number[]
}
