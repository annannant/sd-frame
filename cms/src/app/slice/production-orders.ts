import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ITFProductionOrderCreatePlanParams } from 'types/production-order-plan.type'
import { ITFCreateProductionOrder } from 'types/production-order.type'
import { ITFWood } from 'types/wood.type'

import { RootState } from 'app/store'

export interface ProductionOrdersInfoState {
  list: any[]
  data: any
  selected: ITFWood | null
  loading: boolean
  paramsCreatePlan: ITFProductionOrderCreatePlanParams
  // loding: {
  //   'page'?: boolean
  //   'save'?: boolean
  //   'submit'?: boolean
  // }
}

const initialValues: ProductionOrdersInfoState = {
  list: [],
  data: null,
  selected: null,
  loading: false,
  paramsCreatePlan: { sparePart: 0.25 },
}

const productionOrdersSlice = createSlice({
  name: 'productionOrders',
  initialState: initialValues,
  reducers: {
    setSelected: (
      state: ProductionOrdersInfoState,
      action: PayloadAction<ITFWood | null>
    ) => {
      state.selected = action.payload
    },
    setParamsCreatePlan: (
      state: ProductionOrdersInfoState,
      action: PayloadAction<ITFProductionOrderCreatePlanParams>
    ) => {
      state.paramsCreatePlan = action.payload
    },
  },
})

export const { setSelected, setParamsCreatePlan } =
  productionOrdersSlice.actions
export const productionOrdersSelector = (store: RootState) =>
  store.productionOrders

export default productionOrdersSlice.reducer
