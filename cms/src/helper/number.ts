export const convertWoodNumber = (value?: number): number => {
  const rounded = Math.round((value ?? 0) * 100) / 100
  return rounded
}

export const parser = (input: string | number) => {
  let num
  if (typeof input === 'string') {
    num = parseFloat(input)
  } else {
    num = input
  }

  return (num * 100) / 100
}
