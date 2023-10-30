import { colors } from '../../constants/colors'

import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${colors.dark.bgBase};

  .ant-menu-inline .ant-menu-sub.ant-menu-inline {
    padding: 8px;
  }
`
