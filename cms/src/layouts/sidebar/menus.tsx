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
        key: 'list-orders',
        url: '/production-orders',
        label: 'รายการสั่งผลิต',
        icon: <FileTextOutlined />,
      },
      {
        key: 'create-order',
        url: '/production-orders/create',
        label: 'สั่งผลิต',
        icon: <PlusOutlined />,
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
        key: 'production-inprogress',
        url: 'production-inprogress',
        label: 'รายการกำลังผลิต',
        icon: <FormOutlined />,
      },
      {
        key: 'production-waiting',
        url: 'production-waiting',
        label: 'รายการรอผลิต',
        icon: <ContainerOutlined />,
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
        key: 'wood-info',
        url: 'wood-info',
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
