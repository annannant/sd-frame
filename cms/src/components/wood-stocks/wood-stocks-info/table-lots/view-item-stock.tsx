import { useMemo, useState } from 'react'

import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { Button, Modal, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { ITFWoodItemStock } from 'types/wood-item-stock.type'
import { ITFWoodStock } from 'types/wood-stock.type'

import { convertLocationLabel } from 'helper/location'
import { currency } from 'helper/number'

import { orderBy } from 'lodash'

interface ITFProps {
  data: ITFWoodStock
}

export const ViewItemStock = (props: ITFProps) => {
  const { data: woodStock } = props
  const total = woodStock?.woodItemStocks?.length ?? 0

  const [open, setOpen] = useState(false)
  const openModal = () => {
    setOpen(true)
  }
  const onCancel = () => {
    setOpen(false)
  }

  const onOk = () => {
    setOpen(false)
  }
  const dataSource = useMemo(() => {
    return orderBy(woodStock?.woodItemStocks ?? [], 'createdAt', 'desc')?.map(
      (item, index) => {
        return {
          ...item,
          key: item.id,
          no: index + 1,
        }
      }
    )
  }, [woodStock?.woodItemStocks])

  const columns: ColumnsType<ITFWoodItemStock> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      // onHeaderCell: () => ({
      //   style: { textAlign: 'center' },
      // }),
      align: 'center',
    },
    {
      title: 'ความยาว',
      dataIndex: 'woodLength',
      key: 'woodLength',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'right' },
      }),
      render: (text: any, record: ITFWoodItemStock, count: any) => {
        return <div>{currency(text ?? 0)} "</div>
      },
    },
    {
      title: 'จำนวน',
      dataIndex: 'stock',
      key: 'stock',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'right' },
      }),
      render: (text: any, record: ITFWoodItemStock, count: any) => {
        return <div>{currency(text ?? 0)}</div>
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'used',
      key: 'used',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      render: (text: any, record: ITFWoodItemStock, count: any) => {
        return (
          <>
            {text !== 0 ? (
              <Tag
                icon={<CloseCircleOutlined className="mb-1" />}
                color="error"
              >
                ถูกจอง
              </Tag>
            ) : (
              <Tag icon={<CheckCircleOutlined />} color="success">
                พร้อมใช้งาน
              </Tag>
            )}
          </>
        )
      },
    },

    {
      title: 'ตำแหน่งที่ตั้ง',
      dataIndex: 'location',
      key: 'location',
      render: (text: any, record: ITFWoodItemStock, count: any) => {
        return (
          <div>
            {record?.location && convertLocationLabel(record?.location)}
          </div>
        )
      },
    },
  ]

  return (
    <>
      {total > 0 ? (
        <Button type="link" className="font-bold" onClick={openModal}>
          {total}
        </Button>
      ) : (
        <div>-</div>
      )}

      <Modal
        open={open}
        onCancel={onCancel}
        onOk={onOk}
        width={680}
        footer={null}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </Modal>
    </>
  )
}
