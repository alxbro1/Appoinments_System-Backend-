import { User } from '../../entities/user'
import { Credential } from '../../entities/credencials'
import userRepository from '../../repositories/userRepository'
import TokenGenerator from '../../utils/generateToken'
import sendEmail from '../../utils/verifyEmail'

export const RegisterUser = async (user:User & Credential) => {
    const newToken = TokenGenerator()
    user.confirmationToken = newToken

    const newUser = await userRepository.registerUser(user)
    if (!newUser) throw Error("New User not found")
    
    await sendEmail(newUser.email, newToken)

    return newUser
}