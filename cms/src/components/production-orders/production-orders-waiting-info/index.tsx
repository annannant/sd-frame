import { useState } from 'react'

import { CalculatorOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { TagStatus } from 'common/tag-status'

const { Title } = Typography

export const ProductionOrdersWaitingInfo = () => {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Title level={3}>รายละเอียดการผลิต</Title>
        <Title level={5} className="pr-[26px]">
          <span>สถานะ :</span>
          <span className="ml-[10px]">รอผลิต</span>
        </Title>
      </div>
      <Card bordered={false}>
        <div className="flex items-center justify-between">
          <Title level={5} style={{ margin: 0 }}>
            Production Order No. : 100100
          </Title>

          <Button
            type="primary"
            htmlType="button"
            onClick={() => console.log('click')}
            icon={<CalculatorOutlined style={{ marginTop: 2 }} />}
          >
            วางแผนการผลิต
          </Button>
        </div>
        <Divider />
        <div></div>
      </Card>
    </>
  )
}
