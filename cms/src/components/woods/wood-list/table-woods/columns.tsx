import { Link } from 'react-router-dom'

import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ButtionPrimaryInfo } from 'common/button/single-color-button'

import { ITFWood } from 'types/wood.type'

const columns: ColumnsType<ITFWood> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'รหัส',
    dataIndex: 'code',
    key: 'code',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ลักษณะ',
    dataIndex: 'attribute',
    key: 'attribute',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWood, count: any) => {
      return `${record.attribute?.description} (${record.attribute?.code})`
    },
  },
  {
    title: 'ชื่อ',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'รายละเอียด',
    dataIndex: 'description',
    key: 'description',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWood, count: any) => {
      return (
        <div className="flex justify-center gap-x-4">
          <Link
            to={`/wood-types/${record?.woodTypeId}/woods/edit/${record?.id}`}
          >
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
            />
          </Link>
        </div>
      )
    },
  },
]

export default columns
