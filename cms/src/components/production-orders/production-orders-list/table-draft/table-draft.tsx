import { useEffect } from 'react'

import { Table } from 'antd'

import { DRAFT, WAIT_FOR_CUTTING } from 'constants/current-status.constant'

import { useProductionPlans } from 'hooks/useProductionPlans'

import columns from '../columns'

import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const TableDraft = () => {
  const { transformTable } = useProductionPlans()
  const { data, refetch } = useGetAllProductionOrdersQuery({
    statuses: [DRAFT],
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
