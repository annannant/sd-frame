import { Outlet } from 'react-router-dom'
import { Content } from './main-layout.styles'
import Sidebar from '../sidebar/sidebar'
import { Navbar } from 'layouts/navbar/navbar'

export const MainLayout = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <Sidebar />
        <Content className="flex-1">
          <Outlet />
        </Content>
      </div>
    </div>
  )
}

export default MainLayout
