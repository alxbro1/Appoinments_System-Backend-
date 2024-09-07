import { User } from '../../../entities/user'
import { Credential } from '../../../entities/credencials'
import userRepository from '../../../repositories/userRepository'


export const LogInService = async(data:Credential): Promise<User | false> => {
  return await userRepository.checkIfExist(data.username,data.password)
}