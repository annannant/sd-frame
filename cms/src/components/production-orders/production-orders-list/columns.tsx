import { Link } from 'react-router-dom'

import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { TagStatus } from 'common/tag-status'

import { ITFTableProductionOrder } from 'types/production-order.type'

import { formatDate } from 'helper/date-formatter'

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
      return (
        <div>{`${record?.wood?.name ?? ''} - ${
          record?.wood?.description ?? ''
        }`}</div>
      )
    },
  },
  {
    title: 'วันที่สั่งผลิต',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: ITFTableProductionOrder, count: any) => {
      if (!record?.createdAt) {
        return <></>
      }
      return (
        <>
          <span className="mr-[6px]">{`${formatDate(record?.createdAt).format(
            'DD MMM YYYY '
          )}`}</span>
          <span>{`${formatDate(record?.createdAt).format('HH:mm')} น.`}</span>
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
          <Link to={`/production-orders/edit/${record?.id}`}>
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
