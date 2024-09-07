import {DataSource} from 'typeorm'
import { User } from '../entities/user'
import { Credential } from '../entities/credencials'
import { Appoinment } from '../entities/appoinment'
import { POSTGRES_URL } from './envs'

export const AppDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_URL,
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User, Credential, Appoinment],
  subscribers: [],
  migrations: [],
});