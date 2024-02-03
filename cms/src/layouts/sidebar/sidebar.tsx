import React, { useMemo, useState } from 'react'
import { useCookies } from 'react-cookie'
import { NavLink, useLocation } from 'react-router-dom'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'

import { menus } from './menus'
import { Container } from './sidebar.styles'
import { ITFSidebarItem } from './sidebar.type'

import { keyBy } from 'lodash'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

export const Sidebar = () => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)
  const [cookies] = useCookies(['user'])

  const selectedKeys = useMemo(() => {
    const items = keyBy(menus.map((menu) => menu.items).flat(), 'key')
    const pathList = location.pathname.split('/')
    const path3 = pathList.slice(0, 3).join('/')
    switch (path3) {
      case '/production-orders/plan':
      case '/production-orders/waiting':
        return ['/production-orders/waiting']
      default:
        break
    }

    if (items[location.pathname]) {
      return [location.pathname]
    }

    for (let index = pathList.length; index > 0; index--) {
      const path = pathList.slice(0, index).join('/')
      if (items[path]) {
        return [path]
      }
    }

    return [location.pathname]
  }, [location.pathname])

  const transformMenu = (menus: ITFSidebarItem[], collapsed: boolean) => {
    const items = menus.filter((menu, pindex) => {
      return menu.permission?.includes(cookies.user.data.role)
    })

    return items.map((menu, pindex) => {
      const items = menu.items?.map((item, index: number) => {
        const label = item.url ? (
          <NavLink
            to={item.url}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            {item.label}
          </NavLink>
        ) : (
          item.label
        )
        return getItem(label, item.key, item.icon, item.children, item.type)
      })

      return getItem(
        menu.group,
        menu.key,
        collapsed ? menu.items?.[0]?.icon : null,
        items
      )
    })
  }

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const items2 = useMemo(() => transformMenu(menus, collapsed), [collapsed])

  return (
    <Container className={`shadow-sm`}>
      <Button
        type="text"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? (
          <MenuUnfoldOutlined className="text-white" />
        ) : (
          <MenuFoldOutlined className="text-white" />
        )}
      </Button>
      <Menu
        defaultSelectedKeys={['list-orders']}
        selectedKeys={selectedKeys}
        defaultOpenKeys={menus.map((item) => item.key.toString())}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items2}
        className={`${collapsed ? '' : 'w-[220px]'}`}
      />
    </Container>
  )
}

export default Sidebar
