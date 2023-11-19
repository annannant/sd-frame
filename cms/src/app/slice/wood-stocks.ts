import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ITFTableImportWoodStock } from 'types/wood-stock-import.type'

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
