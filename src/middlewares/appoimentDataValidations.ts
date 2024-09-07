import { NextFunction, Request, Response } from "express";

const datePattern = /^\d{4}-\d{2}-\d{2}$/; // ISO 8601 format (YYYY-MM-DD)
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; // 24-hour format (HH:mm)
const userIdPattern = /^\d+$/; // Numeric ID for user

export default (req: Request, res: Response, next: NextFunction) => {
  const { date, time, userId } = req.body;

  const datosArray = [
    {
      key: "date",
      value: date,
      pattern: datePattern,
      errorMsg: "Date must be in ISO format (YYYY-MM-DD)",
    },
    {
      key: "time",
      value: time,
      pattern: timePattern,
      errorMsg: "Time must be in 24-hour format (HH:mm)",
    },
    {
      key: "userId",
      value: userId,
      pattern: userIdPattern,
      errorMsg: "User ID must be a numeric value",
    },
  ];

  for (const dato of datosArray) {
    const { key, value, pattern, errorMsg } = dato;

    if (!value || value === "") {
      return res.status(400).json({ error: `${key} is required` });
    }

    if (!pattern.test(value)) {
      return res.status(400).json({ error: errorMsg });
    }

    if (key === "date") {
      const parsedDate = new Date(value);
      const today = new Date();
      if (parsedDate < today) {
        return res
          .status(400)
          .json({ error: "Date cannot be in the past" });
      }
    }
  }

  next();
};