import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
} from 'antd'
import type { FormInstance } from 'antd'
import type { DrawerProps } from 'antd/es/drawer'
import type { RadioChangeEvent } from 'antd/es/radio'

import { useStandardFrames } from 'hooks/useStandardFrames'

import { setShowDrawer, standardFrameSelector } from 'app/slice/standard-frames'

interface DrawerFormProps {}
export const DrawerForm = (props: DrawerFormProps) => {
  const dispatch = useDispatch()
  const [formInstance] = Form.useForm()

  const { isShowDrawer, dataEdit, isEdit } = useSelector(standardFrameSelector)
  const { contextHolder, onFinish } = useStandardFrames()
  const form = isShowDrawer ? formInstance : undefined
  const onClose = () => {
    dispatch(setShowDrawer(false))
  }

  const title = isEdit ? 'แก้ไขกรอบมาตรฐาน' : 'สร้างกรอบมาตรฐาน'

  useEffect(() => {
    if (dataEdit.id) {
      form?.setFieldsValue({
        name: dataEdit?.name,
        width: dataEdit?.width,
        height: dataEdit?.height,
        defaultReorderPoint: dataEdit?.defaultReorderPoint ?? '',
      })
    } else {
      form?.resetFields()
    }
  }, [form, dataEdit])

  return (
    <>
      {contextHolder}
      <Drawer
        title={title}
        placement={'right'}
        width={500}
        onClose={onClose}
        open={isShowDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => form?.submit()}>
              OK
            </Button>
          </Space>
        }
      >
        <div>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              label="ชื่อ"
              rules={[
                {
                  required: true,
                  message: 'ระบุความชื่อ',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="width"
                  label="กว้าง"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุความกว้าง',
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={120}
                    placeholder="กว้าง"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="height"
                  label="ยาว"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุความยาว',
                    },
                  ]}
                >
                  <InputNumber
                    min={1}
                    max={120}
                    placeholder="ยาว"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="defaultReorderPoint"
                  label={
                    <>
                      ค่าเริ่มต้นจุดสั่งผลิต <br /> (Reorder Point)
                    </>
                  }
                >
                  <InputNumber placeholder="" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Drawer>
    </>
  )
}
