import { useLoaderData } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Row, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import { useStandardFrameStocks } from 'hooks/useStandardFrameStocks'

import { DrawerForm } from './drawer-form/drawer-form'
import { TableWoodStdStocks } from './table-wood-std-stocks/table-wood-std-stocks'

import { useGetStandardFramesByIDQuery } from 'services/standard-frame'

const { Title } = Typography

export const StandardFrameStocksInfoComponent = () => {
  const { id }: any = useLoaderData()
  const { data } = useGetStandardFramesByIDQuery(id)
  const { onClickCreate } = useStandardFrameStocks()

  return (
    <>
      <Title level={3}>จัดการสต๊อกกรอบมาตรฐาน / {data?.name}</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>รายการสต๊อกกรอบมาตรฐาน ขนาด {data?.name}</div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onClickCreate}
            >
              สร้าง
            </Button>
          </div>
        }
        bordered={false}
      >
        <TableWoodStdStocks />
        <DrawerForm />
      </Card>
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
