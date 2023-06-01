import axios from '../../api-instance'
import { useQuery } from '@tanstack/react-query'

const getSelfAction = async () => {
  return await axios.get('/users/myself');
}

export const useGetSelf = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getSelfAction
  })
}