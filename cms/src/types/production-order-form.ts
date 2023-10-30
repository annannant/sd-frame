export interface ITFCreateProductionOrderItemForm {
  size?: number | null
  width?: number | null
  height?: number | null
  isCustomSize?: boolean | null
  qty?: number | null
}

export interface ITFCreateProductionOrderForm {
  woodId?: number
  orderItems?: ITFCreateProductionOrderItemForm[]
}
