import { httpClient } from 'utils/httpClient'

export const postCreate = async (data: any) => {
  return await httpClient.post('/production-plans', data)
}
