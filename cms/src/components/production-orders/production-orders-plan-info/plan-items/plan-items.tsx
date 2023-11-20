import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'

import { LoadingOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Form, InputNumber, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'
import { ITFProductionOrderPlan } from 'types/production-order-plan'

import { parser } from 'helper/number'

import {
  productionOrdersSelector,
  setParamsCreatePlan,
} from 'app/slice/production-orders'
import { orderBy, sortBy, sum } from 'lodash'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionCreatePlanQuery,
} from 'services/production-order'

export const PlanItems = () => {
  const dispatch = useDispatch()

  const form = Form.useFormInstance()
  const { paramsCreatePlan } = useSelector(productionOrdersSelector)
  const { id }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id)
  const { isLoading, data, refetch } = usePostProductionCreatePlanQuery({
    id: id,
    sparePart: paramsCreatePlan?.sparePart ?? 0.25,
  })

  const { plans, minLength } = data ?? {}
  const orderedPlans = orderBy(plans ?? [], ['wood'], ['asc'])
  const woodLength = orderInfo?.wood?.woodType?.length ?? 0

  const onClickCalulate = () => {
    dispatch(
      setParamsCreatePlan({
        id: id,
        sparePart: form?.getFieldValue('sparePart') ?? 0.25,
      })
    )
  }

  useEffect(() => {
    refetch()
  }, [paramsCreatePlan])

  useEffect(() => {
    form?.setFieldValue('sparePart', 0.25)
  }, [])

  return (
    <Card title="รายการไม้ที่ต้องตัด" bordered={false}>
      <div className="mb-[40px] flex justify-end gap-x-3">
        <Form.Item
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
        </Form.Item>
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
      {isLoading && (
        <div className="mb-10 flex justify-center py-10">
          {
            <LoadingOutlined
              style={{ fontSize: 38, color: colors.primary }}
              spin
            />
          }
        </div>
      )}

      <div className="mb-8 flex flex-col gap-y-[32px]">
        {(orderedPlans ?? []).map(
          (item: ITFProductionOrderPlan, index: number) => {
            const sumWidth = sum(item.list ?? [])
            const isWoodStock = parser(item.wood ?? '') !== parser(woodLength)
            const remaining = parser(
              (isWoodStock ? parser(item.wood ?? '') : parser(woodLength)) -
                parser(sumWidth)
            )
            const percentRemaining =
              (parser(remaining ?? 0) * 100) / parser(woodLength)
            const colorWasted =
              remaining >= parser(minLength ?? 0) ? 'bg-secondary' : 'bg-danger'

            const orderedItems = sortBy(item.list ?? []).reverse()
            return (
              <div key={`${item.no}`} className="flex items-center">
                <div
                  className="w-[60px]"
                  style={{
                    color: isWoodStock
                      ? colors.primary
                      : colors.fontDescription,
                    fontWeight: isWoodStock ? 600 : 'normal',
                  }}
                >
                  {item.wood}
                </div>
                <div className="flex flex-1 flex-row">
                  {orderedItems.map((width, idx: number) => {
                    const percent =
                      (parser(width ?? 0) * 100) / parser(woodLength)
                    return (
                      <div
                        key={idx}
                        className={`mr-[6px] flex h-[8px] justify-center bg-warning`}
                        style={{
                          width: `${percent}%`,
                        }}
                      >
                        <div className="mt-[10px]">
                          {parser(width).toFixed(2)}
                        </div>
                      </div>
                    )
                  })}
                  {remaining > 0 && (
                    <div
                      className={`mr-[6px] flex h-[8px] justify-center ${colorWasted}`}
                      style={{
                        width: `${percentRemaining}%`,
                      }}
                    >
                      <div className="mt-[10px]">
                        {parser(remaining).toFixed(2)}
                      </div>
                    </div>
                  )}
                  {/* {sumWidth} */}
                </div>
              </div>
            )
          }
        )}
      </div>
    </Card>
  )
}
