import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import { ConfigProvider, theme } from 'antd'

import { colors } from 'constants/colors'

import 'assets/styles/tailwind.css'

import 'assets/styles/styles.css'

import store from './app/store'
import './index.css'
import reportWebVitals from './reportWebVitals'
import router from './routes/routers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#4B49AC',
            borderRadius: 2,
            fontFamily: 'IBMPlexSansThai-Regular',
            // Alias Token
            // colorBgContainer: "#f6ffed",
          },
          components: {
            Menu: {
              algorithm: theme.darkAlgorithm,
              itemBorderRadius: 10,
              groupTitleColor: '#ffffff73',
            },
            Button: {
              colorBgBase: colors.primary,
              borderRadiusLG: 8,
              borderRadius: 8,
            },
            Form: {
              labelColor: colors.fontLabel,
            },
            Card: {
              borderRadiusLG: 15,
              borderRadius: 15,
            },
            Input: {
              borderRadiusLG: 10,
              borderRadius: 10,
            },
            Select: {
              borderRadiusLG: 10,
              borderRadius: 10,
              optionSelectedBg: colors.primary,
              optionSelectedColor: colors.white,
            },
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </React.StrictMode>
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
