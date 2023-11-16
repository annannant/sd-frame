import { Link } from 'react-router-dom'

import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ButtionPrimaryInfo } from 'common/button/single-color-button'

import { ITFWoodType } from 'types/wood-type.type'

import { convertSizeSymbol } from 'helper/wood'

const columns: ColumnsType<ITFWoodType> = [
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
  },
  {
    title: 'ประเภท',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ชื่อไม้',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'จำนวนทั้งหมด',
    dataIndex: 'total_stock_qty',
    key: 'total_stock_qty',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodType, count: any) => {
      return convertSizeSymbol(text, record?.sizeUnit ?? '')
    },
  },
  {
    title: 'คงเหลือ',
    dataIndex: 'balance',
    key: 'balance',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodType, count: any) => {
      return convertSizeSymbol(text, record?.sizeUnit ?? '')
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodType, count: any) => {
      return (
        <div className="flex justify-center gap-x-4">
          <Link to={`/wood-types/edit/${record?.id}`}>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
            />
          </Link>
          <Link to={`/wood-types/${record?.id}/woods`}>
            <ButtionPrimaryInfo
              type="primary"
              shape="circle"
              icon={<FileSearchOutlined />}
              size="small"
              style={{
                padding: '1px 1px 1px 3px',
              }}
            />
          </Link>
        </div>
      )
    },
  },
]

export default columns
