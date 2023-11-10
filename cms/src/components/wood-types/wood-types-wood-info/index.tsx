import { useLoaderData } from 'react-router-dom'

import { Typography } from 'antd'

import { WoodInfoForm } from 'components/woods/wood-info/wood-info-form/wood-info-form'

import { EDIT } from 'constants/common'

const { Title } = Typography

export const WoodTypesWoodInfoIndex = () => {
  const { action }: any = useLoaderData()

  const isEdit = action === EDIT

  return (
    <>
      <div className="flex items-center justify-between">
        <Title level={3}>ไม้กรอบ / {isEdit ? 'แก้ไข' : 'สร้าง'}</Title>
      </div>
      <WoodInfoForm />
    </>
  )
}
