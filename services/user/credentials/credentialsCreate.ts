import { Credential } from '../../../entities/credencials'
import credentialsRepository from '../../../repositories/credentialsRepository'

export const CreateCredentialsService = async (credentials:Credential):Promise<number> => {

    const newCredential = credentialsRepository.create(credentials)
    await credentialsRepository.save(newCredential)

    return newCredential.id
}