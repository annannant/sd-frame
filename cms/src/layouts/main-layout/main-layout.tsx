import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'

import Sidebar from '../sidebar/sidebar'
import { Content } from './main-layout.styles'

import { setList } from 'app/slice/standard-size'
import standardList from 'data/standard-list'
import { Navbar } from 'layouts/navbar/navbar'

export const MainLayout = () => {
  // load master data
  const dispatch = useDispatch()

  const fetchStandardSizeList = async () => {
    dispatch(setList(standardList))
  }

  useEffect(() => {
    fetchStandardSizeList()
  })

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
