import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ITFStandardFrameStock } from 'types/standard-frame-stock.type'

import { RootState } from 'app/store'

export interface StandardFrameStockState {
  isShowDrawer: boolean
  isEdit: boolean
  dataEdit: ITFStandardFrameStock
}

const initialValues: StandardFrameStockState = {
  isShowDrawer: false,
  isEdit: false,
  dataEdit: {} as ITFStandardFrameStock,
}

const standardFrameStockSlice = createSlice({
  name: 'standardFrameStock',
  initialState: initialValues,
  reducers: {
    setShowDrawer: (
      state: StandardFrameStockState,
      action: PayloadAction<boolean>
    ) => {
      state.isShowDrawer = action.payload
    },
    setDataEdit: (
      state: StandardFrameStockState,
      action: PayloadAction<ITFStandardFrameStock>
    ) => {
      state.dataEdit = action.payload
      state.isEdit = !!(action.payload.standardFrameId && action.payload.woodId)
    },
  },
})

export const { setShowDrawer, setDataEdit } = standardFrameStockSlice.actions
export const standardFrameStockSelector = (store: RootState) =>
  store.standardFrameStock

export default standardFrameStockSlice.reducer
