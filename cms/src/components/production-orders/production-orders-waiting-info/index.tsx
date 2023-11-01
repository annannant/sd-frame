import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { CalculatorOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, Row, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { TagStatus } from 'common/tag-status'
import { OrderInfoDetailIndex } from 'components/orders-info-detail'
import { OrderWoodDetailIndex } from 'components/orders-wood-detail'

import { TableOrderItems } from './table-order-items/table-order-items'

import { useGetProductionOrderByIDQuery } from 'services/production-order'
import { useGetAllStandardFramesQuery } from 'services/standard-frame'

const { Title } = Typography

export const ProductionOrdersWaitingInfo = () => {
  const { id, action }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <Title level={3}>รายละเอียดการผลิต</Title>
        <Title level={5} className="pr-[26px]">
          <span>สถานะ :</span>
          <span className="ml-[10px]">รอผลิต</span>
        </Title>
      </div>
      <div className="grid gap-y-[20px]">
        <Card bordered={false}>
          <div className="flex items-center justify-between">
            <Title level={5} style={{ margin: 0 }}>
              Production Order No. : {orderInfo?.orderNo}
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
          <div className="grid gap-y-[20px]">
            <Row gutter={[50, 30]}>
              <Col span={12}>
                <OrderWoodDetailIndex data={orderInfo?.wood} />
              </Col>
              <Col span={12}>
                <OrderInfoDetailIndex data={orderInfo} />
              </Col>
            </Row>
          </div>
        </Card>
        <Card bordered={false}>
          <TableOrderItems />
        </Card>
      </div>
    </>
  )
}