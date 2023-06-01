import { ILogin } from '../../../types/Auth'
import axios from '../../api-instance'
import { useMutation } from '@tanstack/react-query'

const loginAction = async (data: ILogin) => {
  return await axios.post('/auth/signin', data);
}

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: ILogin) => loginAction(data),
  })
}