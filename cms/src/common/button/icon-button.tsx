import { Button, ButtonProps, ConfigProvider } from 'antd'

import { colors } from 'constants/colors'

export const IconButtonPrimarySecondary = (props: ButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.secondary,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  )
}

export const IconButtonPrimarySuccess = (props: ButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.success,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  )
}

export const IconButtonPrimaryWarning = (props: ButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.warning,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  )
}

export const IconButtonPrimaryInfo = (props: ButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.info,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  )
}
export const IconButtonPrimaryLight = (props: ButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.light,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  )
}
