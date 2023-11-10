import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

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
  woods?: ITFWood[]
}

export interface ITFTableWoodType extends ITFTable, ITFWoodType {}
