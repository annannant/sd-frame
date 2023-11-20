import { useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Card, Form, Select, Typography } from 'antd'

import { filterOption } from 'helper/select-input'

import { TableStandardFrameStocks } from './table-standard-frame-stocks/table-standard-frame-stocks'

import { setFilter } from 'app/slice/standard-frame-stocks'
import { useGetAllWoodsQuery } from 'services/wood'

const { Title } = Typography

export const StandardFrameStocksListComponent = () => {
  const dispathch = useDispatch()
  const [form] = Form.useForm()

  const { data: dataWoods } = useGetAllWoodsQuery()
  const options = useMemo(() => dataWoods?.options ?? [], [dataWoods])

  const handleChange = (value: string, option: any) => {
    const filter = { woodId: value ? +value : undefined }
    dispathch(setFilter(filter))
    localStorage.setItem('filter', JSON.stringify(filter))
  }

  const handleClear = () => {
    const filter = { woodId: undefined }
    dispathch(setFilter(filter))
    localStorage.setItem('filter', JSON.stringify(filter))
  }

  useEffect(() => {
    const fitler = JSON.parse(localStorage.getItem('filter') ?? '{}')
    console.log('fitler:', fitler)
    dispathch(setFilter(fitler))
    form.setFieldValue('woodId', fitler.woodId)
  }, [])

  return (
    <>
      <Title level={3}>จัดการสต๊อกกรอบมาตรฐาน</Title>
      <Card
        title={
          <div className="flex items-center justify-between">
            <div>รายการสต๊อกกรอบมาตรฐาน</div>
            <div className="flex items-center">
              <Form form={form}>
                <Form.Item
                  label="เลือกดูตามไม้กรอบ"
                  name="woodId"
                  style={{ margin: 0 }}
                >
                  <Select
                    style={{ width: 400 }}
                    onChange={handleChange}
                    onClear={handleClear}
                    allowClear
                    showSearch
                    filterOption={filterOption}
                    options={options}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        }
        bordered={false}
      >
        <TableStandardFrameStocks />
      </Card>
    </>
  )
}
