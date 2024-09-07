import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL_USER, PORT } from "../config/envs";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "localhost",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export default async (email: string, token: string) => {
  const url = `http://localhost:${PORT}/users/confirm/${token}`;

  await transporter.sendMail({
    from: "Sauron eje <alesauro30@gmail.com>",
    to: email,
    subject: "Confirm your email",
    text: `Click the link below to confirm your account: ${url}`,
    html: `<a href="${url}">Confirm your email</a>`,
  });
};
