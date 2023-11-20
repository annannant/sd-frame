import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ITFProductionOrderItem } from 'types/production-order-items.type'
import { ITFProductionOrderPlanSuggest } from 'types/production-order-plan'

import { productionOrdersSelector } from 'app/slice/production-orders'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionCreatePlanQuery,
} from 'services/production-order'

export const TableOrderStandardFrameItems = () => {
  const { paramsCreatePlan } = useSelector(productionOrdersSelector)
  const { id }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })
  const { data } = usePostProductionCreatePlanQuery({
    ...paramsCreatePlan,
    id: id,
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
