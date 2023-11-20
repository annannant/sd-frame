import { Link } from 'react-router-dom'

import { DeleteOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'

import { TagStatus } from 'common/tag-status'

import { ITFTableProductionOrderWood } from 'types/production-order-plan'

import { formatDate } from 'helper/date-formatter'
import { convertLocationLabel } from 'helper/location'
import { currency } from 'helper/number'
import { convertWoodLabel } from 'helper/wood'

const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'ไม้',
    dataIndex: 'woodType',
    key: 'woodType',
  },
  {
    title: 'ความยาว',
    dataIndex: 'length',
    key: 'length',
    render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
      return <div>{currency(text ?? 0)}</div>
    },
  },
  {
    title: 'จำนวน',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: 'หน่วย',
    dataIndex: 'unit',
    key: 'unit',
    render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
      return <div>เส้น</div>
    },
  },
  {
    title: 'ตำแหน่งที่ตั้ง',
    dataIndex: 'location',
    key: 'location',
    render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
      return <div>{convertLocationLabel(record?.location)}</div>
    },
  },
  // {
  //   title: '',
  //   dataIndex: 'address',
  //   key: 'address',
  //   render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
  //     return <div>{convertWoodLabel(record?.wood ?? {})}</div>
  //   },
  // },
  // {
  //   title: 'วันที่สั่งผลิต',
  //   dataIndex: 'address',
  //   key: 'address',
  //   render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
  //     if (!record?.createdAt) {
  //       return <></>
  //     }
  //     return (
  //       <>
  //         <span className="mr-[6px]">{`${formatDate(record?.createdAt).format(
  //           'DD MMM YYYY '
  //         )}`}</span>
  //         <span>{`${formatDate(record?.createdAt).format('HH:mm')} น.`}</span>
  //       </>
  //     )
  //   },
  // },
  // {
  //   title: 'สถานะ',
  //   dataIndex: 'status',
  //   key: 'status',
  //   render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
  //     return <TagStatus status={text} />
  //   },
  // },
  // {
  //   title: 'Action',
  //   dataIndex: 'address',
  //   key: 'address',
  //   render: (text: any, record: ITFTableProductionOrderWood, count: any) => {
  //     return (
  //       <div className="flex justify-center">
  //         <Link to={`/production-orders/edit/${record?.id}`}>
  //           <Button
  //             type="primary"
  //             shape="circle"
  //             icon={<FileSearchOutlined />}
  //             size="small"
  //             style={{
  //               padding: '1px 1px 1px 3px',
  //             }}
  //           />
  //         </Link>
  //       </div>
  //     )
  //   },
  // },
]

export default columns
