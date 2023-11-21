import { Link } from 'react-router-dom'

import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { TagStatus } from 'common/tag-status'

import { ITFTableProductionOrderPlanSummaryWood } from 'types/production-order-plan'

import { formatDate } from 'helper/date-formatter'
import { convertLocationLabel } from 'helper/location'
import { currency } from 'helper/number'
import { convertWoodLabel } from 'helper/wood'

const columns: ColumnsType<ITFTableProductionOrderPlanSummaryWood> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'ไม้',
    dataIndex: 'woodType',
    key: 'woodType',
    render: (
      text: any,
      record: ITFTableProductionOrderPlanSummaryWood,
      count: any
    ) => {
      return (
        <div>
          {record.woodFromStock ? (
            <span>ไม้ในสต๊อก</span>
          ) : (
            <span>
              ไม้เส้น เต็มขนาด{' '}
              {record?.isOutStock && (
                <Tag color="error" style={{ marginLeft: 5 }}>
                  Out of stock
                </Tag>
              )}
            </span>
          )}
        </div>
      )
    },
  },
  {
    title: 'ความยาว',
    dataIndex: 'woodLength',
    key: 'woodLength',
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (
      text: any,
      record: ITFTableProductionOrderPlanSummaryWood,
      count: any
    ) => {
      return <div>{currency(text ?? 0)} "</div>
    },
  },
  {
    title: 'จำนวน',
    dataIndex: 'usedQty',
    key: 'usedQty',
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    render: (
      text: any,
      record: ITFTableProductionOrderPlanSummaryWood,
      count: any
    ) => {
      return <div>{currency(text ?? 0)}</div>
    },
  },
  {
    title: 'หน่วย',
    dataIndex: 'unit',
    key: 'unit',
    render: (
      text: any,
      record: ITFTableProductionOrderPlanSummaryWood,
      count: any
    ) => {
      return <div>เส้น</div>
    },
  },

  {
    title: 'Lot',
    dataIndex: 'lot',
    key: 'lot',
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ตำแหน่งที่ตั้ง',
    dataIndex: 'location',
    key: 'location',
    render: (
      text: any,
      record: ITFTableProductionOrderPlanSummaryWood,
      count: any
    ) => {
      return (
        <div>{record?.location && convertLocationLabel(record?.location)}</div>
      )
    },
  },
]

export default columns
