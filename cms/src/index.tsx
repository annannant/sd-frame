import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import ErrorPage from './error-page';
import { ProductionOrdersList } from './components/production-orders/production-orders-list';
import MainLayout from './layouts/main-layout/main-layout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />
  },
  {
    path: "/production-orders",
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
    ]
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
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
