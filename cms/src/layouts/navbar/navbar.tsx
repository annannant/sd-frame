import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

import { InfoCircleOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'

import { colors } from 'constants/colors'

import { Container } from './navbar.styles'

export const Navbar = () => {
  const navigate = useNavigate()

  const [cookies, setCookies] = useCookies(['user'])
  const [modal, contextHolderModal] = Modal.useModal()

  return (
    <>
      {contextHolderModal}
      <Container className="shadow-bg-dark2/50 z-10 flex justify-between shadow-sm">
        <div className="flex items-center text-xl font-semibold tracking-[8px] ">
          SDFRAME
        </div>
        <div className="flex-1"></div>
        {cookies?.user?.data && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="h-[30px] w-[30px] rounded-full	bg-white "></div>
              <div className="ml-[8px]">
                <div className="text-[14px]">{cookies?.user?.data?.name},</div>
                <div className="text-[12px] capitalize leading-none text-dark-font-nuetral">
                  {cookies?.user?.data?.department}
                </div>
              </div>
            </div>
            <Button
              type="primary"
              icon={<LogoutOutlined style={{ marginTop: 2, fontSize: 12 }} />}
              className="ml-[15px]"
              onClick={async () => {
                const confirmed = await modal.confirm({
                  title: 'ต้องการออกจากระบบ ?',
                  okText: 'ยืนยัน',
                  okButtonProps: {},
                  cancelText: 'ยกเลิก',
                  // content: <>ต้องการเสร็จสิ้นการผลิตใช่หรือไม่ ?</>,
                  icon: (
                    <InfoCircleOutlined style={{ color: colors.primary }} />
                  ),
                })
                if (confirmed) {
                  setCookies('user', null, { path: '/' })
                  setTimeout(() => {
                    navigate('/login')
                  }, 500)
                }
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    </>
  )
}
