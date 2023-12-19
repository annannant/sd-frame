import { Link } from 'react-router-dom'

import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { TagStatus } from 'common/tag-status'

import { ITFTableProductionOrder } from 'types/production-order.type'

import { formatDate } from 'helper/date-formatter'
import { convertWoodLabel } from 'helper/wood'

const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'หมายเลขใบสั่งผลิต',
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
  {
    title: 'ไม้กรอบ',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: ITFTableProductionOrder, count: any) => {
      return <div>{convertWoodLabel(record?.wood ?? {})}</div>
    },
  },
  {
    title: 'วันที่สร้าง',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: ITFTableProductionOrder, count: any) => {
      if (!record?.updatedAt) {
        return <></>
      }
      return (
        <>
          <span className="mr-[6px]">{`${formatDate(record?.updatedAt).format(
            'DD MMM YYYY '
          )}`}</span>
          <span>{`${formatDate(record?.updatedAt).format('HH:mm')} น.`}</span>
        </>
      )
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    render: (text: any, record: ITFTableProductionOrder, count: any) => {
      return <TagStatus status={text} />
    },
  },
  {
    title: 'Action',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: ITFTableProductionOrder, count: any) => {
      return (
        <div className="flex justify-center">
          {record?.productionPlanId && (
            <Link to={`/production-plans/form/${record?.productionPlanId}`}>
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
          )}
        </div>
      )
    },
  },
]

export default columns
