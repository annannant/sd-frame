import { useLoaderData } from 'react-router-dom'

import { Table } from 'antd'

import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'

import columns from '../table-items/columns'

import { useGetProductionPlanByIDQuery } from 'services/production-plan'

export const TableSuggestItems = () => {
  const { id }: any = useLoaderData()
  const { data } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const dataSources = (data?.summarySuggestItems ?? []).map(
    (
      item: ITFProductionOrderItem,
      index: number
    ): ITFTableProductionOrderItem => {
      return {
        ...item,
        no: index + 1,
        key: item.id?.toString(),
      }
    }
  )

  return <Table dataSource={dataSources} columns={columns} />
}
