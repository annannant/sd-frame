import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import router from './routes/routers'
import { ConfigProvider, theme } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
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
            itemBorderRadius: 10,
            groupTitleColor: '#ffffff73',
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
