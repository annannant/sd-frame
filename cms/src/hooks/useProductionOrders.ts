import {
  CUTTING_INPROGRESS,
  DRAFT,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'

import { useGetAllProductionOrdersQuery } from 'services/production-order'

export const useProductionOrders = () => {
  const { data: dataOrders, refetch: refetchOrders } =
    useGetAllProductionOrdersQuery({
      statuses: [DRAFT, WAIT_FOR_CUTTING],
    })

  const { data: dataOrderInprogress, refetch: refetchOrderInprogress } =
    useGetAllProductionOrdersQuery({
      statuses: [CUTTING_INPROGRESS, WAIT_FOR_PREPARING, PREPARING_INPROGRESS],
    })

  return {
    dataOrders,
    refetchOrders,
    dataOrderInprogress,
    refetchOrderInprogress,
  }
}
