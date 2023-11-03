import { useLoaderData, useNavigate } from 'react-router-dom'

import { DRAFT, WAIT_FOR_CUTTING } from 'constants/current-status.constant'
import { ITFCreateProductionOrderForm } from 'types/production-order-form'
import { ITFUpdateProductionOrder } from 'types/production-order.type'

import { patchUpdate, postCreate } from 'api/production-orders'

import { pick } from 'lodash'
import { useGetAllStandardFramesQuery } from 'services/standard-frame'

export const useSaveProductionPlanOrders = () => {
  const { id, action }: any = useLoaderData()
  const { data } = useGetAllStandardFramesQuery()
  const transformPayload = (
    payload: ITFCreateProductionOrderForm
  ): ITFUpdateProductionOrder => {
    return {
      woodId: payload.woodId,
      orderItems: payload.orderItems?.map((item) => {
        const standardFrame = !item.isCustomSize
          ? data?.list.find((std) => std.id === item.size)
          : {}
        return {
          id: item.id,
          width: item.width,
          height: item.height,
          qty: item.qty,
          isCustomSize: item.isCustomSize,
          ...pick(standardFrame, ['width', 'height']),
          standardFrameId: item.isCustomSize ? null : item.size,
        }
      }),
    }
  }

  const saveDraft = (payload: ITFCreateProductionOrderForm) => {
    try {
      console.log('payload:', payload)
      console.log('error:', 'error')
    } catch (error) {
      console.log('error:', error)
    }
  }

  const createSaveDraft = async (values: ITFCreateProductionOrderForm) => {
    try {
      const payload = transformPayload(values)
      const response = await postCreate({
        ...payload,
        status: DRAFT,
      })
      console.log('response:', response)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const create = async (values: ITFCreateProductionOrderForm) => {
    try {
      const payload = transformPayload(values)
      const response = await postCreate({
        ...payload,
        status: WAIT_FOR_CUTTING,
      })
      console.log('response:', response)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const updateSaveDraft = async (values: ITFCreateProductionOrderForm) => {
    try {
      const payload = transformPayload(values)
      const response = await patchUpdate(id, {
        ...payload,
        status: DRAFT,
      })
      console.log('response:', response)
    } catch (error) {
      console.log('error:', error)
    }
  }

  const update = async (values: ITFCreateProductionOrderForm) => {
    try {
      const payload = transformPayload(values)
      const response = await patchUpdate(id, {
        ...payload,
        status: WAIT_FOR_CUTTING,
      })
      console.log('response:', response)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return {
    transformPayload,
    saveDraft,
    create,
    createSaveDraft,
    update,
    updateSaveDraft,
  }
}
