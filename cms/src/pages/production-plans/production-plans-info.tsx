import ProductionPlansInfoComponent from 'components/production-plans/production-plans-info'

export const ProductionPlansInfoPage = () => {
  return <ProductionPlansInfoComponent />
}

export async function editPlanLoader({ params }: any) {
  return {
    id: params?.planId,
    action: 'edit',
  }
}
