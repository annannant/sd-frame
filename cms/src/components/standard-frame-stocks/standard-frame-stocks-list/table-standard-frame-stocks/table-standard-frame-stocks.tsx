import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Table } from 'antd'

import { useStandardFrameStocksList } from 'hooks/useStandardFrameStocksList'

import columns from './columns'

import { standardFrameStockSelector } from 'app/slice/standard-frame-stocks'
import { useGetAllStandardFrameStocksByStandardFramesQuery } from 'services/standard-frame-stock'

export const TableStandardFrameStocks = () => {
  const { filter } = useSelector(standardFrameStockSelector)

  const { transformStandardFrameList } = useStandardFrameStocksList()
  const { data, refetch } =
    useGetAllStandardFrameStocksByStandardFramesQuery(filter)
  const dataSource = transformStandardFrameList(data ?? [])

  useEffect(() => {
    refetch()
  }, [filter])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
