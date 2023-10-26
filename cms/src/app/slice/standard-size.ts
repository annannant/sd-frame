import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'app/store'
import {
  ITFStadardSizeData,
  ITFStadardSizeDataOption,
} from 'data/standard-list'

export interface StandardSizeState {
  list: ITFStadardSizeData[]
  listOption: ITFStadardSizeDataOption[]
}

const initialValues: StandardSizeState = {
  list: [],
  listOption: [],
}

const standardSizeSlice = createSlice({
  name: 'standardSize',
  initialState: initialValues,
  reducers: {
    setList: (
      state: StandardSizeState,
      action: PayloadAction<ITFStadardSizeData[]>
    ) => {
      state.list = action.payload
      state.listOption = action.payload.map((item: ITFStadardSizeData) => ({
        value: item.id,
        label: item.name,
        data: item,
      }))
    },
  },
})

export const { setList } = standardSizeSlice.actions
export const standardSizeSelector = (store: RootState) => store.standardSize

export default standardSizeSlice.reducer
