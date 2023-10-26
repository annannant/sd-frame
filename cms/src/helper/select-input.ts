export const filterOption = (
  input: any,
  option?: { label?: any; value?: any; data?: any }
) => {
  return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
}
