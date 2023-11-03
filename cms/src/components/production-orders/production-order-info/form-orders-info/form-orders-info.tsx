import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import { Col, Form, Row, Select, Typography } from 'antd'

import { OrderInfoDetailIndex } from 'components/orders-info-detail'
import { OrderWoodDetailIndex } from 'components/orders-wood-detail'

import { filterOption } from 'helper/select-input'
import { convertUnitToText } from 'helper/unit'

import {
  productionOrdersSelector,
  setSelected,
} from 'app/slice/production-orders'
import { useGetProductionOrderByIDQuery } from 'services/production-order'
import { useGetAllWoodsQuery } from 'services/wood'

const { Text } = Typography
export const FormOrdersInfo = () => {
  const dispatch = useDispatch()
  const form = Form.useFormInstance()

  const { id, action }: any = useLoaderData()
  const { data } = useGetAllWoodsQuery()
  const { selected } = useSelector(productionOrdersSelector)
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })

  const handleChange = (value: string, option: any) => {
    dispatch(setSelected(option?.data ?? null))
  }

  const handleClear = () => {
    dispatch(setSelected(null))
  }

  const options = useMemo(() => data?.options ?? [], [data])

  useEffect(() => {
    if (id && orderInfo) {
      dispatch(setSelected(orderInfo?.wood ?? null))
      form?.setFieldValue('woodId', orderInfo?.wood?.id ?? '')
    } else {
      dispatch(setSelected(null))
      form?.setFieldValue('woodId', '')
    }
  }, [options, id, orderInfo, form, dispatch])

  return (
    <div className="grid gap-y-[20px]">
      <Row gutter={[0, 30]}>
        <Col span={12}>
          <Row className="mb-[15px]">
            <Col span={24}>
              <Text strong>ไม้กรอบ</Text>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <Form.Item
                label=""
                name="woodId"
                rules={[
                  {
                    required: true,
                    message: 'ระบุไม้กรอบ',
                  },
                ]}
              >
                <Select
                  onChange={handleChange}
                  onClear={handleClear}
                  allowClear
                  showSearch
                  filterOption={filterOption}
                  options={options}
                />
              </Form.Item>
              <div className="mt-[-15px]">
                <Text type="secondary" className="font-title text-xs">
                  เลือกไม้กรอบที่ต้องการสั่งผลิต
                </Text>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <OrderWoodDetailIndex data={selected} />
        </Col>
      </Row>
    </div>
  )
}

export default FormOrdersInfo
