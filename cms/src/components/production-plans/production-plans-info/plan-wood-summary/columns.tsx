import { Link } from 'react-router-dom'

import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { TagStatus } from 'common/tag-status'

import { ITFTableProductionWoodSummary } from 'types/production-wood-summary'

import { formatDate } from 'helper/date-formatter'
import { convertLocationLabel } from 'helper/location'
import { currency, parser } from 'helper/number'
import { convertWoodLabel } from 'helper/wood'

const columns: ColumnsType<ITFTableProductionWoodSummary> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'ไม้',
    dataIndex: 'woodType',
    key: 'woodType',
    render: (text: any, record: ITFTableProductionWoodSummary, count: any) => {
      // const length = record?.wood?.woodType?.length ?? 0
      return (
        <div>
          {record.woodType === 'part' ? (
            <span>ไม้ในสต๊อก</span>
          ) : (
            <span>ไม้เส้นยาว</span>
          )}
        </div>
      )
    },
  },
  {
    title: 'ความยาว',
    dataIndex: 'length',
    key: 'length',
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (text: any, record: ITFTableProductionWoodSummary, count: any) => {
      return <div>{currency(text ?? 0)} "</div>
    },
  },
  {
    title: 'เบิกแล้ว / ที่ต้องใช้',
    dataIndex: 'totalQty',
    key: 'totalQty',
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    width: 140,
    render: (text: any, record: ITFTableProductionWoodSummary, count: any) => {
      return (
        <div>
          <span className="text-primary">
            {currency(record.totalWithdraw ?? 0)}
          </span>{' '}
          / {currency(record.totalQty ?? 0)}
        </div>
      )
    },
  },
  {
    title: 'หน่วย',
    dataIndex: 'unit',
    key: 'unit',
    render: (text: any, record: ITFTableProductionWoodSummary, count: any) => {
      return (
        <div>
          {record.woodType === 'part' ? <span>ชิ้น</span> : <span>เส้น</span>}
        </div>
      )
    },
    align: 'center',
  },

  // {
  //   title: 'Lot',
  //   dataIndex: 'lot',
  //   key: 'lot',
  //   onCell: () => ({
  //     style: { textAlign: 'center' },
  //   }),
  // },
  {
    title: 'ตำแหน่งที่ตั้ง',
    dataIndex: 'location',
    key: 'location',
    render: (text: any, record: ITFTableProductionWoodSummary, count: any) => {
      return (
        <div>{record?.location && convertLocationLabel(record?.location)}</div>
      )
    },
  },
]

export default columns
