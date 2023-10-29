import woodReducer from './slice/master/wood'
import productionOrdersSelector from './slice/production-orders'
import standardSizeSelector from './slice/standard-size'

import { woodApiSlice } from 'services/wood'

export const rootReducer = {
  wood: woodReducer,

  productionOrders: productionOrdersSelector,
  standardSize: standardSizeSelector,
  standardFrame: standardSizeSelector,
  [woodApiSlice.reducerPath]: woodApiSlice.reducer,
}

export default rootReducer
