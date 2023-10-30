export interface ITFCreateProductionOrderItem {
  width?: number | null
  height?: number | null
  qty?: number | null
  isCustomSize?: boolean | null
}

export interface ITFUpdateProductionOrderItem
  extends ITFCreateProductionOrderItem {}
