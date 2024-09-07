import { Request, Response } from "express";

import { getAllUsers } from "../services/user/getAllUsers";
import { getById } from "@/services/user/getUserById";
import { RegisterUser } from "../services/user/registerUser";
import { LogInService } from "../services/user/credentials/logInService";
import { verifyUserByToken } from "../services/user/verifyUser";

export const getAll = async (req: Request, res: Response) => {
  const data = await getAllUsers();
  res.json(data);
};

export const getOne = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  getById(id)
    .then((result) => res.json(result))
    .catch(() => res.status(404).json({ message: "User not fund" }));
};

export const login = async (req: Request, res: Response) => {
  const match = await LogInService(req.body);
  if (match) return res.status(200).json({ login: true, user: match });
  res.status(400).json({ login: false, user: {} });
};

export const register = async (req: Request, res: Response) => {
  RegisterUser(req.body)
    .then((response) => res.status(201).json({ response }))
    .catch((err) => {
      res.status(400).json(err);
    });
};

export const verify = async (req: Request, res: Response) => {
  verifyUserByToken(req.params.token)
    .then((result) => {
      res.status(200).json({ message: "user verificated succefuly" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
