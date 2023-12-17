import { Link } from 'react-router-dom'

import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ButtonPrimaryInfo } from 'common/button/single-color-button'

import { ITFTableProductionOrderItem } from 'types/production-order-items.type'
import { ITFWood } from 'types/wood.type'

const columns: ColumnsType<ITFTableProductionOrderItem> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ขนาดกรอบรูป',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ชิ้นส่วนไม้ กว้าง (นิ้ว)',
    dataIndex: 'w',
    key: 'w',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ชิ้นส่วนไม้  สูง (นิ้ว)',
    dataIndex: 'h',
    key: 'h',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'จำนวน',
    dataIndex: 'qty',
    key: 'qty',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFTableProductionOrderItem, count: any) => {
      return <div>{text * 2}</div>
    },
  },
]

export default columns
