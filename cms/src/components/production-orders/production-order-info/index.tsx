import React, { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { Button, Card, Col, Form, Row } from 'antd'
import { Typography, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { OrderInfoDetailIndex } from 'components/orders-info-detail'
import { OrderStatusDetailIndex } from 'components/orders-status-detail'
import FormOrdersInfo from 'components/production-orders/production-order-info/form-orders-info/form-orders-info'
import { FormOrders } from 'components/production-orders/production-order-info/form-orders/form-orders'

import { CREATE, EDIT } from 'constants/common'
import { ITFProductionOrder } from 'types/production-order.type'

import useMessage from 'hooks/useMessage'
import { useSaveProductionPlanOrders } from 'hooks/useSaveProductionPlanOrders'

import { useGetProductionOrderByIDQuery } from 'services/production-order'

const { Title } = Typography

export const ProductionOrdersInfoIndex = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const { id, action }: any = useLoaderData()

  const { create, createSaveDraft, update, updateSaveDraft } =
    useSaveProductionPlanOrders()
  const { contextHolder, success, error } = useMessage()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })

  const isEdit = action === EDIT

  const onClickButton = async (action: string) => {
    try {
      await form.validateFields()
      const values = form.getFieldsValue()
      switch (action) {
        case 'create-save-draft':
          await createSaveDraft(values)
          break
        case 'update-save-draft':
          await updateSaveDraft(values)
          break
        case 'create':
          await create(values)
          break
        case 'update':
          await update(values)
          break
      }
      success()
      // setTimeout(() => {
      //   navigate('/production-orders')
      // }, 1200)
    } catch (e: any) {
      console.log('error:', e)
      if (e.errorFields) {
        return
      }
      error()
    }
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        autoComplete="off"
        size="large"
        scrollToFirstError={{
          block: 'center',
        }}
        // className="px-[30px]"
      >
        <div className="flex justify-between">
          <Title level={3}>สั่งผลิต / สร้างคำสั่งผลิต</Title>
          <div className="flex-1"></div>
        </div>

        <div className="grid gap-y-[20px]">
          {isEdit && (
            <Card title="ข้อมูลคำสั่งผลิต">
              <Row>
                <Col span={12}>
                  <OrderInfoDetailIndex data={orderInfo} />
                </Col>
                <Col span={12}>
                  <OrderStatusDetailIndex data={orderInfo} />
                </Col>
              </Row>
            </Card>
          )}
          <Card title="ข้อมูลไม้กรอบ" bordered={false}>
            <FormOrdersInfo />
          </Card>

          <Card title="รายการสั่งผลิต" bordered={false}>
            <FormOrders />
          </Card>
        </div>
        <div className="mb-10 mt-5 flex justify-end gap-x-[10px]">
          <Button
            type="default"
            htmlType="button"
            className="w-[120px]"
            onClick={() =>
              isEdit
                ? onClickButton('update-save-draft')
                : onClickButton('create-save-draft')
            }
          >
            บันทึก
          </Button>
          {isEdit && (
            <Button
              type="primary"
              htmlType="button"
              className="w-[120px]"
              danger
            >
              ยกเลิก
            </Button>
          )}
          <Button
            type="primary"
            htmlType="button"
            className="w-[120px]"
            onClick={() =>
              isEdit ? onClickButton('update') : onClickButton('create')
            }
          >
            ยืนยัน
          </Button>
        </div>
      </Form>
    </>
  )
}
