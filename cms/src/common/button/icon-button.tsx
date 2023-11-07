import { Button, ButtonProps, ConfigProvider } from 'antd'

import { colors } from 'constants/colors'

export const IconButtionPrimarySecondary = (props: ButtonProps) => {
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

export const IconButtionPrimarySuccess = (props: ButtonProps) => {
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

export const IconButtionPrimaryWarning = (props: ButtonProps) => {
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

export const IconButtionPrimaryInfo = (props: ButtonProps) => {
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
export const IconButtionPrimaryLight = (props: ButtonProps) => {
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
