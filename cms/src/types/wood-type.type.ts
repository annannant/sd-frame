import { ITFTable } from './table.type'

export interface ITFWoodType {
  id?: number
  name?: string | null
  description?: string | null
  code?: string | null
  width?: string | null
  height?: string | null
  length?: string | null
  sizeUnit?: string | null
  qtyPerbox?: number | null
  imageUrl?: string | null
}

export interface ITFTableWoodType extends ITFTable, ITFWoodType {}
