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
import { CREATE, EDIT } from 'constants/common'

import { filterOption } from 'helper/select-input'

import { Container } from './form-orders.styles'

import { keyBy } from 'lodash'
import { useGetProductionOrderByIDQuery } from 'services/production-order'
import { useGetAllActiveStandardFramesQuery } from 'services/standard-frame'

const { Text } = Typography

export const FormOrders = () => {
  const form = Form.useFormInstance()
  const formValues = Form.useWatch('orderItems', form)

  const [selectedSize, setSelectedSize] = useState<any>({})

  const { id, action }: any = useLoaderData()
  const { data } = useGetAllActiveStandardFramesQuery()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id, { skip: !id })

  const isEdit = action === EDIT
  const isCreate = action === CREATE

  const options = useMemo(() => {
    return data?.options?.map((item) => {
      return {
        ...item,
        disabled: selectedSize[item.value ?? ''],
      }
    })
  }, [data?.options, selectedSize])

  const handleOnChange = (index: number, value: number, option: any) => {
    const orderItems = form?.getFieldValue('orderItems')
    setSelectedSize(keyBy(orderItems?.filter(Boolean), 'size'))
  }

  const initialChecked: boolean = useMemo(() => {
    return !!formValues?.[formValues.length - 2]?.isCustomSize
  }, [formValues])

  useEffect(() => {
    if (isEdit && orderInfo) {
      form?.setFieldValue(
        'orderItems',
        orderInfo?.productionOrderItems?.map((item) => ({
          ...item,
          size: item?.standardFrame?.id,
        }))
      )
      // set selected size
      setSelectedSize(
        keyBy(
          orderInfo?.productionOrderItems?.filter(Boolean),
          'standardFrameId'
        )
      )
    } else {
      form?.setFieldValue('orderItems', [])
      setSelectedSize([])
    }
    // }, [options, id, orderInfo, form, isEdit])
  }, [isEdit, orderInfo, form])

  useEffect(() => {}, [])

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
                                onChange={(value: any, opton: any) =>
                                  handleOnChange(index, value, opton)
                                }
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
                        <Form.Item
                          {...restField}
                          name={[name, 'id']}
                          className="flex-1"
                        >
                          <Input type="hidden" />
                        </Form.Item>
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
