import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Alert, Col, Row, Table, Tag, Upload, message } from 'antd'
import { Space, Typography } from 'antd'

import { colors } from 'constants/colors'

import columns from './columns'

import { woodStockSelector } from 'app/slice/wood-stocks'
import * as xlsx from 'xlsx'

const { Dragger } = Upload
const { Text, Title } = Typography

export const TableData = () => {
  const { importList: dataPass, importErrorList: dataFailed } =
    useSelector(woodStockSelector)

  return (
    <>
      {(!!dataFailed.length || !!dataPass.length) && (
        <>
          {dataFailed.length > 0 && (
            <Alert
              message={
                <Text type="danger" style={{ fontWeight: 700 }}>
                  มีบางรายการไม่ถูกต้อง กรุณาตรวจสอบ และอัพโหลดไฟล์อีกครั้ง
                </Text>
              }
              type="error"
              className="mb-4"
            />
          )}

          <Title level={5} className="mt-0">
            รายการนำเข้าสต๊อกไม้กรอบ
          </Title>
        </>
      )}
      {!!dataFailed.length && (
        <div className="mt-4">
          {/* <Tag className="mb-2 rounded-[10px]" color={colors.danger}>
            Failed
          </Tag> */}
          <Table dataSource={dataFailed} columns={columns} pagination={false} />
        </div>
      )}
      {!!dataPass.length && (
        <>
          <div className="mt-4">
            {/* <Tag className="mb-2 rounded-[10px]" color={colors.success}>
              Pass
            </Tag> */}
            <Table dataSource={dataPass} columns={columns} pagination={false} />
          </div>
        </>
      )}
    </>
  )
}
