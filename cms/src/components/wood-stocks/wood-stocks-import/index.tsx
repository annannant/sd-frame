import { useSelector } from 'react-redux'
import { useLoaderData, useNavigate } from 'react-router-dom'

import { Button, Card, Col, Modal, Row, Typography } from 'antd'

import { ButtonBack } from 'common/button/back-button'

import useModal from 'hooks/useModal'

import { UploadFile } from './upload-file/upload-file'

import { woodStockSelector } from 'app/slice/wood-stocks'
import { useGetWoodByIDQuery } from 'services/wood'

const { Text, Title } = Typography

export const WoodStocksImportComponent = () => {
  const navigate = useNavigate()
  const [modal, contextHolderModal] = Modal.useModal()

  const { importList, importErrorList } = useSelector(woodStockSelector)
  const { id }: any = useLoaderData()
  const { data } = useGetWoodByIDQuery(id, {
    skip: !id,
  })
  const { configSubmit } = useModal()
  const onClickNext = async () => {
    navigate('/wood-stocks/import/confirm')
  }

  return (
    <>
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
              <UploadFile />
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className="mb-[30px] flex justify-end gap-3">
            <ButtonBack size="large" />
            <Button
              size="large"
              type="primary"
              htmlType="button"
              style={{ paddingLeft: 30, paddingRight: 30 }}
              onClick={onClickNext}
              disabled={!importList.length}
            >
              ดำเนินการต่อ
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}
