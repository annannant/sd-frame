import { useEffect, useMemo } from 'react'

import { Table } from 'antd'

import {
  CUTTING_INPROGRESS,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'

import { useProductionPlanOrders } from 'hooks/useProductionPlanOrders'

import columns from '../columns'

import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const TableOrdersInprogress = () => {
  const { transformTable } = useProductionPlanOrders()
  const { data, refetch } = useGetAllProductionOrdersQuery({
    statuses: [CUTTING_INPROGRESS, WAIT_FOR_PREPARING, PREPARING_INPROGRESS],
  })

  const dataSource = transformTable(data ?? [])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
