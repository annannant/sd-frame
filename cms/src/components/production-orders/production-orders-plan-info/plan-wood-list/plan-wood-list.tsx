import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'
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

import columns from './columns'

import {
  productionOrdersSelector,
  setParamsCreatePlan,
} from 'app/slice/production-orders'
import { orderBy, sortBy, sum } from 'lodash'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionOrderCreatePlanQuery,
} from 'services/production-order'

const { Title } = Typography

export const PlanWoodList = () => {
  const dispatch = useDispatch()

  const form = Form.useFormInstance()

  const [searchParams] = useSearchParams()
  const debug = searchParams.get('debug') ?? undefined

  const { paramsCreatePlan } = useSelector(productionOrdersSelector)
  const { id }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id)
  const { data, refetch } = usePostProductionOrderCreatePlanQuery({
    id: id,
    params: {
      sparePart: paramsCreatePlan?.sparePart ?? 0.25,
      debug,
    },
  })
  const lot = data?.summaryWood?.[0]?.lot

  const { transformTableSummaryWood } = useProductionOrdersPlan()
  const dataSources = transformTableSummaryWood(data?.summaryWood ?? [])

  useEffect(() => {
    refetch()
  }, [paramsCreatePlan])

  useEffect(() => {
    form?.setFieldValue('sparePart', 0.25)
  }, [])

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <span>
            รายการไม้ที่ต้องใช้{' '}
            {lot && (
              <span>
                ( Lot : <span className="mx-1">{lot}</span> )
              </span>
            )}
          </span>
          {/* <Title level={5} style={{ marginTop: 0, marginBottom: 0 }}>
            Lot : <span className="mx-3">{lot}</span>
          </Title> */}
        </div>
      }
      bordered={false}
    >
      {!!data?.isWoodOutStock && (
        <div className=" text-[14px] font-medium text-danger">
          * ไม้กรอบบางรายการหมด กรุณาตรวจสอบสต๊อก
        </div>
      )}
      <Table
        dataSource={dataSources}
        columns={columns}
        pagination={false}
        bordered={false}
      />
    </Card>
  )
}
