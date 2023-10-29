import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Sidebar from '../sidebar/sidebar'
import { Content } from './main-layout.styles'

import { fetchAllWood } from 'app/slice/master/wood'
import { setList } from 'app/slice/standard-size'
import { useAppDispatch } from 'app/store'
import standardList from 'data/standard-list'
import { Navbar } from 'layouts/navbar/navbar'
import { useGetAllWoodsQuery } from 'services/wood'

export const MainLayout = () => {
  const { data } = useGetAllWoodsQuery()

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
