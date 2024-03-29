import { createBrowserRouter } from 'react-router-dom'

import ErrorPage from 'pages/error-page'
import { LoginPage } from 'pages/login/login'
import { ProductionFormInfoPage } from 'pages/production-forms/production-forms-info'
import { ProductionFormListPage } from 'pages/production-forms/production-forms-list'
import {
  ProductionOrdersInfoPage,
  createOrderLoader,
  editOrderLoader,
} from 'pages/production-orders/production-orders-info'
import { ProductionOrdersListPage } from 'pages/production-orders/production-orders-list'
import { ProductionOrdersPlanInfoPage } from 'pages/production-orders/production-orders-plan-info'
import { ProductionOrdersWaitingPage } from 'pages/production-orders/production-orders-waiting'
import { ProductionOrdersWaitingInfoPage } from 'pages/production-orders/production-orders-waiting-info'
import {
  ProductionPlansInfoPage,
  editPlanLoader,
} from 'pages/production-plans/production-plans-info'
import { ProductionPlansListPage } from 'pages/production-plans/production-plans-list'
import {
  StandardFrameStocksInfoPage,
  viewStandardFrameStocksInfoLoader,
} from 'pages/standard-frame-stocks/standard-frame-stocks-info'
import { StandardFrameStocksListPage } from 'pages/standard-frame-stocks/standard-frame-stocks-list'
import { StandardFramesListPage } from 'pages/standard-frames/standard-frames-list'
import { WoodStandardFrameStocksListPage } from 'pages/wood-standard-frame-stocks/wood-standard-frame-stocks-list'
import { WoodStocksImportPage } from 'pages/wood-stocks/wood-stocks-import'
import { WoodStocksImportConfirmPage } from 'pages/wood-stocks/wood-stocks-import-confirm'
import {
  WoodStocksInfoPage,
  viewWoodStocksInfoLoader,
} from 'pages/wood-stocks/wood-stocks-info'
import { WoodStocksListPage } from 'pages/wood-stocks/wood-stocks-list'
import { WoodStocksLocationsPage } from 'pages/wood-stocks/wood-stocks-location'
import {
  WoodTypesInfoPage,
  createWoodLoader,
  createWoodTypeLoader,
  editWoodLoader,
  editWoodTypeLoader,
} from 'pages/wood-types/wood-types-info'
import { WoodTypesListPage } from 'pages/wood-types/wood-types-list'
import { WoodTypesWoodInfoPage } from 'pages/wood-types/wood-types-wood-info'
import { WoodTypesWoodListPage } from 'pages/wood-types/wood-types-wood-list'

import AuthLayout from 'layouts/auth-layout/auth-layout'
import MainLayout from 'layouts/main-layout/main-layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        errorElement: <ErrorPage />,
      },
    ],
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
      {
        path: 'waiting',
        element: <ProductionOrdersWaitingPage />,
        errorElement: <ErrorPage />,
        loader: createOrderLoader,
      },
      {
        path: 'waiting/:orderId',
        element: <ProductionOrdersWaitingInfoPage />,
        errorElement: <ErrorPage />,
        loader: editOrderLoader,
      },
      {
        path: 'plan/:orderId',
        element: <ProductionOrdersPlanInfoPage />,
        errorElement: <ErrorPage />,
        loader: editOrderLoader,
      },
    ],
  },
  {
    path: '/wood',
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
        element: <WoodTypesListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'standard-frames/stocks',
        element: <WoodStandardFrameStocksListPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: '/wood-types',
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
        element: <WoodTypesListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: <WoodTypesInfoPage />,
        errorElement: <ErrorPage />,
        loader: createWoodTypeLoader,
      },
      {
        path: 'edit/:id',
        element: <WoodTypesInfoPage />,
        errorElement: <ErrorPage />,
        loader: editWoodTypeLoader,
      },
      {
        path: ':id/woods',
        element: <WoodTypesWoodListPage />,
        errorElement: <ErrorPage />,
        loader: editWoodTypeLoader,
      },
      {
        path: ':woodTypeId/woods/create',
        element: <WoodTypesWoodInfoPage />,
        errorElement: <ErrorPage />,
        loader: createWoodLoader,
      },
      {
        path: ':woodTypeId/woods/edit/:id',
        element: <WoodTypesWoodInfoPage />,
        errorElement: <ErrorPage />,
        loader: editWoodLoader,
      },
    ],
  },
  {
    path: '/wood-stocks',
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
        element: <WoodStocksListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'import',
        element: <WoodStocksImportPage />,
        errorElement: <ErrorPage />,
        loader: viewWoodStocksInfoLoader,
      },
      {
        path: 'import/confirm',
        element: <WoodStocksImportConfirmPage />,
        errorElement: <ErrorPage />,
        loader: viewWoodStocksInfoLoader,
      },
      {
        path: 'woods/:id/lot',
        element: <WoodStocksInfoPage />,
        errorElement: <ErrorPage />,
        loader: viewWoodStocksInfoLoader,
      },

      {
        path: 'woods/:id/locations',
        element: <WoodStocksLocationsPage />,
        errorElement: <ErrorPage />,
        loader: viewWoodStocksInfoLoader,
      },
    ],
  },
  {
    path: '/standard-frames',
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
        element: <StandardFramesListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'stocks',
        element: <StandardFrameStocksListPage />,
        errorElement: <ErrorPage />,
        loader: viewStandardFrameStocksInfoLoader,
      },
      {
        path: 'stocks/:id',
        element: <StandardFrameStocksInfoPage />,
        errorElement: <ErrorPage />,
        loader: viewStandardFrameStocksInfoLoader,
      },
    ],
  },
  {
    path: '/production-plans',
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
        element: <ProductionPlansListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'edit/:planId',
        element: <ProductionPlansInfoPage />,
        errorElement: <ErrorPage />,
        loader: editPlanLoader,
      },
      {
        path: 'edit/:planId/replan',
        element: <ProductionOrdersPlanInfoPage />,
        errorElement: <ErrorPage />,
        loader: editOrderLoader,
      },
      {
        path: 'form',
        element: <ProductionFormListPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'form/:planId',
        element: <ProductionFormInfoPage />,
        errorElement: <ErrorPage />,
        loader: editPlanLoader,
      },
    ],
  },
])

export default router
