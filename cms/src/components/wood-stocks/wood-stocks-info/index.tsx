import { useLoaderData } from 'react-router-dom'

import { Button, Card, Col, Row, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import { TableLots } from './table-lots/table-lots'

import { useGetWoodByIDQuery } from 'services/wood'

const { Title } = Typography

export const WoodStocksInfoComponent = () => {
  const { id }: any = useLoaderData()
  const { data } = useGetWoodByIDQuery(id, {
    skip: !id,
  })

  const title = `${data?.name} - ${data?.description}`

  return (
    <>
      <div className="flex justify-between">
        <Title level={3}>สต๊อกไม้กรอบ / {title}</Title>
        <div className="flex-1"></div>
      </div>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card title="Lot" bordered={false}>
            <div className="grid gap-y-[50px]">
              <TableLots />
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
