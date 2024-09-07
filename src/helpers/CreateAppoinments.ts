import {AppDataSource} from '../config/data-source'
import { Appoinment } from '../entities/appoinment'
import UserRepository from '../repositories/userRepository'
import AppoinmentRepository from '../repositories/appoinmentRepository'

const appointments: Partial<Appoinment>[] = [
    {
        date: '2024-06-03',
        time: "10:00",
        status: "active",
        user: 1 
    },
    {
        date: "2024-06-04",
        time: "14:00",
        status: "active",
        user: 2 
    },
    {
        date: "2024-06-05",
        time: "09:30",
        status: "active",
        user: 3 
    }
];

export default async () => {
    const queryRunner = AppDataSource.createQueryRunner();

    queryRunner.connect();
    
    const promises = appointments.map(async (appoinment)=>{
        const usuario = await UserRepository.findOneBy({id:appoinment.user});
        if (!usuario) throw Error(`User by ID ${appoinment.user} not fund`);

        const newAppoinment = await AppoinmentRepository.create(appoinment);
        await queryRunner.manager.save(newAppoinment);
    });

    try {
        await queryRunner.startTransaction();
    
        await Promise.all(promises)
        console.log("Appoinments created succeful")
        
        await queryRunner.commitTransaction()
    } catch (error) {
        console.log("Error loadding appoinments")
        queryRunner.rollbackTransaction()
    } finally{
        await queryRunner.release()
        console.log("preload of appoinments finally")
    }

}