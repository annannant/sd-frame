import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from 'app/store'
import {
  ITFStadardSizeData,
  ITFStadardSizeDataOption,
} from 'data/standard-list'

export interface StandardFrameState {
  list: ITFStadardSizeData[]
  listOption: ITFStadardSizeDataOption[]
}

const initialValues: StandardFrameState = {
  list: [],
  listOption: [],
}

const standardFrameSlice = createSlice({
  name: 'standardFrame',
  initialState: initialValues,
  reducers: {
    setList: (
      state: StandardFrameState,
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

export const { setList } = standardFrameSlice.actions
export const standardFrameSelector = (store: RootState) => store.standardFrame

export default standardFrameSlice.reducer
