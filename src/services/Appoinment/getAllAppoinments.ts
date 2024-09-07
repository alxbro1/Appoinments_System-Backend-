import { Appoinment } from '../../entities/appoinment'
import appoinmentRepository from '../../repositories/appoinmentRepository'


export const getAllUsers = async ():Promise<Appoinment[]> => {
  const data = await appoinmentRepository.find()

  return data
}