import { colors } from 'constants/colors'

import styled from 'styled-components'

export const Container = styled.div`
  .ant-checkbox {
    width: 20px;
    height: 20px;
  }
  .ant-checkbox:not(.ant-checkbox-checked) .ant-checkbox-inner {
    display: none;
  }
  .ant-checkbox:not(.ant-checkbox-checked) + span {
    /* margin-top: 18px; */
  }
  .ant-checkbox.ant-checkbox-checked .ant-checkbox-inner {
    display: block;
  }

  .checkbox-wood.keep .ant-checkbox.ant-checkbox-checked + span {
    color: ${colors.info};
  }

  .checkbox-wood.success .ant-checkbox.ant-checkbox-checked + span {
    color: ${colors.success};
  }

  .checkbox-wood .ant-checkbox.ant-checkbox-checked + span {
    color: rgb(245 158 11);
  }

  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${colors.white};
    border-width: 2px;
  }
  .checkbox-wood .ant-checkbox .ant-checkbox-inner:after {
    top: 49%;
    inset-inline-start: 27.5%;
    border-color: ${colors.warning};
  }
  .checkbox-wood.keep .ant-checkbox .ant-checkbox-inner:after {
    border-color: ${colors.info};
  }
  .checkbox-wood.success .ant-checkbox .ant-checkbox-inner:after {
    border-color: ${colors.success};
  }
  .checkbox-wood.ant-checkbox-wrapper:not(.ant-checkbox-wrapper-disabled):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: ${colors.white};
    border-color: ${colors.warning};
  }

  .checkbox-wood.keep.ant-checkbox-wrapper:not(
      .ant-checkbox-wrapper-disabled
    ):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: ${colors.white};
    border-color: ${colors.info};
  }

  .checkbox-wood.success.ant-checkbox-wrapper:not(
      .ant-checkbox-wrapper-disabled
    ):hover
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner {
    background-color: ${colors.white};
    border-color: ${colors.success};
  }

  .checkbox-wood.keep.ant-checkbox-wrapper:not(
      .ant-checkbox-wrapper-disabled
    ):hover
    .checkbox-wood.keep
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner,
  .checkbox-wood.keep .ant-checkbox-inner {
    background-color: ${colors.white};
    border-color: ${colors.info};
  }

  .checkbox-wood.success.ant-checkbox-wrapper:not(
      .ant-checkbox-wrapper-disabled
    ):hover
    .checkbox-wood.success
    .ant-checkbox-checked:not(.ant-checkbox-disabled)
    .ant-checkbox-inner,
  .checkbox-wood.success .ant-checkbox-inner {
    background-color: ${colors.white};
    border-color: ${colors.success};
  }

  .checkbox-all-wood .ant-checkbox {
    display: none;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .checkbox-wood {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -15px;
  }
  .checkbox-wood.wasted .ant-checkbox {
    visibility: hidden;

    /* display: none; */
  }
  .checkbox-wood .ant-checkbox-disabled + span {
    color: ${colors.fontDescription};
  }

  .ant-checkbox-group.checkbox-wood-group {
    flex-wrap: nowrap;
    column-gap: 0px;
    flex-grow: 1;
  }
  .ant-checkbox-wrapper {
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
  }
  .ant-checkbox-group {
    /* column-gap: 6px; */
  }
`
