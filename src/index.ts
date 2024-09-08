import app from "./server";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log(`server is listening on port ${3000}`);
  });
  
