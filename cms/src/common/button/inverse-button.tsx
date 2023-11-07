import { Button, ButtonProps, ConfigProvider } from 'antd'

import { colors } from 'constants/colors'

export const ButtionInversePrimary = (props: ButtonProps) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primaryInv,
          colorTextBase: colors.primary,
        },
      }}
    >
      <Button {...props} />
    </ConfigProvider>
  )
}

export const ButtionInverseSecondary = (props: ButtonProps) => {
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

export const ButtionInverseSuccess = (props: ButtonProps) => {
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

export const ButtionInverseWarning = (props: ButtonProps) => {
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

export const ButtionInverseInfo = (props: ButtonProps) => {
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
export const ButtionInverseLight = (props: ButtonProps) => {
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
