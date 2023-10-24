import { useLoaderData } from 'react-router-dom'

import { Button, Card } from 'antd'
import { Typography } from 'antd'

import { FormOrders } from 'components/production-orders/production-order-info/form-orders'
import FormOrdersInfo from 'components/production-orders/production-order-info/form-orders-info'
import TableOrders from 'components/production-orders/production-order-info/table-orders'

const { Title } = Typography
export const ProductionOrdersInfo = () => {
  const { id, action }: any = useLoaderData()
  console.log('id:', id)
  console.log('action:', action)

  return (
    <>
      <Title level={3}>สั่งผลิต / สร้างคำสั่งผลิต</Title>
      <div className="grid gap-y-[20px]">
        <Card title="ข้อมูลไม้กรอบ" bordered={false}>
          <FormOrdersInfo />
        </Card>
        <Card title="ข้อมูลคำสั่งผลิต" bordered={false}>
          <FormOrders />
        </Card>
      </div>
      <div className="mt-5 flex justify-end">
        <Button type="primary" htmlType="submit" className="btn--primary">
          Submit
        </Button>
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
