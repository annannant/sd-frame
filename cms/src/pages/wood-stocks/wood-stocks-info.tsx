import { WoodStocksInfoComponent } from 'components/wood-stocks/wood-stocks-info'

export const WoodStocksInfoPage = () => {
  return <WoodStocksInfoComponent />
}

export async function viewWoodStocksInfoLoader({ params }: any) {
  return {
    id: params?.id,
  }
}
