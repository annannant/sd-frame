import { useNavigate } from 'react-router-dom'

import { LeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export const ButtonBack = () => {
  const navigate = useNavigate()

  return (
    <Button
      type="default"
      htmlType="button"
      icon={<LeftOutlined />}
      onClick={() => {
        navigate(-1)
      }}
    >
      กลับไปก่อนหน้า
    </Button>
  )
}
