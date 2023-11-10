import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Table } from 'antd'

import { useWoods } from 'hooks/useWoods'

import columns from './columns'

import { useGetWoodsByWoodTypeIDQuery } from 'services/wood-type'

export const TableWoods = () => {
  const { id }: any = useLoaderData()

  const { data, refetch } = useGetWoodsByWoodTypeIDQuery(id)
  const { transformTable } = useWoods()
  const dataSource = transformTable(data?.woods ?? [])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
