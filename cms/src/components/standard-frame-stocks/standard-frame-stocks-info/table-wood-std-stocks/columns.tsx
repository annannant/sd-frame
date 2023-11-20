import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { colors } from 'constants/colors'
import { ITFTableStandardFrameStock } from 'types/standard-frame-stock.type'

import { currency } from 'helper/number'
import { convertWoodName } from 'helper/wood'
import { useStandardFrameStocks } from 'hooks/useStandardFrameStocks'

export const useColumnsWoodStandardFrameStocks = () => {
  const { onClickDelete, onClickEdit, contextHolder, contextHolderModal } =
    useStandardFrameStocks()

  const columns: ColumnsType<ITFTableStandardFrameStock> = [
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
      title: 'รหัสไม้',
      dataIndex: 'woodCode',
      key: 'woodCode',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '10%',
      render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
        return record?.wood?.code
      },
      sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
        (a?.wood?.code ?? '').localeCompare(b?.wood?.code ?? ''),
    },
    {
      title: 'ชื่อไม้',
      dataIndex: 'woodName',
      key: 'woodName',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'left' },
      }),
      width: '30%',
      render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
        return convertWoodName(record?.wood ?? {})
      },
      sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
        convertWoodName(a?.wood ?? {}).localeCompare(
          convertWoodName(b?.wood ?? {})
        ),
    },
    // {
    //   title: 'ประเภท',
    //   dataIndex: 'woodType',
    //   key: 'woodType',
    //   onHeaderCell: () => ({
    //     style: { textAlign: 'center' },
    //   }),
    //   onCell: () => ({
    //     style: { textAlign: 'center' },
    //   }),
    //   width: '15%',
    //   render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
    //     return `${record?.wood?.woodType?.name} (${record?.wood?.woodType?.code})`
    //   },
    //   sorter: (
    //     a: ITFTableStandardFrameStock,
    //     b: ITFTableStandardFrameStock
    //   ) => {
    //     const typeA = `${a?.wood?.woodType?.name} (${a?.wood?.woodType?.code})`
    //     const typeB = `${b?.wood?.woodType?.name} (${b?.wood?.woodType?.code})`
    //     return (typeA ?? '').localeCompare(typeB ?? '')
    //   },
    // },
    // {
    //   title: 'ขนาดหน้าไม้',
    //   dataIndex: 'woodType',
    //   key: 'woodType',
    //   onHeaderCell: () => ({
    //     style: { textAlign: 'center' },
    //   }),
    //   onCell: () => ({
    //     style: { textAlign: 'center' },
    //   }),
    //   width: '15%',
    //   render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
    //     return convertSizeSymbol(
    //       record?.wood?.woodType?.width,
    //       record?.wood?.woodType?.sizeUnit ?? ''
    //     )
    //   },

    //   sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
    //     (a?.wood?.code ?? '').localeCompare(b?.wood?.code ?? ''),
    // },
    {
      title: 'สต๊อก',
      dataIndex: 'stock',
      key: 'stock',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'right' },
      }),
      width: '10%',
      render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
        return (
          <div
            className="px-[20px]"
            style={{
              color:
                (record?.stock ?? 0) < (record?.reorderPoint ?? 0)
                  ? colors.danger
                  : undefined,
            }}
          >
            {currency(record?.stock ?? 0)}
          </div>
        )
      },
      sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
        (a?.stock ?? 0) - (b?.stock ?? 0),
    },
    {
      title: 'จุดสั่งผลิต (Reorder Point)',
      dataIndex: 'reorderPoint',
      key: 'reorderPoint',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'right' },
      }),
      width: '15%',
      render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
        return (
          <div className="px-[20px]">{currency(record?.reorderPoint ?? 0)}</div>
        )
      },
      sorter: (a: ITFTableStandardFrameStock, b: ITFTableStandardFrameStock) =>
        (a?.reorderPoint ?? 0) - (b?.reorderPoint ?? 0),
    },
    {
      title: 'จำนวนที่ต้องสั่งผลิต',
      dataIndex: 'reorderPoint',
      key: 'reorderPoint',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      onCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '15%',
      render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
        const reorder = (record?.reorderPoint ?? 0) - (record?.stock ?? 0)
        return reorder > 0 ? `${currency(reorder)}` : ''
      },
      sorter: (
        a: ITFTableStandardFrameStock,
        b: ITFTableStandardFrameStock
      ) => {
        const reorderA = (a?.reorderPoint ?? 0) - (a?.stock ?? 0)
        const reorderB = (b?.reorderPoint ?? 0) - (b?.stock ?? 0)
        return reorderA - reorderB
      },
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      onHeaderCell: () => ({
        style: { textAlign: 'center' },
      }),
      width: '12%',
      render: (text: any, record: ITFTableStandardFrameStock, count: any) => {
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
              onClick={() =>
                onClickDelete(record?.standardFrameId ?? 0, record?.woodId ?? 0)
              }
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

export default useColumnsWoodStandardFrameStocks
