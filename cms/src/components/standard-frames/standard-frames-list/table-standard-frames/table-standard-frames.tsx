import { useEffect } from 'react'

import { Table } from 'antd'

import { useStandardFrames } from 'hooks/useStandardFrames'
import { useWoodStocks } from 'hooks/useWoodStocks'

import columns, { useColumnsStandardFrames } from './columns'

import { useGetAllStandardFramesQuery } from 'services/standard-frame'

export const TableStandardFrames = () => {
  const { columns, contextHolder, contextHolderModal } =
    useColumnsStandardFrames()
  const { data, refetch } = useGetAllStandardFramesQuery()
  const { transformTable } = useStandardFrames()
  const dataSource = transformTable(data ?? [])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      {contextHolder}
      {contextHolderModal}
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
