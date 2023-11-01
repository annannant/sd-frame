export interface ITFProductionOrderPlanResponse {
  plans?: ITFProductionOrderPlan[] | null
  suggest?: ITFProductionOrderPlanSuggest[] | null
  minLength?: number | null
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
