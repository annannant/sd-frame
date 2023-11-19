import { useState } from 'react'

import { Card, Col, Row, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { ButtonBack } from 'common/button/back-button'

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
