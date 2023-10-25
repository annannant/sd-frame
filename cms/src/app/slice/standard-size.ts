import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'app/store'
import { ITFStadardSizeData } from 'data/standard-list'

export interface StandardSizeState {
  list: ITFStadardSizeData[]
}

const initialValues: StandardSizeState = {
  list: [],
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
    },
  },
})

export const { setList } = standardSizeSlice.actions
export const standardSizeSelector = (store: RootState) => store.standardSize

export default standardSizeSlice.reducer
