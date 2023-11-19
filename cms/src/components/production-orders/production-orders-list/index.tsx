import { useEffect, useState } from 'react'

import { Card, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { TableDraft } from './table-draft/table-draft'
import { TableOrdersInprogress } from './table-orders-inprogress/table-orders-inprogress'
import { TableOrders } from './table-orders/table-orders'

const { Title } = Typography
const localStorageKey = 'tabProductionOrders'
export const ProductionOrdersListIndex = () => {
  const [tabTitle, setTabTitle] = useState('รอผลิต')

  const onChange = (key: string) => {
    let title = ''
    switch (key) {
      case '1':
        title = 'บันทึกฉบับร่าง'
        break
      case '2':
        title = 'อยู่ระหว่างผลิต'
        break
      case '3':
        title = 'รอผลิต'
        break
      default:
        break
    }
    localStorage.setItem('localStorageKey', key)
    setTabTitle(title)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'บันทึกฉบับร่าง',
      children: (
        <div className="min-h-[50vh]">
          <TableDraft />
        </div>
      ),
    },
    {
      key: '2',
      label: 'รอผลิต',
      children: (
        <div className="min-h-[50vh]">
          <TableOrders />
        </div>
      ),
    },
    {
      key: '3',
      label: 'อยู่ระหว่างผลิต',
      children: (
        <div className="min-h-[50vh]">
          <TableOrdersInprogress />
        </div>
      ),
    },
  ]

  return (
    <>
      <Title level={3}>รายการสั่งผลิต</Title>
      <Card title={`รายการสั่งผลิต (${tabTitle})`} bordered={false}>
        <Tabs
          defaultActiveKey={localStorage.getItem('localStorageKey') ?? '1'}
          items={items}
          onChange={onChange}
        />
      </Card>
    </>
  )
}
