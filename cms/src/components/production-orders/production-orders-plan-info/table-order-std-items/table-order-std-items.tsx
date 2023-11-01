import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ITFProductionOrderItem } from 'types/production-order-items.type'
import { ITFProductionOrderPlanSuggest } from 'types/production-order-plan'

import {
  useGetProductionOrderByIDQuery,
  usePostProductionCreatePlanQuery,
} from 'services/production-order'

export const TableOrderStdItems = () => {
  const { id, action }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })
  const { isLoading, data } = usePostProductionCreatePlanQuery(id)
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
      // render: (text: any, record: ITFProductionOrderItem, count: any) => {
      //   if (record?.isCustomSize) {
      //     return (
      //       <div className="">
      //         {`${record?.width}x${record?.height}`.replaceAll('.00', '')}
      //       </div>
      //     )
      //   }
      //   return <div className="">{`${record?.standardFrame?.name}`}</div>
      // },
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
