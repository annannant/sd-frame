import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import { Modal } from 'antd'

import { colors } from 'constants/colors'

const useModal = () => {
  const [modal, contextHolderModal] = Modal.useModal()
  const configDelete = {
    title: 'ยืนยันลบรายการ',
    okText: 'ลบ',
    okButtonProps: {
      danger: true,
    },
    cancelText: 'ยกเลิก',
    content: <>ต้องการลบรายการนี้ ?</>,
    icon: <WarningOutlined style={{ color: colors.danger }} />,
  }

  const configSubmit = {
    title: 'สร้างรายการ',
    okText: 'ยืนยัน',
    okButtonProps: {},
    cancelText: 'ยกเลิก',
    content: <>ต้องการสร้างรายการ ?</>,
    icon: <InfoCircleOutlined style={{ color: colors.primary }} />,
  }

  const configEdit = {
    title: 'แก้ไข',
    okText: 'ยืนยัน',
    okButtonProps: {},
    cancelText: 'ยกเลิก',
    content: <>ต้องการแก้ไขรายการ ?</>,
    icon: <InfoCircleOutlined style={{ color: colors.warning }} />,
  }

  return {
    modal,
    contextHolderModal,
    configDelete,
    configSubmit,
    configEdit,
  }
}

export default useModal
