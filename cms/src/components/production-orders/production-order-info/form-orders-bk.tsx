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
  Row,
  Select,
  Typography,
} from 'antd'

import { colors } from 'constants/colors'

import { Container } from './form-orders.styles'

const { Text, Title } = Typography

export const FormOrders = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form:', values)
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
      <Container>
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
          size="large"
          className="px-[30px]"
        >
          <Divider
            orientation="left"
            orientationMargin="0"
            className="mb-[20px]"
          >
            ขนาดมาตรฐาน (Standard Size)
          </Divider>
          {/* <div className="mb-[20px]">
            <span className="text-sm font-semibold text-primary">
              ขนาดมาตรฐาน (Standard Size)
            </span>
          </div> */}
          <Form.List name="users2">
            {(fields, { add, remove }) => (
              <>
                <Row gutter={[20, 10]} className="mb-[20px]">
                  <Col span={4} className="flex items-center justify-center">
                    <Text strong>No.</Text>
                  </Col>
                  {/* <Col span={3} className="flex items-center justify-center">
                    <Text strong>ประเภท</Text>
                  </Col> */}
                  <Col span={12} className="flex items-center justify-center">
                    <Text strong>ขนาด</Text>
                  </Col>
                  <Col span={6} className="flex items-center justify-center">
                    <Text strong>จำนวน</Text>
                  </Col>
                </Row>
                <Row gutter={[20, 28]} className="mb-[30px]">
                  {fields.map(({ key, name, ...restField }) => (
                    <Col span={24}>
                      <Row gutter={[20, 20]}>
                        <Col
                          span={4}
                          className="flex items-center justify-center"
                        >
                          <Text>{key + 1}</Text>
                        </Col>
                        {/* <Col
                          span={3}
                          className="flex items-center justify-center"
                        >
                          <Text>มาตรฐาน</Text>
                        </Col> */}
                        <Col
                          span={12}
                          className="flex items-center justify-start gap-3"
                        >
                          <div className="flex-1">
                            <Form.Item
                              {...restField}
                              name={[name, 'first']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing first name',
                                },
                              ]}
                              className="w-full"
                            >
                              {/* <Input placeholder="ขนาด" /> */}
                              <Select
                                defaultValue="lucy"
                                // style={{ width: 120 }}
                                onChange={() => {}}
                                options={[
                                  { value: 'jack', label: 'Jack' },
                                  { value: 'lucy', label: 'Lucy' },
                                  { value: 'Yiminghe', label: 'yiminghe' },
                                  {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                  },
                                ]}
                              />
                            </Form.Item>
                          </div>
                          {/* <div className="w-[10px] text-center">x</div>
                          <div className="flex-1">
                            <Form.Item
                              {...restField}
                              name={[name, 'first2']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing first name',
                                },
                              ]}
                              className="w-full"
                            >
                              <Input placeholder="ขนาด" />
                            </Form.Item>
                          </div>
                          <div className="w-[50px]">
                            <Text>นิ้ว</Text>
                          </div> */}
                        </Col>
                        <Col span={6} className="flex justify-start">
                          <Form.Item
                            {...restField}
                            name={[name, 'last']}
                            rules={[
                              { required: true, message: 'Missing last name' },
                            ]}
                            className="flex-1"
                          >
                            <Input placeholder="จำนวน" />
                          </Form.Item>
                        </Col>
                        <Col
                          span={2}
                          className="flex items-center justify-start"
                        >
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
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <div className="mb-[30px]"></div>
          <Divider
            orientation="left"
            orientationMargin="0"
            className="mb-[20px]"
          >
            ขนาดพิเศษ (Custom Size)
          </Divider>

          {/* <div className="mb-[20px]">
            <span className="text-sm font-semibold text-primary">
              ขนาดพิเศษ (Custom Size)
            </span>
          </div> */}
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                <Row gutter={[20, 10]} className="mb-[20px]">
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
                <Row gutter={[20, 28]} className="mb-[30px]">
                  {fields.map(({ key, name, ...restField }) => (
                    <Col span={24}>
                      <Row gutter={[20, 20]}>
                        <Col
                          span={4}
                          className="flex items-center justify-center"
                        >
                          <Text>{key + 1}</Text>
                        </Col>
                        <Col
                          span={12}
                          className="flex items-center justify-start gap-3"
                        >
                          <div className="flex-1">
                            <Form.Item
                              {...restField}
                              name={[name, 'first']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing first name',
                                },
                              ]}
                              className="w-full"
                            >
                              <Input placeholder="ขนาด" />
                            </Form.Item>
                          </div>
                          <div className="w-[8px] text-center">x</div>
                          <div className="flex-1">
                            <Form.Item
                              {...restField}
                              name={[name, 'first2']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Missing first name',
                                },
                              ]}
                              className="w-full"
                            >
                              <Input placeholder="ขนาด" />
                            </Form.Item>
                          </div>
                          <div className="w-[50px]">
                            <Text>นิ้ว</Text>
                          </div>
                        </Col>
                        <Col span={6} className="flex justify-start">
                          <Form.Item
                            {...restField}
                            name={[name, 'last']}
                            rules={[
                              { required: true, message: 'Missing last name' },
                            ]}
                            className="flex-1"
                          >
                            <Input placeholder="จำนวน" />
                          </Form.Item>
                        </Col>
                        <Col
                          span={2}
                          className="flex items-center justify-start"
                        >
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
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Container>
    </ConfigProvider>
  )
}

export default FormOrders
