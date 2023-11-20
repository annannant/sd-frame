import {
  ITFStandardFrameStockByStandardFrame,
  ITFTableStandardFrameStockByStandardFrame,
} from 'types/standard-frame-stock.type'

export const useStandardFrameStocksList = () => {
  const transformStandardFrameList = (
    data: ITFStandardFrameStockByStandardFrame[]
  ): ITFTableStandardFrameStockByStandardFrame[] => {
    const result = data.map(
      (item, index: number): ITFTableStandardFrameStockByStandardFrame => {
        return {
          ...item,
          key: item?.id?.toString(),
          no: index + 1,
        }
      }
    )

    return result
  }

  return {
    transformStandardFrameList,
  }
}
