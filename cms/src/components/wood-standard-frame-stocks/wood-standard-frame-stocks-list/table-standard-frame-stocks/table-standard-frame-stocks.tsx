import { useEffect, useMemo, useState } from 'react'

import { Col, Form, Row, Select, Table, Typography } from 'antd'

import { filterOption } from 'helper/select-input'
import { useStandardFrameStocksList } from 'hooks/useStandardFrameStocksList'
import { useWoodStandardFrameStocks } from 'hooks/useWoodStandardFrameStocks'

import columns from './columns'

import { useGetAllStandardFrameStocksQuery } from 'services/standard-frame-stock'
import { useGetAllWoodsQuery } from 'services/wood'

const { Text } = Typography

export const TableStandardFrameStocks = () => {
  const [form] = Form.useForm()
  const [fitler, setFilter] = useState<any>({})
  const { transformTable } = useWoodStandardFrameStocks()
  const { data, refetch } = useGetAllStandardFrameStocksQuery(fitler)
  const dataSource = transformTable(data ?? [])

  const { data: dataWoods } = useGetAllWoodsQuery()
  const options = useMemo(() => dataWoods?.options ?? [], [dataWoods])

  const handleChange = (value: string, option: any) => {
    setFilter({ woodId: value })
  }

  const handleClear = () => {
    setFilter({ woodId: '' })
  }

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    refetch()
  }, [fitler])

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form form={form} layout="vertical">
            <Form.Item label="เลือกดูตามไม้กรอบ" name="woodId">
              <Select
                onChange={handleChange}
                onClear={handleClear}
                allowClear
                showSearch
                filterOption={filterOption}
                options={options}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Table dataSource={dataSource} columns={columns} />
    </>
  )
}
