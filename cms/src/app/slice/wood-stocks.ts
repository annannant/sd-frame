import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ITFCreateProductionOrder } from 'types/production-order.type'
import { ITFTableImportWoodStock } from 'types/wood-stock-import.type'
import { ITFWood } from 'types/wood.type'

import { RootState } from 'app/store'

export interface WoodStockState {
  importErrorList: ITFTableImportWoodStock[]
  importList: ITFTableImportWoodStock[]
}

const initialValues: WoodStockState = {
  importErrorList: [],
  importList: [],
}

const woodStockSlice = createSlice({
  name: 'woodStock',
  initialState: initialValues,
  reducers: {
    setImportErrorList: (
      state: WoodStockState,
      action: PayloadAction<ITFTableImportWoodStock[]>
    ) => {
      state.importErrorList = action.payload
    },
    setImportList: (
      state: WoodStockState,
      action: PayloadAction<ITFTableImportWoodStock[]>
    ) => {
      state.importList = action.payload
    },
  },
})

export const { setImportList, setImportErrorList } = woodStockSlice.actions
export const woodStockSelector = (store: RootState) => store.woodStock

export default woodStockSlice.reducer
