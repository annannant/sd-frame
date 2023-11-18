import BigNumber from 'bignumber.js'

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

export const toFixed = (input: string | number, fixed = 2) => {
  let num = input
  if (typeof input === 'string') {
    num = parseFloat(input)
  }
  return Number((Math.round(Number(num) * 100000) / 100000).toFixed(fixed))
}

export const currency = (input: string | number) => {
  if (input === undefined || input == null) {
    return ''
  }

  if (typeof input === 'string') {
    return (+input).toLocaleString('en-US', {
      style: 'decimal',
    })
  }
  return input.toLocaleString('th-TH', {
    style: 'decimal',
  })
}
