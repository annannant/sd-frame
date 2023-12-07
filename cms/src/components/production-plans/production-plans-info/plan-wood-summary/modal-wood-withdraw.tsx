import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { InsertRowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
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
  Table,
  Typography,
} from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'
import { ITFProductionOrderPlan } from 'types/production-order-plan.type'
import {
  ITFProductionWoodSummary,
  ITFUpdateProductionWoodSummary,
} from 'types/production-wood-summary'

import { patchWithdrawWoods } from 'api/production-plans'
import { convertLocationLabel } from 'helper/location'
import { currency, parser } from 'helper/number'
import { useProductionOrdersPlan } from 'hooks/useProductionOrdersPlan'
import { useProductionPlans } from 'hooks/useProductionPlans'

import columns from './columns'

import {
  productionOrdersSelector,
  setParamsCreatePlan,
} from 'app/slice/production-orders'
import { omit, sortBy, sum } from 'lodash'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionOrderCreatePlanQuery,
} from 'services/production-order'
import { useGetProductionPlanByIDQuery } from 'services/production-plan'

const { Title } = Typography

interface ITFProps {
  open: boolean
  onClose: () => void
}

export const ModalWoodWithdraw = (props: ITFProps) => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const { id }: any = useLoaderData()
  const { data, refetch } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const productionWoodSummary = data?.productionWoodSummary ?? []
  const lot = productionWoodSummary?.[0]?.lot

  useEffect(() => {
    form.setFieldValue('woodsWithdraw', data?.productionWoodSummary)
  }, [data?.productionWoodSummary])

  const onSubmit = () => {
    form.submit()
  }

  const onFinish = async () => {
    try {
      setLoading(true)
      const values = form.getFieldValue('woodsWithdraw') ?? []

      const payload = values.map((val: ITFUpdateProductionWoodSummary) => ({
        ...omit(val, ['location', 'wood']),
      }))
      await patchWithdrawWoods(id, payload)
      refetch()
      props.onClose()
    } catch (err) {
      console.log('err:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      open={props.open}
      onCancel={props.onClose}
      width={850}
      title={<Title level={3}>เบิกไม้</Title>}
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
      <div className="mb-[50px] mt-[30px] px-[20px]">
        <Form form={form} onFinish={onFinish} autoComplete="off" size="large">
          <Row gutter={[0, 30]} className="mt-20px">
            <Col span={24}>
              <Row gutter={[20, 0]} className="">
                <Col span={3} className="text-center font-bold">
                  No.
                </Col>
                <Col span={6} className="text-center font-bold">
                  ไม้ / ตำแหน่งที่ตั้ง
                </Col>
                <Col span={4} className="text-center font-bold">
                  ขนาด
                </Col>
                <Col span={5} className="text-center font-bold">
                  จำนวน
                </Col>
                <Col span={6} className="text-center font-bold">
                  เบิกแล้ว / ที่ต้องใช้
                </Col>
              </Row>
            </Col>
            <Divider className="my-[2px]" />
            <Form.List name="woodsWithdraw">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const record = productionWoodSummary?.[index]
                    return (
                      <Col key={index + 1} span={24}>
                        <Row gutter={[20, 0]} className="items-center">
                          <Col span={3} style={{ textAlign: 'center' }}>
                            {index + 1}
                          </Col>
                          <Col span={6} style={{ textAlign: 'left' }}>
                            <div>
                              {record.woodType === 'part' ? (
                                <span>ไม้ในสต๊อก</span>
                              ) : (
                                <span>ไม้เส้นยาว</span>
                              )}
                            </div>
                            <div style={{ color: colors.secondary }}>
                              {record?.location &&
                                convertLocationLabel(record?.location)}
                            </div>
                          </Col>
                          <Col span={4} style={{ textAlign: 'center' }}>
                            <div>{currency(record?.length ?? 0)} "</div>
                          </Col>
                          <Col span={5} style={{ textAlign: 'center' }}>
                            <Form.Item
                              {...restField}
                              name={[name, 'totalWithdraw']}
                              className="mb-0 w-full"
                            >
                              <InputNumber
                                max={record?.totalQty ?? 0}
                                placeholder="จำนวน"
                                style={{ width: '100%' }}
                                // disabled={
                                //   (record?.totalQty ?? 0) ===
                                //   (record?.totalWithdraw ?? 0)
                                // }
                              />
                            </Form.Item>
                          </Col>
                          <Col
                            span={6}
                            style={{ textAlign: 'center' }}
                            className="px-[20px]"
                          >
                            <span className="mr-2">
                              {currency(record?.totalWithdraw ?? 0)} /{' '}
                              {currency(record?.totalQty ?? 0)}
                            </span>
                            {record.woodType === 'part' ? (
                              <span>ชิ้น</span>
                            ) : (
                              <span>เส้น</span>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    )
                  })}

                  <div></div>
                </>
              )}
            </Form.List>
          </Row>
        </Form>
      </div>
    </Modal>
  )
}
