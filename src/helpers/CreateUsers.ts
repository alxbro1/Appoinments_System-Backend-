import {AppDataSource} from '../config/data-source'
import { User } from '../entities/user'
import { Credential } from '../entities/credencials'
import CredentialsRepository from '../repositories/credentialsRepository'

const users: Partial<User & Credential>[] = [
    {
        name: "totalo",
        birthdate:new Date("2001-10-30"),
        username: "papata",
        password: "admin",
        email: "qsyo@gmail.com",
        nDni: 46093951
    },
    {
        name: "maria",
        birthdate: new Date("1995-06-15"),
        username: "mariap",
        password: "password123",
        email: "maria@example.com",
        nDni: 33445566
    },
    {
        name: "carlos",
        birthdate: new Date("1987-12-22"),
        username: "carlitox",
        password: "secret",
        email: "carlos@example.com",
        nDni: 22334455
    }
];

export default async () => {
    const queryRunner = await AppDataSource.createQueryRunner()

    await queryRunner.connect()

    const promises = users.map(async (data) => {
      const newCredential = CredentialsRepository.create({password: data.password, username: data.username});
      await queryRunner.manager.save(newCredential);

      if(!newCredential) throw Error("credential not found")
        data.credential = newCredential
      const newUser =  await queryRunner.manager.create(User, data);
        await queryRunner.manager.save(newUser)
    })

    try {
        await queryRunner.startTransaction()

        await Promise.all(promises)

        console.log("users uploadeds")
        await queryRunner.commitTransaction()
    } catch (error) {
        console.log("user Error")
        await queryRunner.rollbackTransaction()
    }finally{
        console.log("preload of users is finaly")
        await queryRunner.release();
    }
}