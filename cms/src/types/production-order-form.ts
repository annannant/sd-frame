export interface ITFCreateProductionOrderItemForm {
  id?: number | null
  size?: number | null
  width?: number | null
  height?: number | null
  isCustomSize?: boolean | null
  qty?: number | null
  standardFrameId?: number | null
  name?: string | null
}

export interface ITFCreateProductionOrderForm {
  woodId?: number
  orderItems?: ITFCreateProductionOrderItemForm[]
}
