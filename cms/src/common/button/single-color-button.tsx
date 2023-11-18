import { Button, ButtonProps, ConfigProvider } from 'antd'

import { colors } from 'constants/colors'

export const ButtonPrimarySecondary = (props: ButtonProps) => {
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

export const ButtonPrimarySuccess = (props: ButtonProps) => {
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

export const ButtonPrimaryWarning = (props: ButtonProps) => {
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

export const ButtonPrimaryInfo = (props: ButtonProps) => {
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
export const ButtonPrimaryLight = (props: ButtonProps) => {
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
