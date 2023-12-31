import woodReducer from './slice/master/wood'
import productionOrdersReducer from './slice/production-orders'
import standardFrameStockReducer from './slice/standard-frame-stocks'
import standardFrameReducer from './slice/standard-frames'
import woodStockReducer from './slice/wood-stocks'

import { attributeApiSlice } from 'services/attribute'
import { locationApiSlice } from 'services/location'
import { productionOrderApiSlice } from 'services/production-order'
import { productionPlanApiSlice } from 'services/production-plan'
import { standardFrameApiSlice } from 'services/standard-frame'
import { standardFrameStockApiSlice } from 'services/standard-frame-stock'
import { woodApiSlice } from 'services/wood'
import { woodStockApiSlice } from 'services/wood-stock'
import { woodStockLocationApiSlice } from 'services/wood-stock-location'
import { woodTypeApiSlice } from 'services/wood-type'

export const rootReducer = {
  wood: woodReducer,
  productionOrders: productionOrdersReducer,
  woodStock: woodStockReducer,
  standardFrame: standardFrameReducer,
  standardFrameStock: standardFrameStockReducer,
  [woodApiSlice.reducerPath]: woodApiSlice.reducer,
  [standardFrameApiSlice.reducerPath]: standardFrameApiSlice.reducer,
  [productionOrderApiSlice.reducerPath]: productionOrderApiSlice.reducer,
  [woodTypeApiSlice.reducerPath]: woodTypeApiSlice.reducer,
  [attributeApiSlice.reducerPath]: attributeApiSlice.reducer,
  [woodStockApiSlice.reducerPath]: woodStockApiSlice.reducer,
  [woodStockLocationApiSlice.reducerPath]: woodStockLocationApiSlice.reducer,
  [standardFrameStockApiSlice.reducerPath]: standardFrameStockApiSlice.reducer,
  [productionPlanApiSlice.reducerPath]: productionPlanApiSlice.reducer,
  [locationApiSlice.reducerPath]: locationApiSlice.reducer,
}

export default rootReducer
