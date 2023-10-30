import { ITFUpdateProductionOrderItem } from './production-order-items.type'

export interface ITFCreateProductionOrder {
  woodId?: number
  orderItems?: ITFUpdateProductionOrderItem[]
}

export interface ITFUpdateProductionOrder extends ITFCreateProductionOrder {}
