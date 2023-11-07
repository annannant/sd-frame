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
    key: 'ิform',
    url: 'ิform',
    permission: [],
    items: [
      {
        key: 'form-list',
        url: 'form-list',
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
        key: 'standard-frame-info',
        url: 'standard-frame-info',
        label: 'ข้อมูลกรอบ',
        icon: <AppstoreOutlined />,
      },
      {
        key: 'standard-frame-stock',
        url: 'standard-frame-stock',
        label: 'สต๊อก',
        icon: <CodeSandboxOutlined />,
      },
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
        label: 'ข้อมูลไม้กรอบ',
        icon: <ProjectOutlined />,
      },
      {
        key: 'wood-stock',
        url: 'wood-stock',
        label: 'สต๊อก',
        icon: <CodeSandboxOutlined />,
      },
      {
        key: 'wood-import',
        url: 'wood-import',
        label: 'นำเช้าสต๊อก',
        icon: <PlusOutlined />,
      },
    ],
  },
]
