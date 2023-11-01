import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'

import { CalculatorOutlined, PlayCircleOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Row,
  Tabs,
  Typography,
  notification,
} from 'antd'
import type { TabsProps } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { TagStatus } from 'common/tag-status'
import { OrderInfoDetailIndex } from 'components/orders-info-detail'
import { OrderWoodDetailIndex } from 'components/orders-wood-detail'

import { PlanItems } from './plan-items/plan-items'
import { TableOrderItems } from './table-order-items/table-order-items'
import { TableOrderStdItems } from './table-order-std-items/table-order-std-items'

import { useGetProductionOrderByIDQuery } from 'services/production-order'
import { useGetAllStandardFramesQuery } from 'services/standard-frame'

const { Title } = Typography

export const ProductionOrdersPlanInfo = () => {
  const [form] = Form.useForm()

  const { id, action }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    })
  }
  return (
    <>
      {contextHolder}
      <div className="flex w-full items-center justify-between">
        <Title level={3}>รายละเอียดการผลิต</Title>
        <Title level={5} className="pr-[26px]">
          <span>สถานะ :</span>
          <span className="ml-[10px]">รอผลิต</span>
        </Title>
      </div>
      <Form
        form={form}
        autoComplete="off"
        size="large"
        scrollToFirstError={{
          block: 'center',
        }}
      >
        <div className="mb-[100px] grid gap-y-[30px]">
          <Card bordered={false}>
            <div className="flex items-center justify-between">
              <Title level={5} style={{ margin: 0 }}>
                Production Order No. : {orderInfo?.orderNo}
              </Title>
              <div className="flex gap-x-4">
                <Button
                  type="default"
                  htmlType="button"
                  onClick={() => console.log('click')}
                >
                  กลับไปก่อนหน้า
                </Button>
                <Button
                  type="primary"
                  htmlType="button"
                  onClick={() => console.log('click')}
                  icon={<PlayCircleOutlined style={{ marginTop: 2 }} />}
                >
                  เริ่มงานผลิต
                </Button>
              </div>
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
          <Row gutter={[30, 30]}>
            <Col span={7}>
              <Row gutter={[0, 30]}>
                <Col span={24}>
                  <Card title="รายการขนาดกรอบรูปในคำสั่งผลิต" bordered={false}>
                    <TableOrderItems />
                  </Card>
                </Col>
                <Col span={24}>
                  <Card
                    title="รายการขนาดกรอบรูปที่แนะนำให้ตัด"
                    bordered={false}
                  >
                    <TableOrderStdItems />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={17}>
              <PlanItems />
            </Col>
          </Row>
        </div>
      </Form>
    </>
  )
}
