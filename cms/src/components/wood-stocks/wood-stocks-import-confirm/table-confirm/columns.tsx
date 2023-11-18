import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
} from '@ant-design/icons'
import { Dropdown, MenuProps, Space, Tag, Tooltip, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { TagStatus } from 'common/tag-status'

import { colors } from 'constants/colors'
import { ITFTableImportWoodStock } from 'types/wood-stock-import.type'

import { currency } from 'helper/number'
import { convertWoodName } from 'helper/wood'

const { Text, Title } = Typography

const columns: ColumnsType<ITFTableImportWoodStock> = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '5%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      return count + 1
    },
  },

  {
    title: 'รหัสไม้',
    dataIndex: 'woodCode',
    key: 'woodCode',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '8%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('wood_not_found')
      return (
        <Tooltip
          title={error ? 'ไม่พบข้อมูลไม้' : ''}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          <Text type={error ? 'danger' : undefined}>{text}</Text>
        </Tooltip>
        // <div className="flex flex-col">
        //   <Text>{text}</Text>
        //   {error && (
        //     <Text type="danger" style={{ fontSize: 12 }}>
        //       ไม่พบข้อมูลไม้
        //     </Text>
        //   )}
        // </div>
      )
    },
  },
  {
    title: 'ชื่อไม้',
    dataIndex: 'woodName',
    key: 'woodName',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    ellipsis: true,
    width: '15%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('wood_not_found')
      return (
        <>
          <Tooltip
            title={error ? 'ไม่พบข้อมูลไม้' : ''}
            style={{ visibility: error ? 'visible' : 'hidden' }}
          >
            {error ? (
              <Text type="danger">{record?.woodName}</Text>
            ) : (
              <Text>{convertWoodName(record?.wood)}</Text>
            )}
          </Tooltip>
        </>
        // <div className="flex flex-col">
        //   {error ? (
        //     <>
        //       <Text className="overflow-hidden text-ellipsis">
        //         {record?.woodName}
        //       </Text>
        //       <Text type="danger" style={{ fontSize: 12 }}>
        //         ไม่พบข้อมูลไม้
        //       </Text>
        //     </>
        //   ) : (
        //     <Text>{convertWoodName(record?.wood)}</Text>
        //   )}
        // </div>
      )
    },
  },
  {
    title: 'Lot',
    dataIndex: 'importToLot',
    key: 'importToLot',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '8%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      return (
        <div className="flex justify-center">
          <Text>{currency(text ?? 0)} </Text>
          {record?.isNewLot && (
            <Tag bordered={false} color="success" style={{ margin: 0 }}>
              New
            </Tag>
          )}
        </div>
      )
    },
  },
  {
    title: 'จำนวนที่นำเข้า',
    dataIndex: 'qty',
    key: 'qty',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    width: '10%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      return <Text>{currency(text ?? '')}</Text>
    },
  },
  {
    title: 'จำนวนคงเหลือปัจจุบัน',
    dataIndex: 'currentStock',
    key: 'currentStock',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    width: '12%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      return <Text>{currency(text ?? 0)}</Text>
    },
  },
  {
    title: 'จำนวนคงเหลือใหม่',
    dataIndex: 'newStock',
    key: 'newStock',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    width: '12%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      return <Text>{currency(text ?? 0)}</Text>
    },
  },
  {
    title: 'ตำแหน่งที่จัดเก็บ',
    dataIndex: 'locationName',
    key: 'locationName',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '15%',
    ellipsis: true,
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('location_not_found')
      return (
        <>
          <Text>
            {record?.location?.name} (<Text>{record?.location?.code}</Text>)
          </Text>
        </>
      )
    },
  },

  {
    title: 'หมายเหตุ',
    dataIndex: 'remark',
    key: 'remark',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '15%',
    ellipsis: true,
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      return <Text title={text ?? ''}>{text}</Text>
    },
  },
]

export default columns
