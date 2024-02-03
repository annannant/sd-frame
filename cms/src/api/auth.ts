import { ITFBodyLogin } from 'types/login.type'

import { httpClient } from 'utils/httpClient'

export const postLogin = async (data: ITFBodyLogin) => {
  return await httpClient.post('/auth/login', data)
}
