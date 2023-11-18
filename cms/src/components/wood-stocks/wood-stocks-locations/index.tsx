import { useLoaderData } from 'react-router-dom'

import { Card, Col, Row, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import { TableLocations } from './table-locations/table-locations'

import { useGetWoodByIDQuery } from 'services/wood'

const { Title } = Typography

export const WoodStocksLocationsComponent = () => {
  const { id }: any = useLoaderData()
  const { data } = useGetWoodByIDQuery(id, {
    skip: !id,
  })

  const title = `${data?.name} - ${data?.description}`

  return (
    <>
      <div className="flex justify-between">
        <Title level={3}>
          สต๊อกไม้กรอบ / {title} / สถานที่จัดเก็บ (Location)
        </Title>
        <div className="flex-1"></div>
      </div>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card
            title="สถานที่จัดเก็บ (Location)"
            bordered={false}
            className="mb-[20px]"
          >
            <div className="grid gap-y-[10px]">
              <TableLocations />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="mt-[30px] flex justify-end">
            <ButtonBack size="large" />
          </div>
        </Col>
      </Row>
    </>
  )
}
