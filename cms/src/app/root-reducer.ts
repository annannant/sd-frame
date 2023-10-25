import productionOrdersSelector from './slice/production-orders'
import standardSizeSelector from './slice/standard-size'

export const rootReducer = {
  productionOrders: productionOrdersSelector,
  standardSize: standardSizeSelector,
}

export default rootReducer
