import { ITFWoodTypeForm } from 'types/wood-type-form.type'

import {
  deleteWoodType,
  patchUpdateWoodType,
  postCreateWoodType,
} from 'api/wood-types'

export const useSaveWoodTypes = () => {
  const transformPayload = (values: ITFWoodTypeForm) => {
    return values
  }

  const create = async (values: ITFWoodTypeForm) => {
    const payload = transformPayload(values)
    await postCreateWoodType(payload)
  }

  const update = async (id: string, values: ITFWoodTypeForm) => {
    const payload = transformPayload(values)
    await patchUpdateWoodType(id, payload)
  }

  const remove = async (id: string) => {
    await deleteWoodType(id)
  }

  return {
    create,
    update,
    remove,
  }
}
