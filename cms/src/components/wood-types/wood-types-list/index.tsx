import { Link } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'

import { TableWoodTypes } from './table-wood-types/table-wood-types'

const { Title } = Typography

export const WoodTypesListIndex = () => {
  return (
    <>
      <Title level={3}>ประเภทไม้กรอบ</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>รายการประเภทไม้กรอบ</div>
            <Link to="/wood-types/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้าง
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
