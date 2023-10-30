import {
  CANCELLED,
  COMPLETED,
  CUTTING_INPROGRESS,
  DRAFT,
  PREPARING_INPROGRESS,
  WAIT_FOR_CUTTING,
  WAIT_FOR_PREPARING,
} from 'constants/current-status.constant'

export const convertStatusToText = (status: string) => {
  switch (status) {
    case DRAFT:
      return 'บันทึกฉบับร่าง'
    case WAIT_FOR_CUTTING:
      return 'รอการผลิต'
    case CUTTING_INPROGRESS:
      return 'อยู่ระหว่างผลิต'
    case WAIT_FOR_PREPARING:
      return 'รอการประกอบ'
    case PREPARING_INPROGRESS:
      return 'อยู่ระหว่างประกอบ'
    case COMPLETED:
      return 'เสร็จสิ้น'
    case CANCELLED:
      return 'ยกเลิก'
    default:
      return ''
  }
}

export const convertStatusToValue = (status: string) => {}
