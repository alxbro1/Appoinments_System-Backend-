import app from "./server";
import { AppDataSource } from "./config/data-source";
import CreateUsers from "./helpers/CreateUsers";
import CreateAppoinments from "./helpers/CreateAppoinments";

AppDataSource.initialize().then(() => {
  app.listen(3000, () => {
    console.log(`server is listening on port ${3000}`);
  });
  CreateUsers().then(() => {
    CreateAppoinments();
  });
});
