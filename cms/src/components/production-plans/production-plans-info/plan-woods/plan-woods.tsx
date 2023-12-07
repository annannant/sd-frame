import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Checkbox,
  ConfigProvider,
  Form,
  InputNumber,
  Table,
} from 'antd'

import {
  ButtonPrimarySuccess,
  ButtonPrimaryWarning,
} from 'common/button/single-color-button'

import { colors } from 'constants/colors'
import { ITFProductionPlanWood } from 'types/production-plan-wood'
import {
  ITFProductionPlanWoodItem,
  TypeProductionPlanWoodItemCuttingStatus,
} from 'types/production-plan-wood-item'

import { patchUpdateStatus } from 'api/production-plan-wood-items'
import { parser } from 'helper/number'
import useMessage from 'hooks/useMessage'

import CheckboxGroupWood from './checkbox-group-wood'
import { ModalManageWoodWasted } from './modal-manage-wood-wasted'

import { setParamsCreatePlan } from 'app/slice/production-orders'
import { flatten, orderBy, sortBy } from 'lodash'
import { useGetProductionPlanByIDQuery } from 'services/production-plan'

export const PlanWoods = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [open, setOpen] = useState(false)

  const { id }: any = useLoaderData()
  const { data, refetch } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const { contextHolder, success, error } = useMessage()

  const orderInfo = data?.productionOrder ?? {}
  const loading = false
  const woodLength = parser(orderInfo?.wood?.woodType?.length ?? '')

  const formProductionPlanWoods = Form.useWatch('productionPlanWoods', form)
  const firstCheckedItem = useMemo((): ITFProductionPlanWoodItem | null => {
    for (const iterator of formProductionPlanWoods ?? []) {
      if (iterator?.checkbox?.length > 0) {
        const item = iterator?.productionPlanWoodItems?.find(
          (item: ITFProductionPlanWoodItem) => item.id === iterator?.checkbox[0]
        )
        return item
      }
    }
    return null
  }, [formProductionPlanWoods])

  const {
    title,
    method,
    type: checkedType,
  } = useMemo(() => {
    const type = firstCheckedItem?.type ?? 'normal'
    if (firstCheckedItem?.type === 'keep') {
      return {
        title: 'อัพเดทสถานะ',
        type,
        method: 'update',
      }
    }

    switch (firstCheckedItem?.cuttingStatus) {
      case 'success':
        return {
          title: 'ย้อนสถานะ',
          type,
          method: 'reverse',
        }
      case 'pending':
      default:
        return {
          title: 'อัพเดทสถานะ',
          type,
          method: 'update',
        }
    }
  }, [firstCheckedItem])
  console.log('checkedType:', checkedType)

  const productionPlanWoods = useMemo(() => {
    const formatted = (data?.productionPlanWoods ?? []).map(
      (item: ITFProductionPlanWood) => {
        console.log(
          'item.productionPlanWoodItems:',
          item.productionPlanWoodItems
        )

        const productionPlanWoodItems = (
          item.productionPlanWoodItems ?? []
        ).map((val) => ({
          ...val,
          length: parser(val.length),
          hasRemaining: val.type === 'keep' ? 1 : 0,
        }))

        return {
          ...item,
          productionPlanWoodItems: orderBy(
            productionPlanWoodItems,
            ['hasRemaining', 'length'],
            ['asc', 'desc']
          ),
          length: parser(item.length),
          hasRemaining: item.productionPlanWoodItems?.find(
            (val) => val.type === 'keep'
          )
            ? 1
            : 0,
        }
      }
    )
    return orderBy(formatted, ['length', 'hasRemaining'], ['asc', 'asc'])
  }, [data?.productionPlanWoods])

  const onClickCalulate = () => {
    dispatch(
      setParamsCreatePlan({
        sparePart: form?.getFieldValue('sparePart') ?? 0.25,
      })
    )
  }

  const updateStatus = async () => {
    try {
      const values = form.getFieldValue('productionPlanWoods')
      const data = values.filter((item: any) => item.checkbox?.length > 0)

      const payload = {
        cuttingStatus:
          method === 'reverse'
            ? 'pending'
            : ('success' as TypeProductionPlanWoodItemCuttingStatus),
        ids: flatten(data.map((item: any) => item.checkbox)).map((item: any) =>
          parseFloat(item)
        ),
      }
      await patchUpdateStatus(payload)
      success()
      refetch()
    } catch (err) {
      console.log('err:', err)
      error()
    }
  }

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    form.setFieldValue('productionPlanWoods', productionPlanWoods)
  }, [productionPlanWoods])

  return (
    <>
      {contextHolder}
      <Card
        title={
          <div className="flex items-center justify-between">
            <div>รายการไม้ที่ต้องตัด</div>
            <div className="flex gap-4">
              <Button
                type="primary"
                htmlType="button"
                onClick={onOpen}
                // style={{ width: 100 }}
              >
                จัดการไม้ผลิตเสีย
              </Button>
              {/* <Button
              type="primary"
              htmlType="button"
              onClick={updateStatus}
              style={{ width: 100 }}
            >
              กำลังตัด
            </Button> */}
              <Button
                type="primary"
                htmlType="button"
                onClick={updateStatus}
                disabled={checkedType !== 'normal'}
              >
                {title}
              </Button>
            </div>
          </div>
        }
        bordered={false}
      >
        <div className="mb-[40px] flex justify-end gap-x-3">
          <span>ส่วนเผื่อเหลือ (Spare Part): </span>{' '}
          {parseFloat(data?.sparePart ?? '0')} นิ้ว
          {/* <Form.Item
          label="ส่วนเผื่อเหลือ (Spare Part)"
          name={'sparePart'}
          style={{ width: '50%' }}
          rules={[
            {
              required: true,
              message: 'ระบุส่วนเผื่อเหลือ',
            },
          ]}
          className="w-full"
        >
          <InputNumber
            max={3}
            placeholder="ส่วนเผื่อเหลือ"
            style={{ width: '100%' }}
          />
        </Form.Item> */}
          {/* <ConfigProvider
          theme={{
            token: {
              colorPrimary: colors.success,
            },
          }}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={onClickCalulate}
            style={{ width: 100 }}
          >
            คำนวณ
          </Button>
        </ConfigProvider> */}
        </div>
        {loading && (
          <div className="mb-10 flex justify-center py-10">
            {
              <LoadingOutlined
                style={{ fontSize: 38, color: colors.primary }}
                spin
              />
            }
          </div>
        )}

        <Form form={form} className="mb-8 flex flex-col gap-y-[35px]">
          <Form.List name="productionPlanWoods">
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(({ key, name, ...restField }, index) => {
                    const record = productionPlanWoods?.[index]
                    const options = record?.productionPlanWoodItems?.map(
                      (item: ITFProductionPlanWoodItem) => {
                        return {
                          label: parser(item.length ?? 0).toFixed(2),
                          value: item.id,
                          disabled: item.type === 'wasted',
                          data: {
                            type: item.type,
                          },
                        }
                      }
                    )

                    return (
                      <div key={record?.id} className="">
                        <CheckboxGroupWood
                          woodLength={woodLength}
                          name={name}
                          title={record.length.toString()}
                          options={options}
                          wood={record}
                        />
                      </div>
                    )
                  })}
                </>
              )
            }}
          </Form.List>
        </Form>

        {!loading && false && (
          <div className="mb-8 flex flex-col gap-y-[32px]">
            {(productionPlanWoods ?? []).map(
              (wood: ITFProductionPlanWood, index: number) => {
                const isWoodStock = wood.itemType === 'part'
                const orderedItems = wood.productionPlanWoodItems ?? []
                return (
                  <div key={`item-no-${wood.id}`} className="flex items-center">
                    <div
                      className="w-[60px]"
                      style={{
                        color: isWoodStock
                          ? colors.primary
                          : colors.fontDescription,
                        fontWeight: isWoodStock ? 600 : 'normal',
                      }}
                    >
                      {wood.length}
                    </div>
                    <div className="flex flex-1 flex-row">
                      {orderedItems.map((item, idx: number) => {
                        const percent =
                          (parser(item.length ?? 0) * 100) / parser(woodLength)
                        let colorWasted
                        switch (item.type) {
                          case 'keep':
                            colorWasted = 'bg-secondary'
                            break
                          case 'wasted':
                            colorWasted = 'bg-danger'
                            break
                          default:
                            colorWasted = 'bg-warning'
                            break
                        }

                        return (
                          <div
                            key={item.id}
                            className={`mr-[6px] flex h-[8px] justify-center  ${colorWasted}`}
                            style={{
                              width: `${percent}%`,
                            }}
                          >
                            <div className="mt-[10px]">
                              {parser(item.length ?? 0).toFixed(2)}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              }
            )}
          </div>
        )}
      </Card>
      <ModalManageWoodWasted open={open} onClose={onClose} />
    </>
  )
}
