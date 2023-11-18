import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Divider, Upload, message } from 'antd'
import { Space, Typography } from 'antd'

import { useWoodStocks } from 'hooks/useWoodStocks'

import { TableData } from '../table-data/table-data'

import { setImportErrorList, setImportList } from 'app/slice/wood-stocks'
import * as xlsx from 'xlsx'

const { Dragger } = Upload
const { Text, Link } = Typography

export const UploadFile = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { validateImportStock } = useWoodStocks()

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: 'http://localhost:3101/api/v1/uploads',
    beforeUpload: (file) => {
      // console.log('file:', file)
      // const name = file.name
      const reader = new FileReader()
      reader.onload = (evt: any) => {
        const bstr = evt?.target.result
        const wb = xlsx.read(bstr, { type: 'binary' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        /* Convert array of arrays */
        const data = xlsx.utils.sheet_to_json(ws, {})
        validateImportStock(data)
        // const data = xlsx.utils.sheet_to_csv(ws, { header: 1 })
        /* Update state */
        console.log(data)
      }
      reader.readAsBinaryString(file)

      // Prevent upload
      return false
    },
    onChange(info) {
      console.log('info:', info)
      const { status } = info.file
      if (status === 'done') {
        console.log('info.file:', info.file)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    },
    showUploadList: {
      showDownloadIcon: true,
      downloadIcon: 'Download',
      showRemoveIcon: true,
    },
    maxCount: 1,
  }

  useEffect(() => {
    if (location.state?.from !== '/wood-stocks/import/confirm') {
      dispatch(setImportList([]))
      dispatch(setImportErrorList([]))
    }
  }, [location.state])

  return (
    <>
      <Text>อัพโหลดไฟล์</Text>
      <div className="p-4">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            คลิกหรือลากไฟล์ไปยังบริเวณนี้เพื่ออัปโหลด
          </p>
          <p className="ant-upload-hint">
            รองรับไฟล์อัปโหลดประเภท .xlsx, .csv ขนาดไม่เกิน 5MB เท่านั้น
          </p>
        </Dragger>
      </div>
      <Divider />
      <div>
        <TableData />
      </div>
    </>
  )
}
