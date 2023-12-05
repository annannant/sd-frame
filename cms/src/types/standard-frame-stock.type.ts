import { ITFStandardFrame } from './standard-frame.type'
import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

export interface ITFCreateStandardFrameStock {
  standardFrameId?: number | null
  woodId?: number | null
  reorderPoint?: number | null
  stock?: number | null
  inprogressStock?: number | null
}

export interface ITFUpdateStandardFrameStock
  extends ITFCreateStandardFrameStock {}

export interface ITFStandardFrameStock extends ITFCreateStandardFrameStock {
  createdAt?: string | null
  createdBy?: string | null
  updatedAt?: string | null
  updatedBy?: string | null
  standardFrame?: ITFStandardFrame | null
  wood?: ITFWood | null
}

export interface ITFStandardFrameStockByStandardFrame
  extends ITFStandardFrame,
    ITFStandardFrameStock {
  totalStock?: number | null
  totalReorderStock?: number | null
}

export interface ITFTableStandardFrameStockByStandardFrame
  extends ITFTable,
    ITFStandardFrameStockByStandardFrame {}

export interface ITFTableStandardFrameStock
  extends ITFTable,
    ITFStandardFrameStock {
  totalStock?: number | null
}

export interface ITFParamStandardFrameStock {
  standardFrameId?: number | null
  woodId?: number | null
}
