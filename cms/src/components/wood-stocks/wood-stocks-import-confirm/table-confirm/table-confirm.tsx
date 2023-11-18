import { useSelector } from 'react-redux'

import { Alert, Col, Row, Table, Tag, Upload, message } from 'antd'
import { Space, Typography } from 'antd'

import columns from './columns'

import { woodStockSelector } from 'app/slice/wood-stocks'

const { Text, Title } = Typography

export const TableConfirm = () => {
  const dataSource = useSelector(woodStockSelector).importList

  return (
    <>
      <div>
        <Title level={5} className="m-0">
          รายการนำเข้าสต๊อกไม้กรอบ
        </Title>
        <Text className="m-0">โปรดตรวจสอบความถูกต้่อง</Text>
      </div>
      <div className="mt-4">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </>
  )
}
