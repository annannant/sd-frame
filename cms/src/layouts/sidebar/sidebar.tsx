import React, { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Menu } from 'antd'

import { menus } from './menus'
import { Container } from './sidebar.styles'
import { ITFSidebarItem } from './sidebar.type'

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

// const items: MenuItem[] = [
//   getItem('การผลิต', 'grp1', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),

//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),

//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),

//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),

//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
//   getItem('Group', 'grp2', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
// ];

const transformMenu = (menus: ITFSidebarItem[], collapsed: boolean) => {
  return menus.map((menu, pindex) => {
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

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const items2 = useMemo(() => transformMenu(menus, collapsed), [collapsed])

  return (
    <Container className={`shadow-sm`}>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16 }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['list-orders']}
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
