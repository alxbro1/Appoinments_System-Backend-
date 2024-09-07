import express from "express"
import {json} from 'express'
import { router } from './routes/index'
import morgan from 'morgan'
import cors from 'cors'


const app = express()

app.use(cors())
app.use(json())
app.use(router)
app.use(morgan('dev'))

export default app