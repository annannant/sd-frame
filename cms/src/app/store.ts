import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './root-reducer'

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
})
export type RootState = ReturnType<typeof store.getState>

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
