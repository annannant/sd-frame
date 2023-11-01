import { useMemo } from 'react'
import { useLoaderData } from 'react-router-dom'

import { Button, Card, ConfigProvider, Form, InputNumber, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import {
  ITFProductionOrderItem,
  ITFTableProductionOrderItem,
} from 'types/production-order-items.type'
import { ITFProductionOrderPlan } from 'types/production-order-plan'

import { parser } from 'helper/number'

import { sum } from 'lodash'
import {
  useGetProductionOrderByIDQuery,
  usePostProductionCreatePlanQuery,
} from 'services/production-order'

export const PlanItems = () => {
  const { id, action }: any = useLoaderData()
  const { data: orderInfo } = useGetProductionOrderByIDQuery(id)
  const { isLoading, data } = usePostProductionCreatePlanQuery(id)
  const { plans, minLength } = data ?? {}
  const woodLength = orderInfo?.wood?.woodType?.length ?? 0

  return (
    <Card title="รายการไม้ที่ต้องตัด" bordered={false}>
      <div className="mb-[40px] flex justify-end gap-x-3">
        <Form.Item
          label="ส่วนเผื่อเหลือ (Spare Part)"
          name={'sparePArt'}
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
            defaultValue={0.25}
          />
        </Form.Item>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: colors.green,
            },
          }}
        >
          <Button
            type="primary"
            htmlType="button"
            onClick={() => {}}
            style={{ width: 100 }}
          >
            คำนวณ
          </Button>
        </ConfigProvider>
      </div>
      <div className="mb-8 flex flex-col gap-y-[32px]">
        {(plans ?? []).map((item: ITFProductionOrderPlan, index: number) => {
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

          return (
            <div key={`${item.no}`} className="flex items-center">
              <div
                className="w-[60px]"
                style={{
                  color: isWoodStock ? colors.primary : colors.fontDescription,
                  fontWeight: isWoodStock ? 600 : 'normal',
                }}
              >
                {item.wood}
              </div>
              <div className="flex flex-1 flex-row">
                {(item.list ?? []).map((width, idx: number) => {
                  const percent =
                    (parser(width ?? 0) * 100) / parser(woodLength)
                  return (
                    <div
                      key={idx}
                      className={`bg-yellow mr-[6px] flex h-[8px] justify-center`}
                      style={{
                        width: `${percent}%`,
                      }}
                    >
                      <div className="mt-[10px]">{width}</div>
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
                    <div className="mt-[10px]">{parser(remaining)}</div>
                  </div>
                )}
                {/* {sumWidth} */}
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
