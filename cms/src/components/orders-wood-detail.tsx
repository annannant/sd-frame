import { Col, Form, Row, Select, Typography } from 'antd'

import { ITFWood } from 'types/wood.type'

import { convertUnitToText } from 'helper/unit'

const { Text } = Typography

interface ITFProps {
  data?: ITFWood | null
}

export const OrderWoodDetailIndex = (props: ITFProps) => {
  const { data: selected } = props
  return (
    <>
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
                  <Text className="text-font-title">{selected?.code}</Text>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col span={5} className="text-right">
                  <Text type="secondary">ประเภท</Text>
                </Col>
                <Col span={18} className="pl-[40px] ">
                  {selected?.woodType?.code && (
                    <Text className="text-font-title">
                      {`${selected?.woodType?.code} - ${selected?.woodType?.name}`}
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
                  <Text className="text-font-title">{`${selected?.name ?? ''} ${
                    selected?.description ?? ''
                  }`}</Text>
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
                    {selected?.woodType?.width}{' '}
                    {convertUnitToText(selected?.woodType?.sizeUnit ?? '')}
                  </Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <div className="aspect-[1/1] w-full bg-gray-50">
            {selected?.woodType?.imageUrl && (
              <img
                className="h-full w-full object-cover"
                src={selected?.woodType?.imageUrl ?? '#'}
                alt={selected?.woodType?.name ?? ''}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}
