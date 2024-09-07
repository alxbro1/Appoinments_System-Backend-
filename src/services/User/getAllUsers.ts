import { User } from '../../entities/user'
import userRepository from '../../repositories/userRepository'


export const getAllUsers = async ():Promise<User[]> => {
  const data = await userRepository.find()
  return data
}