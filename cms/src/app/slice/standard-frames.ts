import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { ITFStandardFrame } from 'types/standard-frame.type'

import { RootState } from 'app/store'

export interface StandardFrameState {
  isShowDrawer: boolean
  isEdit: boolean
  dataEdit: ITFStandardFrame
}

const initialValues: StandardFrameState = {
  isShowDrawer: false,
  isEdit: false,
  dataEdit: {} as ITFStandardFrame,
}

const standardFrameSlice = createSlice({
  name: 'standardFrame',
  initialState: initialValues,
  reducers: {
    setShowDrawer: (
      state: StandardFrameState,
      action: PayloadAction<boolean>
    ) => {
      state.isShowDrawer = action.payload
    },
    setDataEdit: (
      state: StandardFrameState,
      action: PayloadAction<ITFStandardFrame>
    ) => {
      state.dataEdit = action.payload
      state.isEdit = !!action.payload.id
    },
  },
})

export const { setShowDrawer, setDataEdit } = standardFrameSlice.actions
export const standardFrameSelector = (store: RootState) => store.standardFrame

export default standardFrameSlice.reducer
