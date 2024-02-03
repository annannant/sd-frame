import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Card, Row, Table } from 'antd'

import { useWoods } from 'hooks/useWoods'

import columns from './columns'

import { useGetWoodsByWoodTypeIDQuery } from 'services/wood-type'

export const TableWoodsItems = () => {
  const { id }: any = useLoaderData()

  const { data, refetch } = useGetWoodsByWoodTypeIDQuery(id)
  const { transformTable } = useWoods()
  const dataSource = transformTable(data?.woods ?? [])

  useEffect(() => {
    refetch()
  }, [])

  return <Row></Row>
}
