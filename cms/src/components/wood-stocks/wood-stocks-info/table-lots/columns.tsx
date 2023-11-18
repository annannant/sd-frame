import { ColumnsType } from 'antd/es/table'

import { ITFWoodStock } from 'types/wood-stock.type'

import { formatDate } from 'helper/date-formatter'
import { currency } from 'helper/number'

const columns: ColumnsType<ITFWoodStock> = [
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
    width: '8%',
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
    render: (text: any, record: ITFWoodStock, count: any) => {
      return <div className="px-[20px]">{currency(text ?? 0)}</div>
    },
    width: '10%',
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
    render: (text: any, record: ITFWoodStock, count: any) => {
      return <div className="px-[20px]">{currency(text ?? 0)}</div>
    },
    width: '10%',
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
    render: (text: any, record: ITFWoodStock, count: any) => {
      return (
        <div className="px-[20px]">
          {currency((record?.totalStock ?? 0) - (record?.totalUsed ?? 0))}
        </div>
      )
    },
    width: '10%',
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
    render: (text: any, record: ITFWoodStock, count: any) => {
      return <div className="px-[20px]">เส้น</div>
    },
    width: '8%',
  },
  {
    title: 'หมายเหตุ',
    dataIndex: 'remark',
    key: 'remark',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'left' },
    }),
    ellipsis: true,
    render: (text: any, record: ITFWoodStock, count: any) => {
      return <div className="">{text}</div>
    },
    width: '20%',
  },

  {
    title: 'วันที่นำเข้าล่าสุด',
    dataIndex: 'importedAt',
    key: 'importedAt',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'left' },
    }),
    render: (text: any, record: ITFWoodStock, count: any) => {
      if (!record?.importedAt) {
        return <></>
      }
      return (
        <>
          <span className="mr-[6px]">{`${formatDate(record?.importedAt).format(
            'DD MMM YYYY '
          )}`}</span>
          <span>{`${formatDate(record?.importedAt).format('HH:mm')} น.`}</span>
        </>
      )
    },
    width: '15%',
  },
]

export default columns
