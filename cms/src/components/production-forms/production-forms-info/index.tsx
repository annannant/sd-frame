import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom'

import {
  CalculatorFilled,
  CalculatorOutlined,
  InfoCircleOutlined,
  InsertRowLeftOutlined,
  LeftOutlined,
  PlayCircleOutlined,
} from '@ant-design/icons'
// import CalculateIcon from '@mui/icons-material/Calculate'
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Modal,
  Row,
  Tabs,
  Typography,
  notification,
} from 'antd'
import type { TabsProps } from 'antd'
import type { NotificationPlacement } from 'antd/es/notification/interface'

import { ButtonPrimarySuccess } from 'common/button/single-color-button'
import { TagStatus } from 'common/tag-status'
import { OrderInfoDetailIndex } from 'components/orders-info-detail'
import { OrderWoodDetailIndex } from 'components/orders-wood-detail'

import { colors } from 'constants/colors'
import { CREATE, EDIT } from 'constants/common'

import { patchFinishPlan } from 'api/production-plans'
import useMessage from 'hooks/useMessage'
import useModal from 'hooks/useModal'
import { useProductionOrdersPlan } from 'hooks/useProductionOrdersPlan'

import { TableItems } from './table-items/table-items'
import { TableSuggestItems } from './table-suggest-items/table-suggest-items'

import { useGetProductionPlanByIDQuery } from 'services/production-plan'

const { Title } = Typography

export const ProductionFormInfoComponent = () => {
  const navigate = useNavigate()

  const { id }: any = useLoaderData()
  const { data } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const orderInfo = data?.productionOrder
  const [loading, setLoading] = useState(false)
  const { contextHolder, success, error } = useMessage()
  const [modal, contextHolderModal] = Modal.useModal()

  const onClickFinish = async () => {
    try {
      setLoading(true)
      const confirmed = await modal.confirm({
        title: 'ยืนยันเสร็จสิ้นการผลิต',
        okText: 'ยืนยัน',
        okButtonProps: {},
        cancelText: 'ยกเลิก',
        content: <>ต้องการเสร็จสิ้นการผลิตใช่หรือไม่ ?</>,
        icon: <InfoCircleOutlined style={{ color: colors.primary }} />,
      })
      if (confirmed) {
        await patchFinishPlan(id)
      }
      success()
      setTimeout(() => {
        navigate(-1)
      }, 500)
    } catch (err) {
      error()
      console.log('err:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {contextHolderModal}
      {contextHolder}
      <div className="flex w-full items-center justify-between">
        <Title level={3}>การผลิต</Title>
        <Title level={5} className="pr-[26px]">
          <span>สถานะ :</span>
          <span className="ml-[10px]">รอผลิต</span>
        </Title>
      </div>
      <div className="mb-[100px] grid gap-y-[30px]">
        <Card bordered={false}>
          <div className="flex items-center justify-between">
            <Title level={5} style={{ margin: 0 }}>
              Production Order No. : {orderInfo?.orderNo}
            </Title>
            <div className="flex gap-x-4"></div>
          </div>
          <Divider />
          <div className="grid gap-y-[20px]">
            <Row gutter={[50, 30]}>
              <Col span={12}>
                <OrderWoodDetailIndex data={orderInfo?.wood} />
              </Col>
              <Col span={12}>
                <OrderInfoDetailIndex data={orderInfo} />
              </Col>
            </Row>
          </div>
        </Card>
        <Row gutter={[30, 30]}>
          <Col span={24}>
            <Card title="รายการขนาดกรอบรูปในคำสั่งผลิต">
              <TableItems />
            </Card>
          </Col>
          {(data?.productionPlanSuggestItems ?? []).length > 0 && (
            <Col span={24}>
              <Card title="รายการขนาดกรอบรูปที่แนะนำให้ตัด">
                <TableSuggestItems />
              </Card>
            </Col>
          )}
        </Row>
      </div>
    </>
  )
}

export default ProductionFormInfoComponent
