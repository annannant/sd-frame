import { ITFLocation } from './location.type'
import { ITFTable } from './table.type'
import { ITFWood } from './wood.type'

export interface ITFCreateImportWoodStock {
  woodCode?: string | null
  woodName?: string | null
  qty?: number | null
  lot?: number | null
  locationCode?: string | null
  locationName?: string | null
  remark?: string | null
}

export interface ITFImportWoodStock extends ITFCreateImportWoodStock {
  status?: string | null
  errors?: string[]
  wood?: ITFWood
  location?: ITFLocation
  importToLot?: number | null
  currentStock?: number | null
  newStock?: number | null
  isNewLot?: boolean | null
  woodId?: number | null
  locationId?: number | null
}

export interface ITFTableImportWoodStock extends ITFTable, ITFImportWoodStock {}
