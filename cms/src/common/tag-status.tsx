import { ConfigProvider, Tag } from 'antd'

import { colors } from 'constants/colors'
import {
  CANCELLED,
  COMPLETED,
  CUTTING_INPROGRESS,
  DRAFT,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'

import { convertStatusToText } from 'helper/status-formatter'

interface ITFTagStatus {
  status?: string | null
}
export const TagStatus = (props: ITFTagStatus) => {
  const { status } = props

  const color = (status: any) => {
    switch (status) {
      case DRAFT:
        return 'default'
      case WAIT_FOR_CUTTING:
        return 'orange'
      case CUTTING_INPROGRESS:
        return 'processing'
      case WAIT_FOR_PREPARING:
        return 'magenta'
      case PREPARING_INPROGRESS:
        return 'cyan'
      case COMPLETED:
        return 'success'
      case CANCELLED:
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 6,
        },
      }}
    >
      <Tag color={color(status)}>{convertStatusToText(status ?? '')}</Tag>
    </ConfigProvider>
  )
}
