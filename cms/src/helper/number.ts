export const convertWoodNumber = (value?: number): number => {
  const rounded = Math.round((value ?? 0) * 100) / 100
  return rounded
}
