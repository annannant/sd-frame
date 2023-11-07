import { WoodTypesInfoIndex } from 'components/wood-types/wood-types-info'

export const WoodTypesInfoPage = () => {
  return <WoodTypesInfoIndex />
}

export async function createWoodTypeLoader() {
  return {
    action: 'create',
  }
}

export async function editWoodTypeLoader({ params }: any) {
  // const contact = await getContact(params?.contactId)
  return {
    id: params?.orderId,
    action: 'edit',
  }
}
