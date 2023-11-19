import {
  ITFStandardFrameStockByStdFrame,
  ITFTableStandardFrameStockByStdFrame,
} from 'types/standard-frame-stock.type'

export const useStandardFrameStocksList = () => {
  const transformStandardFrameList = (
    data: ITFStandardFrameStockByStdFrame[]
  ): ITFTableStandardFrameStockByStdFrame[] => {
    const result = data.map(
      (item, index: number): ITFTableStandardFrameStockByStdFrame => {
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
