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
    id: params?.id,
    action: 'edit',
  }
}

export async function createWoodLoader({ params }: any) {
  return {
    woodTypeId: params?.woodTypeId,
    action: 'create',
  }
}

export async function editWoodLoader({ params }: any) {
  // const contact = await getContact(params?.contactId)
  return {
    woodTypeId: params?.woodTypeId,
    id: params?.id,
    action: 'edit',
  }
}
