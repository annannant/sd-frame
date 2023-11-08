import { ITFTable } from './table.type'

export interface ITFCreateWoodType {
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

export interface ITFWoodType extends ITFCreateWoodType {
  id?: number
}

export interface ITFTableWoodType extends ITFTable, ITFWoodType {}
