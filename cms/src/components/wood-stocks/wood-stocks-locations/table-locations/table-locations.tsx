import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Table, Typography } from 'antd'

import { ITFTableListWoodStockLocation } from 'types/wood-stock-location.type'

import { useWoodStockLocations } from 'hooks/useWoodStockLocations'

import columns from './columns'

import { useGetWoodStocksLocationByWoodIDQuery } from 'services/wood-stock-location'

const { Title } = Typography

export const TableLocations = () => {
  const { id }: any = useLoaderData()

  const { transformStockLocations } = useWoodStockLocations()
  const { data, refetch } = useGetWoodStocksLocationByWoodIDQuery(id)
  const locations = transformStockLocations(data ?? [])

  useEffect(() => {
    refetch()
  }, [])

  const summary = (pageData: any) => {
    let totalStock = 0

    pageData.forEach(({ remaining }: any) => {
      totalStock += remaining
    })

    return (
      <Table.Summary.Row style={{ fontWeight: 700 }}>
        <Table.Summary.Cell index={0} align="right">
          รวม
        </Table.Summary.Cell>
        <Table.Summary.Cell index={1} align="right">
          <div className="px-[20px]">{totalStock}</div>
        </Table.Summary.Cell>
        <Table.Summary.Cell index={2} align="right">
          <div className="px-[20px]">เส้น</div>
        </Table.Summary.Cell>
      </Table.Summary.Row>
    )
  }

  return (
    <div className="">
      {locations?.map((item: ITFTableListWoodStockLocation) => {
        return (
          <div key={item.key}>
            <div className="flex">
              <Title level={5}>
                {item.location?.code} - {item.location?.address}
              </Title>
            </div>
            <Table
              className="ml-[30px]"
              dataSource={item.dataSource}
              columns={columns}
              summary={summary}
              pagination={false}
            />
          </div>
        )
      })}
    </div>
  )
}
