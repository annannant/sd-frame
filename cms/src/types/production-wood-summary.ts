import { ITFLocation } from './location.type'

export interface ITFProductionWoodSummary {
  id: number
  productionPlanID?: number | null
  woodType?: string | null
  woodItemStockID?: number | null
  length?: string | null
  unit?: number | null
  totalQty?: number | null
  totalWithdraw?: number | null
  woodID?: number | null
  lot?: number | null
  locationID?: number | null
  location?: ITFLocation
}
