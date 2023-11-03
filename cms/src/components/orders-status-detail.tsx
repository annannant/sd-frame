import { Col, Form, Row, Select, Typography } from 'antd'

import { TagStatus } from 'common/tag-status'

import { ITFProductionOrder } from 'types/production-order.type'
import { ITFWood } from 'types/wood.type'

import { formatDate } from 'helper/date-formatter'
import { convertStatusToText } from 'helper/status-formatter'
import { convertUnitToText } from 'helper/unit'

const { Text } = Typography

interface ITFProps {
  data?: ITFProductionOrder | null
}
export const OrderStatusDetailIndex = (props: ITFProps) => {
  const { data: selected } = props
  return (
    <>
      <Row className="mb-[15px]">
        <Col span={24} className="invisible">
          <Text strong>-</Text>
        </Col>
      </Row>
      <Row>
        <Col span={18}>
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <Row>
                <Col span={5} className="text-right">
                  <Text type="secondary">สถานะ</Text>
                </Col>
                <Col span={18} className="pl-[40px] ">
                  <Text className="text-font-title">
                    <TagStatus status={selected?.status ?? ''} />
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5} className="text-right">
                  <Text type="secondary">แก้ไขล่าสุด </Text>
                </Col>
                <Col span={18} className="pl-[40px] ">
                  <Text className="text-font-title">
                    {`${formatDate(selected?.updatedAt).format(
                      'DD MMM YYYY HH:mm น.'
                    )}`}
                  </Text>
                </Col>
              </Row>
            </Col>
            {/* <Col span={24}>
              <Row>
                <Col span={8} className="text-right">
                  <Text type="secondary">ผู้สั่งผลิต</Text>
                </Col>
                <Col span={15} className="pl-[40px] ">
                  <Text className="text-font-title">ลาล่า (ฝ่ายขาย)</Text>
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </>
  )
}
