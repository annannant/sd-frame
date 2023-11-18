import { Link } from 'react-router-dom'

import {
  EditOutlined,
  EnvironmentOutlined,
  FileSearchOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ButtonPrimaryInfo } from 'common/button/single-color-button'

import { ITFWoodStockWood } from 'types/wood-stock.type'

import { currency } from 'helper/number'
import { convertSizeSymbol } from 'helper/wood'

const columns: ColumnsType<ITFWoodStockWood> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'รหัสไม้',
    dataIndex: 'code',
    key: 'code',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '12%',
  },
  {
    title: 'ชื่อไม้',
    dataIndex: 'description',
    key: 'description',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return `${record.name} - ${text}`
    },
  },
  {
    title: 'จำนวนทั้งหมด',
    dataIndex: 'totalStock',
    key: 'totalStock',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return `${currency(text ?? 0)}`
    },
    width: '12%',
  },
  {
    title: 'จำนวนที่ใช้ไป',
    dataIndex: 'totalUsed',
    key: 'totalUsed',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return `${currency(text ?? 0)}`
    },
    width: '12%',
  },
  {
    title: 'คงเหลือ',
    dataIndex: 'balance',
    key: 'balance',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return `${currency((record?.totalStock ?? 0) - (record?.totalUsed ?? 0))}`
    },
    width: '12%',
  },
  {
    title: 'หน่วย',
    dataIndex: 'balance',
    key: 'balance',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return 'เส้น'
    },
    width: '5%',
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '12%',
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return (
        <div className="flex justify-center gap-x-4">
          <Link to={`/wood-stocks/woods/${record?.id}/lot`}>
            <ButtonPrimaryInfo
              type="primary"
              shape="circle"
              icon={<FileSearchOutlined />}
              size="small"
              style={{
                padding: '1px 1px 1px 3px',
              }}
              title="lot"
            />
          </Link>
          <Link to={`/wood-stocks/woods/${record?.id}/locations`}>
            <Button
              type="primary"
              shape="circle"
              icon={<EnvironmentOutlined />}
              size="small"
              style={{
                padding: '1px 1px 1px 1px',
              }}
            />
          </Link>
        </div>
      )
    },
  },
]

export default columns
