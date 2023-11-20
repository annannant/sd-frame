import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import {
  CalculatorOutlined,
  LeftOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
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

import { CREATE, EDIT } from 'constants/common'

import { PlanItems } from './plan-items/plan-items'
import { PlanWoodList } from './plan-wood-list/plan-wood-list'
import { TableOrderItems } from './table-order-items/table-order-items'
import { TableOrderStandardFrameItems } from './table-order-std-items/table-order-std-items'

import { useGetProductionOrderByIDQuery } from 'services/production-order'

const { Title } = Typography

export const ProductionOrdersPlanInfo = () => {
  const [form] = Form.useForm()

  const { id, action }: any = useLoaderData()
  const isEdit = action === EDIT
  const isCreate = action === CREATE
  const navigate = useNavigate()

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
                  icon={<LeftOutlined />}
                  onClick={() => {
                    navigate(`/wood-types/${id}/woods`)
                  }}
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
                    <TableOrderStandardFrameItems />
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col span={17}>
              <div className="flex flex-col gap-y-[30px]">
                <PlanItems />
                <PlanWoodList />
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  )
}
