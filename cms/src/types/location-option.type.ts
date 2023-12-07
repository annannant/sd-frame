import { DefaultOptionType } from 'antd/es/select'

import { ITFLocation } from './location.type'

export interface ITFLocationOption extends DefaultOptionType {
  value: number
  data?: ITFLocation
}
