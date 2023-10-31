import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import {
  MinusCircleOutlined,
  MinusCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  ConfigProvider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  Typography,
} from 'antd'

import { colors } from 'constants/colors'

import { filterOption } from 'helper/select-input'

import { Container } from './form-orders.styles'

import { keyBy } from 'lodash'
import { useGetProductionOrderByIDQuery } from 'services/production-order'
import { useGetAllStandardFramesQuery } from 'services/standard-frame'

const { Text } = Typography

export const FormOrders = () => {
  const form = Form.useFormInstance()
  const formValues = Form.useWatch('orderItems', form)

  const [selectedSize, setSelectedSize] = useState<any>({})

  const { id, action }: any = useLoaderData()
  const { data } = useGetAllStandardFramesQuery()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })

  const options = useMemo(() => {
    return data?.options?.map((item) => {
      return {
        ...item,
        disabled: selectedSize[item.value ?? ''],
      }
    })
  }, [data?.options, selectedSize])

  const handleOnChange = (value: number) => {
    const orderItems = form?.getFieldValue('orderItems')
    setSelectedSize(keyBy(orderItems?.filter(Boolean), 'size'))
  }

  const initialChecked: boolean = useMemo(() => {
    return !!formValues?.[formValues.length - 2]?.isCustomSize
  }, [formValues])

  useEffect(() => {
    if (id && orderInfo) {
      console.log('orderInfo:', orderInfo?.productionOrderItems)
      form?.setFieldValue(
        'orderItems',
        orderInfo?.productionOrderItems?.map((item) => ({
          ...item,
          size: item?.standardFrame?.id,
        }))
      )
    } else {
      form?.setFieldValue('orderItems', [])
    }
  }, [options, id, orderInfo, form])

  useEffect(() => {
    // const data = [
    //   { isCustomSize: true, width: 24, height: 25, qty: 1 },
    //   { isCustomSize: true, width: 12, height: 24, qty: 2 },
    //   { isCustomSize: true, width: 12, height: 23, qty: 1 },
    //   { isCustomSize: true, width: 20, height: 20, qty: 1 },
    //   { isCustomSize: false, size: 26, name: '10x12', qty: 3 },
    //   { isCustomSize: false, size: 27, name: '10x15', qty: 5 },
    //   { isCustomSize: false, size: 24, name: '8x10', qty: 6 },
    // ]
    // setSelectedSize(keyBy(data?.filter(Boolean), 'size'))
    // // for (const iterator of Object.keys(data)) {
    // // }
    // // form?.setFieldValue('orderItems', data)
  }, [])

  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Form: {
            itemMarginBottom: 0,
          },
        },
      }}
    >
      <Container className="px-[30px]">
        {/* <Divider
          orientation="left"
          orientationMargin="0"
          className="mb-[20px] mt-[20px]"
        >
          ขนาดมาตรฐาน (Standard Size)
        </Divider> */}
        <Form.List
          name="orderItems"
          // initialValue={[{ isCustomSize: true, size: 2, qty: 1 }]}
        >
          {(fields, { add, remove }) => (
            <>
              <Row gutter={[50, 10]} className="mb-[20px]">
                <Col span={2} className="flex items-center justify-center">
                  <Text strong>No.</Text>
                </Col>
                <Col span={4} className="flex items-center justify-center">
                  <Text strong>ขนาดพิเศษ</Text>
                </Col>
                <Col span={10} className="flex items-center justify-center">
                  <Text strong>ขนาด</Text>
                </Col>
                <Col span={4} className="flex items-center justify-center">
                  <Text strong>จำนวน</Text>
                </Col>
              </Row>
              <Row gutter={[50, 28]} className="mb-[30px]">
                {!fields.length && (
                  <Col span={24}>
                    <div className=""></div>
                  </Col>
                )}
                {fields.map(({ key, name, ...restField }, index) => (
                  <Col span={24} key={key}>
                    <Row gutter={[40, 20]}>
                      <Col
                        span={2}
                        className="flex items-center justify-center"
                      >
                        <Text>{index + 1}</Text>
                      </Col>
                      <Col
                        span={4}
                        className="flex items-center justify-center"
                      >
                        <Form.Item
                          {...restField}
                          valuePropName="checked"
                          name={[name, 'isCustomSize']}
                          noStyle
                          initialValue={initialChecked}
                        >
                          <Switch
                            checkedChildren="Yes"
                            unCheckedChildren="No"
                          />
                        </Form.Item>
                      </Col>

                      <Col
                        span={10}
                        className="flex items-center justify-start gap-3"
                      >
                        {formValues?.[index]?.isCustomSize ? (
                          <>
                            <div className="flex-1">
                              <Form.Item
                                {...restField}
                                name={[name, 'width']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'ระบุความกว้าง',
                                  },
                                ]}
                                className="w-full"
                              >
                                <InputNumber
                                  min={1}
                                  max={120}
                                  placeholder="กว้าง"
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </div>
                            <div className="w-[8px] text-center">x</div>
                            <div className="flex-1">
                              <Form.Item
                                {...restField}
                                name={[name, 'height']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'ระบุความยาว',
                                  },
                                ]}
                                className="w-full"
                              >
                                <InputNumber
                                  min={1}
                                  max={120}
                                  placeholder="ยาว"
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </div>
                            <div className="w-[20px]">
                              <Text>นิ้ว</Text>
                            </div>
                          </>
                        ) : (
                          <div className="flex-1">
                            <Form.Item
                              {...restField}
                              name={[name, 'size']}
                              rules={[
                                {
                                  required: true,
                                  message: 'ระบุขนาด',
                                },
                              ]}
                              className="w-full"
                            >
                              <Select
                                showSearch
                                onChange={handleOnChange}
                                options={options}
                                filterOption={filterOption}
                              />
                            </Form.Item>
                          </div>
                        )}
                      </Col>
                      <Col span={4} className="flex justify-start">
                        <Form.Item
                          {...restField}
                          name={[name, 'qty']}
                          rules={[{ required: true, message: 'ระบุจำนวน' }]}
                          className="flex-1"
                        >
                          <Input placeholder="จำนวน" />
                        </Form.Item>
                      </Col>
                      <Col span={2} className="flex items-center justify-start">
                        <MinusCircleTwoTone
                          twoToneColor={colors.danger}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add()
                  }}
                  block
                  icon={<PlusOutlined />}
                >
                  เพิ่มรายการ
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <div className="mb-[60px]"></div>
        {/* <Divider orientation="left" orientationMargin="0" className="mb-[20px]">
          ขนาดพิเศษ (Custom Size)
        </Divider>
        <Form.List name="customize">
          {(fields, { add, remove }) => (
            <>
              <Row gutter={[50, 10]} className="mb-[20px]">
                <Col span={4} className="flex items-center justify-center">
                  <Text strong>No.</Text>
                </Col>
                <Col span={12} className="flex items-center justify-center">
                  <Text strong>ขนาด</Text>
                </Col>
                <Col span={6} className="flex items-center justify-center">
                  <Text strong>จำนวน</Text>
                </Col>
              </Row>
              <Row gutter={[50, 28]} className="mb-[30px]">
                {!fields.length && (
                  <Col span={24}>
                    <div className=""></div>
                  </Col>
                )}
                {fields.map(({ key, name, ...restField }, index) => (
                  <Col span={24} key={key}>
                    <Row gutter={[40, 20]}>
                      <Col
                        span={4}
                        className="flex items-center justify-center"
                      >
                        <Text>{index + 1}</Text>
                      </Col>

                      <Col span={6} className="flex justify-start">
                        <Form.Item
                          {...restField}
                          name={[name, 'qty']}
                          rules={[{ required: true, message: 'ระบุจำนวน' }]}
                          className="flex-1"
                        >
                          <InputNumber
                            min={1}
                            max={1000}
                            placeholder="จำนวน"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={2} className="flex items-center justify-start">
                        <MinusCircleTwoTone
                          twoToneColor={colors.danger}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    </Row>
                  </Col>
                  // <Space
                  //   key={key}
                  //   style={{ display: 'flex', marginBottom: 8 }}
                  //   align="baseline"
                  // >
                  //   <Form.Item
                  //     {...restField}
                  //     name={[name, 'first']}
                  //     rules={[{ required: true, message: 'Missing first name' }]}
                  //   >
                  //     <Input placeholder="First Name" />
                  //   </Form.Item>
                  //   <Form.Item
                  //     {...restField}
                  //     name={[name, 'last']}
                  //     rules={[{ required: true, message: 'Missing last name' }]}
                  //   >
                  //     <Input placeholder="Last Name" />
                  //   </Form.Item>
                  //   <MinusCircleOutlined onClick={() => remove(name)} />
                  // </Space>
                ))}
              </Row>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  เพิ่มรายการ
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List> */}
      </Container>
    </ConfigProvider>
  )
}

export default FormOrders
