import { Link } from 'react-router-dom'

import { FileSearchOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import { ITFTableStandardFrameStock } from 'types/standard-frame-stock.type'

import { currency } from 'helper/number'

const columns: ColumnsType<ITFTableStandardFrameStock> = [
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
    width: '5%',
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
    width: '12%',
    render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
      return record?.standardFrame?.name
    },
    sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
      (a?.standardFrame?.name ?? '').localeCompare(
        b?.standardFrame?.name ?? ''
      ),
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
    width: '15%',
    render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
      return `${currency(record?.standardFrame?.width ?? 0)} x ${currency(
        record?.standardFrame?.height ?? 0
      )} นิ้ว`
    },
    sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
      (a?.standardFrame?.width ?? 0) - (b?.standardFrame?.width ?? 0),
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
    width: '5%',
    render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
      return text === false ? (
        <Tag color="red">ปิดใช้งาน</Tag>
      ) : (
        <Tag color="green">เปิดใช้งาน</Tag>
      )
    },
    sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
      (a?.standardFrame?.isActive ? 1 : 0) -
      (b?.standardFrame?.isActive ? 1 : 0),
  },
  {
    title: 'สต๊อก',
    dataIndex: 'stock',
    key: 'stock',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '12%',
    render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
      return (
        <div
          className="px-[20px]"
          style={{
            color:
              (record?.stock ?? 0) < (record?.reorderPoint ?? 0)
                ? colors.danger
                : undefined,
          }}
        >
          {currency(record?.stock ?? 0)}
        </div>
      )
    },
    sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
      (a?.stock ?? 0) - (b?.stock ?? 0),
  },
  {
    title: 'จุดสั่งผลิต (Reorder Point)',
    dataIndex: 'reorderPoint',
    key: 'reorderPoint',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '15%',
    render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
      return `${currency(record?.reorderPoint ?? 0)}`
    },
    sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
      (a?.reorderPoint ?? 0) - (b?.reorderPoint ?? 0),
  },
  {
    title: 'จำนวนที่ต้องสั่งผลิต',
    dataIndex: 'reorderPoint',
    key: 'reorderPoint',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '15%',
    render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
      const reorder = (record?.reorderPoint ?? 0) - (record?.stock ?? 0)
      return reorder > 0 ? `${currency(reorder)}` : ''
    },
    sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) => {
      const reorderA = (a?.reorderPoint ?? 0) - (a?.stock ?? 0)
      const reorderB = (b?.reorderPoint ?? 0) - (b?.stock ?? 0)
      return reorderA - reorderB
    },
  },
]

export default columns
