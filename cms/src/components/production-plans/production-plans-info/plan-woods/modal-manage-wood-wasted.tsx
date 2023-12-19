import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { MinusCircleTwoTone, PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Table,
  Typography,
} from 'antd'

import { colors } from 'constants/colors'
import { ITFUpdateProductionWoodSummary } from 'types/production-wood-summary'

import { patchUpdateStatus } from 'api/production-plan-wood-items'
import { postCreateMultiple } from 'api/wood-item-stocks'
import { filterOption } from 'helper/select-input'
import useMessage from 'hooks/useMessage'

import { omit, sortBy, sum } from 'lodash'
import { useGetAllLocationsQuery } from 'services/location'
import { useGetProductionPlanByIDQuery } from 'services/production-plan'

const { Title } = Typography

interface ITFProps {
  title?: string
  description?: string
  open: boolean
  selectedItems?: number[]
  onClose: () => void
  successIds?: number[]
}

export const ModalManageWoodWasted = (props: ITFProps) => {
  const {
    open,
    selectedItems,
    title = 'จัดการไม้ผลิตเสีย',
    description = 'ระบุความยาวไม้ที่ผลิตเสีย',
    successIds,
  } = props
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { id }: any = useLoaderData()
  const { data, refetch } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const { data: location } = useGetAllLocationsQuery()
  const { options } = location ?? {}
  const { contextHolder, success, error } = useMessage()

  const productionWoodSummary = data?.productionWoodSummary ?? []
  const lot = productionWoodSummary?.[0]?.lot
  const woodId = data?.productionOrder?.woodId

  useEffect(() => {
    if (open) {
      form.setFieldValue('woods', [{ key: 1 }])
    } else {
      form.resetFields()
    }
  }, [open, form])

  useEffect(() => {
    if (selectedItems?.length === 0) {
      form.setFieldValue('woods', [{ key: 1 }])
    } else {
      const woods = selectedItems?.map((item: number, index: number) => ({
        key: index + 1,
        woodLength: item,
      }))
      form.setFieldValue('woods', woods)
    }
  }, [form, selectedItems])

  const onSubmit = () => {
    form.submit()
  }

  const onFinish = async () => {
    try {
      setLoading(true)
      const values = form.getFieldValue('woods') ?? []
      console.log('values:', values)
      const payload = values.map((val: ITFUpdateProductionWoodSummary) => ({
        ...omit(val, ['key']),
        lot,
        woodId,
      }))
      await postCreateMultiple(payload)
      if (successIds && (successIds ?? []).length > 0) {
        await patchUpdateStatus({
          cuttingStatus: 'success',
          ids: successIds,
        })
      }
      refetch()
      success()
      setTimeout(() => {
        props.onClose()
      }, 500)
    } catch (err) {
      console.log('err:', err)
      error()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        open={props.open}
        onCancel={props.onClose}
        width={720}
        title={
          <Title level={3} style={{ marginBottom: 4 }}>
            {title}
          </Title>
        }
        footer={[
          <Button
            key="back"
            onClick={props.onClose}
            size="large"
            className="w-[120px]"
          >
            ปิด
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={onSubmit}
            size="large"
            className="w-[120px]"
          >
            บันทึก
          </Button>,
        ]}
      >
        <div className="text-[16px]">{description}</div>
        <div className="mb-[50px] mt-[30px] px-[20px]">
          <Form form={form} onFinish={onFinish} autoComplete="off" size="large">
            <Row gutter={[0, 30]} className="mt-20px">
              <Col span={24}>
                <Row gutter={[20, 0]} className="">
                  <Col span={2} className="text-center font-bold">
                    No.
                  </Col>
                  <Col span={6} className="text-center font-bold">
                    ขนาด
                  </Col>
                  <Col span={3} className="text-center font-bold">
                    หน่วย
                  </Col>
                  <Col span={12} className="text-center font-bold">
                    ตำแหน่งที่จัดเก็บ
                  </Col>
                  <Col span={1} className="text-center font-bold"></Col>
                </Row>
              </Col>
              <Divider className="my-[2px]" />
              <Form.List name="woods">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => {
                      return (
                        <Col key={index + 1} span={24}>
                          <Row gutter={[20, 0]} className="items-center">
                            <Col span={2} style={{ textAlign: 'center' }}>
                              {index + 1}
                            </Col>
                            <Col span={6} style={{ textAlign: 'center' }}>
                              <Form.Item
                                {...restField}
                                name={[name, 'woodLength']}
                                className="mb-0 w-full"
                                rules={[
                                  { required: true, message: 'ระบุขนาด' },
                                ]}
                              >
                                <InputNumber
                                  placeholder="ขนาด"
                                  style={{ width: '100%' }}
                                  // disabled={
                                  //   (record?.totalQty ?? 0) ===
                                  //   (record?.totalWithdraw ?? 0)
                                  // }
                                />
                              </Form.Item>
                            </Col>
                            <Col
                              span={3}
                              style={{ textAlign: 'center' }}
                              className="px-[20px]"
                            >
                              นิ้ว
                            </Col>
                            <Col span={12} className="flex justify-center">
                              <Form.Item
                                {...restField}
                                name={[name, 'locationId']}
                                className="mb-0 w-full"
                                // rules={[{ required: true, message: 'ระบุขนาด' }]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Search to Select"
                                  optionFilterProp="children"
                                  filterOption={filterOption}
                                  options={options}
                                />
                              </Form.Item>
                            </Col>
                            <Col span={1} style={{ textAlign: 'center' }}>
                              <MinusCircleTwoTone
                                twoToneColor={colors.danger}
                                onClick={() => remove(name)}
                              />
                            </Col>
                          </Row>
                        </Col>
                      )
                    })}
                    <Row className="w-full">
                      <Button
                        type="dashed"
                        onClick={() => {
                          add()
                        }}
                        block
                        icon={<PlusOutlined />}
                        className="m-auto w-[200px]"
                      >
                        เพิ่มรายการ
                      </Button>
                    </Row>

                    <div></div>
                  </>
                )}
              </Form.List>
            </Row>
          </Form>
        </div>
      </Modal>
    </>
  )
}
