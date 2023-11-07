import { useLoaderData } from 'react-router-dom'

import { Card, Typography } from 'antd'

import { CREATE, EDIT } from 'constants/common'

const { Title } = Typography

export const WoodTypesInfoIndex = () => {
  const { id, action }: any = useLoaderData()
  const isEdit = action === EDIT
  const isCreate = action === CREATE

  return (
    <>
      <Title level={3}>
        ข้อมูลไม้กรอบ / {isEdit ? '' : 'สร้างประเภทไม้กรอบ'}
      </Title>
      <Card
        title={isEdit ? `แก้ไขข้อมูลประเภทไม้กรอบ` : 'ข้อมูลประเภทไม้กรอบ'}
        bordered={false}
      ></Card>
    </>
  )
}
