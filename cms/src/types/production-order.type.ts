import {
  ITFProductionOrderItem,
  ITFUpdateProductionOrderItem,
} from './production-order-items.type'
import { ITFProductionPlan } from './production-plan.type'
import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

export interface ITFProductionOrder {
  id?: number | null
  woodId?: number | null
  orderNo?: string | null
  status?: string | null
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  wood?: ITFWood | null
  productionOrderItems?: ITFProductionOrderItem[] | null
  productionPlanId?: number | null
  productionPlan?: ITFProductionPlan | null
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
