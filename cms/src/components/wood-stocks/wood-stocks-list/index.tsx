import { Link } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'

import { TableWoodStocks } from './table-wood-stocks/table-wood-stocks'

const { Title } = Typography

export const WoodStocksListComponent = () => {
  return (
    <>
      <Title level={3}>สต๊อกไม้กรอบ</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>รายการสต๊อกไม้กรอบ</div>
            {/* <Link to="/wood-types/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้าง
              </Button>
            </Link> */}
          </div>
        }
        bordered={false}
      >
        <TableWoodStocks />
      </Card>
    </>
  )
}
