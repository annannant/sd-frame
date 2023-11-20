import { ITFLocation } from './location.type'
import { ITFTable } from './table.type'
import { ITFWoodItemStock } from './wood-item-stock.type'
import { ITFWoodStockLocation } from './wood-stock-location.type'
import { ITFWood } from './wood.type'

export interface ITFWoodStock {
  woodId?: number | null
  lot?: number | null
  totalStock?: number | null
  importedAt?: null | null
  remark?: string | null
  stockUnit?: string | null
  totalUsed?: number | null
  woodStockLocations?: ITFWoodStockLocation[] | null
  woodItemStocks?: ITFWoodItemStock[] | null
}

export interface ITFTableWoodStock extends ITFTable, ITFWoodStock {}

export interface ITFWoodStockWood extends ITFWood {
  totalStock?: number | null
  totalLot?: number | null
  totalUsed?: number | null
}

export interface ITFTableWoodStockWood extends ITFTable, ITFWoodStockWood {}

export interface ITFWoodStockSummary {
  totalStock?: number | null
  totalUsed?: number | null
}

export interface ITFGetWoodStockByWoodIdResponse {
  data?: ITFWoodStock[]
  summary?: ITFWoodStockSummary
}

export interface ITFWoodStockForPlan extends ITFWoodStock {}
