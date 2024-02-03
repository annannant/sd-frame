import {
  AppstoreOutlined,
  BlockOutlined,
  CodeSandboxOutlined,
  ContainerOutlined,
  FileTextOutlined,
  FormOutlined,
  PlusOutlined,
  ProjectOutlined,
} from '@ant-design/icons'

import { ITFSidebarItem } from './sidebar.type'

export const menus: ITFSidebarItem[] = [
  {
    group: 'การผลิต',
    key: 'orders',
    url: 'orders',
    permission: ['admin', 'salesman', 'warehouse'],
    items: [
      {
        key: '/production-orders/create',
        url: '/production-orders/create',
        permission: ['admin', 'salesman', 'warehouse'],
        label: 'สั่งผลิต',
        icon: <PlusOutlined />,
      },
      {
        key: '/production-orders',
        url: '/production-orders',
        permission: ['admin', 'salesman', 'warehouse'],
        label: 'รายการสั่งผลิต',
        icon: <FileTextOutlined />,
      },
    ],
  },
  {
    group: 'ตัดไม้',
    key: 'production',
    url: 'production',
    permission: ['admin', 'production'],
    items: [
      {
        key: '/production-orders/waiting',
        url: '/production-orders/waiting',
        permission: ['admin', 'production'],
        label: 'รายการรอผลิต',
        icon: <ContainerOutlined />,
      },
      {
        key: '/production-plans',
        url: '/production-plans',
        permission: ['admin', 'production'],
        label: 'รายการกำลังผลิต',
        icon: <FormOutlined />,
      },
    ],
  },
  {
    group: 'ประกอบกรอบรูป',
    key: 'form',
    url: 'form',
    permission: ['admin', 'production'],
    items: [
      {
        key: '/production-plans/form',
        url: '/production-plans/form',
        permission: ['admin', 'production'],
        label: 'รอประกอบ',
        icon: <BlockOutlined />,
      },
    ],
  },
  {
    group: 'กรอบมาตรฐาน',
    key: 'standard-frame',
    url: 'standard-frame',
    permission: ['admin', 'warehouse'],
    items: [
      {
        key: '/standard-frames',
        url: '/standard-frames',
        permission: ['admin', 'warehouse'],
        label: 'กรอบมาตรฐาน',
        icon: <AppstoreOutlined />,
      },
      {
        key: '/standard-frames/stocks',
        url: '/standard-frames/stocks',
        permission: ['admin', 'warehouse'],
        label: 'สต๊อก',
        icon: <CodeSandboxOutlined />,
      },
      // {
      //   key: '/standard-frames/stocks/woods',
      //   url: '/standard-frames/stocks/woods',
      // permission: ['admin', 'salesman'],
      //   label: 'สต๊อก by ไม้กรอบ',
      //   icon: <CodeSandboxOutlined />,
      // },
    ],
  },
  {
    group: 'ไม้กรอบ',
    key: 'woods',
    url: 'woods',
    permission: ['admin', 'production'],
    items: [
      {
        key: '/wood-types',
        url: '/wood-types',
        permission: ['admin', 'production'],
        label: 'ประเภทไม้กรอบ',
        icon: <ProjectOutlined />,
      },
      {
        key: '/wood-stocks',
        url: '/wood-stocks',
        permission: ['admin', 'production'],
        label: 'สต๊อกไม้กรอบ',
        icon: <CodeSandboxOutlined />,
      },
      {
        key: '/wood-stocks/import',
        url: '/wood-stocks/import',
        permission: ['admin', 'production'],
        label: 'นำเข้าสต๊อกไม้กรอบ',
        icon: <PlusOutlined />,
      },
      // {
      //   key: '/wood/standard-frames/stocks',
      //   url: '/wood/standard-frames/stocks',
      // permission: ['admin', 'salesman'],
      //   label: 'กรอบมาตรฐาน',
      //   icon: <CodeSandboxOutlined />,
      // },
    ],
  },
]
