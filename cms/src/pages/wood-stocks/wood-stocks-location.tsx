import { WoodStocksLocationsComponent } from 'components/wood-stocks/wood-stocks-locations'

export const WoodStocksLocationsPage = () => {
  return <WoodStocksLocationsComponent />
}

export async function viewWoodStocksInfoLoader({ params }: any) {
  return {
    id: params?.id,
  }
}
