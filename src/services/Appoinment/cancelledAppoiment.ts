import appoinmentRepository from '../../repositories/appoinmentRepository'
import node from '../../utils/verifyEmail'

export const CancelledAppoinment = async (id:number) => {
    await appoinmentRepository.cancelAppoinment(id)
}