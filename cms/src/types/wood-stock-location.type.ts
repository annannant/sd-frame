import { ITFLocation } from './location.type'
import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

export interface ITFWoodStockLocation {
  woodId?: number | null
  locationId?: number | null
  lot?: number | null
  stock?: number | null
  wood?: ITFWood
  location?: ITFLocation
}

export interface ITFTableWoodStockLocation
  extends ITFTable,
    ITFWoodStockLocation {}

export interface ITFTableListWoodStockLocation
  extends ITFTable,
    ITFWoodStockLocation {
  title?: string | null
  dataSource?: ITFTableWoodStockLocation[]
}
