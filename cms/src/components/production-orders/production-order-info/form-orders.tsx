import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import {
  MinusCircleOutlined,
  MinusCircleTwoTone,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd'

import { ModalStandardSize } from 'common/modal/modal-standard-size/modal-standard-size'

import { colors } from 'constants/colors'

import { filterOption } from 'helper/select-input'

import { Container } from './form-orders.styles'

import { standardSizeSelector } from 'app/slice/standard-size'
import { keyBy } from 'lodash'

const { Text } = Typography

export const FormOrders = () => {
  const form = Form.useFormInstance()

  const [selectedSize, setSelectedSize] = useState<any>({})
  const listOption = useSelector(standardSizeSelector).listOption
  const options = useMemo(() => {
    return listOption?.map((item) => {
      return {
        ...item,
        disabled: selectedSize[item.value ?? ''],
      }
    })
  }, [listOption, selectedSize])

  const [isModalOpen, setIsModalOpen] = useState(true)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleOnChange = (value: number) => {
    const standard = form?.getFieldValue('standard')
    setSelectedSize(keyBy(standard?.filter(Boolean), 'size'))
  }

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
        <Divider
          orientation="left"
          orientationMargin="0"
          className="mb-[20px] mt-[20px]"
        >
          ขนาดมาตรฐาน (Standard Size)
        </Divider>
        <Form.List name="standard">
          {(fields, { add, remove }) => (
            <>
              <Row gutter={[50, 10]} className="mb-[20px]">
                <Col span={4} className="flex items-center justify-center">
                  <Text strong>No.</Text>
                </Col>
                {/* <Col span={4} className="flex items-center justify-center">
                    <Text strong>ประเภท</Text>
                  </Col> */}
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
                      <Col
                        span={12}
                        className="flex items-center justify-start gap-3"
                      >
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
                      </Col>
                      <Col span={6} className="flex justify-start">
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
                  onClick={() => add()}
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
        <Divider orientation="left" orientationMargin="0" className="mb-[20px]">
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
                      <Col
                        span={12}
                        className="flex items-center justify-start gap-3"
                      >
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
        </Form.List>
      </Container>
    </ConfigProvider>
  )
}

export default FormOrders
