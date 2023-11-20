import { ITFLocation } from './location.type'

export interface ITFCreateWoodItemStock {
  woodId?: number
  locationId?: number
  lot?: number
  woodLength?: number
}

export interface ITFWoodItemStock extends ITFCreateWoodItemStock {
  id?: number
  location?: ITFLocation | null
}
