import { useEffect, useState } from 'react'

import { Card, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { TableOrdersInprogress } from './table-orders-inprogress/table-orders-inprogress'

const { Title } = Typography
export const ProductionPlansListIndex = () => {
  return (
    <>
      <Title level={3}>รายการกำลังผลิต</Title>
      <Card title={`รายการกำลังผลิต`} bordered={false}>
        <div className="min-h-[50vh]">
          <TableOrdersInprogress />
        </div>
      </Card>
    </>
  )
}
