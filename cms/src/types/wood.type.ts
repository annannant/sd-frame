import { ITFAttribute } from './attribute.type'
import { ITFWoodType } from './wood-type.type'

export interface ITFWood {
  id?: number
  woodTypeId?: number | null
  attributeId?: number | null
  code?: string | null
  name?: string | null
  description?: string | null
  imageUrl?: string | null
  woodType?: ITFWoodType | null
  attribute?: ITFAttribute | null
}
