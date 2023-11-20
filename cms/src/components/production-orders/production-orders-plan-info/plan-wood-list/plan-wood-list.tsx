import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

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
import { ITFProductionOrderPlan } from 'types/production-order-plan'

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
  usePostProductionCreatePlanQuery,
} from 'services/production-order'

const { Text } = Typography

export const PlanWoodList = () => {
  const dispatch = useDispatch()

  const form = Form.useFormInstance()
  const { paramsCreatePlan } = useSelector(productionOrdersSelector)
  const { id }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id)
  const { data, refetch } = usePostProductionCreatePlanQuery({
    id: id,
    sparePart: paramsCreatePlan?.sparePart ?? 0.25,
  })

  const { transformTableProductionOrderWood } = useProductionOrdersPlan()
  const dataSources = transformTableProductionOrderWood(data ?? {})

  useEffect(() => {
    refetch()
  }, [paramsCreatePlan])

  useEffect(() => {
    form?.setFieldValue('sparePart', 0.25)
  }, [])

  return (
    <Card
      title={
        <div className="flex justify-between">
          <span>รายการไม้ที่ต้องใช้</span>
          <span>
            Lot
            <span className="ml-3">1</span>
          </span>
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
  )
}
