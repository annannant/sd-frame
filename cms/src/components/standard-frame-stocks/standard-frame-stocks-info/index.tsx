import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Form, Row, Select, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import { colors } from 'constants/colors'

import { filterOption } from 'helper/select-input'
import { useStandardFrameStocks } from 'hooks/useStandardFrameStocks'

import { DrawerForm } from './drawer-form/drawer-form'
import { TableWoodStandardFrameStocks } from './table-wood-std-stocks/table-wood-std-stocks'

import { setFilter } from 'app/slice/standard-frame-stocks'
import { useGetStandardFramesByIDQuery } from 'services/standard-frame'
import { useGetAllWoodsQuery } from 'services/wood'

const { Title } = Typography

export const StandardFrameStocksInfoComponent = () => {
  const dispathch = useDispatch()
  const [form] = Form.useForm()

  const { id }: any = useLoaderData()
  const { data } = useGetStandardFramesByIDQuery(id)
  const { onClickCreate } = useStandardFrameStocks()

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
      <div className="flex items-center justify-between">
        <Title level={3}>จัดการสต๊อกกรอบมาตรฐาน / {data?.name}</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={onClickCreate}>
          สร้าง
        </Button>
      </div>
      <Card
        title={
          <div className="flex justify-between">
            <div>
              รายการสต๊อกกรอบมาตรฐาน:{' '}
              <span style={{ color: colors.info }}>ขนาด {data?.name}</span>
            </div>
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
        <TableWoodStandardFrameStocks />
        <DrawerForm />
      </Card>
      <Row>
        <Col span={24}>
          <div className="mt-[30px] flex justify-end">
            <ButtonBack size="large" />
          </div>
        </Col>
      </Row>
    </>
  )
}
