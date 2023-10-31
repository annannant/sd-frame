import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'

import { useGetProductionOrderByIDQuery } from 'services/production-order'

export const TableOrderItems = () => {
  const { id, action }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })

  const columns: ColumnsType<ITFTableProductionOrderItem> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: '12%',
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
      render: (text: any, record: ITFProductionOrderItem, count: any) => {
        return (
          <div className="pl-5">
            {`${record?.width} x ${record?.height}`.replaceAll('.00', '')}
          </div>
        )
      },
    },
    {
      title: 'จำนวน',
      dataIndex: 'qty',
      key: 'qty',
      width: '20%',
      align: 'center',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
    },
  ]

  const dataSource: ITFTableProductionOrderItem[] = useMemo(
    () =>
      (orderInfo?.productionOrderItems ?? [])?.map((item, index) => ({
        ...item,
        no: index + 1,
      })),
    [orderInfo?.productionOrderItems]
  )

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  )
}
