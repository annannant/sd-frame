import { ColumnsType } from 'antd/es/table'

import { ITFWoodStockWood } from 'types/wood-stock.type'

import { currency } from 'helper/number'

const columns: ColumnsType<ITFWoodStockWood> = [
  {
    title: 'Lot',
    dataIndex: 'lot',
    key: 'lot',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '25%',
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
      return <div className="px-[20px]">{currency(text ?? 0)}</div>
    },
    width: '20%',
  },
  {
    title: 'จำนวนที่ใช้',
    dataIndex: 'totalUsed',
    key: 'totalUsed',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return <div className="px-[20px]">{currency(text ?? 0)}</div>
    },
    width: '20%',
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
      return (
        <div className="px-[20px]">
          {currency((record?.totalStock ?? 0) - (record?.totalUsed ?? 0))}
        </div>
      )
    },
    width: '20%',
  },

  {
    title: 'หน่วย',
    dataIndex: 'unit',
    key: 'unit',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockWood, count: any) => {
      return <div className="px-[20px]">เส้น</div>
    },
    width: '15%',
  },
]

export default columns
