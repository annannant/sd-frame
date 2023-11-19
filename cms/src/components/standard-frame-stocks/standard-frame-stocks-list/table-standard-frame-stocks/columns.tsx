import { Link } from 'react-router-dom'

import { FileSearchOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ITFTableStandardFrameStockByStdFrame } from 'types/standard-frame-stock.type'

import { currency } from 'helper/number'

const columns: ColumnsType<ITFTableStandardFrameStockByStdFrame> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '10%',
  },
  {
    title: 'ชื่อ',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '15%',
    sorter: (
      a: ITFTableStandardFrameStockByStdFrame,
      b: ITFTableStandardFrameStockByStdFrame
    ) => (a?.name ?? '').localeCompare(b?.name ?? ''),
  },
  {
    title: 'ขนาด',
    dataIndex: 'width',
    key: 'width',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '18%',
    render: (
      text: any,
      record: ITFTableStandardFrameStockByStdFrame,
      count: any
    ) => {
      return `${currency(record?.width ?? 0)} x ${currency(
        record?.height ?? 0
      )} นิ้ว`
    },
    sorter: (
      a: ITFTableStandardFrameStockByStdFrame,
      b: ITFTableStandardFrameStockByStdFrame
    ) => (a?.width ?? 0) - (b?.width ?? 0),
  },

  {
    title: 'สถานะ',
    dataIndex: 'isActive',
    key: 'isActive',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '10%',
    render: (
      text: any,
      record: ITFTableStandardFrameStockByStdFrame,
      count: any
    ) => {
      return text === false ? <Tag color="red">ปิดใช้งาน</Tag> : ''
    },
    sorter: (
      a: ITFTableStandardFrameStockByStdFrame,
      b: ITFTableStandardFrameStockByStdFrame
    ) => (a?.isActive ? 1 : 0) - (b?.isActive ? 1 : 0),
  },

  {
    title: 'สต๊อกทั้งหมด',
    dataIndex: 'totalStock',
    key: 'totalStock',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '18%',
    render: (
      text: any,
      record: ITFTableStandardFrameStockByStdFrame,
      count: any
    ) => {
      return `${currency(record?.totalStock ?? 0)}`
    },
    sorter: (
      a: ITFTableStandardFrameStockByStdFrame,
      b: ITFTableStandardFrameStockByStdFrame
    ) => (a?.width ?? 0) - (b?.width ?? 0),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: '10%',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (
      text: any,
      record: ITFTableStandardFrameStockByStdFrame,
      count: any
    ) => {
      return (
        <div className="flex justify-center gap-x-4">
          <Link to={`/standard-frames/stocks/${record?.id}`}>
            <Button
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
