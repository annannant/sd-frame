import { ITFWoodForm } from 'types/wood-form.type'
import { ITFCreateWood } from 'types/wood.type'

import { deleteWood, patchUpdateWood, postCreateWood } from 'api/woods'

export const useSaveWood = () => {
  const transformPayload = (values: ITFWoodForm): ITFCreateWood => {
    return values
  }

  const create = async (values: ITFWoodForm) => {
    console.log('values:', values)
    const payload = transformPayload(values)
    await postCreateWood(payload)
  }

  const update = async (id: string, values: ITFWoodForm) => {
    const payload = transformPayload(values)
    await patchUpdateWood(id, payload)
  }

  const remove = async (id: string) => {
    await deleteWood(id)
  }

  return {
    create,
    update,
    remove,
  }
}
