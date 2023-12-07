import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Table, Typography } from 'antd'

import { currency } from 'helper/number'
import { useWoodStocks } from 'hooks/useWoodStocks'

import columns from './columns'

import { useGetWoodStocksByWoodIDQuery } from 'services/wood-stock'

const { Text } = Typography

export const TableLots = () => {
  const { id }: any = useLoaderData()

  const { transformTableLots } = useWoodStocks()
  const { data, refetch } = useGetWoodStocksByWoodIDQuery(id)
  const dataSource = transformTableLots(data?.data ?? [])

  useEffect(() => {
    refetch()
  }, [])

  const summary = () => {
    return (
      <Table.Summary.Row style={{ fontWeight: 700 }}>
        <Table.Summary.Cell index={0} align="right">
          รวม
        </Table.Summary.Cell>
        <Table.Summary.Cell index={1} align="right">
          <div className="px-[20px]">
            {currency(data?.summary?.totalStock ?? 0)}
          </div>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={2} align="right">
          <div className="px-[20px]">
            {currency(data?.summary?.totalUsed ?? 0)}
          </div>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={3} align="right">
          <div className="px-[20px]">
            {currency(
              (data?.summary?.totalStock ?? 0) - (data?.summary?.totalUsed ?? 0)
            )}
          </div>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={4} align="right">
          <div className="px-[20px]"></div>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={5} align="right">
          <div className="px-[20px]">เส้น</div>
        </Table.Summary.Cell>
        <Table.Summary.Cell
          index={5}
          colSpan={2}
          align="right"
        ></Table.Summary.Cell>
      </Table.Summary.Row>
    )
  }

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      summary={summary}
      pagination={false}
    />
  )
}
