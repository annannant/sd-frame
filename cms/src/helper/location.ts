import { ITFLocation } from 'types/location.type'

export const convertLocationLabel = (location?: ITFLocation) => {
  return `${location?.name ?? ''} (${location?.code ?? ''})`
}
