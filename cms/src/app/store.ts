import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch } from 'react-redux'

import rootReducer from './root-reducer'

import { attributeApiSlice } from 'services/attribute'
import { productionOrderApiSlice } from 'services/production-order'
import { standardFrameApiSlice } from 'services/standard-frame'
import { woodApiSlice } from 'services/wood'
import { woodStockApiSlice } from 'services/wood-stock'
import { woodStockLocationApiSlice } from 'services/wood-stock-location'
import { woodTypeApiSlice } from 'services/wood-type'

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(woodApiSlice.middleware)
      .concat(productionOrderApiSlice.middleware)
      .concat(standardFrameApiSlice.middleware)
      .concat(attributeApiSlice.middleware)
      .concat(woodStockApiSlice.middleware)
      .concat(woodStockLocationApiSlice.middleware)
      .concat(woodTypeApiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()

export const appSelector = (store: RootState) => store

export default store
// // import { composeWithDevTools } from 'redux-devtools-extension'
// // import thunkMiddleware from 'redux-thunk'

// // import monitorReducersEnhancer from './enhancers/monitorReducers'
// // import loggerMiddleware from './middleware/logger'
// // import rootReducer from './reducers'

// // import { applyMiddleware, createStore } from 'redux'

// // export default function configureStore(preloadedState) {
// //   const middlewares = [loggerMiddleware, thunkMiddleware]
// //   const middlewareEnhancer = applyMiddleware(...middlewares)

// //   const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
// //   const composedEnhancers = composeWithDevTools(...enhancers)

// //   const store = createStore(rootReducer, preloadedState, composedEnhancers)

// //   if (process.env.NODE_ENV !== 'production' && module.hot) {
// //     module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
// //   }

// //   return store
// // }
