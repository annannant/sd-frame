import { useEffect, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { DeleteOutlined, LeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'

import { EDIT } from 'constants/common'
import { ITFAttribute } from 'types/attribute.type'
import { ITFWoodForm } from 'types/wood-form.type'

import { filterOption } from 'helper/select-input'
import { convertSizeSymbol } from 'helper/wood'
import useMessage from 'hooks/useMessage'
import useModal from 'hooks/useModal'
import { useSaveWood } from 'hooks/useSaveWood'

import { useGetAllAttributesOptionsQuery } from 'services/attribute'
import { useGetWoodByIDQuery } from 'services/wood'
import {
  useGetAllWoodTypesOptionsQuery,
  useGetWoodTypesByIDQuery,
} from 'services/wood-type'

export const WoodInfoForm = () => {
  const [form] = Form.useForm<ITFWoodForm>()
  const [selectedAttribute, setSelectedAttribute] =
    useState<ITFAttribute | null>(null)
  const formWoodTypeId = Form.useWatch('woodTypeId', form)

  const { id, action, woodTypeId }: any = useLoaderData()
  const { modal, contextHolderModal, configSubmit, configDelete } = useModal()
  const { contextHolder, success, error } = useMessage()

  const { data, refetch } = useGetWoodByIDQuery(id, {
    skip: !id,
  })
  const { data: woodTypeData, refetch: refetchWoodType } =
    useGetWoodTypesByIDQuery(woodTypeId, {
      skip: !woodTypeId,
    })
  const { data: optionsWoodTypes } = useGetAllWoodTypesOptionsQuery()
  const { data: optionsAttributes } = useGetAllAttributesOptionsQuery()
  const { create, update, remove } = useSaveWood()

  const navigate = useNavigate()
  const isEdit = action === EDIT

  const onFinish = async () => {
    try {
      const values = form.getFieldsValue()
      if (isEdit) {
        await update(id, values)
        refetch()
      } else {
        const confirmed = await modal.confirm(configSubmit)
        if (!confirmed) {
          return
        }
        values.code = `${woodTypeData?.code}${selectedAttribute?.code}`
        await create(values)
      }
      success()
      setTimeout(() => {
        navigate(-1)
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
        navigate(-1)
      }, 600)
    } catch (e) {
      console.log('e:', e)
      error()
    }
  }

  const onWoodTypesChanged = () => {
    refetchWoodType()
    form.setFieldsValue({
      attributeId: null,
      name: '',
      description: '',
    })
  }

  const onAttributesChanged = (value: ITFAttribute, { data }: any) => {
    setSelectedAttribute(data)
    form.setFieldsValue({
      code: `${woodTypeData?.code}${data?.code}`,
      name: `${woodTypeData?.code}-${data?.name}`,
      description: `ไม้${woodTypeData?.name}-${data?.description} หน้า ${convertSizeSymbol(
        woodTypeData?.width,
        woodTypeData?.sizeUnit
      )}`,
    })
  }

  useEffect(() => {
    if (woodTypeId && optionsWoodTypes) {
      form.setFieldsValue({
        woodTypeId: Number(woodTypeId),
      })
    }
  }, [form, woodTypeId, optionsWoodTypes])

  useEffect(() => {
    if (isEdit && data) {
      form?.setFieldsValue({
        code: data?.code,
        name: data?.name,
        description: data?.description,
        imageUrl: data?.imageUrl,
        attributeId: data?.attributeId,
      })
    } else {
      form?.setFieldsValue({
        code: '',
        name: '',
        description: '',
        imageUrl: '',
        attributeId: data?.attributeId,
      })
    }
  }, [isEdit, data, form])

  return (
    <>
      {contextHolder}
      {contextHolderModal}
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
                  name="woodTypeId"
                  label="ประเภทไม้"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุประเภทไม้',
                    },
                  ]}
                  extra={!formWoodTypeId ? 'กรุณาเลือกประเภทไม้ก่อน' : ''}
                >
                  <Select
                    allowClear
                    showSearch
                    filterOption={filterOption}
                    options={optionsWoodTypes}
                    onChange={onWoodTypesChanged}
                    disabled={isEdit || woodTypeId}
                  />
                </Form.Item>
                <Form.Item
                  name="attributeId"
                  label="ลักษณะ"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุลักษณะ',
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    filterOption={filterOption}
                    options={optionsAttributes}
                    onChange={onAttributesChanged}
                    disabled={!formWoodTypeId}
                  />
                </Form.Item>
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
                  <Input disabled={!formWoodTypeId} />
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
                  <Input disabled={!formWoodTypeId} />
                </Form.Item>
                <Form.Item name="description" label="รายละเอียด">
                  <TextArea disabled={!formWoodTypeId} />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Card>
        <div className="mb-10 mt-5 flex justify-between">
          <div>
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
          </div>
          <div className=" flex justify-end gap-x-[10px]">
            <Button
              type="default"
              htmlType="button"
              icon={<LeftOutlined />}
              onClick={() => {
                navigate(-1)
              }}
            >
              กลับไปก่อนหน้า
            </Button>
            <Button type="primary" htmlType="submit" className="w-[120px]">
              บันทึก
            </Button>
          </div>
        </div>
      </Form>
    </>
  )
}
