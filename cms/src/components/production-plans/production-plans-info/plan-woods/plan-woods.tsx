import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData, useSearchParams } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Form, InputNumber, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'
import { ITFProductionOrderPlan } from 'types/production-order-plan.type'
import { ITFProductionPlanWood } from 'types/production-plan-wood'

import { parser } from 'helper/number'

import {
  productionOrdersSelector,
  setParamsCreatePlan,
} from 'app/slice/production-orders'
import { orderBy, sortBy, sum } from 'lodash'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionOrderCreatePlanQuery,
} from 'services/production-order'
import { useGetProductionPlanByIDQuery } from 'services/production-plan'

export const PlanWoods = () => {
  const dispatch = useDispatch()
  const form = Form.useFormInstance()

  const { id }: any = useLoaderData()
  const { data } = useGetProductionPlanByIDQuery(id, { skip: !id })
  const productionPlanWoods = useMemo(() => {
    const formatted = (data?.productionPlanWoods ?? []).map(
      (item: ITFProductionPlanWood) => {
        return {
          ...item,
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
  const orderInfo = data?.productionOrder ?? {}
  const loading = false
  const woodLength = parser(orderInfo?.wood?.woodType?.length ?? '')

  const onClickCalulate = () => {
    dispatch(
      setParamsCreatePlan({
        sparePart: form?.getFieldValue('sparePart') ?? 0.25,
      })
    )
  }

  return (
    <Card title="รายการไม้ที่ต้องตัด" bordered={false}>
      <div className="mb-[40px] flex justify-end gap-x-3">
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
        <ConfigProvider
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
        </ConfigProvider>
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

      {!loading && (
        <div className="mb-8 flex flex-col gap-y-[32px]">
          {(productionPlanWoods ?? []).map(
            (wood: ITFProductionPlanWood, index: number) => {
              const isWoodStock = wood.itemType === 'part'
              const orderedItems = sortBy(
                wood.productionPlanWoodItems ?? []
              ).reverse()
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
  )
}
