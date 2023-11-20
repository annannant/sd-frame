import { useEffect } from 'react'

import { Table } from 'antd'

import { useStandardFrameStocks } from 'hooks/useStandardFrameStocks'

import { useColumnsWoodStandardFrameStocks } from './columns'

export const TableWoodStandardFrameStocks = () => {
  const { data, refetch, transformTable } = useStandardFrameStocks()
  const { columns, contextHolder, contextHolderModal } =
    useColumnsWoodStandardFrameStocks()
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
