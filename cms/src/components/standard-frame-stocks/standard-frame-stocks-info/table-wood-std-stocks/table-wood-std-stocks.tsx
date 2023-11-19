import { useEffect } from 'react'

import { Table } from 'antd'

import { useStandardFrameStocks } from 'hooks/useStandardFrameStocks'

import { useColumnsWoodStdStocks } from './columns'

export const TableWoodStdStocks = () => {
  const { data, refetch, transformTable } = useStandardFrameStocks()
  const { columns, contextHolder, contextHolderModal } =
    useColumnsWoodStdStocks()
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
