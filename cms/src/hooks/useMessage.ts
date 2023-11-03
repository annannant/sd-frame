import { message } from 'antd'

const useMessage = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Successfully saved.',
    })
  }

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Oops! Something went wrong. Please try again.',
    })
  }

  const warning = () => {
    messageApi.open({
      type: 'warning',
      content: 'This is a warning message',
    })
  }

  return {
    contextHolder,
    success,
    error,
    warning,
  }
}

export default useMessage
