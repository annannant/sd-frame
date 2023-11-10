import { Link, useLoaderData } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import { TableWoods } from '../../woods/wood-list/table-woods/table-woods'
import { WoodTypesInfo } from '../../woods/wood-list/wood-types-info/wood-types-info'

import { useGetWoodsByWoodTypeIDQuery } from 'services/wood-type'

const { Title } = Typography

export const WoodTypesWoodListIndex = () => {
  const { id }: any = useLoaderData()
  const { data, refetch } = useGetWoodsByWoodTypeIDQuery(id)

  return (
    <>
      <Title level={3}>
        ประเภทไม้กรอบ / {data?.name} ({data?.code}) / รายการไม้กรอบ
      </Title>
      <Row gutter={[20, 20]}>
        <Col span={17}>
          <Card
            title={
              <div className="flex justify-between">
                <div>รายการไม้กรอบ</div>
                <Link to={`/wood-types/${id}/woods/create`}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    เพิ่มไม้กรอบ
                  </Button>
                </Link>
              </div>
            }
            bordered={false}
          >
            <TableWoods />
          </Card>
        </Col>
        <Col span={7}>
          <Card
            title={
              <div className="flex justify-between">
                <div>ข้อมูลประเภทไม้</div>
              </div>
            }
            bordered={false}
          >
            <WoodTypesInfo />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="mt-[30px]">
            <ButtonBack size="large" />
          </div>
        </Col>
      </Row>
    </>
  )
}
