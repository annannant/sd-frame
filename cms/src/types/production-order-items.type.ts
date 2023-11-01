import { ITFStandardFrame } from './standard-frame.type'
import { ITFTable } from './table.type'

export interface ITFProductionOrderItem {
  id?: number
  width?: string | null
  height?: string | null
  qty?: number | null
  isCustomSize?: boolean | null
  productionOrderId?: number | null
  standardFrame?: ITFStandardFrame | null
}

export interface ITFTableProductionOrderItem
  extends ITFProductionOrderItem,
    ITFTable {}

export interface ITFCreateProductionOrderItem {
  width?: number | null
  height?: number | null
  qty?: number | null
  isCustomSize?: boolean | null
}

export interface ITFUpdateProductionOrderItem
  extends ITFCreateProductionOrderItem {}