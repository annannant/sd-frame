import { Card, Typography } from 'antd'

import { TableStandardFrameStocks } from './table-standard-frame-stocks/table-standard-frame-stocks'

const { Title } = Typography

export const WoodStandardFrameStocksListComponent = () => {
  return (
    <>
      <Title level={3}>สต๊อกกรอบมาตรฐาน</Title>
      <Card
        title={
          <div className="flex justify-between">
            <div>รายการสต๊อกกรอบมาตรฐาน</div>
          </div>
        }
        bordered={false}
      >
        <TableStandardFrameStocks />
      </Card>
    </>
  )
}
