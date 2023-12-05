import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import {
  Button,
  Col,
  Drawer,
  Form,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from 'antd'

import { ITFWoodOption } from 'types/wood-option.type'

import { filterOption } from 'helper/select-input'
import { useStandardFrameStocks } from 'hooks/useStandardFrameStocks'

import { standardFrameStockSelector } from 'app/slice/standard-frame-stocks'
import { setShowDrawer } from 'app/slice/standard-frame-stocks'
import { useGetStandardFramesByIDQuery } from 'services/standard-frame'
import { useGetAllStandardFrameStocksByStandardFrameIDQuery } from 'services/standard-frame-stock'
import { useGetAllWoodsQuery } from 'services/wood'

const { Text, Title } = Typography

interface DrawerFormProps {}
export const DrawerForm = (props: DrawerFormProps) => {
  const dispatch = useDispatch()
  const [formInstance] = Form.useForm()
  const { id, data, contextHolder, onFinish } = useStandardFrameStocks()
  const { data: dataStandardFrame } = useGetStandardFramesByIDQuery(id)
  const { data: dataWoods } = useGetAllWoodsQuery()
  const { isShowDrawer, dataEdit, isEdit, filter } = useSelector(
    standardFrameStockSelector
  )

  const form = isShowDrawer ? formInstance : undefined
  const options = useMemo(() => {
    return (dataWoods?.options ?? []).map((item: ITFWoodOption) => ({
      ...item,
      disabled: !!data?.find((i: any) => i.woodId === item.value),
    }))
  }, [dataWoods, data])

  const title = isEdit ? 'แก้ไขสต๊อกกรอบมาตรฐาน' : 'เพิ่มสต๊อกกรอบมาตรฐาน'

  const onClose = () => {
    dispatch(setShowDrawer(false))
  }

  const handleChange = (value: string, option: any) => {
    // dispatch(setSelected(option?.data ?? null))
  }

  const handleClear = () => {
    // dispatch(setSelected(null))
  }

  useEffect(() => {
    if (dataEdit.woodId && dataEdit.standardFrameId) {
      form?.setFieldsValue({
        woodId: dataEdit?.woodId,
        stock: dataEdit?.stock,
        inprogressStock: dataEdit?.inprogressStock,
        reorderPoint: dataEdit?.reorderPoint,
      })
    } else {
      form?.setFieldsValue({
        woodId: filter.woodId ?? null,
        stock: '',
        inprogressStock: '',
        reorderPoint: dataStandardFrame?.defaultReorderPoint,
      })
    }
  }, [form, dataEdit, dataStandardFrame])

  return (
    <>
      {contextHolder}
      <Drawer
        title={title}
        placement={'right'}
        width={500}
        onClose={onClose}
        open={isShowDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={() => form?.submit()}>
              OK
            </Button>
          </Space>
        }
      >
        <div>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <div className="mb-[15px] mt-[-15px]">
              <Text className="font-title text-md m-0">ขนาดกรอบมาตรฐาน</Text>
              <Title
                level={5}
                className="font-title text-xs"
                style={{ marginTop: 10, marginBottom: 25, paddingLeft: 10 }}
              >
                {dataStandardFrame?.name}
              </Title>
            </div>
            <Form.Item
              label="ไม้กรอบ"
              name="woodId"
              rules={[
                {
                  required: true,
                  message: 'ระบุไม้กรอบ',
                },
              ]}
            >
              <Select
                onChange={handleChange}
                onClear={handleClear}
                allowClear
                showSearch
                filterOption={filterOption}
                options={options}
                placeholder="ไม้กรอบ"
              />
            </Form.Item>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="stock"
                  label="สต๊อก"
                  rules={[
                    {
                      required: true,
                      message: 'ระบุสต๊อก',
                    },
                  ]}
                >
                  <InputNumber placeholder="สต๊อก" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="inprogressStock" label="สต๊อกที่กำลังผลิต">
                  <InputNumber
                    placeholder="สต๊อก"
                    style={{ width: '100%' }}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 20]}>
              <Col span={12}>
                <Form.Item
                  name="reorderPoint"
                  label="จุดสั่งผลิต (Reorder Point)"
                >
                  <InputNumber
                    placeholder="จุดสั่งผลิต (Reorder Point)"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Drawer>
    </>
  )
}
