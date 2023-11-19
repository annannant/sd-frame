import { useDispatch, useSelector } from 'react-redux'

import { Modal } from 'antd'

import {
  ITFStandardFrame,
  ITFTableStandardFrame,
} from 'types/standard-frame.type'

import {
  deleteStandardFrame,
  patchActiveStandardFrame,
  patchUpdateStandardFrame,
  postCreateStandardFrame,
} from 'api/standard-frames'

import useMessage from './useMessage'
import useModal from './useModal'

import {
  setDataEdit,
  setShowDrawer,
  standardFrameSelector,
} from 'app/slice/standard-frames'
import { useGetAllStandardFramesQuery } from 'services/standard-frame'

export const useStandardFrames = () => {
  const dispatch = useDispatch()

  const [modal, contextHolderModal] = Modal.useModal()
  const { contextHolder, success, error } = useMessage()
  const { configDelete } = useModal()
  const { data, refetch } = useGetAllStandardFramesQuery()
  const { isEdit, dataEdit } = useSelector(standardFrameSelector)
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

  const onClickEdit = async (data: ITFStandardFrame) => {
    dispatch(setShowDrawer(true))
    dispatch(setDataEdit(data))
  }

  const onClickCreate = async () => {
    dispatch(setShowDrawer(true))
    dispatch(setDataEdit({ id: 0 }))
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

  const onFinish = async (formValues: any) => {
    try {
      if (isEdit) {
        await patchUpdateStandardFrame(dataEdit.id, formValues)
      } else {
        await postCreateStandardFrame(formValues)
      }
      dispatch(setShowDrawer(false))
      dispatch(setDataEdit({} as ITFStandardFrame))
      refetch()
      success()
    } catch (e: any) {
      error()
      console.log('e:', e)
    }
  }

  return {
    data,
    contextHolder,
    contextHolderModal,
    refetch,
    onClickDelete,
    onClickEdit,
    onClickCreate,
    transformTable,
    activeStandardFrame,
    onFinish,
  }
}
