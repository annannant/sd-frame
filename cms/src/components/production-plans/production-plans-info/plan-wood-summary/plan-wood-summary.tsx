import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { InsertRowLeftOutlined, LoadingOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Form,
  InputNumber,
  Row,
  Table,
  Typography,
} from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'
import { ITFProductionOrderPlan } from 'types/production-order-plan.type'

import { parser } from 'helper/number'
import { useProductionOrdersPlan } from 'hooks/useProductionOrdersPlan'
import { useProductionPlans } from 'hooks/useProductionPlans'

import columns from './columns'
import { ModalWoodWithdraw } from './modal-wood-withdraw'

import {
  productionOrdersSelector,
  setParamsCreatePlan,
} from 'app/slice/production-orders'
import { orderBy, sortBy, sum } from 'lodash'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionOrderCreatePlanQuery,
} from 'services/production-order'
import { useGetProductionPlanByIDQuery } from 'services/production-plan'

const { Title } = Typography

export const PlanWoodSummary = () => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)

  const { id }: any = useLoaderData()
  const { data } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const { transformTableWoodSummary } = useProductionPlans()
  const dataSources = transformTableWoodSummary(
    data?.productionWoodSummary ?? []
  )
  const lot = data?.productionWoodSummary?.[0]?.lot

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between py-4">
            <span>
              รายการไม้ที่ต้องใช้{' '}
              {lot && (
                <span>
                  ( Lot : <span className="mx-1">{lot}</span> )
                </span>
              )}
            </span>
            <div className="flex items-center justify-end">
              {/* <Title level={5} style={{ marginTop: 0, marginBottom: 0 }}>
              Lot : <span className="mx-3">{lot}</span>
            </Title> */}
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: colors.success,
                  },
                }}
              >
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  // disabled={!!data?.isWoodOutStock}
                  onClick={onOpen}
                  icon={<InsertRowLeftOutlined style={{ marginTop: 2 }} />}
                  style={{ width: 120 }}
                >
                  เบิกไม้
                </Button>
              </ConfigProvider>
            </div>
          </div>
        }
        bordered={false}
      >
        <Table
          dataSource={dataSources}
          columns={columns}
          pagination={false}
          bordered={false}
        />
      </Card>
      <ModalWoodWithdraw open={open} onClose={onClose} />
    </>
  )
}
