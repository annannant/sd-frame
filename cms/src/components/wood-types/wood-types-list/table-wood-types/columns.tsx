import { Link } from 'react-router-dom'

import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ButtonPrimaryInfo } from 'common/button/single-color-button'

import { ITFWoodType } from 'types/wood-type.type'

import { parser } from 'helper/number'
import { convertSizeSymbol } from 'helper/wood'

const columns: ColumnsType<ITFWoodType> = [
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
    title: 'ชื่อประเภท',
    dataIndex: 'name',
    key: 'name',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
  },
  {
    title: 'ขนาดหน้าไม้',
    dataIndex: 'width',
    key: 'width',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodType, count: any) => {
      return convertSizeSymbol(text, record?.sizeUnit ?? '')
    },
  },
  {
    title: 'ความยาว',
    dataIndex: 'length',
    key: 'length',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodType, count: any) => {
      return convertSizeSymbol(text, record?.sizeUnit ?? '')
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFWoodType, count: any) => {
      return (
        <div className="flex justify-center gap-x-4">
          <Link to={`/wood-types/edit/${record?.id}`}>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
            />
          </Link>
          <Link to={`/wood-types/${record?.id}/woods`}>
            <ButtonPrimaryInfo
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
