import { useEffect } from 'react'

import { Table } from 'antd'

import { useStandardFrameStocksList } from 'hooks/useStandardFrameStocksList'

import columns from './columns'

import { useGetAllStandardFrameStocksByStandardFramesQuery } from 'services/standard-frame-stock'

export const TableStandardFrameStocks = () => {
  const { transformStandardFrameList } = useStandardFrameStocksList()
  const { data, refetch } = useGetAllStandardFrameStocksByStandardFramesQuery()
  const dataSource = transformStandardFrameList(data ?? [])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
