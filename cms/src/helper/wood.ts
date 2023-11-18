import { ITFWood } from 'types/wood.type'

import { toFixed } from './number'
import { convertUnitToSymbol } from './unit'

export const buildWoodDetail = (unit: string) => {
  return ''
}

export const convertSizeSymbol = (
  size: string | number | undefined | null,
  unit: string | undefined | null
) => {
  if (size === undefined || size === null) {
    return ''
  }

  return `${toFixed(size, 2)} ${convertUnitToSymbol(unit ?? '')}`
}

export const convertSizeText = (
  size: string | number | undefined | null,
  unit: string | undefined | null
) => {
  if (size === undefined || size === null) {
    return ''
  }

  return `${toFixed(size, 2)} ${convertUnitToSymbol(unit ?? '')}`
}

export const convertWoodName = (wood?: ITFWood) => {
  return `${wood?.name} - ${wood?.description}`
}

export const convertWoodType = () => {
  return ''
}
