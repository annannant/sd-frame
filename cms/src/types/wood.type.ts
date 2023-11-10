import { ITFAttribute } from './attribute.type'
import { ITFTable } from './table.type'
import { ITFWoodType } from './wood-type.type'

export interface ITFCreateWood {
  woodTypeId?: number | null
  attributeId?: number | null
  code?: string | null
  name?: string | null
  description?: string | null
  imageUrl?: string | null
}

export interface ITFWood extends ITFCreateWood {
  id?: number
  woodType?: ITFWoodType | null
  attribute?: ITFAttribute | null
}

export interface ITFTableWood extends ITFTable, ITFWood {}
