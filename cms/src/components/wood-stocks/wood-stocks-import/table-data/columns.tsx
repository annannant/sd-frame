import {
  CheckCircleFilled,
  CloseCircleFilled,
  DownOutlined,
} from '@ant-design/icons'
import { Dropdown, MenuProps, Space, Tooltip, Typography } from 'antd'
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
    width: '12%',
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
    width: '20%',
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
    dataIndex: 'lot',
    key: 'lot',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    width: '8%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('lot_must_be_number')
      return (
        <Tooltip
          title={error ? 'Lot ต้องเป็นตัวเลข' : ''}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          <Text type={error ? 'danger' : undefined}>
            {error ? text ?? '' : text ? currency(text ?? '') : '(New)'}
          </Text>
        </Tooltip>
        //   <div className="flex flex-col">
        //     {errorType ? (
        //       <>
        //         <Text>{text}</Text>
        //         <Text type="danger" style={{ fontSize: 12 }}>
        //           lot ต้องเป็นตัวเลข
        //         </Text>
        //       </>
        //     ) : (
        //       <Text>{text}</Text>
        //     )}
        //   </div>
      )
    },
  },
  {
    title: 'จำนวน',
    dataIndex: 'qty',
    key: 'qty',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'right' },
    }),
    width: '8%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('qty_must_be_number')
      return (
        <Tooltip
          title={error ? 'จำนวนต้องเป็นตัวเลข' : ''}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          <Text type={error ? 'danger' : undefined}>
            {error ? text ?? '' : currency(text ?? '')}
          </Text>
        </Tooltip>
        // <div className="flex flex-col">
        //   {errorType ? (
        //     <>
        //       <Text>{text}</Text>
        //       <Text type="danger" style={{ fontSize: 12 }}>
        //         จำนวนต้องเป็นตัวเลข
        //       </Text>
        //     </>
        //   ) : (
        //     <Text>{text}</Text>
        //   )}
        // </div>
      )
    },
  },
  {
    title: 'รหัสตำแหน่งที่จัดเก็บ',
    dataIndex: 'locationCode',
    key: 'locationCode',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '15%',
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('location_not_found')
      return (
        <Tooltip
          title={error ? 'ไม่พบข้อมูลสถานที่จัดเก็บ' : ''}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          <Text type={error ? 'danger' : undefined}>{text}</Text>
        </Tooltip>
        //   <div className="flex flex-col">
        //     <Text>{text}</Text>
        //     {error && (
        //       <Text type="danger" style={{ fontSize: 12 }}>
        //         ไม่พบข้อมูลสถานที่จัดเก็บ
        //       </Text>
        //     )}
        //   </div>
      )
    },
  },
  {
    title: 'ชื่อตำแหน่งที่จัดเก็บ',
    dataIndex: 'locationName',
    key: 'locationName',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    width: '20%',
    ellipsis: true,
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      const error = record.errors?.includes('location_not_found')
      return (
        <Tooltip
          title={error ? 'ไม่พบข้อมูลสถานที่จัดเก็บ' : ''}
          style={{ visibility: error ? 'visible' : 'hidden' }}
        >
          {error ? (
            <Text type="danger">{record?.locationName}</Text>
          ) : (
            <Text>{record?.location?.name}</Text>
          )}
        </Tooltip>
        //   <div className="flex flex-col">
        //     {error ? (
        //       <>
        //         <div className="overflow-hidden text-ellipsis">
        //           {record?.locationName}
        //         </div>
        //         <Text type="danger" style={{ fontSize: 12 }}>
        //           ไม่พบข้อมูลไม้
        //         </Text>
        //       </>
        //     ) : (
        //       <Text>{record?.location?.name}</Text>
        //     )}
        //   </div>
      )
    },
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    onHeaderCell: () => ({
      style: { textAlign: 'center' },
    }),
    onCell: () => ({
      style: { textAlign: 'center' },
    }),
    render: (text: any, record: ITFTableImportWoodStock, count: any) => {
      // const items: MenuProps['items'] = record?.errors?.map((item, index) => {
      //   return {
      //     key: index.toString,
      //     label: item,
      //   }
      // })
      // const items: MenuProps['items'] = [
      //   {
      //     key: '1',
      //     label: 'Item 1',
      //   },
      //   {
      //     key: '2',
      //     label: 'Item 2',
      //   },
      //   {
      //     key: '3',
      //     label: 'Item 3',
      //   },
      // ]
      return (
        <div className="m-auto flex justify-center gap-3">
          <div>
            {text === 'pass' ? (
              <CheckCircleFilled style={{ color: colors.success }} />
            ) : (
              <CloseCircleFilled style={{ color: colors.danger }} />
            )}
          </div>
          {/* <Dropdown
            placement="bottomRight"
            overlayStyle={{ borderRadius: 10 }}
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ['3'],
            }}
          >
            <Typography.Link>
              <Space>
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown> */}
        </div>
      )
    },
  },
]

export default columns