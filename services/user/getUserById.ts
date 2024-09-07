import { User } from '../../entities/user'
import userRepository from '../../repositories/userRepository'

export const getById = async (id:number):Promise<User> => {
    const users = await userRepository.findById(id);    
    if (!users) throw Error('User not found')
    return users
}