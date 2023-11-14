import { DefaultOptionType } from 'antd/es/select'

import { ITFWood } from './wood.type'

export interface ITFWoodOption extends DefaultOptionType {
  value?: number
  // label?: string | null
  data?: ITFWood
}
