import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { ITFStandardFrame } from 'types/standard-frame.type'

import { result } from 'lodash'

export const useStandardFramesItems = () => {
  const dispatch = useDispatch()
  const [data, setDataSource] = useState([])

  const transformTable = (data: ITFStandardFrame[]) => {
    const result = data.map((item: ITFStandardFrame) => {
      return {
        ...item,
        key: item?.id?.toString(),
      }
    })
    return result
  }

  return {
    data,
    setDataSource,
    transformTable,
  }
}
