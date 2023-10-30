import woodReducer from './slice/master/wood'
import productionOrdersSelector from './slice/production-orders'

import { standardFrameApiSlice } from 'services/standard-frame'
import { woodApiSlice } from 'services/wood'

export const rootReducer = {
  wood: woodReducer,

  productionOrders: productionOrdersSelector,
  [woodApiSlice.reducerPath]: woodApiSlice.reducer,
  [standardFrameApiSlice.reducerPath]: standardFrameApiSlice.reducer,
}

export default rootReducer
