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
    permission: [],
    items: [
      {
        key: '/production-orders/create',
        url: '/production-orders/create',
        label: 'สั่งผลิต',
        icon: <PlusOutlined />,
      },
      {
        key: '/production-orders',
        url: '/production-orders',
        label: 'รายการสั่งผลิต',
        icon: <FileTextOutlined />,
      },
    ],
  },
  {
    group: 'ตัดไม้',
    key: 'production',
    url: 'production',
    permission: [],
    items: [
      {
        key: '/production-orders/waiting',
        url: '/production-orders/waiting',
        label: 'รายการรอผลิต',
        icon: <ContainerOutlined />,
      },
      {
        key: '/production-plans',
        url: '/production-plans',
        label: 'รายการกำลังผลิต',
        icon: <FormOutlined />,
      },
    ],
  },
  {
    group: 'ประกอบกรอบรูป',
    key: 'form',
    url: 'form',
    permission: [],
    items: [
      {
        key: '/production-plans/form',
        url: '/production-plans/form',
        label: 'รอประกอบ',
        icon: <BlockOutlined />,
      },
    ],
  },
  {
    group: 'กรอบมาตรฐาน',
    key: 'standard-frame',
    url: 'standard-frame',
    permission: [],
    items: [
      {
        key: '/standard-frames',
        url: '/standard-frames',
        label: 'กรอบมาตรฐาน',
        icon: <AppstoreOutlined />,
      },
      {
        key: '/standard-frames/stocks',
        url: '/standard-frames/stocks',
        label: 'สต๊อก',
        icon: <CodeSandboxOutlined />,
      },
      // {
      //   key: '/standard-frames/stocks/woods',
      //   url: '/standard-frames/stocks/woods',
      //   label: 'สต๊อก by ไม้กรอบ',
      //   icon: <CodeSandboxOutlined />,
      // },
    ],
  },
  {
    group: 'ไม้กรอบ',
    key: 'woods',
    url: 'woods',
    permission: [],
    items: [
      {
        key: '/wood-types',
        url: '/wood-types',
        label: 'ประเภทไม้กรอบ',
        icon: <ProjectOutlined />,
      },
      {
        key: '/wood-stocks',
        url: '/wood-stocks',
        label: 'สต๊อกไม้กรอบ',
        icon: <CodeSandboxOutlined />,
      },
      {
        key: '/wood-stocks/import',
        url: '/wood-stocks/import',
        label: 'นำเข้าสต๊อกไม้กรอบ',
        icon: <PlusOutlined />,
      },
      // {
      //   key: '/wood/standard-frames/stocks',
      //   url: '/wood/standard-frames/stocks',
      //   label: 'กรอบมาตรฐาน',
      //   icon: <CodeSandboxOutlined />,
      // },
    ],
  },
]
