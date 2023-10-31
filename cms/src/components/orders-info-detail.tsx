import { Col, Form, Row, Select, Typography } from 'antd'

import { ITFProductionOrder } from 'types/production-order.type'
import { ITFWood } from 'types/wood.type'

import { formatDate } from 'helper/date-formatter'
import { convertUnitToText } from 'helper/unit'

const { Text } = Typography

interface ITFProps {
  data?: ITFProductionOrder | null
}
export const OrderInfoDetailIndex = (props: ITFProps) => {
  const { data: selected } = props
  return (
    <>
      <Row className="mb-[15px]">
        <Col span={24}>
          <Text strong>รายละเอียดคำสั่งผลิต</Text>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Row>
                <Col span={5} className="text-right">
                  <Text type="secondary">รหัสคำสั่งผลิต (PO No.)</Text>
                </Col>
                <Col span={18} className="pl-[40px] ">
                  <Text className="text-font-title">{selected?.orderNo}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5} className="text-right">
                  <Text type="secondary">วันที่สั่งผลิต </Text>
                </Col>
                <Col span={18} className="pl-[40px] ">
                  <Text className="text-font-title">
                    {`${formatDate(selected?.createdAt).format(
                      'DD MMM YYYY HH:mm น.'
                    )}`}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5} className="text-right">
                  <Text type="secondary">ผู้สั่งผลิต</Text>
                </Col>
                <Col span={18} className="pl-[40px] ">
                  <Text className="text-font-title">ลาล่า (ฝ่ายขาย)</Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}
