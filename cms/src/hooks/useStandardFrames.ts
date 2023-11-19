import { Modal } from 'antd'

import {
  ITFStandardFrame,
  ITFTableStandardFrame,
} from 'types/standard-frame.type'

import {
  deleteStandardFrame,
  patchActiveStandardFrame,
} from 'api/standard-frames'

import useMessage from './useMessage'
import useModal from './useModal'

import { useGetAllStandardFramesQuery } from 'services/standard-frame'

export const useStandardFrames = () => {
  const [modal, contextHolderModal] = Modal.useModal()
  const { contextHolder, success, error } = useMessage()
  const { configDelete } = useModal()
  const { data, refetch } = useGetAllStandardFramesQuery()

  const activeStandardFrame = async (
    value: boolean,
    data: ITFStandardFrame
  ) => {
    try {
      if (!data?.id) {
        return
      }
      await patchActiveStandardFrame(data?.id, { isActive: value })
    } catch (error) {
      console.log('error:', error)
    }
  }

  const onClickDelete = async (id: number) => {
    try {
      const confirmed = await modal.confirm(configDelete)
      if (confirmed) {
        await deleteStandardFrame(id)
        refetch()
        success()
      }
    } catch (e: any) {
      console.log('e:', e)
      error()
    }
  }

  const onClickEdit = async (id: number) => {
    console.log('onEdit:', 'onEdit')
  }

  const transformTable = (
    data: ITFStandardFrame[]
  ): ITFTableStandardFrame[] => {
    const result = data.map((item, index: number): ITFTableStandardFrame => {
      return {
        ...item,
        key: item?.id?.toString(),
        no: index + 1,
      }
    })

    return result
  }

  return {
    data,
    refetch,
    contextHolder,
    contextHolderModal,
    onClickDelete,
    onClickEdit,
    transformTable,
    activeStandardFrame,
  }
}
