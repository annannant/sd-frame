import { StandardFrameStocksInfoComponent } from 'components/standard-frame-stocks/standard-frame-stocks-info'

export const StandardFrameStocksInfoPage = () => {
  return <StandardFrameStocksInfoComponent />
}

export async function viewStandardFrameStocksInfoLoader({ params }: any) {
  return {
    id: params?.id,
  }
}
