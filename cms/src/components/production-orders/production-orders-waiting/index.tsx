import { Card, Typography } from 'antd'

import { TableOrders } from './table-orders/table-orders'

const { Title } = Typography

export const ProductionOrdersWaitingIndex = () => {
  return (
    <>
      <Title level={3}>รายการผลิต</Title>
      <Card title={`รายการรอผลิต`} bordered={false}>
        <TableOrders />
      </Card>
    </>
  )
}
