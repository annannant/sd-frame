import { Link } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Form, Typography } from 'antd'

import { useStandardFrames } from 'hooks/useStandardFrames'

import { DrawerForm } from './drawer-form/drawer-form'
import { TableStandardFrames } from './table-standard-frames/table-standard-frames'

const { Title } = Typography

export const StandardFramesListComponent = () => {
  const { onClickCreate } = useStandardFrames()
  return (
    <>
      <Title level={3}>จัดการกรอบมาตรฐาน</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>รายการกรอบมาตรฐาน</div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onClickCreate}
            >
              สร้าง
            </Button>
          </div>
        }
        bordered={false}
      >
        <TableStandardFrames />
        <DrawerForm />
      </Card>
    </>
  )
}
