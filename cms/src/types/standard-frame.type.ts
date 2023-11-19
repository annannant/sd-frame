import { ITFStandardFrameStock } from './standard-frame-stock.type'
import { ITFTable } from './table.type'

export interface ITFCreateStandardFrame {
  name?: string | null
  width?: number | null
  height?: number | null
  isActive?: boolean | null
  unit?: string | null
  defaultReorderPoint?: number | null
  standardFrameStocks?: ITFStandardFrameStock[] | null
}
export interface ITFStandardFrame extends ITFCreateStandardFrame {
  id: number
}

export interface ITFTableStandardFrame extends ITFTable, ITFStandardFrame {}
