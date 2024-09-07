import { User } from "./user";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'appointments'
})
export class Appoinment {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @Column()
    date: string;

    @Column({
        length:10
    })
    time: string
    
    @ManyToOne(()=>User, (users)=>users.appointments)
    user: number;

    @Column()
    status: 'active' | 'cancelled';
}