import { message } from 'antd'

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully saved.',
    })
  }

  const error = (
    val: any = {
      type: 'error',
      content: 'Oops! Something went wrong. Please try again.',
    }
  ) => {
    messageApi.open(val)
  }

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    })
  }

  return {
    contextHolder,
    messageApi,
    success,
    error,
    warning,
  }
}

export default useMessage
