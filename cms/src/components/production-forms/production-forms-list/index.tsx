import { useEffect, useState } from 'react'

import { Card, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { TableWaitForPreparing } from './table-wait-for-preparing/table-wait-for-preparing'

const { Title } = Typography
export const ProductionFormListComponent = () => {
  return (
    <>
      <Title level={3}>รายการรอประกอบ</Title>
      <Card title={`รายการรอประกอบ`} bordered={false}>
        <div className="min-h-[50vh]">
          <TableWaitForPreparing />
        </div>
      </Card>
    </>
  )
}
