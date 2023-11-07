import { useEffect } from 'react'

import { Table } from 'antd'

import { useWoodTypes } from 'hooks/useWoodTypes'

import columns from './columns'

import { useGetAllWoodTypesQuery } from 'services/wood-type'

export const TableWoodTypes = () => {
  const { transformTable } = useWoodTypes()
  const { data, refetch } = useGetAllWoodTypesQuery()
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
