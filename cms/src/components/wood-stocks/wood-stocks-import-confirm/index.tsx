import { useSelector } from 'react-redux'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { LeftOutlined } from '@ant-design/icons'
import { Button, Card, Col, Modal, Row, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import { postImportStock } from 'api/wood-stocks'
import useMessage from 'hooks/useMessage'
import useModal from 'hooks/useModal'
import { useWoodStocks } from 'hooks/useWoodStocks'

import { TableConfirm } from './table-confirm/table-confirm'

import { woodStockSelector } from 'app/slice/wood-stocks'
import { useGetWoodByIDQuery } from 'services/wood'

const { Text, Title } = Typography

export const WoodStocksImportConfirmComponent = () => {
  const [modal, contextHolderModal] = Modal.useModal()
  const navigate = useNavigate()

  const { importList } = useSelector(woodStockSelector)
  const { contextHolder, success, error } = useMessage()
  const { configSubmit } = useModal()
  const { transformDataImport } = useWoodStocks()

  const onClickNext = async () => {
    const confirmed = await modal.confirm({
      ...configSubmit,
      title: 'นำเข้าสต๊อกไม้กรอบ',
      content: (
        <>
          <Text>ต้องการนำเข้าสต๊อกไม้กรอบใช่หรือไม่ ?</Text>
        </>
      ),
    })
    if (!confirmed) {
      return
    }

    try {
      await postImportStock(transformDataImport(importList))
      success()
      setTimeout(() => {
        navigate('/wood-stocks')
      }, 600)
    } catch (e: any) {
      console.log('e:', e)
      error()
    }
  }

  return (
    <>
      {contextHolder}
      {contextHolderModal}
      <div className="flex justify-between">
        <Title level={3}>สต๊อกไม้กรอบ / นำเข้าสต๊อกไม้กรอบ</Title>
        <div className="flex-1"></div>
      </div>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Card
            title="นำเข้าสต๊อกไม้กรอบ"
            bordered={false}
            className="mb-[20px]"
          >
            <div className="grid gap-y-[10px]">
              <TableConfirm />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="mb-[30px] flex justify-end gap-3">
            <Button
              type="default"
              htmlType="button"
              icon={<LeftOutlined />}
              onClick={() => {
                navigate('/wood-stocks/import', {
                  state: {
                    from: '/wood-stocks/import/confirm',
                  },
                })
              }}
              size="large"
            >
              กลับไปก่อนหน้า
            </Button>
            <Button
              size="large"
              type="primary"
              htmlType="button"
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onClick={onClickNext}
              disabled={!importList.length}
            >
              ยืนยัน
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}
