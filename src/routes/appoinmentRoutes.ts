import { Router} from "express";
import { getAll, getOne, getByUserCont, create, cancel } from "../controllers/appoinment";
import asyncErrorVerifier  from "../utils/asyncErrorVerifier";
import appoimentValidations from '../middlewares/appoimentDataValidations'

export const appoinmentRouter = Router()

appoinmentRouter.post('/schedule', appoimentValidations, asyncErrorVerifier(create))

appoinmentRouter.put('/cancel/:id', asyncErrorVerifier(cancel))

appoinmentRouter.get("/getbyuser/:id", asyncErrorVerifier(getByUserCont));

appoinmentRouter.get('/:id', asyncErrorVerifier(getOne))

appoinmentRouter.get('/', asyncErrorVerifier(getAll))