import React, { useEffect, useState } from 'react'

import { Checkbox, ConfigProvider, Divider, Form, FormItemProps } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'
import type {
  CheckboxOptionType,
  CheckboxValueType,
} from 'antd/es/checkbox/Group'
import { FormItemInputProps } from 'antd/es/form/FormItemInput'
import useFormInstance from 'antd/es/form/hooks/useFormInstance'

import { colors } from 'constants/colors'
import { ITFProductionPlanWood } from 'types/production-plan-wood'

import { parser } from 'helper/number'

import { Container } from './checkbox-group-wood.styles'

import { orderBy } from 'lodash'

const CheckboxGroup = Checkbox.Group

const plainOptions = ['Apple', 'Pear', 'Orange']
const defaultCheckedList = ['Apple', 'Orange']

interface ITFProps {
  name: number
  title: string
  woodLength: number
  wood: ITFProductionPlanWood
  options: CheckboxOptionType[]
  defaultCheckedList?: CheckboxValueType[]
}

export const CheckboxGroupWood = (props: ITFProps) => {
  const form = Form.useFormInstance()
  const { name, title, woodLength, wood } = props
  const isWoodStock = wood.itemType === 'part'
  const orderedItems = orderBy(wood.productionPlanWoodItems ?? [])
  const plainOptions = props.options ?? []
  const plainOptionsEnabled = orderedItems.filter(
    (item) => item.type === 'normal'
  )
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(
    props.defaultCheckedList ?? []
  )

  const withdrawnWood = !!wood?.tempWood
  const checkAll = plainOptionsEnabled.length === checkedList.length
  const indeterminate =
    checkedList.length > 0 && checkedList.length < plainOptionsEnabled.length

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list)
  }

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const list = e.target.checked
      ? plainOptionsEnabled.map((item) => item.id)
      : []
    setCheckedList(list)
  }

  const getColor = (item: any) => {
    const checked = checkedList.includes(item.id)

    if (item.cuttingStatus === 'pending') {
      switch (item.type) {
        case 'keep':
          return checked ? 'bg-info' : 'bg-slate-300'
        case 'wasted':
          return 'bg-slate-200'
        case 'normal':
        default:
          return checked ? 'bg-warning' : 'bg-slate-400'
      }
    }

    if (item.cuttingStatus === 'success') {
      switch (item.type) {
        case 'keep':
          return 'bg-info'
        case 'wasted':
          return 'bg-slate-200'
        case 'normal':
        default:
          return 'bg-success'
      }
    }
  }

  useEffect(() => {
    const val = form.getFieldValue('productionPlanWoods')
    val[name] = { ...val[name], checkboxAll: checkAll, checkbox: checkedList }
    form.setFieldValue('productionPlanWoods', val)
  }, [form, name, checkAll, checkedList])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.warning,
          // colorBorder: colors.warning,
          // colorPrimaryBorder: colors.warning,
          // lineWidth: 3,
        },
      }}
    >
      <Container>
        <div key={`item-no-${wood.id}`} className="flex items-center">
          <div
            className="w-[60px]"
            style={{
              color: isWoodStock ? colors.primary : colors.fontDescription,
              fontWeight: isWoodStock ? 600 : 'normal',
            }}
          >
            {/* {wood.length} */}
            <Form.Item
              name={[name, 'checkboxAll']}
              valuePropName="checked"
              noStyle
            >
              <Checkbox
                onChange={onCheckAllChange}
                checked={checkAll}
                className="checkbox-all-wood w-[60px] text-center font-bold"
                style={{
                  color:
                    wood?.itemType === 'part'
                      ? colors.primary
                      : colors.fontTitle,
                }}
                disabled={!withdrawnWood}
              >
                {props.title}
              </Checkbox>
            </Form.Item>
          </div>
          <div className="flex flex-1 flex-row">
            <Form.Item
              name={[name, 'checkbox']}
              valuePropName="checked"
              className="flex flex-1 flex-row"
              noStyle
            >
              <CheckboxGroup
                value={checkedList}
                onChange={onChange}
                className="checkbox-wood-group"
              >
                {orderedItems.map((item, idx: number) => {
                  const percent =
                    (parser(item.length ?? 0) * 100) / parser(woodLength)
                  const colorWasted = getColor(item)

                  return (
                    <div
                      key={item.id}
                      className={`mr-[6px] flex h-[8px] justify-center  ${colorWasted}`}
                      style={{
                        width: `${percent}%`,
                      }}
                    >
                      <div className="relative mt-[10px] w-full">
                        <Checkbox
                          key={item.id}
                          value={item.id}
                          disabled={item.type === 'wasted' || !withdrawnWood}
                          className={`checkbox-wood ${item.type} ${item.cuttingStatus}`}
                        >
                          {parser(item.length ?? 0).toFixed(2)}
                        </Checkbox>
                        {/* {parser(item.length ?? 0).toFixed(2)} */}
                      </div>
                    </div>
                  )
                })}
              </CheckboxGroup>
            </Form.Item>
          </div>
        </div>
        {/* <Form.Item
        name={[name, 'checkbox']}
        valuePropName="checked"
        className="flex flex-1 flex-row"
      >
        <CheckboxGroup
          value={checkedList}
          onChange={onChange}
          className="w-full"
        >
          {plainOptions.map((option: any, index: number) => {
            const item = wood?.productionPlanWoodItems?.[index]
            const percent =
              (parser(item?.length ?? 0) * 100) / parser(woodLength)

            // console.log('item:', item?.id, option.value)
            return (
              <Checkbox
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Checkbox>
            )
          })}
        </CheckboxGroup>
      </Form.Item> */}
      </Container>
    </ConfigProvider>
  )
}

export default CheckboxGroupWood
