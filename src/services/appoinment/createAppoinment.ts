import { Appoinment } from '../../entities/appoinment'
import appoinmentRepository from '../../repositories/appoinmentRepository'
import {Appointment} from '@/interfaces/appointment.interface'


export const CreateAppoinment = async (appoinment:Appointment): Promise<Appoinment> => {
    const data = appoinmentRepository.createAppoinment(appoinment);
    return data
}