import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from 'typeorm'
import { Credential } from './credencials';
import { Appoinment } from './appoinment';

@Entity({name: 'users'})
export class User{
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column({
        length: 50
    })    
    name: string;
    
    @Column()
    email: string;
    
    @Column()
    birthdate: Date;
    
    @Column("integer")
    nDni: number;
    
    @OneToOne(() => Credential)
    @JoinColumn()
    credential: Credential;

    @OneToMany(() => Appoinment, appoinment => appoinment.user)
    appointments: Appoinment[]

    @Column({ default: false })
    isVerified: boolean;

    @Column({ nullable: true })
    confirmationToken?: string;
}