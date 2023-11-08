import { useEffect } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { DeleteOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { EDIT } from 'constants/common'
import { ITFCreateWoodType } from 'types/wood-type.type'

import useMessage from 'hooks/useMessage'
import useModal from 'hooks/useModal'
import { useSaveWoodTypes } from 'hooks/useSaveWoodTypes'

import { useGetWoodTypesByIDQuery } from 'services/wood-type'

const { Title } = Typography

export const WoodTypesInfoIndex = () => {
  const [form] = Form.useForm<ITFCreateWoodType>()

  const { id, action }: any = useLoaderData()
  const { modal, contextHolderModal, configSubmit, configDelete } = useModal()
  const { contextHolder, success, error } = useMessage()
  const { data, refetch } = useGetWoodTypesByIDQuery(id, {
    skip: !id,
  })
  const { create, update, remove } = useSaveWoodTypes()
  const navigate = useNavigate()

  const isEdit = action === EDIT

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      console.log('values:', values)
      const confirmed = await modal.confirm(configSubmit)
      if (!confirmed) {
        return
      }

      if (isEdit) {
        await update(id, values)
        refetch()
      } else {
        await create(values)
      }
      success()
      setTimeout(() => {
        navigate('/wood-types')
      }, 600)

      console.log('values:', values)
    } catch (e) {
      console.log('e:', e)
      error()
    }
  }

  const onDelete = async () => {
    try {
      const confirmed = await modal.confirm(configDelete)
      if (!confirmed) {
        return
      }

      await remove(id)
      success()
      setTimeout(() => {
        navigate('/wood-types')
      }, 600)
    } catch (e) {
      console.log('e:', e)
      error()
    }
  }

  useEffect(() => {
    if (isEdit && data) {
      form?.setFieldsValue({
        code: data?.code,
        name: data?.name,
        description: data?.description,
        imageUrl: data?.imageUrl,
        width: data?.width,
        height: data?.height,
        length: data?.length,
        sizeUnit: data?.sizeUnit,
        qtyPerbox: data?.qtyPerbox,
      })
    } else {
      form?.setFieldsValue({
        code: '',
        name: '',
        description: '',
        imageUrl: '',
        width: '',
        height: '',
        length: '',
        sizeUnit: '',
        qtyPerbox: null,
      })
    }
  }, [isEdit, data, form])

  return (
    <>
      {contextHolder}
      {contextHolderModal}
      <Title level={3}>
        ข้อมูลไม้กรอบ / {isEdit ? 'แก้ไขประเภทไม้กรอบ' : 'สร้างประเภทไม้กรอบ'}
      </Title>
      <Form
        form={form}
        labelCol={{ span: 6, style: { textAlign: 'left' } }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        size={'large'}
        colon={false}
        onFinish={onFinish}
        initialValues={{
          sizeUnit: 'inch',
        }}
      >
        <Card title="ข้อมูลไม้กรอบ" bordered={false}>
          <div className="grid gap-y-[50px]">
            <Row gutter={[20, 20]}>
              <Col offset={5} span={12}>
                <Form.Item
                  name="code"
                  label="รหัส"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุรหัส',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="ชื่อ"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุชื่อ',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item name="description" label="รายละเอียด">
                  <TextArea />
                </Form.Item>
                <Form.Item
                  label="กว้าง / สูง / ยาว"
                  className="custom-required"
                >
                  <Form.Item
                    name="width"
                    rules={[
                      {
                        required: true,
                        message: 'ระบุความกว้าง',
                      },
                    ]}
                    style={{
                      display: 'inline-block',
                      width: 'calc(33.8% - 8px)',
                    }}
                  >
                    <InputNumber
                      className="w-full"
                      max={120}
                      placeholder="กว้าง"
                    />
                  </Form.Item>

                  <Form.Item
                    name="height"
                    rules={[
                      {
                        required: true,
                        message: 'ระบุความสูง',
                      },
                    ]}
                    style={{
                      display: 'inline-block',
                      width: 'calc(33.8% - 8px)',
                      margin: '0 8px',
                    }}
                  >
                    <InputNumber
                      className="w-full"
                      max={1000}
                      placeholder="สูง"
                    />
                  </Form.Item>

                  <Form.Item
                    name="length"
                    rules={[
                      {
                        required: true,
                        message: 'ระบุความยาว',
                      },
                    ]}
                    style={{
                      display: 'inline-block',
                      width: 'calc(33.8% - 8px)',
                    }}
                  >
                    <InputNumber
                      className="w-full"
                      max={1000}
                      placeholder="ยาว"
                    />
                  </Form.Item>
                </Form.Item>
                <Form.Item name="sizeUnit" label="หน่วยวัด">
                  <Row gutter={[10, 0]}>
                    <Col span={16}>
                      <Select
                        defaultValue={'inch'}
                        options={[{ value: 'inch', label: 'นิ้ว "' }]}
                      />
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item label="จำนวนไม้ / กล่อง">
                  <Row gutter={[10, 0]}>
                    <Col span={16}>
                      <Form.Item name="qtyPerbox" noStyle>
                        <InputNumber className="w-full" max={1000} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Card>
        <div className="mb-10 mt-5 flex justify-end gap-x-[10px]">
          <Button
            type="default"
            htmlType="button"
            className="w-[120px]"
            onClick={() => {
              navigate('/wood-types')
            }}
          >
            ยกเลิก
          </Button>
          {isEdit && (
            <Button
              type="primary"
              htmlType="button"
              className="w-[120px]"
              icon={<DeleteOutlined style={{ fontSize: 14 }} />}
              onClick={onDelete}
              danger
            >
              ลบ
            </Button>
          )}
          <Button type="primary" htmlType="submit" className="w-[120px]">
            บันทึก
          </Button>
        </div>
      </Form>
    </>
  )
}
