import { Router } from "express";
import { getAll, getOne, login, register, verify } from "../controllers/user";
import asyncErrorVerifier from "../utils/asyncErrorVerifier";
import userDataValidator from "../middlewares/userDataValidations";

export const userRouter = Router();

userRouter.post("/login", asyncErrorVerifier(login));

userRouter.post("/register", userDataValidator, asyncErrorVerifier(register));

userRouter.get("/", asyncErrorVerifier(getAll));

userRouter.get("/confirm/:token", asyncErrorVerifier(verify));

userRouter.get("/:id", asyncErrorVerifier(getOne));
