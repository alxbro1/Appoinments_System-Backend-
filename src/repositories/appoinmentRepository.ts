import {AppDataSource} from '../config/data-source'
import { Appoinment } from '../entities/appoinment'
import { Appointment } from '../interfaces/appointment.interface'
import userRepository from './userRepository'

export default AppDataSource.getRepository(Appoinment).extend({
    createAppoinment: async function (appoinment:Appointment):Promise<Appoinment> {
        const user = await userRepository.findById(appoinment.user)
        if (!user) throw Error('user not found')
        appoinment.status = 'active'
        const newAppoinment = await this.create(appoinment)
        await this.save(newAppoinment);
        return newAppoinment
    },
    cancelAppoinment: async function (id:number):Promise<true | Error> {
        const update = await this.update(id, {status: 'cancelled'});
        if (update.affected === 0) throw Error("appoinment not found")
        return update.raw;
    },
    findById: async function (id:number): Promise<Appoinment>{
        const data = await this.findOneBy({id})
        if (!data) throw Error('user not found')
        return data
    },
    findByUser:async function (id:number):Promise<Appoinment[]> {
        const data = await userRepository.findOne({
          where: { id },
          relations: ["appointments"],
        });
        if (!data?.appointments) throw Error("User or Appoinments not found")
        return data.appointments
    }
})