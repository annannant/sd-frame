export const convertUnitToText = (unit: string) => {
  const master: Record<string, string> = {
    'inch': 'นิ้ว',
    'mm': 'มิลลิเมตร',
  }

  return master[unit] ?? ''
}
