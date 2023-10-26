import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Form, Row, Select, Typography } from 'antd'

import { filterOption } from 'helper/select-input'
import { convertUnitToText } from 'helper/unit'

import {
  productionOrdersSelector,
  setSelected,
} from 'app/slice/production-orders'
import woodList from 'data/wood-list'
import { orderBy } from 'lodash'

const { Text } = Typography
export const FormOrdersInfo = () => {
  const dispatch = useDispatch()
  const { selected } = useSelector(productionOrdersSelector)

  const handleChange = (value: string, option: any) => {
    dispatch(setSelected(option?.data ?? null))
  }

  const handleClear = () => {
    dispatch(setSelected(null))
  }

  const options = useMemo(() => {
    return orderBy(woodList, [
      'woodTypeCode',
      'attributeData.attributeName',
    ]).map((item) => {
      const desc = [item.name, ``]
      return {
        value: item.id,
        label: `${item.codeName} - ${desc.join(' ')}`,
        data: item,
      }
    })
  }, [])

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
              <Form.Item label="">
                <Select
                  // defaultValue="lucy"
                  onChange={handleChange}
                  onClear={handleClear}
                  allowClear
                  showSearch
                  filterOption={filterOption}
                  // options={[
                  //   { value: 'jack', label: 'Jack' },
                  //   { value: 'lucy', label: 'Lucy' },
                  //   { value: 'Yiminghe', label: 'yiminghe' },
                  //   {
                  //     value: 'disabled',
                  //     label: 'Disabled',
                  //     disabled: true,
                  //   },
                  // ]}
                  options={options}
                />
                <div className="mt-[5px]">
                  <Text type="secondary" className="font-title text-xs">
                    เลือกไม้กรอบที่ต้องการสั่งผลิต
                  </Text>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Row className="mb-[15px]">
            <Col span={24}>
              <Text strong>รายละเอียดไม้</Text>
            </Col>
          </Row>
          <Row>
            <Col span={18}>
              <Row gutter={[0, 10]}>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">รหัส</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      <Text className="text-font-title">
                        {selected?.codeName}
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">ประเภท</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      {selected?.woodTypeCode && (
                        <Text className="text-font-title">
                          {selected?.woodTypeName} ({selected?.woodTypeCode})
                        </Text>
                      )}
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">ชื่อไม้</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      <Text className="text-font-title">{selected?.name}</Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">ขนาดหน้าไม้</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      <Text className="text-font-title">
                        {selected?.woodTypeWidth}{' '}
                        {convertUnitToText(
                          selected?.woodTypeData?.woodTypeUnit ?? ''
                        )}
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div className="aspect-[1/1] w-full bg-gray-50">
                <img
                  src={selected?.woodTypeData?.imageUrl}
                  alt={selected?.woodTypeData?.woodTypeName}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default FormOrdersInfo
