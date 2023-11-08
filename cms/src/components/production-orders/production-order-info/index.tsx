import React, { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Form, Modal, Row } from 'antd'
import { Typography } from 'antd'

import { OrderInfoDetailIndex } from 'components/orders-info-detail'
import { OrderStatusDetailIndex } from 'components/orders-status-detail'
import FormOrdersInfo from 'components/production-orders/production-order-info/form-orders-info/form-orders-info'
import { FormOrders } from 'components/production-orders/production-order-info/form-orders/form-orders'

import { colors } from 'constants/colors'
import { CREATE, EDIT } from 'constants/common'
import { DRAFT } from 'constants/current-status.constant'

import useMessage from 'hooks/useMessage'
import { useSaveProductionPlanOrders } from 'hooks/useSaveProductionPlanOrders'

import { useGetProductionOrderByIDQuery } from 'services/production-order'

const { Title } = Typography

export const ProductionOrdersInfoIndex = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [modal, contextHolderModal] = Modal.useModal()

  const { id, action }: any = useLoaderData()
  const { contextHolder, success, error } = useMessage()
  const { create, createSaveDraft, update, updateSaveDraft, remove } =
    useSaveProductionPlanOrders()
  const { data: orderInfo, refetch } = useGetProductionOrderByIDQuery(id, {
    skip: !id,
  })

  const isEdit = action === EDIT
  const isCreate = action === CREATE

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
          refetch()
          break
        case 'create':
          await create(values)
          break
        case 'update':
          await update(values)
          refetch()
          break
        case 'delete':
          await remove()
          refetch()
          break
        default:
          break
      }
      success()
      setTimeout(() => {
        navigate('/production-orders')
      }, 600)
    } catch (e: any) {
      console.log('error:', e)
      if (e.errorFields) {
        return
      }
      error()
    }
  }

  const configDelete = {
    title: 'ยืนยันลบคำสั่งผลิต',
    okText: 'ลบ',
    okButtonProps: {
      danger: true,
    },
    cancelText: 'ยกเลิก',
    content: <>ต้องการลบคำสั่งผลิตนี้ ?</>,
    icon: <WarningOutlined style={{ color: colors.danger }} />,
  }

  const configSubmit = {
    title: 'ยืนยันสั่งผลิต',
    okText: 'ยืนยัน',
    okButtonProps: {},
    cancelText: 'ยกเลิก',
    content: <>ต้องการสร้างคำสั่งผลิต ?</>,
    icon: <InfoCircleOutlined style={{ color: colors.primary }} />,
  }

  const configEdit = {
    title: 'แก้ไขคำสั่งผลิต',
    okText: 'ยืนยัน',
    okButtonProps: {},
    cancelText: 'ยกเลิก',
    content: <>ต้องการแก้ไขคำสั่งผลิต ?</>,
    icon: <InfoCircleOutlined style={{ color: colors.warning }} />,
  }

  return (
    <>
      {contextHolder}
      {contextHolderModal}
      <Form
        form={form}
        autoComplete="off"
        size="large"
        scrollToFirstError={{
          block: 'center',
        }}
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
          {(orderInfo?.status === DRAFT || isCreate) && (
            <Button
              type="default"
              htmlType="button"
              className="w-[120px]"
              icon={<SaveOutlined style={{ fontSize: 14 }} />}
              onClick={() =>
                isEdit
                  ? onClickButton('update-save-draft')
                  : onClickButton('create-save-draft')
              }
            >
              บันทึก
            </Button>
          )}

          {isEdit && (
            <Button
              type="primary"
              htmlType="button"
              className="w-[120px]"
              icon={<DeleteOutlined style={{ fontSize: 14 }} />}
              onClick={async () => {
                const confirmed = await modal.confirm(configDelete)
                if (confirmed) {
                  onClickButton('delete')
                }
                console.log('Confirmed: ', confirmed)
              }}
              danger
            >
              ลบ
            </Button>
          )}
          <Button
            type="primary"
            htmlType="button"
            className="w-[160px]"
            // onClick={() =>
            //   isEdit ? onClickButton('update') : onClickButton('create')
            // }
            onClick={async () => {
              const confirmed = await modal.confirm(configSubmit)
              if (confirmed) {
                isEdit ? onClickButton('update') : onClickButton('create')
              }
            }}
          >
            ยืนยันสั่งผลิต
          </Button>
          {/* {orderInfo?.status === WAIT_FOR_CUTTING && isEdit && (
            <Button
              type="default"
              htmlType="button"
              className="w-[160px]"
              icon={<EditOutlined style={{ fontSize: 14 }} />}
              onClick={async () => {
                const confirmed = await modal.confirm(configEdit)
                if (confirmed) {
                  onClickButton('update-save-draft')
                }
              }}
            >
              แก้ไขคำสั่งผลิต
            </Button>
          )} */}
        </div>
      </Form>
    </>
  )
}
