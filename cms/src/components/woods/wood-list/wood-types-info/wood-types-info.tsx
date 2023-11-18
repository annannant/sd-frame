import { useLoaderData } from 'react-router-dom'

import { Col, Image, Row, Typography } from 'antd'

import { parser, toFixed } from 'helper/number'
import { convertUnitToText } from 'helper/unit'
import { convertSizeSymbol } from 'helper/wood'

import { useGetWoodsByWoodTypeIDQuery } from 'services/wood-type'

const { Text } = Typography

export const WoodTypesInfo = () => {
  const { id, action }: any = useLoaderData()
  const { data, refetch } = useGetWoodsByWoodTypeIDQuery(id)
  console.log('data:', data)

  const list = [
    {
      title: 'รหัส',
      value: data?.code,
    },
    {
      title: 'ชื่อ',
      value: data?.name,
    },
    {
      title: 'ขนาดหน้าไม้',
      value: convertSizeSymbol(data?.width, data?.sizeUnit),
    },
    {
      title: 'ความยาวไม้',
      value: convertSizeSymbol(data?.length, data?.sizeUnit),
    },
  ]

  return (
    <Row>
      <Col span={12}>
        <Row gutter={[0, 14]}>
          {list.map((item, index) => {
            return (
              <Col key={`${item.title}${index}`} span={24}>
                <Row>
                  <Col span={7} className="text-left">
                    <Text type="secondary">{item.title}</Text>
                  </Col>
                  <Col span={15}>
                    <Text className="text-font-title">{item.value}</Text>
                  </Col>
                </Row>
              </Col>
            )
          })}
        </Row>
      </Col>
      <Col span={12} className="flex justify-end">
        <Image src={data?.imageUrl ?? ''} style={{ height: 130 }} />
      </Col>
    </Row>
  )
}
