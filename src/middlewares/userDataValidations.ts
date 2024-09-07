import { NextFunction, Request, Response } from "express";

const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{1,50}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const birthdatePattern = /^\d{4}-\d{2}-\d{2}$/;
const dniPattern = /^\d{8}$/;
const passwordPattern = /^.{5,30}$/;
const usernamePattern = /^[A-Za-z0-9_]{5,30}$/;

export default (req: Request, res: Response, next: NextFunction) => {
    const { name, email, birthdate, nDni, password, username } = req.body;
    
    const datosArray = [
        { key: 'name', value: name, pattern: namePattern, errorMsg: "Name must be a string of letters, spaces, and up to 50 characters" },
        { key: 'email', value: email, pattern: emailPattern, errorMsg: "Invalid email format" },
        { key: 'birthdate', value: birthdate, pattern: birthdatePattern, errorMsg: "Birthdate must be in ISO format and not in the future" },
        { key: 'nDni', value: nDni, pattern: dniPattern, errorMsg: "DNI must be an 8-digit number" },
        { key: 'password', value: password, pattern: passwordPattern, errorMsg: "Password must be between 5 and 30 characters" },
        { key: 'username', value: username, pattern: usernamePattern, errorMsg: "Username must be between 5 and 30 characters, containing only letters, numbers, or underscores" }
    ];
    

    
    for (const dato of datosArray) {
        const { key, value, pattern, errorMsg } = dato;

        if (!value || value === '') {
            return res.status(400).json({ error: `${key} is required` });
        }

        if (!pattern.test(value)) {
            return res.status(400).json({ error: errorMsg });
        }

        if (key === 'birthdate') {
            const parsedDate = new Date(value);
            const today = new Date();
            if (parsedDate > today) {
                return res.status(400).json({ error: "Birthdate cannot be in the future" });
            }
        }
    }

    next();
};
