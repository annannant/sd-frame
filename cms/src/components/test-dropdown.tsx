import { useRef } from 'react'

import { Button, Input, MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

export const TableLocations = () => {
  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: '3rd menu item',
      key: '3',
    },
  ]
  const searchInputRef = useRef<any | null>(null)

  return (
    <>
      <button
        style={{ marginBottom: 20 }}
        onClick={() => {
          console.log('searchInputRef:', searchInputRef.current)
          searchInputRef.current?.click()
        }}
      >
        Other Button
      </button>
      <Input
        style={{ width: '240px' }}
        suffix={
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button
              style={{ width: 10 }}
              onClick={(e) => e.preventDefault()}
              ref={searchInputRef}
            >
              <Space>Click me</Space>
            </Button>
          </Dropdown>
        }
      />
    </>
  )
}
