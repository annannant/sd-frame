import { useLoaderData } from 'react-router-dom'

import { Card, Col, Form, Input, Row, Select } from 'antd'
import { Typography } from 'antd'

import TableOrders from 'components/production-orders/production-order-info/table-orders'

const { Title, Text } = Typography
export const ProductionOrdersInfo = () => {
  const { id, action }: any = useLoaderData()
  console.log('id:', id)
  console.log('action:', action)

  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <>
      <Title level={3}>สั่งผลิต / สร้างคำสั่งผลิต</Title>
      <div className="grid gap-y-[20px]">
        <Card title="ข้อมูลไม้กรอบ" bordered={false}>
          <div className="grid gap-y-[20px]">
            <Row gutter={[0, 30]}>
              <Col span={12}>
                <Row className="mb-[15px]">
                  <Col span={24}>
                    <Text>ไม้กรอบ</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <Form layout="vertical" size="large">
                      <Form.Item label="">
                        <Select
                          defaultValue="lucy"
                          onChange={handleChange}
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
                        <div className="mt-[5px]">
                          <Text type="secondary" className="font-title text-xs">
                            เลือกไม้กรอบที่ต้องการสั่งผลิต
                          </Text>
                        </div>
                      </Form.Item>
                    </Form>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row className="mb-[15px]">
                  <Col span={24}>
                    <Text>รายละเอียดไม้</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <Row gutter={[0, 10]}>
                      <Col span={24}>
                        <Row>
                          <Col span={5} className="text-right">
                            <Text type="secondary">รหัส</Text>
                          </Col>
                          <Col span={18} className="pl-[40px] ">
                            <Text className="text-font-title">1217</Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          <Col span={5} className="text-right">
                            <Text type="secondary">ประเภท</Text>
                          </Col>
                          <Col span={18} className="pl-[40px] ">
                            <Text className="text-font-title">ไม้ลายไทย</Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          <Col span={5} className="text-right">
                            <Text type="secondary">ชื่อไม้</Text>
                          </Col>
                          <Col span={18} className="pl-[40px] ">
                            <Text className="text-font-title">
                              ทองเส้น หน้า 1 นิ้ว
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={24}>
                        <Row>
                          <Col span={5} className="text-right">
                            <Text type="secondary">ขนาดหน้าไม้</Text>
                          </Col>
                          <Col span={18} className="pl-[40px] ">
                            <Text className="text-font-title">1 นิ้ว</Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    {/* <Form
                      layout="horizontal"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 18 }}
                      size="large"
                    >
                      <Form.Item label="รหัส">
                        <Input disabled />
                      </Form.Item>
                      <Form.Item label="ประเภท">
                        <Input disabled />
                      </Form.Item>
                    </Form> */}
                  </Col>
                  <Col span={6}>
                    <div className="aspect-[1/1] w-full bg-red-50"></div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Card>
        <Card title="ข้อมูลคำสั่งผลิต" bordered={false}>
          <TableOrders />
        </Card>
      </div>
    </>
  )
}

export async function createOrderLoader() {
  return {
    action: 'create',
  }
}

export async function editOrderLoader({ params }: any) {
  // const contact = await getContact(params?.contactId)
  return {
    id: params?.orderId,
    action: 'edit',
  }
}
