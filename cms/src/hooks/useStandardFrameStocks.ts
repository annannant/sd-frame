import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import { Modal } from 'antd'

import {
  ITFStandardFrameStock,
  ITFTableStandardFrameStock,
} from 'types/standard-frame-stock.type'

import {
  deleteStandardFrameStock,
  patchUpdateStandardFrameStock,
  postCreateStandardFrameStock,
} from 'api/standard-frame-stocks'

import useMessage from './useMessage'
import useModal from './useModal'

import {
  setDataEdit,
  setFilter,
  setShowDrawer,
  standardFrameStockSelector,
} from 'app/slice/standard-frame-stocks'
import { omit } from 'lodash'
import { useGetAllStandardFrameStocksByStandardFrameIDQuery } from 'services/standard-frame-stock'
import { useGetAllWoodsQuery } from 'services/wood'

export const useStandardFrameStocks = () => {
  const dispatch = useDispatch()

  const [modal, contextHolderModal] = Modal.useModal()

  const { id }: any = useLoaderData()
  const { contextHolder, success, error } = useMessage()
  const { configDelete } = useModal()
  const { isEdit, filter } = useSelector(standardFrameStockSelector)
  const { data, refetch } = useGetAllStandardFrameStocksByStandardFrameIDQuery({
    id,
    params: filter,
  })
  const { refetch: refetchWoodOptions } = useGetAllWoodsQuery()

  const refetchData = () => {
    refetch()
    refetchWoodOptions()
  }

  const onClickDelete = async (standardFrameId: number, woodId: number) => {
    try {
      const confirmed = await modal.confirm(configDelete)
      if (confirmed) {
        await deleteStandardFrameStock({
          standardFrameId: standardFrameId,
          woodId: woodId,
        })
        refetchData()
        success()
      }
    } catch (e: any) {
      console.log('e:', e)
      error()
    }
  }
  const onClickEdit = async (data: ITFTableStandardFrameStock) => {
    console.log('data:', data)
    dispatch(setShowDrawer(true))
    dispatch(setDataEdit(data))
  }
  const onClickCreate = async () => {
    dispatch(setShowDrawer(true))
    dispatch(setDataEdit({ standardFrameId: 0, woodId: 0 }))
  }
  const transformTable = (
    data: ITFStandardFrameStock[]
  ): ITFTableStandardFrameStock[] => {
    const result = data.map(
      (item, index: number): ITFTableStandardFrameStock => {
        return {
          ...item,
          key: `${item?.standardFrameId}${item?.woodId}`,
          no: index + 1,
          totalStock: (item?.stock ?? 0) + (item?.inprogressStock ?? 0),
        }
      }
    )
    return result
  }

  const onFinish = async (formValues: any) => {
    try {
      const data = {
        ...omit(formValues, ['inprogressStock']),
        standardFrameId: +id,
      }
      if (isEdit) {
        await patchUpdateStandardFrameStock(data)
      } else {
        await postCreateStandardFrameStock(data)
      }
      dispatch(setShowDrawer(false))
      dispatch(setDataEdit({ standardFrameId: 0, woodId: 0 }))
      refetchData()
      success()
    } catch (e: any) {
      error()
      console.log('e:', e)
    }
  }

  return {
    id,
    data,
    refetch,
    contextHolder,
    contextHolderModal,
    onClickDelete,
    onClickEdit,
    onClickCreate,
    onFinish,
    transformTable,
  }
}
