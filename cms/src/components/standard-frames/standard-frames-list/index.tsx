import { Link } from 'react-router-dom'

import { PlusOutlined } from '@ant-design/icons'
import { Button, Card, Typography } from 'antd'

import { TableStandardFrames } from './table-standard-frames/table-standard-frames'

const { Title } = Typography

export const StandardFramesListComponent = () => {
  return (
    <>
      <Title level={3}>จัดการกรอบมาตรฐาน</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>รายการกรอบมาตรฐาน</div>
            <Button type="primary" icon={<PlusOutlined />}>
              สร้าง
            </Button>
          </div>
        }
        bordered={false}
      >
        <TableStandardFrames />
      </Card>
    </>
  )
}
