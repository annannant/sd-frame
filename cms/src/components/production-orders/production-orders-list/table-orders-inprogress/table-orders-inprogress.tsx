import { useEffect, useMemo } from 'react'

import { Table } from 'antd'

import {
  CUTTING_INPROGRESS,
  PREPARING_INPROGRESS,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'

import { useProductionOrders } from 'hooks/useProductionOrders'
import { useProductionPlans } from 'hooks/useProductionPlans'

import columns from '../columns'

import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const TableOrdersInprogress = () => {
  const { transformTable } = useProductionPlans()
  const { dataOrderInprogress, refetchOrderInprogress } = useProductionOrders()

  const dataSource = transformTable(dataOrderInprogress ?? [])

  useEffect(() => {
    refetchOrderInprogress()
  }, [])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
