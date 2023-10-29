import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ITFWood } from 'types/wood.type'

import { RootState } from 'app/store'

export interface ProductionOrdersInfoState {
  list: any[]
  data: any
  selected: ITFWood | null
  loading: boolean
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
  // loding: {
  //   'page': false,
  //   'save': false,
  //   'submit': false,
  // },
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
  },
})

export const { setSelected } = productionOrdersSlice.actions
export const productionOrdersSelector = (store: RootState) =>
  store.productionOrders

export default productionOrdersSlice.reducer
