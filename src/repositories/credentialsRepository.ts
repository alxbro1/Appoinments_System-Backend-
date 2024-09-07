import {AppDataSource} from '../config/data-source'
import { Credential } from '../entities/credencials'

export default AppDataSource.getRepository(Credential).extend({
    
})