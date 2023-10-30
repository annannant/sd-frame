import { useNavigate } from 'react-router-dom'

import { ITFCreateProductionOrderForm } from 'types/production-order-form'
import { ITFUpdateProductionOrder } from 'types/production-order.type'

import { postCreate } from 'api/production-orders'

import { pick } from 'lodash'
import { useGetAllStandardFramesQuery } from 'services/standard-frame'

export const useSaveProductionPlanOrders = () => {
  const navigate = useNavigate()

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
          width: item.width,
          height: item.height,
          qty: item.qty,
          isCustomSize: item.isCustomSize,
          ...pick(standardFrame, ['width', 'height']),
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

  const create = async (values: ITFCreateProductionOrderForm) => {
    try {
      const payload = transformPayload(values)
      const response = await postCreate(payload)
      navigate('/production-orders')
      console.log('response:', response)
    } catch (error) {
      console.log('error:', error)
    }
  }

  return {
    transformPayload,
    saveDraft,
    create,
  }
}
