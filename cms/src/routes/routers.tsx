import { createBrowserRouter } from 'react-router-dom'

import { ProductionOrdersList } from 'components/production-orders/production-orders-list'
import MainLayout from 'layouts/main-layout/main-layout'
import ErrorPage from 'pages/error-page'

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
    children: [
      { index: true, element: <ProductionOrdersList /> },
      // {
      //   path: "/",
      //   element: <ProductionOrders />,
      //   errorElement: <ErrorPage />
      // },
      // {
      //   path: "/create",
      //   element: <ProductionOrdersCreate />,
      //   errorElement: <ErrorPage />
      // },
      // {
      //   path: "/:id",
      //   element: <ProductionOrdersEdit />,
      //   errorElement: <ErrorPage />
      // },
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
