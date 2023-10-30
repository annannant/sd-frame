import React from 'react'
import { useLoaderData } from 'react-router-dom'

import { Button, Card, Form } from 'antd'
import { Typography, notification } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import FormOrdersInfo from 'components/production-orders/production-order-info/form-orders-info/form-orders-info'
import { FormOrders } from 'components/production-orders/production-order-info/form-orders/form-orders'

import { useSaveProductionPlanOrders } from 'hooks/useSaveProductionPlanOrders'

const { Title } = Typography

export const ProductionOrdersInfoIndex = () => {
  const [form] = Form.useForm()
  const { id, action }: any = useLoaderData()

  const { create } = useSaveProductionPlanOrders()
  const [api, contextHolder] = notification.useNotification()

  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      placement,
    })
  }

  const handleSave = async () => {
    try {
      openNotification('top')
      await form.validateFields()
      const values = form.getFieldsValue()
      console.log('values:', values)
    } catch (error: any) {
      console.log('error:', error)
    }
  }
  const handleSubmit = async () => {
    try {
      await form.validateFields()
      const values = form.getFieldsValue()
      await create(values)
      console.log('values:', values)
    } catch (error: any) {
      console.log('error:', error)
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
        <Title level={3}>สั่งผลิต / สร้างคำสั่งผลิต</Title>
        <div className="grid gap-y-[20px]">
          <Card title="ข้อมูลไม้กรอบ" bordered={false}>
            <FormOrdersInfo />
          </Card>
          <Card title="ข้อมูลคำสั่งผลิต" bordered={false}>
            <FormOrders />
          </Card>
        </div>
        <div className="mt-5 flex justify-end gap-x-[10px]">
          {/* <Button
            type="default"
            htmlType="button"
            className="w-[120px]"
            onClick={handleSave}
          >
            บันทึก
          </Button> */}
          <Button
            type="primary"
            htmlType="button"
            className="w-[120px]"
            onClick={handleSubmit}
          >
            ยืนยัน
          </Button>
        </div>
      </Form>
    </>
  )
}
