import { Outlet } from 'react-router-dom'

import { notification } from 'antd'

import Sidebar from '../sidebar/sidebar'
import { Content } from './auth-layout.styles'

import { Navbar } from 'layouts/navbar/navbar'

export const AuthLayout = () => {
  const [api, contextHolder] = notification.useNotification()

  return (
    <>
      {contextHolder}
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row">
          <Content className="flex-1">
            <Outlet />
          </Content>
        </div>
      </div>
    </>
  )
}

export default AuthLayout
