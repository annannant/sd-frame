import { useState } from 'react'

import { Card, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { TableOrdersList } from './table-orders/table-orders'

const { Title } = Typography

export const ProductionOrdersListIndex = () => {
  const [tabTitle, setTabTitle] = useState('รอผลิต')

  const onChange = (key: string) => {
    setTabTitle(key === '2' ? 'อยู่ระหว่างผลิต' : 'รอผลิต')
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'รอผลิต',
      children: (
        <div className="min-h-[50vh]">
          <TableOrdersList />
        </div>
      ),
    },
    {
      key: '2',
      label: 'อยู่ระหว่างผลิต',
      children: (
        <div className="min-h-[50vh]">
          <TableOrdersList />
        </div>
      ),
    },
  ]
  return (
    <>
      <Title level={3}>รายการสั่งผลิต</Title>
      <Card title={`รายการสั่งผลิต (${tabTitle})`} bordered={false}>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Card>
    </>
  )
}
