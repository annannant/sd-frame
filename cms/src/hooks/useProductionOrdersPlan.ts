import { useNavigate } from 'react-router-dom'

import {
  CUTTING_INPROGRESS,
  DRAFT,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'
import {
  ITFProductionOrderCreatePlan,
  ITFProductionOrderPlanResponse,
  ITFProductionOrderPlanSummaryWood,
  ITFTableProductionOrderPlanSummaryWood,
} from 'types/production-order-plan.type'
import { ITFWoodStockLocation } from 'types/wood-stock-location.type'

import { postProductionOrderCreatePlan } from 'api/production-orders'

import useMessage from './useMessage'

import { orderBy } from 'lodash'
import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const useProductionOrdersPlan = () => {
  const navigate = useNavigate()
  const { contextHolder, success, error } = useMessage()

  const transformTableSummaryWood = (
    data: ITFProductionOrderPlanSummaryWood[]
  ): ITFTableProductionOrderPlanSummaryWood[] => {
    const response = data.map((item, index) => {
      return {
        ...item,
        key: `summary-${index + 1}`,
        no: index + 1,
      }
    })
    return response
  }

  const startPlan = async (
    id: string,
    formValues: ITFProductionOrderCreatePlan
  ) => {
    try {
      const response = await postProductionOrderCreatePlan(id, {
        sparePart: formValues.sparePart,
      })
      console.log('response:', response)
      success()
      setTimeout(() => {
        navigate('/production-plans')
      }, 600)
    } catch (err) {
      console.log('err:', err)
      error()
    }
  }

  return {
    transformTableSummaryWood,
    startPlan,
    contextHolder,
    success,
    error,
  }
}
