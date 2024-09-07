import appoinmentRepository from '../../repositories/appoinmentRepository'
import { Appoinment } from "../../entities/appoinment";

export const getByUser = async (id:number): Promise<Appoinment[]> => {
  const data = await appoinmentRepository.findByUser(id);
  if (data) return data
  throw Error("User or Appoinments not found")
}