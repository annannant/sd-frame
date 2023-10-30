import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from 'pages/error-page'
import {
  ProductionOrdersInfoPage,
  createOrderLoader,
  editOrderLoader,
} from 'pages/production-orders/production-orders-info'
import { ProductionOrdersListPage } from 'pages/production-orders/production-orders-list'

import MainLayout from 'layouts/main-layout/main-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/production-orders',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    loader: () => {
      console.log('loader')
      return {
        data: 'loader',
      }
    },
    action: () => {
      console.log('action')
      return {
        data: 'action',
      }
    },
    children: [
      {
        index: true,
        element: <ProductionOrdersListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: <ProductionOrdersInfoPage />,
        errorElement: <ErrorPage />,
        loader: createOrderLoader,
      },
      {
        path: 'edit/:orderId',
        element: <ProductionOrdersInfoPage />,
        errorElement: <ErrorPage />,
        loader: editOrderLoader,
      },
    ],
  },
  // {
  //   path: "/production-orders/create",
  //   element: <ProductionOrders />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: "/production-orders/create",
  //   element: <ProductionOrdersCreate />,
  //   errorElement: <ErrorPage />
  // },
  // {
  //   path: "/production-orders",
  //   element: <ProductionOrdersEdit />,
  //   errorElement: <ErrorPage />
  // },
])

export default router
