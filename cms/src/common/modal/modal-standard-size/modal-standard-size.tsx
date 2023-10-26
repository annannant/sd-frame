import { Modal } from 'antd'
import type { ModalProps } from 'antd'

export interface StructProps extends ModalProps {}

export const ModalStandardSize = (props: StructProps) => {
  const { open, onOk, onCancel } = props
  return (
    <Modal title="Basic Modal" open={open} onOk={onOk} onCancel={onCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  )
}
