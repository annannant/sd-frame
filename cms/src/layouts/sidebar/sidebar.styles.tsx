import styled from 'styled-components'
import { colors } from '../../constants/colors'

export const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: ${colors.white};
  background-color: ${colors.bgDark};

  .ant-menu-inline .ant-menu-sub.ant-menu-inline {
    padding: 8px;
  }
`
