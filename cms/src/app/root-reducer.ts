import woodReducer from './slice/master/wood'
import productionOrdersSelector from './slice/production-orders'

import { attributeApiSlice } from 'services/attribute'
import { productionOrderApiSlice } from 'services/production-order'
import { standardFrameApiSlice } from 'services/standard-frame'
import { woodApiSlice } from 'services/wood'
import { woodTypeApiSlice } from 'services/wood-type'

export const rootReducer = {
  wood: woodReducer,
  productionOrders: productionOrdersSelector,
  [woodApiSlice.reducerPath]: woodApiSlice.reducer,
  [standardFrameApiSlice.reducerPath]: standardFrameApiSlice.reducer,
  [productionOrderApiSlice.reducerPath]: productionOrderApiSlice.reducer,
  [woodTypeApiSlice.reducerPath]: woodTypeApiSlice.reducer,
  [attributeApiSlice.reducerPath]: attributeApiSlice.reducer,
}

export default rootReducer
