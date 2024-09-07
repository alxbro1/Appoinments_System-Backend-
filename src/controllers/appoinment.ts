import { Request, Response } from "express";
import { getAllUsers } from "../services/Appoinment/getAllAppoinments";
import { getById } from "../services/Appoinment/getAppoinmentById";
import { CreateAppoinment } from "../services/Appoinment/createAppoinment";
import { CancelledAppoinment } from "../services/Appoinment/cancelledAppoiment";
import { getByUser } from "../services/Appoinment/getAppoinmentByUser";

export const getAll = async (req: Request, res: Response) => {
  getAllUsers()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

export const getOne = async (req: Request, res: Response) => {
  const { id } = req.params;
  getById(Number(id))
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ err });
    });
};

export const getByUserCont = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await getByUser(Number(id));
    res.status(200).json(data);
  } catch (err:any){
    res.status(404).json({message:err.message})
  }
};

export const create = async (req: Request, res: Response) => {
  const { time, date, userId } = req.body;
  const user = Number(userId);

  CreateAppoinment({ time, date, user })
    .then((result) => {
      res
        .status(201)
        .json({ message: "appoinment created", appoiment: result });
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
};

export const cancel = async (req: Request, res: Response) => {
  CancelledAppoinment(Number(req.params.id))
    .then((result) => {
      res.status(200).json({ result: true });
    })
    .catch((err) => {
      res.status(404).json({ result: false, message: err.message });
    });
};
