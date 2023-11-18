import { useDispatch } from 'react-redux'

import {
  ITFImportWoodStock,
  ITFTableImportWoodStock,
} from 'types/wood-stock-import.type'
import {
  ITFTableWoodStock,
  ITFTableWoodStockWood,
  ITFWoodStock,
  ITFWoodStockWood,
} from 'types/wood-stock.type'

import { postValidateImportStock } from 'api/wood-stocks'

import { setImportErrorList, setImportList } from 'app/slice/wood-stocks'
import camelcaseKeys from 'camelcase-keys'

export const useWoodStocks = () => {
  const dispatch = useDispatch()

  const transformTableWoods = (
    data: ITFWoodStockWood[]
  ): ITFTableWoodStockWood[] => {
    const result = data.map((item, index: number): ITFTableWoodStockWood => {
      return {
        ...item,
        key: item?.id?.toString(),
        no: index + 1,
      }
    })

    return result
  }

  const transformTableLots = (data: ITFWoodStock[]): ITFTableWoodStock[] => {
    const result = data.map((item, index: number): ITFTableWoodStock => {
      return {
        ...item,
        key: `${item?.woodId}${item?.lot}`,
        no: index + 1,
      }
    })

    return result
  }

  const transformTableValidate = (data: any[]): ITFTableImportWoodStock[] => {
    return camelcaseKeys(data, { deep: true }).reduce((acc, item, index) => {
      if (index === 0) {
        return acc
      }

      return [
        ...acc,
        {
          ...item,
          no: acc.length + 1,
          key: index + 1,
        },
      ]
    }, [])
  }

  const transformTableImport = (data: any[]): ITFTableImportWoodStock[] => {
    return camelcaseKeys(data, { deep: true }).reduce((acc, item, index) => {
      return [
        ...acc,
        {
          ...item,
          no: acc.length + 1,
          key: index + 1,
        },
      ]
    }, [])
  }

  const validateImportStock = async (input: any[]) => {
    try {
      const formatted = transformTableValidate(input)
      const response = await postValidateImportStock(formatted)
      const data = transformTableImport(response?.data)
      const passList = data.filter((item) => item.status === 'pass')
      const errorList = data.filter((item) => item.status === 'failed')
      dispatch(setImportList(passList))
      dispatch(setImportErrorList(errorList))
    } catch (error) {
      console.log('error:', error)
      dispatch(setImportList([]))
    }
  }

  return {
    validateImportStock,
    transformTableWoods,
    transformTableLots,
    transformTableValidate,
    transformTableImport,
  }
}
