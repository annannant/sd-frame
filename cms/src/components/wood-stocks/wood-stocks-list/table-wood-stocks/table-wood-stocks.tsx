import { useEffect } from 'react'

import { Table } from 'antd'

import { useWoodStocks } from 'hooks/useWoodStocks'

import columns from './columns'

import { useGetAllWoodStocksByWoodsQuery } from 'services/wood-stock'

export const TableWoodStocks = () => {
  const { transformTableWoods } = useWoodStocks()
  const { data, refetch } = useGetAllWoodStocksByWoodsQuery()
  const dataSource = transformTableWoods(data ?? [])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
