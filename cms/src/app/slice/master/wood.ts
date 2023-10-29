import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ITFWoodOption } from 'types/wood-option.type'
import { ITFWood } from 'types/wood.type'

import { RootState } from 'app/store'
import axios from 'axios'

export interface WoodState {
  list: ITFWood[]
  listOption: ITFWoodOption[]
}

const initialValues: WoodState = {
  list: [],
  listOption: [],
}

const woodSlice = createSlice({
  name: 'wood',
  initialState: initialValues,
  reducers: {
    setList: (state: WoodState, action: PayloadAction<ITFWood[]>) => {
      state.list = action.payload
      state.listOption = action.payload.map((item: ITFWood) => ({
        value: item.id,
        label: item.name,
        data: item,
      }))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWood.fulfilled, (state, { payload }) => {
      state.list = payload
      state.listOption = payload.map((item: ITFWood) => ({
        value: item.id,
        label: item.name,
        data: item,
      }))
    })
    builder.addCase(fetchAllWood.rejected, (state, action) => {
      state.list = []
      state.listOption = []
    })
  },
})

// export const fetchAllWood = createAsyncThunk(
//   'wood/fetchAllWood',
//   // Declare the type your function argument here:
//   async (_, thunkAPI) => {
//     const response = await fetch(`http://localhost:3101/api/v1/woods`)
//     console.log('response:', response)
//     return [] as ITFWood[]
//     // Inferred return type: Promise<MyData>
//     // return (await response.json()) as ITFWood[]
//   }
// )

export const fetchAllWood = createAsyncThunk(
  'woods/fetchAllWood',
  async (_, thunkAPI) => {
    const response = await axios.get(`http://localhost:3101/api/v1/woods`)
    return response.data
  }
)

export const { setList } = woodSlice.actions
export const woodSelector = (store: RootState) => store.wood

export default woodSlice.reducer
