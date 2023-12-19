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

import { orderBy } from 'lodash'
import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const TableWaitForPreparing = () => {
  const { transformTable } = useProductionPlans()
  const { dataOrderPrepare, refetchOrderPrepare } = useProductionOrders()

  const dataSource = transformTable(
    orderBy(dataOrderPrepare ?? [], 'updatedAt', 'asc')
  )

  useEffect(() => {
    refetchOrderPrepare()
  }, [])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
