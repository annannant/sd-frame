import { ITFUpdateProductionOrderItem } from './production-order-items.type'
import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

export interface ITFProductionOrder {
  id?: number | null
  woodId?: number | null
  orderNo?: string | null
  status?: string | null
  createdAt?: Date | null
  createdBy?: string | null
  updatedAt?: Date | null
  updatedBy?: string | null
  wood?: ITFWood | null
}

export interface ITFProductionOrderQueryParams {
  statuses?: string[]
}

export interface ITFTableProductionOrder extends ITFTable, ITFProductionOrder {}

export interface ITFCreateProductionOrder {
  woodId?: number
  status?: string
  orderItems?: ITFUpdateProductionOrderItem[]
}

export interface ITFUpdateProductionOrder extends ITFCreateProductionOrder {}
