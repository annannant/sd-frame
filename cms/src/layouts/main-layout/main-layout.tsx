import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet, useNavigate } from 'react-router-dom'

import { notification } from 'antd'

import Sidebar from '../sidebar/sidebar'
import { Content } from './main-layout.styles'

import { Navbar } from 'layouts/navbar/navbar'

export const MainLayout = () => {
  const navigate = useNavigate()

  const [api, contextHolder] = notification.useNotification()
  const [cookies, setCookie] = useCookies(['user'])

  useEffect(() => {
    if (!cookies?.user) {
      navigate('/login')
    }
  }, [cookies])

  return (
    <>
      {contextHolder}
      <div className="flex flex-col">
        <Navbar />
        <div className="flex flex-row">
          <Sidebar />
          <Content className="flex-1">
            <Outlet />
          </Content>
        </div>
      </div>
    </>
  )
}

export default MainLayout
