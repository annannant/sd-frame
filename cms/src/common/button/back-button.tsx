import { useNavigate } from 'react-router-dom'

import { LeftOutlined } from '@ant-design/icons'
import { Button, ButtonProps } from 'antd'

export const ButtonBack = (props: ButtonProps) => {
  const navigate = useNavigate()

  return (
    <Button
      type="default"
      htmlType="button"
      icon={<LeftOutlined />}
      onClick={() => {
        navigate(-1)
      }}
      {...props}
    >
      กลับไปก่อนหน้า
    </Button>
  )
}
