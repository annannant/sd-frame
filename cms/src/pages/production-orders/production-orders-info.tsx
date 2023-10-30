import { ProductionOrdersInfoIndex } from 'components/production-orders/production-order-info'

export const ProductionOrdersInfoPage = () => {
  return <ProductionOrdersInfoIndex />
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
