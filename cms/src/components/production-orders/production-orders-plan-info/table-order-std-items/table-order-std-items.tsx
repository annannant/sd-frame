import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ITFProductionOrderItem } from 'types/production-order-items.type'
import { ITFProductionOrderPlanSuggest } from 'types/production-order-plan.type'

import { productionOrdersSelector } from 'app/slice/production-orders'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionOrderCreatePlanQuery,
} from 'services/production-order'

export const TableOrderStandardFrameItems = () => {
  const [searchParams] = useSearchParams()
  const debug = searchParams.get('debug') ?? undefined

  const { paramsCreatePlan } = useSelector(productionOrdersSelector)
  const { id }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })
  const { data } = usePostProductionOrderCreatePlanQuery({
    id: id,
    params: {
      ...paramsCreatePlan,
      debug,
    },
  })
  const { suggest } = data ?? {}

  const columns: ColumnsType<ITFProductionOrderPlanSuggest> = [
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
      dataIndex: 'size',
      key: 'size',
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

  const dataSource: ITFProductionOrderPlanSuggest[] = useMemo(
    () =>
      (suggest ?? [])?.map((item, index) => ({
        ...item,
        key: `${item.no}`,
        no: index + 1,
      })),
    [suggest]
  )

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
