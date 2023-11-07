import { Button, ButtonProps, ConfigProvider } from 'antd'

import { colors } from 'constants/colors'

export const ButtionPrimarySecondary = (props: ButtonProps) => {
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

export const ButtionPrimarySuccess = (props: ButtonProps) => {
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

export const ButtionPrimaryWarning = (props: ButtonProps) => {
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

export const ButtionPrimaryInfo = (props: ButtonProps) => {
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
export const ButtionPrimaryLight = (props: ButtonProps) => {
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
