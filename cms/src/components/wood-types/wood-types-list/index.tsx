import { Link } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'

import { TableWoodTypes } from './table-wood-types/table-wood-types'

const { Title } = Typography

export const WoodTypesListIndex = () => {
  return (
    <>
      <Title level={3}>ข้อมูลไม้กรอบ</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>ข้อมูลไม้กรอบ</div>
            <Link to="/wood-types/create">
              <Button type="primary" icon={<PlusOutlined />}>
                เพิ่มประเภทไม้กรอบ
              </Button>
            </Link>
          </div>
        }
        bordered={false}
      >
        <TableWoodTypes />
      </Card>
    </>
  )
}
