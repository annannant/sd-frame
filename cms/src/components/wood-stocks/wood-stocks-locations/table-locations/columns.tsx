import { ColumnsType } from 'antd/es/table'

import { ITFWoodStockLocation } from 'types/wood-stock-location.type'

const columns: ColumnsType<ITFWoodStockLocation> = [
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
  },
  {
    title: 'คงเหลือ',
    dataIndex: 'remaining',
    key: 'remaining',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFWoodStockLocation, count: any) => {
      return <div className="px-[20px]">{text ?? 0}</div>
    },
    width: '30%',
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
    render: (text: any, record: ITFWoodStockLocation, count: any) => {
      return <div className="px-[20px]">เส้น</div>
    },
    width: '20%',
  },
]

export default columns
