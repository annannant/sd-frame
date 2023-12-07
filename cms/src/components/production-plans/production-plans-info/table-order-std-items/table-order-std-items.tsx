import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import {
  ITFProductionPlanSuggestItem,
  ITFTableProductionPlanSuggestItem,
} from 'types/production-plan-suggest-item.type'

import { useGetProductionPlanByIDQuery } from 'services/production-plan'

export const TableOrderStandardFrameItems = () => {
  const { id }: any = useLoaderData()
  const { data } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const suggest = useMemo(() => data?.productionPlanSuggestItems ?? [], [data])

  const columns: ColumnsType<ITFTableProductionPlanSuggestItem> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: '8%',
      align: 'center',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
    },
    {
      title: 'ขนาด',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
    },
    {
      title: 'จำนวน',
      dataIndex: 'qty',
      key: 'qty',
      width: '15%',
      align: 'center',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
    },
  ]

  const dataSource: ITFProductionPlanSuggestItem[] =
    useMemo((): ITFTableProductionPlanSuggestItem[] => {
      return suggest?.map((item, index) => ({
        ...item,
        key: `${item.id}`,
        no: index + 1,
      }))
    }, [suggest])

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
