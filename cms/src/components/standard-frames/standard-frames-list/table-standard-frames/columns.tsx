import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Switch } from 'antd'
import { ColumnsType } from 'antd/es/table'

import {
  ITFStandardFrame,
  ITFTableStandardFrame,
} from 'types/standard-frame.type'

import { currency } from 'helper/number'
import { useStandardFrames } from 'hooks/useStandardFrames'

export const useColumnsStandardFrames = () => {
  const {
    activeStandardFrame,
    onClickDelete,
    onClickEdit,
    contextHolder,
    contextHolderModal,
  } = useStandardFrames()

  const columns: ColumnsType<ITFTableStandardFrame> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '10%',
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '15%',
      sorter: (a: ITFStandardFrame, b: ITFStandardFrame) =>
        (a?.name ?? '').localeCompare(b?.name ?? ''),
    },
    {
      title: 'ขนาด',
      dataIndex: 'width',
      key: 'width',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '18%',
      render: (text: any, record: ITFStandardFrame, count: any) => {
        return `${currency(record?.width ?? 0)} x ${currency(
          record?.height ?? 0
        )} นิ้ว`
      },
      sorter: (a: ITFTableStandardFrame, b: ITFTableStandardFrame) =>
        (a?.width ?? 0) - (b?.width ?? 0),
    },
    // {
    //   title: 'หน่วย',
    //   dataIndex: 'unit',
    //   key: 'unit',
    //   onHeaderCell: () => ({
    //     style: { textAlign: 'center' },
    //   }),
    //   onCell: () => ({
    //     style: { textAlign: 'center' },
    //   }),
    //   width: '12%',
    //   render: (text: any, record: ITFStandardFrame, count: any) => {
    //     return 'นิ้ว'
    //   },
    // },
    {
      title: 'เปิดใช้งาน',
      dataIndex: 'isActive',
      key: 'isActive',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '10%',
      render: (text: any, record: ITFStandardFrame, count: any) => {
        return (
          <Switch
            defaultChecked={record?.isActive ?? false}
            onChange={(val: boolean) => {
              activeStandardFrame(val, record)
            }}
          />
        )
      },
      sorter: (a: ITFTableStandardFrame, b: ITFTableStandardFrame) =>
        (a?.isActive ? 1 : 0) - (b?.isActive ? 1 : 0),
    },

    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '12%',
      render: (text: any, record: ITFStandardFrame, count: any) => {
        return (
          <div className="flex justify-center gap-x-4">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              size="small"
              onClick={() => onClickEdit(record)}
            />
            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              size="small"
              danger
              onClick={() => onClickDelete(record?.id)}
            />
          </div>
        )
      },
    },
  ]

  return {
    columns,
    contextHolder,
    contextHolderModal,
  }
}

export default useColumnsStandardFrames
