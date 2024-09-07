import { AppDataSource } from "../config/data-source";
import { User } from "../entities/user";
import { Credential } from "../entities/credencials";
import credentialsRepository from "./credentialsRepository";


export default AppDataSource.getRepository(User).extend({
  registerUser: async function (data: User & Credential) {
    const queryRunner = AppDataSource.createQueryRunner();
    console.log(data)
    
    try {
      await queryRunner.connect();
      queryRunner.startTransaction();
      const newCredential = credentialsRepository.create({
        password: data.password,
        username: data.username,
      });
      await queryRunner.manager.save(newCredential);
      if (!newCredential) throw Error("Credentials not found");
      console.log("clg2");
      data.credential = newCredential;

      const newUser = this.create(data);
      await queryRunner.manager.save(newUser);
      console.log("clg3");
      await queryRunner.commitTransaction();
      return newUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw Error("User not succesfuly Created");
    } finally {
      await queryRunner.release();
    }
  },
  findById: async function (id: number): Promise<User> {
    const data = await this.findOne({
      where: { id },
      relations: ["appointments"],
    });
    if (!data) throw Error("User not found");
    return data;
  },
  checkIfExist: async function (
    username: string,
    password: string
  ): Promise<User | false> {
    const user = await this.findOne({
      where: {
        credential: { username: username, password: password },
      },
      relations: ["appointments"],
    });
    if (!user) return false;
    return user;
  },
  verifyAccount: async function (token: string) {
    const update = await this.update(
      { confirmationToken: token },
      { isVerified: true, confirmationToken: "" }
    );
    if (update.affected === 0)
      throw Error("this verification token is deprecated or invalid");
    return update.raw;
  },
});
