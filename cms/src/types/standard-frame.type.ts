import { ITFTable } from './table.type'

export interface ITFCreateStandardFrame {
  name?: string | null
  width?: number | null
  height?: number | null
  isActive?: boolean | null
  unit?: string | null
}
export interface ITFStandardFrame extends ITFCreateStandardFrame {
  id: number
}

export interface ITFTableStandardFrame extends ITFTable, ITFStandardFrame {}
