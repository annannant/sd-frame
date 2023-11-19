import { ITFStandardFrame } from './standard-frame.type'
import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

export interface ITFCreateStandardFrameStock {
  standardFrameId?: number | null
  woodId?: number | null
  reorderPoint?: number | null
  stock?: number | null
}

export interface ITFUpdateStandardFrameStock
  extends ITFCreateStandardFrameStock {}

export interface ITFStandardFrameStock extends ITFCreateStandardFrameStock {
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  strandardFrame?: ITFStandardFrame | null
  wood?: ITFWood | null
}

export interface ITFStandardFrameStockByStdFrame
  extends ITFStandardFrame,
    ITFStandardFrameStock {
  totalStock?: number | null
}

export interface ITFTableStandardFrameStockByStdFrame
  extends ITFTable,
    ITFStandardFrameStockByStdFrame {}

export interface ITFTableStandardFrameStock
  extends ITFTable,
    ITFStandardFrameStock {}
