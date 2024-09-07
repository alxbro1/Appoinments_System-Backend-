import {Router} from 'express';
import {appoinmentRouter} from './appoinmentRoutes'
import {userRouter} from './userRoutes'

export const router = Router();

router.use('/turns', appoinmentRouter)
router.use('/users', userRouter)