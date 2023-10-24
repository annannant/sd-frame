import { useState } from 'react'

import { Col, Form, Row, Select, Typography } from 'antd'

import frameList from 'data/frame-list'

const { Text } = Typography
export const FormOrdersInfo = () => {
  const [selected, setSelected] = useState<string>('')

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const data = frameList.map((item, index) => {
    return {
      id: item.id,
      code: `${item.type}-00${index + 1}`,
      name: `${item.type}-${item.variant_name}`,
      woodTypeCode: item.type,
      woodTypeName: item.type,
      woodTypeWidth: item.w_inch,
      woodTypeHeight: item.h_inch,
      woodTypeData: {
        name: item.type,
        code: item.type,
        woodWidth: item.w_inch,
        woodWidthUnit: 'inch',
        woodLength: 120,
        woodLengthUnit: 'inch',
        wMm: item.w_mm,
        hMm: item.h_mm,
        qtyPerBox: item.qty_per_box,
        pricePerUnit: item.price_per_unit,
        pricePerBox: item.total_price_per_box,
      },
    }
  })

  console.log(JSON.stringify(data))

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
              <Form layout="vertical" size="large">
                <Form.Item label="">
                  <Select
                    defaultValue="lucy"
                    onChange={handleChange}
                    options={[
                      { value: 'jack', label: 'Jack' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                      {
                        value: 'disabled',
                        label: 'Disabled',
                        disabled: true,
                      },
                    ]}
                  />
                  <div className="mt-[5px]">
                    <Text type="secondary" className="font-title text-xs">
                      เลือกไม้กรอบที่ต้องการสั่งผลิต
                    </Text>
                  </div>
                </Form.Item>
              </Form>
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
                      <Text className="text-font-title">1217</Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">ประเภท</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      <Text className="text-font-title">ไม้ลายไทย</Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">ชื่อไม้</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      <Text className="text-font-title">
                        ทองเส้น หน้า 1 นิ้ว
                      </Text>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={5} className="text-right">
                      <Text type="secondary">ขนาดหน้าไม้</Text>
                    </Col>
                    <Col span={18} className="pl-[40px] ">
                      <Text className="text-font-title">1 นิ้ว</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={6}>
              <div className="aspect-[1/1] w-full bg-red-50"></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default FormOrdersInfo
