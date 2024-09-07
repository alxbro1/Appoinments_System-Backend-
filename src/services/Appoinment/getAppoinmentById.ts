import { Appoinment } from '../../entities/appoinment'
import appoinmentRepository from '../../repositories/appoinmentRepository'

export const getById = async (ID:number):Promise<Appoinment> => {
    const appoinment = await appoinmentRepository.findOneBy({
    id:ID
  })
    
    if (!appoinment) throw Error('Appoinment not found')
  
    return appoinment
}